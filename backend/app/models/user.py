from beanie import Document


class User(Document):
    full_name: str
    username: str
    password: str
