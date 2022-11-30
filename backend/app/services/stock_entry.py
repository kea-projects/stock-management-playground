from beanie import PydanticObjectId, WriteRules

from ..models.wallet import Wallet
from ..models.stock import Stock
from ..models.user import User
from ..models.stock_entry import StockEntry
from ..dtos.create_stock_entry_data import CreateStockEntryData
from ..dtos.add_to_stock_entry_data import AddToStockEntryData
from ..dtos.sell_from_stock_entry_dto import SellFromStockEntryData
from ..services.wallet import get_user_wallet_by_id
from ..utils.custom_exceptions import wallet_not_found_exception
from ..utils.custom_exceptions import stock_not_found_exception
from ..utils.custom_exceptions import wallet_not_enough_funds_exception
from ..utils.custom_exceptions import stock_entry_not_found_exception
from ..utils.custom_exceptions import stock_entry_amount_too_high_exception


async def get_wallet_stock_entries(
    wallet_id: PydanticObjectId,
    user: User
):
    wallet = await get_user_wallet_by_id(
        wallet_id=wallet_id,
        user=user
    )

    if wallet is not None:
        await wallet.fetch_link(Wallet.stock_entries)
        return wallet.stock_entries
    else:
        raise wallet_not_found_exception


# TODO: Refactor to reduce complexity
async def create_stock_entry(
    stock_entry_data: CreateStockEntryData,
    user: User
):
    wallet = await get_user_wallet_by_id(
        wallet_id=stock_entry_data.wallet_id,
        user=user
    )

    stock = await Stock.get(stock_entry_data.stock_id)

    if stock is not None:
        if (
            wallet.balance >= stock.current_price * stock_entry_data.amount
        ):
            stock_entry = StockEntry(
                amount=stock_entry_data.amount,
                paid_price=stock.current_price * stock_entry_data.amount,
                stock=stock
            )
            await stock_entry.save(link_rule=WriteRules.WRITE)

            await wallet.fetch_link(Wallet.stock_entries)
            wallet.stock_entries.append(stock_entry)
            wallet.balance = wallet.balance - stock_entry.paid_price
            await wallet.save(link_rule=WriteRules.WRITE)

            return stock_entry
        else:
            raise wallet_not_enough_funds_exception
    else:
        raise stock_not_found_exception


# TODO: Refactor to reduce complexity
async def add_to_stock_entry(
    add_to_stock_entry_data: AddToStockEntryData,
    stock_entry_id: PydanticObjectId,
    user: User
):
    wallet = await get_user_wallet_by_id(
        wallet_id=add_to_stock_entry_data.wallet_id,
        user=user
    )

    await wallet.fetch_link(Wallet.stock_entries)
    stock_entry = await StockEntry.get(stock_entry_id)

    if stock_entry is not None and stock_entry not in wallet.stock_entries:
        await stock_entry.fetch_link(StockEntry.stock)

        if (
            wallet.balance >=
            stock_entry.stock.current_price *
            add_to_stock_entry_data.amount
        ):

            stock_entry.amount = (
                stock_entry.amount +
                add_to_stock_entry_data.amount
            )
            stock_entry.paid_price = (
                stock_entry.paid_price +
                stock_entry.stock.current_price
                / stock_entry.amount
            )

            await stock_entry.save()

            wallet.balance = (
                wallet.balance -
                stock_entry.stock.current_price *
                add_to_stock_entry_data.amount
            )
            await wallet.save()

            return stock_entry
        else:
            raise wallet_not_enough_funds_exception
    else:
        raise stock_entry_not_found_exception


async def sell_from_stock_entry(
    data: SellFromStockEntryData,
    stock_entry_id: PydanticObjectId,
    user: User
):
    stock_entry = await StockEntry.get(stock_entry_id)

    if stock_entry is not None:
        await user.fetch_link(User.wallets)
        for wallet in user.wallets:
            await wallet.fetch_link(Wallet.stock_entries)
            for entry in wallet.stock_entries:
                if stock_entry.id == entry.id:
                    if stock_entry.amount >= data.amount:
                        stock_entry.amount = stock_entry.amount - data.amount

                        await stock_entry.fetch_link(StockEntry.stock)
                        wallet.balance = (
                            wallet.balance +
                            stock_entry.stock.current_price *
                            data.amount
                        )

                        await wallet.save()

                        if stock_entry.amount == 0:
                            wallet.stock_entries.remove(entry)
                            await stock_entry.delete()
                            await wallet.save()
                            return {"detail": "Stock Entry depleted."}
                        else:
                            await stock_entry.save()
                            return stock_entry
                    else:
                        raise stock_entry_amount_too_high_exception
        raise stock_entry_not_found_exception
    else:
        raise stock_entry_not_found_exception
