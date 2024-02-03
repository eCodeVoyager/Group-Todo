[{base_url}] : https://group-todo-backend.azurewebsites.net/

### Login
**Endpoint:** `POST [{base_url}]/api/v1/user/login`

**Body:**
```json
{
    "email": "ehsan@ehsan.com",
    "password": "12345678" //min 8
}
```

### Logout
**Endpoint:** `POST [{base_url}]/api/v1/user/logout`

**Authorization:** JWT 



### Register
**Endpoint:** `POST [{base_url}]/api/v1/user/register`

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


