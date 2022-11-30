from beanie import PydanticObjectId
from pydantic import BaseModel


class CreateWalletData(BaseModel):
    nickname: str
    user_id: PydanticObjectId
