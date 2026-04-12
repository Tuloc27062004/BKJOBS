export const DEMO_MODE = process.env.NEXT_PUBLIC_ENABLE_API !== "true";

export const DEMO_GENDERS = [
  { code: "MALE", name: "Nam" },
  { code: "FEMALE", name: "Nữ" },
  { code: "OTHER", name: "Khác" },
];

export const DEMO_WORK_FORMATS = [
  { code: "onsite", name: "On-site" },
  { code: "remote", name: "Remote" },
  { code: "hybrid", name: "Hybrid" },
];

export const DEMO_JOB_TYPES = [
  { code: "full-time", name: "Toàn thời gian" },
  { code: "part-time", name: "Bán thời gian" },
  { code: "intern", name: "Thực tập" },
];

export const DEMO_PROVINCES = [
  { id: "hcm", name: "TP. Hồ Chí Minh" },
  { id: "hn", name: "Hà Nội" },
  { id: "dn", name: "Đà Nẵng" },
];

export const DEMO_DISTRICTS = {
  hcm: [
    { id: "q1", name: "Quận 1", province: "hcm" },
    { id: "q7", name: "Quận 7", province: "hcm" },
  ],
  hn: [
    { id: "caugiay", name: "Cầu Giấy", province: "hn" },
    { id: "hadong", name: "Hà Đông", province: "hn" },
  ],
  dn: [{ id: "haichau", name: "Hải Châu", province: "dn" }],
} as const;

export const DEMO_WARDS = {
  q1: [{ id: "benthanh", name: "Bến Thành", district: "q1" }],
  q7: [{ id: "tanphong", name: "Tân Phong", district: "q7" }],
  caugiay: [{ id: "dichvong", name: "Dịch Vọng", district: "caugiay" }],
  hadong: [{ id: "molao", name: "Mỗ Lao", district: "hadong" }],
  haichau: [{ id: "thachthang", name: "Thạch Thang", district: "haichau" }],
} as const;

export const DEMO_COMPANIES = [
  { code: "bkjobs", name: "BKJOBS Studio" },
  { code: "techcorp", name: "TechCorp Vietnam" },
  { code: "orangewave", name: "OrangeWave Digital" },
];

export const DEMO_CURRENCIES = [
  { code: "vnd", name: "VND" },
  { code: "usd", name: "USD" },
];

