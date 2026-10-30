from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from backend.app.config import settings

connect_args = {}
if settings.DATABASE_URL.startswith("sqlite"):
    connect_args = {"check_same_thread": False}

engine = create_engine(
    settings.DATABASE_URL,
    connect_args=connect_args,
    pool_pre_ping=True
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

_db_initialized = False

def init_db():
    global _db_initialized
    import backend.app.models  # noqa: F401
    Base.metadata.create_all(bind=engine)

    # Lightweight auto-migration: ensure new columns exist in existing databases
    with engine.connect() as conn:
        try:
            if engine.dialect.name == "sqlite":
                result = conn.exec_driver_sql("PRAGMA table_info(analysis_records)").fetchall()
                cols = [r[1] for r in result]
                if cols and "model_mode" not in cols:
                    conn.exec_driver_sql(
                        "ALTER TABLE analysis_records ADD COLUMN model_mode VARCHAR(100) DEFAULT 'Trained ML Model (TF-IDF + Logistic Regression)'"
                    )
                    conn.commit()
            elif engine.dialect.name == "postgresql":
                conn.exec_driver_sql(
                    "ALTER TABLE analysis_records ADD COLUMN IF NOT EXISTS model_mode VARCHAR(100) DEFAULT 'Trained ML Model (TF-IDF + Logistic Regression)'"
                )
                conn.commit()
        except Exception:
            pass

    _db_initialized = True

def get_db():
    global _db_initialized
    if not _db_initialized:
        init_db()
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
