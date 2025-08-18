import os
import hashlib
import hmac
from datetime import datetime, timedelta
import jwt


def hash_password(password: str) -> str:
    salt = os.environ.get('PASSWORD_SALT', 'static-salt').encode()
    return hashlib.pbkdf2_hmac('sha256', password.encode(), salt, 100_000).hex()


def verify_password(password: str, password_hash: str) -> bool:
    return hmac.compare_digest(hash_password(password), password_hash)


def create_token(payload: dict, expires_minutes: int = 60 * 24) -> str:
    secret = os.environ.get('SECRET_KEY', 'dev-secret')
    exp = datetime.utcnow() + timedelta(minutes=expires_minutes)
    to_encode = {**payload, 'exp': exp}
    return jwt.encode(to_encode, secret, algorithm='HS256')


def decode_token(token: str) -> dict | None:
    secret = os.environ.get('SECRET_KEY', 'dev-secret')
    try:
        return jwt.decode(token, secret, algorithms=['HS256'])
    except Exception:
        return None


