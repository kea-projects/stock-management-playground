from datetime import date
from typing import Optional

from beanie import Document


class Stock(Document):
    name: str
    stock_ticker: str
    current_price: Optional[float]
    description: Optional[str]
    percentage_change: Optional[float]
    last_updated: date