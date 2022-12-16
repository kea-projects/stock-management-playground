from datetime import datetime

from ..models.stock import Stock
from ..models.stock_history import StockHistory


async def external_stock_exists_by_ticker(ticker: str):
    stock = await Stock.find_one(
        Stock.stock_ticker == ticker,
        {"external_fetch": True}
    )
    return stock is not None


async def get_external_stock_by_ticker(ticker: str):
    stock = await Stock.find_one(
        Stock.stock_ticker == ticker,
        {"external_fetch": True}
    )
    return stock


async def update_external_stock(
    stock: Stock,
    price: float,
    percent_change: float
):
    history = StockHistory(
        price=stock.current_price,
        percentage_change=stock.percentage_change,
        recorded_at=stock.last_updated
    )

    stock.current_price = price
    stock.percentage_change = percent_change
    stock.last_updated = datetime.utcnow()
    stock.history.append(history)

    return await stock.save()


async def create_external_stock(
    ticker: str,
    price: float,
    percent_change: float,
    logo: str,
    name: str,
):
    stock = Stock(
        current_price=price,
        percentage_change=percent_change,
        description="Stock fetched from Finnhub API",
        name=name,
        stock_ticker=ticker,
        last_updated=datetime.utcnow(),
        external_fetch=True,
        logo=logo
    )

    return await stock.create()
