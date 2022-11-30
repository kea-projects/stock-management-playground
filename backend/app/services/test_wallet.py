import pytest
import pytest_asyncio
from beanie import PydanticObjectId

from ..models.wallet import Wallet
from ..test_utils.test import get_test_settings
from ..utils.mongo import close_db, init_db
from .wallet import delete_wallet, get_wallet_by_id, update_wallet

# Setting up the Test Client
settings = get_test_settings()

# Test Data
test_nickname = "Test Wallet"
test_balance = 3000

test_updated_nickname = "Updated Wallet"
test_updated_balance = 4000


@pytest_asyncio.fixture(autouse=True)
async def run_around_tests():
    # Code that will run before your test, for example:
    await init_db(settings)
    yield
    # Code that will run after your test, for example:
    await Wallet.delete_all()
    close_db()


@pytest.mark.asyncio
async def test_get_wallet_by_id():
    wallet = Wallet(
        nickname=test_nickname,
        balance=test_balance
    )
    await wallet.create()

    response = await get_wallet_by_id(wallet_id=wallet.id)

    assert response

    assert response.nickname == test_nickname
    assert response.balance == test_balance
    assert response.id == wallet.id


@pytest.mark.asyncio
async def test_get_wallet_by_id_wrong_id():
    with pytest.raises(Exception):
        await get_wallet_by_id(wallet_id=PydanticObjectId())


@pytest.mark.asyncio
async def test_update_wallet():
    wallet = Wallet(
        nickname=test_nickname,
        balance=test_balance
    )
    new_wallet = Wallet(
        nickname=test_updated_nickname,
        balance=test_updated_balance
    )
    await wallet.create()

    response = await update_wallet(wallet_id=wallet.id, new_wallet=new_wallet)

    assert response

    assert response.nickname == test_updated_nickname
    assert response.balance == test_updated_balance
    assert response.id == wallet.id


@pytest.mark.asyncio
async def test_update_wallet_wrong_id():
    with pytest.raises(Exception):
        await update_wallet(
            wallet_id=PydanticObjectId(),
            new_wallet=Wallet(
                nickname=test_updated_nickname,
                balance=test_updated_balance
            )
        )


@pytest.mark.asyncio
async def test_delete_wallet():
    wallet = Wallet(
        nickname=test_nickname,
        balance=test_balance
    )
    await wallet.create()

    response = await delete_wallet(wallet_id=wallet.id)

    assert response == {"detail": "Deleted."}


@pytest.mark.asyncio
async def test_delete_wallet_wrong_id():
    with pytest.raises(Exception):
        await delete_wallet(wallet_id=PydanticObjectId())
