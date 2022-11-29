from beanie import Document, Link
from typing import List

from ..models.stock_entry import StockEntry


class Wallet(Document):
    nickname: str
    # Default starting balance
    balance: float = 10000
    stock_entries: List[Link[StockEntry]] = []

# TODO: discuss how balance should be handled (ie: enforce starting with '0',
# and update once a stock gets added)
