from beanie import PydanticObjectId
from fastapi import Depends
from jose import jwt, JWTError, ExpiredSignatureError

from ..configs.settings import Settings, get_settings, oauth2_scheme
from ..utils.custom_exceptions import credentials_exception
from ..utils.custom_exceptions import expired_token_exception
from ..models.user import User
from ..models.token import TokenData


async def get_user_by_username(username: str):
    return await User.find_one(User.username == username)


async def user_exists(username: str):
    user = await User.find_one(User.username == username)
    if user is not None:
        return True
    return False


async def get_current_user(
        token: str = Depends(oauth2_scheme),
        settings: Settings = Depends(get_settings)
):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY,
                             algorithms=[settings.ALGORITHM])
        username: str = payload.get("sub")
        user_id: PydanticObjectId = payload.get("id")

        if username is None or user_id is None:
            raise credentials_exception
        token_data = TokenData(username=username, user_id=user_id)

    except ExpiredSignatureError:
        raise expired_token_exception
    except JWTError:
        raise credentials_exception

    user = await get_user_by_username(username=token_data.username)
    if user is None:
        raise credentials_exception
    return user