export const DEMO_JOB_FORMS = [
  {
    id: 1,
    title: "Frontend Developer React/Next.js",
    verified_company: "bkjobs",
    display_verified_company: "BKJOBS Studio",
    province: "hcm",
    province_name: "TP. Hồ Chí Minh",
    district: "q7",
    district_name: "Quận 7",
    ward: "tanphong",
    ward_name: "Tân Phong",
    address: "Khu đô thị Phú Mỹ Hưng",
    number_of_positions: 3,
    salary_from: 18000000,
    salary_to: 28000000,
    salary_currency: "vnd",
    display_salary_currency: "VND",
    salary_currency_symbol: "₫",
    work_format: "hybrid",
    display_work_format: "Hybrid",
    job_type: "full-time",
    display_job_type: "Toàn thời gian",
    description: "Tham gia xây dựng giao diện hiện đại cho nền tảng tuyển dụng BKJOBS.",
    responsibilities: "Phát triển UI bằng React/Next.js\nPhối hợp với designer để hoàn thiện trải nghiệm người dùng\nTối ưu hiệu năng và responsive",
    requirements: "Có kinh nghiệm React hoặc Next.js\nHiểu Tailwind CSS\nCó gu thẩm mỹ tốt",
    required_experience: "Tối thiểu 1 năm kinh nghiệm frontend",
    benefits: "Làm việc linh hoạt\nThưởng theo hiệu quả\nMôi trường trẻ",
    contact_email: "hello@bkjobs.vn",
    application_email: "jobs@bkjobs.vn",
    application_url: "https://bkjobs.vn/apply/frontend",
    status: "approved",
    is_active: true,
    created_at: new Date().toISOString(),
    created_by: "demo_employer",
  },
  {
    id: 2,
    title: "UI/UX Designer",
    verified_company: "orangewave",
    display_verified_company: "OrangeWave Digital",
    province: "hn",
    province_name: "Hà Nội",
    district: "caugiay",
    district_name: "Cầu Giấy",
    ward: "dichvong",
    ward_name: "Dịch Vọng",
    address: "Duy Tân",
    number_of_positions: 2,
    salary_from: 15000000,
    salary_to: 22000000,
    salary_currency: "vnd",
    display_salary_currency: "VND",
    salary_currency_symbol: "₫",
    work_format: "onsite",
    display_work_format: "On-site",
    job_type: "full-time",
    display_job_type: "Toàn thời gian",
    description: "Thiết kế trải nghiệm sản phẩm digital với định hướng trẻ trung, rõ ràng.",
    responsibilities: "Thiết kế wireframe và UI kit\nLàm việc cùng frontend developer\nNghiên cứu hành vi người dùng",
    requirements: "Thành thạo Figma\nCó portfolio tốt\nBiết tư duy sản phẩm",
    required_experience: "1-2 năm kinh nghiệm",
    benefits: "Review lương định kỳ\nKhông gian làm việc đẹp\nTeam sáng tạo",
    contact_email: "talent@orangewave.vn",
    status: "approved",
    is_active: true,
    created_at: new Date(Date.now() - 86400000).toISOString(),
    created_by: "demo_employer",
  },
  {
    id: 3,
    title: "Backend Intern",
    verified_company: "techcorp",
    display_verified_company: "TechCorp Vietnam",
    province: "dn",
    province_name: "Đà Nẵng",
    district: "haichau",
    district_name: "Hải Châu",
    ward: "thachthang",
    ward_name: "Thạch Thang",
    address: "Trần Phú",
    number_of_positions: 4,
    salary_from: 5000000,
    salary_to: 8000000,
    salary_currency: "vnd",
    display_salary_currency: "VND",
    salary_currency_symbol: "₫",
    work_format: "remote",
    display_work_format: "Remote",
    job_type: "intern",
    display_job_type: "Thực tập",
    description: "Vị trí thực tập phù hợp cho sinh viên muốn trải nghiệm quy trình phát triển sản phẩm thực tế.",
    responsibilities: "Hỗ trợ xây API demo\nViết tài liệu kỹ thuật cơ bản\nFix bug nhỏ",
    requirements: "Biết Node.js hoặc Python\nHam học hỏi\nCó tinh thần teamwork",
    required_experience: "Không yêu cầu",
    benefits: "Mentor 1-1\nHỗ trợ dấu mộc thực tập\nCó cơ hội lên chính thức",
    contact_email: "intern@techcorp.vn",
    status: "approved",
    is_active: true,
    created_at: new Date(Date.now() - 172800000).toISOString(),
    created_by: "demo_employer",
  },
];

export const DEMO_USERS = {
  user: {
    id: "demo-user",
    username: "demo_user",
    email: "user@demo.local",
    first_name: "Demo",
    last_name: "User",
    name: "Demo User",
    role: "user",
    status: "ACTIVE",
    cv: "demo-cv.pdf",
    cv_filename: "demo-cv.pdf",
  },
  admin: {
    id: "demo-admin",
    username: "demo_admin",
    email: "admin@demo.local",
    first_name: "Demo",
    last_name: "Admin",
    name: "Demo Admin",
    role: "admin",
    status: "ACTIVE",
  },
};

export const DEMO_STATUS_LOOKUPS = [
  { code: "ACTIVE", name: "Hoạt động", color: "bg-green-100 text-green-700", icon: "CheckCircle" },
  { code: "PENDING_VERIFICATION", name: "Chờ xác minh", color: "bg-yellow-100 text-yellow-700", icon: "Clock" },
  { code: "LOCKED", name: "Khoá", color: "bg-orange-100 text-orange-700", icon: "Lock" },
  { code: "INACTIVE", name: "Vô hiệu hoá", color: "bg-gray-100 text-gray-700", icon: "ShieldX" },
];

export const DEMO_USER_LIST = [
  {
    id: 1,
    username: "demo_admin",
    email: "admin@demo.local",
    first_name: "Demo",
    last_name: "Admin",
    role: "ADMIN",
    status: "ACTIVE",
    is_active: true,
  },
  {
    id: 2,
    username: "demo_user",
    email: "user@demo.local",
    first_name: "Demo",
    last_name: "User",
    role: "USER",
    status: "ACTIVE",
    is_active: true,
  },
  {
    id: 3,
    username: "pending_user",
    email: "pending@demo.local",
    first_name: "Pending",
    last_name: "User",
    role: "USER",
    status: "PENDING_VERIFICATION",
    is_active: true,
  },
];
