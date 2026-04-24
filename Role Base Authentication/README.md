# RBAC Authentication System (Node.js + Express + MongoDB)

A production-style backend project implementing **Authentication + Role-Based Access Control (RBAC)** with secure practices such as JWT, password hashing, and password reset functionality.

---

## Features

### Authentication

* User **Registration & Login**
* Password hashing using **bcrypt**
* JWT-based authentication

### Authorization (RBAC)

* Role-based access (`admin`, `user`)
* Protected routes using middleware
* Admin-only routes for managing users

### User Features

* View own profile
* Forgot password (email verification simulation)
* Reset password using secure token

### Admin Features

* View all users
* Update any user (restricted fields)
* Delete users
* Access control via role middleware

### Security Features

* Password hashing (bcrypt)
* JWT token verification
* Secure password reset flow:

  * Random token generation (crypto)
  * Hashed token stored in DB
  * Token expiry handling
* No email enumeration in reset flow
* Field filtering to prevent privilege escalation

### Logging (Winston)

* Info logs (user actions)
* Warn logs (failed login, suspicious activity)
* Error logs (centralized error handling)
* Logs stored in:

  * Console
  * `logs/error.log`
  * `logs/combined.log`

---

## Tech Stack

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT (jsonwebtoken)
* bcrypt
* express-validator
* Winston (logging)
* Crypto (secure tokens)

---

## 📁 Project Structure

```
├── Config/
│   └── db.js
├── Controller/
│   ├── authController.js
│   ├── userController.js
│   └── adminController.js
├── Middleware/
│   ├── authMiddleware.js
│   ├── authorizeRole.js
│   └── errorMiddleware.js
├── Model/
│   └── userModel.js
├── Routes/
│   ├── authRoutes.js
│   ├── userRoutes.js
│   └── adminRoutes.js
├── Util/
│   ├── asyncHandler.js
│   ├── tokenGenerator.js
│   └── logger.js
├── Validator/
│   ├── authValidator.js
│   └── userValidator.js
├── logs/
│   ├── error.log
│   └── combined.log
└── server.js
```

---

## API Endpoints

### Auth Routes

| Method | Route       | Description       |
| ------ | ----------- | ----------------- |
| POST   | `/register` | Register new user |
| POST   | `/login`    | Login user        |

---

### User Routes

| Method | Route                         | Description        |
| ------ | ----------------------------- | ------------------ |
| GET    | `/user/profile`               | Get logged-in user |
| POST   | `/user/forgot-password`       | Request reset link |
| PUT    | `/user/reset-password/:token` | Reset password     |

---

### Admin Routes

| Method | Route              | Description       |
| ------ | ------------------ | ----------------- |
| GET    | `/admin/profile`   | Get admin profile |
| GET    | `/admin/users`     | Get all users     |
| PUT    | `/admin/users/:id` | Update user       |
| DELETE | `/admin/users/:id` | Delete user       |

---

## RBAC Flow

1. User logs in → receives JWT token
2. Token sent in headers → `Authorization: Bearer <token>`
3. `authMiddleware` verifies token
4. `authorizeRoles` checks role
5. Controller executes if authorized

---

## Password Reset Flow

1. User submits email
2. Server generates random token
3. Token is hashed and stored in DB
4. Reset link sent (simulated)
5. User submits new password with token
6. Token is verified and password updated

---

## Environment Variables

Create a `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET_KEY=your_secret_key
BASE_URL=http://localhost:5000
```

---

## Key Learnings

* Implemented **secure authentication system**
* Designed **role-based authorization**
* Built **password reset flow securely**
* Applied **input validation & error handling**
* Used **logging for monitoring & debugging**

---

## 🔮 Future Improvements

* Role & permission-based access (RBAC → PBAC)
* Email service integration (nodemailer)
* Pagination for user listing

---

## Author

Built as a backend learning project to understand **real-world authentication & authorization systems**.

---

## Final Note

This project demonstrates:

* Clean backend architecture
* Security best practices
* Real-world RBAC implementation

👉 Suitable for **internships and backend roles**

