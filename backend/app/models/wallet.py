from beanie import Document, Link
from typing import List

from ..models.stock import Stock


class Wallet(Document):
    nickname: str
    balance: float = 0
    stocks: List[Link[Stock]] = []
