from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from backend.app.database import get_db
from backend.app.models import ScamReportRecord
from backend.app.schemas import ScamReportCreate, ScamReportResponse
from backend.app.utils.security import sanitize_text

router = APIRouter(prefix="/reports", tags=["Community Scam Reports"])

@router.post("", response_model=ScamReportResponse)
def submit_scam_report(report_data: ScamReportCreate, db: Session = Depends(get_db)):
    """Allows candidates to report suspected fraudulent job listings to protect others."""
    job_title = sanitize_text(report_data.job_title)
    company_name = sanitize_text(report_data.company_name)
    scam_desc = sanitize_text(report_data.scam_description)

    if len(scam_desc) < 10:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Report description must be at least 10 characters."
        )

    report = ScamReportRecord(
        job_title=job_title,
        company_name=company_name,
        source_url=(report_data.source_url or "").strip(),
        scam_description=scam_desc,
        scam_type=report_data.scam_type,
        contact_email=(report_data.contact_email or "").strip().lower()
    )
    db.add(report)
    db.commit()
    db.refresh(report)

    return ScamReportResponse(
        id=report.id,
        status="received",
        message="Thank you! Your scam report has been logged to improve detection patterns."
    )
