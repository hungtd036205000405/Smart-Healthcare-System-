import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Send, Upload, Image, FileText, Mic, MicOff, X, Video, Calendar, Clock,
  Search, Star, Bot, User, MessageSquare, ChevronRight, CheckCircle2,
  AlertCircle, Paperclip, Phone, Stethoscope, Brain, Activity, Heart,
  Pill, Gauge, Wind, Eye, Bone, Baby, HeartPulse, Ear, Soup
} from 'lucide-react';
import ConsultationUserHeader from '../../components/consultation-user/ConsultationUserHeader';

const specialties = [
  { name: 'Tim mạch', icon: Heart, color: 'from-red-400 to-pink-500' },
  { name: 'Thần kinh', icon: Brain, color: 'from-purple-400 to-indigo-500' },
  { name: 'Hô hấp', icon: Wind, color: 'from-blue-400 to-cyan-500' },
  { name: 'Tiêu hóa', icon: Soup, color: 'from-orange-400 to-yellow-500' },
  { name: 'Cơ xương khớp', icon: Bone, color: 'from-green-400 to-emerald-500' },
  { name: 'Nhi', icon: Baby, color: 'from-pink-400 to-rose-500' },
  { name: 'Da liễu', icon: Eye, color: 'from-amber-400 to-orange-500' },
  { name: 'Tai mũi họng', icon: Ear, color: 'from-teal-400 to-cyan-500' },
  { name: 'Nội tiết', icon: Activity, color: 'from-lime-400 to-green-500' },
  { name: 'Sản phụ khoa', icon: HeartPulse, color: 'from-rose-400 to-pink-500' },
];

const aiSuggestions = [
  { specialty: 'Tim mạch', symptoms: ['Đau ngực', 'Khó thở', 'Tim đập nhanh', 'Mệt mỏi'] },
  { specialty: 'Thần kinh', symptoms: ['Đau đầu', 'Chóng mặt', 'Mất ngủ', 'Lo âu'] },
  { specialty: 'Tiêu hóa', symptoms: ['Đau bụng', 'Buồn nôn', 'Đầy hơi', 'Rối loạn tiêu hóa'] },
  { specialty: 'Hô hấp', symptoms: ['Ho', 'Khó thở', 'Đau họng', 'Sốt nhẹ'] },
  { specialty: 'Da liễu', symptoms: ['Ngứa', 'Phát ban', 'Mụn', 'Nổi mẩn'] },
];

