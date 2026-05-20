import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import {
  Bot,
  MessageSquare,
  Send,
  Edit3,
  Play,
  ThumbsUp,
  ThumbsDown,
  Star,
  AlertCircle,
  CheckCircle2,
  Search,
  Filter,
  Eye,
  TrendingUp,
  Users,
  BarChart3,
  Settings,
  HelpCircle,
  X,
  Copy,
  RotateCcw,
  Save,
  Sparkles,
  MessageCircleQuestion,
  FileText,
  Zap
} from 'lucide-react';

export default function ExpertDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [activeView, setActiveView] = useState<'conversations' | 'scripts' | 'test' | 'feedback'>('conversations');
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [showHelp, setShowHelp] = useState(false);
  const [helpContent, setHelpContent] = useState('');
  const [editingScript, setEditingScript] = useState<any>(null);
  const [testMessages, setTestMessages] = useState<any[]>([]);
  const [testInput, setTestInput] = useState('');
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');

  // Data
  const conversations = [
    {
      id: 1,
      user: 'Nguyễn Văn A',
      date: '2026-05-07 09:30',
      messages: [
        { role: 'user', text: 'Tôi bị đau đầu', time: '09:30' },
        { role: 'bot', text: 'Tôi hiểu bạn đang bị đau đầu. Đau đầu ở vị trí nào?', time: '09:30' },
        { role: 'user', text: 'Đau ở thái dương', time: '09:31' },
        { role: 'bot', text: 'Mức độ đau từ 1-10?', time: '09:31' },
        { role: 'user', text: '7 điểm', time: '09:32' }
      ],
      status: 'resolved',
      sentiment: 'positive',
      rating: 5,
      hasError: false
    },
    {
      id: 2,
      user: 'Trần Thị B',
      date: '2026-05-07 10:15',
      messages: [
        { role: 'user', text: 'Tim đập nhanh', time: '10:15' },
        { role: 'bot', text: 'Xin lỗi, tôi không hiểu. Bạn có thể nói rõ hơn không?', time: '10:15' },
        { role: 'user', text: 'Tim tôi đập rất nhanh', time: '10:16' },
        { role: 'bot', text: 'Xin lỗi, tôi vẫn chưa hiểu...', time: '10:16' }
      ],
      status: 'error',
      sentiment: 'negative',
      rating: 2,
      hasError: true
    }
  ];

  const chatbotScripts = [
    {
      id: 1,
      trigger: 'đau đầu',
      response: 'Tôi hiểu bạn đang bị đau đầu. Để tư vấn chính xác, tôi cần hỏi thêm:\n\n1. Đau đầu ở vị trí nào? (trán, thái dương, sau gáy...)\n2. Mức độ đau từ 1-10?\n3. Đã kéo dài bao lâu?\n4. Có kèm theo triệu chứng nào khác không?',
      category: 'Triệu chứng',
      lastModified: '2026-05-05',
      suggestions: ['Gợi ý: Thêm câu hỏi về tiền sử bệnh', 'Gợi ý: Xem xét chuyển sang chuyên khoa Thần kinh']
    },
    {
      id: 2,
      trigger: 'đặt lịch',
      response: 'Tôi có thể giúp bạn đặt lịch khám ngay! Bạn muốn khám chuyên khoa nào?\n\n• Tim mạch\n• Nhi khoa\n• Da liễu\n• Tiêu hóa\n• Hoặc nhập tên chuyên khoa bạn cần',
      category: 'Booking',
      lastModified: '2026-05-03',
      suggestions: ['Gợi ý: Hiển thị lịch trống', 'Gợi ý: Thêm option tìm bác sĩ']
    }
  ];

  const stats = [
    { label: 'Hội thoại hôm nay', value: '127', icon: MessageSquare, color: 'from-blue-500 to-blue-600', trend: '+15%' },
    { label: 'Tỷ lệ thành công', value: '94%', icon: CheckCircle2, color: 'from-green-500 to-green-600', trend: '+3%' },
    { label: 'Lỗi cần xử lý', value: '8', icon: AlertCircle, color: 'from-red-500 to-red-600', trend: '-2' },
    { label: 'Đánh giá TB', value: '4.7/5', icon: Star, color: 'from-yellow-500 to-yellow-600', trend: '+0.2' }
  ];

  const handleAuthenticate = () => {
    setIsAuthenticated(true);
    setTimeout(() => setShowWelcome(false), 2000);
  };

  const handleTestMessage = () => {
    if (!testInput.trim()) return;
    const userMsg = { role: 'user', text: testInput, time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) };
    setTestMessages([...testMessages, userMsg]);
    setTimeout(() => {
      const botResponse = getBotTestResponse(testInput);
      setTestMessages(prev => [...prev, { role: 'bot', text: botResponse, time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) }]);
    }, 1000);
    setTestInput('');
  };

  const getBotTestResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes('đau đầu')) return chatbotScripts[0].response;
    if (lowerInput.includes('đặt lịch')) return chatbotScripts[1].response;
    return 'Xin lỗi, tôi chưa hiểu rõ câu hỏi của bạn. Bạn có thể diễn đạt lại được không?\n\nGợi ý: Thử hỏi về triệu chứng hoặc đặt lịch khám.';
  };

  const showHelpPopup = (view: string) => {
    const helpTexts: any = {
      conversations: 'Xem & phân tích hội thoại: Tại đây bạn có thể xem danh sách hội thoại giữa người dùng và chatbot. Các hội thoại có lỗi sẽ được đánh dấu đỏ để bạn dễ dàng phát hiện và cải thiện.',
      scripts: 'Chỉnh sửa kịch bản: Click vào bất kỳ kịch bản nào để chỉnh sửa. Hệ thống sẽ tự động validate và đưa ra gợi ý cải thiện để chatbot trả lời tốt hơn.',
      test: 'Kiểm thử chatbot: Gửi tin nhắn như người dùng thật để test chatbot. Kết quả sẽ hiển thị ngay lập tức, giúp bạn đánh giá chất lượng trả lời.',
      feedback: 'Thu thập phản hồi: Xem đánh giá và feedback từ người dùng. Sử dụng thông tin này để cải thiện chatbot liên tục.'
    };
    setHelpContent(helpTexts[view] || 'Chức năng đang được phát triển');
    setShowHelp(true);
  };

  // Authentication Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full"
        >
          <div className="text-center mb-8">
            <div className="size-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bot className="size-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Chào mừng Chuyên gia</h1>
            <p className="text-gray-600">Hệ thống quản lý & cải thiện Chatbot AI</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mã chuyên gia</label>
              <input
                type="text"
                placeholder="Nhập mã xác thực..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mật khẩu</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            <button
              onClick={handleAuthenticate}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all font-medium"
            >
              Xác thực & Đăng nhập
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-start gap-3 text-sm text-gray-600">
              <Sparkles className="size-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <p>Bạn sẽ có quyền truy cập vào hệ thống phân tích hội thoại, chỉnh sửa kịch bản chatbot và cải thiện trải nghiệm người dùng.</p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Welcome Screen
  if (showWelcome) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center text-white"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            className="size-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm"
          >
            <Bot className="size-12" />
          </motion.div>
          <h2 className="text-3xl font-bold mb-2">Chào mừng trở lại!</h2>
          <p className="text-xl text-white/90">PGS.TS. Nguyễn Văn An</p>
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="mt-4 text-white/80"
          >
            Đang tải hệ thống...
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // Main Dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Quản lý Chatbot AI</h1>
              <p className="text-gray-600">Phân tích, chỉnh sửa và cải thiện trải nghiệm người dùng</p>
            </div>
            <button
              onClick={() => showHelpPopup(activeView)}
              className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-all flex items-center gap-2"
            >
              <HelpCircle className="size-5" />
              Trợ giúp
            </button>
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
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`size-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="size-6 text-white" />
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  stat.trend.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {stat.trend}
                </span>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="flex border-b border-gray-200 overflow-x-auto">
            {[
              { key: 'conversations', label: 'Hội thoại', icon: MessageSquare },
              { key: 'scripts', label: 'Kịch bản', icon: FileText },
              { key: 'test', label: 'Kiểm thử', icon: Play },
              { key: 'feedback', label: 'Phản hồi', icon: Star }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveView(tab.key as any);
                  showHelpPopup(tab.key);
                }}
                className={`flex-1 px-6 py-4 font-medium transition-all flex items-center justify-center gap-2 whitespace-nowrap ${
                  activeView === tab.key
                    ? 'border-b-2 border-purple-600 text-purple-600 bg-purple-50'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="size-5" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Conversations View */}
            {activeView === 'conversations' && (
              <div className="space-y-4">
                <div className="flex gap-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Tìm hội thoại..."
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
                    />
                  </div>
                  <button className="px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50">
                    <Filter className="size-5 text-gray-600" />
                  </button>
                </div>

                {conversations.map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv)}
                    className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                      conv.hasError
                        ? 'border-red-300 bg-red-50 hover:shadow-lg'
                        : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow-lg'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{conv.user}</h3>
                        <p className="text-sm text-gray-600">{conv.date}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {conv.hasError && (
                          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                            Có lỗi
                          </span>
                        )}
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          conv.sentiment === 'positive' ? 'bg-green-100 text-green-700' :
                          conv.sentiment === 'negative' ? 'bg-red-100 text-red-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {conv.messages.length} tin nhắn
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`size-4 ${i < conv.rating ? 'fill-yellow-500' : ''}`} />
                      ))}
                      <span className="text-gray-600 text-sm ml-2">({conv.rating}/5)</span>
                    </div>
                  </div>
                ))}

                {/* Conversation Detail Modal */}
                <AnimatePresence>
                  {selectedConversation && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                      onClick={() => setSelectedConversation(null)}
                    >
                      <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.9 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
                      >
                        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-2xl font-bold">Chi tiết hội thoại</h3>
                              <p className="text-purple-100">{selectedConversation.user}</p>
                            </div>
                            <button
                              onClick={() => setSelectedConversation(null)}
                              className="p-2 hover:bg-white/20 rounded-lg"
                            >
                              <X className="size-6" />
                            </button>
                          </div>
                        </div>
                        <div className="p-6 overflow-y-auto max-h-[60vh]">
                          <div className="space-y-4">
                            {selectedConversation.messages.map((msg: any, idx: number) => (
                              <div
                                key={idx}
                                className={`flex gap-2 ${msg.role === 'bot' ? 'flex-row' : 'flex-row-reverse'}`}
                              >
                                <div className={`size-8 rounded-full flex items-center justify-center text-white text-sm font-semibold ${
                                  msg.role === 'bot' ? 'bg-purple-600' : 'bg-blue-600'
                                }`}>
                                  {msg.role === 'bot' ? <Bot className="size-4" /> : 'U'}
                                </div>
                                <div className={`max-w-[70%] ${msg.role === 'bot' ? 'text-left' : 'text-right'}`}>
                                  <div className={`inline-block px-4 py-2 rounded-2xl ${
                                    msg.role === 'bot'
                                      ? 'bg-gray-100 text-gray-900'
                                      : 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white'
                                  }`}>
                                    <p className="text-sm whitespace-pre-line">{msg.text}</p>
                                  </div>
                                  <p className="text-xs text-gray-500 mt-1 px-2">{msg.time}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Scripts View */}
            {activeView === 'scripts' && (
              <div className="space-y-4">
                {chatbotScripts.map((script) => (
                  <div key={script.id} className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-purple-300 transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium">
                            Trigger: "{script.trigger}"
                          </span>
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                            {script.category}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">Cập nhật: {script.lastModified}</p>
                      </div>
                      <button
                        onClick={() => setEditingScript(script)}
                        className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-all flex items-center gap-2"
                      >
                        <Edit3 className="size-4" />
                        Chỉnh sửa
                      </button>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Phản hồi hiện tại:</h4>
                      <p className="text-gray-900 whitespace-pre-line">{script.response}</p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Sparkles className="size-4 text-purple-600" />
                        AI Gợi ý cải thiện:
                      </h4>
                      {script.suggestions.map((suggestion, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                          <Zap className="size-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                          <span>{suggestion}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Edit Script Modal */}
                <AnimatePresence>
                  {editingScript && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                      onClick={() => setEditingScript(null)}
                    >
                      <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.9 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full"
                      >
                        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
                          <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-bold">Chỉnh sửa kịch bản</h3>
                            <button onClick={() => setEditingScript(null)} className="p-2 hover:bg-white/20 rounded-lg">
                              <X className="size-6" />
                            </button>
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Từ khóa kích hoạt</label>
                            <input
                              type="text"
                              value={editingScript.trigger}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
                            />
                          </div>
                          <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Nội dung phản hồi</label>
                            <textarea
                              value={editingScript.response}
                              rows={8}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none resize-none"
                            />
                          </div>
                          <div className="flex gap-3">
                            <button
                              onClick={() => setEditingScript(null)}
                              className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all font-medium"
                            >
                              Hủy
                            </button>
                            <button className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all font-medium flex items-center justify-center gap-2">
                              <Save className="size-5" />
                              Lưu thay đổi
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Test View */}
            {activeView === 'test' && (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl p-6 border border-purple-200">
                  <div className="flex items-center gap-3 mb-2">
                    <Play className="size-5 text-purple-600" />
                    <h3 className="font-semibold text-gray-900">Môi trường kiểm thử</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    Gửi tin nhắn để test chatbot như người dùng thật. Kết quả sẽ hiển thị ngay lập tức.
                  </p>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 h-[500px] flex flex-col">
                  <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
                    {testMessages.length === 0 ? (
                      <div className="h-full flex items-center justify-center text-gray-400">
                        <div className="text-center">
                          <MessageCircleQuestion className="size-16 mx-auto mb-4" />
                          <p>Bắt đầu cuộc hội thoại kiểm thử</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {testMessages.map((msg, idx) => (
                          <div key={idx} className={`flex gap-2 ${msg.role === 'bot' ? 'flex-row' : 'flex-row-reverse'}`}>
                            <div className={`size-8 rounded-full flex items-center justify-center text-white ${
                              msg.role === 'bot' ? 'bg-purple-600' : 'bg-blue-600'
                            }`}>
                              {msg.role === 'bot' ? <Bot className="size-4" /> : 'U'}
                            </div>
                            <div className={`max-w-[70%] ${msg.role === 'bot' ? 'text-left' : 'text-right'}`}>
                              <div className={`inline-block px-4 py-2 rounded-2xl ${
                                msg.role === 'bot' ? 'bg-white border border-gray-200' : 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white'
                              }`}>
                                <p className="text-sm whitespace-pre-line">{msg.text}</p>
                              </div>
                              <p className="text-xs text-gray-500 mt-1 px-2">{msg.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="p-4 border-t border-gray-200 bg-white">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={testInput}
                        onChange={(e) => setTestInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleTestMessage()}
                        placeholder="Nhập tin nhắn test..."
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
                      />
                      <button
                        onClick={handleTestMessage}
                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all"
                      >
                        <Send className="size-5" />
                      </button>
                      <button
                        onClick={() => setTestMessages([])}
                        className="px-4 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all"
                      >
                        <RotateCcw className="size-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Feedback View */}
            {activeView === 'feedback' && (
              <div className="space-y-4">
                <button
                  onClick={() => setShowFeedbackModal(true)}
                  className="w-full p-6 bg-gradient-to-r from-purple-100 to-blue-100 border-2 border-purple-200 rounded-xl hover:shadow-lg transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900 mb-1">Gửi phản hồi của bạn</h3>
                      <p className="text-sm text-gray-600">Giúp chúng tôi cải thiện chatbot tốt hơn</p>
                    </div>
                    <Star className="size-8 text-purple-600" />
                  </div>
                </button>

                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { rating: 5, count: 234, percent: 68 },
                    { rating: 4, count: 89, percent: 26 },
                    { rating: 3, count: 12, percent: 4 },
                    { rating: 2, count: 5, percent: 1 },
                    { rating: 1, count: 3, percent: 1 }
                  ].map((item) => (
                    <div key={item.rating} className="bg-white rounded-xl p-4 border border-gray-200">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {[...Array(item.rating)].map((_, i) => (
                            <Star key={i} className="size-4 text-yellow-500 fill-yellow-500" />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">({item.count})</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-purple-600 to-blue-600" style={{ width: `${item.percent}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Feedback Modal */}
                <AnimatePresence>
                  {showFeedbackModal && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                      onClick={() => setShowFeedbackModal(false)}
                    >
                      <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.9 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white rounded-2xl shadow-2xl max-w-md w-full"
                      >
                        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
                          <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-bold">Đánh giá chatbot</h3>
                            <button onClick={() => setShowFeedbackModal(false)} className="p-2 hover:bg-white/20 rounded-lg">
                              <X className="size-6" />
                            </button>
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="mb-6 text-center">
                            <p className="text-gray-600 mb-4">Bạn đánh giá chatbot bao nhiêu sao?</p>
                            <div className="flex justify-center gap-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  onClick={() => setFeedbackRating(star)}
                                  className="hover:scale-110 transition-transform"
                                >
                                  <Star className={`size-10 ${star <= feedbackRating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />
                                </button>
                              ))}
                            </div>
                          </div>
                          <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Chia sẻ thêm về trải nghiệm của bạn (tùy chọn)
                            </label>
                            <textarea
                              value={feedbackText}
                              onChange={(e) => setFeedbackText(e.target.value)}
                              placeholder="Chatbot có giúp ích gì cho bạn? Điều gì cần cải thiện?"
                              rows={4}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none resize-none"
                            />
                          </div>
                          <button
                            onClick={() => {
                              setShowFeedbackModal(false);
                              setFeedbackRating(0);
                              setFeedbackText('');
                            }}
                            className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all font-medium"
                          >
                            Gửi phản hồi
                          </button>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

        {/* Help Popup */}
        <AnimatePresence>
          {showHelp && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => setShowHelp(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl max-w-md w-full"
              >
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-t-2xl">
                  <div className="flex items-center gap-3">
                    <HelpCircle className="size-6" />
                    <h3 className="text-xl font-bold">Hướng dẫn sử dụng</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 leading-relaxed">{helpContent}</p>
                  <button
                    onClick={() => setShowHelp(false)}
                    className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all font-medium"
                  >
                    Đã hiểu
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
