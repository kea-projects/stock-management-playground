from beanie import Document


class Wallet(Document):
    nickname: str
    balance: float = 0
