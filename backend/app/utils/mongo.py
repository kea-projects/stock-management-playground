import motor
from beanie import init_beanie

from ..configs.settings import Settings
from ..models.stock import Stock
from ..models.stock_entry import StockEntry
from ..models.user import User
from ..models.wallet import Wallet
from .convertors import to_boolean

client = None


async def init_db(settings: Settings):
    connection_type = "mongodb+srv" if (
        to_boolean(settings.config['MONGO_USE_SRV']) is True
    ) else "mongodb"

    global client
    client = motor.motor_asyncio.AsyncIOMotorClient(
        f"{connection_type}://{settings.config['MONGO_USER']}" +
        f":{settings.config['MONGO_PASSWORD']}@{settings.config['MONGO_HOST']}"
    )
    await init_beanie(database=client.stock_management_playground,
                      document_models=[Wallet, User, Stock, StockEntry])
    print("Mongo Util > MongoDB initialized!")


def close_db():
    global client
    if (client is not None):
        client.close()
        print("Mongo Util > MongoDB closed!")
