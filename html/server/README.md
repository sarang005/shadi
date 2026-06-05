# Shadi Sampanna API

Production-grade Node.js REST API with JWT authentication, role-based authorization, and MongoDB.

## Tech Stack

- Node.js + Express.js
- MongoDB + Mongoose
- JWT (access + refresh tokens)
- bcrypt, express-validator, helmet, cors, morgan, rate limiting

## Quick Start

### Prerequisites

- Node.js 18+
- MongoDB running locally or a MongoDB Atlas URI

### Setup

```bash
cd server
npm install
cp .env.example .env   # if .env does not exist
npm run seed           # seed demo users
npm run dev            # http://localhost:3000
```

### Demo Credentials

| Role        | Email                    | Password      |
|-------------|--------------------------|---------------|
| User        | user@example.com         | Password@123  |
| Admin       | admin@example.com        | Password@123  |
| Super Admin | superadmin@example.com   | Password@123  |

## Environment Variables

See `.env.example` for all options. Required:

- `MONGODB_URI`
- `JWT_SECRET`
- `JWT_REFRESH_SECRET`

## API Base URL

```
http://localhost:3000/api
```

Matches frontend `VITE_API_BASE_URL=http://localhost:3000/api`.

## Response Format

**Success**

```json
{
  "success": true,
  "message": "Login successful",
  "data": { }
}
```

**Error**

```json
{
  "success": false,
  "message": "Something went wrong",
  "errors": []
}
```

Auth endpoints return `accessToken`, `refreshToken`, `token`, and `user` inside `data`. The frontend `authService` unwraps `data` automatically.

## Roles & Route Access

| Prefix              | Roles allowed              |
|---------------------|----------------------------|
| `/api/auth/*`       | Public (except `/me`)      |
| `/api/user/*`       | user, admin, superadmin    |
| `/api/admin/*`      | admin, superadmin          |
| `/api/superadmin/*` | superadmin only            |
| `/api/dashboard/*`  | user, admin, superadmin    |
| `/api/matches/*`    | user, admin, superadmin    |
| `/api/profile/*`    | user, admin, superadmin    |

## Auth Endpoints

| Method | Endpoint              | Description        |
|--------|-----------------------|--------------------|
| POST   | `/auth/register`      | Register user      |
| POST   | `/auth/login`         | Email/password login |
| POST   | `/auth/logout`        | Revoke refresh token |
| POST   | `/auth/refresh`       | Refresh access token |
| GET    | `/auth/me`            | Current user       |
| POST   | `/auth/otp/send`      | Send OTP           |
| POST   | `/auth/otp/verify`    | Verify OTP & login |

### Login Example

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"Password@123"}'
```

## Admin Endpoints

- `GET /api/admin/dashboard` — user statistics
- `GET /api/admin/users` — list users (pagination, search)
- `GET /api/admin/users/:id`
- `PUT /api/admin/users/:id`
- `PATCH /api/admin/users/:id/status` — `{ "isActive": true }`

## Superadmin Endpoints

- `GET /api/superadmin/analytics`
- `GET /api/superadmin/users`
- `GET /api/superadmin/admins`
- `POST /api/superadmin/admins` — create admin/user
- `PATCH /api/superadmin/users/:id/role`
- `PATCH /api/superadmin/users/:id/status`
- `DELETE /api/superadmin/users/:id`

## Frontend Integration

1. Set `VITE_API_BASE_URL=http://localhost:3000/api` in frontend `.env`
2. Start API: `npm run dev` (port 3000)
3. Start frontend: `npm run dev` (port 5173)
4. Login uses `POST /api/auth/login`; Redux stores `data.accessToken`, `data.refreshToken`, `data.user`
5. Axios interceptor sends `Authorization: Bearer <accessToken>`
6. On 401, call `POST /api/auth/refresh` with `{ refreshToken }`

## Architecture

```
src/
├── config/         # DB, env, logger
├── controllers/    # HTTP layer
├── services/       # Business logic
├── repositories/   # Data access
├── models/         # Mongoose schemas
├── routes/         # Express routers
├── middlewares/    # Auth, roles, errors, rate limit
├── validators/     # express-validator rules
├── utils/          # JWT, pagination, responses
└── seeders/        # Database seed
```

## Scripts

- `npm run dev` — development with nodemon
- `npm start` — production
- `npm run seed` — seed demo accounts
