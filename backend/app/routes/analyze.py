import json
from datetime import datetime, timezone
from typing import List
from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.orm import Session
from backend.app.database import get_db
from backend.app.models import AnalysisRecord
from backend.app.schemas import JobAnalysisRequest, JobAnalysisResponse, SampleJob
from backend.app.ml.model import get_engine
from backend.app.utils.security import sanitize_text, validate_safe_url, rate_limiter
from backend.app.utils.sample_data import SAMPLE_JOBS

router = APIRouter(tags=["Analysis"])

@router.get("/sample-jobs", response_model=List[SampleJob])
def get_sample_jobs():
    """Returns interactive benchmark sample postings for one-click testing and demonstration."""
    return SAMPLE_JOBS

@router.post("/analyze", response_model=JobAnalysisResponse)
def analyze_job(
    request_data: JobAnalysisRequest,
    req: Request,
    db: Session = Depends(get_db)
):
    """
    Analyzes a job or internship posting using hybrid ML + Heuristic detection engine.
    Computes risk score (0-100), risk level (Low, Medium, High), warning indicators, and practical recommendations.
    """
    # 1. Rate limiting check
    client_ip = req.client.host if req.client else "127.0.0.1"
    if not rate_limiter.is_allowed(client_ip):
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Rate limit exceeded. Please wait a minute before analyzing another posting."
        )

    # 2. Validate application URL (safe syntax, strictly no SSRF)
    if request_data.application_url:
        is_safe, err_msg = validate_safe_url(request_data.application_url)
        if not is_safe:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Invalid Application URL: {err_msg}"
            )

    # 3. Sanitize text inputs
    job_title = sanitize_text(request_data.job_title)
    company_name = sanitize_text(request_data.company_name)
    job_description = sanitize_text(request_data.job_description)
    location = sanitize_text(request_data.location or "")
    job_type = sanitize_text(request_data.job_type or "Full-time")
    salary_stipend = sanitize_text(request_data.salary_stipend or "")
    application_url = (request_data.application_url or "").strip()
    recruiter_email = (request_data.recruiter_email or "").strip().lower()

    if len(job_description) < 20:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Job description must be at least 20 characters long."
        )

    # 4. Run detection engine
    engine = get_engine()
    prediction = engine.predict_risk(
        job_title=job_title,
        company_name=company_name,
        job_description=job_description,
        location=location,
        job_type=job_type,
        salary_stipend=salary_stipend,
        application_url=application_url,
        recruiter_email=recruiter_email
    )

    # 5. Persist record in database
    record = AnalysisRecord(
        session_id=request_data.session_id,
        job_title=job_title,
        company_name=company_name,
        job_description=job_description,
        location=location,
        job_type=job_type,
        salary_stipend=salary_stipend,
        application_url=application_url,
        recruiter_email=recruiter_email,
        risk_score=prediction["risk_score"],
        risk_level=prediction["risk_level"],
        ml_score=prediction["ml_score"],
        rule_score=prediction["rule_score"],
        warning_signs_json=json.dumps(prediction["warning_signs"]),
        explanations_json=json.dumps(prediction["explanations"]),
        recommendations_json=json.dumps(prediction["recommendations"]),
        created_at=datetime.now(timezone.utc)
    )
    db.add(record)
    db.commit()
    db.refresh(record)

    return JobAnalysisResponse(
        id=record.id,
        job_title=record.job_title,
        company_name=record.company_name,
        location=record.location,
        job_type=record.job_type,
        salary_stipend=record.salary_stipend,
        application_url=record.application_url,
        recruiter_email=record.recruiter_email,
        risk_score=record.risk_score,
        risk_level=record.risk_level,
        ml_score=record.ml_score,
        rule_score=record.rule_score,
        model_mode=prediction["model_mode"],
        warning_signs=prediction["warning_signs"],
        explanations=prediction["explanations"],
        recommendations=prediction["recommendations"],
        created_at=record.created_at
    )
