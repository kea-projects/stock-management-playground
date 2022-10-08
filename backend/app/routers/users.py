from fastapi import APIRouter, Depends

from ..models.user import User
from ..services.user import get_current_user
from ..utils.auth import verify_token

router = APIRouter(
    prefix="/users",
    dependencies=[Depends(verify_token)]
)


@router.get("/me", response_model=User, tags=["Users"])
async def read_user_self(user: User = Depends(get_current_user)):
    return user
