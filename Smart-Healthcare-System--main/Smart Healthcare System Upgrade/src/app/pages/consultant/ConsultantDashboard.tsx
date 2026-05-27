import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import {
  MessageSquare,
  Video,
  Send,
  Bot,
  Calendar,
  Clock,
  Bell,
  Star,
  Search,
  FileText,
  User,
  Phone,
  Camera,
  Mic,
  X,
  Plus,
  AlertCircle,
  CheckCircle2,
  BookOpen,
  TrendingUp,
  History,
  Settings
} from 'lucide-react';
import ConsultantHeader from '../../components/consultant/ConsultantHeader';

export default function ConsultantDashboard() {
  const [activeView, setActiveView] = useState<'survey' | 'consult' | 'info' | 'history' | 'booking'>('survey');
  const [showAISurvey, setShowAISurvey] = useState(false);
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [surveyStep, setSurveyStep] = useState(1);
  const [surveyData, setSurveyData] = useState<any>({});
  const [showNotifications, setShowNotifications] = useState(false);
  const [showReschedule, setShowReschedule] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [showJoinConfirm, setShowJoinConfirm] = useState(false);

  const stats = [
    { label: 'Lịch tư vấn', value: '3', icon: Calendar, color: 'from-blue-500 to-blue-600' },
    { label: 'Lịch sử tư vấn', value: '12', icon: History, color: 'from-green-500 to-green-600' },
    { label: 'Chuyên gia theo dõi', value: '2', icon: User, color: 'from-purple-500 to-purple-600' },
    { label: 'Thông báo mới', value: '5', icon: Bell, color: 'from-orange-500 to-orange-600' }
  ];

  const consultationHistory = [
    {
      id: 1,
      expert: 'PGS.TS. Nguyễn Văn An',
      specialty: 'Tim mạch',
      date: '2026-05-05',
      type: 'Video Call',
      duration: '30 phút',
      rating: 5,
      notes: 'Tư vấn về huyết áp cao',
      status: 'completed'
    },
    {
      id: 2,
      expert: 'BS. Trần Thị Bình',
      specialty: 'Dinh dưỡng',
      date: '2026-05-03',
      type: 'Chat',
      duration: '45 phút',
      rating: 5,
      notes: 'Chế độ ăn cho người tiểu đường',
      status: 'completed'
    },
    {
      id: 3,
      expert: 'TS. Lê Minh Cường',
      specialty: 'Tâm lý',
      date: '2026-05-01',
      type: 'Video Call',
      duration: '60 phút',
      rating: 4,
      notes: 'Tư vấn căng thẳng công việc',
      status: 'completed'
    }
  ];

  const upcomingAppointments = [
    {
      id: 1,
      expert: 'PGS.TS. Nguyễn Văn An',
      specialty: 'Tim mạch',
      date: '2026-05-10',
      time: '14:00',
      type: 'Video Call',
      status: 'confirmed'
    },
    {
      id: 2,
      expert: 'BS. Phạm Thu Dung',
      specialty: 'Dinh dưỡng',
      date: '2026-05-12',
      time: '10:00',
      type: 'Chat',
      status: 'pending'
    }
  ];

  const notifications = [
    { id: 1, type: 'reminder', text: 'Lịch tư vấn với PGS.TS. Nguyễn Văn An vào 14:00 hôm nay', time: '2 giờ trước', read: false },
    { id: 2, type: 'message', text: 'Bạn có tin nhắn mới từ BS. Trần Thị Bình', time: '5 giờ trước', read: false },
    { id: 3, type: 'rating', text: 'Đánh giá buổi tư vấn với TS. Lê Minh Cường', time: '1 ngày trước', read: true }
  ];

  const diseaseInfo = [
    {
      id: 1,
      title: 'Tăng huyết áp: Nguyên nhân và cách phòng ngừa',
      category: 'Tim mạch',
      views: 15420,
      image: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      title: 'Đái tháo đường type 2: Chế độ ăn uống',
      category: 'Nội tiết',
      views: 12340,
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      title: 'Căng thẳng và sức khỏe tâm thần',
      category: 'Tâm lý',
      views: 10250,
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop'
    }
  ];

  const chatMessages = [
    { id: 1, sender: 'expert', name: 'BS. Trần Thị Bình', text: 'Xin chào, tôi có thể giúp gì cho bạn hôm nay?', time: '14:30' },
    { id: 2, sender: 'user', text: 'Chào bác sĩ, tôi muốn hỏi về chế độ ăn uống', time: '14:31' },
    { id: 3, sender: 'expert', name: 'BS. Trần Thị Bình', text: 'Bạn có thể cho tôi biết thêm về tình trạng sức khỏe hiện tại không?', time: '14:32' }
  ];

  const surveyQuestions = [
    {
      step: 1,
      question: 'Bạn đang gặp vấn đề sức khỏe nào?',
      type: 'multiple',
      options: ['Đau đầu', 'Tim đập nhanh', 'Khó thở', 'Mệt mỏi', 'Khác']
    },
    {
      step: 2,
      question: 'Triệu chứng xuất hiện khi nào?',
      type: 'single',
      options: ['1-3 ngày gần đây', '1 tuần trước', '1 tháng trước', 'Lâu hơn 1 tháng']
    },
    {
      step: 3,
      question: 'Mức độ nghiêm trọng (1-10)?',
      type: 'scale'
    },
    {
      step: 4,
      question: 'Bạn đã thử điều trị gì chưa?',
      type: 'text'
    }
  ];

  const handleNextSurveyStep = () => {
    if (surveyStep < surveyQuestions.length) {
      setSurveyStep(surveyStep + 1);
    } else {
      // Complete survey and show AI recommendations
      setSurveyStep(5);
    }
  };

  const handleJoinSession = (appointment: any) => {
    setSelectedAppointment(appointment);
    setShowJoinConfirm(true);
  };

  const confirmJoinSession = () => {
    setShowJoinConfirm(false);
    if (selectedAppointment?.type === 'Video Call') {
      setShowVideoCall(true);
    } else {
      setShowChat(true);
    }
  };

  const handleReschedule = (appointment: any) => {
    setSelectedAppointment(appointment);
    setShowReschedule(true);
  };

  const confirmReschedule = () => {
    setShowReschedule(false);
    setSelectedAppointment(null);
    alert('Đã gửi yêu cầu đổi lịch! Chuyên gia sẽ xác nhận trong thời gian sớm nhất.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ConsultantHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Chào mừng, Nguyễn Văn A</h1>
              <p className="text-gray-600">Trung tâm tư vấn sức khỏe cá nhân</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowNotifications(true)}
                className="relative p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
              >
                <Bell className="size-6 text-gray-600" />
                <span className="absolute top-1 right-1 size-2.5 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all">
                <Settings className="size-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-all"
            >
              <div className={`size-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
                <stat.icon className="size-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <motion.button
            whileHover={{ scale: 1.02 }}
            onClick={() => setShowAISurvey(true)}
            className="p-6 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-xl shadow-lg hover:shadow-2xl transition-all text-left"
          >
            <Bot className="size-12 mb-4" />
            <h3 className="text-xl font-bold mb-2">Khảo sát AI</h3>
            <p className="text-blue-100">Đánh giá triệu chứng và nhận tư vấn từ AI</p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            onClick={() => setShowChat(true)}
            className="p-6 bg-gradient-to-br from-green-500 to-emerald-500 text-white rounded-xl shadow-lg hover:shadow-2xl transition-all text-left"
          >
            <MessageSquare className="size-12 mb-4" />
            <h3 className="text-xl font-bold mb-2">Chat với chuyên gia</h3>
            <p className="text-green-100">Tư vấn trực tuyến qua tin nhắn</p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            onClick={() => setShowVideoCall(true)}
            className="p-6 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl shadow-lg hover:shadow-2xl transition-all text-left"
          >
            <Video className="size-12 mb-4" />
            <h3 className="text-xl font-bold mb-2">Video Call</h3>
            <p className="text-purple-100">Gặp trực tiếp chuyên gia qua video</p>
          </motion.button>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Appointments */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Lịch tư vấn sắp tới</h2>
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">Xem tất cả</button>
              </div>
              <div className="space-y-4">
                {upcomingAppointments.map((apt) => (
                  <div key={apt.id} className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{apt.expert}</h3>
                        <p className="text-sm text-gray-600">{apt.specialty}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        apt.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {apt.status === 'confirmed' ? 'Đã xác nhận' : 'Chờ xác nhận'}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="size-4" />
                        {new Date(apt.date).toLocaleDateString('vi-VN')}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="size-4" />
                        {apt.time}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        {apt.type === 'Video Call' ? <Video className="size-4" /> : <MessageSquare className="size-4" />}
                        {apt.type}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleJoinSession(apt)}
                        className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all font-medium flex items-center justify-center gap-2"
                      >
                        {apt.type === 'Video Call' ? <Video className="size-4" /> : <MessageSquare className="size-4" />}
                        Tham gia
                      </button>
                      <button
                        onClick={() => handleReschedule(apt)}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all flex items-center gap-2"
                      >
                        <Calendar className="size-4" />
                        Đổi lịch
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Disease Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Thông tin sức khỏe</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {diseaseInfo.map((info) => (
                  <div key={info.id} className="group cursor-pointer">
                    <div className="aspect-video rounded-lg overflow-hidden mb-3">
                      <img src={info.image} alt={info.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">{info.category}</span>
                    <h3 className="font-semibold text-gray-900 mt-2 mb-1 group-hover:text-blue-600 transition-colors">{info.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <BookOpen className="size-4" />
                      {info.views.toLocaleString()} lượt xem
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Consultation History */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Lịch sử tư vấn</h2>
              <div className="space-y-3">
                {consultationHistory.slice(0, 3).map((history) => (
                  <div key={history.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all cursor-pointer">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900 text-sm">{history.expert}</span>
                      <div className="flex items-center gap-1">
                        {[...Array(history.rating)].map((_, i) => (
                          <Star key={i} className="size-3 text-yellow-500 fill-yellow-500" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">{history.notes}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{new Date(history.date).toLocaleDateString('vi-VN')}</span>
                      <span>{history.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Health Tips */}
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="size-5" />
                <h3 className="font-semibold">Gợi ý AI hôm nay</h3>
              </div>
              <p className="text-sm text-white/90 mb-4">
                Dựa trên lịch sử tư vấn, bạn nên chú ý:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 flex-shrink-0 mt-0.5" />
                  <span>Kiểm tra huyết áp định kỳ</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 flex-shrink-0 mt-0.5" />
                  <span>Duy trì chế độ ăn ít muối</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="size-4 flex-shrink-0 mt-0.5" />
                  <span>Tập thể dục 30 phút/ngày</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* AI Survey Modal */}
        <AnimatePresence>
          {showAISurvey && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => setShowAISurvey(false)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full"
              >
                <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Bot className="size-8" />
                      <div>
                        <h3 className="text-2xl font-bold">Khảo sát triệu chứng AI</h3>
                        <p className="text-blue-100">Bước {surveyStep}/4</p>
                      </div>
                    </div>
                    <button onClick={() => setShowAISurvey(false)} className="p-2 hover:bg-white/20 rounded-lg">
                      <X className="size-6" />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  {surveyStep <= 4 ? (
                    <>
                      <h4 className="text-xl font-semibold text-gray-900 mb-6">{surveyQuestions[surveyStep - 1].question}</h4>

                      {surveyQuestions[surveyStep - 1].type === 'multiple' && (
                        <div className="grid grid-cols-2 gap-3 mb-6">
                          {surveyQuestions[surveyStep - 1].options?.map((option, idx) => (
                            <button key={idx} className="p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all text-left">
                              {option}
                            </button>
                          ))}
                        </div>
                      )}

                      {surveyQuestions[surveyStep - 1].type === 'single' && (
                        <div className="space-y-3 mb-6">
                          {surveyQuestions[surveyStep - 1].options?.map((option, idx) => (
                            <button key={idx} className="w-full p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all text-left">
                              {option}
                            </button>
                          ))}
                        </div>
                      )}

                      {surveyQuestions[surveyStep - 1].type === 'scale' && (
                        <div className="mb-6">
                          <div className="flex justify-between mb-2">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                              <button key={num} className="size-12 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all font-semibold">
                                {num}
                              </button>
                            ))}
                          </div>
                          <div className="flex justify-between text-xs text-gray-600">
                            <span>Nhẹ</span>
                            <span>Nặng</span>
                          </div>
                        </div>
                      )}

                      {surveyQuestions[surveyStep - 1].type === 'text' && (
                        <textarea
                          placeholder="Nhập câu trả lời của bạn..."
                          rows={4}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none mb-6"
                        />
                      )}

                      <button
                        onClick={handleNextSurveyStep}
                        className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:shadow-lg transition-all font-medium"
                      >
                        {surveyStep < 4 ? 'Tiếp tục' : 'Hoàn thành'}
                      </button>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <div className="size-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="size-10 text-green-600" />
                      </div>
                      <h4 className="text-2xl font-bold text-gray-900 mb-4">Phân tích hoàn tất!</h4>
                      <div className="bg-blue-50 rounded-xl p-6 mb-6 text-left">
                        <h5 className="font-semibold text-gray-900 mb-3">Kết quả AI:</h5>
                        <ul className="space-y-2 text-sm text-gray-700">
                          <li className="flex items-start gap-2">
                            <AlertCircle className="size-4 text-blue-600 flex-shrink-0 mt-0.5" />
                            <span>Triệu chứng có thể liên quan đến <strong>căng thẳng</strong> hoặc <strong>huyết áp</strong></span>
                          </li>
                          <li className="flex items-start gap-2">
                            <AlertCircle className="size-4 text-blue-600 flex-shrink-0 mt-0.5" />
                            <span>Khuyến nghị tư vấn với chuyên gia <strong>Tim mạch</strong></span>
                          </li>
                          <li className="flex items-start gap-2">
                            <AlertCircle className="size-4 text-blue-600 flex-shrink-0 mt-0.5" />
                            <span>Theo dõi huyết áp hàng ngày và giảm căng thẳng</span>
                          </li>
                        </ul>
                      </div>
                      <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:shadow-lg transition-all font-medium">
                        Đặt lịch với chuyên gia
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Video Call Modal */}
        <AnimatePresence>
          {showVideoCall && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-50"
            >
              <div className="h-full flex flex-col">
                <div className="flex-1 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="size-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-5xl font-bold">BS</span>
                      </div>
                      <h3 className="text-2xl font-semibold mb-2">BS. Trần Thị Bình</h3>
                      <p className="text-gray-400">Đang kết nối...</p>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 w-64 h-48 bg-gray-700 rounded-xl overflow-hidden shadow-2xl border-4 border-white">
                    <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center">
                      <Camera className="size-12 text-gray-400" />
                    </div>
                  </div>
                </div>
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
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Modal */}
        <AnimatePresence>
          {showChat && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => setShowChat(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl h-[600px] flex flex-col overflow-hidden"
              >
                <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="size-12 bg-white/20 rounded-full flex items-center justify-center font-bold text-lg">
                        BS
                      </div>
                      <div>
                        <h3 className="font-semibold">BS. Trần Thị Bình</h3>
                        <div className="flex items-center gap-1 text-sm text-green-100">
                          <div className="size-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span>Đang hoạt động</span>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => setShowChat(false)} className="p-2 hover:bg-white/20 rounded-lg transition-all">
                      <X className="size-5" />
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                  <div className="space-y-4">
                    {chatMessages.map((msg) => (
                      <div key={msg.id} className={`flex gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`size-8 rounded-full flex items-center justify-center text-white text-sm font-semibold ${
                          msg.sender === 'expert' ? 'bg-green-600' : 'bg-blue-600'
                        }`}>
                          {msg.sender === 'expert' ? 'BS' : 'U'}
                        </div>
                        <div className={`max-w-[70%] ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                          <div className={`inline-block px-4 py-2 rounded-2xl ${
                            msg.sender === 'expert'
                              ? 'bg-white text-gray-900 border border-gray-200'
                              : 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white'
                          }`}>
                            <p className="text-sm">{msg.text}</p>
                          </div>
                          <p className="text-xs text-gray-500 mt-1 px-2">{msg.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-200 p-4 bg-white">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && chatMessage && setChatMessage('')}
                      placeholder="Nhập tin nhắn..."
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    />
                    <button
                      onClick={() => chatMessage && setChatMessage('')}
                      className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-xl hover:shadow-lg transition-all"
                    >
                      <Send className="size-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notifications Modal */}
        <AnimatePresence>
          {showNotifications && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => setShowNotifications(false)}
            >
              <motion.div
                initial={{ scale: 0.9, x: 300 }}
                animate={{ scale: 1, x: 0 }}
                exit={{ scale: 0.9, x: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl max-w-md w-full"
              >
                <div className="bg-gradient-to-r from-orange-600 to-amber-500 text-white p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold">Thông báo</h3>
                    <button onClick={() => setShowNotifications(false)} className="p-2 hover:bg-white/20 rounded-lg">
                      <X className="size-5" />
                    </button>
                  </div>
                </div>
                <div className="p-4 max-h-[500px] overflow-y-auto">
                  {notifications.map((notif) => (
                    <div key={notif.id} className={`p-4 mb-3 rounded-lg cursor-pointer transition-all ${
                      notif.read ? 'bg-gray-50' : 'bg-blue-50 border border-blue-200'
                    }`}>
                      <div className="flex items-start gap-3">
                        <div className={`size-10 rounded-full flex items-center justify-center ${
                          notif.type === 'reminder' ? 'bg-blue-100' : notif.type === 'message' ? 'bg-green-100' : 'bg-yellow-100'
                        }`}>
                          {notif.type === 'reminder' ? <Clock className="size-5 text-blue-600" /> :
                           notif.type === 'message' ? <MessageSquare className="size-5 text-green-600" /> :
                           <Star className="size-5 text-yellow-600" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900 mb-1">{notif.text}</p>
                          <p className="text-xs text-gray-500">{notif.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Join Session Confirm Modal */}
        <AnimatePresence>
          {showJoinConfirm && selectedAppointment && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => setShowJoinConfirm(false)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8"
              >
                <div className="text-center">
                  <div className="size-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    {selectedAppointment.type === 'Video Call' ? (
                      <Video className="size-10 text-white" />
                    ) : (
                      <MessageSquare className="size-10 text-white" />
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Tham gia buổi tư vấn</h3>
                  <div className="bg-blue-50 rounded-xl p-4 mb-6 text-left">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Chuyên gia:</span>
                        <span className="font-semibold text-gray-900">{selectedAppointment.expert}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Chuyên môn:</span>
                        <span className="font-semibold text-gray-900">{selectedAppointment.specialty}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Thời gian:</span>
                        <span className="font-semibold text-gray-900">
                          {new Date(selectedAppointment.date).toLocaleDateString('vi-VN')} - {selectedAppointment.time}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Hình thức:</span>
                        <span className="font-semibold text-blue-600">{selectedAppointment.type}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6">
                    Bạn sẵn sàng tham gia buổi tư vấn này?
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowJoinConfirm(false)}
                      className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium"
                    >
                      Hủy
                    </button>
                    <button
                      onClick={confirmJoinSession}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:shadow-lg transition-all font-medium"
                    >
                      Tham gia ngay
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reschedule Modal */}
        <AnimatePresence>
          {showReschedule && selectedAppointment && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => setShowReschedule(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">Đổi lịch tư vấn</h3>
                  <button
                    onClick={() => setShowReschedule(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                  >
                    <X className="size-6" />
                  </button>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="size-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="text-yellow-900 font-medium mb-1">Lịch hẹn hiện tại</p>
                      <p className="text-yellow-700">
                        {selectedAppointment.expert} - {new Date(selectedAppointment.date).toLocaleDateString('vi-VN')} lúc {selectedAppointment.time}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Chọn ngày mới</label>
                    <input
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Chọn giờ mới</label>
                    <select className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-medium bg-white">
                      <option>08:00 - 09:00</option>
                      <option>09:00 - 10:00</option>
                      <option>10:00 - 11:00</option>
                      <option>14:00 - 15:00</option>
                      <option>15:00 - 16:00</option>
                      <option>16:00 - 17:00</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Lý do đổi lịch (tùy chọn)</label>
                    <textarea
                      rows={3}
                      placeholder="Nhập lý do đổi lịch của bạn..."
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-medium resize-none"
                    />
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="size-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-blue-900">
                      Yêu cầu đổi lịch sẽ được gửi đến chuyên gia. Bạn sẽ nhận được thông báo khi chuyên gia xác nhận.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowReschedule(false)}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={confirmReschedule}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:shadow-lg transition-all font-medium"
                  >
                    Gửi yêu cầu
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
