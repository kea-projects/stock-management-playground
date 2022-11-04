from datetime import datetime
from typing import Optional

from beanie import Document


class Stock(Document):
    name: str
    stock_ticker: str
    current_price: Optional[float]
    description: Optional[str]
    percentage_change: Optional[float]
    last_updated: datetime = datetime.now()

    # TODO: Discuss about validation constraints for the Stock model.
