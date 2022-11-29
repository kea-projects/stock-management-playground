from typing import List

from beanie import PydanticObjectId
from fastapi import APIRouter, Depends

from ..models.stock_entry import StockEntry
from ..dtos.create_stock_entry_data import CreateStockEntryData
from ..services.stock_entry import create_stock_entry as create
from ..services.stock_entry import get_wallet_stock_entries

from ..utils.auth import verify_token

router = APIRouter(
    prefix="/stock-entries",
    dependencies=[Depends(verify_token)]
)


@router.get(
    "/wallet/{wallet_id}",
    response_model=List[StockEntry],
    tags=["Stock Entries"]
)
async def read_wallet_stock_entries(wallet_id: PydanticObjectId):
    return await get_wallet_stock_entries(wallet_id)


@router.get("/", response_model=List[StockEntry], tags=["Stock Entries"])
async def read_stock_entries():
    return await StockEntry.find_all().to_list()


# TODO: Substract price from balance
# TODO: Only allow to create an entry into auth user's wallets
@router.post(
    "/", status_code=201,
    response_model=StockEntry,
    tags=["Stock Entries"]
)
async def create_stock_entry(stock_entry_data: CreateStockEntryData):
    return await create(stock_entry_data=stock_entry_data)

# TODO: Add buy more endpoint -> price will be an average


# TODO: Add sell entry endpoint
# TODO: Only allow to sell an entry from auth user's wallets
