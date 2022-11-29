from beanie import PydanticObjectId
from pydantic import BaseModel


class CreateWalletData(BaseModel):
    nickname: str
    balance: float = 0
    user_id: PydanticObjectId
