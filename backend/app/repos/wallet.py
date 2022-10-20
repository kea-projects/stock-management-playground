from beanie import PydanticObjectId

from ..models.wallet import Wallet


async def wallet_exists(wallet_id: PydanticObjectId):
    wallet = await Wallet.get(wallet_id)
    if wallet is not None:
        return True
    return False
