
from pydantic import BaseModel


class SellFromStockEntryData(BaseModel):
    amount: float
