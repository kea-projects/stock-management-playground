import asyncio
import random
from typing import List

import finnhub

from ..configs.settings import get_settings
from ..repos.stock import (create_external_stock, get_external_stock_by_ticker,
                           update_external_stock)
from ..services.stock import get_stock_symbols
from ..utils.custom_exceptions import finnhub_exception

settings = get_settings()
finnhub_client = finnhub.Client(api_key=settings.config["API_KEY"])
use_random = settings.config["USE_RANDOM"] or False


async def fetch_stock_quote(symbol: str):
    try:
        stock_quote = finnhub_client.quote(symbol=symbol)
        price = stock_quote["c"] if not use_random else randomize(
            stock_quote["c"]
        )
        percent_change = stock_quote["dp"] if not use_random else randomize(
            stock_quote["dp"]
        )

        stock = await get_external_stock_by_ticker(symbol)
        if stock is not None:
            return await update_external_stock(
                stock=stock,
                price=price,
                percent_change=percent_change
            )
        else:
            return await create_external_stock(
                ticker=symbol,
                price=price,
                percent_change=percent_change
            )

    except finnhub.FinnhubAPIException:
        raise finnhub_exception
    except finnhub.FinnhubRequestException:
        raise finnhub_exception


async def fetch_stocks_from_list(symbols: List[str]):
    print(f"Finnhub Service > Fetching {len(symbols)} symbols ...")
    for symbol in symbols:
        print(f"Finnhub Service > Fetching {symbol} ...")
        await fetch_stock_quote(symbol)
        await asyncio.sleep(1)


async def get_external_stocks():
    symbols = await get_stock_symbols()
    stocks = []

    for symbol in symbols:
        stocks.append(await fetch_stock_quote(symbol=symbol))

    return stocks


def randomize(value: float):
    return random.uniform(value - value/10, value + value/10)
