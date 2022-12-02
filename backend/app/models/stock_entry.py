from beanie import Document, Link

from ..models.stock import Stock


class StockEntry(Document):
    amount: float
    paid_price: float
    stock: Link[Stock]
