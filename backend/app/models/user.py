from beanie import Document
from pydantic import validator

from ..utils.validators import matches_email


class User(Document):
    full_name: str
    username: str
    password: str

    @validator("full_name")
    def full_name_must_contain_space(cls, v):
        if ' ' not in v:
            raise ValueError('Full Name must contain a space.')
        return v.title()

    @validator("username")
    def username_must_be_email(cls, v):
        if not matches_email(v):
            raise ValueError('Username must be an email.')
        return v
