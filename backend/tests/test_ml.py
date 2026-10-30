import pytest
from backend.app.ml.dataset import load_benchmark_records, ensure_dataset_exists
from backend.app.ml.train import train_job_classifier
from backend.app.ml.evaluate import evaluate_model
from backend.app.ml.model import FraudDetectionEngine, get_engine

def test_benchmark_dataset_integrity():
    path = ensure_dataset_exists()
    assert path.exists()
    records = load_benchmark_records()
    assert len(records) >= 10
    for r in records:
        assert "job_title" in r
        assert "company_name" in r
        assert "job_description" in r
        assert "is_fraudulent" in r
        assert r["is_fraudulent"] in (0, 1)

def test_ml_training_pipeline():
    clf, vec, metrics = train_job_classifier()
    assert clf is not None
    assert vec is not None
    assert metrics["training_accuracy"] >= 0.85
    assert metrics["f1_score"] >= 0.85

def test_ml_evaluation_summary():
    eval_result = evaluate_model()
    assert "confusion_matrix" in eval_result
    assert "top_fraud_indicators" in eval_result
    assert len(eval_result["top_fraud_indicators"]) > 0

def test_prediction_engine_hybrid():
    engine = get_engine()
    # High risk scam input
    result = engine.predict_risk(
        job_title="Remote Typist",
        company_name="Apex Global",
        job_description="URGENT: No interview required! 100% guarantee selection. Earn $500 daily. Must pay $150 refundable registration fee on Telegram.",
        salary_stipend="$500 / day",
        recruiter_email="apex.hiring@gmail.com"
    )
    assert result["risk_score"] >= 70
    assert result["risk_level"] == "High"
    assert len(result["warning_signs"]) > 0

    # Low risk legitimate input
    legit_result = engine.predict_risk(
        job_title="Software Engineering Intern",
        company_name="Datadog",
        job_description="Join our engineering team to design and build distributed telemetry systems in Go and Python. Pursuing Computer Science degree with understanding of algorithms.",
        location="New York, NY",
        job_type="Internship",
        salary_stipend="$55 / hour",
        application_url="https://datadoghq.com/careers/swe",
        recruiter_email="university@datadoghq.com"
    )
    assert legit_result["risk_score"] <= 35
    assert legit_result["risk_level"] == "Low"

def test_ml_fallback_when_model_missing():
    fallback_engine = FraudDetectionEngine.__new__(FraudDetectionEngine)
    fallback_engine.classifier = None
    fallback_engine.vectorizer = None
    fallback_engine.mode = "Rule-Based Preliminary Engine (Heuristic Fallback)"

    result = fallback_engine.predict_risk(
        job_title="Remote Typist",
        company_name="Apex Global",
        job_description="URGENT: No interview required! 100% guarantee selection. Earn $500 daily. Must pay $150 refundable registration fee on Telegram.",
        salary_stipend="$500 / day",
        recruiter_email="apex.hiring@gmail.com"
    )
    assert result["model_mode"] == "Rule-Based Preliminary Engine (Heuristic Fallback)"
    assert result["risk_score"] >= 70
    assert result["risk_level"] == "High"
    assert len(result["warning_signs"]) > 0
    assert result["ml_score"] == 0.0
