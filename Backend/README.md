##  Users Register Documentation

The
`/users/register` endpoint allows users to register a new account by providing their details.

**Endpoint**

- **URL**: `/users/register`
- **Method**: `POST`
- **Description**: Registers a new user with the provided information.

**Request Body**

- `email` (string, required)
  - Must be a valid email address.
- `fullName` (object, required)
  - `firstName` (string, required)
    - Minimum length: 5 characters.
  - `lastName` (string, optional)
    - Minimum length: 3 characters (if provided).
- `password` (string, required)
  - Minimum length: 8 characters.

**Example Request Body**

```json
{
  "email": "user@example.com",
  "fullName": {
    "firstName": "Jonathan",
    "lastName": "Doe"
  },
  "password": "securepassword123"
}
```
**Responses**
- **201 Created**

  - **Description**: User registered successfully.
  - **Body**:
    ```json
    {
      "message": "User created successfully",
      "token": "<auth_token>",
      "user": {
        /* user data */
      }
    }
    ```

- **400 Bad Request**
  - **Description**: Validation errors occurred.
  - **Body**:
    ```json
    {
      "message": [
        { "msg": "Invalid email", "param": "email" /* additional details */ },
        {
          "msg": "First name is too short",
          "param": "fullName.firstName" /* additional details */
        }
      ]
    }
    ```

- **500 Internal Server Error**
  - **Description**: An unexpected error occurred on the server.
  - **Body**:
    ```json
    {
      "message": "An unexpected error occurred. Please try again later."
    }
    ```

**Notes**

- Ensure all required fields are provided and meet the validation criteria.
- The password is hashed before storing.
- Upon successful registration, an authentication token is generated.


##  User Login Documentation




**Endpoint:** `/users/login`  
**Method:** `POST`  
**Description:** Authenticates a user and returns a JWT token.

**Request Body:**

- `email` (string, required): User's email address.
- `password` (string, required): User's password.

**Responses:**

- **200 OK**
  ```json
  {
    "token": "jwt-token"
  }
  ```


**Example Request Body**
{
  "email": "user@example.com",
  "password": "securepassword123"
}














## User Profile Documentation
Endpoint: /users/profile
Method: GET
Description: Retrieves the profile information of the currently authenticated user.

Request Headers:

Authorization (string, required): Bearer token for authentication.

Example Request:

http
Insert Code
Run
Copy code
GET /users/profile HTTP/1.1
Host: api.example.com
Authorization: Bearer <jwt-token>
Responses:

200 OK

json
Insert Code
Run
Copy code
{
  "user": {
    "email": "user@example.com",
    "fullName": {
      "firstName": "Jonathan",
      "lastName": "Doe"
    }
  }
}
401 Unauthorized

json
Insert Code
Run
Copy code
{
  "message": "Unauthorized: Invalid or missing token"
}
500 Internal Server Error

json
Insert Code
Run
Copy code
{
  "message": "An unexpected error occurred. Please try again later."
}
Notes:

The endpoint returns the user's email and full name (first and last name).
Users must be authenticated to access this endpoint.














## User Logout Documentation
Endpoint: /users/logout
Method: POST
Description: Logs out the currently authenticated user by invalidating the JWT token.

Request Headers:

Authorization (string, required): Bearer token for authentication.
Example Request:

POST /users/logout HTTP/1.1
Host: api.example.com
Authorization: Bearer <jwt-token>

Responses:

200 OK
{
  "message": "Logged out successfully"
}
401 Unauthorized
{
  "message": "Unauthorized: Invalid or missing token"
}
500 Internal Server Error
{
  "message": "An unexpected error occurred. Please try again later."
}

Notes:

The token provided in the Authorization header will be invalidated upon successful logout.
Users must be authenticated to access this endpoint.

## Captains Register Documentation

The
`/captains/register` endpoint allows captains to register a new account by providing their details.

**Endpoint**

- **URL**: `/captains/register`
- **Method**: `POST`
- **Description**: Registers a new captain with the provided information.

**Request Body**

- `email` (string, required)
  - Must be a valid email address.
- `fullname` (object, required)
  - `firstname` (string, required)
    - Minimum length: 3 characters.
  - `lastname` (string, optional)
    - Minimum length: 3 characters (if provided).
- `password` (string, required)
  - Minimum length: 6 characters.
- `vehicle` (object, required)
  - `color` (string, required)
    - Minimum length: 3 characters.
  - `plate` (string, required)
    - Minimum length: 3 characters.
  - `capacity` (number, required)
    - Minimum value: 1.
  - `vehicleType` (string, required)
    - Must be one of: `car`, `motorcycle`, `auto`.

**Example Request Body**

