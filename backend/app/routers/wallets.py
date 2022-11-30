from typing import List

from beanie import PydanticObjectId
from fastapi import APIRouter, Depends

from ..models.wallet import Wallet
from ..services.wallet import delete_wallet as delete
from ..services.wallet import get_wallet_by_id
from ..services.wallet import update_wallet as update
from ..utils.auth import verify_token

router = APIRouter(
    prefix="/wallets",
    dependencies=[Depends(verify_token)]
)


# TODO: Implement actual functionality
@router.get("/me", response_model=List[Wallet], tags=["Wallets"])
async def read_self_wallets():
    return await Wallet.find_all.to_list()


# TODO: Implement actual functionality
@router.get("/me/{wallet_id}", response_model=Wallet, tags=["Wallets"])
async def read_self_wallets_by_id(wallet_id: PydanticObjectId):
    return await Wallet.get(wallet_id)


#  --- CRUD ---


@router.get("/", response_model=List[Wallet], tags=["Wallets"])
async def read_wallets():
    return await Wallet.find_all().to_list()


@router.get("/{wallet_id}", response_model=Wallet, tags=["Wallets"])
async def read_wallet_by_id(wallet_id: PydanticObjectId):
    return await get_wallet_by_id(wallet_id=wallet_id)


@router.post("/", status_code=201, response_model=Wallet, tags=["Wallets"])
async def create_wallet(wallet: Wallet):
    return await wallet.create()


@router.patch("/{wallet_id}", response_model=Wallet, tags=["Wallets"])
async def update_wallet(wallet: Wallet, wallet_id: PydanticObjectId):
    return await update(new_wallet=wallet, wallet_id=wallet_id)


@router.delete("/{wallet_id}", tags=["Wallets"])
async def delete_wallet(wallet_id: PydanticObjectId):
    return await delete(wallet_id)
