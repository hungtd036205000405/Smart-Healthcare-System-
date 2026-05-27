import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Calendar, FileText, MessageSquare, Activity, Bell, ChevronRight, Clock, MapPin, User, X, Phone, Video, AlertCircle, Edit, Trash2, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import PatientHeader from '../../components/patient/PatientHeader';

export default function PatientDashboard() {
  const [showAppointmentActions, setShowAppointmentActions] = useState<number | null>(null);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [showMedicationDone, setShowMedicationDone] = useState(false);

  const upcomingAppointments = [
    {
      id: 1,
      doctor: 'BS. Nguyễn Văn An',
      specialty: 'Tim mạch',
      date: '2026-05-10',
      time: '09:00',
      location: 'Phòng 301, Tầng 3',
      status: 'confirmed',
      phone: '0901234567'
    },
    {
      id: 2,
      doctor: 'BS. Trần Thị Bình',
      specialty: 'Nhi khoa',
      date: '2026-05-15',
      time: '14:30',
      location: 'Phòng 205, Tầng 2',
      status: 'pending',
      phone: '0902345678'
    }
  ];

  const healthMetrics = [
    { label: 'Nhịp tim', value: '72', unit: 'bpm', status: 'normal', icon: Activity, color: 'from-red-500 to-pink-500', description: 'Bình thường' },
    { label: 'Huyết áp', value: '120/80', unit: 'mmHg', status: 'normal', icon: Activity, color: 'from-blue-500 to-cyan-500', description: 'Tốt' },
    { label: 'Cân nặng', value: '68', unit: 'kg', status: 'normal', icon: Activity, color: 'from-green-500 to-emerald-500', description: 'Ổn định' },
    { label: 'Đường huyết', value: '95', unit: 'mg/dL', status: 'normal', icon: Activity, color: 'from-orange-500 to-amber-500', description: 'Bình thường' }
  ];

  const recentActivities = [
    {
      type: 'appointment',
      title: 'Đã hoàn thành khám với BS. Lê Minh Cường',
      time: '2 ngày trước',
      icon: Calendar,
      color: 'blue'
    },
    {
      type: 'prescription',
      title: 'Đơn thuốc mới được kê',
      time: '3 ngày trước',
      icon: FileText,
      color: 'green'
    },
    {
      type: 'message',
      title: 'Tin nhắn mới từ BS. Nguyễn Văn An',
      time: '1 tuần trước',
      icon: MessageSquare,
      color: 'purple'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-cyan-50/30">
      <PatientHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Welcome */}
        <div className="mb-8 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-8 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Xin chào, Nguyễn Văn A 👋</h1>
              <p className="text-blue-100">Hôm nay là {new Date().toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <div className="text-right">
                <div className="text-sm text-blue-100">Lịch hẹn sắp tới</div>
                <div className="text-2xl font-bold">{upcomingAppointments.length}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions with descriptions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            {
              icon: Calendar,
              label: 'Đặt lịch khám',
              description: 'Đặt lịch với bác sĩ',
              color: 'from-blue-500 to-blue-600',
              link: '/patient/booking'
            },
            {
              icon: Video,
              label: 'Tư vấn online',
              description: 'Video call ngay',
              color: 'from-green-500 to-green-600',
              link: '/patient/consultation'
            },
            {
              icon: FileText,
              label: 'Hồ sơ sức khỏe',
              description: 'Xem hồ sơ & kết quả',
              color: 'from-purple-500 to-purple-600',
              link: '/patient/records'
            },
            {
              icon: Activity,
              label: 'Theo dõi sức khỏe',
              description: 'Biểu đồ & xu hướng',
              color: 'from-orange-500 to-orange-600',
              link: '/patient/health-tracking'
            }
          ].map((action, index) => (
            <Link
              key={index}
              to={action.link}
              className="group"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all border border-gray-200 hover:border-transparent h-full"
              >
                <div className={`size-14 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  <action.icon className="size-7 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{action.label}</h3>
                <p className="text-sm text-gray-600">{action.description}</p>
                <div className="mt-3 text-blue-600 text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Truy cập ngay <ChevronRight className="size-4" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Appointments with actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">Lịch hẹn sắp tới</h2>
                    <p className="text-sm text-gray-600">Quản lý và theo dõi lịch khám của bạn</p>
                  </div>
                  <Link to="/patient/appointments" className="px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-sm font-medium flex items-center gap-1 transition-all">
                    Xem tất cả <ChevronRight className="size-4" />
                  </Link>
                </div>
              </div>
              <div className="p-6 space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="border-2 border-gray-200 rounded-xl p-5 hover:border-blue-500 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="size-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                          <User className="size-7 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-900">{appointment.doctor}</h3>
                          <p className="text-sm text-blue-600 font-medium">{appointment.specialty}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Phone className="size-3 text-gray-400" />
                            <span className="text-xs text-gray-500">{appointment.phone}</span>
                          </div>
                        </div>
                      </div>
                      <span className={`px-4 py-1.5 rounded-full text-xs font-semibold ${
                        appointment.status === 'confirmed'
                          ? 'bg-green-100 text-green-700 border border-green-200'
                          : 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                      }`}>
                        {appointment.status === 'confirmed' ? '✓ Đã xác nhận' : '⏳ Chờ xác nhận'}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Calendar className="size-5 text-blue-600" />
                        <div>
                          <div className="text-xs text-gray-500">Ngày khám</div>
                          <div className="font-semibold text-gray-900">{new Date(appointment.date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="size-5 text-green-600" />
                        <div>
                          <div className="text-xs text-gray-500">Giờ khám</div>
                          <div className="font-semibold text-gray-900">{appointment.time}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="size-5 text-orange-600" />
                        <div>
                          <div className="text-xs text-gray-500">Địa điểm</div>
                          <div className="font-semibold text-gray-900 text-sm">{appointment.location}</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2">
                        <Video className="size-4" />
                        Tham gia khám
                      </button>
                      <button className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-all flex items-center gap-2">
                        <Edit className="size-4" />
                        Đổi lịch
                      </button>
                      <button
                        onClick={() => setShowCancelConfirm(true)}
                        className="px-4 py-2.5 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 transition-all"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Empty state */}
                {upcomingAppointments.length === 0 && (
                  <div className="text-center py-12">
                    <div className="size-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calendar className="size-10 text-gray-400" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Chưa có lịch hẹn nào</h3>
                    <p className="text-gray-600 mb-6">Đặt lịch khám với bác sĩ ngay hôm nay</p>
                    <Link
                      to="/patient/booking"
                      className="inline-flex px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                    >
                      Đặt lịch ngay
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Health Metrics with explanations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">Chỉ số sức khỏe</h2>
                    <p className="text-sm text-gray-600">Cập nhật lần cuối: Hôm nay, 08:30</p>
                  </div>
                  <Link to="/patient/health-tracking" className="px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-sm font-medium flex items-center gap-1 transition-all">
                    Xem chi tiết <ChevronRight className="size-4" />
                  </Link>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {healthMetrics.map((metric, index) => (
                    <div key={index} className="p-5 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-xl hover:shadow-md transition-all">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-gray-700">{metric.label}</span>
                        <div className={`size-10 bg-gradient-to-br ${metric.color} rounded-lg flex items-center justify-center shadow-sm`}>
                          <metric.icon className="size-5 text-white" />
                        </div>
                      </div>
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-3xl font-bold text-gray-900">{metric.value}</span>
                        <span className="text-sm text-gray-600 font-medium">{metric.unit}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="size-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-gray-600">{metric.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3">
                  <Info className="size-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="text-blue-900 font-medium mb-1">Tất cả chỉ số đều trong giới hạn bình thường</p>
                    <p className="text-blue-700">Tiếp tục duy trì lối sống lành mạnh và theo dõi định kỳ</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200"
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-900">Hoạt động gần đây</h2>
              </div>
              <div className="p-6 space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className={`size-10 bg-${activity.color}-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <activity.icon className={`size-5 text-${activity.color}-600`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 mb-1">{activity.title}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                    <ChevronRight className="size-4 text-gray-400" />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Medication Reminder */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl shadow-lg p-6 text-white"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="size-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Bell className="size-6" />
                </div>
                <h3 className="font-bold text-lg">Nhắc nhở uống thuốc</h3>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-4">
                <p className="font-semibold mb-1">Thuốc huyết áp</p>
                <p className="text-sm text-white/90">
                  09:00 sáng - 1 viên sau ăn
                </p>
              </div>
              <button
                onClick={() => setShowMedicationDone(true)}
                className="w-full py-3 bg-white text-orange-600 rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                ✓ Đánh dấu đã uống
              </button>
            </motion.div>

            {/* Health Tips */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200"
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-900">Mẹo sức khỏe hôm nay</h2>
              </div>
              <div className="p-6">
                <img
                  src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=200&fit=crop"
                  alt="Health tip"
                  className="w-full h-40 object-cover rounded-xl mb-4 shadow-sm"
                />
                <h3 className="font-bold text-gray-900 mb-2">10 Thực phẩm tốt cho tim mạch</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Khám phá các loại thực phẩm giúp duy trì sức khỏe tim mạch và giảm nguy cơ bệnh tim...
                </p>
                <Link to="/health-tips" className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-sm font-medium transition-all">
                  Đọc bài viết đầy đủ <ChevronRight className="size-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      <AnimatePresence>
        {showCancelConfirm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8"
            >
              <div className="text-center">
                <div className="size-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="size-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Hủy lịch hẹn?</h3>
                <p className="text-gray-600 mb-6">
                  Bạn có chắc chắn muốn hủy lịch hẹn này không? Hành động này không thể hoàn tác.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowCancelConfirm(false)}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium"
                  >
                    Không, giữ lại
                  </button>
                  <button
                    onClick={() => {
                      setShowCancelConfirm(false);
                      alert('Đã hủy lịch hẹn thành công');
                    }}
                    className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all font-medium"
                  >
                    Có, hủy lịch
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Medication Done Modal */}
      <AnimatePresence>
        {showMedicationDone && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center"
            >
              <div className="size-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Bell className="size-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Tuyệt vời! 🎉</h3>
              <p className="text-gray-600 mb-6">
                Bạn đã hoàn thành việc uống thuốc đúng giờ. Hãy tiếp tục duy trì thói quen tốt này!
              </p>
              <button
                onClick={() => setShowMedicationDone(false)}
                className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-xl hover:shadow-lg transition-all font-medium"
              >
                Đóng
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
