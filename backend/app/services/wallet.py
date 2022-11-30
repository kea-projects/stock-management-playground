from beanie import PydanticObjectId, WriteRules

from ..models.wallet import Wallet
from ..models.user import User
from ..dtos.create_wallet_data import CreateWalletData
from ..utils.custom_exceptions import wallet_not_found_exception
from ..utils.custom_exceptions import user_not_found_exception
from ..utils.custom_exceptions import stock_entry_not_found_exception


async def get_wallet_by_id(wallet_id: PydanticObjectId):
    wallet = await Wallet.get(wallet_id)

    if wallet is not None:
        return wallet
    else:
        raise wallet_not_found_exception


async def get_user_wallet_by_id(wallet_id: PydanticObjectId, user: User):
    await user.fetch_link(User.wallets)

    wallets = list(
        filter(lambda wallet: wallet.id == wallet_id, user.wallets)
    )

    if len(wallets) == 1:
        return wallets[0]
    else:
        raise wallet_not_found_exception


async def get_user_wallet_containing_stock_entry(
    user: User,
    stock_entry_id: PydanticObjectId
):

    await user.fetch_link(User.wallets)
    for wallet in user.wallets:
        await wallet.fetch_link(Wallet.stock_entries)
        for stock_entry in wallet.stock_entries:
            if stock_entry.id == stock_entry_id:
                return wallet
    raise stock_entry_not_found_exception


async def create_wallet(wallet_data: CreateWalletData):
    user = await User.get(wallet_data.user_id)

    if user is not None:
        wallet = Wallet(
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
