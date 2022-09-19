from fastapi import APIRouter, HTTPException
from beanie import PydanticObjectId

from ..models.wallet import Wallet

router = APIRouter(
    prefix="/wallets"
)


@router.get("/")
async def read_wallets():
    return await Wallet.find_all().to_list()


@router.get("/{wallet_id}")
async def read_wallet_by_id(wallet_id: PydanticObjectId):
    return await Wallet.get(wallet_id)


@router.post("/")
async def create_wallet(wallet: Wallet):
    return await wallet.create()


@router.patch("/{wallet_id}")
async def update_wallet(wallet: Wallet, wallet_id: PydanticObjectId):
    wallet_to_update = await Wallet.get(wallet_id)
    if (wallet_to_update is not None):
        wallet_to_update.nickname = wallet.nickname
        wallet_to_update.balance = wallet.balance
        return await wallet_to_update.replace()
    else:
        raise HTTPException(status_code=404, detail="Wallet not found!")


@router.delete("/{wallet_id}")
async def delete_wallet(wallet_id: PydanticObjectId):
    wallet_to_delete = await Wallet.get(wallet_id)
    if (wallet_to_delete is not None):
        wallet_to_delete.delete()
        return {"detail": "Deleted."}
    else:
        raise HTTPException(status_code=404, detail="Wallet not found!")
