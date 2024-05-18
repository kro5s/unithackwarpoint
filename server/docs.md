# Shop back for UnitHack Warpoint Project

## Documentation

### get cart

`GET /api/shop/get_cart`

Body:

```json
{
  "token": "string, required",
}
```

Response:

```json
{
  "message": "ok"
}
```

Errors:

- 400 ""
- 409 ""
- 409 ""
- 500 "Internal server error."

### set cart

`POST /api/shop/set_cart`

Body:

```json
{
  "token": "string, required",
  "dict": "dict[id:count]?, required"
}
```

Response:

```json
{
  "message": "ok"
}
```

Errors:

- 400 ""
- 401 ""
- 404 ""
- 500 "Internal server error."

### retrieve items

`GET /api/shop/retrieve_items`

Body:

```json
{
  "token": "string, required"
}
```

Response:

```json
{
  "list_items": "item"
}
```

Errors:

- 400 ""
- 401 ""
- 401 ""
- 500 "Internal server error."

### place order

`POST /api/shop/place_order`

Body:

```json
{
  "token": "string, required",
  "items": "dict[item:count]"
}
```

Response:

```json
{
  "message":"ok"
}
```

Errors:

- 400 ""
- 401 ""
- 401 ""
- 500 "Internal server error."

### get orders

`GET /api/shop/get_orders`

Body:

```json
{
  "token": "string, required"
}
```

Response:

```json
{
  "list_orders":"list[items+описание классов]"
}
```

Errors:

- 400 ""
- 401 ""
- 401 ""
- 500 "Internal server error."