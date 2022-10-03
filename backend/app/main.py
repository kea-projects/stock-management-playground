from functools import lru_cache

from fastapi import FastAPI
from fastapi.responses import RedirectResponse

from .configs.settings import Settings
from .routers import wallets
from .utils.mongo import init_db

app = FastAPI()


@lru_cache()
def get_settings():
    return Settings()


@app.on_event("startup")
async def init():
    await init_db(get_settings())

app.include_router(wallets.router)


@app.get("/")
def redirect_docs():
    return RedirectResponse(url="/docs")


@app.get("/{full_path:path}")
def _():
    return {"message": "Requested path does not exist."}
