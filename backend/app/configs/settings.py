import os

from dotenv import dotenv_values
from pydantic import BaseSettings


class Settings(BaseSettings):
    config = {
        **dotenv_values(".env"),
        **os.environ,
    }

    class Config:
        env_file = ".env"
