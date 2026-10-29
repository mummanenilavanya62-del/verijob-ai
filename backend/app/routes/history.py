import json
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from sqlalchemy import desc
from backend.app.database import get_db
from backend.app.models import AnalysisRecord
from backend.app.schemas import HistoryItemSummary, JobAnalysisResponse

router = APIRouter(prefix="/history", tags=["History"])

@router.get("", response_model=List[HistoryItemSummary])
def get_analysis_history(
    session_id: Optional[str] = Query(None, description="Optional client session identifier"),
    limit: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db)
):
    """
    Retrieves recent job analyses. If a session_id is provided, returns that session's records;
    otherwise returns recent public demonstrative records.
    """
    query = db.query(AnalysisRecord)
    if session_id:
        query = query.filter(AnalysisRecord.session_id == session_id)
    
    records = query.order_by(desc(AnalysisRecord.created_at)).limit(limit).all()

    results = []
    for r in records:
        try:
            warnings = json.loads(r.warning_signs_json)
        except Exception:
            warnings = []

        results.append(
            HistoryItemSummary(
                id=r.id,
                job_title=r.job_title,
                company_name=r.company_name,
                location=r.location or "",
                job_type=r.job_type or "",
                risk_score=r.risk_score,
                risk_level=r.risk_level,
                warning_count=len(warnings),
                created_at=r.created_at
            )
        )
    return results

@router.get("/{analysis_id}", response_model=JobAnalysisResponse)
def get_analysis_by_id(analysis_id: str, db: Session = Depends(get_db)):
    """Retrieves full analysis report by record ID."""
    record = db.query(AnalysisRecord).filter(AnalysisRecord.id == analysis_id).first()
    if not record:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Analysis record not found"
        )

    try:
        warnings = json.loads(record.warning_signs_json)
        explanations = json.loads(record.explanations_json)
        recommendations = json.loads(record.recommendations_json)
    except Exception:
        warnings, explanations, recommendations = [], [], []

    return JobAnalysisResponse(
        id=record.id,
        job_title=record.job_title,
        company_name=record.company_name,
        location=record.location or "",
        job_type=record.job_type or "",
        salary_stipend=record.salary_stipend or "",
        application_url=record.application_url or "",
        recruiter_email=record.recruiter_email or "",
        risk_score=record.risk_score,
        risk_level=record.risk_level,
        ml_score=record.ml_score,
        rule_score=record.rule_score,
        model_mode="Trained ML Model / Rule Engine",
        warning_signs=warnings,
        explanations=explanations,
        recommendations=recommendations,
        created_at=record.created_at
    )

@router.delete("/{analysis_id}")
def delete_analysis(analysis_id: str, db: Session = Depends(get_db)):
    """Deletes an analysis record from history."""
    record = db.query(AnalysisRecord).filter(AnalysisRecord.id == analysis_id).first()
    if not record:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Analysis record not found"
        )
    db.delete(record)
    db.commit()
    return {"status": "success", "message": "Analysis record deleted successfully", "id": analysis_id}
