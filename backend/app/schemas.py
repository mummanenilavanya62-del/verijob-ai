from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field, ConfigDict, field_validator

class JobAnalysisRequest(BaseModel):
    job_title: str = Field(..., min_length=2, max_length=255, description="Job or internship position title")
    company_name: str = Field(..., min_length=2, max_length=255, description="Hiring company or organization")
    job_description: str = Field(..., min_length=20, max_length=25000, description="Full job description or offer text")
    location: Optional[str] = Field(default="", max_length=255, description="City, country or Remote")
    job_type: Optional[str] = Field(default="Full-time", max_length=100, description="Internship, Full-time, Remote, etc.")
    salary_stipend: Optional[str] = Field(default="", max_length=255, description="Offered compensation or stipend")
    application_url: Optional[str] = Field(default="", max_length=1024, description="Application link or portal")
    recruiter_email: Optional[str] = Field(default="", max_length=255, description="Contact email provided by recruiter")
    session_id: Optional[str] = Field(default=None, max_length=64, description="Client session identifier for personal history")

    @field_validator("job_title", "company_name", "job_description")
    @classmethod
    def strip_and_validate(cls, v: str) -> str:
        cleaned = v.strip()
        if not cleaned:
            raise ValueError("Field cannot be empty or just whitespace")
        return cleaned

class WarningSignItem(BaseModel):
    code: str
    category: str  # financial, urgency, contact, compensation, content
    severity: str  # high, medium, low
    title: str
    description: str
    evidence: Optional[str] = None

class ExplanationCard(BaseModel):
    title: str
    impact: str
    detail: str

class JobAnalysisResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    job_title: str
    company_name: str
    location: Optional[str] = ""
    job_type: Optional[str] = "Full-time"
    salary_stipend: Optional[str] = ""
    application_url: Optional[str] = ""
    recruiter_email: Optional[str] = ""
    risk_score: int
    risk_level: str  # Low, Medium, High
    ml_score: float
    rule_score: float
    model_mode: str
    warning_signs: List[WarningSignItem]
    explanations: List[ExplanationCard]
    recommendations: List[str]
    created_at: datetime

class HistoryItemSummary(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    job_title: str
    company_name: str
    location: Optional[str] = ""
    job_type: Optional[str] = ""
    risk_score: int
    risk_level: str
    warning_count: int
    created_at: datetime

class ScamReportCreate(BaseModel):
    job_title: str = Field(..., min_length=2, max_length=255)
    company_name: str = Field(..., min_length=2, max_length=255)
    source_url: Optional[str] = Field(default="", max_length=1024)
    scam_description: str = Field(..., min_length=10, max_length=5000)
    scam_type: str = Field(default="suspicious_fees", max_length=100)
    contact_email: Optional[str] = Field(default="", max_length=255)

class ScamReportResponse(BaseModel):
    id: str
    status: str
    message: str

class MethodologyResponse(BaseModel):
    title: str
    pipeline_overview: str
    ml_components: dict
    rule_heuristics: List[dict]
    scoring_calibration: dict
    disclaimer: str

class SampleJob(BaseModel):
    id: str
    label: str
    category: str
    expected_risk: str
    description_summary: str
    data: JobAnalysisRequest
