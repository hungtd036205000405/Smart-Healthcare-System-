import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Construction } from "lucide-react";

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
import DoctorHome from './pages/doctor/DoctorHome';
import DoctorProfile from './pages/doctor/DoctorProfile';
import DoctorSchedule from './pages/doctor/DoctorSchedule';
import DoctorExam from './pages/doctor/DoctorExam';
import DoctorRecords from './pages/doctor/DoctorRecords';
import DoctorStats from './pages/doctor/DoctorStats';
import ExpertDashboard from './pages/expert/ExpertDashboard';
import ConsultantDashboard from './pages/consultant/ConsultantDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import PatientAppointmentsPage from './pages/patient/PatientAppointmentsPage';

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
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Patient Routes - Dashboard layout */}
        <Route path="/patient/dashboard" element={<DashboardLayout><PatientDashboard /></DashboardLayout>} />
        <Route path="/patient/booking" element={<DashboardLayout><BookingPage /></DashboardLayout>} />
        <Route path="/patient/appointments" element={<DashboardLayout><PatientAppointmentsPage /></DashboardLayout>} />
        <Route path="/patient/records" element={<DashboardLayout><MedicalRecordsPage /></DashboardLayout>} />
        <Route path="/patient/consultation" element={<DashboardLayout><ComingSoon title="Tư vấn trực tuyến" /></DashboardLayout>} />
        <Route path="/patient/health-tracking" element={<DashboardLayout><HealthTrackingPage /></DashboardLayout>} />
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

