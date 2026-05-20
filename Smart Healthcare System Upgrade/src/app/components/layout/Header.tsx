import { Menu, Bell, User, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onMenuClick?: () => void;
  userRole?: 'guest' | 'patient' | 'doctor' | 'expert' | 'consultant' | 'admin';
}

export default function Header({ onMenuClick, userRole = 'guest' }: HeaderProps) {
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
                  <div className="size-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center">
                    <User className="size-4 text-white" />
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
