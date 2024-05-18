from db import DB

from fastapi import FastAPI, status

db = DB()
app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/get_cart")
async def getCart():
    return status.HTTP_501_NOT_IMPLEMENTED

@app.post("/set_cart")
async def setCart():
    return status.HTTP_501_NOT_IMPLEMENTED