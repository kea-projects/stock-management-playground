from beanie import PydanticObjectId

from ..models.wallet import Wallet
from ..utils.custom_exceptions import wallet_not_found_exception


async def get_wallet_by_id(wallet_id: PydanticObjectId):
    wallet = await Wallet.get(wallet_id)

    if wallet is not None:
        return wallet
    else:
        raise wallet_not_found_exception


async def update_wallet(wallet_id: PydanticObjectId, new_wallet: Wallet):
    old_wallet = await get_wallet_by_id(wallet_id)

    old_wallet.nickname = new_wallet.nickname
    old_wallet.balance = new_wallet.balance
    return await old_wallet.replace()


async def delete_wallet(wallet_id: PydanticObjectId):
    wallet_to_delete = await get_wallet_by_id(wallet_id=wallet_id)
    await wallet_to_delete.delete()
    return {"detail": "Deleted."}
