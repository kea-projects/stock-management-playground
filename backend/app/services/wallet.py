from beanie import DeleteRules, PydanticObjectId, WriteRules

from ..dtos.create_wallet_data import CreateWalletData
from ..models.stock_entry import StockEntry
from ..models.user import User
from ..models.wallet import Wallet
from ..utils.custom_exceptions import (stock_entry_not_found_exception,
                                       user_not_found_exception,
                                       wallet_cannot_delete_not_empty,
                                       wallet_not_found_exception)


async def get_user_wallets(user: User):
    await user.fetch_link(User.wallets)
    for wallet in user.wallets:
        await wallet.fetch_link(Wallet.stock_entries)
        for stock_entry in wallet.stock_entries:
            await stock_entry.fetch_link(StockEntry.stock)
            stock_entry.stock.history.clear()
    return user.wallets


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
        wallet = wallets[0]
        await wallet.fetch_link(Wallet.stock_entries)
        for stock_entry in wallet.stock_entries:
            await stock_entry.fetch_link(StockEntry.stock)
            stock_entry.stock.history.clear()
        return wallet
    else:
        raise wallet_not_found_exception


async def get_user_wallet_containing_stock_entry(
    user: User,
    stock_entry_id: PydanticObjectId
):

    try:
        await user.fetch_link(User.wallets)
    except Exception:
        print('Tried to fetch already fetched link')

    for wallet in user.wallets:
        try:
            await wallet.fetch_link(Wallet.stock_entries)
        except Exception:
            print('Tried to fetch already fetched link')

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
    if len(wallet_to_delete.stock_entries) > 0:
        raise wallet_cannot_delete_not_empty
    await wallet_to_delete.delete(link_rule=DeleteRules.DELETE_LINKS)
    return {"detail": "Deleted."}
