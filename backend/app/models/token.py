from pydantic import BaseModel
from beanie import PydanticObjectId


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    user_id: PydanticObjectId
    username: str
