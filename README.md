# BKJOBS

BKJOBS la frontend cho nen tang tim viec va tuyen dung, duoc xay dung voi `Next.js App Router`, `React`, `TypeScript` va `Tailwind CSS`. Du an hien uu tien kha nang demo giao dien nhanh, chay doc lap o local va co san mock data cho cac luong chinh nhu dang nhap, danh sach viec lam, dashboard nha tuyen dung va trang quan tri.

## Tong quan

- App chinh nam trong thu muc `frontend/`
- Kien truc route dung `app/`, phan giao dien tai su dung nam trong `src/screens/`
- Ho tro 2 che do:
  - `Demo mode`: mac dinh, khong can backend
  - `API mode`: bat khi muon ket noi backend that qua bien moi truong
- Su dung `AuthContext` va `JobsContext` de quan ly session, jobs, applications va state demo

## Cong nghe su dung

- `Next.js 16`
- `React 18`
- `TypeScript`
- `Tailwind CSS`
- `Radix UI`
- `TanStack Query`
- `React Hook Form`
- `Zod`

## Cau truc thu muc

```text
BKJOBS/
|-- README.md
|-- frontend/
|   |-- app/                 # Next.js App Router
|   |-- public/              # Tai nguyen tinh
|   |-- src/
|   |   |-- components/      # UI components va layout
|   |   |-- contexts/        # AuthContext, JobsContext
|   |   |-- lib/             # demo data, router adapter, API helpers
|   |   |-- screens/         # Man hinh giao dien duoc route goi lai
|   |   `-- hooks/
|   |-- package.json
|   `-- .env.example
`-- BKJOBS_test/             # Ban sao tham chieu, khong phai entry chinh
```

## Tinh nang hien co

- Trang chu gioi thieu viec lam noi bat
- Trang danh sach viec lam voi bo loc va tim kiem
- Trang chi tiet viec lam
- Dang nhap, dang ky va cap nhat thong tin ca nhan
- Dashboard nha tuyen dung de dang tin va quan ly ung vien
- Khu vuc admin de xem dashboard, jobs, users va lookups
- Trang thong tin bo sung: `about`, `contact`, `policy`, `not-found`

## Routes chinh

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

## Che do chay

### 1. Demo mode

Day la che do mac dinh hien tai.

- Khong can backend
- Doc du lieu demo tu `frontend/src/lib/demo.ts`
- Phu hop de demo giao dien, flow va responsive

### 2. API mode

App se goi backend that khi dat:

```env
NEXT_PUBLIC_ENABLE_API=true
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

Neu `NEXT_PUBLIC_ENABLE_API` khong bang `true`, project se tiep tuc chay bang mock/demo data.

## Cai dat va chay local

```bash
cd frontend
npm install
npm run dev
```

Mac dinh app chay tai:

```text
http://localhost:3000
```

## Bien moi truong

File mau:

```bash
frontend/.env.example
```

Gia tri de nghi khi can ket noi backend:

```env
NEXT_PUBLIC_ENABLE_API=true
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

Neu ban chi can demo frontend, co the bo qua file `.env.local`.

## Scripts

Chay trong thu muc `frontend/`:

```bash
npm run dev
npm run build
npm run start
npm run lint
```

Y nghia:

- `dev`: chay moi truong phat trien
- `build`: build production
- `start`: chay ban build production
- `lint`: kiem tra lint cho JS/TS/TSX

## Cac file quan trong

- `frontend/app/layout.tsx`: metadata, layout goc va nap CSS global
- `frontend/app/providers.tsx`: Query Client, auth, jobs, tooltip, toaster
- `frontend/src/lib/demo.ts`: toan bo mock data va co DEMO_MODE
- `frontend/src/lib/router.tsx`: adapter dieu huong de map logic cu sang Next.js
- `frontend/src/lib/jobfinder.ts`: helper goi API cho jobs va applications
- `frontend/src/contexts/AuthContext.tsx`: dang nhap, dang ky, refresh token, session
- `frontend/src/contexts/JobsContext.tsx`: quan ly jobs, ung tuyen va fallback demo/local
- `frontend/src/screens/`: cac man hinh UI duoc route trong `app/` su dung lai
- `frontend/src/index.css`: theme, utility classes, animation va global styles

## Du lieu demo

Project da co san cac tap du lieu de mo phong:

- user va admin demo
- job forms demo
- companies, currencies, work formats, provinces/districts/wards
- status lookups va danh sach nguoi dung demo

Nguon du lieu nam tai:

```text
frontend/src/lib/demo.ts
```

## Ghi chu phat trien

- App dang dung `Next.js App Router`, khong con la Vite app
- Nhieu man hinh trong `src/screens/` duoc boc lai boi file route trong `app/`
- `frontend/next.config.js` da duoc cau hinh toi uu CSS, image formats va production headers
- Project hien phu hop nhat cho viec tiep tuc polish giao dien, responsive va noi backend that

## Luu y

- Thu muc `BKJOBS_test/` hien co trong repo nhung khong phai noi can chay app chinh
- README nay mo ta hien trang cua project tai `frontend/`
