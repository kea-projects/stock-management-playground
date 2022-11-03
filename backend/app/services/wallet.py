from beanie import PydanticObjectId, WriteRules

from ..models.wallet import Wallet
from ..models.user import User
from ..dtos.create_wallet_data import CreateWalletData
from ..utils.custom_exceptions import wallet_not_found_exception
from ..utils.custom_exceptions import user_not_found_exception


async def get_wallet_by_id(wallet_id: PydanticObjectId):
    wallet = await Wallet.get(wallet_id)

    if wallet is not None:
        return wallet
    else:
        raise wallet_not_found_exception


async def create_wallet(wallet_data: CreateWalletData):
    user = await User.get(wallet_data.user_id)
    print(user)
    if user is not None:
        wallet = Wallet(
            balance=wallet_data.balance,
            nickname=wallet_data.nickname
        )

        user.wallets.append(wallet)
        await user.save(link_rule=WriteRules.WRITE)

        return wallet
    else:
        raise user_not_found_exception


async def update_wallet(wallet_id: PydanticObjectId, new_wallet: Wallet):
    old_wallet = await get_wallet_by_id(wallet_id)

    old_wallet.nickname = new_wallet.nickname
    old_wallet.balance = new_wallet.balance
    return await old_wallet.replace()


async def delete_wallet(wallet_id: PydanticObjectId):
    wallet_to_delete = await get_wallet_by_id(wallet_id=wallet_id)
    await wallet_to_delete.delete()
    return {"detail": "Deleted."}
