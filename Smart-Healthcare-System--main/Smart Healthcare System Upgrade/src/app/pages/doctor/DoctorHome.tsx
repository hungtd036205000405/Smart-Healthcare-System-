import { motion, AnimatePresence } from 'motion/react';
import {
  Users, Calendar, Clock, MessageSquare, CheckCircle2,
  AlertCircle, Video, ChevronRight, Activity, X, Phone,
  Mic, Camera, PhoneOff, Maximize2, Minimize2, MessageCircle,
  ScreenShare, MoreVertical, User, Heart, Thermometer,
  Droplets
} from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import DoctorHeader from '../../components/doctor/DoctorHeader';

export default function DoctorHome() {
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'all' | 'waiting' | 'in-progress' | 'completed'>('all');
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showAISuggestions, setShowAISuggestions] = useState(true);

  // Video call states
  const [callStatus, setCallStatus] = useState<'idle' | 'connecting' | 'connected' | 'ended'>('idle');
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [callMessages, setCallMessages] = useState<{id: number; sender: string; text: string; time: string}[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [todayAppointments, setTodayAppointments] = useState([
    { id: 1, patient: 'Nguyễn Văn A', age: 45, time: '09:00', status: 'waiting', reason: 'Khám định kỳ tim mạch', symptoms: 'Đau ngực, khó thở khi gắng sức', priority: 'normal', medicalHistory: 'Tiền sử cao huyết áp, đang điều trị', allergies: ['Penicillin'], vitalSigns: { bp: '140/90', hr: '85', temp: '37.0' } },
    { id: 2, patient: 'Trần Thị B', age: 32, time: '09:30', status: 'in-progress', reason: 'Tái khám', symptoms: 'Theo dõi sau phẫu thuật', priority: 'high', medicalHistory: 'Phẫu thuật tim 3 tháng trước', allergies: [], vitalSigns: { bp: '120/80', hr: '72', temp: '36.5' } },
    { id: 3, patient: 'Lê Văn C', age: 58, time: '10:00', status: 'waiting', reason: 'Khám bệnh mới', symptoms: 'Tim đập nhanh, mệt mỏi', priority: 'urgent', medicalHistory: 'Không có tiền sử bệnh lý', allergies: ['Aspirin'], vitalSigns: { bp: '150/95', hr: '95', temp: '36.8' } },
    { id: 4, patient: 'Phạm Thị D', age: 67, time: '10:30', status: 'completed', reason: 'Tư vấn trực tuyến', symptoms: 'Huyết áp cao', priority: 'normal', medicalHistory: 'Đái tháo đường type 2', allergies: [], vitalSigns: { bp: '145/92', hr: '78', temp: '36.6' } },
  ]);

  const filteredAppointments = todayAppointments.filter(apt => filterStatus === 'all' || apt.status === filterStatus);

  const stats = [
    { label: 'Bệnh nhân hôm nay', value: todayAppointments.length, icon: Users, color: 'from-blue-500 to-blue-600' },
    { label: 'Đang chờ khám', value: todayAppointments.filter(a => a.status === 'waiting').length, icon: Clock, color: 'from-orange-500 to-orange-600' },
    { label: 'Đã hoàn thành', value: todayAppointments.filter(a => a.status === 'completed').length, icon: CheckCircle2, color: 'from-green-500 to-green-600' },
    { label: 'Tin nhắn mới', value: 3, icon: MessageSquare, color: 'from-purple-500 to-purple-600' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'waiting': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'in-progress': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'waiting': return 'Đang chờ';
      case 'in-progress': return 'Đang khám';
      case 'completed': return 'Hoàn thành';
      default: return 'Chưa xác nhận';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'border-l-4 border-l-red-500';
      case 'high': return 'border-l-4 border-l-orange-500';
      default: return 'border-l-4 border-l-blue-500';
    }
  };

  const startVideoCall = (patient: any) => {
    setSelectedPatient(patient);
    setShowVideoCall(true);
    setCallStatus('connecting');
    setCallDuration(0);
    setCallMessages([]);
    setIsMuted(false);
    setIsCameraOff(false);
    setIsScreenSharing(false);
    setShowChat(false);

    // Simulate connecting
    setTimeout(() => {
      setCallStatus('connected');
      timerRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }, 2500);
  };

  const handleStatusChange = (id: number, newStatus: 'waiting' | 'in-progress' | 'completed') => {
    setTodayAppointments(prev => prev.map(apt => apt.id === id ? { ...apt, status: newStatus } : apt));
  };

  const endCall = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setCallStatus('ended');
    setTimeout(() => {
      setShowVideoCall(false);
      setCallStatus('idle');
      setSelectedPatient(null);
    }, 1500);
  };

  const sendCallMessage = () => {
    if (!newMessage.trim()) return;
    const now = new Date();
    setCallMessages(prev => [...prev, {
      id: Date.now(),
      sender: 'doctor',
      text: newMessage,
      time: `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`,
    }]);
    setNewMessage('');
    // Auto reply after 2s
    setTimeout(() => {
      setCallMessages(prev => [...prev, {
        id: Date.now(),
        sender: 'patient',
        text: 'Em đã nghe rồi ạ!',
        time: `${new Date().getHours().toString().padStart(2, '0')}:${new Date().getMinutes().toString().padStart(2, '0')}`,
      }]);
    }, 2000);
  };

  const formatDuration = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div>
      <DoctorHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Chào BS. Nguyễn Văn An</h1>
          <p className="text-gray-600">
            Hôm nay, {new Date().toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white rounded-xl p-5 shadow-sm border border-gray-200"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`size-10 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="size-5 text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
              </div>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Filter */}
            <div className="flex gap-2">
              {[
                { key: 'all', label: 'Tất cả' },
                { key: 'waiting', label: 'Đang chờ' },
                { key: 'in-progress', label: 'Đang khám' },
                { key: 'completed', label: 'Hoàn thành' },
              ].map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilterStatus(f.key as any)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    filterStatus === f.key
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Appointments List */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="font-semibold text-gray-900">Ca khám hôm nay</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {filteredAppointments.map((apt) => (
                  <motion.div
                    key={apt.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => setSelectedPatient(apt)}
                    className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${getPriorityColor(apt.priority)}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="size-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {apt.patient.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-gray-900">{apt.patient}</h3>
                            {apt.allergies.length > 0 && (
                              <span className="px-1.5 py-0.5 bg-red-100 text-red-700 rounded text-xs font-medium border border-red-200">
                                Dị ứng: {apt.allergies[0]}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-sm text-gray-500 mt-0.5">
                            <span>{apt.age} tuổi</span>
                            <span>·</span>
                            <span>{apt.time}</span>
                            <span>·</span>
                            <span>{apt.reason}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(apt.status)}`}>
                          {getStatusText(apt.status)}
                        </span>
                        <button
                          onClick={(e) => { e.stopPropagation(); startVideoCall(apt); }}
                          className="p-2 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition-all"
                          title="Gọi video"
                        >
                          <Video className="size-4" />
                        </button>
                      </div>
                    </div>
                    {selectedPatient?.id === apt.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        className="mt-3 pt-3 border-t border-gray-100"
                      >
                        <div className="grid md:grid-cols-2 gap-3">
                          <div className="bg-gray-50 rounded-xl p-3">
                            <p className="text-xs font-semibold text-gray-500 mb-1">Triệu chứng</p>
                            <p className="text-sm text-gray-800">{apt.symptoms}</p>
                          </div>
                          <div className="bg-gray-50 rounded-xl p-3">
                            <p className="text-xs font-semibold text-gray-500 mb-1">Tiền sử</p>
                            <p className="text-sm text-gray-800">{apt.medicalHistory}</p>
                          </div>
                        </div>
                        <div className="mt-2 bg-red-50 rounded-xl p-3 border border-red-100">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1 text-xs text-red-700">
                              <Heart className="size-3" />
                              <span>BP: {apt.vitalSigns.bp}</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-red-700">
                              <Activity className="size-3" />
                              <span>HR: {apt.vitalSigns.hr} bpm</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-red-700">
                              <Thermometer className="size-3" />
                              <span>{apt.vitalSigns.temp}°C</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <button
                            onClick={(e) => { e.stopPropagation(); startVideoCall(apt); }}
                            className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all text-sm font-medium flex items-center gap-2"
                          >
                            <Video className="size-4" />
                            Gọi video
                          </button>
                          <button
                            onClick={() => window.location.href = '/doctor/exam'}
                            className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all text-sm font-medium flex items-center gap-2"
                          >
                            <Activity className="size-4" />
                            Bắt đầu khám
                          </button>
                          {apt.status === 'waiting' && (
                            <button
                              onClick={(e) => { e.stopPropagation(); handleStatusChange(apt.id, 'in-progress'); }}
                              className="px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all text-sm font-medium"
                            >
                              Đang khám
                            </button>
                          )}
                          {apt.status === 'in-progress' && (
                            <button
                              onClick={(e) => { e.stopPropagation(); handleStatusChange(apt.id, 'completed'); }}
                              className="px-4 py-2 bg-green-700 text-white rounded-xl hover:bg-green-800 transition-all text-sm font-medium"
                            >
                              Hoàn thành
                            </button>
                          )}
                          {apt.status === 'completed' && (
                            <button
                              onClick={(e) => { e.stopPropagation(); handleStatusChange(apt.id, 'waiting'); }}
                              className="px-4 py-2 bg-gray-400 text-white rounded-xl hover:bg-gray-500 transition-all text-sm font-medium"
                            >
                              Đặt lại
                            </button>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-4">
            {/* AI Diagnosis Suggestion - Toggle */}
            <button
              onClick={() => setShowAISuggestions(!showAISuggestions)}
              className={`w-full bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl p-5 text-white text-left transition-all hover:shadow-lg ${
                showAISuggestions ? 'ring-2 ring-white/50' : 'opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="size-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <Activity className="size-4 text-white" />
                  </div>
                  <h3 className="font-semibold">AI gợi ý chẩn đoán</h3>
                </div>
                <div className={`size-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  showAISuggestions ? 'bg-white/30' : 'bg-white/10'
                }`}>
                  {showAISuggestions ? '✓' : '✗'}
                </div>
              </div>
            </button>

            {showAISuggestions && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl p-5 text-white -mt-0"
              >
                <div className="bg-white/10 rounded-xl p-3 text-sm">
                  {selectedPatient ? (
                    <div>
                      <p className="text-white/90">
                        Dựa trên triệu chứng <span className="font-semibold text-white">"{selectedPatient.symptoms}"</span> và tiền sử {selectedPatient.medicalHistory.split(' ')[0].toLowerCase()}...
                      </p>
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center gap-1.5">
                          <div className="size-1.5 bg-yellow-400 rounded-full"></div>
                          <span className="text-white/80 text-xs">Có thể: Rối loạn nhịp tim</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="size-1.5 bg-yellow-400 rounded-full"></div>
                          <span className="text-white/80 text-xs">Cân nhắc: Bệnh mạch vành</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-white/70">Chọn bệnh nhân để xem gợi ý AI</p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Thao tác nhanh</h3>
              <div className="space-y-2">
                {[
                  { icon: Activity, label: 'Khám bệnh', color: 'from-green-500 to-emerald-500', href: '/doctor/exam' },
                  { icon: Calendar, label: 'Lịch khám', color: 'from-blue-500 to-cyan-500', href: '/doctor/schedule' },
                  { icon: Users, label: 'Bệnh án', color: 'from-purple-500 to-pink-500', href: '/doctor/records' },
                ].map((action) => (
                  <button
                    key={action.label}
                    onClick={() => window.location.href = action.href}
                    className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all group"
                  >
                    <div className={`size-9 bg-gradient-to-br ${action.color} rounded-lg flex items-center justify-center`}>
                      <action.icon className="size-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{action.label}</span>
                    <ChevronRight className="size-4 text-gray-400 ml-auto" />
                  </button>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <MessageSquare className="size-4 text-purple-600" />
                Tin nhắn mới
              </h3>
              <div className="space-y-2">
                {[
                  { name: 'Nguyễn Văn A', msg: 'Bác sĩ ơi, em bị đau ngực...', time: '2 phút', avatar: 'A' },
                  { name: 'Trần Thị B', msg: 'Em có thể đổi lịch khám...', time: '15 phút', avatar: 'B' },
                  { name: 'Lê Văn C', msg: 'Kết quả xét nghiệm đã có...', time: '1 giờ', avatar: 'C' },
                ].map((msg, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="size-9 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {msg.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-gray-900 truncate">{msg.name}</span>
                        <span className="text-xs text-gray-400">{msg.time}</span>
                      </div>
                      <p className="text-xs text-gray-500 truncate">{msg.msg}</p>
                    </div>
                    {i === 0 && <div className="size-2 bg-green-500 rounded-full flex-shrink-0"></div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ======= VIDEO CALL MODAL ======= */}
      <AnimatePresence>
        {showVideoCall && selectedPatient && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex"
          >
            {/* Main video area */}
            <div className={`flex-1 relative transition-all duration-300 ${showChat ? 'w-2/3' : 'w-full'}`}>
              {/* Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />

              {/* Remote video placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                {callStatus === 'connecting' ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="size-32 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-green-500/30"
                    >
                      <span className="text-5xl font-bold text-white">{selectedPatient.patient.charAt(0)}</span>
                    </motion.div>
                    <h3 className="text-2xl font-semibold text-white mb-1">{selectedPatient.patient}</h3>
                    <motion.p
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="text-green-400 text-sm"
                    >
                      Đang kết nối...
                    </motion.p>
                  </motion.div>
                ) : callStatus === 'connected' ? (
                  <div className="text-center">
                    <div className="size-40 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-green-500/30 border-4 border-green-400/50">
                      <span className="text-6xl font-bold text-white">{selectedPatient.patient.charAt(0)}</span>
                    </div>
                    <h3 className="text-2xl font-semibold text-white mb-1">{selectedPatient.patient}</h3>
                    <p className="text-green-400 text-sm flex items-center justify-center gap-1.5">
                      <span className="size-2 bg-green-400 rounded-full animate-pulse"></span>
                      Đã kết nối · {formatDuration(callDuration)}
                    </p>
                  </div>
                ) : (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center"
                  >
                    <div className="size-24 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <PhoneOff className="size-10 text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-300 mb-1">Cuộc gọi đã kết thúc</h3>
                    <p className="text-gray-500">Thời lượng: {formatDuration(callDuration)}</p>
                  </motion.div>
                )}
              </div>

              {/* Local video (self) */}
              <div className="absolute top-4 right-4 w-56 h-40 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 bg-gray-800">
                {isCameraOff ? (
                  <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex flex-col items-center justify-center">
                    <div className="size-12 bg-gradient-to-br from-green-600 to-emerald-500 rounded-full flex items-center justify-center mb-2">
                      <span className="text-sm font-bold text-white">NVA</span>
                    </div>
                    <p className="text-xs text-gray-400">Camera đã tắt</p>
                  </div>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex flex-col items-center justify-center">
                    <div className="size-12 bg-gradient-to-br from-green-600 to-emerald-500 rounded-full flex items-center justify-center mb-2">
                      <span className="text-sm font-bold text-white">NVA</span>
                    </div>
                    <p className="text-xs text-gray-400">BS. Nguyễn Văn An</p>
                  </div>
                )}
              </div>

              {/* Patient info bar */}
              {callStatus === 'connected' && (
                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md rounded-2xl p-4 text-white shadow-xl border border-white/10">
                  <div className="text-xs text-gray-300 mb-0.5">Đang gọi với</div>
                  <div className="font-semibold">{selectedPatient.patient}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{selectedPatient.reason}</div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="size-1.5 bg-green-400 rounded-full animate-pulse"></span>
                    <span className="text-xs text-green-400">{formatDuration(callDuration)}</span>
                  </div>
                </div>
              )}

              {/* Bottom controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent pt-12 pb-6 px-6">
                <div className="max-w-2xl mx-auto">
                  {/* Vital signs bar */}
                  {callStatus === 'connected' && (
                    <div className="flex items-center justify-center gap-6 mb-4">
                      <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5">
                        <Heart className="size-3 text-red-400" />
                        <span className="text-xs text-white font-medium">{selectedPatient.vitalSigns.bp}</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5">
                        <Activity className="size-3 text-green-400" />
                        <span className="text-xs text-white font-medium">{selectedPatient.vitalSigns.hr} bpm</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5">
                        <Thermometer className="size-3 text-orange-400" />
                        <span className="text-xs text-white font-medium">{selectedPatient.vitalSigns.temp}°C</span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-center gap-3">
                    {/* Mute */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsMuted(!isMuted)}
                      className={`size-12 backdrop-blur-md rounded-full flex items-center justify-center transition-all shadow-lg border ${
                        isMuted
                          ? 'bg-red-500/80 border-red-400 text-white'
                          : 'bg-white/20 border-white/30 text-white hover:bg-white/30'
                      }`}
                      title={isMuted ? 'Bật tiếng' : 'Tắt tiếng'}
                    >
                      {isMuted ? <X className="size-5" /> : <Mic className="size-5" />}
                    </motion.button>

                    {/* Camera */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsCameraOff(!isCameraOff)}
                      className={`size-12 backdrop-blur-md rounded-full flex items-center justify-center transition-all shadow-lg border ${
                        isCameraOff
                          ? 'bg-red-500/80 border-red-400 text-white'
                          : 'bg-white/20 border-white/30 text-white hover:bg-white/30'
                      }`}
                      title={isCameraOff ? 'Bật camera' : 'Tắt camera'}
                    >
                      {isCameraOff ? <X className="size-5" /> : <Camera className="size-5" />}
                    </motion.button>

                    {/* End call */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={endCall}
                      className="size-14 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-all shadow-lg shadow-red-500/30"
                      title="Kết thúc cuộc gọi"
                    >
                      <PhoneOff className="size-6 text-white" />
                    </motion.button>

                    {/* Chat */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowChat(!showChat)}
                      className={`size-12 backdrop-blur-md rounded-full flex items-center justify-center transition-all shadow-lg border ${
                        showChat
                          ? 'bg-blue-500/80 border-blue-400 text-white'
                          : 'bg-white/20 border-white/30 text-white hover:bg-white/30'
                      }`}
                      title="Tin nhắn"
                    >
                      <MessageCircle className="size-5" />
                    </motion.button>

                    {/* Screen share */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsScreenSharing(!isScreenSharing)}
                      className={`size-12 backdrop-blur-md rounded-full flex items-center justify-center transition-all shadow-lg border ${
                        isScreenSharing
                          ? 'bg-green-500/80 border-green-400 text-white'
                          : 'bg-white/20 border-white/30 text-white hover:bg-white/30'
                      }`}
                      title="Chia sẻ màn hình"
                    >
                      <ScreenShare className="size-5" />
                    </motion.button>

                    {/* More options */}
                    <div className="relative">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowMoreMenu(!showMoreMenu)}
                        className={`size-12 backdrop-blur-md rounded-full flex items-center justify-center transition-all shadow-lg border ${
                          showMoreMenu
                            ? 'bg-blue-500/80 border-blue-400 text-white'
                            : 'bg-white/20 border-white/30 text-white hover:bg-white/30'
                        }`}
                        title="Tùy chọn"
                      >
                        <MoreVertical className="size-5" />
                      </motion.button>
                      {showMoreMenu && (
                        <>
                          <div className="fixed inset-0 z-40" onClick={() => setShowMoreMenu(false)} />
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            className="absolute bottom-full right-0 mb-3 bg-gray-900/95 backdrop-blur-md rounded-xl border border-white/20 shadow-2xl overflow-hidden z-50 min-w-[200px]"
                          >
                            {[
                              { label: 'Ghi âm cuộc gọi', icon: '🎙️' },
                              { label: 'Chia sẻ file', icon: '📁' },
                              { label: 'Ghi chú nhanh', icon: '📝' },
                              { label: 'Cài đặt cuộc gọi', icon: '⚙️' },
                            ].map((item) => (
                              <button
                                key={item.label}
                                onClick={() => { alert(`${item.label} đang được phát triển`); setShowMoreMenu(false); }}
                                className="w-full px-4 py-3 flex items-center gap-3 text-white text-sm hover:bg-white/10 transition-colors"
                              >
                                <span>{item.icon}</span>
                                <span>{item.label}</span>
                              </button>
                            ))}
                          </motion.div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Connecting animation overlay */}
              {callStatus === 'connecting' && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm pt-12 pb-6 px-6">
                  <div className="max-w-2xl mx-auto flex items-center justify-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={endCall}
                      className="size-14 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-all shadow-lg"
                    >
                      <PhoneOff className="size-6 text-white" />
                    </motion.button>
                  </div>
                </div>
              )}
            </div>

            {/* Chat panel */}
            <AnimatePresence>
              {showChat && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 320, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  className="w-80 bg-white border-l border-gray-200 flex flex-col shadow-2xl"
                >
                  {/* Chat header */}
                  <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="size-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-white">{selectedPatient?.patient.charAt(0)}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-gray-900">{selectedPatient?.patient}</h4>
                        <span className="text-xs text-green-500">Đang trò chuyện</span>
                      </div>
                    </div>
                    <button onClick={() => setShowChat(false)} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                      <X className="size-4 text-gray-500" />
                    </button>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {callMessages.length === 0 && (
                      <div className="text-center py-8">
                        <MessageCircle className="size-10 text-gray-300 mx-auto mb-2" />
                        <p className="text-sm text-gray-400">Chưa có tin nhắn nào</p>
                      </div>
                    )}
                    {callMessages.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.sender === 'doctor' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                          msg.sender === 'doctor'
                            ? 'bg-green-600 text-white rounded-br-md'
                            : 'bg-gray-100 text-gray-900 rounded-bl-md'
                        }`}>
                          <p>{msg.text}</p>
                          <p className={`text-xs mt-0.5 ${
                            msg.sender === 'doctor' ? 'text-green-200' : 'text-gray-400'
                          }`}>{msg.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Chat input */}
                  <div className="p-3 border-t border-gray-200 flex items-center gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && sendCallMessage()}
                      placeholder="Nhập tin nhắn..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    />
                    <button
                      onClick={sendCallMessage}
                      className="size-9 bg-green-600 hover:bg-green-700 rounded-xl flex items-center justify-center transition-all"
                    >
                      <Send className="size-4 text-white" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
