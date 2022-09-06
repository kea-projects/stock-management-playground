from fastapi import APIRouter

router = APIRouter(
    prefix="/wallets"
)


@router.get("/")
async def read_wallets():
    return {"response": "WALLETS !!!"}
