import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useEffect, useRef } from 'react';
import {
  Stethoscope, Users, Calendar, Clock, MessageSquare, FileText,
  Video, Phone, Mic, Camera, X, Send, Check, AlertCircle,
  Pill, TestTube, Image as ImageIcon, Save, Activity, Plus, Trash2,
  ChevronLeft, ChevronRight, Wifi, Maximize2
} from 'lucide-react';
import DoctorHeader from '../../components/doctor/DoctorHeader';

export default function DoctorExam() {
  const [examSession, setExamSession] = useState<any>(null);
  const [examTab, setExamTab] = useState<'consultation' | 'chat' | 'vitals'>('consultation');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'patient', text: 'Xin chào bác sĩ, tôi bị đau ngực khi vận động mạnh', time: '09:00' },
    { id: 2, sender: 'doctor', text: 'Chào bạn, bạn bị đau ngực bao lâu rồi?', time: '09:01' },
    { id: 3, sender: 'patient', text: 'Khoảng 2 tuần, cơn đau kéo dài 5-10 phút rồi tự hết', time: '09:02' },
    { id: 4, sender: 'doctor', text: 'Cảm ơn bạn, tôi sẽ tiến hành khám và chẩn đoán', time: '09:03' },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [notes, setNotes] = useState('');
  const [medications, setMedications] = useState<any[]>([]);
  const [labTests, setLabTests] = useState<string[]>([]);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [showLabTestModal, setShowLabTestModal] = useState(false);

  // Video call states
  const [videoOn, setVideoOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [callConnected, setCallConnected] = useState(false);

  const callTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const patients = [
    { id: 1, patient: 'Nguyễn Văn A', age: 45, time: '09:00', status: 'waiting', reason: 'Khám định kỳ tim mạch', symptoms: 'Đau ngực, khó thở khi gắng sức', priority: 'normal', medicalHistory: 'Tiền sử cao huyết áp, đang điều trị', allergies: ['Penicillin'], vitalSigns: { bp: '140/90', hr: '85', temp: '37.0', spo2: '97%', weight: '72kg' } },
    { id: 2, patient: 'Trần Thị B', age: 32, time: '09:30', status: 'in-progress', reason: 'Tái khám', symptoms: 'Theo dõi sau phẫu thuật', priority: 'high', medicalHistory: 'Phẫu thuật tim 3 tháng trước', allergies: [], vitalSigns: { bp: '120/80', hr: '72', temp: '36.5', spo2: '99%', weight: '55kg' } },
    { id: 3, patient: 'Lê Văn C', age: 58, time: '10:00', status: 'waiting', reason: 'Khám bệnh mới', symptoms: 'Tim đập nhanh, mệt mỏi', priority: 'urgent', medicalHistory: 'Không có tiền sử bệnh lý', allergies: ['Aspirin'], vitalSigns: { bp: '150/95', hr: '95', temp: '36.8', spo2: '96%', weight: '68kg' } },
    { id: 4, patient: 'Phạm Thị D', age: 67, time: '10:30', status: 'completed', reason: 'Tư vấn trực tuyến', symptoms: 'Huyết áp cao', priority: 'normal', medicalHistory: 'Đái tháo đường type 2', allergies: [], vitalSigns: { bp: '145/92', hr: '78', temp: '36.6', spo2: '98%', weight: '62kg' } },
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
      default: return 'Chưa xác định';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'border-l-4 border-l-red-500';
      case 'high': return 'border-l-4 border-l-orange-500';
      default: return 'border-l-4 border-l-green-500';
    }
  };

  const formatDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const startExam = (patient: any) => {
    setExamSession(patient);
    setCallConnected(false);
    setCallDuration(0);
    setTimeout(() => setCallConnected(true), 1500);
    callTimerRef.current = setInterval(() => setCallDuration(d => d + 1), 1000);
  };

  const endExam = () => {
    if (callTimerRef.current) clearInterval(callTimerRef.current);
    setExamSession(null);
    setCallConnected(false);
    setCallDuration(0);
    setVideoOn(true);
    setMicOn(true);
    setDiagnosis('');
    setNotes('');
    setMedications([]);
    setLabTests([]);
    setChatMessages(prev => prev.filter(m => m.id <= 4));
    setExamTab('consultation');
  };

  const endCall = () => {
    if (callTimerRef.current) clearInterval(callTimerRef.current);
    setCallConnected(false);
    setCallDuration(0);
  };

  const sendChatMessage = () => {
    if (!chatInput.trim()) return;
    setChatMessages(prev => [...prev, {
      id: Date.now(),
      sender: 'doctor',
      text: chatInput.trim(),
      time: `${new Date().getHours().toString().padStart(2, '0')}:${new Date().getMinutes().toString().padStart(2, '0')}`,
    }]);
    setChatInput('');
  };

  // Render patient list sidebar
  const renderPatientSidebar = () => (
    <div className={`transition-all duration-300 ${sidebarCollapsed ? 'w-16' : 'w-72'} flex-shrink-0`}>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 h-full flex flex-col">
        <div className="p-4 border-b border-gray-200 flex items-center gap-2">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {sidebarCollapsed ? <ChevronRight className="size-4 text-gray-500" /> : <ChevronLeft className="size-4 text-gray-500" />}
          </button>
          {!sidebarCollapsed && (
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">Danh sách bệnh nhân</h3>
              <p className="text-xs text-gray-500">{patients.length} ca khám hôm nay</p>
            </div>
          )}
        </div>

        {!sidebarCollapsed && (
          <div className="divide-y divide-gray-100 max-h-[calc(100vh-220px)] overflow-y-auto flex-1">
            {patients.map((patient) => (
              <div
                key={patient.id}
                className={`p-4 cursor-pointer transition-all ${getPriorityColor(patient.priority)} ${
                  examSession?.id === patient.id ? 'bg-green-50' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="size-9 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {patient.patient.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">{patient.patient}</h4>
                      <p className="text-xs text-gray-500">{patient.age} tuổi</p>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(patient.status)}`}>
                    {getStatusText(patient.status)}
                  </span>
                </div>
                <div className="text-xs text-gray-600 pl-11">
                  <div>{patient.time} - {patient.reason}</div>
                </div>
                {patient.status === 'waiting' && (
                  <button
                    onClick={(e) => { e.stopPropagation(); startExam(patient); }}
                    className="mt-2 w-full px-3 py-1.5 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-lg text-xs font-medium hover:shadow-lg transition-all"
                  >
                    Bắt đầu khám
                  </button>
                )}
                {examSession?.id === patient.id && (
                  <button
                    onClick={(e) => { e.stopPropagation(); endExam(); }}
                    className="mt-2 w-full px-3 py-1.5 bg-red-100 text-red-600 rounded-lg text-xs font-medium hover:bg-red-200 transition-all"
                  >
                    Kết thúc khám
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // Render exam panel (split-screen: video left, tabs right)
  const renderExamPanel = () => {
    const p = examSession;
    return (
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex flex-1 min-h-0" style={{ height: 'calc(100vh - 180px)' }}>
          {/* Left: Video Panel */}
          <div className="w-2/5 flex-shrink-0 bg-gray-900 rounded-2xl overflow-hidden flex flex-col relative">
            {/* Patient video area */}
            <div className="flex-1 relative flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
              {videoOn ? (
                <div className="text-center">
                  <div className="size-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-2xl">
                    <span className="text-3xl font-bold text-white">{p.patient.charAt(0)}</span>
                  </div>
                  <h3 className="text-white font-semibold text-lg">{p.patient}</h3>
                  <p className="text-gray-400 text-sm">{p.reason}</p>
                </div>
              ) : (
                <div className="text-center">
                  <div className="size-24 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Video className="size-10 text-gray-500" />
                  </div>
                  <p className="text-gray-500">Camera đã tắt</p>
                </div>
              )}

              {/* Doctor self-preview */}
              <div className="absolute bottom-4 right-4 w-32 h-24 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl overflow-hidden shadow-lg border-2 border-white/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="size-10 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-1">
                    <span className="text-white font-bold text-sm">BS</span>
                  </div>
                  <p className="text-white text-xs">BS. An</p>
                </div>
              </div>

              {/* Call status */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <div className={`size-2 rounded-full ${callConnected ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'}`} />
                <span className="text-white text-sm font-medium">
                  {callConnected ? 'Đã kết nối' : 'Đang kết nối...'}
                </span>
              </div>

              {/* Duration */}
              <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2">
                <Clock className="size-3.5 text-white" />
                <span className="text-white text-sm font-mono">{formatDuration(callDuration)}</span>
              </div>
            </div>

            {/* Video controls */}
            <div className="bg-gray-900 p-4 flex items-center justify-center gap-3">
              <button
                onClick={() => setMicOn(!micOn)}
                className={`size-12 rounded-full flex items-center justify-center transition-all ${
                  micOn ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-red-600 hover:bg-red-500 text-white'
                }`}
              >
                {micOn ? <Mic className="size-5" /> : <MicOff className="size-5" />}
              </button>
              <button
                onClick={() => setVideoOn(!videoOn)}
                className={`size-12 rounded-full flex items-center justify-center transition-all ${
                  videoOn ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-red-600 hover:bg-red-500 text-white'
                }`}
              >
                {videoOn ? <Camera className="size-5" /> : <Camera className="size-5" />}
              </button>
              <button
                onClick={endCall}
                className="size-12 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center transition-all"
              >
                <Phone className="size-5 rotate-[135deg]" />
              </button>
            </div>
          </div>

          {/* Right: Tabs Panel */}
          <div className="flex-1 flex flex-col min-h-0 ml-4">
            {/* Tab header */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 flex-shrink-0">
              <div className="flex border-b border-gray-200 rounded-t-2xl overflow-hidden">
                {[
                  { key: 'consultation', label: 'Tư vấn', icon: Stethoscope },
                  { key: 'chat', label: 'Tin nhắn', icon: MessageSquare },
                  { key: 'vitals', label: 'Sinh hiệu', icon: Activity },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setExamTab(tab.key as any)}
                    className={`flex-1 px-4 py-3.5 font-medium text-sm transition-all flex items-center justify-center gap-2 ${
                      examTab === tab.key
                        ? 'border-b-2 border-green-600 text-green-600 bg-green-50'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="size-4" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab content */}
            <div className="flex-1 bg-white rounded-b-2xl shadow-sm border border-gray-200 border-t-0 overflow-y-auto mt-0.5">
              <div className="p-4">
                {examTab === 'consultation' && (
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-3">
                      <div className="bg-gray-50 rounded-xl p-3">
                        <h4 className="font-semibold text-gray-900 mb-2 text-sm">Thông tin bệnh nhân</h4>
                        <div className="space-y-1.5 text-sm">
                          <div className="flex justify-between"><span className="text-gray-500">Họ tên:</span><span className="font-medium">{p.patient}</span></div>
                          <div className="flex justify-between"><span className="text-gray-500">Tuổi:</span><span className="font-medium">{p.age}</span></div>
                          <div className="flex justify-between"><span className="text-gray-500">Lý do:</span><span className="font-medium text-xs">{p.reason}</span></div>
                          <div className="flex justify-between"><span className="text-gray-500">Triệu chứng:</span><span className="font-medium text-xs">{p.symptoms}</span></div>
                          {p.allergies.length > 0 && (
                            <div className="flex justify-between"><span className="text-red-500">Dị ứng:</span><span className="font-medium text-red-600 text-xs">{p.allergies.join(', ')}</span></div>
                          )}
                        </div>
                      </div>
                      <div className="bg-blue-50 rounded-xl p-3 border border-blue-200">
                        <h4 className="font-semibold text-gray-900 mb-2 text-sm">Sinh hiệu nhanh</h4>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-white rounded-lg p-2 text-center"><div className="text-xs text-gray-500">Huyết áp</div><div className="font-bold text-sm">{p.vitalSigns.bp}</div></div>
                          <div className="bg-white rounded-lg p-2 text-center"><div className="text-xs text-gray-500">Nhịp tim</div><div className="font-bold text-sm">{p.vitalSigns.hr}</div></div>
                          <div className="bg-white rounded-lg p-2 text-center"><div className="text-xs text-gray-500">Nhiệt độ</div><div className="font-bold text-sm">{p.vitalSigns.temp}</div></div>
                          <div className="bg-white rounded-lg p-2 text-center"><div className="text-xs text-gray-500">SpO2</div><div className="font-bold text-sm">{p.vitalSigns.spo2}</div></div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-3 border border-purple-100">
                      <div className="flex items-center gap-2 mb-1.5">
                        <Activity className="size-4 text-purple-600" />
                        <h4 className="font-semibold text-purple-900 text-sm">AI Gợi ý chẩn đoán</h4>
                      </div>
                      <ul className="space-y-0.5 text-sm text-purple-800">
                        <li>Rối loạn nhịp tim (75%)</li>
                        <li>Thiếu máu cơ tim (60%)</li>
                        <li>Tăng huyết áp (45%)</li>
                      </ul>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Chẩn đoán *</label>
                      <textarea value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} rows={2}
                        placeholder="Nhập chẩn đoán..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-none text-sm" />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-sm font-semibold text-gray-700">Kê đơn thuốc</label>
                        <button onClick={() => setShowPrescriptionModal(true)}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium hover:bg-blue-200 transition-all flex items-center gap-1">
                          <Plus className="size-3" /> Thêm thuốc
                        </button>
                      </div>
                      {medications.length > 0 ? (
                        <div className="space-y-1.5">
                          {medications.map((med, idx) => (
                            <div key={idx} className="p-2.5 bg-green-50 border border-green-200 rounded-xl text-sm">
                              <span className="font-semibold">{med.name}</span>
                              <span className="text-gray-600 ml-2">- {med.dosage} x {med.quantity} - {med.usage}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="h-16 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center text-sm text-gray-400">Chưa có thuốc nào</div>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-sm font-semibold text-gray-700">Xét nghiệm</label>
                        <button onClick={() => setShowLabTestModal(true)}
                          className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-medium hover:bg-green-200 transition-all flex items-center gap-1">
                          <Plus className="size-3" /> Thêm xét nghiệm
                        </button>
                      </div>
                      {labTests.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5">
                          {labTests.map((test, idx) => (
                            <span key={idx} className="px-2.5 py-1 bg-green-50 border border-green-200 rounded-full text-xs font-medium text-green-700">{test}</span>
                          ))}
                        </div>
                      ) : (
                        <div className="h-14 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center text-sm text-gray-400">Chưa có xét nghiệm nào</div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Ghi chú</label>
                      <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2}
                        placeholder="Lời dặn của bác sĩ, lịch tái khám..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-none text-sm" />
                    </div>

                    <button onClick={() => { if (!diagnosis) { alert('Vui lòng nhập chẩn đoán'); return; } alert('Đã lưu phiên khám!'); endExam(); }}
                      className="w-full py-2.5 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-xl hover:shadow-lg transition-all font-medium flex items-center justify-center gap-2 text-sm">
                      <Check className="size-4" /> Lưu &amp; Hoàn thành khám
                    </button>
                  </div>
                )}

                {examTab === 'chat' && (
                  <div className="flex flex-col" style={{ height: 'calc(100vh - 320px)' }}>
                    <div className="flex-1 overflow-y-auto space-y-3 mb-3">
                      {chatMessages.map((msg) => (
                        <div key={msg.id} className={`flex gap-2 ${msg.sender === 'doctor' ? 'flex-row-reverse' : 'flex-row'}`}>
                          <div className={`size-8 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0 ${
                            msg.sender === 'doctor' ? 'bg-green-600' : 'bg-purple-600'
                          }`}>
                            {msg.sender === 'doctor' ? 'BS' : p.patient.charAt(0)}
                          </div>
                          <div className={`max-w-[75%] ${msg.sender === 'doctor' ? 'text-right' : 'text-left'}`}>
                            <div className={`inline-block px-3 py-2 rounded-2xl text-sm ${
                              msg.sender === 'doctor'
                                ? 'bg-gradient-to-r from-green-600 to-emerald-500 text-white'
                                : 'bg-gray-100 text-gray-900 border border-gray-200'
                            }`}>
                              {msg.text}
                            </div>
                            <p className="text-xs text-gray-400 mt-1 px-1">{msg.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') sendChatMessage(); }}
                        placeholder="Nhập tin nhắn..."
                        className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-sm" />
                      <button onClick={sendChatMessage}
                        className="px-4 py-2.5 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-xl hover:shadow-lg transition-all">
                        <Send className="size-4" />
                      </button>
                    </div>
                  </div>
                )}

                {examTab === 'vitals' && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      {[
                        { label: 'Huyết áp', value: p.vitalSigns.bp, unit: 'mmHg', color: 'from-green-50 to-emerald-50 border-green-100' },
                        { label: 'Nhịp tim', value: p.vitalSigns.hr, unit: 'bpm', color: 'from-red-50 to-pink-50 border-red-100' },
                        { label: 'Nhiệt độ', value: p.vitalSigns.temp, unit: '°C', color: 'from-yellow-50 to-amber-50 border-yellow-100' },
                        { label: 'SpO2', value: p.vitalSigns.spo2, unit: '', color: 'from-blue-50 to-cyan-50 border-blue-100' },
                        { label: 'Cân nặng', value: p.vitalSigns.weight, unit: 'kg', color: 'from-purple-50 to-pink-50 border-purple-100' },
                      ].map((vital) => (
                        <div key={vital.label} className={`bg-gradient-to-br ${vital.color} rounded-xl p-4 text-center border`}>
                          <div className="text-xs text-gray-500 mb-1">{vital.label}</div>
                          <div className="text-xl font-bold text-gray-900">{vital.value}</div>
                          <div className="text-xs text-gray-400">{vital.unit}</div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="size-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-yellow-900 text-sm">Cảnh báo</h4>
                          {p.vitalSigns.bp === '150/95' && <p className="text-xs text-yellow-700 mt-1">Huyết áp cao hơn bình thường.</p>}
                          {p.vitalSigns.hr === '95' && <p className="text-xs text-yellow-700 mt-1">Nhịp tim cao (bình thường 60-100 bpm).</p>}
                          {p.allergies.length > 0 && <p className="text-xs text-red-700 mt-1 font-semibold">BN dị ứng: {p.allergies.join(', ')}</p>}
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                      <div className="flex items-start gap-2">
                        <Activity className="size-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-purple-900 text-sm">AI Phân tích</h4>
                          <p className="text-xs text-purple-700 mt-1">Dựa trên sinh hiệu và triệu chứng, bệnh nhân có nguy cơ cao về tim mạch. Khuyến nghị: Xét nghiệm máu, ECG, Siêu âm tim.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render default view (no exam session)
  const renderDefaultView = () => (
    <div className="lg:col-span-2">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 flex items-center justify-center">
        <div className="text-center">
          <div className="size-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Stethoscope className="size-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Chưa có phiên khám</h3>
          <p className="text-sm text-gray-600">Chọn bệnh nhân từ danh sách bên trái và nhấn "Bắt đầu khám" để mở video call</p>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <DoctorHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Khám bệnh</h1>
            <p className="text-gray-600 text-sm">
              {examSession ? `Đang khám: ${examSession.patient}` : 'Tiến hành khám bệnh, nhập chẩn đoán và kê đơn'}
            </p>
          </div>
          {examSession && (
            <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-2">
              <div className="size-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-green-700 font-medium">Đang trong phiên khám</span>
            </div>
          )}
        </div>

        {examSession ? renderExamPanel() : (
          <div className="grid lg:grid-cols-3 gap-6">
            {renderPatientSidebar()}
            {renderDefaultView()}
          </div>
        )}
      </div>

      {/* Prescription Modal */}
      <AnimatePresence>
        {showPrescriptionModal && examSession && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowPrescriptionModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden"
            >
              <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">Kê đơn thuốc</h2>
                    <p className="text-blue-100">BN: {examSession.patient} - {examSession.age} tuổi</p>
                  </div>
                  <button onClick={() => setShowPrescriptionModal(false)} className="p-2 hover:bg-white/20 rounded-lg"><X className="size-6" /></button>
                </div>
              </div>
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                {examSession.allergies.length > 0 && (
                  <div className="mb-4 p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-start gap-2">
                    <AlertCircle className="size-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div><h4 className="font-bold text-red-900 text-sm mb-1">Cảnh báo dị ứng</h4><p className="text-sm text-red-700">BN dị ứng: <strong>{examSession.allergies.join(', ')}</strong></p></div>
                  </div>
                )}
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-5 border-2 border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-3">Thêm thuốc mới</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
                      { label: 'Tên thuốc *', placeholder: 'VD: Paracetamol', id: 'med-name' },
                      { label: 'Liều lượng *', placeholder: 'VD: 500mg', id: 'med-dosage' },
                      { label: 'Số lượng *', placeholder: 'VD: 20 viên', id: 'med-qty' },
                      { label: 'Cách dùng *', placeholder: 'VD: Ngày 2 lần, sau ăn', id: 'med-usage' },
                    ].map((f) => (
                      <div key={f.id}>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">{f.label}</label>
                        <input type="text" id={f.id} placeholder={f.placeholder} className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      const name = (document.getElementById('med-name') as HTMLInputElement)?.value;
                      const dosage = (document.getElementById('med-dosage') as HTMLInputElement)?.value;
                      const qty = (document.getElementById('med-qty') as HTMLInputElement)?.value;
                      const usage = (document.getElementById('med-usage') as HTMLInputElement)?.value;
                      if (name && dosage && qty && usage) {
                        setMedications([...medications, { name, dosage, quantity: qty, usage }]);
                        ['med-name','med-dosage','med-qty','med-usage'].forEach(id => { const el = document.getElementById(id) as HTMLInputElement; if (el) el.value = ''; });
                      } else { alert('Vui lòng điền đầy đủ thông tin'); }
                    }}
                    className="mt-4 w-full px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:shadow-lg transition-all font-medium flex items-center justify-center gap-2 text-sm"
                  >
                    <Plus className="size-4" /> Thêm vào đơn
                  </button>
                </div>
              </div>
              <div className="border-t border-gray-200 p-6 bg-gray-50 flex gap-3 justify-end">
                <button onClick={() => setShowPrescriptionModal(false)} className="px-5 py-2.5 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition-all font-medium">Hủy</button>
                <button onClick={() => { if (medications.length > 0) { setShowPrescriptionModal(false); } else { alert('Vui lòng thêm ít nhất 1 loại thuốc'); }}} className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:shadow-lg transition-all font-medium flex items-center gap-2">
                  <Check className="size-4" /> Lưu đơn thuốc
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lab Test Modal */}
      <AnimatePresence>
        {showLabTestModal && examSession && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowLabTestModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden"
            >
              <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">Yêu cầu xét nghiệm</h2>
                    <p className="text-green-100">BN: {examSession.patient} - {examSession.age} tuổi</p>
                  </div>
                  <button onClick={() => setShowLabTestModal(false)} className="p-2 hover:bg-white/20 rounded-lg"><X className="size-6" /></button>
                </div>
              </div>
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                <div className="grid md:grid-cols-2 gap-2">
                  {[
                    'Công thức máu', 'Đường huyết', 'HbA1c', 'Cholesterol',
                    'Triglycerid', 'HDL-C / LDL-C', 'AST, ALT (gan)', 'Creatinin (thận)',
                    'Acid uric', 'Điện giải đồ', 'TSH (Tuyến giáp)', 'Troponin (Tim mạch)',
                    'D-Dimer', 'Xét nghiệm nước tiểu', 'CRP / ESR', 'X-quang ngực',
                    'Siêu âm tim', 'ECG / Điện tâm đồ', 'Siêu âm bụng', 'CT Scan',
                  ].map((test) => (
                    <button
                      key={test}
                      onClick={() => { if (!labTests.includes(test)) setLabTests([...labTests, test]); }}
                      disabled={labTests.includes(test)}
                      className={`p-2.5 rounded-lg border-2 text-left text-sm font-medium transition-all ${
                        labTests.includes(test)
                          ? 'bg-green-100 border-green-300 text-green-700 cursor-not-allowed'
                          : 'bg-white border-gray-200 text-gray-900 hover:border-green-500 hover:bg-green-50'
                      }`}
                    >
                      {labTests.includes(test) && <Check className="size-3 inline mr-1" />}
                      {test}
                    </button>
                  ))}
                </div>
              </div>
              <div className="border-t border-gray-200 p-6 bg-gray-50 flex gap-3 justify-end">
                <button onClick={() => setShowLabTestModal(false)} className="px-5 py-2.5 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition-all font-medium">Hủy</button>
                <button onClick={() => { if (labTests.length > 0) { setShowLabTestModal(false); } else { alert('Vui lòng chọn ít nhất 1 xét nghiệm'); }}} className="px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-xl hover:shadow-lg transition-all font-medium flex items-center gap-2">
                  <Check className="size-4" /> Gửi yêu cầu
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
