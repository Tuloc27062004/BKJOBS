import { useState, useEffect } from 'react';
import { useNavigate, Link } from '@/lib/router';
import { useAuth, API_BASE } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Briefcase, Eye, EyeOff, CalendarIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format, parse } from 'date-fns';
import { vi } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { DEMO_GENDERS, DEMO_MODE } from '@/lib/demo';

const FALLBACK_GENDERS = DEMO_GENDERS;

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    dob: '',  // format: yyyy-MM-dd
    gender: '' as string | '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [genders, setGenders] = useState<Array<{ code: string; name: string }>>([]); 

  // Load gender options from backend so codes are authoritative
  useEffect(() => {
    if (DEMO_MODE) {
      setGenders(FALLBACK_GENDERS);
      return;
    }

    let mounted = true;
    fetch(`${API_BASE}/api/users/genders/`)
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;
        if (Array.isArray(data)) {
          const normalized = data
            .filter((g: any) => g?.is_active !== false)
            .map((g: any) => ({ code: g.code, name: g.name }))
            .filter((g: { code?: string; name?: string }) => g.code && g.name);

          setGenders(normalized.length > 0 ? normalized : FALLBACK_GENDERS);
        } else {
          setGenders(FALLBACK_GENDERS);
        }
      })
      .catch(() => {
        if (mounted) setGenders(FALLBACK_GENDERS);
      });
    return () => { mounted = false; };
  }, []);

  // Helper: lấy tên giới tính từ code
  const getGenderName = (code: string) => {
    const g = genders.find(g => g.code === code);
    return g?.name || code;
  };  // Giới hạn năm sinh - phải đủ 18 tuổi
  const MAX_YEAR = new Date().getFullYear() - 18;

  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);

  const [loading, setLoading] = useState(false);

  // Cho phép CHỈ chữ cái (mọi ngôn ngữ) và khoảng trắng – không số, không ký tự đặc biệt
  const NAME_REGEX = /^[\p{L}\s]+$/u;

  // Simple, permissive email validation (no domain whitelist)
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;

  // Điện thoại đúng 10 chữ số
  const PHONE_REGEX = /^\d{10}$/;

  const validateRegister = () => {
    const name = formData.name.trim();
    const email = formData.email.trim();
    const phone = formData.phone.trim();

    if (!NAME_REGEX.test(name)) {
      toast({
        title: "Họ và tên không hợp lệ",
        description: "Chỉ cho phép chữ cái và khoảng trắng (không số, không ký tự đặc biệt).",
        variant: "destructive",
      });
      return false;
    }

    if (!EMAIL_REGEX.test(email)) {
      toast({
        title: "Email không hợp lệ",
        description: "Chỉ chấp nhận các domain: gmail, yahoo, outlook/hotmail/live, icloud, proton…",
        variant: "destructive",
      });
      return false;
    }

    if (!PHONE_REGEX.test(phone)) {
      toast({
        title: "Số điện thoại không hợp lệ",
        description: "Số điện thoại phải gồm đúng 10 chữ số.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateRegister()) return;

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Lỗi",
        description: "Mật khẩu xác nhận không khớp",
        variant: "destructive",
      });
      return;
    }

    if (!formData.dob) {
      toast({ title: "Lỗi", description: "Vui lòng chọn ngày sinh", variant: "destructive" });
      return;
    }
    const dobAsDate = parse(formData.dob, 'yyyy-MM-dd', new Date());
    if (dobAsDate.getFullYear() > MAX_YEAR) {
      toast({ title: "Lỗi", description: `Bạn phải đủ 18 tuổi (sinh năm ${MAX_YEAR} trở về trước)`, variant: "destructive" });
      return;
    }

    try {
      setLoading(true);

      const success = await register({
        username: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password,
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        gender: formData.gender, // pass backend gender code (e.g. 'MALE')
        dob: formData.dob,
      });

      if (success) {
        toast({
          title: "Đăng ký thành công!",
          description: "Chào mừng bạn đến với BKJOBS",
        });
        navigate('/');
      } else {
        toast({
          title: "Đăng ký thất bại",
          description: "Email đã được sử dụng",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({ title: "Lỗi không mong muốn", description: "Vui lòng thử lại sau", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-10">
      <div className="pointer-events-none absolute inset-0 bg-orbital" />
      <div className="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-primary/15 blur-3xl animate-float" />
      <div className="pointer-events-none absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-secondary/60 blur-3xl animate-float-delayed" />
      <Card className="animate-fade-up relative z-10 w-full max-w-md border-white/40 bg-white/85 shadow-2xl backdrop-blur-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Link
              to="/"
              aria-label="Về trang chủ BKJOBS"
              className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-hero
               shadow-lg hover:shadow-xl focus-visible:outline-none
               focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
            >
              <Briefcase className="h-7 w-7 text-white" aria-hidden="true" />
            </Link>
          </div>

          <CardTitle className="text-2xl">Đăng ký tài khoản</CardTitle>
          <CardDescription>
            Tạo tài khoản BKJOBS để bắt đầu tìm việc hoặc tuyển dụng
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="space-y-2">
              <Label htmlFor="name">Họ và tên</Label>
              <Input
                id="name"
                placeholder="Họ và tên"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                inputMode="text"
                autoComplete="name"
                className="text-slate-900 placeholder:text-slate-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Tên đăng nhập</Label>
              <Input
                id="username"
                placeholder="Tên đăng nhập của bạn"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
                inputMode="text"
                autoComplete="username"
                className="text-slate-900 placeholder:text-slate-400"
              />
            </div>

            {/* Ngày sinh + Giới tính */}
            <div className="grid gap-4 md:grid-cols-2">
              {/* Ngày sinh */}
              <div className="space-y-2">
                <Label>Ngày sinh</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.dob && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.dob ? format(parse(formData.dob, 'yyyy-MM-dd', new Date()), 'dd/MM/yyyy') : 'Chọn ngày sinh'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.dob ? parse(formData.dob, 'yyyy-MM-dd', new Date()) : undefined}
                      onSelect={(date) => setFormData({ ...formData, dob: date ? format(date, 'yyyy-MM-dd') : '' })}
                      locale={vi}
                      defaultMonth={formData.dob ? parse(formData.dob, 'yyyy-MM-dd', new Date()) : new Date(new Date().getFullYear() - 22, 0)}
                      captionLayout="dropdown-buttons"
                      fromYear={1920}
                      toYear={MAX_YEAR}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Giới tính */}
              <div className="space-y-2">
                <Label>Giới tính</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => setFormData({ ...formData, gender: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn giới tính" />
                  </SelectTrigger>
                  <SelectContent>
                    {genders.map((g) => (
                      <SelectItem key={g.code} value={g.code}>
                        {getGenderName(g.code)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input
                id="phone"
                type="tel"
                inputMode="tel"
                pattern="^[0-9+\\-\\s]{8,15}$"
                placeholder="Số điện thoại liên hệ"
                value={formData.phone}
                onChange={(e) => {
                  // chỉ cho phép số, cắt còn 10 ký tự
                  const v = e.target.value.replace(/\D/g, '').slice(0, 10);
                  setFormData({ ...formData, phone: v });
                }}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Email thường dùng của bạn"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPw ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  minLength={6}
                  className="pr-10 text-slate-900 placeholder:text-slate-400"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute inset-y-0 right-2 flex items-center text-slate-500 hover:text-slate-700"
                  aria-label={showPw ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                  {showPw ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showPw2 ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                  minLength={6}
                  className="pr-10 text-slate-900 placeholder:text-slate-400"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPw2((v) => !v)}
                  className="absolute inset-y-0 right-2 flex items-center text-slate-500 hover:text-slate-700"
                  aria-label={showPw2 ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                  {showPw2 ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Đang đăng ký...' : 'Đăng ký'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            Đã có tài khoản?{' '}
            <Link to="/login" className="text-primary hover:underline font-medium">
              Đăng nhập ngay
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