```json
{
  "email": "captain@example.com",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "password": "securepassword123",
  "vehicle": {
    "color": "Red",
    "plate": "XYZ123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

**Responses**

- **201 Created**

  - **Description**: Captain registered successfully.
  - **Body**:
    ```json
    {
      "token": "<auth_token>",
      "captain": {
        /* captain data */
      }
    }
    ```

- **400 Bad Request**
  - **Description**: Validation errors occurred.
  - **Body**:
    ```json
    {
      "errors": [
        { "msg": "Invalid email", "param": "email" /* additional details */ },
        {
          "msg": "First name must be at least 3 characters long",
          "param": "fullname.firstname" /* additional details */
        }
      ]
    }
    ```

- **500 Internal Server Error**
  - **Description**: An unexpected error occurred on the server.
  - **Body**:
    ```json
    {
      "message": "An unexpected error occurred. Please try again later."
    }
    ```

**Notes**

- Ensure all required fields are provided and meet the validation criteria.
- The password is hashed before storing.
- Upon successful registration, an authentication token is generated.

## Captains Login Documentation

The `/captains/login` endpoint allows captains to log in by providing their email and password.

**Endpoint**

- **URL**: `/captains/login`
- **Method**: `POST`
- **Description**: Authenticates a captain and returns a JWT token.

**Request Body**

- `email` (string, required): Captain's email address.
- `password` (string, required): Captain's password.

**Example Request Body**

```json
{
  "email": "captain@example.com",
  "password": "securepassword123"
}
```

**Responses**

- **200 OK**
  - **Description**: Captain authenticated successfully.
  - **Body**:
    ```json
    {
      "token": "jwt-token",
      "captain": {
        /* captain data */
      }
    }
    ```

- **400 Bad Request**
  - **Description**: Validation errors occurred.
  - **Body**:
    ```json
    {
      "errors": [
        { "msg": "Invalid email", "param": "email" /* additional details */ },
        {
          "msg": "Password must be at least 6 characters long",
          "param": "password" /* additional details */
        }
      ]
    }
    ```

- **401 Unauthorized**
  - **Description**: Invalid email or password.
  - **Body**:
    ```json
    {
      "message": "Invalid Email or Password"
    }
    ```

- **500 Internal Server Error**
  - **Description**: An unexpected error occurred on the server.
  - **Body**:
    ```json
    {
      "message": "An unexpected error occurred. Please try again later."
    }
    ```

**Notes**

- Ensure all required fields are provided and meet the validation criteria.
- Upon successful authentication, an authentication token is generated.

## Captains Profile Documentation

The `/captains/profile` endpoint retrieves the profile information of the currently authenticated captain.

**Endpoint**

- **URL**: `/captains/profile`
- **Method**: `GET`
- **Description**: Retrieves the profile information of the currently authenticated captain.

**Request Headers**

- `Authorization` (string, required): Bearer token for authentication.

**Example Request**

```http
GET /captains/profile HTTP/1.1
Host: api.example.com
Authorization: Bearer <jwt-token>
```

**Responses**

- **200 OK**
  - **Description**: Captain profile retrieved successfully.
  - **Body**:
    ```json
    {
      "captain": {
        "email": "captain@example.com",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "vehicle": {
          "color": "Red",
          "plate": "XYZ123",
          "capacity": 4,
          "vehicleType": "car"
        }
      }
    }
    ```

- **401 Unauthorized**
  - **Description**: Invalid or missing token.
  - **Body**:
    ```json
    {
      "message": "Unauthorized: Invalid or missing token"
    }
    ```

- **500 Internal Server Error**
  - **Description**: An unexpected error occurred on the server.
  - **Body**:
    ```json
    {
      "message": "An unexpected error occurred. Please try again later."
    }
    ```

**Notes**

- The endpoint returns the captain's email, full name, and vehicle details.
- Captains must be authenticated to access this endpoint.

## Captains Logout Documentation

The `/captains/logout` endpoint logs out the currently authenticated captain by invalidating the JWT token.

**Endpoint**

- **URL**: `/captains/logout`
- **Method**: `POST`
- **Description**: Logs out the currently authenticated captain by invalidating the JWT token.

**Request Headers**

- `Authorization` (string, required): Bearer token for authentication.

**Example Request**

```http
POST /captains/logout HTTP/1.1
Host: api.example.com
Authorization: Bearer <jwt-token>
```

**Responses**

- **200 OK**
  - **Description**: Captain logged out successfully.
  - **Body**:
    ```json
    {
      "message": "Logged out successfully"
    }
    ```

- **401 Unauthorized**
  - **Description**: Invalid or missing token.
  - **Body**:
    ```json
    {
      "message": "Unauthorized: Invalid or missing token"
    }
    ```

- **500 Internal Server Error**
  - **Description**: An unexpected error occurred on the server.
  - **Body**:
    ```json
    {
      "message": "An unexpected error occurred. Please try again later."
    }
    ```

**Notes**

- The token provided in the Authorization header will be invalidated upon successful logout.
- Captains must be authenticated to access this endpoint.

















