from beanie import init_beanie
import motor

from ..models.wallet import Wallet


async def init_db():
    client = motor.motor_asyncio.AsyncIOMotorClient(
        "mongodb://cristi:2912@localhost:27017")
    await init_beanie(database=client.stock_management_playground,
                      document_models=[Wallet])
    print("MongoDB initialized!")
