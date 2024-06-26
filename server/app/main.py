import asyncio
import json
import os
from pathlib import Path

import jwt
import tortoise
from tortoise import Tortoise
import fastapi
from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware


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
    await models.Product.update_or_create(id=1,
                                name="adwad",
                                price=123,
                                img="1234",
                                category="tshirt",
                                content="description")
    await models.Product.update_or_create(
                                id = 2,
                                name = "adwad",
                                price = 123,
                                img = "1234",
                                category = "tshirt",
                                content = "description")
    await models.CartItem.update_or_create(
        id=1,
        cartId=1,
        productId=1,
        quantity=2
    )
    await models.CartItem.update_or_create(
        id=2,
        cartId=1,
        productId=2,
        quantity=10
    )

    ...



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

origins = [
    "*"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

base_url = os.getenv("BASE_URL_SHOP")
if base_url is None:
    base_url = ""


@app.get(base_url)
async def root():
    return {"message": "Hello World"}


# status.HTTP_200_OK
# status.HTTP_400_BAD_REQUEST
# status.HTTP_401_UNAUTHORIZED
# status.HTTP_406_NOT_ACCEPTABLE
# status.HTTP_500_INTERNAL_SERVER_ERROR



@app.get(base_url + "/products")
async def retrieve_products(request: fastapi.Request):
    try:
        products = await models.Product.all().values()
        return fastapi.responses.JSONResponse(products,
                                              status_code=status.HTTP_200_OK)
    except Exception as e:
        body = {"message": f"products not found, {e}"}
        return fastapi.responses.JSONResponse(
            body, status_code=status.HTTP_401_NOT_ACCEPTABLE)

@app.get(base_url + "/products/{product_id}")
async def getProductInfo(product_id: int, request: fastapi.Request):
    try:
        product_info = await models.Product.get(id=int(product_id)).values()
    except tortoise.exceptions.DoesNotExist as ex:
        body = {"message": f"Specified productId doesn't exist"}
        return fastapi.responses.JSONResponse(body, status_code=status.HTTP_400_BAD_REQUEST)
    except Exception as ex:
        body = {"message": f"Unknown error: {ex}"}
        return fastapi.responses.JSONResponse(body, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

    body = {
        "id": product_info["id"],
        "name": product_info["name"],
        "price": product_info["price"],
        "img": product_info["img"],
        "category": product_info["category"],
        "content": product_info["content"],
        # "product_reviews": product_info.reviews
    }
    return fastapi.responses.JSONResponse(body,
                                          status_code=status.HTTP_200_OK)


@app.get(base_url + "/cart")
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

    products_in_cart = []

    for product_in_cart in await models.CartItem.all():
        if product_in_cart.cartId == user_id:
            product_in_cart_json = {
                "id": product_in_cart.id,
                "cartId": product_in_cart.cartId,
                "productId": product_in_cart.productId,
                "quantity": product_in_cart.quantity
            }
            products_in_cart.append(product_in_cart_json)

    return fastapi.responses.JSONResponse(products_in_cart, status_code=status.HTTP_200_OK)

@app.post(base_url + "/cart/add")
async def add_item(request: fastapi.Request):
    try:
        ok, token_payload = await getPayload(request)
    except Exception as ex:
        return fastapi.responses.JSONResponse({"message": ex},
                                              status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

    if not ok:
        return fastapi.responses.JSONResponse({"message": "Token is not valid"},
                                              status_code=status.HTTP_401_UNAUTHORIZED)

    try:
        body = await request.json()

        user_id = token_payload["data"]["id"]
        product_id = body["productId"]
        new_quantity = body["quantity"]

    except Exception as ex:
        return fastapi.responses.JSONResponse({"message": ex},
                                              status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

    try:
        cart = await models.CartItem.get(cartId=user_id)
        cart.quantity += new_quantity
        await cart.save()
    except tortoise.exceptions.DoesNotExist as ex:
        await models.CartItem.create(cartId=user_id, productId=product_id, quantity=new_quantity)
    except Exception as ex:
        return fastapi.responses.JSONResponse({"message": ex}, status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return fastapi.responses.JSONResponse({"message": "ok"}, status_code=status.HTTP_200_OK)


@app.post(base_url + "/cart/quantity")
async def set_quantity(request: fastapi.Request):
    ok, token_payload = await getPayload(request)
    if not ok:
        return fastapi.responses.JSONResponse({"message": "Token is not valid"},
                                              status_code=status.HTTP_401_UNAUTHORIZED)

    try:
        body = await request.json()

        user_id = token_payload["data"]["id"]
        cart_item_id = body["id"]
        new_quantity = body["quantity"]

    except Exception as ex:
        body = {"message": ex}
        return fastapi.responses.JSONResponse(body,
                                              status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

    try:
        cart_item = await models.CartItem.get(id=cart_item_id)

    except tortoise.exceptions.DoesNotExist as ex:
        return fastapi.responses.JSONResponse({"message": "You have provided not existing cart_item_id"}, status_code=status.HTTP_400_BAD_REQUEST)

    cart_item.quantity = new_quantity
    await cart_item.save()

    return fastapi.responses.JSONResponse({"message": "ok"}, status_code=status.HTTP_200_OK)

@app.post(base_url + "/cart/remove")
async def remove_cart_item(request: fastapi.Request):
    ok, token_payload = await getPayload(request)
    if not ok:
        return fastapi.responses.JSONResponse({"message": "Token is not valid"},
                                              status_code=status.HTTP_401_UNAUTHORIZED)

    try:
        body = await request.json()

        user_id = token_payload["data"]["id"]
        cart_item_id = body["id"]
    except Exception as ex:
        body = {"message": ex}
        return fastapi.responses.JSONResponse(body,
                                              status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

    try:
        cart_item = await models.CartItem.get(id=cart_item_id)
        await cart_item.delete()
    except tortoise.exceptions.DoesNotExist as ex:
        return fastapi.responses.JSONResponse({"message": "You have provided not existing cart_item_id"}, status_code=status.HTTP_400_BAD_REQUEST)
    except Exception as ex:
        body = {"message": ex}
        return fastapi.responses.JSONResponse(body,
                                              status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return fastapi.responses.JSONResponse({"message": "ok"}, status_code=status.HTTP_200_OK)


@app.post(base_url + "/place_order")
async def place_order(request: fastapi.Request):
    token = request.headers.get("token")
    products = request.query_params.get("products")
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