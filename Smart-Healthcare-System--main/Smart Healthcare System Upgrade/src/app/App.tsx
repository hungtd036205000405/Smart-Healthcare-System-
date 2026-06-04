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
import PatientProfilePage from './pages/patient/PatientProfilePage';
import DoctorSearchPage from './pages/patient/DoctorSearchPage';
import OnlineConsultPage from './pages/patient/OnlineConsultPage';
import PaymentPage from './pages/patient/PaymentPage';
import AppointmentHistoryPage from './pages/patient/AppointmentHistoryPage';
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import DoctorHome from './pages/doctor/DoctorHome';
import DoctorProfile from './pages/doctor/DoctorProfile';
import DoctorSchedule from './pages/doctor/DoctorSchedule';
import DoctorExam from './pages/doctor/DoctorExam';
import DoctorRecords from './pages/doctor/DoctorRecords';
import DoctorStats from './pages/doctor/DoctorStats';
import ExpertDashboard from './pages/expert/ExpertDashboard';
import ConsultantDashboard from './pages/consultant/ConsultantDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import ConsultationUserPage from './pages/consultation-user/ConsultationUserPage';

// Layout wrapper cho trang chính (có Header + Footer)
function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
}

// Layout wrapper cho trang dashboard (không có Header/Footer, dùng sidebar riêng)
function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
      <ChatbotWidget />
    </div>
  );
}

