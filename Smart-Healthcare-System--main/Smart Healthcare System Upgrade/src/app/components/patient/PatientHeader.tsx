import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Bell, LogOut, ChevronDown, Heart } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const navItems = [
  { path: '/patient', label: 'Trang chủ' },
  { path: '/patient/bookings', label: 'Lịch hẹn' },
  { path: '/patient/records', label: 'Bệnh án' },
  { path: '/patient/health', label: 'Theo dõi sức khỏe' },
];

export default function PatientHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, text: 'Lịch khám với BS. Nguyễn Văn An vào ngày mai lúc 09:00', time: '5 phút trước', unread: true },
    { id: 2, text: 'Kết quả xét nghiệm đã có sẵn', time: '30 phút trước', unread: true },
    { id: 3, text: 'Nhắc nhở: Uống thuốc đúng giờ', time: '1 giờ trước', unread: false },
  ];

  const handleLogout = () => { navigate('/'); };

  const isActive = (path: string) =>
    path === '/patient' ? location.pathname === '/patient' : location.pathname.startsWith(path);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/patient" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="bg-gradient-to-br from-blue-600 to-cyan-500 p-2 rounded-xl shadow-sm">
              <Heart className="size-5 text-white" fill="white" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-gray-900 leading-tight">MediCare</h1>
              <p className="text-xs text-blue-600 font-medium -mt-0.5">Patient Portal</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1 overflow-x-auto pb-px -mb-px scrollbar-none">
            {navItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-4 py-2.5 text-sm font-medium transition-all whitespace-nowrap ${
                    active ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {item.label}
                  {active && (
                    <motion.div
                      layoutId="patient-nav-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Bell className="size-5" />
                {notifications.some(n => n.unread) && (
                  <span className="absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full" />
                )}
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                        <h3 className="font-semibold text-gray-900 text-sm">Thông báo</h3>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {notifications.filter(n => n.unread).length} thông báo mới
                        </p>
                      </div>
                      <div className="max-h-72 overflow-y-auto">
                        {notifications.map((notif) => (
                          <div
                            key={notif.id}
                            className={`px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer ${
                              notif.unread ? 'bg-blue-50/50' : ''
                            }`}
                          >
                            <div className="flex items-start gap-2">
                              {notif.unread && (
                                <span className="size-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                              )}
                              <div className={notif.unread ? '' : 'ml-4'}>
                                <p className="text-sm text-gray-900 leading-snug">{notif.text}</p>
                                <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
                        <button
                          onClick={() => setShowNotifications(false)}
                          className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium text-center"
                        >
                          Xem tất cả thông báo
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
              <div className="size-9 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm">
                PT
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-gray-900 leading-tight">Nguyễn Thị Patient</p>
                <p className="text-xs text-blue-600 font-medium -mt-0.5">Bệnh nhân</p>
              </div>
              <ChevronDown className="size-4 text-gray-400 hidden sm:block" />
            </div>

            <button
              onClick={handleLogout}
              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Đăng xuất"
            >
              <LogOut className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
