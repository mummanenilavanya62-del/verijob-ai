import os
from pathlib import Path
from typing import List

BASE_DIR = Path(__file__).resolve().parent.parent

class Settings:
    PROJECT_NAME: str = "AI-Based Fake Job and Internship Detection System"
    VERSION: str = "1.0.0"
    API_PREFIX: str = "/api"
    
    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL", f"sqlite:///{BASE_DIR / 'fake_job_detection.db'}")
    if DATABASE_URL.startswith("postgres://"):
        DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

    # CORS
    ALLOWED_ORIGINS: List[str] = [
        origin.strip()
        for origin in os.getenv(
            "ALLOWED_ORIGINS",
            "http://localhost:5173,http://localhost:3000,http://127.0.0.1:5173,http://127.0.0.1:3000,*"
        ).split(",")
        if origin.strip()
    ]

    # ML Paths
    DATA_DIR: Path = BASE_DIR / "data"
    MODEL_PATH: Path = DATA_DIR / "job_classifier_model.joblib"
    VECTORIZER_PATH: Path = DATA_DIR / "tfidf_vectorizer.joblib"
    DATASET_PATH: Path = DATA_DIR / "job_postings_benchmark.json"

    # Rate limiting & limits
    MAX_REQUEST_BODY_BYTES: int = 100 * 1024  # 100 KB
    RATE_LIMIT_PER_MINUTE: int = int(os.getenv("RATE_LIMIT_PER_MINUTE", "60"))

settings = Settings()
