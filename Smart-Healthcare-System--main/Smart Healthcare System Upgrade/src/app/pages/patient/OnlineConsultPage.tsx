import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Video, VideoOff, Mic, MicOff, Phone, Send, Image, FileText,
  Maximize2, Minimize2, MoreVertical, Clock, User, Heart
} from 'lucide-react';
import PatientHeader from '../../components/patient/PatientHeader';

interface Message {
  id: number;
  sender: 'patient' | 'doctor';
  text: string;
  time: string;
  image?: string;
}

export default function OnlineConsultPage() {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: 'doctor', text: 'Xin chào! Tôi là BS. Nguyễn Văn An. Bạn có thể cho tôi biết triệu chứng hiện tại không?', time: '09:00' },
    { id: 2, sender: 'patient', text: 'Dạ bác sĩ ơi, em bị đau đầu liên tục 2 ngày nay, kèm theo chóng mặt.', time: '09:01' },
    { id: 3, sender: 'doctor', text: 'Cảm ơn bạn. Bạn có thể cho tôi biết mức độ đau như thế nào? (nhẹ, vừa, nặng) và có bị buồn nôn không?', time: '09:02' },
    { id: 4, sender: 'patient', text: 'Mức độ vừa thôi bác ạ, không bị buồn nôn nhưng hơi mệt.', time: '09:02' },
  ]);
  const [documents, setDocuments] = useState([
    { id: 1, name: 'KQXN_Mau_050526.pdf', type: 'pdf', size: '1.2 MB' },
    { id: 2, name: 'Hinh_chup_Xquang.jpg', type: 'image', size: '3.5 MB' },
  ]);
  const [showChat, setShowChat] = useState(true);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setCallDuration((d) => d + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    const newMsg: Message = {
      id: Date.now(),
      sender: 'patient',
      text: messageInput,
      time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([...messages, newMsg]);
    setMessageInput('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newDocs = Array.from(files).map((file) => ({
        id: Date.now() + Math.random(),
        name: file.name,
        type: file.type.includes('pdf') ? 'pdf' : 'image',
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      }));
      setDocuments([...documents, ...newDocs]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <PatientHeader />
      <div className="h-[calc(100vh-120px)] flex gap-3 p-3">
        {/* Video Area */}
        <div className={`flex flex-col bg-gray-800 rounded-2xl overflow-hidden ${showChat ? 'flex-1' : 'w-full'}`}>
          {/* Main Video */}
          <div className="flex-1 relative">
            {isVideoOn ? (
              <div className="w-full h-full bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900 flex items-center justify-center">
                <div className="text-center">
                  <div className="size-32 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="size-16 text-white/50" />
                  </div>
                  <p className="text-white/70">Đang kết nối camera...</p>
                </div>
              </div>
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <div className="text-center">
                  <div className="size-32 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl font-bold text-white">NVA</span>
                  </div>
                  <p className="text-white/70">Camera đang tắt</p>
                </div>
              </div>
            )}

            {/* Doctor Video (small) */}
            <div className="absolute bottom-4 right-4 w-48 h-36 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl overflow-hidden shadow-2xl border-2 border-white/20">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="size-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-1">
                    <Heart className="size-6 text-white/50" />
                  </div>
                  <p className="text-white/70 text-xs">BS. An</p>
                </div>
              </div>
              <div className="absolute top-2 left-2 px-2 py-0.5 bg-green-500 rounded-full text-white text-xs font-medium flex items-center gap-1">
                <div className="size-1.5 bg-white rounded-full" />
                Live
              </div>
            </div>

            {/* Call Duration */}
            <div className="absolute top-4 left-4 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full flex items-center gap-2">
              <div className="size-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-white font-mono text-sm">{formatDuration(callDuration)}</span>
            </div>

            {/* Fullscreen Button */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-lg text-white hover:bg-black/70 transition-colors"
            >
              {isFullscreen ? <Minimize2 className="size-5" /> : <Maximize2 className="size-5" />}
            </button>
          </div>

          {/* Controls */}
          <div className="p-4 bg-gray-900/80 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setIsMicOn(!isMicOn)}
                className={`size-14 rounded-full flex items-center justify-center transition-all ${
                  isMicOn ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-red-500 text-white'
                }`}
              >
                {isMicOn ? <Mic className="size-6" /> : <MicOff className="size-6" />}
              </button>

              <button
                onClick={() => setIsVideoOn(!isVideoOn)}
                className={`size-14 rounded-full flex items-center justify-center transition-all ${
                  isVideoOn ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-red-500 text-white'
                }`}
              >
                {isVideoOn ? <Video className="size-6" /> : <VideoOff className="size-6" />}
              </button>

              <button
                className="size-14 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-all"
              >
                <Phone className="size-6 rotate-[135deg]" />
              </button>

              <button
                onClick={() => setShowChat(!showChat)}
                className={`size-14 rounded-full flex items-center justify-center transition-all ${
                  showChat ? 'bg-blue-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <Send className="size-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Chat Panel */}
        {showChat && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 380, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-96 bg-white rounded-2xl flex flex-col overflow-hidden"
          >
            {/* Chat Header */}
            <div className="p-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Heart className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">BS. Nguyễn Văn An</h3>
                    <p className="text-xs text-blue-100">Tim mạch - Online</p>
                  </div>
                </div>
                <button className="p-1 hover:bg-white/20 rounded-lg transition-colors">
                  <MoreVertical className="size-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'patient' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] ${msg.sender === 'patient' ? 'order-2' : 'order-1'}`}>
                    <div
                      className={`px-4 py-3 rounded-2xl text-sm ${
                        msg.sender === 'patient'
                          ? 'bg-blue-600 text-white rounded-br-md'
                          : 'bg-gray-100 text-gray-900 rounded-bl-md'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <p className={`text-xs text-gray-400 mt-1 ${msg.sender === 'patient' ? 'text-right' : ''}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Documents */}
            {documents.length > 0 && (
              <div className="px-4 py-2 border-t border-gray-100">
                <p className="text-xs text-gray-500 mb-2 font-medium">Tài liệu đã gửi</p>
                <div className="flex flex-wrap gap-2">
                  {documents.map((doc) => (
                    <div key={doc.id} className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-200">
                      {doc.type === 'pdf' ? (
                        <FileText className="size-4 text-red-500" />
                      ) : (
                        <Image className="size-4 text-blue-500" />
                      )}
                      <span className="text-xs text-gray-700">{doc.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Nhập tin nhắn..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                />
                <input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="doc-upload"
                />
                <label htmlFor="doc-upload" className="p-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl cursor-pointer transition-colors flex items-center justify-center">
                  <Image className="size-5 text-gray-600" />
                </label>
                <button
                  onClick={handleSendMessage}
                  className="p-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <Send className="size-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
