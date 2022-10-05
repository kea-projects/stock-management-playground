from fastapi import FastAPI
from fastapi.responses import RedirectResponse

from .configs.settings import get_settings
from .routers import wallets
from .routers import users
from .routers import auth
from .utils.mongo import init_db

app = FastAPI()


@app.on_event("startup")
async def init():
    await init_db(get_settings())

app.include_router(wallets.router)
app.include_router(users.router)
app.include_router(auth.router)


@app.get("/")
def redirect_docs():
    return RedirectResponse(url="/docs")


@app.get("/{full_path:path}")
def _():
    return {"message": "Requested path does not exist."}
