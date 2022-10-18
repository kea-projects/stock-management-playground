import pytest
import pytest_asyncio

from ..configs.settings import get_settings
from ..main import app
from ..models.user import User
from ..test_utils.test import (get_test_client, get_test_settings,
                               verify_token_override)
from ..utils.auth import get_password_hash, verify_password, verify_token
from ..utils.mongo import close_db, init_db

# Setting up the Test Client
settings = get_test_settings()
client = get_test_client()
endpoint_prefix = "/auth"

# Overriding dependencies
app.dependency_overrides[verify_token] = verify_token_override
app.dependency_overrides[get_settings] = get_test_settings

# Test Data
test_full_name = "Test User"
test_full_name_bad = "TestUser"
test_password = "testPassword123!"
test_password_bad = "testpassword"
test_username = "test@user.pass"
test_username_bad = "testuser.pass"
test_user = {
    "full_name": test_full_name,
    "password": test_password,
    "username": test_username
}

test_token_type = "bearer"
test_login_form = {
    "username": test_username,
    "password": test_password
}

bad_password_error = str("Password must contain a minimum of eight characte" +
                         "rs, at least one uppercase letter, one lowercase " +
                         "letter, one number and one special character")


@pytest_asyncio.fixture(autouse=True)
async def run_around_tests():
    # Code that will run before your test, for example:
    await init_db(settings)
    yield
    # Code that will run after your test, for example:
    await User.delete_all()
    close_db()


@pytest.mark.asyncio
async def test_signup():
    response = await client.post(f"{endpoint_prefix}/signup", json=test_user)

    assert response.status_code == 201, response.text
    data = response.json()
    assert data["full_name"] == test_full_name
    assert data["username"] == test_username
    assert verify_password(test_password, data["password"])
    assert "_id" in data


@pytest.mark.asyncio
async def test_signup_bad_full_name():
    response = await client.post(
        f"{endpoint_prefix}/signup",
        json={**test_user, "full_name": test_full_name_bad}
    )

    assert response.status_code == 422, response.text
    data = response.json()
    assert data["detail"][0]["msg"] == "Full Name must contain a space."


@pytest.mark.asyncio
async def test_signup_bad_username():
    response = await client.post(
        f"{endpoint_prefix}/signup",
        json={**test_user, "username": test_username_bad}
    )

    assert response.status_code == 422, response.text
    data = response.json()
    assert data["detail"][0]["msg"] == "Username must be an email."


@pytest.mark.asyncio
async def test_signup_bad_password():
    response = await client.post(
        f"{endpoint_prefix}/signup",
        json={**test_user, "password": test_password_bad}
    )

    assert response.status_code == 422, response.text
    data = response.json()
    assert data["detail"] == bad_password_error


@pytest.mark.asyncio
async def test_signup_username_taken():
    original_user = User(
        full_name=test_full_name,
        username=test_username,
        password=test_password
    )
    await original_user.create()

    response = await client.post(
        f"{endpoint_prefix}/signup",
        json={**test_user}
    )

    assert response.status_code == 400, response.text
    data = response.json()
    assert data["detail"] == "Username already taken."


@pytest.mark.asyncio
async def test_login():
    user = User(
        full_name=test_full_name,
        username=test_username,
        password=get_password_hash(test_password)
    )
    await user.create()

    response = await client.post(
        f"{endpoint_prefix}/login",
        data=test_login_form
    )

    assert response.status_code == 200, response.text
    data = response.json()
    assert data["token_type"] == test_token_type
    assert "access_token" in data


@pytest.mark.asyncio
async def test_login_bad_username():
    user = User(
        full_name=test_full_name,
        username=test_username,
        password=get_password_hash(test_password)
    )
    await user.create()

    response = await client.post(
        f"{endpoint_prefix}/login",
        data={**test_login_form, "username": test_username_bad}
    )

    assert response.status_code == 401, response.text
    data = response.json()
    assert data["detail"] == "Incorrect username or password"


@pytest.mark.asyncio
async def test_login_bad_password():
    user = User(
        full_name=test_full_name,
        username=test_username,
        password=get_password_hash(test_password)
    )
    await user.create()

    response = await client.post(
        f"{endpoint_prefix}/login",
        data={**test_login_form, "password": test_password_bad}
    )

    assert response.status_code == 401, response.text
    data = response.json()
    assert data["detail"] == "Incorrect username or password"
