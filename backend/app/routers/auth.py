from datetime import timedelta

from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm

from ..configs.settings import Settings, get_settings
from ..models.token import Token
from ..models.user import User
from ..repos.user import user_exists_by_username
from ..utils.auth import (authenticate_user, create_access_token,
                          get_password_hash)
from ..utils.custom_exceptions import (bad_credentials_exception,
                                       insecure_password_exception,
                                       user_already_exists_exception)
from ..utils.validators import matches_password

router = APIRouter(
    prefix="/auth"
)


@router.post("/login", response_model=Token, tags=["Auth"])
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    settings: Settings = Depends(get_settings)
):
    user = await authenticate_user(form_data.username, form_data.password)
    if not user:
        raise bad_credentials_exception
    access_token_expires = timedelta(
        minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username, "id": str(user.id)},
        settings=settings,
        expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/signup", status_code=201, response_model=User, tags=["Auth"])
async def signup(user: User):
    if await user_exists_by_username(user.username):
        raise user_already_exists_exception
    if not matches_password(user.password):
        raise insecure_password_exception
    user.password = get_password_hash(user.password)
    return await user.create()
