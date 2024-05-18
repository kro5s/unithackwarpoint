# Node.js Server for UnitHack Warpoint Project

Provides authorization service and game data backend

## Documentation

### Registration

`POST /api/auth/register`

Body:

```json
{
  "email": "string, required",
  "name": "string, required",
  "phone": "string, required",
  "password": "string, required"
}
```

Response:

```json
{
  "message": "ok",
  "auth": {
    "access": "access token here",
    "refresh": "refresh token here"
  }
}
```

Errors:

- 400 "Provide a valid `email` / `name` / `phone` / `password` fields in request body."
- 409 "Email {email} is used."
- 409 "Phone {phone} is used."
- 500 "Internal server error."

### Authorization

`POST /api/auth/login`

Body:

```json
{
  "email": "string?, required if no phone provided",
  "phone": "string?, required if no email provided",
  "password": "string, required"
}
```

Response:

```json
{
  "message": "ok",
  "auth": {
    "access": "access token here",
    "refresh": "refresh token here"
  }
}
```

Errors:

- 400 "Provide a valid `email` / `name` / `phone` / `password`" fields in request body."
- 401 "Incorrect password."
- 404 "User with query `{ email, phone }` not found."
- 500 "Internal server error."

### Validate Token

`POST /auth/token/validate?`

Body:

```json
{
  "token": "string, required, access or refresh token"
}
```

Response:

```json
{
  "message": "ok",
  "data": {
    "token-payload-here": 1
  }
}
```

Errors:

- 400 "Provide a valid `token` field in request body."
- 401 "Invalid token."
- 401 "Token expired."
- 500 "Internal server error."

### Refresh Token

`POST /api/token/refresh`

Body:

```json
{
  "token": "string, refresh token here, required"
}
```

Response:

```json
{
  "message":"ok",
  "auth": {
    "access": "access token here",
    "refresh": "refresh token here"
  }
}
```

Errors:

- 400 "Provide a valid `token` field in request body."
- 401 "Invalid token."
- 401 "Token expired."
- 500 "Internal server error."
