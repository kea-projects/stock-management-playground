import os

from dotenv import dotenv_values
from httpx import AsyncClient

from ..main import app
from ..configs.settings import get_settings


def get_test_environment():
    settings = get_settings()
    settings.config = {
        **dotenv_values(".env.test"),
        **os.environ,
    }
    client = AsyncClient(app=app, base_url="http://test")

    return {"test_client": client, "test_settings": settings}


def verify_token_override():
    return True
