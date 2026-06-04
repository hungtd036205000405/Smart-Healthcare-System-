import { useState } from 'react';
import { X, User, Globe, Bell, Shield, HelpCircle, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  role?: string;
}

const languages = [
  { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
];

export default function SettingsModal({ isOpen, onClose, role = 'patient' }: SettingsModalProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'language' | 'notifications' | 'other'>('profile');
  const [profile, setProfile] = useState({
    name: 'Nguyễn Văn An',
    email: 'nguyenvanan@medicare.com',
    phone: '0901234567',
    dob: '1985-06-15',
    gender: 'male',
    address: '123 Đường ABC, Quận 1, TP.HCM',
  });
  const [selectedLang, setSelectedLang] = useState('vi');
  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    push: false,
    appointment: true,
    reminder: true,
    news: false,
  });
  const [darkMode, setDarkMode] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSaveProfile = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const tabs = [
    { id: 'profile' as const, label: 'Thông tin cá nhân', icon: User },
    { id: 'language' as const, label: 'Ngôn ngữ', icon: Globe },
    { id: 'notifications' as const, label: 'Thông báo', icon: Bell },
    { id: 'other' as const, label: 'Khác', icon: Shield },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex overflow-hidden pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Sidebar */}
              <div className="w-56 bg-gray-50 border-r border-gray-200 flex flex-col">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="font-bold text-gray-900 text-lg">Cài đặt</h2>
                  <p className="text-xs text-gray-500 mt-0.5 capitalize">{role} Portal</p>
                </div>
                <nav className="flex-1 p-2 space-y-0.5">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${
                          activeTab === tab.id
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                      >
                        <Icon className="size-4" />
                        {tab.label}
                      </button>
                    );
                  })}
                </nav>
                <div className="p-4 border-t border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="size-9 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                      NVA
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{profile.name}</p>
                      <p className="text-xs text-gray-500 truncate">{profile.email}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">
                    {tabs.find((t) => t.id === activeTab)?.label}
                  </h3>
                  <button
                    onClick={onClose}
                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="size-4 text-gray-500" />
                  </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-6">
                  {/* Profile Tab */}
                  {activeTab === 'profile' && (
                    <div className="space-y-5">
                      <div className="flex items-center gap-4 pb-5 border-b border-gray-100">
                        <div className="size-16 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                          NVA
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{profile.name}</p>
                          <button className="text-xs text-blue-600 hover:text-blue-700 font-medium mt-1">
                            Đổi ảnh đại diện
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">Họ và tên</label>
                          <input
                            type="text"
                            value={profile.name}
                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">Số điện thoại</label>
                          <input
                            type="text"
                            value={profile.phone}
                            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                          <input
                            type="email"
                            value={profile.email}
                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">Ngày sinh</label>
                          <input
                            type="date"
                            value={profile.dob}
                            onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">Giới tính</label>
                          <select
                            value={profile.gender}
                            onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                          >
                            <option value="male">Nam</option>
                            <option value="female">Nữ</option>
                            <option value="other">Khác</option>
                          </select>
                        </div>
                        <div className="col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">Địa chỉ</label>
                          <input
                            type="text"
                            value={profile.address}
                            onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Language Tab */}
                  {activeTab === 'language' && (
                    <div className="space-y-3">
                      <p className="text-sm text-gray-600 mb-4">
                        Chọn ngôn ngữ hiển thị cho giao diện ứng dụng.
                      </p>
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => setSelectedLang(lang.code)}
                          className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                            selectedLang === lang.code
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300 bg-white'
                          }`}
                        >
                          <span className="text-2xl">{lang.flag}</span>
                          <div className="flex-1 text-left">
                            <p className="text-sm font-semibold text-gray-900">{lang.label}</p>
                            <p className="text-xs text-gray-500">{lang.code.toUpperCase()}</p>
                          </div>
                          {selectedLang === lang.code && (
                            <div className="size-5 bg-blue-500 rounded-full flex items-center justify-center">
                              <div className="size-2 bg-white rounded-full" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Notifications Tab */}
                  {activeTab === 'notifications' && (
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600 mb-4">
                        Quản lý cách thức bạn nhận thông báo từ hệ thống.
                      </p>
                      {[
                        { key: 'email', label: 'Thông báo qua Email', desc: 'Nhận email khi có cập nhật quan trọng' },
                        { key: 'sms', label: 'Thông báo qua SMS', desc: 'Nhận tin nhắn SMS cho lịch hẹn' },
                        { key: 'push', label: 'Thông báo đẩy', desc: 'Hiển thị thông báo trên trình duyệt' },
                        { key: 'appointment', label: 'Nhắc lịch hẹn', desc: 'Thông báo trước khi lịch hẹn bắt đầu' },
                        { key: 'reminder', label: 'Nhắc uống thuốc', desc: 'Nhắc nhở lịch uống thuốc hàng ngày' },
                        { key: 'news', label: 'Tin tức & khuyến mãi', desc: 'Cập nhật tính năng mới và ưu đãi' },
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{item.label}</p>
                            <p className="text-xs text-gray-500">{item.desc}</p>
                          </div>
                          <button
                            onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key as keyof typeof notifications] })}
                            className={`relative w-11 h-6 rounded-full transition-colors ${
                              notifications[item.key as keyof typeof notifications] ? 'bg-blue-500' : 'bg-gray-300'
                            }`}
                          >
                            <div
                              className={`absolute top-1 size-4 bg-white rounded-full shadow transition-transform ${
                                notifications[item.key as keyof typeof notifications] ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Other Tab */}
                  {activeTab === 'other' && (
                    <div className="space-y-2">
                      {[
                        { label: 'Chế độ tối', desc: 'Chuyển giao diện sang chế độ tối', toggle: true, value: darkMode, onChange: () => setDarkMode(!darkMode) },
                        { label: 'Hỗ trợ & Trợ giúp', desc: 'Liên hệ đội ngũ hỗ trợ', icon: HelpCircle, href: '#' },
                        { label: 'Chính sách bảo mật', desc: 'Xem chính sách bảo mật', icon: Shield, href: '#' },
                        { label: 'Phiên bản ứng dụng', desc: 'v1.0.0 — Phiên bản mới nhất', icon: null, href: null, version: true },
                      ].map((item, idx) => (
                        <div key={idx}>
                          {item.toggle ? (
                            <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-xl">
                              <div>
                                <p className="text-sm font-medium text-gray-900">{item.label}</p>
                                <p className="text-xs text-gray-500">{item.desc}</p>
                              </div>
                              <button
                                onClick={item.onChange}
                                className={`relative w-11 h-6 rounded-full transition-colors ${
                                  item.value ? 'bg-blue-500' : 'bg-gray-300'
                                }`}
                              >
                                <div
                                  className={`absolute top-1 size-4 bg-white rounded-full shadow transition-transform ${
                                    item.value ? 'translate-x-6' : 'translate-x-1'
                                  }`}
                                />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={item.href ? () => {} : undefined}
                              className="w-full flex items-center justify-between py-3 px-4 hover:bg-gray-50 rounded-xl transition-colors"
                            >
                              <div>
                                <p className="text-sm font-medium text-gray-900">{item.label}</p>
                                <p className="text-xs text-gray-500">{item.desc}</p>
                              </div>
                              {item.version ? (
                                <span className="text-xs text-gray-400">{item.desc}</span>
                              ) : (
                                <ChevronRight className="size-4 text-gray-400" />
                              )}
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer */}
                {activeTab === 'profile' && (
                  <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
                    <button
                      onClick={onClose}
                      className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium text-sm transition-all"
                    >
                      Hủy
                    </button>
                    <button
                      onClick={handleSaveProfile}
                      className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:shadow-lg font-medium text-sm transition-all"
                    >
                      {saved ? 'Đã lưu!' : 'Lưu thay đổi'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
