import json
import logging
from pathlib import Path
from typing import Dict, Any, Tuple
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, classification_report
from backend.app.config import settings
from backend.app.ml.dataset import load_benchmark_records, ensure_dataset_exists

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("ml_trainer")

def build_feature_text(item: Dict[str, Any]) -> str:
    """Concatenate key text fields into a rich corpus feature string."""
    title = item.get("job_title", "")
    company = item.get("company_name", "")
    desc = item.get("job_description", "")
    salary = item.get("salary_stipend", "")
    email = item.get("recruiter_email", "")
    url = item.get("application_url", "")
    return f"{title} {company} {desc} {salary} {email} {url}".lower()

def train_job_classifier() -> Tuple[LogisticRegression, TfidfVectorizer, Dict[str, Any]]:
    """Trains TF-IDF + Logistic Regression model and saves serialized artifacts."""
    ensure_dataset_exists()
    records = load_benchmark_records()

    texts = [build_feature_text(r) for r in records]
    labels = [r["is_fraudulent"] for r in records]

    # Initialize TF-IDF Vectorizer
    vectorizer = TfidfVectorizer(
        ngram_range=(1, 2),
        max_features=2500,
        sublinear_tf=True,
        stop_words="english"
    )
    X = vectorizer.fit_transform(texts)
    y = labels

    # Train Logistic Regression with balanced weighting
    classifier = LogisticRegression(
        C=1.5,
        class_weight="balanced",
        random_state=42,
        max_iter=500
    )
    classifier.fit(X, y)

    # Evaluate predictions
    y_pred = classifier.predict(X)
    y_prob = classifier.predict_proba(X)[:, 1]

    acc = float(accuracy_score(y, y_pred))
    prec = float(precision_score(y, y_pred, zero_division=0))
    rec = float(recall_score(y, y_pred, zero_division=0))
    f1 = float(f1_score(y, y_pred, zero_division=0))
    report = classification_report(y, y_pred, output_dict=True)

    metrics = {
        "model_type": "TF-IDF + Logistic Regression",
        "dataset_size": len(records),
        "legitimate_samples": sum(1 for label in y if label == 0),
        "fraudulent_samples": sum(1 for label in y if label == 1),
        "training_accuracy": round(acc, 4),
        "precision": round(prec, 4),
        "recall": round(rec, 4),
        "f1_score": round(f1, 4),
        "vocabulary_size": len(vectorizer.vocabulary_),
        "detailed_report": report
    }

    # Save artifacts
    settings.DATA_DIR.mkdir(parents=True, exist_ok=True)
    joblib.dump(classifier, settings.MODEL_PATH)
    joblib.dump(vectorizer, settings.VECTORIZER_PATH)
    
    metrics_path = settings.DATA_DIR / "training_metrics.json"
    with open(metrics_path, "w", encoding="utf-8") as f:
        json.dump(metrics, f, indent=2)

    logger.info(f"Model successfully saved to {settings.MODEL_PATH}")
    logger.info(f"Vectorizer successfully saved to {settings.VECTORIZER_PATH}")
    logger.info(f"Training accuracy: {acc * 100:.2f}%, F1: {f1 * 100:.2f}%")

    return classifier, vectorizer, metrics

if __name__ == "__main__":
    train_job_classifier()
