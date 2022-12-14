from typing import List

from beanie import PydanticObjectId
from fastapi import APIRouter, Depends

from ..dtos.create_wallet_data import CreateWalletData
from ..dtos.create_wallet_me_data import CreateWalletMeData
from ..models.user import User
from ..models.wallet import Wallet
from ..services.user import get_current_user
from ..services.wallet import create_wallet as create
from ..services.wallet import delete_wallet as delete
from ..services.wallet import (get_user_wallet_by_id, get_user_wallets,
                               get_wallet_by_id)
from ..services.wallet import update_wallet as update
from ..utils.auth import verify_token

router = APIRouter(
    prefix="/wallets",
    dependencies=[Depends(verify_token)]
)


@router.get("/me", response_model=List[Wallet], tags=["Wallets"])
async def read_self_wallets(user: User = Depends(get_current_user)):
    return await get_user_wallets(user=user)


@router.post("/me", tags=["Wallets"])
async def create_self_wallet(
    wallet_me_data: CreateWalletMeData,
    user: User = Depends(get_current_user)
):
    wallet_data = CreateWalletData(
        user_id=user.id, nickname=wallet_me_data.nickname)
    return await create(wallet_data=wallet_data)


@router.get("/me/{wallet_id}", response_model=Wallet, tags=["Wallets"])
async def read_self_wallets_by_id(
        wallet_id: PydanticObjectId,
        user: User = Depends(get_current_user)
):
    return await get_user_wallet_by_id(wallet_id=wallet_id, user=user)


#  --- CRUD ---


@router.get("/", response_model=List[Wallet], tags=["Wallets"])
async def read_wallets():
    return await Wallet.find_all().to_list()


@router.get("/{wallet_id}", response_model=Wallet, tags=["Wallets"])
async def read_wallet_by_id(wallet_id: PydanticObjectId):
    return await get_wallet_by_id(wallet_id=wallet_id)


@router.post("/", status_code=201, response_model=Wallet, tags=["Wallets"])
async def create_wallet(wallet_data: CreateWalletData):
    return await create(wallet_data=wallet_data)


@router.patch("/{wallet_id}", response_model=Wallet, tags=["Wallets"])
async def update_wallet(wallet: Wallet, wallet_id: PydanticObjectId):
    return await update(new_wallet=wallet, wallet_id=wallet_id)


@router.delete("/{wallet_id}", tags=["Wallets"])
async def delete_wallet(wallet_id: PydanticObjectId):
    return await delete(wallet_id)
