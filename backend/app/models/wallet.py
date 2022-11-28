from beanie import Document, Link
from typing import List

from ..models.stock_entry import StockEntry


class Wallet(Document):
    nickname: str
    balance: float = 0
    stock_entries: List[Link[StockEntry]] = []

# TODO: discuss how balance should be handled (ie: enforce starting with '0',
# and update once a stock gets added)
