import os
from typing import List
from datetime import timedelta

from beanie import PydanticObjectId, WriteRules
from dotenv import dotenv_values
from httpx import AsyncClient

from ..configs.settings import get_settings
from ..main import app
from ..models.user import User
from ..models.wallet import Wallet
from ..utils.auth import create_access_token, get_password_hash


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


async def get_current_user_override(
        full_name: str,
        username: str,
        password: str,
        wallets: List[Wallet] = []
):
    user = User(
        full_name=full_name,
        username=username,
        password=get_password_hash(password)
    )
    user = await user.create()

    user.wallets = wallets
    await user.save(link_rule=WriteRules.WRITE)

    return await User.get(user.id)


def oauth2_scheme_override(username: str = None, expires_in: int = None):
    settings = get_test_settings()

    access_token_expires = timedelta(
        minutes=expires_in or settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": username, "id": str(PydanticObjectId())},
        settings=settings,
        expires_delta=access_token_expires
    )

    return access_token
