import asyncio
import os
import fastapi
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


async def initData():
    await models.Item.create(id=1,
                             name="adwad",
                             description="desc",
                             price=123,
                             image_url="123",
                             merch_type="tshirt")


loop = asyncio.get_event_loop()
loop.run_until_complete(initData())

app = FastAPI()

base_url = "/api/shop"


@app.get(base_url)
async def root():
    return {"message": "Hello World"}


# status.HTTP_200_OK
# status.HTTP_400_BAD_REQUEST
# status.HTTP_401_UNAUTHORIZED
# status.HTTP_406_NOT_ACCEPTABLE
# status.HTTP_500_INTERNAL_SERVER_ERROR


@app.get(base_url + "/item_info")
async def getItemInfo(request: fastapi.Request):
    token = request.query_params.get("token")
    item_id = request.query_params.get("item_id")
    item_info = await models.Item.get(id=item_id).values()
    try:
        body = {
            "item_id": item_info.id,
            "item_price": item_info.price,
            "item_description": item_info.description,
            "item_image_url": item_info.image_url,
            # "item_reviews": item_info.reviews
        }
        return fastapi.responses.JSONResponse(body, status_code=status.HTTP_200_OK)

    except Exception as e:
        body = {"message": f"Item not found,{e}"}
        return fastapi.responses.JSONResponse(body, status_code=status.HTTP_406_NOT_ACCEPTABLE)
    return status.HTTP_501_NOT_IMPLEMENTED


@app.get(base_url + "/review_info")
async def getReviewInfo(request: fastapi.Request):
    token = request.query_params.get("token")
    review_id = request.query_params.get("review_id")
    review_info = await models.Review.get(id=review_id).values()
    body = {
        "review_id": review_info.id,
        "review_author": review_info.author,
        "review_description": review_info.description,
        "review_stars": review_info.stars
    }
    try:
        return fastapi.responses.JSONResponse(body, status_code=status.HTTP_200_OK)
    except Exception as e:
        body = {"message": f"Review not found,{e}"}
        return fastapi.responses.JSONResponse(body, status_code=status.HTTP_401_UNAUTHORIZED)
    return status.HTTP_501_NOT_IMPLEMENTED


@app.get(base_url + "/get_cart")
async def get_cart(request: fastapi.Request):
    token = request.query_params.get("token")
    cart = await models.Cart.get(user_id=token).values()
    body = {
        "id": cart.id,
        "items_ids": cart.items_ids
    }
    try:
        return fastapi.responses.JSONResponse(body, status_code=status.HTTP_200_OK)
    except Exception as e:
        body = {
            "message": f"Cart not found, {e}"
        }
        return fastapi.responses.JSONResponse(body, status_code=status.HTTP_401_NOT_ACCEPTABLE)
    return status.HTTP_501_NOT_IMPLEMENTED


@app.post(base_url + "/set_cart")
async def set_cart(request: fastapi.Request):
    token = request.query_params.get("token")
    items = request.query_params.get("items")
    return status.HTTP_501_NOT_IMPLEMENTED


@app.get(base_url + "/retrieve_items")
async def retrieve_items(request: fastapi.Request):
    token = request.query_params.get("token")
    body = {
        "items": await models.Item.all().values()
    }

    try:
        return fastapi.responses.JSONResponse(body, status_code=status.HTTP_200_OK)
    except Exception as e:
        body = {
            "message": f"Items not found, {e}"
        }
        return fastapi.responses.JSONResponse(body, status_code=status.HTTP_401_NOT_ACCEPTABLE)
    return status.HTTP_501_NOT_IMPLEMENTED


@app.post(base_url + "/place_order")
async def place_order(request: fastapi.Request):
    token = request.query_params.get("token")
    items = request.query_params.get("items")
    return status.HTTP_501_NOT_IMPLEMENTED


@app.get(base_url + "/get_orders")
async def get_orders(request: fastapi.Request):
    token = request.query_params.get("token")
    body = {
        "orders": await models.Order.all().values()
    }
    try:
        return fastapi.responses.JSONResponse(body, status_code=status.HTTP_200_OK)
    except Exception as e:
        body = {
            "message": f"Orders not found, {e}"
        }
        return fastapi.responses.JSONResponse(body, status_code=status.HTTP_401_NOT_ACCEPTABLE)

    return status.HTTP_501_NOT_IMPLEMENTED
