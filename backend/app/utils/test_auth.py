import pytest
import pytest_asyncio
from jose import jwt

from ..models.user import User
from ..test_utils.test import get_test_settings, oauth2_scheme_override
from ..utils.auth import get_password_hash, verify_password
from ..utils.mongo import close_db, init_db
from .auth import authenticate_user, create_access_token, verify_token

# Setting up the Test Client
settings = get_test_settings()

# Test Data
test_full_name = "Test User"
test_password = "testPassword123!"
bad_test_password = "badTestPassword123!"
test_username = "test@user.pass"
bad_test_username = "test@baduser.fail"
test_user = {
    "full_name": test_full_name,
    "password": test_password,
    "username": test_username
}

test_token_data = {
    "test": "passed"
}


@pytest_asyncio.fixture(autouse=True)
async def run_around_tests():
    # Code that will run before your test, for example:
    await init_db(settings)
    yield
    # Code that will run after your test, for example:
    await User.delete_all()
    close_db()


@pytest.mark.asyncio
async def test_authenticate_user():
    user = User(
        full_name=test_full_name,
        username=test_username,
        password=get_password_hash(test_password)
    )
    await user.create()

    response = await authenticate_user(
        username=test_username,
        password=test_password
    )

    assert response

    assert response.full_name == test_full_name
    assert response.username == test_username
    assert verify_password(test_password, response.password)
    assert response.id


@pytest.mark.asyncio
async def test_authenticate_user_bad_username():
    user = User(
        full_name=test_full_name,
        username=test_username,
        password=get_password_hash(test_password)
    )
    await user.create()

    response = await authenticate_user(
        username=bad_test_username,
        password=test_password
    )

    assert response is False


@pytest.mark.asyncio
async def test_authenticate_user_bad_password():
    user = User(
        full_name=test_full_name,
        username=test_username,
        password=get_password_hash(test_password)
    )
    await user.create()

    response = await authenticate_user(
        username=test_username,
        password=bad_test_password
    )

    assert response is False


@pytest.mark.asyncio
async def test_create_access_token():
    response = create_access_token(test_token_data, settings=settings)

    data = jwt.decode(
        response,
        settings.SECRET_KEY
    )

    assert data
    assert data["test"] == "passed"


@pytest.mark.asyncio
async def test_verify_token():
    response = verify_token(
        token=oauth2_scheme_override(username=test_username),
        settings=settings
    )

    assert response is True


@pytest.mark.asyncio
async def test_verify_token_expired():
    with pytest.raises(Exception):
        verify_token(
            token=oauth2_scheme_override(
                username=test_username,
                expires_in=-1
            ),
            settings=settings
        )
