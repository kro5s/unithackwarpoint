import asyncio
import os
from pathlib import Path

import jwt
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

pubkey_raw = open("/app/data/pubkeys/public.pem", "rb").read()
pubkey = jwt.jwk_from_pem(pubkey_raw)

instance = jwt.JWT()
async def getPayload(request: fastapi.Request) -> tuple[bool, dict]:
    """
    token example:
    {'type': 'access', '
    data': {'id': 1, 'email': 'email@mail.ru', 'phone': '+121273821', 'name': 'Test'},
    'iat': 1716109855,
    'exp': 1716196255}
    """

    try:
        token = request.headers.get("Authorization").split(" ")[1]
    except Exception as ex:
        return False, {}

    try:
        payload = instance.decode(token, pubkey)
    except Exception as ex:
        return False, {}
    return True, payload


app = FastAPI()

base_url = os.getenv("BASE_URL_SHOP")


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
    ok, token_payload = await getPayload(request)
    if not ok:
        return fastapi.responses.JSONResponse({"message": "Token is not valid"}, status_code=status.HTTP_401_UNAUTHORIZED)

    try:
        item_id = request.query_params.get("item_id")
    except Exception as ex:
        body = {"message": f"Unknown error: {ex}"}
        return fastapi.responses.JSONResponse(body, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

    try:
        item_info = await models.Item.get(id=item_id).values()
    except tortoise.exceptions.DoesNotExist as ex:
        body = {"message": f"Specified item_id doesn't exist"}
        return fastapi.responses.JSONResponse(body, status_code=status.HTTP_400_BAD_REQUEST)
    except Exception as ex:
        body = {"message": f"Unknown error: {ex}"}
        return fastapi.responses.JSONResponse(body, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

    body = {
        "item_id": item_info["id"],
        "item_price": item_info["price"],
        "item_description": item_info["description"],
        "item_image_url": item_info["image_url"],
        # "item_reviews": item_info.reviews
    }
    return fastapi.responses.JSONResponse(body,
                                          status_code=status.HTTP_200_OK)

@app.get(base_url + "/review_info")
async def getReviewInfo(request: fastapi.Request):
    ok, token_payload = await getPayload(request)
    if not ok:
        return fastapi.responses.JSONResponse({"message": "Token is not valid"},
                                              status_code=status.HTTP_401_UNAUTHORIZED)

    try:
        review_id = request.query_params.get("review_id")
    except Exception as ex:
        body = {"message": f"Unknown error: {ex}"}
        return fastapi.responses.JSONResponse(body, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

    try:
        review_info = await models.Review.get(id=review_id).values()
    except tortoise.exceptions.DoesNotExist as ex:
        body = {"message": f"Specified review_id doesn't exist"}
        return fastapi.responses.JSONResponse(body, status_code=status.HTTP_400_BAD_REQUEST)

    body = {
        "review_id": review_info["id"],
        "review_author": review_info["author"],
        "review_description": review_info["description"],
        "review_stars": review_info["stars"]
    }
    return fastapi.responses.JSONResponse(body,
                                          status_code=status.HTTP_200_OK)


@app.get(base_url + "/get_cart")
async def get_cart(request: fastapi.Request):
    ok, token_payload = await getPayload(request)
    if not ok:
        return fastapi.responses.JSONResponse({"message": "Token is not valid"},
                                              status_code=status.HTTP_401_UNAUTHORIZED)

    try:
        user_id = token_payload["data"]["id"]
    except Exception as ex:
        body = {"message": ex}
        return fastapi.responses.JSONResponse(body,
                                              status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

    try:
        cart = await models.Cart.get(id=user_id).values()
    except tortoise.exceptions.DoesNotExist as ex:
        body = {"message": f"Cart for specified user doesn't exist"}
        return fastapi.responses.JSONResponse(body, status_code=status.HTTP_400_BAD_REQUEST)

    body = {"id": cart["id"], "items_ids": cart["items_ids"]}
    return fastapi.responses.JSONResponse(body,
                                          status_code=status.HTTP_200_OK)


@app.post(base_url + "/set_cart")
async def set_cart(request: fastapi.Request):
    token_payload = await getPayload(request)
    items = request.query_params.get("items")
    return fastapi.responses.JSONResponse(
        "{}", status_code=status.HTTP_501_NOT_IMPLEMENTED)


@app.get(base_url + "/retrieve_items")
async def retrieve_items(request: fastapi.Request):
    token_payload = await getPayload(request)
    """
    Authorization: Bearer <token>
    """
    try:
        body = {"items": await models.Item.all().values()}
        return fastapi.responses.JSONResponse(body,
                                              status_code=status.HTTP_200_OK)
    except Exception as e:
        body = {"message": f"Items not found, {e}"}
        return fastapi.responses.JSONResponse(
            body, status_code=status.HTTP_401_NOT_ACCEPTABLE)
    return fastapi.responses.JSONResponse(
        body, status_code=status.HTTP_501_NOT_IMPLEMENTED)


@app.post(base_url + "/place_order")
async def place_order(request: fastapi.Request):
    token = request.headers.get("token")
    items = request.query_params.get("items")
    return status.HTTP_501_NOT_IMPLEMENTED


@app.get(base_url + "/get_orders")
async def get_orders(request: fastapi.Request):
    token = request.headers.get("token")
    body = {"orders": await models.Order.all().values()}
    try:
        return fastapi.responses.JSONResponse(body,
                                              status_code=status.HTTP_200_OK)
    except Exception as e:
        body = {"message": f"Orders not found, {e}"}
        return fastapi.responses.JSONResponse(
            body, status_code=status.HTTP_401_NOT_ACCEPTABLE)

    return status.HTTP_501_NOT_IMPLEMENTED
