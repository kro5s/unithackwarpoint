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
- 400 "Provide a valid `email` / `name` / `phone` / `password`" fields in request body."
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