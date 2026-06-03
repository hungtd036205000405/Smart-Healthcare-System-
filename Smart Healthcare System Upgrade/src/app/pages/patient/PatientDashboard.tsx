import { AnimatePresence, motion } from "motion/react";
import type React from "react";
import { useEffect, useState } from "react";
import {
  Activity,
  AlertCircle,
  Bell,
  Calendar,
  CheckCircle,
  ChevronRight,
  Clock,
  Edit,
  FileText,
  Info,
  MapPin,
  MessageSquare,
  Phone,
  Trash2,
  User,
  Video,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  patientService,
  type Appointment,
  type HealthMetric,
} from "../../services/patientService";

type ActivityItem = {
  title: string;
  time: string;
  icon: typeof Calendar;
  colorClass: string;
  iconClass: string;
};

const quickActions = [
  {
    icon: Calendar,
    label: "Đặt lịch khám",
    description: "Đặt lịch với bác sĩ",
    color: "from-blue-500 to-blue-600",
    link: "/patient/booking",
  },
  {
    icon: Video,
    label: "Tư vấn online",
    description: "Video call ngay",
    color: "from-green-500 to-green-600",
    link: "/patient/consultation",
  },
  {
    icon: FileText,
    label: "Hồ sơ sức khỏe",
    description: "Xem hồ sơ và kết quả",
    color: "from-purple-500 to-purple-600",
    link: "/patient/records",
  },
  {
    icon: Activity,
    label: "Theo dõi sức khỏe",
    description: "Biểu đồ và xu hướng",
    color: "from-orange-500 to-orange-600",
    link: "/patient/health-tracking",
  },
];

const recentActivities: (ActivityItem & { link: string })[] = [
  {
    title: "Đã hoàn thành khám với BS. Lê Minh Cường",
    time: "2 ngày trước",
    icon: Calendar,
    colorClass: "bg-blue-100",
    iconClass: "text-blue-600",
    link: "/patient/appointments",
  },
  {
    title: "Đơn thuốc mới được kê",
    time: "3 ngày trước",
    icon: FileText,
    colorClass: "bg-green-100",
    iconClass: "text-green-600",
    link: "/patient/records",
  },
  {
    title: "Tin nhắn mới từ BS. Nguyễn Văn An",
    time: "1 tuần trước",
    icon: MessageSquare,
    colorClass: "bg-purple-100",
    iconClass: "text-purple-600",
    link: "/patient/consultation",
  },
];

function getMetricIcon(label: string) {
  const iconMap: Record<string, { icon: typeof Activity; color: string }> = {
    "Nhịp tim": { icon: Activity, color: "from-red-500 to-pink-500" },
    "Huyết áp": { icon: Activity, color: "from-blue-500 to-cyan-500" },
    "Cân nặng": { icon: Activity, color: "from-green-500 to-emerald-500" },
    "Đường huyết": { icon: Activity, color: "from-orange-500 to-amber-500" },
  };

  return iconMap[label] || { icon: Activity, color: "from-gray-500 to-gray-600" };
}

