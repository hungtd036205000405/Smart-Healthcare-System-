import { Menu, Bell, User, Heart, LayoutDashboard, CalendarCheck, FileText, Activity, Users, Settings, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onMenuClick?: () => void;
  userRole?: 'guest' | 'patient' | 'doctor' | 'expert' | 'consultant' | 'admin';
}

const roleNavItems: Record<string, { path: string; label: string }[]> = {
  patient: [
    { path: '/patient', label: 'Trang chủ' },
    { path: '/patient/bookings', label: 'Lịch hẹn' },
    { path: '/patient/records', label: 'Bệnh án' },
    { path: '/patient/health', label: 'Theo dõi sức khỏe' },
  ],
  doctor: [
    { path: '/doctor/home', label: 'Trang chủ' },
    { path: '/doctor/profile', label: 'Hồ sơ bác sĩ' },
    { path: '/doctor/schedule', label: 'Lịch khám' },
    { path: '/doctor/exam', label: 'Khám bệnh' },
    { path: '/doctor/records', label: 'Bệnh án' },
    { path: '/doctor/stats', label: 'Thống kê' },
  ],
  expert: [
    { path: '/expert', label: 'Trang chủ' },
    { path: '/expert/cases', label: 'Hồ sơ bệnh nhân' },
    { path: '/expert/consultations', label: 'Tư vấn' },
    { path: '/expert/stats', label: 'Thống kê' },
  ],
  consultant: [
    { path: '/consultant', label: 'Trang chủ' },
    { path: '/consultant/cases', label: 'Hồ sơ bệnh nhân' },
    { path: '/consultant/schedule', label: 'Lịch tư vấn' },
    { path: '/consultant/stats', label: 'Thống kê' },
  ],
  admin: [
    { path: '/admin', label: 'Trang chủ' },
    { path: '/admin/users', label: 'Người dùng' },
    { path: '/admin/doctors', label: 'Bác sĩ' },
    { path: '/admin/appointments', label: 'Lịch hẹn' },
    { path: '/admin/stats', label: 'Thống kê' },
  ],
};

const roleIcon: Record<string, React.ReactNode> = {
  patient: <Activity className="size-4" />,
  doctor: <LayoutDashboard className="size-4" />,
  expert: <FileText className="size-4" />,
  consultant: <Users className="size-4" />,
  admin: <Settings className="size-4" />,
};

export default function Header({ onMenuClick, userRole = 'guest' }: HeaderProps) {
  const navItems = roleNavItems[userRole] ?? [];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="bg-gradient-to-br from-blue-600 to-cyan-500 p-2 rounded-xl">
              <Heart className="size-6 text-white" fill="white" />
            </div>
            <div>
              <h1 className="font-bold text-xl text-gray-900">MediCare</h1>
              <p className="text-xs text-gray-500">Chăm sóc sức khỏe thông minh</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {userRole === 'guest' ? (
              <>
                <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                  Trang chủ
                </Link>
                <Link to="/services" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                  Dịch vụ
                </Link>
                <Link to="/doctors" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                  Đội ngũ bác sĩ
                </Link>
                <Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                  Về chúng tôi
                </Link>
              </>
            ) : (
              <>
                <Link
                  to={userRole === 'patient' ? '/patient' : `/${userRole}`}
                  className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
                >
                  Trang chủ
                </Link>
                {navItems.slice(1).map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
                  >
                    {item.label}
                  </Link>
                ))}
              </>
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {userRole === 'guest' ? (
              <>
                <Link
                  to="/login"
                  className="hidden sm:inline-flex px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all font-medium"
                >
                  Đăng ký
                </Link>
              </>
            ) : (
              <>
                <button className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-all">
                  <Bell className="size-5" />
                  <span className="absolute top-1 right-1 size-2 bg-red-500 rounded-full"></span>
                </button>
                <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-all">
                  <div className="size-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-white">
                    {userRole === 'patient' ? <Activity className="size-4" /> :
                     userRole === 'doctor' ? <LayoutDashboard className="size-4" /> :
                     userRole === 'expert' ? <FileText className="size-4" /> :
                     userRole === 'consultant' ? <Users className="size-4" /> :
                     userRole === 'admin' ? <Settings className="size-4" /> :
                     <User className="size-4" />}
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-semibold text-gray-900 leading-tight capitalize">{userRole}</p>
                    <p className="text-xs text-gray-500 -mt-0.5">MediCare</p>
                  </div>
                </button>
              </>
            )}
            <button
              onClick={onMenuClick}
              className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
            >
              <Menu className="size-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
