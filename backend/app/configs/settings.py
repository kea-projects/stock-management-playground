import os

from functools import lru_cache
from dotenv import dotenv_values
from pydantic import BaseSettings


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
