from beanie import PydanticObjectId

from ..models.stock import Stock
from ..utils.custom_exceptions import stock_not_found_exception


async def get_stock_by_id(
    stock_id: PydanticObjectId
):
    stock = await Stock.get(stock_id)

    if stock is not None:
        return stock
    else:
        raise stock_not_found_exception
