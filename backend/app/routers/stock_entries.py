from typing import List

from beanie import PydanticObjectId
from fastapi import APIRouter, Depends

from ..models.stock_entry import StockEntry
from ..models.user import User
from ..dtos.create_stock_entry_data import CreateStockEntryData
from ..dtos.add_to_stock_entry_data import AddToStockEntryData
from ..dtos.sell_from_stock_entry_dto import SellFromStockEntryData
from ..services.stock_entry import create_stock_entry as create
from ..services.stock_entry import get_wallet_stock_entries, add_to_stock_entry
from ..services.stock_entry import sell_from_stock_entry
from ..services.user import get_current_user

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
async def read_wallet_stock_entries(
        wallet_id: PydanticObjectId,
        user: User = Depends(get_current_user)
):
    return await get_wallet_stock_entries(wallet_id=wallet_id, user=user)


@router.get("/", response_model=List[StockEntry], tags=["Stock Entries"])
async def read_stock_entries():
    return await StockEntry.find_all().to_list()


@router.post(
    "/", status_code=201,
    response_model=StockEntry,
    tags=["Stock Entries"]
)
async def create_stock_entry(
    stock_entry_data: CreateStockEntryData,
    user: User = Depends(get_current_user)
):
    return await create(stock_entry_data=stock_entry_data, user=user)


@router.post(
    "/add/{stock_entry_id}", status_code=200,
    response_model=StockEntry,
    tags=["Stock Entries"]
)
async def buy_more_stock_entry(
    stock_entry_id: PydanticObjectId,
    add_to_stock_entry_data: AddToStockEntryData,
    user: User = Depends(get_current_user)
):
    return await add_to_stock_entry(
        stock_entry_id=stock_entry_id,
        add_to_stock_entry_data=add_to_stock_entry_data,
        user=user
    )


@router.post(
    "/sell/{stock_entry_id}", status_code=200,
    tags=["Stock Entries"]
)
async def sell_amount_of_stock_entry(
    stock_entry_id: PydanticObjectId,
    data: SellFromStockEntryData,
    user: User = Depends(get_current_user)
):
    return await sell_from_stock_entry(
        stock_entry_id=stock_entry_id,
        data=data,
        user=user
    )
