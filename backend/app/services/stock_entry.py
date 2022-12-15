from beanie import PydanticObjectId, WriteRules

from ..dtos.amount_data import AmountData
from ..dtos.create_stock_entry_data import CreateStockEntryData
from ..models.stock_entry import StockEntry
from ..models.user import User
from ..models.wallet import Wallet
from ..services.stock import get_stock_by_id
from ..services.wallet import (get_user_wallet_by_id,
                               get_user_wallet_containing_stock_entry)
from ..utils.custom_exceptions import (stock_entry_amount_too_high_exception,
                                       stock_entry_not_found_exception,
                                       wallet_not_enough_funds_exception)


async def get_stock_entry_by_id(stock_entry_id: PydanticObjectId):
    stock_entry = await StockEntry.get(stock_entry_id)

    if stock_entry is not None:
        return stock_entry
    else:
        raise stock_entry_not_found_exception


async def get_wallet_stock_entries(
    wallet_id: PydanticObjectId,
    user: User
):
    wallet = await get_user_wallet_by_id(
        wallet_id=wallet_id,
        user=user
    )

    await wallet.fetch_link(Wallet.stock_entries)
    return wallet.stock_entries


async def create_stock_entry(
    stock_entry_data: CreateStockEntryData,
    user: User
):
    wallet = await get_user_wallet_by_id(
        wallet_id=stock_entry_data.wallet_id,
        user=user
    )
    stock = await get_stock_by_id(
        stock_id=stock_entry_data.stock_id
    )

    if (
        wallet.balance >= stock.current_price * stock_entry_data.amount
    ):
        # Create stock_entry
        stock_entry = StockEntry(
            amount=stock_entry_data.amount,
            paid_price=stock.current_price,
            stock=stock
        )
        # Link stock to stock_entry
        await stock_entry.save(link_rule=WriteRules.WRITE)

        # Link stock_entry to wallet
        await wallet.fetch_link(Wallet.stock_entries)
        wallet.stock_entries.append(stock_entry)

        # Update wallet balance
        wallet.balance = wallet.balance - stock_entry.paid_price
        await wallet.save(link_rule=WriteRules.WRITE)

        return stock_entry
    else:
        raise wallet_not_enough_funds_exception


async def add_to_stock_entry(
    amount_data: AmountData,
    stock_entry_id: PydanticObjectId,
    user: User
):
    wallet = await get_user_wallet_containing_stock_entry(
        user=user,
        stock_entry_id=stock_entry_id
    )
    stock_entry = await get_stock_entry_by_id(
        stock_entry_id=stock_entry_id
    )
    await stock_entry.fetch_link(StockEntry.stock)
    stock = stock_entry.stock

    if wallet.balance >= stock.current_price * amount_data.amount:
        new_total_amount = stock_entry.amount + amount_data.amount
        old_average = stock_entry.paid_price * stock_entry.amount
        new_average = stock.current_price * amount_data.amount

        stock_entry.paid_price = (old_average + new_average) / new_total_amount

        stock_entry.amount = new_total_amount
        await stock_entry.save()

        wallet.balance -= stock.current_price * amount_data.amount
        await wallet.save()

        return stock_entry
    else:
        raise wallet_not_enough_funds_exception


async def sell_from_stock_entry(
    amount_data: AmountData,
    stock_entry_id: PydanticObjectId,
    user: User
):
    wallet = await get_user_wallet_containing_stock_entry(
        user=user,
        stock_entry_id=stock_entry_id
    )
    stock_entry = await get_stock_entry_by_id(
        stock_entry_id=stock_entry_id
    )
    await stock_entry.fetch_link(StockEntry.stock)
    stock = stock_entry.stock

    if stock_entry.amount >= amount_data.amount:
        stock_entry.amount -= amount_data.amount

        wallet.balance += stock.current_price * amount_data.amount
        await wallet.save()

        if stock_entry.amount == 0:
            await stock_entry.delete()
            await wallet.save()
            return {"detail": "Stock Entry depleted."}
        else:
            await stock_entry.save()
            return stock_entry
    else:
        raise stock_entry_amount_too_high_exception
