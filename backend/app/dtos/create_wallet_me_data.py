from pydantic import BaseModel


class CreateWalletMeData(BaseModel):
    nickname: str

