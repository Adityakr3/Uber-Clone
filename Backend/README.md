## All About Users Register

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

## All About User Login.




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



## Profile Documentation
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



## Logout Documentation
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