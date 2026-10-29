from fastapi import APIRouter
from backend.app.schemas import MethodologyResponse

router = APIRouter(prefix="/methodology", tags=["Methodology"])

@router.get("", response_model=MethodologyResponse)
def get_methodology():
    """Provides transparent documentation of AI/ML algorithms and heuristic scoring rules."""
    return MethodologyResponse(
        title="AI-Based Fake Job and Internship Detection Methodology",
        pipeline_overview=(
            "The system employs a dual-stage hybrid architecture combining statistical machine learning "
            "with explainable heuristic risk auditing. Natural language text is vectorized using TF-IDF "
            "and evaluated via Logistic Regression, while deterministic heuristic rules inspect explicit "
            "indicators such as upfront registration fees, company-email domain mismatches, and credential harvesting."
        ),
        ml_components={
            "algorithm": "Logistic Regression with L2 Regularization & Balanced Class Weights",
            "feature_extraction": "TF-IDF (Term Frequency-Inverse Document Frequency) with Sublinear Scaling",
            "ngram_range": "(1, 2) unigrams and bigrams",
            "max_features": 2500,
            "training_objective": "Binary Classification (0 = Legitimate, 1 = Fraudulent/Suspicious)",
            "interpretability": "Log-odds coefficient weights mapped back to vocabulary tokens"
        },
        rule_heuristics=[
            {
                "rule_name": "Upfront Fee & Deposit Detection",
                "severity": "High (up to +38 points)",
                "rationale": "Legitimate employers never demand payment for registration, training kits, or equipment."
            },
            {
                "rule_name": "Premature Banking & Credential Harvesting",
                "severity": "High (up to +32 points)",
                "rationale": "Demanding bank credentials, OTPs, or credit cards before employment is a direct sign of wire or identity fraud."
            },
            {
                "rule_name": "Enterprise vs Free Email Provider Mismatch",
                "severity": "High (up to +28 points)",
                "rationale": "Major tech corporations recruit strictly through enterprise domains, never personal @gmail.com or @yahoo.com."
            },
            {
                "rule_name": "Guaranteed Hiring Without Interview",
                "severity": "High (up to +22 points)",
                "rationale": "Instant appointments with zero screening are commonly used to exploit vulnerable job seekers."
            },
            {
                "rule_name": "Discreet Off-Platform Messaging (Telegram/WhatsApp)",
                "severity": "High (up to +20 points)",
                "rationale": "Scammers avoid corporate ATS records and video interviews by conducting hiring on disposable text channels."
            },
            {
                "rule_name": "Suspicious TLD or Masked URL",
                "severity": "Medium/High (up to +18 points)",
                "rationale": "Disposable domains (.top, .xyz) or link shorteners conceal the true recipient server."
            },
            {
                "rule_name": "Exaggerated Compensation & Low Quality Description",
                "severity": "Medium (up to +16 points)",
                "rationale": "Unrealistic salaries for basic typing tasks serve as clickbait to deceive candidates."
            }
        ],
        scoring_calibration={
            "score_range": "0 to 100",
            "categories": {
                "Low": "0 - 35 (Standard, safe patterns detected)",
                "Medium": "36 - 69 (Caution recommended, ambiguous or unverified signals)",
                "High": "70 - 100 (Severe red flags detected, high probability of deception)"
            },
            "ensemble_weighting": "50% ML semantic probability + 50% Heuristic score (with critical floor safeguard)"
        },
        disclaimer=(
            "This automated tool computes risk indicators based on empirical patterns and text heuristics. "
            "It does not guarantee whether a listing is genuine or fraudulent. Candidates should always "
            "verify job postings directly through official corporate career portals."
        )
    )
