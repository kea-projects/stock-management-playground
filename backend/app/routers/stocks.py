from typing import List

from beanie import PydanticObjectId
from fastapi import APIRouter, Depends

from ..models.stock import Stock
from ..utils.auth import verify_token

router = APIRouter(
    prefix="/stocks",
    dependencies=[Depends(verify_token)]
)


# TODO: Implement actual functionality
@router.get("/wallet/{wallet_id}", response_model=List[Stock], tags=["Stocks"])
async def read_self_stocks_by_wallet_id(wallet_id: PydanticObjectId):
    return await Stock.find_one(wallet_id)
