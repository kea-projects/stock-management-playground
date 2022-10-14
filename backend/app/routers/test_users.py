import pytest
import pytest_asyncio

from ..main import app
from ..models.user import User
from ..services.user import get_current_user
from ..test_utils.test import (get_current_user_override, get_test_client,
                               get_test_settings, verify_token_override)
from ..utils.auth import verify_password, verify_token
from ..utils.mongo import close_db, init_db

# Setting up the Test Client
settings = get_test_settings()
client = get_test_client()
endpoint_prefix = "/users"

# Test Data
test_full_name = "Test User"
test_password = "testPassword123!"
test_username = "test@user.pass"
test_user = {
    "full_name": test_full_name,
    "password": test_password,
    "username": test_username
}

# Overriding dependencies


async def get_current_user_wrapper():
    return await get_current_user_override(
        test_full_name,
        test_username,
        test_password
    )


app.dependency_overrides[verify_token] = verify_token_override
app.dependency_overrides[get_current_user] = get_current_user_wrapper


@pytest_asyncio.fixture(autouse=True)
async def run_around_tests():
    # Code that will run before your test, for example:
    await init_db(settings)
    yield
    # Code that will run after your test, for example:
    await User.delete_all()
    close_db()


@pytest.mark.asyncio
async def test_read_user_self():
    response = await client.get(f"{endpoint_prefix}/me")

    assert response.status_code == 200, response.text
    data = response.json()
    assert data["full_name"] == test_full_name
    assert data["username"] == test_username
    assert verify_password(test_password, data["password"])
    assert "_id" in data
