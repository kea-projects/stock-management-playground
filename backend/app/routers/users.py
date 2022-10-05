from fastapi import APIRouter, Depends

from ..models.user import User
from ..services.user import get_current_user

router = APIRouter(
    prefix="/users"
)


@router.get("/me")
async def read_user_self(user: User = Depends(get_current_user)):
    return user
