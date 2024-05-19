import asyncio
import os

import tortoise
from fastapi import FastAPI, status
from tortoise import Tortoise

import nest_asyncio

nest_asyncio.apply()

import models


async def init():
    user = os.getenv("PGUSER")
    password = os.getenv("POSTGRES_PASSWORD")
    host = os.getenv("POSTGRES_ADDRESS")
    db_name = os.getenv("POSTGRES_DB")

    await Tortoise.init(
        db_url=f'asyncpg://{user}:{password}@{host}:5432/{db_name}',
        modules={'models': ['models']})

    await Tortoise.generate_schemas()


loop = asyncio.get_event_loop()
loop.run_until_complete(init())

app = FastAPI()

base_url = "/app/shop"


@app.get(base_url)
async def root():
    await models.Order.create(id=1)
    return models.Order.get(id=1).values()
    return {"message": "Hello World"}


@app.get(base_url + "/get_cart")
async def getCart():
    # input: token
    # user id
    return status.HTTP_501_NOT_IMPLEMENTED


@app.post(base_url + "/set_cart")
async def setCart():
    return status.HTTP_501_NOT_IMPLEMENTED


@app.get(base_url + "/retrieve_items")
async def retrieveItems():
    # input: user id
    # item id
    return status.HTTP_501_NOT_IMPLEMENTED


@app.post(base_url + "/place_order")
async def placeOrder(request: ):

@app.get(base_url + )