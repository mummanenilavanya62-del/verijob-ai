import json
import logging
from typing import Dict, Any, List
import joblib
from sklearn.metrics import classification_report, confusion_matrix
from backend.app.config import settings
from backend.app.ml.dataset import load_benchmark_records
from backend.app.ml.train import build_feature_text

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("ml_evaluator")

def evaluate_model() -> Dict[str, Any]:
    """Loads saved model artifacts, evaluates performance, and extracts top indicative tokens."""
    if not settings.MODEL_PATH.exists() or not settings.VECTORIZER_PATH.exists():
        logger.warning("Model or vectorizer artifact not found. Please train first.")
        return {"error": "Artifacts not found"}

    classifier = joblib.load(settings.MODEL_PATH)
    vectorizer = joblib.load(settings.VECTORIZER_PATH)
    records = load_benchmark_records()

    texts = [build_feature_text(r) for r in records]
    y_true = [r["is_fraudulent"] for r in records]

    X = vectorizer.transform(texts)
    y_pred = classifier.predict(X)
    y_prob = classifier.predict_proba(X)[:, 1]

    cm = confusion_matrix(y_true, y_pred).tolist()
    report = classification_report(y_true, y_pred, target_names=["Legitimate", "Fraudulent"], output_dict=True)

    # Feature importance extraction (interpretability)
    feature_names = vectorizer.get_feature_names_out()
    coef = classifier.coef_[0]

    # Highest positive coefficients -> Most indicative of fraud
    top_fraud_indices = coef.argsort()[-10:][::-1]
    top_fraud_tokens = [{"token": str(feature_names[i]), "weight": round(float(coef[i]), 4)} for i in top_fraud_indices]

    # Most negative coefficients -> Most indicative of legitimate posting
    top_legit_indices = coef.argsort()[:10]
    top_legit_tokens = [{"token": str(feature_names[i]), "weight": round(float(coef[i]), 4)} for i in top_legit_indices]

    summary = {
        "status": "Evaluated successfully",
        "sample_count": len(records),
        "confusion_matrix": cm,
        "classification_report": report,
        "top_fraud_indicators": top_fraud_tokens,
        "top_legitimate_indicators": top_legit_tokens
    }

    print("\n========== MODEL EVALUATION SUMMARY ==========")
    print(f"Total benchmark samples: {len(records)}")
    print(f"Confusion Matrix [TN, FP], [FN, TP]: {cm}")
    print("\nTop 5 Fraud-predictive tokens:")
    for t in top_fraud_tokens[:5]:
        print(f"  + {t['token']:<20} (weight: {t['weight']})")
    print("\nTop 5 Legitimacy-predictive tokens:")
    for t in top_legit_tokens[:5]:
        print(f"  - {t['token']:<20} (weight: {t['weight']})")
    print("==============================================\n")

    return summary

if __name__ == "__main__":
    evaluate_model()
