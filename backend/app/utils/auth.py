from datetime import datetime, timedelta
from typing import Union

from fastapi import Depends
from passlib.context import CryptContext
from jose import jwt, ExpiredSignatureError

from ..configs.settings import oauth2_scheme, Settings, get_settings
from ..utils.custom_exceptions import expired_token_exception
from ..services.user import get_user_by_username

bcrypt = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_token(token: str = Depends(oauth2_scheme),
                 settings: Settings = Depends(get_settings)):
    try:
        jwt.decode(token, settings.SECRET_KEY,
                   algorithms=[settings.ALGORITHM])
        return True
    except ExpiredSignatureError:
        raise expired_token_exception


async def authenticate_user(username: str, password: str):
    user = await get_user_by_username(username)
    if not user:
        return False
    if not verify_password(password, user.password):
        return False
    return user


def create_access_token(data: dict,
                        expires_delta: Union[timedelta, None] = None):
    settings = get_settings()
    to_encode = data.copy()

    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)

    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(
        to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt


def verify_password(plain_password, hashed_password):
    return bcrypt.verify(plain_password, hashed_password)


def get_password_hash(password):
    return bcrypt.hash(password)
