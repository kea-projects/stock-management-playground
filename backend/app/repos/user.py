from ..models.user import User


async def get_user_by_username(username: str):
    return await User.find_one(User.username == username)


async def user_exists_by_username(username: str):
    user = await User.find_one(User.username == username)
    if user is not None:
        return True
    return False
