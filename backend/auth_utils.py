"""
Authentication utilities — JWT + bcrypt
"""
import os
import secrets
from datetime import datetime, timedelta, timezone
from typing import Optional
from passlib.context import CryptContext
from jose import jwt, JWTError
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

# JWT is always read from the environment at use-time so a Vercel JWT_SECRET
# change applies on the next request (no hardcoded production key in source).
_EPHEMERAL_JWT = secrets.token_hex(32)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login", auto_error=False)


def _jwt_secret() -> str:
    return os.environ.get("JWT_SECRET") or _EPHEMERAL_JWT


def _jwt_algorithm() -> str:
    return os.environ.get("JWT_ALGORITHM") or "HS256"


def _jwt_expire_hours() -> int:
    try:
        return int(os.environ.get("JWT_EXPIRE_HOURS") or "720")
    except ValueError:
        return 720


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(password: str, hashed: str) -> bool:
    try:
        return pwd_context.verify(password, hashed)
    except Exception:
        return False


def create_access_token(user_id: str) -> str:
    expire = datetime.now(timezone.utc) + timedelta(hours=_jwt_expire_hours())
    payload = {"sub": user_id, "exp": expire}
    return jwt.encode(payload, _jwt_secret(), algorithm=_jwt_algorithm())


def decode_token(token: str) -> Optional[str]:
    try:
        payload = jwt.decode(token, _jwt_secret(), algorithms=[_jwt_algorithm()])
        return payload.get("sub")
    except JWTError:
        return None


async def get_current_user_id(token: Optional[str] = Depends(oauth2_scheme)) -> str:
    if not token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated")
    user_id = decode_token(token)
    if not user_id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    return user_id


async def get_optional_user_id(token: Optional[str] = Depends(oauth2_scheme)) -> Optional[str]:
    if not token:
        return None
    return decode_token(token)
