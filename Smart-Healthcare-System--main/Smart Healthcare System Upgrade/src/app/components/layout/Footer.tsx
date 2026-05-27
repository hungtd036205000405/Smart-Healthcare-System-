import { Heart, Phone, Mail, MapPin, Facebook, Youtube, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-br from-blue-600 to-cyan-500 p-2 rounded-xl">
                <Heart className="size-5 text-white" fill="white" />
              </div>
              <span className="font-bold text-xl text-white">MediCare</span>
            </div>
            <p className="text-sm mb-4">
              Hệ thống y tế thông minh, mang đến dịch vụ chăm sóc sức khỏe chất lượng cao với công nghệ tiên tiến.
            </p>
            <div className="flex gap-3">
              <a href="#" className="size-9 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors">
                <Facebook className="size-4" />
              </a>
              <a href="#" className="size-9 bg-gray-800 hover:bg-red-600 rounded-lg flex items-center justify-center transition-colors">
                <Youtube className="size-4" />
              </a>
              <a href="#" className="size-9 bg-gray-800 hover:bg-pink-600 rounded-lg flex items-center justify-center transition-colors">
                <Instagram className="size-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-blue-400 transition-colors">Trang chủ</Link></li>
              <li><Link to="/services" className="hover:text-blue-400 transition-colors">Dịch vụ</Link></li>
              <li><Link to="/doctors" className="hover:text-blue-400 transition-colors">Đội ngũ bác sĩ</Link></li>
              <li><Link to="/booking" className="hover:text-blue-400 transition-colors">Đặt lịch khám</Link></li>
              <li><Link to="/health-tips" className="hover:text-blue-400 transition-colors">Tư vấn sức khỏe</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-white mb-4">Dịch vụ</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Khám tổng quát</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Khám chuyên khoa</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Tư vấn trực tuyến</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Xét nghiệm</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Gói khám sức khỏe</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">Liên hệ</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="size-4 mt-0.5 flex-shrink-0 text-blue-400" />
                <span>123 Nguyễn Văn Linh, Quận 7, TP. HCM</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-4 flex-shrink-0 text-blue-400" />
                <span>1900 1234 (Hotline 24/7)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4 flex-shrink-0 text-blue-400" />
                <span>support@medicare.vn</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-gray-700 text-sm text-center">
          <p>&copy; 2026 MediCare. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
}
