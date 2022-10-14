import pytest
import pytest_asyncio

from ..models.user import User
from ..test_utils.test import get_test_settings, oauth2_scheme_override
from ..utils.auth import get_password_hash, verify_password
from ..utils.mongo import close_db, init_db
from .user import get_current_user, get_user_by_username, user_exists

# Setting up the Test Client
settings = get_test_settings()

# Test Data
test_full_name = "Test User"
test_password = "testPassword123!"
test_username = "test@user.pass"
test_user = {
    "full_name": test_full_name,
    "password": test_password,
    "username": test_username
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
async def test_get_current_user():
    user = User(
        full_name=test_full_name,
        username=test_username,
        password=get_password_hash(test_password)
    )
    await user.create()

    response = await get_current_user(
        token=oauth2_scheme_override(username=test_username),
        settings=get_test_settings()
    )

    assert response

    assert response.full_name == test_full_name
    assert response.username == test_username
    assert verify_password(test_password, response.password)
    assert response.id


@pytest.mark.asyncio
async def test_get_current_user_no_username_token():
    with pytest.raises(Exception):
        user = User(
            full_name=test_full_name,
            username=test_username,
            password=get_password_hash(test_password)
        )
        await user.create()

        await get_current_user(
            token=oauth2_scheme_override(),
            settings=get_test_settings()
        )


@pytest.mark.asyncio
async def test_get_current_user_expired_token():
    with pytest.raises(Exception):
        user = User(
            full_name=test_full_name,
            username=test_username,
            password=get_password_hash(test_password)
        )
        await user.create()

        await get_current_user(
            token=oauth2_scheme_override(
                username=test_username,
                expires_in=-1
            ),
            settings=get_test_settings()
        )


@pytest.mark.asyncio
async def test_get_current_user_no_existing_user():
    with pytest.raises(Exception):
        await get_current_user(
            token=oauth2_scheme_override(username=test_username),
            settings=get_test_settings()
        )


@pytest.mark.asyncio
async def test_get_user_by_username():
    user = User(
        full_name=test_full_name,
        username=test_username,
        password=get_password_hash(test_password)
    )
    await user.create()

    response = await get_user_by_username(test_username)

    assert response

    assert response.full_name == test_full_name
    assert response.username == test_username
    assert verify_password(test_password, response.password)
    assert response.id


@pytest.mark.asyncio
async def test_get_user_by_username_no_user():
    response = await get_user_by_username(test_username)

    assert response is None


@pytest.mark.asyncio
async def test_user_exists_true():
    user = User(
        full_name=test_full_name,
        username=test_username,
        password=get_password_hash(test_password)
    )
    await user.create()

    response = await user_exists(test_username)

    assert response is True


@pytest.mark.asyncio
async def test_user_exists_false():
    response = await user_exists(test_username)

    assert response is False
