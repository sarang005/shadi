# Shadi Sampanna — React Application

Production-grade React conversion of the Shadi Sampanna matrimony HTML designs.

## Tech Stack

- React 19 + Vite 6
- Redux Toolkit + React Redux
- React Router DOM 7
- Axios (centralized instance + interceptors)
- SCSS (pixel-perfect styles from original HTML)

## Quick Start

### 1. Backend API

```bash
cd server
npm install
npm run seed
npm run dev
```

API runs at `http://localhost:3000/api`

### 2. Frontend

```bash
npm install
cp .env.example .env
npm run dev
```

Open `http://localhost:5173`

### Demo logins (requires backend running)

| Role | Email | Password |
|------|-------|----------|
| User | user@example.com | Password@123 |
| Admin | admin@example.com | Password@123 |
| Super Admin | superadmin@example.com | Password@123 |

Set `VITE_USE_MOCK_AUTH=true` in `.env` only for offline demo without the API.

## Environment

Copy `.env.example` to `.env`:

```
VITE_API_BASE_URL=http://localhost:3000/api
VITE_API_TIMEOUT=30000
```

## Routes

| Path | Page | Access |
|------|------|--------|
| `/signin` | Sign In | Public |
| `/profile-registration` | Create Profile | Public |
| `/dashboard` | Dashboard | User |
| `/matches` | Find Matches | User |
| `/profile/:id` | Profile View | User |
| `/edit-profile` | Edit Profile | User |
| `/admin/dashboard` | Admin Dashboard | Admin, Superadmin |
| `/admin/users` | Manage Users | Admin, Superadmin |
| `/superadmin/dashboard` | System Analytics | Superadmin |
| `/superadmin/users` | All Users | Superadmin |
| `/superadmin/admins` | Manage Admins | Superadmin |

## Architecture

```
src/
├── app/store.js              # Redux store + DevTools
├── routes/AppRoutes.jsx      # Lazy-loaded routes
├── layouts/                  # DashboardLayout, Sidebar, Topbar
├── pages/                    # Page components + SCSS
├── features/                 # auth, dashboard, matches, profile
│   └── */                    # slice, thunk, service per feature
├── services/                 # axiosInstance, apiEndpoints
├── hooks/                    # useSidebar, useOtpInput, useResendTimer
├── constants/                # routes, mockData, storage keys
└── styles/                   # global SCSS + variables
```

**Data flow:** Component → dispatch(thunk) → service → axios → API

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run preview` — preview production build
