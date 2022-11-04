from typing import List
from beanie import PydanticObjectId, WriteRules

from ..models.wallet import Wallet
from ..models.stock import Stock
from ..utils.custom_exceptions import wallet_not_found_exception


async def get_wallet_stocks_by_id(
    wallet_id: PydanticObjectId
):
    wallet = await Wallet.get(wallet_id, fetch_links=True)

    if wallet is not None:
        return wallet.stocks
    else:
        raise wallet_not_found_exception


async def link_stocks_to_wallet(
    wallet_id: PydanticObjectId,
    stock_ids: List[PydanticObjectId]
):
    wallet = await Wallet.get(wallet_id)

    if wallet is not None:
        for stock_id in stock_ids:
            stock_to_link = await Stock.get(stock_id)
            if stock_to_link is not None:
                wallet.stocks.append(stock_to_link)

        await wallet.save(link_rule=WriteRules.WRITE)

        return wallet.stocks
    else:
        raise wallet_not_found_exception