export default function ConsultationUserPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const getTabFromPath = (path: string): 'home' | 'request' | 'chat' | 'schedule' | 'ai' => {
    if (path === '/consultation-user' || path === '/consultation-user/') return 'home';
    if (path.startsWith('/consultation-user/request')) return 'request';
    if (path.startsWith('/consultation-user/chat')) return 'chat';
    if (path.startsWith('/consultation-user/schedule')) return 'schedule';
    if (path.startsWith('/consultation-user/ai')) return 'ai';
    return 'home';
  };

  const tabRoutes: Record<string, string> = {
    home: '/consultation-user',
    request: '/consultation-user/request',
    chat: '/consultation-user/chat',
    schedule: '/consultation-user/schedule',
    ai: '/consultation-user/ai',
  };

  const [activeTab, setActiveTab] = useState<'home' | 'request' | 'chat' | 'schedule' | 'ai'>(getTabFromPath(location.pathname));

  useEffect(() => {
    setActiveTab(getTabFromPath(location.pathname));
  }, [location.pathname]);

  const handleTabClick = (tab: 'home' | 'request' | 'chat' | 'schedule' | 'ai') => {
    setActiveTab(tab);
    navigate(tabRoutes[tab]);
  };

  // Request form state
  const [symptom, setSymptom] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [urgency, setUrgency] = useState<'normal' | 'urgent' | 'emergency'>('normal');
  const [showSuccess, setShowSuccess] = useState(false);

  // Chat state
  const [messages, setMessages] = useState([
    { id: 1, from: 'expert', name: 'PGS.TS. Nguyễn Văn An', avatar: 'NA', text: 'Xin chào! Tôi là PGS.TS. Nguyễn Văn An, chuyên khoa Tim mạch. Bạn cần tư vấn vấn đề gì hôm nay?', time: '09:00' },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showVoice, setShowVoice] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState<any>(null);
  const [showChatWindow, setShowChatWindow] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Schedule state
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedConsultType, setSelectedConsultType] = useState<'video' | 'chat' | 'phone'>('video');
  const [showScheduleSuccess, setShowScheduleSuccess] = useState(false);
  const [appointments, setAppointments] = useState([
    { id: 1, expert: 'PGS.TS. Nguyễn Văn An', specialty: 'Tim mạch', date: '2026-05-30', time: '14:00', type: 'video', status: 'pending' },
  ]);

  // AI chatbot state
  const [aiMessages, setAiMessages] = useState([
    { id: 1, from: 'ai', text: 'Xin chào! Tôi là trợ lý AI MediCare. Bạn đang gặp triệu chứng gì? Mô tả ngắn gọn để tôi có thể gợi ý chuyên khoa phù hợp nhé.', time: 'Bây giờ' },
  ]);
  const [aiInput, setAiInput] = useState('');
  const [aiTyping, setAiTyping] = useState(false);
  const [suggestedSpecialty, setSuggestedSpecialty] = useState<any>(null);
  const aiEndRef = useRef<HTMLDivElement>(null);

  // Stats
  const stats = [
    { label: 'Yêu cầu đã gửi', value: '3', icon: Send, color: 'from-blue-500 to-blue-600' },
    { label: 'Cuộc trò chuyện', value: '8', icon: MessageSquare, color: 'from-green-500 to-green-600' },
    { label: 'Lịch hẹn', value: '2', icon: Calendar, color: 'from-purple-500 to-purple-600' },
    { label: 'Tư vấn hoàn thành', value: '5', icon: CheckCircle2, color: 'from-blue-50 to-cyan-50' },
  ];

  const experts = [
    { id: 1, name: 'PGS.TS. Nguyễn Văn An', specialty: 'Tim mạch', rating: 4.9, reviews: 234, avatar: 'NA', online: true },
    { id: 2, name: 'TS. Trần Thị Bình', specialty: 'Nội tiết', rating: 4.8, reviews: 189, avatar: 'TB', online: true },
    { id: 3, name: 'BS. Lê Minh Cường', specialty: 'Thần kinh', rating: 4.7, reviews: 156, avatar: 'LC', online: false },
    { id: 4, name: 'PGS. Hoàng Thu Dung', specialty: 'Da liễu', rating: 4.9, reviews: 201, avatar: 'HD', online: true },
  ];

  const timeSlots = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    aiEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [aiMessages]);

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const newMsg = { id: Date.now(), from: 'user', text: chatInput, time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, newMsg]);
    setChatInput('');
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now(),
        from: 'expert',
        name: selectedExpert?.name || 'PGS.TS. Nguyễn Văn An',
        avatar: selectedExpert?.avatar || 'NA',
        text: 'Cảm ơn bạn đã chia sẻ. Dựa trên những thông tin này, tôi có thể tư vấn như sau...',
        time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      }]);
    }, 1500);
  };

  const handleSendAiMessage = () => {
    if (!aiInput.trim()) return;
    const newMsg = { id: Date.now(), from: 'user', text: aiInput, time: 'Bây giờ' };
    setAiMessages(prev => [...prev, newMsg]);
    const input = aiInput;
    setAiInput('');
    setAiTyping(true);

    setTimeout(() => {
      setAiTyping(false);
      const matched = aiSuggestions.find(s =>
        s.symptoms.some(sym => input.toLowerCase().includes(sym.toLowerCase()))
      );
      if (matched) {
        setSuggestedSpecialty(matched);
        setAiMessages(prev => [...prev, {
          id: Date.now(),
          from: 'ai',
          text: `Dựa trên triệu chứng "${input}", tôi nhận thấy bạn có thể cần tư vấn về **${matched.specialty}**. Bạn có muốn tôi gợi ý chuyên gia không?`,
          time: 'Bây giờ',
        }]);
      } else {
        setAiMessages(prev => [...prev, {
          id: Date.now(),
          from: 'ai',
          text: 'Cảm ơn bạn đã chia sẻ. Để tư vấn chính xác hơn, bạn có thể mô tả thêm về thời gian xuất hiện triệu chứng, mức độ nghiêm trọng và các triệu chứng đi kèm không?',
          time: 'Bây giờ',
        }]);
      }
    }, 1500);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newImages]);
    }
  };

  const handleSubmitRequest = () => {
    if (!symptom || !selectedSpecialty) return;
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setSymptom('');
      setSelectedSpecialty('');
      setImages([]);
      handleTabClick('home');
    }, 2500);
  };

  const handleBookSchedule = () => {
    if (!selectedDate || !selectedTime || !selectedExpert) return;
    setAppointments(prev => [...prev, {
      id: Date.now(),
      expert: selectedExpert.name,
      specialty: selectedExpert.specialty,
      date: selectedDate,
      time: selectedTime,
      type: selectedConsultType === 'video' ? 'video' : 'chat',
      status: 'pending',
    }]);
    setShowScheduleSuccess(true);
    setTimeout(() => {
      setShowScheduleSuccess(false);
      setSelectedDate('');
      setSelectedTime('');
      setSelectedExpert(null);
      handleTabClick('home');
    }, 2500);
  };

  const tabs = [
    { id: 'home' as const, label: 'Trang chủ' },
    { id: 'request' as const, label: 'Gửi yêu cầu' },
    { id: 'chat' as const, label: 'Chat tư vấn' },
    { id: 'schedule' as const, label: 'Đặt lịch' },
    { id: 'ai' as const, label: 'AI hỗ trợ' },
  ];

  const renderHome = () => (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-8 text-white shadow-lg">
        <h1 className="text-3xl font-bold mb-2">Xin chào, Nguyễn Văn User! 👋</h1>
        <p className="text-blue-100">Chúng tôi luôn sẵn sàng hỗ trợ bạn về sức khỏe. Bạn cần tư vấn gì hôm nay?</p>
        <div className="flex gap-3 mt-6">
          <button onClick={() => handleTabClick('request')} className="px-5 py-2.5 bg-white text-blue-600 rounded-xl font-medium hover:bg-blue-50 transition-all">
            Gửi yêu cầu tư vấn
          </button>
          <button onClick={() => handleTabClick('ai')} className="px-5 py-2.5 bg-white/20 text-white rounded-xl font-medium hover:bg-white/30 transition-all flex items-center gap-2">
            <Bot className="size-4" /> Hỏi AI ngay
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <div className={`size-10 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center mb-3`}>
              <stat.icon className="size-5 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Bot className="size-5 text-blue-600" /> Khảo sát triệu chứng AI
          </h3>
          <p className="text-sm text-gray-600 mb-4">Mô tả triệu chứng của bạn để AI gợi ý chuyên khoa phù hợp.</p>
          <button onClick={() => handleTabClick('ai')} className="w-full px-4 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-medium hover:shadow-lg transition-all">
            Bắt đầu khảo sát
          </button>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar className="size-5 text-green-600" /> Đặt lịch tư vấn
          </h3>
          <p className="text-sm text-gray-600 mb-4">Đặt lịch video call hoặc chat với chuyên gia ngay hôm nay.</p>
          <button onClick={() => handleTabClick('schedule')} className="w-full px-4 py-2.5 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-xl font-medium hover:shadow-lg transition-all">
            Đặt lịch ngay
          </button>
        </div>
      </div>

      {/* Chuyên gia đề xuất */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Chuyên gia đề xuất</h3>
          <button onClick={() => handleTabClick('chat')} className="text-sm text-blue-600 hover:text-blue-700 font-medium">Xem thêm</button>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {experts.slice(0, 4).map((exp) => (
            <div key={exp.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
              onClick={() => { setSelectedExpert(exp); handleTabClick('chat'); setShowChatWindow(true); }}>
              <div className="size-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                {exp.avatar}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 text-sm">{exp.name}</p>
                <p className="text-xs text-gray-600">{exp.specialty}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1">
                    <Star className="size-3 text-yellow-500 fill-yellow-500" />
                    <span className="text-xs font-medium text-gray-900">{exp.rating}</span>
                  </div>
                  <span className="text-xs text-gray-400">({exp.reviews} đánh giá)</span>
                  {exp.online && <span className="size-2 bg-green-500 rounded-full" />}
                </div>
              </div>
              <ChevronRight className="size-4 text-gray-400" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderRequest = () => (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Send className="size-5 text-blue-600" /> Gửi yêu cầu tư vấn
        </h2>

        {/* Chọn chuyên khoa */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-900 mb-3">Chọn chuyên khoa</label>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {specialties.map((spec) => (
              <button
                key={spec.name}
                onClick={() => setSelectedSpecialty(spec.name)}
                className={`p-3 rounded-xl border-2 transition-all text-center ${
                  selectedSpecialty === spec.name
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className={`size-8 bg-gradient-to-br ${spec.color} rounded-lg flex items-center justify-center mx-auto mb-1`}>
                  <spec.icon className="size-4 text-white" />
                </div>
                <p className="text-xs font-medium text-gray-900 leading-tight">{spec.name}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Mô tả triệu chứng */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-900 mb-2">Mô tả triệu chứng</label>
          <textarea
            value={symptom}
            onChange={(e) => setSymptom(e.target.value)}
            placeholder="Mô tả chi tiết các triệu chứng bạn đang gặp: vị trí, thời gian, mức độ..."
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"
          />
        </div>

        {/* Upload hình ảnh */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-900 mb-2">Hình ảnh liên quan (nếu có)</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {images.map((img, i) => (
              <div key={i} className="relative size-20">
                <img src={img} alt="" className="size-20 object-cover rounded-lg" />
                <button onClick={() => setImages(prev => prev.filter((_, idx) => idx !== i))}
                  className="absolute -top-1.5 -right-1.5 size-5 bg-red-500 text-white rounded-full flex items-center justify-center">
                  <X className="size-3" />
                </button>
              </div>
            ))}
            <label className="size-20 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all">
              <Upload className="size-5 text-gray-400" />
              <span className="text-xs text-gray-500 mt-1">Tải lên</span>
              <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} />
            </label>
          </div>
          <p className="text-xs text-gray-500">Hỗ trợ JPG, PNG, WEBP. Tối đa 5 hình ảnh.</p>
        </div>

        {/* Mức độ khẩn cấp */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-900 mb-2">Mức độ khẩn cấp</label>
          <div className="flex gap-3">
            {([['normal', 'Bình thường', 'text-blue-600 bg-blue-50 border-blue-200'], ['urgent', 'Khẩn cấp', 'text-blue-600 bg-blue-50 border-blue-200'], ['emergency', 'Cấp cứu', 'text-red-600 bg-red-50 border-red-200']] as const).map(([val, label, cls]) => (
              <button key={val} onClick={() => setUrgency(val)}
                className={`flex-1 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${urgency === val ? cls : 'border-gray-200 text-gray-600 bg-white hover:border-gray-300'}`}>
                {label}
              </button>
            ))}
          </div>
        </div>

        <button onClick={handleSubmitRequest}
          disabled={!symptom || !selectedSpecialty}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed">
          Gửi yêu cầu tư vấn
        </button>
      </div>

      {/* Success */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
            <CheckCircle2 className="size-12 text-green-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-green-800 mb-1">Gửi yêu cầu thành công!</h3>
            <p className="text-sm text-green-700">Chuyên gia sẽ phản hồi trong vòng 24 giờ.</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lịch sử yêu cầu */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4">Yêu cầu đã gửi</h3>
        <div className="space-y-3">
          {[
            { id: 1, specialty: 'Tim mạch', symptom: 'Đau ngực trái khi gắng sức', status: 'pending', date: '2026-05-27' },
            { id: 2, specialty: 'Da liễu', symptom: 'Phát ban đỏ ở cánh tay', status: 'replied', date: '2026-05-25' },
          ].map((req) => (
            <div key={req.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="font-medium text-gray-900 text-sm">{req.specialty}</p>
                <p className="text-xs text-gray-600 mt-0.5 line-clamp-1">{req.symptom}</p>
                <p className="text-xs text-gray-400 mt-1">{req.date}</p>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                req.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
              }`}>
                {req.status === 'pending' ? 'Chờ phản hồi' : 'Đã phản hồi'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderChat = () => (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Chọn chuyên gia */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <MessageSquare className="size-5 text-blue-600" /> Chat tư vấn
        </h2>
        {!showChatWindow ? (
          <div>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <input type="text" placeholder="Tìm kiếm chuyên gia..." className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
            </div>
            <div className="space-y-2">
              {experts.map((exp) => (
                <button key={exp.id} onClick={() => { setSelectedExpert(exp); setShowChatWindow(true); }}
                  className="w-full flex items-center gap-3 p-4 rounded-xl hover:bg-blue-50 border border-gray-200 hover:border-blue-300 transition-all">
                  <div className="relative">
                    <div className="size-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">{exp.avatar}</div>
                    {exp.online && <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full border-2 border-white" />}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-gray-900">{exp.name}</p>
                    <p className="text-sm text-gray-600">{exp.specialty}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="size-3 text-yellow-500 fill-yellow-500" />
                      <span className="text-xs font-medium text-gray-900">{exp.rating}</span>
                      <span className="text-xs text-gray-400">({exp.reviews} đánh giá)</span>
                    </div>
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${exp.online ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {exp.online ? 'Trực tuyến' : 'Ngoại tuyến'}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
              <button onClick={() => setShowChatWindow(false)} className="p-1.5 hover:bg-gray-100 rounded-lg">
                <ChevronRight className="size-4 text-gray-500 rotate-180" />
              </button>
              <div className="size-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {selectedExpert?.avatar}
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{selectedExpert?.name}</p>
                <p className="text-xs text-gray-500">{selectedExpert?.specialty}</p>
              </div>
              <button onClick={() => handleTabClick('schedule')} className="ml-auto p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-all" title="Đặt lịch video">
                <Video className="size-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="h-96 overflow-y-auto mb-4 space-y-3 px-1">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[75%] flex gap-2 ${msg.from === 'user' ? 'flex-row-reverse' : ''}`}>
                    {msg.from !== 'user' && (
                      <div className="size-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                        {(msg as any).avatar}
                      </div>
                    )}
                    <div>
                      {msg.from !== 'user' && <p className="text-xs text-gray-500 mb-1 font-medium">{(msg as any).name}</p>}
                      <div className={`px-4 py-3 rounded-2xl text-sm ${
                        msg.from === 'user' ? 'bg-blue-600 text-white rounded-br-md' : 'bg-gray-100 text-gray-900 rounded-bl-md'
                      }`}>
                        {msg.text}
                      </div>
                      <p className={`text-xs text-gray-400 mt-1 ${msg.from === 'user' ? 'text-right' : ''}`}>{msg.time}</p>
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-2">
                  <div className="size-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-xs">NA</div>
                  <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-md flex gap-1">
                    {[0,1,2].map(i => <motion.div key={i} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }} className="size-2 bg-gray-400 rounded-full" />)}
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 mb-3">
              <button onClick={() => setShowVoice(!showVoice)} className={`p-2 rounded-lg transition-all ${showVoice ? 'bg-red-100 text-red-600' : 'hover:bg-gray-100 text-gray-500'}`}>
                {isRecording ? <MicOff className="size-4" /> : <Mic className="size-4" />}
              </button>
              <label className="p-2 hover:bg-gray-100 rounded-lg cursor-pointer text-gray-500">
                <Paperclip className="size-4" />
                <input type="file" className="hidden" />
              </label>
              {showVoice && (
                <span className="flex items-center gap-1.5 text-xs text-red-500 font-medium animate-pulse">
                  <span className="size-2 bg-red-500 rounded-full" /> Đang ghi âm...
                </span>
              )}
            </div>

            <div className="flex gap-2">
              <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Nhập tin nhắn..." className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
              <button onClick={handleSendMessage} disabled={!chatInput.trim()} className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50">
                <Send className="size-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderSchedule = () => (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Calendar className="size-5 text-blue-600" /> Đặt lịch tư vấn
        </h2>

        {/* Chọn chuyên gia */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-900 mb-3">Chọn chuyên gia</label>
          <div className="space-y-2">
            {experts.map((exp) => (
              <button key={exp.id} onClick={() => setSelectedExpert(exp)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left ${
                  selectedExpert?.id === exp.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                }`}>
                <div className="size-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-xs">{exp.avatar}</div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 text-sm">{exp.name}</p>
                  <p className="text-xs text-gray-600">{exp.specialty} · ★ {exp.rating}</p>
                </div>
                {exp.online && <span className="size-2 bg-green-500 rounded-full" />}
              </button>
            ))}
          </div>
        </div>

        {/* Hình thức tư vấn */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-900 mb-3">Hình thức tư vấn</label>
          <div className="flex gap-3">
            {([['video', 'Video Call', Video], ['chat', 'Chat', MessageSquare], ['phone', 'Điện thoại', Phone]] as const).map(([val, label, Icon]) => (
              <button key={val} onClick={() => setSelectedConsultType(val)}
                className={`flex-1 flex flex-col items-center gap-2 py-3 rounded-xl border-2 transition-all ${selectedConsultType === val ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                <Icon className={`size-5 ${selectedConsultType === val ? 'text-blue-600' : 'text-gray-500'}`} />
                <span className={`text-sm font-medium ${selectedConsultType === val ? 'text-blue-600' : 'text-gray-600'}`}>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Chọn ngày */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-900 mb-3">Chọn ngày</label>
          <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
        </div>

        {/* Chọn giờ */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-900 mb-3">Chọn giờ</label>
          <div className="grid grid-cols-4 gap-2">
            {timeSlots.map((time) => (
              <button key={time} onClick={() => setSelectedTime(time)}
                className={`py-2 rounded-lg text-sm font-medium transition-all ${selectedTime === time ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-blue-50'}`}>
                {time}
              </button>
            ))}
          </div>
        </div>

        <button onClick={handleBookSchedule} disabled={!selectedDate || !selectedTime || !selectedExpert}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed">
          Xác nhận đặt lịch
        </button>
      </div>

      <AnimatePresence>
        {showScheduleSuccess && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
            <CheckCircle2 className="size-12 text-green-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-green-800 mb-1">Đặt lịch thành công!</h3>
            <p className="text-sm text-green-700">Chuyên gia sẽ xác nhận trong thời gian sớm nhất.</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lịch hẹn hiện tại */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4">Lịch hẹn của bạn</h3>
        <div className="space-y-3">
          {appointments.map((apt) => (
            <div key={apt.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
              <div>
                <p className="font-semibold text-gray-900 text-sm">{apt.expert}</p>
                <p className="text-xs text-gray-600">{apt.specialty}</p>
                <div className="flex items-center gap-3 mt-2 text-xs text-gray-600">
                  <span className="flex items-center gap-1"><Calendar className="size-3" />{apt.date}</span>
                  <span className="flex items-center gap-1"><Clock className="size-3" />{apt.time}</span>
                  <span className="flex items-center gap-1">
                    {apt.type === 'video' ? <Video className="size-3" /> : <MessageSquare className="size-3" />}
                    {apt.type === 'video' ? 'Video' : 'Chat'}
                  </span>
                </div>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${apt.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                {apt.status === 'pending' ? 'Chờ xác nhận' : 'Đã xác nhận'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAI = () => (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* AI Chat */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="size-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
            <Bot className="size-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">AI MediCare Assistant</h2>
            <p className="text-sm text-gray-600">Gợi ý chuyên khoa & đánh giá triệu chứng sơ bộ</p>
          </div>
        </div>

        {/* AI Chat Messages */}
        <div className="h-80 overflow-y-auto mb-4 space-y-3">
          {aiMessages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] flex gap-2 ${msg.from === 'user' ? 'flex-row-reverse' : ''}`}>
                {msg.from === 'ai' && (
                  <div className="size-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                    <Bot className="size-4" />
                  </div>
                )}
                <div>
                  <div className={`px-4 py-3 rounded-2xl text-sm ${
                    msg.from === 'user' ? 'bg-blue-600 text-white rounded-br-md' : 'bg-gray-100 text-gray-900 rounded-bl-md'
                  }`}>
                    {msg.text}
                  </div>
                  <p className={`text-xs text-gray-400 mt-1 ${msg.from === 'user' ? 'text-right' : ''}`}>{msg.time}</p>
                </div>
              </div>
            </div>
          ))}
          {aiTyping && (
            <div className="flex gap-2">
              <div className="size-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white"><Bot className="size-4" /></div>
              <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-md flex gap-1">
                {[0,1,2].map(i => <motion.div key={i} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }} className="size-2 bg-gray-400 rounded-full" />)}
              </div>
            </div>
          )}
          <div ref={aiEndRef} />
        </div>

        {/* Specialty suggestion */}
        {suggestedSpecialty && (
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <p className="text-sm font-medium text-blue-900 mb-3">Chuyên khoa gợi ý: <span className="font-bold">{suggestedSpecialty.specialty}</span></p>
            <div className="flex flex-wrap gap-2 mb-3">
              {suggestedSpecialty.symptoms.map((sym: string) => (
                <span key={sym} className="px-2.5 py-1 bg-white border border-blue-200 rounded-full text-xs text-blue-700">{sym}</span>
              ))}
            </div>
            <button onClick={() => { handleTabClick('request'); setSelectedSpecialty(suggestedSpecialty.specialty); }}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg text-sm font-medium hover:shadow transition-all">
              Gửi yêu cầu tư vấn {suggestedSpecialty.specialty}
            </button>
          </div>
        )}

        <div className="flex gap-2">
          <input value={aiInput} onChange={(e) => setAiInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendAiMessage()}
            placeholder="Mô tả triệu chứng của bạn (ví dụ: đau đầu, chóng mặt, mệt mỏi)..."
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
          <button onClick={handleSendAiMessage} disabled={!aiInput.trim()}
            className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50">
            <Send className="size-4" />
          </button>
        </div>
      </div>

      {/* Gợi ý triệu chứng nhanh */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-3">Triệu chứng phổ biến — nhấn để hỏi AI</h3>
        <div className="flex flex-wrap gap-2">
          {['Đau ngực', 'Chóng mặt', 'Ho kéo dài', 'Đau bụng', 'Mất ngủ', 'Phát ban', 'Khó thở', 'Đau khớp'].map((sym) => (
            <button key={sym} onClick={() => { setAiInput(sym); setTimeout(handleSendAiMessage, 100); }}
              className="px-3 py-1.5 bg-gray-100 hover:bg-blue-50 text-gray-700 hover:text-blue-700 rounded-full text-sm transition-all border border-gray-200 hover:border-blue-300">
              {sym}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-cyan-50/30">
      <ConsultationUserHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'home' && renderHome()}
        {activeTab === 'request' && renderRequest()}
        {activeTab === 'chat' && renderChat()}
        {activeTab === 'schedule' && renderSchedule()}
        {activeTab === 'ai' && renderAI()}
      </div>
    </div>
  );
}
