from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class StockHistory(BaseModel):
    price: Optional[float]
    percentage_change: Optional[float]
    recorded_at: datetime
