import os
from functools import lru_cache

from dotenv import dotenv_values
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseSettings

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")


class Settings(BaseSettings):

    config = {
        **dotenv_values(".env"),
        **os.environ,
    }

    # Auth constants
    SECRET_KEY = config["SECRET_KEY"]
    ALGORITHM = config["ALGORITHM"] or "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = config["ACCESS_TOKEN_EXPIRE_MINUTES"]

    class Config:
        env_file = ".env"


@lru_cache()
def get_settings():
    return Settings()
