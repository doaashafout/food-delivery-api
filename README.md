# 🍕 Food API — Node.js Express RESTful API

A production-ready RESTful API for a food delivery application built with **Node.js**, **Express**, **MySQL**, and **Sequelize**. Implements advanced **Express Middleware Mastery** including modular routing, custom middleware, rate limiting, validation, authentication, authorization, and centralized error handling.

---

## 📋 Features

- **Modular Routing** — Each resource has its own router module
- **Nested Routers** — Hierarchical routing via a main API router
- **Authentication** — JWT-based auth with `authMiddleware`
- **Authorization** — Role-based access control (`admin`, `clinet`)
- **Validation** — Request body validation using **Joi** schemas
- **Logging** — Custom request/response logger middleware
- **Rate Limiting** — 3 implementations:
  - `express-rate-limit` (global API + auth-specific)
  - Custom in-memory rate limiter
  - Redis-backed scalable rate limiter (with auto-fallback)
- **Middleware Factory** — Dynamic configurable middleware
- **Error Handling** — Centralized 4-parameter error handler
- **Single Responsibility** — Each middleware does one thing
- **Database** — MySQL with Sequelize ORM
- **Security** — bcrypt password hashing, CORS enabled

---

## 🛠 Tech Stack

| Technology | Purpose |
|-----------|---------|
| Node.js | Runtime |
| Express.js | Web framework |
| MySQL | Database |
| Sequelize | ORM |
| JWT (jsonwebtoken) | Authentication |
| bcryptjs | Password hashing |
| Joi | Request validation |
| express-rate-limit | Rate limiting |
| ioredis | Redis client (scalable rate limiting) |
| morgan | HTTP request logger |

---

## 📁 Project Structure

```
├── config/
│   └── db.js                  # Sequelize + MySQL connection
├── controllers/
│   ├── authControllers.js      # Register / Login
│   ├── categoryController.js   # Category CRUD
│   ├── foodController.js       # Food CRUD + Orders
│   ├── resturantController.js  # Resturant CRUD
│   └── userController.js       # User profile management
├── middlewares/
│   ├── adminMiddleware.js       # Role-based authorization
│   ├── authMiddleware.js        # JWT authentication
│   ├── errorHandler.js          # Centralized error handling
│   ├── loggerMiddleware.js      # Custom request logger
│   ├── middlewareFactory.js      # Dynamic middleware factory
│   ├── rateLimiter.js           # Rate limiters (3 types)
│   └── validationMiddleware.js  # Joi validation schemas
├── models/
│   ├── categoryModel.js         # Category model
│   ├── foodModal.js             # Food model (belongs to Resturant)
│   ├── orderModel.js            # Order model (belongs to User)
│   ├── resturantModel.js        # Resturant model
│   └── userModel.js             # User model
├── routes/
│   ├── authRoutes.js            # Auth endpoints
│   ├── catgeoryRoutes.js        # Category endpoints
│   ├── foodRoutes.js            # Food + Order endpoints
│   ├── index.js                 # Nested router (mounts all)
│   ├── resturantRoutes.js       # Resturant endpoints
│   └── userRoutes.js            # User endpoints
├── .env                         # Environment variables
├── .gitignore                   # Git ignore file
├── package.json                 # Dependencies
├── seed.js                      # Database seed script
├── server.js                    # Entry point
└── test-all.js                  # Automated test script
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v16+
- MySQL (local or remote)
- npm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/food-api.git
cd food-api

# 2. Install dependencies
npm install

# 3. Create the database
mysql -u root -e "CREATE DATABASE IF NOT EXISTS food_app CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# 4. Configure environment
cp .env.example .env
# Edit .env with your credentials
```

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
JWT_SECRET=your_secret_key_here
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=food_app
```

### Run the App

```bash
# Development (with nodemon)
npm run server

# Production
node server.js
```

Server runs on `http://localhost:5000`

### Seed Sample Data

```bash
node seed.js
```

This creates:
- **Admin** — `admin@food.com` / `123456`
- **User** — `doaa@test.com` / `123456`
- 2 Resturants, 2 Categories, 4 Foods

---

## 📬 API Endpoints

