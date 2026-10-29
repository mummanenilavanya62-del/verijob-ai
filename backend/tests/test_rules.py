import pytest
from backend.app.ml.heuristic_rules import evaluate_heuristics

def test_clean_legitimate_posting():
    score, warnings, explanations, recs = evaluate_heuristics(
        job_title="Software Engineering Intern",
        company_name="Spotify",
        job_description=(
            "We are seeking an enthusiastic engineering intern with strong foundational knowledge in Python, "
            "data structures, and algorithms to collaborate with our core platform squad on microservices. "
            "Responsibilities include contributing to automated testing pipelines, participating in code reviews, "
            "and learning distributed systems principles in an agile engineering culture."
        ),
        location="Boston, MA",
        job_type="Internship",
        salary_stipend="$45 / hour",
        application_url="https://spotify.com/careers/swe-intern",
        recruiter_email="campus@spotify.com"
    )
    assert score <= 35
    assert len(warnings) == 0
    assert len(recs) > 0

def test_registration_fee_detection():
    score, warnings, explanations, recs = evaluate_heuristics(
        job_title="Data Entry Operator",
        company_name="QuickEarn Corp",
        job_description="Direct selection! Candidates must pay a refundable registration fee of Rs. 1,500 for training kit and verification.",
        location="Remote",
        job_type="Part-time"
    )
    assert score >= 35
    warning_codes = [w["code"] for w in warnings]
    assert "FEE_REQUEST" in warning_codes

def test_enterprise_free_email_mismatch():
    score, warnings, explanations, recs = evaluate_heuristics(
        job_title="Associate Cloud Architect",
        company_name="Google",
        job_description="Hiring candidates for cloud infrastructure role with competitive package and benefits.",
        location="Bangalore",
        job_type="Full-time",
        recruiter_email="google.recruitment.hr@gmail.com"
    )
    assert score >= 25
    warning_codes = [w["code"] for w in warnings]
    assert "ENTERPRISE_FREE_EMAIL_MISMATCH" in warning_codes

def test_banking_credential_harvesting():
    score, warnings, explanations, recs = evaluate_heuristics(
        job_title="Customer Service Representative",
        company_name="Metro Solutions",
        job_description="Provide your bank account details and online banking password with OTP for direct deposit verification before the interview.",
        location="Remote"
    )
    assert score >= 30
    warning_codes = [w["code"] for w in warnings]
    assert "SENSITIVE_DATA_HARVESTING" in warning_codes

def test_telegram_and_guarantee_tactics():
    score, warnings, explanations, recs = evaluate_heuristics(
        job_title="Remote Typist",
        company_name="Apex Global",
        job_description="100% guarantee placement! No interview required. Contact manager on Telegram @ApexJobManager.",
        location="Remote"
    )
    assert score >= 35
    warning_codes = [w["code"] for w in warnings]
    assert "UNREALISTIC_GUARANTEE" in warning_codes
    assert "SUSPICIOUS_COMMUNICATION_CHANNEL" in warning_codes
