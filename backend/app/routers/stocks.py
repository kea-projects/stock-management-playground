from typing import List

from beanie import PydanticObjectId
from fastapi import APIRouter, Depends

from ..models.stock import Stock
from ..services.stock import get_stock_by_id
from ..services.finnhub import fetch_stock_quote, get_stock_symbols
from ..services.finnhub import get_external_stocks
from ..utils.auth import verify_token

router = APIRouter(
    prefix="/stocks",
    dependencies=[Depends(verify_token)]
)


@router.get("/", response_model=List[Stock], tags=["Stocks"])
async def read_stocks():
    return await Stock.find_all().to_list()


@router.get("/{stock_id}", response_model=Stock, tags=["Stocks"])
async def read_stock_by_id(stock_id: PydanticObjectId):
    return await get_stock_by_id(stock_id)


@router.get(
    "/symbol/{stock_symbol}",
    response_model=Stock,
    tags=["Stocks", "Finnhub"]
)
async def read_stock_by_symbol(stock_symbol: str):
    return await fetch_stock_quote(symbol=stock_symbol)


@router.get("/symbols/", response_model=List[str], tags=["Stocks", "Finnhub"])
async def read_stock_symbols():
    return await get_stock_symbols()


@router.get(
    "/external/",
    response_model=List[Stock],
    tags=["Stocks", "Finnhub"]
)
async def read_external_fetch_stocks():
    return await get_external_stocks()


@router.post("/", status_code=201, response_model=Stock, tags=["Stocks"])
async def create_stock(stock: Stock):
    return await stock.create()
