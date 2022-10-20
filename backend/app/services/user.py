from beanie import PydanticObjectId
from fastapi import Depends
from jose import ExpiredSignatureError, JWTError, jwt

from ..configs.settings import Settings, get_settings, oauth2_scheme
from ..models.token import TokenData
from ..repos.user import get_user_by_username
from ..utils.custom_exceptions import (credentials_exception,
                                       expired_token_exception)


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
