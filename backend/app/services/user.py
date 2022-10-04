from beanie import PydanticObjectId
from fastapi import Depends, HTTPException, status
from jose import jwt, JWTError
from fastapi.security import OAuth2PasswordBearer

from ..configs.settings import get_settings
from ..models.user import User
from ..models.token import TokenData

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")


async def get_user_by_username(username: str):
    return await User.find_one(User.username == username)


async def get_current_user(
        token: str = Depends(oauth2_scheme)
):
    settings = get_settings()
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, settings.SECRET_KEY,
                             algorithms=[settings.ALGORITHM])
        username: str = payload.get("sub")
        user_id: PydanticObjectId = payload.get("id")
        if username is None or user_id is None:
            raise credentials_exception
        token_data = TokenData(username=username, user_id=user_id)
    except JWTError:
        raise credentials_exception

    user = await get_user_by_username(username=token_data.username)
    if user is None:
        raise credentials_exception
    return user
