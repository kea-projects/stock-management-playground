from beanie import PydanticObjectId
from pydantic import BaseModel


class AddToStockEntryData(BaseModel):
    amount: float
    wallet_id: PydanticObjectId