export default function PatientDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [cancelTargetId, setCancelTargetId] = useState<number | null>(null);
  const [showCancelSuccess, setShowCancelSuccess] = useState(false);
  const [showMedicationDone, setShowMedicationDone] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([]);
  const [healthMetrics, setHealthMetrics] = useState<HealthMetric[]>([]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [appointments, metrics] = await Promise.all([
        patientService.getAppointments(user?.id || ""),
        patientService.getHealthMetrics(user?.id || ""),
      ]);

      setUpcomingAppointments(appointments);
      setHealthMetrics(metrics);
    } catch (err) {
      console.error("Failed to fetch patient data:", err);
      setError("Không thể tải dữ liệu. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user?.id]);

  const handleCancelAppointment = async () => {
    if (cancelTargetId === null) return;
    await patientService.cancelAppointment(cancelTargetId);
    setShowCancelConfirm(false);
    setCancelTargetId(null);
    setShowCancelSuccess(true);
    await fetchData();
    window.setTimeout(() => setShowCancelSuccess(false), 2500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-cyan-50/30">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 p-8 text-white shadow-lg">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="mb-2 text-3xl font-bold">
                Xin chào, {user?.name || "Nguyễn Văn A"}
              </h1>
              <p className="text-blue-100">
                Hôm nay là{" "}
                {new Date().toLocaleDateString("vi-VN", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="hidden text-right md:block">
              <div className="text-sm text-blue-100">Lịch hẹn sắp tới</div>
              <div className="text-2xl font-bold">{upcomingAppointments.length}</div>
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="flex min-h-[40vh] items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600" />
              <p className="text-gray-600">Đang tải dữ liệu...</p>
            </div>
          </div>
        )}

        {error && !isLoading && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
            {error}
          </div>
        )}

        {!isLoading && (
          <>
            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {quickActions.map((action, index) => (
                <Link key={action.link} to={action.link} className="group">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="h-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-transparent hover:shadow-xl"
                  >
                    <div
                      className={`mb-4 flex size-14 items-center justify-center rounded-xl bg-gradient-to-br ${action.color} shadow-lg transition-transform group-hover:scale-110`}
                    >
                      <action.icon className="size-7 text-white" />
                    </div>
                    <h3 className="mb-1 font-bold text-gray-900">{action.label}</h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                    <div className="mt-3 flex items-center gap-1 text-sm font-medium text-blue-600 opacity-0 transition-opacity group-hover:opacity-100">
                      Truy cập ngay <ChevronRight className="size-4" />
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              <div className="space-y-6 lg:col-span-2">
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-2xl border border-gray-200 bg-white shadow-sm"
                >
                  <div className="border-b border-gray-200 p-6">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <h2 className="mb-1 text-2xl font-bold text-gray-900">
                          Lịch hẹn sắp tới
                        </h2>
                        <p className="text-sm text-gray-600">
                          Quản lý và theo dõi lịch khám của bạn
                        </p>
                      </div>
                      <Link
                        to="/patient/appointments"
                        className="flex items-center gap-1 rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 transition-all hover:bg-blue-100"
                      >
                        Xem tất cả <ChevronRight className="size-4" />
                      </Link>
                    </div>
                  </div>
                  <div className="space-y-4 p-6">
                    {upcomingAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="rounded-xl border-2 border-gray-200 p-5 transition-all hover:border-blue-500 hover:shadow-md"
                      >
                        <div className="mb-4 flex items-start justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-md">
                              <User className="size-7 text-white" />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-gray-900">
                                {appointment.doctor}
                              </h3>
                              <p className="text-sm font-medium text-blue-600">
                                {appointment.specialty}
                              </p>
                              <div className="mt-1 flex items-center gap-2">
                                <Phone className="size-3 text-gray-400" />
                                <span className="text-xs text-gray-500">
                                  {appointment.phone}
                                </span>
                              </div>
                            </div>
                          </div>
                          <span
                            className={`rounded-full border px-4 py-1.5 text-xs font-semibold ${
                              appointment.status === "confirmed"
                                ? "border-green-200 bg-green-100 text-green-700"
                                : "border-yellow-200 bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {appointment.status === "confirmed"
                              ? "Đã xác nhận"
                              : "Chờ xác nhận"}
                          </span>
                        </div>

                        <div className="mb-4 grid gap-4 rounded-lg bg-gradient-to-r from-gray-50 to-blue-50 p-4 sm:grid-cols-3">
                          <AppointmentInfo
                            icon={Calendar}
                            label="Ngày khám"
                            value={new Date(appointment.date).toLocaleDateString("vi-VN", {
                              day: "2-digit",
                              month: "2-digit",
                            })}
                            className="text-blue-600"
                          />
                          <AppointmentInfo
                            icon={Clock}
                            label="Giờ khám"
                            value={appointment.time}
                            className="text-green-600"
                          />
                          <AppointmentInfo
                            icon={MapPin}
                            label="Địa điểm"
                            value={appointment.location}
                            className="text-orange-600"
                          />
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => navigate("/patient/consultation")}
                            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2.5 font-medium text-white transition-all hover:shadow-lg"
                          >
                            <Video className="size-4" />
                            Tham gia khám
                          </button>
                          <button
                            onClick={() => navigate("/patient/appointments")}
                            className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2.5 font-medium text-gray-700 transition-all hover:bg-gray-200"
                          >
                            <Edit className="size-4" />
                            Đổi lịch
                          </button>
                          <button
                            onClick={() => {
                              setCancelTargetId(appointment.id);
                              setShowCancelConfirm(true);
                            }}
                            className="rounded-lg bg-red-50 px-4 py-2.5 font-medium text-red-600 transition-all hover:bg-red-100"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.section>

                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="rounded-2xl border border-gray-200 bg-white shadow-sm"
                >
                  <div className="border-b border-gray-200 p-6">
                    <h2 className="mb-1 text-2xl font-bold text-gray-900">
                      Chỉ số sức khỏe
                    </h2>
                    <p className="text-sm text-gray-600">
                      Cập nhật lần cuối: Hôm nay, 08:30
                    </p>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {healthMetrics.map((metric) => {
                        const { icon: IconComponent, color } = getMetricIcon(metric.label);
                        return (
                          <div
                            key={metric.label}
                            className="rounded-xl border-2 border-gray-200 bg-gradient-to-br from-gray-50 to-white p-5 transition-all hover:shadow-md"
                          >
                            <div className="mb-3 flex items-center justify-between">
                              <span className="text-sm font-medium text-gray-700">
                                {metric.label}
                              </span>
                              <div
                                className={`flex size-10 items-center justify-center rounded-lg bg-gradient-to-br ${color} shadow-sm`}
                              >
                                <IconComponent className="size-5 text-white" />
                              </div>
                            </div>
                            <div className="mb-2 flex items-baseline gap-2">
                              <span className="text-3xl font-bold text-gray-900">
                                {metric.value}
                              </span>
                              <span className="text-sm font-medium text-gray-600">
                                {metric.unit}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="size-2 rounded-full bg-green-500" />
                              <span className="text-xs text-gray-600">
                                {metric.description}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="mt-4 flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4">
                      <Info className="mt-0.5 size-5 shrink-0 text-blue-600" />
                      <div className="text-sm">
                        <p className="mb-1 font-medium text-blue-900">
                          Tất cả chỉ số đều trong giới hạn bình thường
                        </p>
                        <p className="text-blue-700">
                          Tiếp tục duy trì lối sống lành mạnh và theo dõi định kỳ
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.section>
              </div>

              <aside className="space-y-6">
                <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                  <div className="border-b border-gray-200 p-6">
                    <h2 className="text-lg font-bold text-gray-900">
                      Hoạt động gần đây
                    </h2>
                  </div>
                  <div className="space-y-4 p-6">
                    {recentActivities.map((activity) => (
                      <Link
                        key={activity.title}
                        to={activity.link}
                        className="flex cursor-pointer items-start gap-3 rounded-lg bg-gray-50 p-3 transition-colors hover:bg-gray-100"
                      >
                        <div
                          className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${activity.colorClass}`}
                        >
                          <activity.icon className={`size-5 ${activity.iconClass}`} />
                        </div>
                        <div className="flex-1">
                          <p className="mb-1 text-sm font-medium text-gray-900">
                            {activity.title}
                          </p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                        <ChevronRight className="size-4 text-gray-400" />
                      </Link>
                    ))}
                  </div>
                </section>

                <section className="rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 p-6 text-white shadow-lg">
                  <div className="mb-4 flex items-center gap-2">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-white/20">
                      <Bell className="size-6" />
                    </div>
                    <h3 className="text-lg font-bold">Nhắc nhở uống thuốc</h3>
                  </div>
                  <div className="mb-4 rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                    <p className="mb-1 font-semibold">Thuốc huyết áp</p>
                    <p className="text-sm text-white/90">09:00 sáng - 1 viên sau ăn</p>
                  </div>
                  <button
                    onClick={() => setShowMedicationDone(true)}
                    className="w-full rounded-lg bg-white py-3 font-semibold text-orange-600 transition-all hover:shadow-lg"
                  >
                    Đánh dấu đã uống
                  </button>
                </section>
              </aside>
            </div>
          </>
        )}
      </div>

      <AnimatePresence>
        {showCancelConfirm && (
          <Modal>
            <div className="text-center">
              <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-red-100">
                <AlertCircle className="size-8 text-red-600" />
              </div>
              <h3 className="mb-2 text-2xl font-bold text-gray-900">
                Hủy lịch hẹn?
              </h3>
              <p className="mb-6 text-gray-600">
                Bạn có chắc chắn muốn hủy lịch hẹn này không?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowCancelConfirm(false);
                    setCancelTargetId(null);
                  }}
                  className="flex-1 rounded-xl border-2 border-gray-300 px-6 py-3 font-medium text-gray-700 transition-all hover:bg-gray-50"
                >
                  Không, giữ lại
                </button>
                <button
                  onClick={handleCancelAppointment}
                  className="flex-1 rounded-xl bg-red-600 px-6 py-3 font-medium text-white transition-all hover:bg-red-700"
                >
                  Có, hủy lịch
                </button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showMedicationDone && (
          <Modal>
            <div className="text-center">
              <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-green-100">
                <Bell className="size-10 text-green-600" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-gray-900">Đã ghi nhận</h3>
              <p className="mb-6 text-gray-600">
                Bạn đã hoàn thành việc uống thuốc đúng giờ.
              </p>
              <button
                onClick={() => setShowMedicationDone(false)}
                className="w-full rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 px-6 py-3 font-medium text-white transition-all hover:shadow-lg"
              >
                Đóng
              </button>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCancelSuccess && (
          <div className="fixed bottom-5 right-5 z-50">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-sm font-semibold text-green-700 shadow-lg"
            >
              <CheckCircle className="size-5" />
              Lịch hẹn đã được hủy thành công
              <button onClick={() => setShowCancelSuccess(false)}>
                <X className="size-4" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AppointmentInfo({
  icon: Icon,
  label,
  value,
  className,
}: {
  icon: typeof Calendar;
  label: string;
  value: string;
  className: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon className={`size-5 ${className}`} />
      <div>
        <div className="text-xs text-gray-500">{label}</div>
        <div className="text-sm font-semibold text-gray-900">{value}</div>
      </div>
    </div>
  );
}

function Modal({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl"
      >
        {children}
      </motion.div>
    </div>
  );
}
