import pytest
import pytest_asyncio
from beanie import PydanticObjectId

from ..models.wallet import Wallet
from ..test_utils.test import get_test_settings
from ..utils.mongo import close_db, init_db
from .wallet import wallet_exists

# Setting up the Test Client
settings = get_test_settings()

# Test Data
test_nickname = "Test Wallet"
test_balance = 3000


@pytest_asyncio.fixture(autouse=True)
async def run_around_tests():
    # Code that will run before your test, for example:
    await init_db(settings)
    yield
    # Code that will run after your test, for example:
    await Wallet.delete_all()
    close_db()


@pytest.mark.asyncio
async def test_wallet_exists_true():
    wallet = Wallet(
        nickname=test_nickname,
        balance=test_balance
    )
    await wallet.create()

    response = await wallet_exists(wallet.id)

    assert response is True


@pytest.mark.asyncio
async def test_wallet_exists_false():
    response = await wallet_exists(PydanticObjectId())

    assert response is False
