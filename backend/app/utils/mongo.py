from beanie import init_beanie
import motor
from dotenv import dotenv_values

from ..models.wallet import Wallet

config = dotenv_values(".env")


async def init_db():
    client = motor.motor_asyncio.AsyncIOMotorClient(
        f"mongodb://{config['MONGO_USER']}" +
        f":{config['MONGO_PASSWORD']}@{config['MONGO_HOST']}"
    )
    await init_beanie(database=client.stock_management_playground,
                      document_models=[Wallet])
    print("MongoDB initialized!")
