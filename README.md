[{base_url}] : https://group-todo-backend.azurewebsites.net/

# User Authentication APIs

## User Registration

### Endpoint: `POST [{BaseURL}]/api/v1/user/register`

Registers a new user in the system.

#### Request:

- **Method:** `POST`
- **Body:**
  - `email` (string, required): User's email address.
  - `password` (string, required): User's password (at least 8 characters long).
  - `name` (string, required): User's name.

#### Response:

- **Status Code:** 200 OK
- **Body:**
  - `loggedInUser`: User details excluding password and refresh token.
  - `accessToken`: JWT access token.
  - `refreshToken`: JWT refresh token.

## User Login

### Endpoint: `POST [{BaseURL}]/api/v1/user/login`

Logs in an existing user.

#### Request:

- **Method:** `POST`
- **Body:**
  - `email` (string, required): User's email address.
  - `password` (string, required): User's password.

#### Response:

- **Status Code:** 200 OK
- **Body:**
  - `loggedInUser`: User details excluding password and refresh token.
  - `accessToken`: JWT access token.
  - `refreshToken`: JWT refresh token.

## User Logout

### Endpoint: `POST [{BaseURL}]/api/v1/user/logout`

Logs out the currently logged-in user.

#### Request:

- **Method:** `POST`

#### Response:

- **Status Code:** 200 OK
- **Body:**
  - `success`: `true`
  - `message`: "User Logged Out Successfully"

## User Password Reset

### Endpoint: `POST [{BaseURL}]/api/v1/user/reset`

Resets the password for a user.

#### Request:

- **Method:** `POST`
- **Body:**
  - `email` (string, required): User's email address.
  - `password` (string, required): New password (at least 8 characters long).

#### Response:

- **Status Code:** 200 OK
- **Body:**
  - `success`: `true`
  - `message`: "Password Reset Successfully"

## Verify Email

### Endpoint: `POST [{BaseURL}]/api/v1/user/verify`

Verifies the user's email address.

#### Request:

- **Method:** `POST`
- **Body:**
  - `token` (string, required): Email verification token.

#### Response:

- **Status Code:** 200 OK
- **Body:**
  - `success`: `true`
  - `message`: "Email verified successfully."

## Secure Routes

### Authorization

Secure routes require a valid access token for authorization.

### Access Authorized Route

### Endpoint: `GET [{BaseURL}]/api/v1/user/autho`

Returns a message indicating that the user is authorized to access the route.

#### Request:

- **Method:** `GET`

#### Response:

- **Status Code:** 200 OK
- **Body:**
  - `message`: "You are authorized to access this route"



