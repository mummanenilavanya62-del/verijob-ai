import pytest
from fastapi.testclient import TestClient
from backend.app.main import app

client = TestClient(app)

def test_health_endpoint():
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] in ("healthy", "degraded")
    assert "ml_engine_mode" in data

def test_methodology_endpoint():
    response = client.get("/api/methodology")
    assert response.status_code == 200
    data = response.json()
    assert "ml_components" in data
    assert "rule_heuristics" in data

def test_sample_jobs_endpoint():
    response = client.get("/api/sample-jobs")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 3

def test_analyze_legitimate_job():
    payload = {
        "job_title": "Frontend Software Engineering Intern",
        "company_name": "Canva",
        "job_description": "We are seeking a Frontend Intern passionate about React and TypeScript. You will build user-friendly components, learn modern state management, and write unit tests.",
        "location": "Austin, TX",
        "job_type": "Internship",
        "salary_stipend": "$40 / hour",
        "application_url": "https://canva.com/careers/intern",
        "recruiter_email": "careers@canva.com"
    }
    response = client.post("/api/analyze", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "id" in data
    assert data["risk_score"] <= 40
    assert data["risk_level"] in ("Low", "Medium")

def test_analyze_fraudulent_job():
    payload = {
        "job_title": "Immediate Online Assistant",
        "company_name": "FastCash Ltd",
        "job_description": "Guaranteed selection without interview! Direct joining! Earn Rs. 60,000 monthly for simple copy paste typing. Must pay Rs. 1,999 registration fee for kit.",
        "location": "Remote",
        "job_type": "Part-time",
        "salary_stipend": "Rs. 60,000 / month",
        "recruiter_email": "fastcash.recruiter77@gmail.com"
    }
    response = client.post("/api/analyze", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["risk_score"] >= 70
    assert data["risk_level"] == "High"
    assert len(data["warning_signs"]) > 0

def test_analyze_validation_errors():
    # Short description error (<20 characters)
    short_payload = {
        "job_title": "Dev",
        "company_name": "Acme",
        "job_description": "Too short"
    }
    response = client.post("/api/analyze", json=short_payload)
    assert response.status_code == 422 or response.status_code == 400

    # Bad URL (localhost attempt)
    bad_url_payload = {
        "job_title": "Software Engineer",
        "company_name": "Acme Corp",
        "job_description": "We are looking for a software engineer to build web applications.",
        "application_url": "http://localhost:8080/admin"
    }
    response = client.post("/api/analyze", json=bad_url_payload)
    assert response.status_code == 400

def test_history_workflow():
    # 1. Post a job analysis with session_id
    sess_id = "test-session-12345"
    payload = {
        "job_title": "Backend Intern",
        "company_name": "Tech Corp",
        "job_description": "Join our backend platform engineering group to build microservices in Python and Docker.",
        "session_id": sess_id
    }
    post_res = client.post("/api/analyze", json=payload)
    assert post_res.status_code == 200
    record_id = post_res.json()["id"]

    # 2. Get history with session_id
    hist_res = client.get(f"/api/history?session_id={sess_id}")
    assert hist_res.status_code == 200
    items = hist_res.json()
    assert len(items) >= 1
    assert any(item["id"] == record_id for item in items)

    # 3. Get single history item
    get_single = client.get(f"/api/history/{record_id}")
    assert get_single.status_code == 200
    assert get_single.json()["job_title"] == "Backend Intern"

    # 4. Delete item
    del_res = client.delete(f"/api/history/{record_id}")
    assert del_res.status_code == 200

    # 5. Verify deleted
    verify_del = client.get(f"/api/history/{record_id}")
    assert verify_del.status_code == 404

def test_scam_report_submission():
    payload = {
        "job_title": "Fake Data Entry",
        "company_name": "Scammy Co",
        "source_url": "https://example.com/scam",
        "scam_description": "They asked me to deposit $200 for a laptop and contact on Telegram.",
        "scam_type": "registration_fee"
    }
    response = client.post("/api/reports", json=payload)
    assert response.status_code == 200
    assert response.json()["status"] == "received"
