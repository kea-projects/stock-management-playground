from datetime import datetime
import random
import asyncio

from typing import List
import finnhub

from ..configs.settings import get_settings
from ..models.stock import Stock
from ..models.stock_history import StockHistory
from ..utils.custom_exceptions import finnhub_too_many_requests_exception

settings = get_settings()
finnhub_client = finnhub.Client(api_key=settings.config["API_KEY"])


async def fetch_stock_quote(symbol: str, random: bool = False):
    try:
        stock_quote = finnhub_client.quote(symbol=symbol)

        if stock_quote is not None:
            price = stock_quote["c"]
            change = stock_quote["dp"]

            stock = await Stock.find_one(
                Stock.stock_ticker == symbol,
                {"external_fetch": True}
            )

            if stock is not None:
                history = StockHistory(
                    price=stock.current_price,
                    percentage_change=stock.percentage_change,
                    recorded_at=stock.last_updated
                )

                stock.current_price = price if not random else randomize(
                    price
                )
                stock.percentage_change = change if not random else randomize(
                    change
                )
                stock.last_updated = datetime.utcnow()
                stock.history.append(history)
                return await stock.save()
            else:
                stock = Stock(
                    current_price=price if not random else randomize(
                        price
                    ),
                    percentage_change=change if not random else randomize(
                        change
                    ),
                    description="Stock fetched from Finnhub API",
                    name=symbol,
                    stock_ticker=symbol,
                    last_updated=datetime.utcnow(),
                    external_fetch=True
                )
                return await stock.create()

    except finnhub.FinnhubAPIException:
        raise finnhub_too_many_requests_exception


async def fetch_stock_list(symbols: List[str]):
    print(f"Finnhub Service > Fetching {len(symbols)} symbols ...")
    for symbol in symbols:
        print(f"Finnhub Service > Fetching {symbol} ...")
        await fetch_stock_quote(symbol, True)
        await asyncio.sleep(1)


async def get_stock_symbols():
    stocks = await Stock.find({"external_fetch": True}).to_list()
    symbols = set()

    for stock in stocks:
        symbols.add(stock.stock_ticker)

    return symbols


async def get_external_fetch_stocks():
    symbols = await get_stock_symbols()
    stocks = []

    for symbol in symbols:
        stocks.append(await fetch_stock_quote(symbol=symbol, random=True))

    return stocks


def randomize(value: float):
    return random.uniform(value - value/10, value + value/10)
