# Shop back for UnitHack Warpoint Project

## Documentation

Base url for Shop is `/api/shop`

### Retrieve info about item

`GET /item_info`

Body:

```json
{
  "token": "string, required",
  "item_id": "string, required"
}
```

Response example:

```json
{
  "item_id": 3,
  "item_price": 500,
  "item_description": "Plain description",
  "item_image_url": "/data/images/item_1.png",
  "item_reviews": [
      "review_id_1",
      "review_id_2"
  ]
}
```

Status codes:

- 200 "OK"
- 400 "Bad request"
- 406 "Item with the corresponding id doesn't exist" 
- 500 "Server error"

### Retrieve info about review

`GET /review_info`

Body:

```json
{
  "token": "string, required",
  "review_id": "string, required"
}
```

Response example:

```json
{
  "review_id": 5,
  "review_author": "Aleksey",
  "review_description": "I love that website",
  "review_stars": 5
}
```

Status codes:

- 200 "OK"
- 400 "Bad request"
- 406 "Item with the corresponding id doesn't exist" 
- 500 "Server error"

### Retrieve items in cart

Returns pairs item_id:amount

`GET /get_cart`

Body:

```json
{
  "token": "string, required"
}
```

Response example:

```json
{
  "items": {
      "item_1": 1,
      "item_7": 10,
      "item_13": 4
  }
}
```

Status codes:

- 200 "OK"
- 401 "Unauthorized access"
- 500 "Internal server error"

### Set cart

`POST /set_cart`

Body:

```json
{
  "token": "string, required",
  "products": {
      "item_1": 1,
      "item_7": 10,
      "item_13": 4 
    }
}
```

Response:

```json
{
  "message": "ok"
}
```

Status codes:

- 200 "OK"
- 400 "Bad request"
- 401 "Unauthorized access"
- 500 "Internal server error"

### Retrieve items

`GET /retrieve_items`

Body:

```json
{
  "token": "string, required"
}
```

Response:

```json
{
  "items": {
      {
        "id": 1,
        "name": "adwad",
        "description": "desc",
        "price": 123,
        "image_url": "123",
        "merch_type": "tshirt"
      }
    }
}
```

Errors:

Status codes:

- 200 "OK"
- 500 "Internal server error"

### place order

`POST /place_order`

Body:

```json
{
  "token": "string, required",
  "items": {
      "item_1": 1,
      "item_7": 10,
      "item_13": 4 
    }
}
```

Response:

```json
{
  "message":"ok"
}
```

Errors:

Status codes:

- 200 "OK"
- 401 "Unauthorized access"
- 500 "Internal server error"

### get orders

`GET /get_orders`

Body:

```json
{
  "token": "string, required"
}
```

Response:

```json
{
  "orders": {
    "order_1": {
          "items": {
              "item_1": 1,
              "item_7": 10,
              "item_13": 4 
          }
        },
    "order_2": {
      ...
    }
  }
}
```

Errors:

- 200 "OK"
- 400 "Bad request"
- 401 "Unauthorized access"
- 500 "Internal server error."