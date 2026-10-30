import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Text, Float, Integer, DateTime
from backend.app.database import Base

def utc_now():
    return datetime.now(timezone.utc)

class AnalysisRecord(Base):
    __tablename__ = "analysis_records"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    session_id = Column(String(64), index=True, nullable=True)
    job_title = Column(String(255), nullable=False)
    company_name = Column(String(255), nullable=False)
    job_description = Column(Text, nullable=False)
    location = Column(String(255), nullable=True, default="")
    job_type = Column(String(100), nullable=True, default="Full-time")
    salary_stipend = Column(String(255), nullable=True, default="")
    application_url = Column(String(1024), nullable=True, default="")
    recruiter_email = Column(String(255), nullable=True, default="")
    
    # Risk assessments
    risk_score = Column(Integer, nullable=False)  # 0 to 100
    risk_level = Column(String(20), nullable=False)  # Low, Medium, High
    ml_score = Column(Float, nullable=False, default=0.0)
    rule_score = Column(Float, nullable=False, default=0.0)
    model_mode = Column(String(100), nullable=True, default="Trained ML Model (TF-IDF + Logistic Regression)")
    
    # Serialized JSON representations
    warning_signs_json = Column(Text, nullable=False, default="[]")
    explanations_json = Column(Text, nullable=False, default="[]")
    recommendations_json = Column(Text, nullable=False, default="[]")
    
    created_at = Column(DateTime, default=utc_now, nullable=False)

class ScamReportRecord(Base):
    __tablename__ = "scam_reports"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    job_title = Column(String(255), nullable=False)
    company_name = Column(String(255), nullable=False)
    source_url = Column(String(1024), nullable=True, default="")
    scam_description = Column(Text, nullable=False)
    scam_type = Column(String(100), nullable=False, default="suspicious_fees")
    contact_email = Column(String(255), nullable=True, default="")
    created_at = Column(DateTime, default=utc_now, nullable=False)
