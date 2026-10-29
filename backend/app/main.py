import os
# Enforce thread control for Windows stability
os.environ["OMP_NUM_THREADS"] = "1"
os.environ["OPENBLAS_NUM_THREADS"] = "1"
os.environ["MKL_NUM_THREADS"] = "1"

from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from backend.app.config import settings
from backend.app.database import init_db
from backend.app.ml.model import get_engine
from backend.app.utils.security import SecurityHeadersMiddleware
from backend.app.routes import health, analyze, history, reports, methodology

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Ensure database tables are created & ML model is initialized
    init_db()
    get_engine()
    yield

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="A hybrid AI/ML and heuristic detection platform to detect fraudulent job and internship postings.",
    lifespan=lifespan
)

# Security Headers Middleware
app.add_middleware(SecurityHeadersMiddleware)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if "*" in settings.ALLOWED_ORIGINS else settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount Routers under API prefix
app.include_router(health.router, prefix=settings.API_PREFIX)
app.include_router(analyze.router, prefix=settings.API_PREFIX)
app.include_router(history.router, prefix=settings.API_PREFIX)
app.include_router(reports.router, prefix=settings.API_PREFIX)
app.include_router(methodology.router, prefix=settings.API_PREFIX)

@app.get("/")
def root():
    return {
        "title": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "status": "online",
        "documentation": "/docs",
        "api_health": f"{settings.API_PREFIX}/health",
        "methodology": f"{settings.API_PREFIX}/methodology"
    }

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal Server Error",
            "message": "An unexpected error occurred during processing. Please try again."
        }
    )
