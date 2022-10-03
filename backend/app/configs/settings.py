import os

from pydantic import BaseSettings
from dotenv import dotenv_values


class Settings(BaseSettings):
    config = {
        **dotenv_values(".env"),
        **os.environ,
    }

    class Config:
        env_file = ".env"
