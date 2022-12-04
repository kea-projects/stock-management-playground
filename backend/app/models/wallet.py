from typing import List

from beanie import Document, Link

from ..models.stock_entry import StockEntry


class Wallet(Document):
    nickname: str
    # Default starting balance
    balance: float = 10000
    stock_entries: List[Link[StockEntry]] = []
