from beanie import PydanticObjectId
from beanie.operators import Or, RegEx

from ..models.stock import Stock
from ..utils.custom_exceptions import stock_not_found_exception


async def get_stocks_no_history(search=None):
    stocks = []
    if search is not None:
        stocks = await Stock.find(
            Or(
                RegEx(Stock.name, search, "i"),
                RegEx(Stock.stock_ticker, search, "i")
            )
        ).to_list()
    else:
        stocks = await Stock.find_all().to_list()

    for stock in stocks:
        stock.history.clear()

    return stocks


async def get_stock_by_id(
    stock_id: PydanticObjectId
):
    stock = await Stock.get(stock_id)

    if stock is not None:
        return stock
    else:
        raise stock_not_found_exception


async def get_stock_symbols():
    stocks = await Stock.find({"external_fetch": True}).to_list()
    symbols = set()

    for stock in stocks:
        symbols.add(stock.stock_ticker)

    return symbols
