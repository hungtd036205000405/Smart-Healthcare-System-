import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import {
  Construction,
  User,
  Stethoscope,
  Brain,
  Headset,
  Settings,
} from "lucide-react";

// Context
import { AuthProvider, useAuth } from "./context/AuthContext";

// Layouts
import PublicLayout from "./layouts/PublicLayout";
import PatientLayout from "./layouts/PatientLayout";
import DoctorLayout from "./layouts/DoctorLayout";
import AdminLayout from "./layouts/AdminLayout";
import ProfessionalLayout from "./layouts/ProfessionalLayout";

// Pages
import LandingPage from "./pages/LandingPage";
import ServicesPage from "./pages/ServicesPage";
import DoctorsPage from "./pages/DoctorsPage";
import AboutPage from "./pages/AboutPage";
import PatientDashboard from "./pages/patient/PatientDashboard";
import BookingPage from "./pages/patient/BookingPage";
import AppointmentsPage from "./pages/patient/AppointmentsPage";
import MedicalRecordsPage from "./pages/patient/MedicalRecordsPage";
import HealthTrackingPage from "./pages/patient/HealthTrackingPage";
import ConsultationPage from "./pages/patient/ConsultationPage";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import ExpertDashboard from "./pages/expert/ExpertDashboard";
import ConsultantDashboard from "./pages/consultant/ConsultantDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";

