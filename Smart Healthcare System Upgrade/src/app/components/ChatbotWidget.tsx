import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Minimize2, Bot, User } from 'lucide-react';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'bot' | 'user'; content: string; time: string }>>([
    {
      role: 'bot',
      content: 'Xin chào! Tôi là trợ lý AI của MediCare. Tôi có thể giúp bạn:\n\n• Tìm kiếm bác sĩ phù hợp\n• Sàng lọc triệu chứng\n• Đặt lịch khám\n• Trả lời câu hỏi về sức khỏe\n\nBạn đang gặp vấn đề gì về sức khỏe?',
      time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      role: 'user' as const,
      content: inputMessage,
      time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = getBotResponse(inputMessage);
      setMessages((prev) => [
        ...prev,
        {
          role: 'bot',
          content: botResponse,
          time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('đau đầu') || lowerMessage.includes('đau') || lowerMessage.includes('nhức đầu')) {
      return 'Tôi hiểu bạn đang bị đau đầu. Để tư vấn chính xác, tôi cần hỏi thêm:\n\n1. Đau đầu ở vị trí nào? (trán, thái dương, sau gáy...)\n2. Mức độ đau từ 1-10?\n3. Đã kéo dài bao lâu?\n4. Có kèm theo triệu chứng nào khác không? (buồn nôn, chóng mặt...)\n\nDựa trên thông tin này, tôi sẽ gợi ý chuyên khoa phù hợp cho bạn.';
    }

    if (lowerMessage.includes('đặt lịch') || lowerMessage.includes('đặt hẹn') || lowerMessage.includes('booking')) {
      return 'Tôi có thể giúp bạn đặt lịch khám ngay! Bạn muốn khám chuyên khoa nào?\n\n• Tim mạch\n• Nhi khoa\n• Da liễu\n• Tiêu hóa\n• Thần kinh\n• Hoặc nhập tên chuyên khoa bạn cần';
    }

    if (lowerMessage.includes('tim mạch') || lowerMessage.includes('tim')) {
      return 'Chúng tôi có 24 bác sĩ chuyên khoa Tim mạch. Một số bác sĩ được đánh giá cao:\n\n⭐ BS. Nguyễn Văn An (4.9/5) - 15 năm kinh nghiệm\n⭐ BS. Trần Thị Bình (5.0/5) - 12 năm kinh nghiệm\n\nBạn có muốn xem lịch khám của bác sĩ nào không?';
    }

    if (lowerMessage.includes('giá') || lowerMessage.includes('chi phí') || lowerMessage.includes('phí')) {
      return 'Chi phí khám tại MediCare:\n\n• Khám tổng quát: 200,000đ - 300,000đ\n• Khám chuyên khoa: 300,000đ - 500,000đ\n• Tư vấn trực tuyến: 150,000đ - 250,000đ\n• Gói khám sức khỏe: từ 1,500,000đ\n\nBạn muốn biết chi tiết về dịch vụ nào?';
    }

    return 'Cảm ơn bạn đã chia sẻ. Để tư vấn chính xác hơn, bạn có thể:\n\n• Mô tả chi tiết hơn về triệu chứng\n• Cho biết bạn cần tư vấn về chuyên khoa nào\n• Hoặc chat trực tiếp với bác sĩ\n\nTôi luôn sẵn sàng hỗ trợ bạn! 😊';
  };

  const quickQuestions = [
    'Tôi bị đau đầu',
    'Đặt lịch khám tim mạch',
    'Chi phí khám bao nhiêu?',
    'Tư vấn trực tuyến'
  ];

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 size-16 bg-gradient-to-br from-blue-600 to-cyan-500 text-white rounded-full shadow-2xl flex items-center justify-center z-50 hover:shadow-blue-500/50 transition-shadow"
          >
            <MessageSquare className="size-7" />
            <span className="absolute -top-1 -right-1 size-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold animate-pulse">
              1
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-200"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-4 text-white">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="size-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Bot className="size-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Trợ lý AI MediCare</h3>
                    <div className="flex items-center gap-1 text-xs">
                      <span className="size-2 bg-green-400 rounded-full animate-pulse"></span>
                      <span className="text-white/90">Đang hoạt động</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <Minimize2 className="size-4" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                    >
                      <div className={`size-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.role === 'bot'
                          ? 'bg-gradient-to-br from-blue-600 to-cyan-500'
                          : 'bg-gradient-to-br from-gray-600 to-gray-700'
                      }`}>
                        {message.role === 'bot' ? (
                          <Bot className="size-4 text-white" />
                        ) : (
                          <User className="size-4 text-white" />
                        )}
                      </div>
                      <div className={`flex-1 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                        <div
                          className={`inline-block max-w-[80%] p-3 rounded-2xl ${
                            message.role === 'bot'
                              ? 'bg-white text-gray-900 border border-gray-200'
                              : 'bg-gradient-to-br from-blue-600 to-cyan-500 text-white'
                          }`}
                        >
                          <p className="text-sm whitespace-pre-line">{message.content}</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 px-2">{message.time}</p>
                      </div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex gap-3"
                    >
                      <div className="size-8 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
                        <Bot className="size-4 text-white" />
                      </div>
                      <div className="bg-white border border-gray-200 rounded-2xl p-4">
                        <div className="flex gap-1">
                          <span className="size-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                          <span className="size-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                          <span className="size-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Questions */}
                {messages.length === 1 && (
                  <div className="px-4 py-3 bg-white border-t border-gray-200">
                    <p className="text-xs text-gray-600 mb-2">Câu hỏi thường gặp:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {quickQuestions.map((question, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setInputMessage(question);
                            setTimeout(() => handleSendMessage(), 100);
                          }}
                          className="px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-medium transition-colors text-left"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input */}
                <div className="p-4 bg-white border-t border-gray-200">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Nhập tin nhắn..."
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim()}
                      className="px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="size-5" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
