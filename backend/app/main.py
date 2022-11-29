from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from fastapi_utils.tasks import repeat_every

from .configs.settings import get_settings
from .routers import auth, stocks, users, wallets, stock_entries
from .utils.mongo import init_db

from .services.finnhub import fetch_stock_list, get_stock_symbols

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def init():
    await init_db(get_settings())


@app.on_event("startup")
@repeat_every(seconds=60)
async def fetch_tracked_stocks():
    await fetch_stock_list(await get_stock_symbols())


app.include_router(wallets.router)
app.include_router(stocks.router)
app.include_router(stock_entries.router)
app.include_router(users.router)
app.include_router(auth.router)


@app.get("/")
def redirect_docs():
    return RedirectResponse(url="/docs")


@app.get("/{full_path:path}")
def _():
    return {"message": "Requested path does not exist."}
