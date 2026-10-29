import logging
from typing import Dict, Any, Optional
import joblib
from backend.app.config import settings
from backend.app.ml.heuristic_rules import evaluate_heuristics
from backend.app.ml.train import build_feature_text, train_job_classifier

logger = logging.getLogger("ml_model")

class FraudDetectionEngine:
    _instance: Optional["FraudDetectionEngine"] = None

    def __init__(self):
        self.classifier = None
        self.vectorizer = None
        self.mode = "Uninitialized"
        self._load_or_train()

    def _load_or_train(self):
        """Loads trained artifacts or trains them on initial startup."""
        if settings.MODEL_PATH.exists() and settings.VECTORIZER_PATH.exists():
            try:
                self.classifier = joblib.load(settings.MODEL_PATH)
                self.vectorizer = joblib.load(settings.VECTORIZER_PATH)
                self.mode = "Trained ML Model (TF-IDF + Logistic Regression)"
                logger.info("ML model and vectorizer loaded successfully from disk.")
                return
            except Exception as e:
                logger.warning(f"Error loading model artifacts: {e}. Attempting training.")

        try:
            clf, vec, _ = train_job_classifier()
            self.classifier = clf
            self.vectorizer = vec
            self.mode = "Trained ML Model (TF-IDF + Logistic Regression)"
            logger.info("Trained model generated and cached.")
        except Exception as e:
            logger.error(f"Could not train ML model automatically: {e}. Falling back to Rule-Based Preliminary Engine.")
            self.mode = "Rule-Based Preliminary Engine (Heuristic Fallback)"

    def predict_risk(
        self,
        job_title: str,
        company_name: str,
        job_description: str,
        location: str = "",
        job_type: str = "Full-time",
        salary_stipend: str = "",
        application_url: str = "",
        recruiter_email: str = ""
    ) -> Dict[str, Any]:
        """
        Runs hybrid detection pipeline:
        1. Heuristic rule analysis -> rule_score, warnings, explanations, recommendations
        2. ML TF-IDF text classification -> ml_score (probability 0-100)
        3. Calibrated composite risk scoring
        """
        # 1. Run rule heuristics
        rule_score, warning_signs, explanations, recommendations = evaluate_heuristics(
            job_title=job_title,
            company_name=company_name,
            job_description=job_description,
            location=location,
            job_type=job_type,
            salary_stipend=salary_stipend,
            application_url=application_url,
            recruiter_email=recruiter_email
        )

        # 2. Run ML classification
        ml_score = 0.0
        ml_active = self.classifier is not None and self.vectorizer is not None

        if ml_active:
            try:
                feature_text = build_feature_text({
                    "job_title": job_title,
                    "company_name": company_name,
                    "job_description": job_description,
                    "salary_stipend": salary_stipend,
                    "recruiter_email": recruiter_email,
                    "application_url": application_url
                })
                X_vec = self.vectorizer.transform([feature_text])
                prob = self.classifier.predict_proba(X_vec)[0, 1]
                ml_score = round(float(prob) * 100.0, 1)
            except Exception as e:
                logger.error(f"Error during ML inference: {e}")
                ml_score = rule_score

        # 3. Score calibration & ensemble weighting
        if ml_active:
            # Check if critical high-severity warnings exist (e.g. upfront fee, sensitive banking)
            has_critical_flag = any(w.get("severity") == "high" for w in warning_signs)

            if has_critical_flag:
                # Rule heuristic acts as an essential safeguard for explicit red flags
                composite = 0.40 * ml_score + 0.60 * rule_score
                # Ensure severe red flags can never produce a deceptive Low score
                composite = max(composite, rule_score)
            else:
                composite = 0.50 * ml_score + 0.50 * rule_score
        else:
            composite = rule_score

        final_score = int(round(min(100.0, max(0.0, composite))))

        # 4. Map risk category
        if final_score <= 35:
            risk_level = "Low"
        elif final_score <= 69:
            risk_level = "Medium"
        else:
            risk_level = "High"

        return {
            "risk_score": final_score,
            "risk_level": risk_level,
            "ml_score": ml_score,
            "rule_score": rule_score,
            "model_mode": self.mode,
            "warning_signs": warning_signs,
            "explanations": explanations,
            "recommendations": recommendations
        }

# Singleton accessor
_engine_instance = None

def get_engine() -> FraudDetectionEngine:
    global _engine_instance
    if _engine_instance is None:
        _engine_instance = FraudDetectionEngine()
    return _engine_instance
