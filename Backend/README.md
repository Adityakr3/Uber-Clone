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
            "user": { /* user data */ }
        }
        ```

- **400 Bad Request**
    - **Description**: Validation errors occurred.
    - **Body**:
        ```json
        {
            "message": [
                { "msg": "Invalid email", "param": "email", /* additional details */ },
                { "msg": "First name is too short", "param": "fullName.firstName", /* additional details */ }
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

## All About  User Login. 

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
