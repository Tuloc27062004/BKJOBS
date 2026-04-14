# BKJOBS

BKJOBS is the frontend for a job search and recruitment platform, built with `Next.js App Router`, `React`, `TypeScript`, and `Tailwind CSS`. The project currently prioritizes fast UI demos, standalone local development, and ready-to-use mock data for core flows such as login, job listings, the employer dashboard, and the admin area.

## Overview

- The main app is located in the `frontend/` directory
- The route architecture uses `app/`, while reusable UI screens are placed in `src/screens/`
- Supports 2 modes:
  - `Demo mode`: default, no backend required
  - `API mode`: enabled when connecting to a real backend through environment variables
- Uses `AuthContext` and `JobsContext` to manage sessions, jobs, applications, and demo state

## Tech Stack

- `Next.js 16`
- `React 18`
- `TypeScript`
- `Tailwind CSS`
- `Radix UI`
- `TanStack Query`
- `React Hook Form`
- `Zod`

## Current Features

- Homepage showcasing featured jobs
- Job listing page with filters and search
- Job detail page
- Login, registration, and profile update flows
- Employer dashboard for posting jobs and managing candidates
- Admin area for dashboard, jobs, users, and lookup management
- Additional info pages: `about`, `contact`, `policy`, `not-found`

## Main Routes

### Public

- `/`
- `/jobs`
- `/jobs/[id]`
- `/login`
- `/register`
- `/about`
- `/contact`
- `/policy`

### User

- `/profile`

### Employer

- `/employer/dashboard`
- `/employer/post-job`

### Admin

- `/admin/dashboard`
- `/admin/jobs`
- `/admin/users`
- `/admin/lookups`

## Runtime Modes

### 1. Demo mode

This is the current default mode.

- No backend required
- Reads demo data from `frontend/src/lib/demo.ts`
- Suitable for UI demos, flow walkthroughs, and responsive testing

### 2. API mode

The app will call the real backend when the following values are set:

```env
NEXT_PUBLIC_ENABLE_API=true
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

If `NEXT_PUBLIC_ENABLE_API` is not set to `true`, the project will continue running with mock/demo data.

## Installation and Local Development

```bash
cd frontend
npm install
npm run dev
```

By default, the app runs at:

```text
http://localhost:3000
```

## Environment Variables

Example file:

```bash
frontend/.env.example
```

Recommended values when connecting to a backend:

```env
NEXT_PUBLIC_ENABLE_API=true
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

If you only need to demo the frontend, you can skip creating `.env.local`.

## Scripts

Run inside the `frontend/` directory:

```bash
npm run dev
npm run build
npm run start
npm run lint
```

Meaning:

- `dev`: run the development environment
- `build`: create a production build
- `start`: run the production build
- `lint`: run lint checks for JS/TS/TSX

## Important Files

- `frontend/app/layout.tsx`: metadata, root layout, and global CSS loading
- `frontend/app/providers.tsx`: Query Client, auth, jobs, tooltip, and toaster providers
- `frontend/src/lib/demo.ts`: all mock data and the `DEMO_MODE` flag
- `frontend/src/lib/router.tsx`: navigation adapter that maps previous logic to Next.js
- `frontend/src/lib/jobfinder.ts`: API helpers for jobs and applications
- `frontend/src/contexts/AuthContext.tsx`: login, registration, refresh token, and session handling
- `frontend/src/contexts/JobsContext.tsx`: manages jobs, applications, and demo/local fallback behavior
- `frontend/src/screens/`: reusable UI screens consumed by routes in `app/`
- `frontend/src/index.css`: theme, utility classes, animations, and global styles

## Demo Data

The project already includes datasets to simulate:

- demo users and admin accounts
- demo job forms
- companies, currencies, work formats, provinces/districts/wards
- status lookups and demo user lists

Data source:

```text
frontend/src/lib/demo.ts
```

## Development Notes

- The app is using `Next.js App Router`, no longer a Vite app
- Many screens in `src/screens/` are wrapped by route files in `app/`
- `frontend/next.config.js` is configured for CSS optimization, image formats, and production headers
- The project is currently best suited for continued UI polishing, responsive improvements, and real backend integration

## Notes

- The `BKJOBS_test/` directory currently exists in the repo but is not where the main app should be run
- This README describes the current state of the project in `frontend/`
