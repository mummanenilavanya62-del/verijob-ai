import re
import time
from urllib.parse import urlparse
from typing import Dict, Tuple
from fastapi import Request, HTTPException, status
from starlette.middleware.base import BaseHTTPMiddleware
from backend.app.config import settings

def sanitize_text(text: str) -> str:
    """Sanitizes user input by removing null bytes and strip HTML tags."""
    if not text:
        return ""
    # Remove null bytes
    cleaned = text.replace("\x00", "")
    # Strip dangerous HTML script tags
    cleaned = re.sub(r"<\s*script[^>]*>.*?<\s*/\s*script\s*>", "", cleaned, flags=re.IGNORECASE | re.DOTALL)
    cleaned = re.sub(r"<[^>]+>", " ", cleaned)
    return cleaned.strip()

def validate_safe_url(url: str) -> Tuple[bool, str]:
    """
    Validates URL syntax and ensures it points to a standard public web protocol.
    Crucially, does NOT make network calls (prevents SSRF).
    """
    if not url or not url.strip():
        return True, ""
    
    clean_url = url.strip()
    try:
        parsed = urlparse(clean_url)
        if parsed.scheme not in ("http", "https"):
            return False, "URL must start with http:// or https://"
        if not parsed.netloc:
            return False, "URL is missing a valid domain name"
        
        # Check against private / loopback IP address ranges
        hostname = parsed.hostname or ""
        if hostname in ("localhost", "127.0.0.1", "0.0.0.0", "::1"):
            return False, "Localhost addresses are not allowed"
        if hostname.startswith("10.") or hostname.startswith("192.168.") or (hostname.startswith("172.") and len(hostname.split(".")) > 1):
            return False, "Internal private networks are not allowed"
            
        return True, ""
    except Exception as e:
        return False, f"Invalid URL structure: {str(e)}"

class SimpleRateLimiter:
    """In-memory rate limiter per IP address for public API endpoints."""
    def __init__(self, requests_per_minute: int = 60):
        self.requests_per_minute = requests_per_minute
        self.history: Dict[str, list] = {}

    def is_allowed(self, client_ip: str) -> bool:
        now = time.time()
        window_start = now - 60.0
        
        # Clean expired timestamps
        timestamps = self.history.get(client_ip, [])
        valid_timestamps = [t for t in timestamps if t > window_start]
        
        if len(valid_timestamps) >= self.requests_per_minute:
            self.history[client_ip] = valid_timestamps
            return False
            
        valid_timestamps.append(now)
        self.history[client_ip] = valid_timestamps
        return True

rate_limiter = SimpleRateLimiter(requests_per_minute=settings.RATE_LIMIT_PER_MINUTE)

class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        # Enforce request size limit
        content_length = request.headers.get("content-length")
        if content_length and int(content_length) > settings.MAX_REQUEST_BODY_BYTES:
            raise HTTPException(
                status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
                detail=f"Request payload exceeds maximum allowed size ({settings.MAX_REQUEST_BODY_BYTES // 1024} KB)"
            )

        response = await call_next(request)
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        response.headers["Permissions-Policy"] = "geolocation=(), microphone=(), camera=()"
        return response