export default function App() {
  const [userRole, setUserRole] = useState<'guest' | 'patient' | 'doctor' | 'expert' | 'consultant' | 'admin' | 'consultation-user'>('guest');

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes - có Header + Footer */}
        <Route path="/" element={<PublicLayout><LandingPage /></PublicLayout>} />
        <Route path="/services" element={<PublicLayout><ServicesPage /></PublicLayout>} />
        <Route path="/doctors" element={<PublicLayout><DoctorsPage /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><AboutPage /></PublicLayout>} />
        <Route path="/health-tips" element={<PublicLayout><ComingSoon title="Tư vấn sức khỏe" /></PublicLayout>} />

        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage setUserRole={setUserRole} />} />
        <Route path="/register" element={<PublicLayout><ComingSoon title="Đăng ký" /></PublicLayout>} />

        {/* Patient Routes - Dashboard layout */}
        <Route path="/patient/dashboard" element={<DashboardLayout><PatientDashboard /></DashboardLayout>} />
        <Route path="/patient/booking" element={<DashboardLayout><BookingPage /></DashboardLayout>} />
        <Route path="/patient/appointments" element={<DashboardLayout><ComingSoon title="Lịch hẹn" /></DashboardLayout>} />
        <Route path="/patient/records" element={<DashboardLayout><MedicalRecordsPage /></DashboardLayout>} />
        <Route path="/patient/consultation" element={<DashboardLayout><OnlineConsultPage /></DashboardLayout>} />
        <Route path="/patient/health-tracking" element={<DashboardLayout><HealthTrackingPage /></DashboardLayout>} />
        <Route path="/patient/profile" element={<DashboardLayout><PatientProfilePage /></DashboardLayout>} />
        <Route path="/patient/search" element={<DashboardLayout><DoctorSearchPage /></DashboardLayout>} />
        <Route path="/patient/online-consult" element={<DashboardLayout><OnlineConsultPage /></DashboardLayout>} />
        <Route path="/patient/payment" element={<DashboardLayout><PaymentPage /></DashboardLayout>} />
        <Route path="/patient/history" element={<DashboardLayout><AppointmentHistoryPage /></DashboardLayout>} />
        <Route path="/booking" element={<Navigate to="/patient/booking" replace />} />

        {/* Doctor Routes - Dashboard layout */}
        <Route path="/doctor/home" element={<DashboardLayout><DoctorHome /></DashboardLayout>} />
        <Route path="/doctor/profile" element={<DashboardLayout><DoctorProfile /></DashboardLayout>} />
        <Route path="/doctor/schedule" element={<DashboardLayout><DoctorSchedule /></DashboardLayout>} />
        <Route path="/doctor/exam" element={<DashboardLayout><DoctorExam /></DashboardLayout>} />
        <Route path="/doctor/records" element={<DashboardLayout><DoctorRecords /></DashboardLayout>} />
        <Route path="/doctor/stats" element={<DashboardLayout><DoctorStats /></DashboardLayout>} />

        {/* Expert Routes - Dashboard layout */}
        <Route path="/expert/dashboard" element={<DashboardLayout><ExpertDashboard /></DashboardLayout>} />
        <Route path="/expert/analytics" element={<DashboardLayout><ComingSoon title="Phân tích nâng cao" /></DashboardLayout>} />
        <Route path="/expert/research" element={<DashboardLayout><ComingSoon title="Nghiên cứu" /></DashboardLayout>} />

        {/* Consultant Routes - Dashboard layout */}
        <Route path="/consultant/dashboard" element={<DashboardLayout><ConsultantDashboard /></DashboardLayout>} />
        <Route path="/consultant/history" element={<DashboardLayout><ComingSoon title="Lịch sử tư vấn" /></DashboardLayout>} />
        <Route path="/consultant/experts" element={<DashboardLayout><ComingSoon title="Chuyên gia theo dõi" /></DashboardLayout>} />

        {/* Consultation User Routes - Dashboard layout */}
        <Route path="/consultation-user" element={<DashboardLayout><ConsultationUserPage /></DashboardLayout>} />
        <Route path="/consultation-user/request" element={<DashboardLayout><ConsultationUserPage /></DashboardLayout>} />
        <Route path="/consultation-user/chat" element={<DashboardLayout><ConsultationUserPage /></DashboardLayout>} />
        <Route path="/consultation-user/schedule" element={<DashboardLayout><ConsultationUserPage /></DashboardLayout>} />
        <Route path="/consultation-user/ai" element={<DashboardLayout><ConsultationUserPage /></DashboardLayout>} />

        {/* Admin Routes - Dashboard layout */}
        <Route path="/admin/dashboard" element={<DashboardLayout><AdminDashboard /></DashboardLayout>} />
        <Route path="/admin/staff" element={<DashboardLayout><ComingSoon title="Quản lý nhân sự" /></DashboardLayout>} />
        <Route path="/admin/revenue" element={<DashboardLayout><ComingSoon title="Quản lý doanh thu" /></DashboardLayout>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
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
function LoginPage({ setUserRole }: { setUserRole: (role: 'guest' | 'patient' | 'doctor' | 'expert' | 'consultant' | 'admin' | 'consultation-user') => void }) {
  const handleLogin = (role: 'patient' | 'doctor' | 'expert' | 'consultant' | 'admin' | 'consultation-user') => {
    setUserRole(role);

    if (role === 'patient') {
      window.location.href = '/patient/dashboard';
    } else if (role === 'doctor') {
      window.location.href = '/doctor/home';
    } else if (role === 'expert') {
      window.location.href = '/expert/dashboard';
    } else if (role === 'consultant') {
      window.location.href = '/consultant/dashboard';
    } else if (role === 'consultation-user') {
      window.location.href = '/consultation-user';
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
            onClick={() => {
              setUserRole('consultation-user');
              window.location.href = '/consultation-user';
            }}
            className="group p-6 bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-xl hover:shadow-lg hover:border-orange-500 transition-all text-left"
          >
            <div className="size-12 bg-gradient-to-r from-orange-600 to-amber-500 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <User className="size-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Người cần tư vấn</h3>
            <p className="text-sm text-gray-600">Khảo sát AI, tư vấn sức khỏe, chat với chuyên gia</p>
          </button>

          <button
            onClick={() => handleLogin('consultant')}
            className="group p-6 bg-gradient-to-br from-teal-50 to-cyan-50 border-2 border-teal-200 rounded-xl hover:shadow-lg hover:border-teal-500 transition-all text-left"
          >
            <div className="size-12 bg-gradient-to-r from-teal-600 to-cyan-500 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Headset className="size-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Tư vấn viên</h3>
            <p className="text-sm text-gray-600">Quản lý tư vấn, khảo sát AI, lịch hẹn</p>
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
