from typing import Optional

from beanie import Document


class Wallet(Document):
    nickname: str
    balance: Optional[int] = 0
