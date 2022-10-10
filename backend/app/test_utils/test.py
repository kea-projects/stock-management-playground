import os

from dotenv import dotenv_values
from httpx import AsyncClient

from ..main import app
from ..configs.settings import get_settings


def get_test_settings():
    settings = get_settings()
    settings.config = {
        **dotenv_values(".env.test"),
        **os.environ,
    }

    return settings


def get_test_client():
    client = AsyncClient(app=app, base_url="http://test")

    return client


def verify_token_override():
    return True
