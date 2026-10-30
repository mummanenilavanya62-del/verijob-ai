import os
import sys
import time
import socket
import subprocess
import requests
import pytest
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent.parent

def find_free_port():
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind(('127.0.0.1', 0))
        return s.getsockname()[1]

def test_full_live_server_lifecycle():
    port = find_free_port()
    env = os.environ.copy()
    env["PORT"] = str(port)
    env["HOST"] = "127.0.0.1"
    env["OMP_NUM_THREADS"] = "1"
    env["OPENBLAS_NUM_THREADS"] = "1"
    env["MKL_NUM_THREADS"] = "1"

    proc = subprocess.Popen(
        [sys.executable, str(PROJECT_ROOT / "backend" / "run.py")],
        env=env,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        cwd=str(PROJECT_ROOT)
    )

    base_url = f"http://127.0.0.1:{port}"
    server_ready = False

    try:
        # 1. Wait for server to become responsive
        for _ in range(20):
            time.sleep(0.5)
            if proc.poll() is not None:
                out, err = proc.communicate()
                pytest.fail(f"Server exited prematurely with code {proc.returncode}.\nSTDOUT: {out.decode('utf-8', errors='replace')}\nSTDERR: {err.decode('utf-8', errors='replace')}")
            try:
                res = requests.get(f"{base_url}/api/health", timeout=1)
                if res.status_code == 200:
                    server_ready = True
                    break
            except Exception:
                pass

        assert server_ready, "FastAPI server failed to start within 10 seconds"

        # 2. Health check inspection
        health_res = requests.get(f"{base_url}/api/health", timeout=3)
        assert health_res.status_code == 200
        health_data = health_res.json()
        assert health_data["status"] == "healthy"
        assert health_data["database"] == "connected"
        assert "Trained ML Model" in health_data["ml_engine_mode"]

        # 3. Sample Jobs check
        samples_res = requests.get(f"{base_url}/api/sample-jobs", timeout=3)
        assert samples_res.status_code == 200
        samples = samples_res.json()
        assert len(samples) >= 4

        # 4. Analyze Legitimate Job Posting
        legit_payload = {
            "job_title": "Full Stack Software Engineer Intern",
            "company_name": "Datadog",
            "job_description": "Join our cloud observability team to build microservices in Go and Python. Pursuing Computer Science degree with understanding of algorithms.",
            "location": "New York, NY",
            "job_type": "Internship",
            "salary_stipend": "$55 / hour",
            "application_url": "https://careers.datadoghq.com/intern",
            "recruiter_email": "university@datadoghq.com",
            "session_id": "e2e-session-001"
        }
        analyze_legit_res = requests.post(f"{base_url}/api/analyze", json=legit_payload, timeout=5)
        assert analyze_legit_res.status_code == 200
        legit_data = analyze_legit_res.json()
        assert legit_data["risk_score"] <= 35
        assert legit_data["risk_level"] == "Low"
        record_id = legit_data["id"]

        # 5. Analyze Blatant Fraud Posting
        scam_payload = {
            "job_title": "Remote Data Clerk",
            "company_name": "Apex Global Solutions",
            "job_description": "URGENT HIRING: Guaranteed selection without interview! Earn $600 daily for typing. Selected candidates must pay $150 refundable equipment deposit via Bitcoin before dispatch.",
            "salary_stipend": "$600 / day",
            "recruiter_email": "apex.hiring.manager@gmail.com",
            "session_id": "e2e-session-001"
        }
        analyze_scam_res = requests.post(f"{base_url}/api/analyze", json=scam_payload, timeout=5)
        assert analyze_scam_res.status_code == 200
        scam_data = analyze_scam_res.json()
        assert scam_data["risk_score"] >= 70
        assert scam_data["risk_level"] == "High"
        assert len(scam_data["warning_signs"]) >= 2

        # 6. Session History Retrieval
        hist_res = requests.get(f"{base_url}/api/history?session_id=e2e-session-001", timeout=3)
        assert hist_res.status_code == 200
        hist_items = hist_res.json()
        assert len(hist_items) >= 2
        assert any(item["id"] == record_id for item in hist_items)

        # 7. Single History Item Details
        single_res = requests.get(f"{base_url}/api/history/{record_id}", timeout=3)
        assert single_res.status_code == 200
        single_data = single_res.json()
        assert single_data["job_title"] == legit_payload["job_title"]
        assert single_data["risk_level"] == "Low"

        # 8. Delete History Record
        del_res = requests.delete(f"{base_url}/api/history/{record_id}", timeout=3)
        assert del_res.status_code == 200

        # Verify deletion
        verify_del = requests.get(f"{base_url}/api/history/{record_id}", timeout=3)
        assert verify_del.status_code == 404

        # 9. Submit Scam Report
        report_payload = {
            "job_title": "Fake Data Clerk",
            "company_name": "Apex Global Solutions",
            "source_url": "https://example.com/scam",
            "scam_description": "They demanded $150 Bitcoin for laptop shipment.",
            "scam_type": "suspicious_fees"
        }
        report_res = requests.post(f"{base_url}/api/reports", json=report_payload, timeout=3)
        assert report_res.status_code == 200
        assert report_res.json()["status"] == "received"

        # 10. Methodology Documentation
        meth_res = requests.get(f"{base_url}/api/methodology", timeout=3)
        assert meth_res.status_code == 200
        meth_data = meth_res.json()
        assert "benchmark_dataset_provenance" in meth_data["ml_components"]

    finally:
        proc.terminate()
        try:
            proc.wait(timeout=5)
        except subprocess.TimeoutExpired:
            proc.kill()