### Auth

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/v1/auth/register` | No | Register new user |
| POST | `/api/v1/auth/login` | No | Login, returns JWT |

### User

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/v1/user/getUser` | Yes | Get current user profile |
| PUT | `/api/v1/user/updateUser` | Yes | Update profile |
| POST | `/api/v1/user/updatePassword` | Yes | Change password |
| POST | `/api/v1/user/resetPassword` | Yes | Reset password |
| DELETE | `/api/v1/user/deleteUser/:id` | Yes | Delete account |

### Resturant

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/v1/resturant/getAll` | No | Get all resturants |
| GET | `/api/v1/resturant/get/:id` | No | Get resturant by ID |
| POST | `/api/v1/resturant/create` | Yes | Create resturant |
| DELETE | `/api/v1/resturant/delete/:id` | Yes | Delete resturant |

### Category

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/v1/category/getAll` | No | Get all categories |
| POST | `/api/v1/category/create` | Yes | Create category |
| PUT | `/api/v1/category/update/:id` | Yes | Update category |
| DELETE | `/api/v1/category/delete/:id` | Yes | Delete category |

### Food

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/v1/food/getAll` | Yes | Get all foods |
| GET | `/api/v1/food/get/:id` | No | Get food by ID |
| GET | `/api/v1/food/getByResturant/:id` | No | Get foods by resturant |
| POST | `/api/v1/food/create` | Yes | Create food |
| PUT | `/api/v1/food/update/:id` | Yes | Update food |
| DELETE | `/api/v1/food/delete/:id` | Yes | Delete food |

### Order

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/v1/food/placeorder` | Yes | Place an order |
| POST | `/api/v1/food/orderStatus/:id` | Admin | Update order status |

### Auth Header

For protected endpoints, add:

```
Authorization: Bearer <your_jwt_token>
```

---

## 🔧 Middleware Concepts Implemented

| Concept | File | Description |
|---------|------|-------------|
| **Modular Routing** | `routes/*.js` | Each resource in its own router file |
| **Nested Routers** | `routes/index.js` | Main router mounts all sub-routers |
| **Logger Middleware** | `middlewares/loggerMiddleware.js` | Logs method, URL, status, duration |
| **Auth Middleware** | `middlewares/authMiddleware.js` | JWT token verification |
| **Authorization Middleware** | `middlewares/adminMiddleware.js` | Role-based access (admin) |
| **Validation Middleware** | `middlewares/validationMiddleware.js` | Joi schema validation |
| **Middleware Factory** | `middlewares/middlewareFactory.js` | Configurable dynamic middleware |
| **Error Handler** | `middlewares/errorHandler.js` | Centralized 4-param error handler |
| **Rate Limiter (library)** | `middlewares/rateLimiter.js` | `express-rate-limit` (100 req/min) |
| **Auth Rate Limiter** | `middlewares/rateLimiter.js` | `express-rate-limit` (20 req/10min) |
| **Custom Rate Limiter** | `middlewares/rateLimiter.js` | In-memory IP tracking |
| **Redis Rate Limiter** | `middlewares/rateLimiter.js` | Redis-based (falls back to custom) |

### Request Pipeline

```
Request → Logger → Rate Limiter → Auth → Authorization → Validation → Factory → Route → Response → Error Handler
```

---

## 🧪 Testing

```bash
# Start the server
npm run server

# In another terminal, run the test script
node test-all.js
```

Or test manually with Postman — import the endpoints from the table above.

---

## 🐳 Redis (Optional)

For the Redis rate limiter to work in scalable mode, install and start Redis:

```bash
# Windows (WSL)
wsl sudo apt install redis-server
wsl redis-server

# The rate limiter will auto-detect Redis and use it;
# otherwise it falls back to the in-memory custom limiter.
```

---

## 📤 Deploy to GitHub

```bash
# 1. Initialize git
git init

# 2. Add all files
git add .

# 3. Commit
git commit -m "Initial commit: Food API with Express Middleware Mastery"

# 4. Create a repo on GitHub (without README), then:
git remote add origin https://github.com/YOUR_USERNAME/food-api.git

# 5. Push
git branch -M main
git push -u origin main
```

> ⚠️ Ensure `.env` is in `.gitignore` before pushing — it contains secrets.

---

## 📄 License

ISC

---

## 👩‍💻 Author

Doaa Raed Shafout
