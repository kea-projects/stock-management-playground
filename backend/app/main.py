from fastapi import FastAPI
from fastapi.responses import RedirectResponse

from .routers import wallets

app = FastAPI()


app.include_router(wallets.router)


@app.get("/")
def redirect_docs():
    return RedirectResponse(url="/docs")


@app.get("/{full_path:path}")
def _():
    return {"message": "Requested path does not exist."}
