
# Secure Authentication System (Node.js + JWT)

A production-inspired authentication system built with Node.js and Express, implementing secure login, JWT-based authentication, refresh tokens, and industry-standard backend practices.

---

## Features

* JWT Authentication (Access Token)
* Refresh Token System (HTTP-only cookies)
* Protected Routes with Middleware
* Password Hashing using bcrypt
* Rate Limiting (Prevent brute-force attacks)
* Input Validation (express-validator)
* Structured Logging System
* Centralized Error Handling
* Scalable Folder Structure

---

## Authentication Flow

1. User logs in → receives:

   * Access Token (short-lived)
   * Refresh Token (stored in HTTP-only cookie)

2. Access Token used for protected routes

3. When Access Token expires:

   * `/refresh` endpoint generates a new Access Token using Refresh Token

4. Logout clears refresh token cookie

---

## Tech Stack

* Node.js
* Express.js
* MongoDB + Mongoose
* JSON Web Token (JWT)
* bcryptjs
* express-validator
* winston (logging)
* express-rate-limit
* cookie-parser

---

## Project Structure

```
src/
│
├── Config/
│   └── db.js
│
├── Controller/
│   └── userController.js
│
├── Middleware/
│   ├── authMiddleware.js
│   ├── errorMiddleware.js
│   ├── loggerMiddleware.js
│   └── rateLimitMiddleware.js
│
├── Model/
│   └── userModel.js
│
├── Routes/
│   └── userRoutes.js
│
|── Services/
|   └── userService.js
├── Utils/
│   ├── generateToken.js
│   └── asyncHandler.js
|   └── logger.js
|   └── removePassword.js
│
├── Validator/
│   └── validator.js
│
└── server.js
```

---

## API Endpoints

### Authentication

| Method | Endpoint       | Description               |
| ------ | -------------- | ------------------------- |
| POST   | /user/register | Register new user         |
| POST   | /user/login    | Login user                |
| POST   | /user/refresh  | Generate new access token |

---

### Protected

| Method | Endpoint | Description               |
| ------ | -------- | ------------------------- |
| GET    | /user    | Get one user (protected) |

---

## Security Features

* Password hashing with bcrypt
* JWT-based authentication
* HTTP-only cookies for refresh tokens
* Rate limiting to prevent abuse
* Input validation and sanitization
* Centralized error handling
* Logging for monitoring requests & errors

---

## 🧪 Testing (Postman)

1. Login → receive access token + cookie
2. Use access token in:

   ```
   Authorization: Bearer <token>
   ```
3. Call `/refresh` to generate new token
4. Cookie automatically sent with request

---

## Future Improvements

* Role-based authorization (admin/user)
* Email verification system
* Password reset functionality
* Token rotation / blacklist
* OAuth (Google login)

---

## Author

Built as part of backend learning to understand real-world authentication systems and secure API design.

---

## Note

This project focuses on **learning industry-level backend practices**, including authentication, security, and scalable architecture.
