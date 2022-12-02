from beanie import PydanticObjectId
from pydantic import BaseModel


class CreateStockEntryData(BaseModel):
    amount: float
    stock_id: PydanticObjectId
    wallet_id: PydanticObjectId
