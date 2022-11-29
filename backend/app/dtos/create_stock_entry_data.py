from beanie import PydanticObjectId
from pydantic import BaseModel


class CreateStockEntryData(BaseModel):
    amount: float
    paid_price: float
    stock_id: PydanticObjectId
    wallet_id: PydanticObjectId
