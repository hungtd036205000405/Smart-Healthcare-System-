import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { User, Stethoscope, Brain, Headset, Settings, Construction } from 'lucide-react';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ChatbotWidget from './components/ChatbotWidget';

// Pages
import LandingPage from './pages/LandingPage';
import ServicesPage from './pages/ServicesPage';
import DoctorsPage from './pages/DoctorsPage';
import AboutPage from './pages/AboutPage';
import PatientDashboard from './pages/patient/PatientDashboard';
import BookingPage from './pages/patient/BookingPage';
import MedicalRecordsPage from './pages/patient/MedicalRecordsPage';
import HealthTrackingPage from './pages/patient/HealthTrackingPage';
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import ExpertDashboard from './pages/expert/ExpertDashboard';
import ConsultantDashboard from './pages/consultant/ConsultantDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';

export default function App() {
  const [userRole, setUserRole] = useState<'guest' | 'patient' | 'doctor' | 'expert' | 'consultant' | 'admin'>('guest');

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header userRole={userRole} />

        <main className="flex-1">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/doctors" element={<DoctorsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/health-tips" element={<ComingSoon title="Tư vấn sức khỏe" />} />

            {/* Auth Routes */}
            <Route path="/login" element={<LoginPage setUserRole={setUserRole} />} />
            <Route path="/register" element={<ComingSoon title="Đăng ký" />} />

            {/* Patient Routes */}
            <Route path="/patient/dashboard" element={<PatientDashboard />} />
            <Route path="/patient/booking" element={<BookingPage />} />
            <Route path="/patient/appointments" element={<ComingSoon title="Lịch hẹn" />} />
            <Route path="/patient/records" element={<MedicalRecordsPage />} />
            <Route path="/patient/consultation" element={<ComingSoon title="Tư vấn trực tuyến" />} />
            <Route path="/patient/health-tracking" element={<HealthTrackingPage />} />
            <Route path="/booking" element={<Navigate to="/patient/booking" replace />} />

            {/* Doctor Routes */}
            <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
            <Route path="/doctor/patients" element={<ComingSoon title="Danh sách bệnh nhân" />} />
            <Route path="/doctor/schedule" element={<ComingSoon title="Lịch làm việc" />} />

            {/* Expert Routes */}
            <Route path="/expert/dashboard" element={<ExpertDashboard />} />
            <Route path="/expert/analytics" element={<ComingSoon title="Phân tích nâng cao" />} />
            <Route path="/expert/research" element={<ComingSoon title="Nghiên cứu" />} />

            {/* Consultant Routes */}
            <Route path="/consultant/dashboard" element={<ConsultantDashboard />} />
            <Route path="/consultant/history" element={<ComingSoon title="Lịch sử tư vấn" />} />
            <Route path="/consultant/experts" element={<ComingSoon title="Chuyên gia theo dõi" />} />

            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/staff" element={<ComingSoon title="Quản lý nhân sự" />} />
            <Route path="/admin/revenue" element={<ComingSoon title="Quản lý doanh thu" />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
        <ChatbotWidget />
      </div>
    </BrowserRouter>
  );
}

// Coming Soon Page Component
function ComingSoon({ title }: { title: string }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
      <div className="text-center">
        <div className="size-24 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Construction className="size-12 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-xl text-gray-600 mb-8">Trang này đang được phát triển</p>
        <a
          href="/"
          className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all font-medium"
        >
          Về trang chủ
        </a>
      </div>
    </div>
  );
}

// Simple Login Page
function LoginPage({ setUserRole }: { setUserRole: (role: 'guest' | 'patient' | 'doctor' | 'expert' | 'consultant' | 'admin') => void }) {
  const handleLogin = (role: 'patient' | 'doctor' | 'expert' | 'consultant' | 'admin') => {
    setUserRole(role);

    // Redirect based on role
    if (role === 'patient') {
      window.location.href = '/patient/dashboard';
    } else if (role === 'doctor') {
      window.location.href = '/doctor/dashboard';
    } else if (role === 'expert') {
      window.location.href = '/expert/dashboard';
    } else if (role === 'consultant') {
      window.location.href = '/consultant/dashboard';
    } else if (role === 'admin') {
      window.location.href = '/admin/dashboard';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="size-16 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Stethoscope className="size-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Đăng nhập MediCare</h1>
          <p className="text-gray-600">Chọn vai trò để trải nghiệm hệ thống</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <button
            onClick={() => handleLogin('patient')}
            className="group p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl hover:shadow-lg hover:border-blue-500 transition-all text-left"
          >
            <div className="size-12 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <User className="size-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Bệnh nhân</h3>
            <p className="text-sm text-gray-600">Đặt lịch khám, quản lý hồ sơ sức khỏe</p>
          </button>

          <button
            onClick={() => handleLogin('doctor')}
            className="group p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl hover:shadow-lg hover:border-green-500 transition-all text-left"
          >
            <div className="size-12 bg-gradient-to-r from-green-600 to-emerald-500 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Stethoscope className="size-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Bác sĩ</h3>
            <p className="text-sm text-gray-600">Khám bệnh, kê đơn, tư vấn trực tuyến</p>
          </button>

          <button
            onClick={() => handleLogin('expert')}
            className="group p-6 bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-xl hover:shadow-lg hover:border-orange-500 transition-all text-left"
          >
            <div className="size-12 bg-gradient-to-r from-orange-600 to-amber-500 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Brain className="size-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Chuyên gia</h3>
            <p className="text-sm text-gray-600">Phân tích, nghiên cứu, hội chẩn</p>
          </button>

          <button
            onClick={() => handleLogin('consultant')}
            className="group p-6 bg-gradient-to-br from-teal-50 to-cyan-50 border-2 border-teal-200 rounded-xl hover:shadow-lg hover:border-teal-500 transition-all text-left"
          >
            <div className="size-12 bg-gradient-to-r from-teal-600 to-cyan-500 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Headset className="size-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Người cần tư vấn</h3>
            <p className="text-sm text-gray-600">Khảo sát AI, tư vấn sức khỏe, chat với chuyên gia</p>
          </button>

          <button
            onClick={() => handleLogin('admin')}
            className="group p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl hover:shadow-lg hover:border-purple-500 transition-all text-left"
          >
            <div className="size-12 bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Settings className="size-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Quản trị viên</h3>
            <p className="text-sm text-gray-600">Quản lý hệ thống, nhân sự, doanh thu</p>
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Chưa có tài khoản?{' '}
            <a href="/register" className="text-blue-600 hover:text-blue-700 font-medium">
              Đăng ký ngay
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}