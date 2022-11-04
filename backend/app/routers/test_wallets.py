import pytest
import pytest_asyncio
from beanie import PydanticObjectId

from ..main import app
from ..test_utils.test import (get_test_client, get_current_user_override,
                               verify_token_override, get_test_settings)
from ..models.user import User
from ..models.wallet import Wallet
from ..services.user import get_current_user
from ..utils.auth import verify_token
from ..utils.mongo import close_db, init_db

# Setting up the Test Client
settings = get_test_settings()
client = get_test_client()
endpoint_prefix = "/wallets"

# Overriding dependencies


async def get_current_user_wrapper():
    return await get_current_user_override(
        full_name=test_full_name,
        username=test_username,
        password=test_password,
        wallets=[
            Wallet(
                nickname=test_nickname,
                balance=test_balance,
                id=test_user_wallet_id
            )
        ]
    )

app.dependency_overrides[verify_token] = verify_token_override
app.dependency_overrides[get_current_user] = get_current_user_wrapper

# Test Data
test_id = None
test_user_wallet_id = PydanticObjectId()
test_nickname = "Test Wallet"
test_balance = 3000
test_wallet = {
    "nickname": test_nickname,
    "balance": test_balance
}

test_updated_nickname = "Updated Wallet"
test_updated_balance = 4000
test_updated_wallet = {
    "nickname": test_updated_nickname,
    "balance": test_updated_balance
}

test_full_name = "Test User"
test_password = "testPassword123!"
test_username = "test@user.pass"

test_not_found_error = "Wallet not found!"


@pytest_asyncio.fixture(autouse=True)
async def run_around_tests():
    # Code that will run before your test, for example:
    await init_db(settings)
    yield
    # Code that will run after your test, for example:
    await User.delete_all()
    close_db()


@pytest.mark.asyncio
async def test_read_self_wallets():
    response = await client.get(f"{endpoint_prefix}/me")
    await Wallet.delete_all()

    assert response.status_code == 200, response.text
    data = response.json()

    assert data == [
        {
            "_id": str(test_user_wallet_id),
            "nickname": test_nickname,
            "balance": test_balance
        }
    ]


@pytest.mark.asyncio
async def test_read_self_wallet_by_id():
    response = await client.get(
        f"{endpoint_prefix}/me/{str(test_user_wallet_id)}"
    )
    await Wallet.delete_all()

    assert response.status_code == 200, response.text
    data = response.json()

    assert data == {
        "_id": str(test_user_wallet_id),
        "nickname": test_nickname,
        "balance": test_balance
    }


@pytest.mark.asyncio
async def test_create_wallet():
    user = await User(
        full_name=test_full_name,
        username=test_username,
        password=test_password
    ).create()
    wallet_data = {
        "nickname": test_nickname,
        "balance": test_balance,
        "user_id": str(user.id)
    }

    response = await client.post(f"{endpoint_prefix}/", json=wallet_data)

    assert response.status_code == 201, response.text
    data = response.json()
    assert data["nickname"] == test_nickname
    assert data["balance"] == test_balance
    assert "_id" in data
    global test_id
    test_id = data["_id"]


@pytest.mark.asyncio
async def test_read_wallets():
    response = await client.get(f"{endpoint_prefix}/")

    assert response.status_code == 200, response.text
    data = response.json()

    assert data == [
        {"_id": test_id, "nickname": test_nickname, "balance": test_balance}]


@pytest.mark.asyncio
async def test_read_wallet_by_id():
    response = await client.get(f"{endpoint_prefix}/{test_id}")

    assert response.status_code == 200, response.text
    data = response.json()
    assert data["nickname"] == test_nickname
    assert data["balance"] == test_balance
    assert data["_id"] == test_id


@pytest.mark.asyncio
async def test_update_wallet():
    response = await client.patch(f"{endpoint_prefix}/{test_id}",
                                  json=test_updated_wallet)

    assert response.status_code == 200, response.text
    data = response.json()
    assert data["nickname"] == test_updated_nickname
    assert data["balance"] == test_updated_balance
    assert data["_id"] == test_id


@pytest.mark.asyncio
async def test_delete_wallet():
    response = await client.delete(f"{endpoint_prefix}/{test_id}")

    assert response.status_code == 200, response.text
    data = response.json()
    assert data["detail"] == "Deleted."


@pytest.mark.asyncio
async def test_delete_wallet_not_found():
    response = await client.delete(f"{endpoint_prefix}/{test_id}")

    assert response.status_code == 404, response.text
    data = response.json()
    assert data["detail"] == test_not_found_error


@pytest.mark.asyncio
async def test_update_wallet_not_found():
    response = await client.patch(f"{endpoint_prefix}/{test_id}",
                                  json=test_updated_wallet)

    assert response.status_code == 404, response.text
    data = response.json()
    assert data["detail"] == test_not_found_error


@pytest.mark.asyncio
async def test_get_wallet_by_id_not_found():
    response = await client.get(f"{endpoint_prefix}/{test_id}")

    assert response.status_code == 404, response.text
    data = response.json()
    assert data["detail"] == test_not_found_error
