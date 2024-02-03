

### Login
**Endpoint:** `POST localhost:3000/api/v1/user/login`

**Body:**
```json
{
    "email": "ehsan@ehsan.com",
    "password": "12345678" //min 8
}
```

### Logout
**Endpoint:** `POST localhost:3000/api/v1/user/logout`

**Authorization:** API Key

*This request is using an authorization helper from collection API documentation*

### Register
**Endpoint:** `POST localhost:3000/api/v1/user/register`

**Authorization:** API Key

*This request is using an authorization helper from collection API documentation*

**Body:**
```json
{
    "email": "e@ehsan.com",
    "password": "12345678", //min 8
    "name": "ehsan"
}
```

Make sure to replace API Key with the actual authorization token when making requests.
