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

# User Verification APIs

## Verify Email

### Endpoint: `GET [{BaseURL}]/verify-email`

Verifies the user's email address.

#### Request:

- **Method:** `GET`

#### Response:

- **Status Code:** 200 OK
- **Body:**
  - `success`: `true`
  - `message`: "Email verified successfully."

## Generate Verification Token

### Endpoint: `POST [{BaseURL}]/generate-verification-token`

Generates an email verification token.

#### Request:

- **Method:** `POST`
- **Body:**
  - `email` (string, required): User's email address.

#### Response:

- **Status Code:** 200 OK
- **Body:**
  - `success`: `true`
  - `message`: "Email verification token generated successfully."
# Note Management APIs

## Note Model

- **title** (string, required): Title of the note.
- **content** (string): Content of the note.
- **category** (string, default: "Uncategorized"): Category of the note.

## Note Controller

### Create a New Note

- **Endpoint:** `POST /api/v1/note/create`
- **Request:**
  - **Required:**
    - `title` (string): Title of the note.
  - **Optional:**
    - `content` (string): Content of the note.
- **Response:**
  - `success` (boolean): `true`
  - `data` (object): Created note details.
  - `message` (string): "Note created successfully"

### Update a Note

- **Endpoint:** `PUT /api/v1/note/update/:id`
- **Request:**
  - **Optional:**
    - `title` (string): New title of the note.
    - `content` (string): New content of the note.
- **Response:**
  - `success` (boolean): `true`
  - `data` (object): Updated note details.
  - `message` (string): "Note updated successfully"

### Delete a Note

- **Endpoint:** `DELETE /api/v1/note/delete/:id`
- **Response:**
  - `success` (boolean): `true`
  - `message` (string): "Note deleted successfully"

### Get All Notes

- **Endpoint:** `GET /api/v1/note/getnotes`
- **Response:**
  - `success` (boolean): `true`
  - `data` (array): Array of notes.

### Get a Single Note

- **Endpoint:** `GET /api/v1/note/getnote/:id`
- **Response:**
  - `success` (boolean): `true`
  - `data` (object): Note details.

## Note Router

- **Create a Note:**
  - **Endpoint:** `POST /api/v1/note/create`
  - **Body:**
    - `title` (string, required): Title of the note.
    - `content` (string): Content of the note.

- **Update a Note:**
  - **Endpoint:** `PUT /api/v1/note/update/:id`
  - **Body:**
    - `title` (string): New title of the note.
    - `content` (string): New content of the note.

- **Delete a Note:**
  - **Endpoint:** `DELETE /api/v1/note/delete/:id`

- **Get All Notes:**
  - **Endpoint:** `GET /api/v1/note/getnotes`

- **Get a Single Note:**
  - **Endpoint:** `GET /api/v1/note/getnote/:id`

- **Route Not Found:**
  - **Response:**
    - `success` (boolean): `false`
    - `error` (string): "Route not found"

Please replace `[{BaseURL}]` with the actual base URL where your API is hosted. Adjust the documentation according to your specific requirements and conventions.


