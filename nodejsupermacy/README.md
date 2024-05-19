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
  "message": "ok",
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

### Get Task

`GET /api/task`
Returns all actual tasks
Response:

```json
{
  "message": "ok",
  "tasks": [
    {
      "id": 0,
      "name": "example",
      "starts": "Date ISO string",
      "outdates": "Date ISO string",
      "case": {
        "id": 0,
        "name": "name",
        "image": "path/to/image"
      }
    }
  ]
}
```

`GET /api/task?id=0`
Returns specific task
Response:

```json
{
  "message": "ok",
  "task": {
    "id": 0,
    "name": "example",
    "starts": "Date ISO string",
    "outdates": "Date ISO string",
    "case": {
      "id": 0,
      "name": "name",
      "image": "path/to/image"
    }
  }
}
```

Errors:

- 400 "Provide valid id parameter."
- 401 "Invalid Token."
- 401 "Token Expired."
- 404 "Task with id {id} not found."
- 500 "Internal Server Error."

### Submit Task

`POST /api/task/submit`

Body:

```json
{
  "id": 0
}
```

Response:

```json
{
  "message": "ok"
}
```

Errors:

- 400 "Provide valid id parameter."
- 401 "Invalid Token."
- 401 "Token Expired."
- 404 "Task with id {id} not found."
- 500 "Internal Server Error."

### Get Case

`GET /api/case`
Returns all cases
Response:

```json
{
  "message": "ok",
  "cases": [
    {
      "id": 0,
      "name": "example",
      "image": "path/to/image"
    }
  ]
}
```

`GET /api/task?id=0`
Returns specific task
Response:

```json
{
  "message": "ok",
  "case": {
    "id": 0,
    "name": "example",
    "image": "path/to/image"
  }
}
```

Errors:

- 400 "Provide valid id parameter."
- 401 "Invalid Token."
- 401 "Token Expired."
- 404 "Task with id {id} not found."
- 500 "Internal Server Error."

### Open case

`POST /api/case/open`

Body:

```json
{
  "id": 0
}
```

Response:

```json
{
  "message": "ok"
}
```

Errors:

- 400 "Provide valid id parameter."
- 401 "Invalid Token."
- 401 "Token Expired."
- 403 "You can't open this case."
- 404 "Case with id {id} not found."
- 500 "Internal Server Error."
