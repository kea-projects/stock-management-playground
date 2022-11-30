from pydantic import BaseModel


class AmountData(BaseModel):
    amount: float
