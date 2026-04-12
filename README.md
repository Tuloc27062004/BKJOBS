# BKJOBS Frontend

BKJOBS là frontend tuyển dụng được xây dựng bằng `Next.js`, tập trung vào giao diện và trải nghiệm demo. Project hiện có thể chạy độc lập ở chế độ frontend-only mà không cần backend.

## Mục tiêu

- Xây dựng giao diện web tuyển dụng hiện đại
- Demo luồng người dùng mà không phụ thuộc API thật
- Dễ mở rộng lại về chế độ có backend khi cần

## Stack

- Next.js 16
- React 18
- TypeScript
- Tailwind CSS
- Radix UI
- TanStack Query
## Chế độ chạy

### 1. Demo frontend-only

Đây là chế độ mặc định hiện tại.

- Không cần backend
- Dùng mock data cho auth, jobs, genders, admin, employer
- Phù hợp để làm UI/UX, demo, thuyết trình

Chạy:

```bash
cd frontend
npm install
npm run dev
```

Mở tại:

```text
http://localhost:3000
```

### 2. Kết nối API thật

Nếu muốn bật lại chế độ dùng backend:

Tạo `frontend/.env.local`

```bash
NEXT_PUBLIC_ENABLE_API=true
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

Nếu không đặt `NEXT_PUBLIC_ENABLE_API=true`, app sẽ tiếp tục chạy ở demo mode.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

Ý nghĩa:

- `dev`: chạy môi trường phát triển
- `build`: build production
- `start`: chạy production server
- `lint`: kiểm tra code style

## Routes

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

## Dữ liệu demo

Project đang có mock data sẵn trong:

- `frontend/src/lib/demo.ts`

Bao gồm:

- demo users
- demo jobs
- demo genders
- demo companies
- demo currencies
- demo admin/employer data

## Các file quan trọng

- `frontend/app/layout.tsx`: root layout
- `frontend/app/providers.tsx`: provider wrapper
- `frontend/src/lib/demo.ts`: dữ liệu demo
- `frontend/src/lib/router.tsx`: adapter điều hướng dùng cho Next.js
- `frontend/src/contexts/AuthContext.tsx`: auth mock + auth state
- `frontend/src/contexts/JobsContext.tsx`: jobs/applications mock state
- `frontend/src/index.css`: theme, animation, global styles

## Ghi chú phát triển

- Project đã bỏ Vite và chuyển sang Next.js App Router
- Các màn hình UI nằm trong `src/screens/`
- Route thật được map trong `app/`
- Branding hiện tại là `BKJOBS`
- App ưu tiên chạy được ở local mà không cần backend

## Trạng thái hiện tại

- Frontend build được thành công
- Có thể demo không cần API
- Phù hợp để tiếp tục làm giao diện, animation, responsive và polishing

