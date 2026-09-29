"""
Authentication utilities — JWT + bcrypt
"""
import os
from datetime import datetime, timedelta, timezone
from typing import Optional
from passlib.context import CryptContext
from jose import jwt, JWTError
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

JWT_ALGORITHM = os.environ.get("JWT_ALGORITHM", "HS256")
JWT_EXPIRE_HOURS = int(os.environ.get("JWT_EXPIRE_HOURS", "720"))

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login", auto_error=False)


def _jwt_secret() -> Optional[str]:
    secret = os.environ.get("JWT_SECRET")
    return secret if secret else None


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(password: str, hashed: str) -> bool:
    try:
        return pwd_context.verify(password, hashed)
    except Exception:
        return False


def create_access_token(user_id: str) -> str:
    secret = _jwt_secret()
    if not secret:
        raise HTTPException(status_code=503, detail="JWT_SECRET is not configured")
    expire = datetime.now(timezone.utc) + timedelta(hours=JWT_EXPIRE_HOURS)
    payload = {"sub": user_id, "exp": expire}
    return jwt.encode(payload, secret, algorithm=JWT_ALGORITHM)


def decode_token(token: str) -> Optional[str]:
    secret = _jwt_secret()
    if not secret:
        return None
    try:
        payload = jwt.decode(token, secret, algorithms=[JWT_ALGORITHM])
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
