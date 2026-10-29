from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from backend.app.database import get_db
from backend.app.ml.model import get_engine
from backend.app.config import settings

router = APIRouter(tags=["Health"])

@router.get("/health")
def check_health(db: Session = Depends(get_db)):
    """Health check endpoint reporting database and ML model operational status."""
    db_status = "connected"
    try:
        db.execute(text("SELECT 1"))
    except Exception as e:
        db_status = f"unhealthy: {str(e)}"

    engine = get_engine()

    return {
        "status": "healthy" if db_status == "connected" else "degraded",
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "database": db_status,
        "ml_engine_mode": engine.mode,
        "model_file_present": settings.MODEL_PATH.exists(),
        "vectorizer_file_present": settings.VECTORIZER_PATH.exists()
    }
