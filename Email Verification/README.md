# Authentication System with Email Verification & OTP (2FA)

A secure backend authentication system built using **Node.js**, **Express**, and **MongoDB**, featuring:

* Email verification via token
* OTP-based 2FA login
* JWT authentication
* Secure password hashing
* Rate limiting & security mechanisms
* Structured logging & error handling

---

## Features

### Authentication

* User Registration
* Secure Password Hashing (bcrypt)
* Login with Email & Password

### Email Verification

* Token-based email verification
* Token expiry handling
* Resend verification with cooldown

### OTP (2FA)

* OTP sent during login
* Hashed OTP storage
* Expiry & attempt limits
* Temporary blocking after multiple failed attempts

### Authorization

* JWT-based authentication
* Protected routes using middleware

### Security Features

* OTP attempt limiting
* Account blocking (temporary)
* Token expiration
* Input validation
* Error handling middleware

### Logging

* Structured logging using Winston
* Request logs
* Error logs with stack trace

---

## Tech Stack

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT (jsonwebtoken)
* Bcrypt
* Nodemailer / Resend (for email)
* Winston (logging)

---

## Project Structure

```
├── Config/
├── Controllers/
├── Middleware/
├── Models/
├── Routes/
├── Services/
├── Utils/
├── logs/
├── server.js
```

---

##  API Endpoints

###  Auth

| Method | Route                        | Description             |
| ------ | ---------------------------- | ----------------------- |
| POST   | /api/auth/register           | Register user           |
| POST   | /api/auth/login              | Login (send OTP)        |
| POST   | /api/auth/verify-otp         | Verify OTP              |
| POST   | /api/auth/verifyemail        | Send verification email |

---

## Authentication Flow

### Email Verification

1. User registers
2. Verification email is sent
3. User clicks link
4. Email gets verified

---

### Login + OTP Flow

1. User logs in with email & password
2. OTP is sent to email
3. User enters OTP
4. OTP verified
5. JWT token is issued
6. User can access protected routes

---

## Testing

Use Postman:

### Step 1:

```
POST /login
```

### Step 2:

```
POST /verify-otp
```

### Step 3:

Add header:

```
Authorization: Bearer <token>
```

### Step 4:

```
GET /profile
```

---

## Future Improvements

* Refresh Token system
* Role-based access control (RBAC)
* Rate limiting (per IP/user)
* Email templates (HTML styling)
* Deployment (Docker + Cloud)
* Frontend integration

---

## Learnings

This project demonstrates:

* Secure authentication design
* Token-based verification systems
* OTP security handling
* Middleware architecture
* Service-controller separation
* Logging & error management

---
