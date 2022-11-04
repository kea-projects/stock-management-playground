from typing import List

from beanie import PydanticObjectId
from fastapi import APIRouter, Depends

from ..models.stock import Stock
from ..services.stock import link_stocks_to_wallet, get_wallet_stocks_by_id
from ..utils.auth import verify_token

router = APIRouter(
    prefix="/stocks",
    dependencies=[Depends(verify_token)]
)


@router.get("/wallet/{wallet_id}", response_model=List[Stock], tags=["Stocks"])
async def read_wallet_stocks_by_id(wallet_id: PydanticObjectId):
    return await get_wallet_stocks_by_id(wallet_id)


@router.post(
    "/wallet/{wallet_id}",
    response_model=List[Stock],
    tags=["Stocks"]
)
async def add_wallet_stocks_by_id(
    wallet_id: PydanticObjectId,
    stock_ids: List[PydanticObjectId]
):
    return await link_stocks_to_wallet(
        wallet_id=wallet_id,
        stock_ids=stock_ids
    )


@router.post("/", status_code=201, response_model=Stock, tags=["Stocks"])
async def create_stock(stock: Stock):
    return await stock.create()
