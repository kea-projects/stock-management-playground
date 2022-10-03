from beanie import Document


class Wallet(Document):
    nickname: str
    balance: int = 0
