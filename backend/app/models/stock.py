from datetime import datetime
from typing import Optional, List

from beanie import Document

from .stock_history import StockHistory


class Stock(Document):
    name: str
    stock_ticker: str
    current_price: Optional[float]
    description: Optional[str]
    percentage_change: Optional[float]
    last_updated: datetime = datetime.now()
    history: List[StockHistory] = []
    external_fetch: bool = False

    # TODO: Discuss about validation constraints for the Stock model.
 