function AppContent() {
  const { userRole, user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/health-tips"
            element={<ComingSoon title="Tư vấn sức khỏe" />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<ComingSoon title="Đăng ký" />} />
        </Route>

        {/* Patient Routes with Role-Based Layout */}
        <Route
          element={
            userRole === "patient" ? (
              <PatientLayout />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route path="/patient/dashboard" element={<PatientDashboard />} />
          <Route path="/patient/booking" element={<BookingPage />} />
          <Route path="/patient/appointments" element={<AppointmentsPage />} />
          <Route path="/patient/records" element={<MedicalRecordsPage />} />
          <Route path="/patient/consultation" element={<ConsultationPage />} />
          <Route
            path="/patient/health-tracking"
            element={<HealthTrackingPage />}
          />
          <Route
            path="/booking"
            element={<Navigate to="/patient/booking" replace />}
          />
        </Route>

        {/* Doctor Routes with Role-Based Layout */}
        <Route
          element={
            userRole === "doctor" ? (
              <DoctorLayout />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
          <Route
            path="/doctor/patients"
            element={<ComingSoon title="Danh sách bệnh nhân" />}
          />
          <Route
            path="/doctor/schedule"
            element={<ComingSoon title="Lịch làm việc" />}
          />
        </Route>

        {/* Expert Routes with Professional Layout */}
        <Route
          element={
            userRole === "expert" ? (
              <ProfessionalLayout />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route path="/expert/dashboard" element={<ExpertDashboard />} />
          <Route
            path="/expert/analytics"
            element={<ComingSoon title="Phân tích nâng cao" />}
          />
          <Route
            path="/expert/research"
            element={<ComingSoon title="Nghiên cứu" />}
          />
        </Route>

        {/* Consultant Routes with Professional Layout */}
        <Route
          element={
            userRole === "consultant" ? (
              <ProfessionalLayout />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route
            path="/consultant/dashboard"
            element={<ConsultantDashboard />}
          />
          <Route
            path="/consultant/history"
            element={<ComingSoon title="Lịch sử tư vấn" />}
          />
          <Route
            path="/consultant/experts"
            element={<ComingSoon title="Chuyên gia theo dõi" />}
          />
        </Route>

        {/* Admin Routes with Role-Based Layout */}
        <Route
          element={
            userRole === "admin" ? (
              <AdminLayout />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route
            path="/admin/staff"
            element={<ComingSoon title="Quản lý nhân sự" />}
          />
          <Route
            path="/admin/revenue"
            element={<ComingSoon title="Quản lý doanh thu" />}
          />
        </Route>

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
        <p className="text-xl text-gray-600 mb-8">
          Trang này đang được phát triển
        </p>
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

// Login Page with Auth Context
function LoginPage() {
  const { login, isLoading, userRole } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (userRole !== "guest") {
      navigate(`/${userRole}/dashboard`, { replace: true });
    }
  }, [navigate, userRole]);

  const handleLogin = (
    role: "patient" | "doctor" | "expert" | "consultant" | "admin",
  ) => {
    const userData = {
      patient: {
        id: "patient_1",
        name: "Nguyễn Văn A",
        email: "patient@healthcare.com",
      },
      doctor: {
        id: "doctor_1",
        name: "BS. Lê Minh Cường",
        email: "doctor@healthcare.com",
        specialty: "Tim mạch",
      },
      expert: {
        id: "expert_1",
        name: "TS. Trần Đức Mạnh",
        email: "expert@healthcare.com",
        specialty: "Trí tuệ nhân tạo y tế",
      },
      consultant: {
        id: "consultant_1",
        name: "CTV. Hoàng Thị Huyền",
        email: "consultant@healthcare.com",
        specialty: "Tư vấn sức khỏe",
      },
      admin: {
        id: "admin_1",
        name: "Admin System",
        email: "admin@healthcare.com",
      },
    };

    login(role, userData[role]);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang đăng nhập...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="size-16 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Stethoscope className="size-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Đăng nhập MediCare
          </h1>
          <p className="text-gray-600">Chọn vai trò để trải nghiệm hệ thống</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <button
            onClick={() => handleLogin("patient")}
            className="group p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl hover:shadow-lg hover:border-blue-500 transition-all text-left"
          >
            <div className="size-12 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <User className="size-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Bệnh nhân</h3>
            <p className="text-sm text-gray-600">
              Đặt lịch khám, quản lý hồ sơ sức khỏe
            </p>
          </button>

          <button
            onClick={() => handleLogin("doctor")}
            className="group p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl hover:shadow-lg hover:border-green-500 transition-all text-left"
          >
            <div className="size-12 bg-gradient-to-r from-green-600 to-emerald-500 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Stethoscope className="size-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Bác sĩ</h3>
            <p className="text-sm text-gray-600">
              Khám bệnh, kê đơn, tư vấn trực tuyến
            </p>
          </button>

          <button
            onClick={() => handleLogin("expert")}
            className="group p-6 bg-gradient-to-br from-indigo-50 to-blue-50 border-2 border-indigo-200 rounded-xl hover:shadow-lg hover:border-indigo-500 transition-all text-left"
          >
            <div className="size-12 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Brain className="size-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Chuyên gia</h3>
            <p className="text-sm text-gray-600">
              Phân tích, nghiên cứu, hội chẩn
            </p>
          </button>

          <button
            onClick={() => handleLogin("consultant")}
            className="group p-6 bg-gradient-to-br from-cyan-50 to-teal-50 border-2 border-cyan-200 rounded-xl hover:shadow-lg hover:border-cyan-500 transition-all text-left"
          >
            <div className="size-12 bg-gradient-to-r from-cyan-600 to-teal-500 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Headset className="size-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Cố vấn</h3>
            <p className="text-sm text-gray-600">
              Khảo sát AI, tư vấn sức khỏe, chat với chuyên gia
            </p>
          </button>

          <button
            onClick={() => handleLogin("admin")}
            className="md:col-span-2 group p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl hover:shadow-lg hover:border-purple-500 transition-all text-left"
          >
            <div className="flex items-center gap-4">
              <div className="size-12 bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Settings className="size-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Quản trị viên
                </h3>
                <p className="text-sm text-gray-600">
                  Quản lý hệ thống, nhân sự, doanh thu
                </p>
              </div>
            </div>
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Chưa có tài khoản?{" "}
            <a
              href="/register"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Đăng ký ngay
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
