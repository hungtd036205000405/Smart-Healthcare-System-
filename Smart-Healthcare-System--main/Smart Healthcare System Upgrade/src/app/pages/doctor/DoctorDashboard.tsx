import { motion, AnimatePresence } from 'motion/react';
import { Users, Calendar, Clock, MessageSquare, FileText, Video, ChevronRight, Activity, X, Send, Pill, TestTube, Image as ImageIcon, Mic, Phone, Camera, Plus, Trash2, Check, UserCheck, AlertCircle } from 'lucide-react';
import { useState } from 'react';

export default function DoctorDashboard() {
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'waiting' | 'in-progress' | 'completed'>('all');
  const [showExamModal, setShowExamModal] = useState(false);
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [prescription, setPrescription] = useState('');
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [showLabTestModal, setShowLabTestModal] = useState(false);
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const [medications, setMedications] = useState<any[]>([]);
  const [labTests, setLabTests] = useState<string[]>([]);

  const todayAppointments = [
    {
      id: 1,
      patient: 'Nguyễn Văn A',
      age: 45,
      time: '09:00',
      status: 'waiting',
      reason: 'Khám định kỳ tim mạch',
      symptoms: 'Đau ngực, khó thở khi gắng sức',
      priority: 'normal',
      medicalHistory: 'Tiền sử cao huyết áp, đang điều trị',
      allergies: ['Penicillin'],
      vitalSigns: { bp: '140/90', hr: '85', temp: '37.0' }
    },
    {
      id: 2,
      patient: 'Trần Thị B',
      age: 32,
      time: '09:30',
      status: 'in-progress',
      reason: 'Tái khám',
      symptoms: 'Theo dõi sau phẫu thuật',
      priority: 'high',
      medicalHistory: 'Phẫu thuật tim 3 tháng trước',
      allergies: [],
      vitalSigns: { bp: '120/80', hr: '72', temp: '36.5' }
    },
    {
      id: 3,
      patient: 'Lê Văn C',
      age: 58,
      time: '10:00',
      status: 'waiting',
      reason: 'Khám bệnh mới',
      symptoms: 'Tim đập nhanh, mệt mỏi',
      priority: 'urgent',
      medicalHistory: 'Không có tiền sử bệnh lý',
      allergies: ['Aspirin'],
      vitalSigns: { bp: '150/95', hr: '95', temp: '36.8' }
    },
    {
      id: 4,
      patient: 'Phạm Thị D',
      age: 67,
      time: '10:30',
      status: 'completed',
      reason: 'Tư vấn trực tuyến',
      symptoms: 'Huyết áp cao',
      priority: 'normal',
      medicalHistory: 'Đái tháo đường type 2',
      allergies: [],
      vitalSigns: { bp: '145/92', hr: '78', temp: '36.6' }
    }
  ];

  const filteredAppointments = todayAppointments.filter(apt =>
    filterStatus === 'all' || apt.status === filterStatus
  );

  const chatMessages = [
    { id: 1, sender: 'patient', text: 'Xin chào bác sĩ', time: '09:00' },
    { id: 2, sender: 'doctor', text: 'Chào bạn, hôm nay cảm thấy thế nào?', time: '09:01' },
    { id: 3, sender: 'patient', text: 'Con bị đau ngực khi vận động', time: '09:02' }
  ];

  const stats = [
    { label: 'Bệnh nhân hôm nay', value: '12', icon: Users, color: 'from-blue-500 to-blue-600' },
    { label: 'Đang chờ khám', value: '5', icon: Clock, color: 'from-orange-500 to-orange-600' },
    { label: 'Đã hoàn thành', value: '7', icon: Calendar, color: 'from-green-500 to-green-600' },
    { label: 'Tin nhắn mới', value: '3', icon: MessageSquare, color: 'from-purple-500 to-purple-600' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'waiting':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'border-l-4 border-l-red-500';
      case 'high':
        return 'border-l-4 border-l-orange-500';
      default:
        return 'border-l-4 border-l-blue-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'waiting':
        return 'Đang chờ';
      case 'in-progress':
        return 'Đang khám';
      case 'completed':
        return 'Hoàn thành';
      default:
        return 'Chưa xác nhận';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Chào BS. Nguyễn Văn An</h1>
          <p className="text-gray-600">Hôm nay, {new Date().toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`size-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="size-6 text-white" />
                </div>
                <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - Worklist */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Danh sách ca khám hôm nay</h2>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as any)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="all">Tất cả</option>
                    <option value="waiting">Đang chờ</option>
                    <option value="in-progress">Đang khám</option>
                    <option value="completed">Hoàn thành</option>
                  </select>
                </div>
              </div>
              <div className="p-6 space-y-4">
                {filteredAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    onClick={() => setSelectedPatient(appointment)}
                    className={`p-5 rounded-xl border-2 hover:shadow-lg transition-all cursor-pointer ${getPriorityColor(appointment.priority)} ${
                      selectedPatient?.id === appointment.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-4">
                        <div className="size-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {appointment.patient.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900">{appointment.patient}</h3>
                          <p className="text-sm text-gray-600">{appointment.age} tuổi</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 text-gray-600 mb-2">
                          <Clock className="size-4" />
                          <span className="font-medium">{appointment.time}</span>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(appointment.status)}`}>
                          {getStatusText(appointment.status)}
                        </span>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-gray-600">Lý do khám:</span>
                        <p className="font-medium text-gray-900">{appointment.reason}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Triệu chứng:</span>
                        <p className="font-medium text-gray-900">{appointment.symptoms}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedPatient(appointment);
                          setShowExamModal(true);
                        }}
                        className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all font-medium"
                      >
                        Bắt đầu khám
                      </button>
                      <button
                        onClick={() => {
                          setSelectedPatient(appointment);
                          setShowVideoCall(true);
                        }}
                        className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-all"
                      >
                        <Video className="size-5" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedPatient(appointment);
                          setShowChat(true);
                        }}
                        className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-all"
                      >
                        <MessageSquare className="size-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Suggestions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg p-6 text-white"
            >
              <div className="flex items-center gap-2 mb-4">
                <Activity className="size-5" />
                <h3 className="font-semibold">AI Gợi ý chẩn đoán</h3>
              </div>
              {selectedPatient ? (
                <div className="space-y-3">
                  <p className="text-sm text-white/90">
                    Dựa trên triệu chứng: <span className="font-medium">{selectedPatient.symptoms}</span>
                  </p>
                  <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
                    <div className="text-sm font-medium mb-1">Khả năng cao:</div>
                    <ul className="text-sm space-y-1 text-white/90">
                      <li>• Rối loạn nhịp tim (75%)</li>
                      <li>• Thiếu máu cơ tim (60%)</li>
                      <li>• Tăng huyết áp (45%)</li>
                    </ul>
                  </div>
                  <div className="text-xs text-white/80">
                    ⚠️ Đây chỉ là gợi ý hỗ trợ, vui lòng khám và chẩn đoán chính xác
                  </div>
                </div>
              ) : (
                <p className="text-sm text-white/90">
                  Chọn một bệnh nhân để xem gợi ý chẩn đoán từ AI
                </p>
              )}
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200"
            >
              <div className="p-6 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Thao tác nhanh</h3>
              </div>
              <div className="p-6 space-y-3">
                <button
                  onClick={() => {
                    if (selectedPatient) {
                      setShowPrescriptionModal(true);
                    } else {
                      alert('Vui lòng chọn bệnh nhân trước');
                    }
                  }}
                  className="w-full p-4 bg-blue-50 hover:bg-blue-100 rounded-lg flex items-center justify-between transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Pill className="size-5 text-blue-600" />
                    <span className="font-medium text-gray-900">Kê đơn thuốc</span>
                  </div>
                  <ChevronRight className="size-5 text-gray-400 group-hover:text-blue-600" />
                </button>
                <button
                  onClick={() => {
                    if (selectedPatient) {
                      setShowLabTestModal(true);
                    } else {
                      alert('Vui lòng chọn bệnh nhân trước');
                    }
                  }}
                  className="w-full p-4 bg-green-50 hover:bg-green-100 rounded-lg flex items-center justify-between transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <TestTube className="size-5 text-green-600" />
                    <span className="font-medium text-gray-900">Yêu cầu xét nghiệm</span>
                  </div>
                  <ChevronRight className="size-5 text-gray-400 group-hover:text-green-600" />
                </button>
                <button
                  onClick={() => {
                    if (selectedPatient) {
                      setShowConsultationModal(true);
                    } else {
                      alert('Vui lòng chọn bệnh nhân trước');
                    }
                  }}
                  className="w-full p-4 bg-purple-50 hover:bg-purple-100 rounded-lg flex items-center justify-between transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <UserCheck className="size-5 text-purple-600" />
                    <span className="font-medium text-gray-900">Yêu cầu hội chẩn</span>
                  </div>
                  <ChevronRight className="size-5 text-gray-400 group-hover:text-purple-600" />
                </button>
              </div>
            </motion.div>

            {/* Recent Messages */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Tin nhắn mới</h3>
                  <span className="size-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                </div>
              </div>
              <div className="p-6 space-y-4">
                {[
                  { patient: 'Nguyễn Văn A', message: 'Cảm ơn bác sĩ, tôi đã uống thuốc đúng...', time: '5 phút trước' },
                  { patient: 'Trần Thị B', message: 'Bác sĩ cho em hỏi về kết quả xét...', time: '15 phút trước' },
                  { patient: 'Lê Văn C', message: 'Em muốn đổi lịch hẹn sang tuần sau...', time: '1 giờ trước' }
                ].map((msg, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-all">
                    <div className="size-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                      {msg.patient.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-gray-900">{msg.patient}</div>
                      <p className="text-sm text-gray-600 truncate">{msg.message}</p>
                      <div className="text-xs text-gray-500 mt-1">{msg.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Medical Examination Modal */}
        <AnimatePresence>
          {showExamModal && selectedPatient && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => setShowExamModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold mb-1">Phiên khám bệnh</h2>
                      <p className="text-blue-100">{selectedPatient.patient} - {selectedPatient.age} tuổi</p>
                    </div>
                    <button
                      onClick={() => setShowExamModal(false)}
                      className="p-2 hover:bg-white/20 rounded-lg transition-all"
                    >
                      <X className="size-6" />
                    </button>
                  </div>
                </div>

                {/* Body */}
                <div className="grid lg:grid-cols-3 gap-6 p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
                  {/* Left: Patient Info */}
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h3 className="font-semibold text-gray-900 mb-3">Thông tin bệnh nhân</h3>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-gray-600">Lý do khám:</span>
                          <p className="font-medium text-gray-900">{selectedPatient.reason}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Triệu chứng:</span>
                          <p className="font-medium text-gray-900">{selectedPatient.symptoms}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Tiền sử bệnh:</span>
                          <p className="font-medium text-gray-900">{selectedPatient.medicalHistory}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Dị ứng:</span>
                          <p className="font-medium text-red-600">
                            {selectedPatient.allergies.length > 0 ? selectedPatient.allergies.join(', ') : 'Không'}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                      <h3 className="font-semibold text-gray-900 mb-3">Sinh hiệu</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Huyết áp:</span>
                          <span className="font-bold text-gray-900">{selectedPatient.vitalSigns.bp} mmHg</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Nhịp tim:</span>
                          <span className="font-bold text-gray-900">{selectedPatient.vitalSigns.hr} bpm</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Nhiệt độ:</span>
                          <span className="font-bold text-gray-900">{selectedPatient.vitalSigns.temp}°C</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                      <h3 className="font-semibold text-gray-900 mb-3">AI Gợi ý</h3>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600">•</span>
                          <span>Rối loạn nhịp tim (75%)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600">•</span>
                          <span>Thiếu máu cơ tim (60%)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-600">•</span>
                          <span>Tăng huyết áp (45%)</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Middle: Diagnosis */}
                  <div className="lg:col-span-2 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Chẩn đoán</label>
                      <textarea
                        value={diagnosis}
                        onChange={(e) => setDiagnosis(e.target.value)}
                        placeholder="Nhập chẩn đoán của bác sĩ..."
                        className="w-full h-32 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Kê đơn thuốc</label>
                      <textarea
                        value={prescription}
                        onChange={(e) => setPrescription(e.target.value)}
                        placeholder="Nhập danh sách thuốc và liều lượng..."
                        className="w-full h-32 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <button className="flex items-center justify-center gap-2 px-4 py-3 bg-green-100 text-green-700 rounded-xl hover:bg-green-200 transition-all font-medium">
                        <TestTube className="size-5" />
                        Yêu cầu xét nghiệm
                      </button>
                      <button className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200 transition-all font-medium">
                        <ImageIcon className="size-5" />
                        Chỉ định chụp chiếu
                      </button>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4">
                      <h3 className="font-semibold text-gray-900 mb-3">Ghi chú thêm</h3>
                      <textarea
                        placeholder="Lời dặn của bác sĩ, lịch tái khám..."
                        className="w-full h-24 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="border-t border-gray-200 p-6 bg-gray-50">
                  <div className="flex gap-3 justify-end">
                    <button
                      onClick={() => setShowExamModal(false)}
                      className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all font-medium"
                    >
                      Hủy
                    </button>
                    <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:shadow-lg transition-all font-medium">
                      Hoàn thành khám
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Video Call Modal */}
        <AnimatePresence>
          {showVideoCall && selectedPatient && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-50"
            >
              <div className="h-full flex flex-col">
                {/* Video Area */}
                <div className="flex-1 relative">
                  {/* Remote Video (Patient) */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="size-32 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-5xl font-bold">{selectedPatient.patient.charAt(0)}</span>
                      </div>
                      <h3 className="text-2xl font-semibold mb-2">{selectedPatient.patient}</h3>
                      <p className="text-gray-400">Đang kết nối...</p>
                    </div>
                  </div>

                  {/* Local Video (Doctor) */}
                  <div className="absolute top-4 right-4 w-64 h-48 bg-gray-700 rounded-xl overflow-hidden shadow-2xl border-4 border-white">
                    <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center">
                      <Camera className="size-12 text-gray-400" />
                    </div>
                  </div>

                  {/* Info Panel */}
                  <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-xl p-4 text-white">
                    <div className="text-sm text-gray-300 mb-1">Bệnh nhân</div>
                    <div className="font-semibold text-lg">{selectedPatient.patient}</div>
                    <div className="text-sm text-gray-400">{selectedPatient.reason}</div>
                    <div className="mt-2 flex items-center gap-2 text-sm">
                      <div className="size-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-green-400">Đang gọi: 00:00</span>
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div className="bg-gray-900 p-6">
                  <div className="max-w-4xl mx-auto flex items-center justify-center gap-4">
                    <button className="size-14 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-all">
                      <Mic className="size-6 text-white" />
                    </button>
                    <button className="size-14 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-all">
                      <Camera className="size-6 text-white" />
                    </button>
                    <button
                      onClick={() => setShowVideoCall(false)}
                      className="size-16 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-all"
                    >
                      <Phone className="size-7 text-white" />
                    </button>
                    <button className="size-14 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-all">
                      <MessageSquare className="size-6 text-white" />
                    </button>
                    <button className="size-14 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-all">
                      <Plus className="size-6 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Modal */}
        <AnimatePresence>
          {showChat && selectedPatient && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => setShowChat(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 50 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl h-[600px] flex flex-col overflow-hidden"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="size-12 bg-white/20 rounded-full flex items-center justify-center font-bold text-lg">
                        {selectedPatient.patient.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-semibold">{selectedPatient.patient}</h3>
                        <div className="flex items-center gap-1 text-sm text-purple-100">
                          <div className="size-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span>Đang hoạt động</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowChat(false)}
                      className="p-2 hover:bg-white/20 rounded-lg transition-all"
                    >
                      <X className="size-5" />
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                  <div className="space-y-4">
                    {chatMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex gap-2 ${msg.sender === 'doctor' ? 'flex-row-reverse' : 'flex-row'}`}
                      >
                        <div className={`size-8 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0 ${
                          msg.sender === 'doctor' ? 'bg-blue-600' : 'bg-purple-600'
                        }`}>
                          {msg.sender === 'doctor' ? 'BS' : selectedPatient.patient.charAt(0)}
                        </div>
                        <div className={`max-w-[70%] ${msg.sender === 'doctor' ? 'text-right' : 'text-left'}`}>
                          <div className={`inline-block px-4 py-2 rounded-2xl ${
                            msg.sender === 'doctor'
                              ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white'
                              : 'bg-white text-gray-900 border border-gray-200'
                          }`}>
                            <p className="text-sm">{msg.text}</p>
                          </div>
                          <p className="text-xs text-gray-500 mt-1 px-2">{msg.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Input */}
                <div className="border-t border-gray-200 p-4 bg-white">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && chatMessage && setChatMessage('')}
                      placeholder="Nhập tin nhắn..."
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    />
                    <button
                      onClick={() => chatMessage && setChatMessage('')}
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all"
                    >
                      <Send className="size-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Prescription Modal */}
        <AnimatePresence>
          {showPrescriptionModal && selectedPatient && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => setShowPrescriptionModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              >
                <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold mb-1">Kê đơn thuốc</h2>
                      <p className="text-blue-100">Bệnh nhân: {selectedPatient.patient} - {selectedPatient.age} tuổi</p>
                    </div>
                    <button onClick={() => setShowPrescriptionModal(false)} className="p-2 hover:bg-white/20 rounded-lg transition-all">
                      <X className="size-6" />
                    </button>
                  </div>
                </div>

                <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                  {/* Patient Allergies Warning */}
                  {selectedPatient.allergies && selectedPatient.allergies.length > 0 && (
                    <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-start gap-3">
                      <AlertCircle className="size-6 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-red-900 mb-1">Cảnh báo dị ứng</h4>
                        <p className="text-sm text-red-700">
                          Bệnh nhân dị ứng với: <strong>{selectedPatient.allergies.join(', ')}</strong>
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Current Medications List */}
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Danh sách thuốc đã kê</h3>
                    {medications.length === 0 ? (
                      <div className="text-center py-8 bg-gray-50 rounded-xl">
                        <Pill className="size-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-600">Chưa có thuốc nào được kê</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {medications.map((med, index) => (
                          <div key={index} className="p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-bold text-gray-900">{med.name}</h4>
                              <div className="grid md:grid-cols-3 gap-2 mt-2 text-sm text-gray-600">
                                <div>
                                  <span className="text-gray-500">Liều lượng:</span> <strong>{med.dosage}</strong>
                                </div>
                                <div>
                                  <span className="text-gray-500">Số lượng:</span> <strong>{med.quantity}</strong>
                                </div>
                                <div>
                                  <span className="text-gray-500">Cách dùng:</span> <strong>{med.usage}</strong>
                                </div>
                              </div>
                              {med.notes && (
                                <p className="text-sm text-gray-600 mt-2 italic">Ghi chú: {med.notes}</p>
                              )}
                            </div>
                            <button
                              onClick={() => setMedications(medications.filter((_, i) => i !== index))}
                              className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                            >
                              <Trash2 className="size-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Add Medication Form */}
                  <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border-2 border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Thêm thuốc mới</h3>
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Tên thuốc *</label>
                          <input
                            type="text"
                            placeholder="VD: Paracetamol"
                            id="med-name"
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-medium"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Liều lượng *</label>
                          <input
                            type="text"
                            placeholder="VD: 500mg"
                            id="med-dosage"
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-medium"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Số lượng *</label>
                          <input
                            type="text"
                            placeholder="VD: 20 viên"
                            id="med-quantity"
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-medium"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Cách dùng *</label>
                          <input
                            type="text"
                            placeholder="VD: Ngày 2 lần, sau ăn"
                            id="med-usage"
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-medium"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Ghi chú (tùy chọn)</label>
                        <textarea
                          id="med-notes"
                          rows={2}
                          placeholder="Ghi chú thêm về cách dùng, lưu ý..."
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-medium resize-none"
                        />
                      </div>
                      <button
                        onClick={() => {
                          const name = (document.getElementById('med-name') as HTMLInputElement).value;
                          const dosage = (document.getElementById('med-dosage') as HTMLInputElement).value;
                          const quantity = (document.getElementById('med-quantity') as HTMLInputElement).value;
                          const usage = (document.getElementById('med-usage') as HTMLInputElement).value;
                          const notes = (document.getElementById('med-notes') as HTMLTextAreaElement).value;

                          if (name && dosage && quantity && usage) {
                            setMedications([...medications, { name, dosage, quantity, usage, notes }]);
                            (document.getElementById('med-name') as HTMLInputElement).value = '';
                            (document.getElementById('med-dosage') as HTMLInputElement).value = '';
                            (document.getElementById('med-quantity') as HTMLInputElement).value = '';
                            (document.getElementById('med-usage') as HTMLInputElement).value = '';
                            (document.getElementById('med-notes') as HTMLTextAreaElement).value = '';
                          } else {
                            alert('Vui lòng điền đầy đủ thông tin bắt buộc');
                          }
                        }}
                        className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:shadow-lg transition-all font-medium flex items-center justify-center gap-2"
                      >
                        <Plus className="size-5" />
                        Thêm thuốc vào đơn
                      </button>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 p-6 bg-gray-50">
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowPrescriptionModal(false)}
                      className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition-all font-medium"
                    >
                      Hủy
                    </button>
                    <button
                      onClick={() => {
                        if (medications.length > 0) {
                          alert(`Đã lưu đơn thuốc với ${medications.length} loại thuốc cho bệnh nhân ${selectedPatient.patient}`);
                          setShowPrescriptionModal(false);
                          setMedications([]);
                        } else {
                          alert('Vui lòng thêm ít nhất 1 loại thuốc');
                        }
                      }}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:shadow-lg transition-all font-medium flex items-center justify-center gap-2"
                    >
                      <Check className="size-5" />
                      Lưu đơn thuốc
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Lab Test Modal */}
        <AnimatePresence>
          {showLabTestModal && selectedPatient && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => setShowLabTestModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden"
              >
                <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold mb-1">Yêu cầu xét nghiệm</h2>
                      <p className="text-green-100">Bệnh nhân: {selectedPatient.patient} - {selectedPatient.age} tuổi</p>
                    </div>
                    <button onClick={() => setShowLabTestModal(false)} className="p-2 hover:bg-white/20 rounded-lg transition-all">
                      <X className="size-6" />
                    </button>
                  </div>
                </div>

                <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Xét nghiệm đã chọn ({labTests.length})</h3>
                    {labTests.length === 0 ? (
                      <div className="text-center py-8 bg-gray-50 rounded-xl">
                        <TestTube className="size-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-600">Chưa chọn xét nghiệm nào</p>
                      </div>
                    ) : (
                      <div className="grid md:grid-cols-2 gap-3">
                        {labTests.map((test, index) => (
                          <div key={index} className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Check className="size-4 text-green-600" />
                              <span className="font-medium text-gray-900">{test}</span>
                            </div>
                            <button
                              onClick={() => setLabTests(labTests.filter((_, i) => i !== index))}
                              className="p-1 text-red-600 hover:bg-red-50 rounded transition-all"
                            >
                              <X className="size-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="bg-gradient-to-br from-gray-50 to-green-50 rounded-xl p-6 border-2 border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Chọn xét nghiệm cần làm</h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {[
                        'Công thức máu toàn phần',
                        'Đường huyết',
                        'HbA1c',
                        'Cholesterol',
                        'Triglycerid',
                        'HDL-C / LDL-C',
                        'Xét nghiệm gan (AST, ALT)',
                        'Xét nghiệm thận (Creatinin, Urea)',
                        'Acid uric',
                        'Điện giải đồ',
                        'TSH (Tuyến giáp)',
                        'Troponin (Tim mạch)',
                        'D-Dimer',
                        'Xét nghiệm nước tiểu',
                        'CRP / ESR',
                        'X-quang ngực',
                        'Siêu âm tim',
                        'ECG / Điện tâm đồ',
                        'Siêu âm bụng',
                        'CT Scan',
                        'MRI'
                      ].map((test) => (
                        <button
                          key={test}
                          onClick={() => {
                            if (!labTests.includes(test)) {
                              setLabTests([...labTests, test]);
                            }
                          }}
                          disabled={labTests.includes(test)}
                          className={`p-3 rounded-lg border-2 text-left font-medium transition-all ${
                            labTests.includes(test)
                              ? 'bg-green-100 border-green-300 text-green-700 cursor-not-allowed'
                              : 'bg-white border-gray-200 text-gray-900 hover:border-green-500 hover:bg-green-50'
                          }`}
                        >
                          {test}
                        </button>
                      ))}
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Ghi chú thêm</label>
                      <textarea
                        rows={3}
                        placeholder="Ghi chú về yêu cầu xét nghiệm, mục đích, lưu ý..."
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none font-medium resize-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 p-6 bg-gray-50">
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setShowLabTestModal(false);
                        setLabTests([]);
                      }}
                      className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition-all font-medium"
                    >
                      Hủy
                    </button>
                    <button
                      onClick={() => {
                        if (labTests.length > 0) {
                          alert(`Đã tạo yêu cầu ${labTests.length} xét nghiệm cho bệnh nhân ${selectedPatient.patient}`);
                          setShowLabTestModal(false);
                          setLabTests([]);
                        } else {
                          alert('Vui lòng chọn ít nhất 1 xét nghiệm');
                        }
                      }}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-xl hover:shadow-lg transition-all font-medium flex items-center justify-center gap-2"
                    >
                      <Check className="size-5" />
                      Gửi yêu cầu xét nghiệm
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Consultation Request Modal */}
        <AnimatePresence>
          {showConsultationModal && selectedPatient && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => setShowConsultationModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden"
              >
                <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold mb-1">Yêu cầu hội chẩn</h2>
                      <p className="text-purple-100">Bệnh nhân: {selectedPatient.patient} - {selectedPatient.age} tuổi</p>
                    </div>
                    <button onClick={() => setShowConsultationModal(false)} className="p-2 hover:bg-white/20 rounded-lg transition-all">
                      <X className="size-6" />
                    </button>
                  </div>
                </div>

                <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                  <div className="space-y-6">
                    {/* Patient Summary */}
                    <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4">
                      <h3 className="font-bold text-purple-900 mb-3">Tóm tắt bệnh án</h3>
                      <div className="grid md:grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-purple-700">Bệnh nhân:</span>
                          <p className="font-semibold text-gray-900">{selectedPatient.patient}, {selectedPatient.age} tuổi</p>
                        </div>
                        <div>
                          <span className="text-purple-700">Triệu chứng:</span>
                          <p className="font-semibold text-gray-900">{selectedPatient.symptoms}</p>
                        </div>
                        <div>
                          <span className="text-purple-700">Tiền sử:</span>
                          <p className="font-semibold text-gray-900">{selectedPatient.medicalHistory}</p>
                        </div>
                        <div>
                          <span className="text-purple-700">Sinh hiệu:</span>
                          <p className="font-semibold text-gray-900">
                            BP: {selectedPatient.vitalSigns.bp}, HR: {selectedPatient.vitalSigns.hr}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Select Specialists */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Chọn chuyên khoa cần hội chẩn</h3>
                      <div className="grid md:grid-cols-2 gap-3">
                        {[
                          { name: 'PGS.TS. Lê Văn A', specialty: 'Tim mạch can thiệp' },
                          { name: 'BS.CKII Nguyễn Thị B', specialty: 'Siêu âm tim' },
                          { name: 'TS. Trần Văn C', specialty: 'Nội tiết' },
                          { name: 'BS. Phạm Thị D', specialty: 'Hồi sức cấp cứu' }
                        ].map((doctor, index) => (
                          <div key={index} className="p-4 border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all cursor-pointer">
                            <div className="flex items-center gap-3">
                              <input type="checkbox" className="size-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                              <div>
                                <h4 className="font-bold text-gray-900">{doctor.name}</h4>
                                <p className="text-sm text-purple-600">{doctor.specialty}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Consultation Details */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Thông tin hội chẩn</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Lý do hội chẩn *</label>
                          <textarea
                            rows={3}
                            placeholder="Mô tả lý do cần hội chẩn, vấn đề cần tư vấn..."
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none font-medium resize-none"
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Ưu tiên</label>
                            <select className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none font-medium bg-white">
                              <option>Thường</option>
                              <option>Khẩn</option>
                              <option>Cấp cứu</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Hình thức</label>
                            <select className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none font-medium bg-white">
                              <option>Trực tiếp</option>
                              <option>Video call</option>
                              <option>Qua hồ sơ</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Thời gian mong muốn</label>
                          <input
                            type="datetime-local"
                            min={new Date().toISOString().slice(0, 16)}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none font-medium"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Câu hỏi cần tư vấn</label>
                          <textarea
                            rows={4}
                            placeholder="Các câu hỏi cụ thể cần hội chẩn, vấn đề cần giải đáp..."
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none font-medium resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 p-6 bg-gray-50">
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowConsultationModal(false)}
                      className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition-all font-medium"
                    >
                      Hủy
                    </button>
                    <button
                      onClick={() => {
                        alert(`Đã gửi yêu cầu hội chẩn cho bệnh nhân ${selectedPatient.patient}`);
                        setShowConsultationModal(false);
                      }}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all font-medium flex items-center justify-center gap-2"
                    >
                      <Check className="size-5" />
                      Gửi yêu cầu hội chẩn
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
