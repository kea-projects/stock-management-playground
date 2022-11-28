from beanie import PydanticObjectId, WriteRules

from ..models.wallet import Wallet
from ..models.stock import Stock
from ..models.stock_entry import StockEntry
from ..dtos.create_stock_entry_data import CreateStockEntryData
from ..utils.custom_exceptions import wallet_not_found_exception
from ..utils.custom_exceptions import stock_not_found_exception


async def get_wallet_stock_entries(
    wallet_id: PydanticObjectId
):
    wallet = await Wallet.get(wallet_id, fetch_links=True)

    if wallet is not None:
        return wallet.stock_entries
    else:
        raise wallet_not_found_exception


async def create_stock_entry(stock_entry_data: CreateStockEntryData):
    wallet = await Wallet.get(stock_entry_data.wallet_id)

    if wallet is not None:
        stock = await Stock.get(stock_entry_data.stock_id)

        if stock is not None:
            stock_entry = StockEntry(
                amount=stock_entry_data.amount,
                paid_price=stock_entry_data.paid_price,
                stock=stock
            )
            await stock_entry.save(link_rule=WriteRules.WRITE)

            wallet.stock_entries.append(stock_entry)
            await wallet.save(link_rule=WriteRules.WRITE)

            return stock_entry
        else:
            raise stock_not_found_exception
    else:
        raise wallet_not_found_exception
