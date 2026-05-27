import { motion, AnimatePresence } from 'motion/react';
import React, { useState } from 'react';
import {
  Stethoscope, Users, Calendar, Clock, MessageSquare, FileText,
  Video, Phone, Mic, Camera, X, Send, Check, AlertCircle,
  Pill, TestTube, Image as ImageIcon, Save, Activity, Plus, Trash2
} from 'lucide-react';
import DoctorHeader from '../../components/doctor/DoctorHeader';

export default function DoctorExam() {
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'consultation' | 'chat' | 'vitals'>('consultation');
  const [showExamModal, setShowExamModal] = useState(false);
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [prescription, setPrescription] = useState('');
  const [notes, setNotes] = useState('');
  const [medications, setMedications] = useState<any[]>([]);
  const [labTests, setLabTests] = useState<string[]>([]);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [showLabTestModal, setShowLabTestModal] = useState(false);

  const patients = [
    { id: 1, patient: 'Nguyễn Văn A', age: 45, time: '09:00', status: 'waiting', reason: 'Khám định kỳ tim mạch', symptoms: 'Đau ngực, khó thở khi gắng sức', priority: 'normal', medicalHistory: 'Tiền sử cao huyết áp, đang điều trị', allergies: ['Penicillin'], vitalSigns: { bp: '140/90', hr: '85', temp: '37.0', spo2: '97%', weight: '72kg' } },
    { id: 2, patient: 'Trần Thị B', age: 32, time: '09:30', status: 'in-progress', reason: 'Tái khám', symptoms: 'Theo dõi sau phẫu thuật', priority: 'high', medicalHistory: 'Phẫu thuật tim 3 tháng trước', allergies: [], vitalSigns: { bp: '120/80', hr: '72', temp: '36.5', spo2: '99%', weight: '55kg' } },
    { id: 3, patient: 'Lê Văn C', age: 58, time: '10:00', status: 'waiting', reason: 'Khám bệnh mới', symptoms: 'Tim đập nhanh, mệt mỏi', priority: 'urgent', medicalHistory: 'Không có tiền sử bệnh lý', allergies: ['Aspirin'], vitalSigns: { bp: '150/95', hr: '95', temp: '36.8', spo2: '96%', weight: '68kg' } },
    { id: 4, patient: 'Phạm Thị D', age: 67, time: '10:30', status: 'completed', reason: 'Tư vấn trực tuyến', symptoms: 'Huyết áp cao', priority: 'normal', medicalHistory: 'Đái tháo đường type 2', allergies: [], vitalSigns: { bp: '145/92', hr: '78', temp: '36.6', spo2: '98%', weight: '62kg' } },
  ];

  const chatMessages = [
    { id: 1, sender: 'patient', text: 'Xin chào bác sĩ, tôi bị đau ngực khi vận động mạnh', time: '09:00' },
    { id: 2, sender: 'doctor', text: 'Chào bạn, bạn bị đau ngực bao lâu rồi?', time: '09:01' },
    { id: 3, sender: 'patient', text: 'Khoảng 2 tuần, cơn đau kéo dài 5-10 phút rồi tự hết', time: '09:02' },
    { id: 4, sender: 'doctor', text: 'Cảm ơn bạn, tôi sẽ tiến hành khám và chẩn đoán', time: '09:03' },
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
      default: return 'border-l-4 border-l-green-500';
    }
  };

  const handleStartExam = (patient: any) => {
    setSelectedPatient(patient);
    setShowExamModal(true);
  };

  const handleStartExamFromExam = (patient: any) => {
    setSelectedPatient(patient);
    setShowExamModal(true);
  };

  return (
    <div>
      <DoctorHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Khám bệnh</h1>
          <p className="text-gray-600">Tiến hành khám bệnh, nhập chẩn đoán và kê đơn</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200"
            >
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Danh sách bệnh nhân</h3>
                <p className="text-xs text-gray-500 mt-0.5">{patients.length} ca khám hôm nay</p>
              </div>
              <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
                {patients.map((patient) => (
                  <div
                    key={patient.id}
                    onClick={() => setSelectedPatient(patient)}
                    className={`p-4 cursor-pointer transition-all ${getPriorityColor(patient.priority)} ${
                      selectedPatient?.id === patient.id ? 'bg-green-50' : 'hover:bg-gray-50'
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
                      <div>📅 {patient.time} · {patient.reason}</div>
                    </div>
                    {patient.status === 'waiting' && (
                      <button
                        onClick={(e) => { e.stopPropagation(); handleStartExam(patient); }}
                        className="mt-2 w-full px-3 py-1.5 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-lg text-xs font-medium hover:shadow-lg transition-all"
                      >
                        Bắt đầu khám
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-2">
            {selectedPatient ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
              >
                <div className="flex border-b border-gray-200">
                  {[
                    { key: 'consultation', label: 'Tư vấn', icon: Stethoscope },
                    { key: 'chat', label: 'Tin nhắn', icon: MessageSquare },
                    { key: 'vitals', label: 'Sinh hiệu', icon: Activity },
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key as any)}
                      className={`flex-1 px-4 py-3.5 font-medium text-sm transition-all flex items-center justify-center gap-2 ${
                        activeTab === tab.key
                          ? 'border-b-2 border-green-600 text-green-600 bg-green-50'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <tab.icon className="size-4" />
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="p-6">
                  {activeTab === 'consultation' && (
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 rounded-xl p-4">
                          <h4 className="font-semibold text-gray-900 mb-2">Thông tin bệnh nhân</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-500">Họ tên:</span>
                              <span className="font-medium text-gray-900">{selectedPatient.patient}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Tuổi:</span>
                              <span className="font-medium text-gray-900">{selectedPatient.age}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Lý do khám:</span>
                              <span className="font-medium text-gray-900">{selectedPatient.reason}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Triệu chứng:</span>
                              <span className="font-medium text-gray-900">{selectedPatient.symptoms}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Tiền sử:</span>
                              <span className="font-medium text-gray-900">{selectedPatient.medicalHistory}</span>
                            </div>
                            {selectedPatient.allergies.length > 0 && (
                              <div className="flex justify-between">
                                <span className="text-red-500">Dị ứng:</span>
                                <span className="font-medium text-red-600">{selectedPatient.allergies.join(', ')}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                          <h4 className="font-semibold text-gray-900 mb-2">Sinh hiệu</h4>
                          <div className="grid grid-cols-2 gap-3">
                            {[
                              { label: 'Huyết áp', value: selectedPatient.vitalSigns.bp, unit: 'mmHg' },
                              { label: 'Nhịp tim', value: selectedPatient.vitalSigns.hr, unit: 'bpm' },
                              { label: 'Nhiệt độ', value: selectedPatient.vitalSigns.temp, unit: '°C' },
                              { label: 'SpO2', value: selectedPatient.vitalSigns.spo2, unit: '' },
                            ].map((vital) => (
                              <div key={vital.label} className="bg-white rounded-lg p-3 text-center">
                                <div className="text-xs text-gray-500 mb-1">{vital.label}</div>
                                <div className="text-lg font-bold text-gray-900">{vital.value} <span className="text-xs font-normal text-gray-500">{vital.unit}</span></div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                        <div className="flex items-center gap-2 mb-2">
                          <Activity className="size-4 text-purple-600" />
                          <h4 className="font-semibold text-purple-900">AI Gợi ý chẩn đoán</h4>
                        </div>
                        <ul className="space-y-1 text-sm text-purple-800">
                          <li>• Rối loạn nhịp tim (75%)</li>
                          <li>• Thiếu máu cơ tim (60%)</li>
                          <li>• Tăng huyết áp (45%)</li>
                        </ul>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Chẩn đoán *</label>
                        <textarea
                          value={diagnosis}
                          onChange={(e) => setDiagnosis(e.target.value)}
                          rows={3}
                          placeholder="Nhập chẩn đoán của bác sĩ..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-none text-sm"
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="text-sm font-semibold text-gray-700">Kê đơn thuốc</label>
                          <button
                            onClick={() => setShowPrescriptionModal(true)}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium hover:bg-blue-200 transition-all flex items-center gap-1"
                          >
                            <Plus className="size-3" />
                            Thêm thuốc
                          </button>
                        </div>
                        {medications.length > 0 ? (
                          <div className="space-y-2">
                            {medications.map((med, idx) => (
                              <div key={idx} className="p-3 bg-green-50 border border-green-200 rounded-xl text-sm">
                                <span className="font-semibold text-gray-900">{med.name}</span>
                                <span className="text-gray-600 ml-2">- {med.dosage} x {med.quantity} - {med.usage}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="h-20 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center text-sm text-gray-400">
                            Chưa có thuốc nào được kê
                          </div>
                        )}
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="text-sm font-semibold text-gray-700">Yêu cầu xét nghiệm</label>
                          <button
                            onClick={() => setShowLabTestModal(true)}
                            className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-medium hover:bg-green-200 transition-all flex items-center gap-1"
                          >
                            <Plus className="size-3" />
                            Thêm xét nghiệm
                          </button>
                        </div>
                        {labTests.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {labTests.map((test, idx) => (
                              <span key={idx} className="px-3 py-1 bg-green-50 border border-green-200 rounded-full text-xs font-medium text-green-700">
                                {test}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <div className="h-16 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center text-sm text-gray-400">
                            Chưa có xét nghiệm nào được yêu cầu
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Ghi chú</label>
                        <textarea
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          rows={2}
                          placeholder="Lời dặn của bác sĩ, lịch tái khám..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-none text-sm"
                        />
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => {
                            if (!selectedPatient) { alert('Vui lòng chọn bệnh nhân!'); return; }
                            setShowVideoCall(true);
                          }}
                          className="px-4 py-2.5 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-xl hover:shadow-lg transition-all font-medium flex items-center gap-2"
                        >
                          <Video className="size-4" />
                          Gọi video
                        </button>
                        <button
                          onClick={() => {
                            if (!selectedPatient) { alert('Vui lòng chọn bệnh nhân!'); return; }
                            const test = prompt('Nhập loại chụp chiếu (VD: X-quang ngực, CT Scan, MRI...):');
                            if (test && test.trim()) {
                              setLabTests(prev => [...prev, test.trim()]);
                              alert(`Đã gửi yêu cầu chụp chiếu: ${test.trim()}`);
                            }
                          }}
                          className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium flex items-center gap-2"
                        >
                          <ImageIcon className="size-4" />
                          Chỉ định chụp chiếu
                        </button>
                        <button
                          onClick={() => {
                            if (!diagnosis) {
                              alert('Vui lòng nhập chẩn đoán');
                              return;
                            }
                            alert('Đã lưu phiên khám thành công!');
                          }}
                          className="px-6 py-2.5 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-xl hover:shadow-lg transition-all font-medium flex items-center gap-2"
                        >
                          <Save className="size-4" />
                          Lưu &amp; Hoàn thành
                        </button>
                      </div>
                    </div>
                  )}

                  {activeTab === 'chat' && (
                    <div className="flex flex-col" style={{ height: '450px' }}>
                      <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                        {chatMessages.map((msg) => (
                          <div key={msg.id} className={`flex gap-2 ${msg.sender === 'doctor' ? 'flex-row-reverse' : 'flex-row'}`}>
                            <div className={`size-8 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0 ${
                              msg.sender === 'doctor' ? 'bg-green-600' : 'bg-purple-600'
                            }`}>
                              {msg.sender === 'doctor' ? 'BS' : selectedPatient.patient.charAt(0)}
                            </div>
                            <div className={`max-w-[75%] ${msg.sender === 'doctor' ? 'text-right' : 'text-left'}`}>
                              <div className={`inline-block px-4 py-2 rounded-2xl text-sm ${
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
                        <input
                          type="text"
                          value={chatMessage}
                          onChange={(e) => setChatMessage(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && chatMessage.trim()) {
                              const newMsg = {
                                id: Date.now(),
                                sender: 'doctor',
                                text: chatMessage.trim(),
                                time: `${new Date().getHours().toString().padStart(2, '0')}:${new Date().getMinutes().toString().padStart(2, '0')}`,
                              };
                              chatMessages.push(newMsg);
                              setChatMessage('');
                            }
                          }}
                          placeholder="Nhập tin nhắn..."
                          className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-sm"
                        />
                        <button
                          onClick={() => {
                            if (!chatMessage.trim()) return;
                            const newMsg = {
                              id: Date.now(),
                              sender: 'doctor',
                              text: chatMessage.trim(),
                              time: `${new Date().getHours().toString().padStart(2, '0')}:${new Date().getMinutes().toString().padStart(2, '0')}`,
                            };
                            chatMessages.push(newMsg);
                            setChatMessage('');
                          }}
                          className="px-4 py-2.5 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-xl hover:shadow-lg transition-all"
                        >
                          <Send className="size-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {activeTab === 'vitals' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        {[
                          { label: 'Huyết áp', value: selectedPatient.vitalSigns.bp, unit: 'mmHg', icon: '❤️' },
                          { label: 'Nhịp tim', value: selectedPatient.vitalSigns.hr, unit: 'bpm', icon: '💓' },
                          { label: 'Nhiệt độ', value: selectedPatient.vitalSigns.temp, unit: '°C', icon: '🌡️' },
                          { label: 'SpO2', value: selectedPatient.vitalSigns.spo2, unit: '', icon: '🫁' },
                          { label: 'Cân nặng', value: selectedPatient.vitalSigns.weight, unit: 'kg', icon: '⚖️' },
                        ].map((vital) => (
                          <div key={vital.label} className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 text-center border border-green-100">
                            <div className="text-2xl mb-1">{vital.icon}</div>
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
                            {selectedPatient.vitalSigns.bp === '150/95' && (
                              <p className="text-xs text-yellow-700 mt-1">Huyết áp của bệnh nhân cao hơn bình thường, cần theo dõi kỹ.</p>
                            )}
                            {selectedPatient.vitalSigns.hr === '95' && (
                              <p className="text-xs text-yellow-700 mt-1">Nhịp tim cao hơn bình thường (bình thường 60-100 bpm).</p>
                            )}
                            {selectedPatient.allergies.length > 0 && (
                              <p className="text-xs text-red-700 mt-1 font-semibold">⚠️ Bệnh nhân dị ứng: {selectedPatient.allergies.join(', ')}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 flex items-center justify-center">
                <div className="text-center">
                  <div className="size-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Stethoscope className="size-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Chưa chọn bệnh nhân</h3>
                  <p className="text-sm text-gray-600">Chọn một bệnh nhân từ danh sách bên trái để bắt đầu khám</p>
                </div>
              </div>
            )}
          </div>
        </div>

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
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              >
                <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold mb-1">Phiên khám bệnh</h2>
                      <p className="text-green-100">{selectedPatient.patient} - {selectedPatient.age} tuổi</p>
                    </div>
                    <button onClick={() => setShowExamModal(false)} className="p-2 hover:bg-white/20 rounded-lg transition-all">
                      <X className="size-6" />
                    </button>
                  </div>
                </div>
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)] space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h3 className="font-semibold text-gray-900 mb-3">Thông tin bệnh nhân</h3>
                      <div className="space-y-2 text-sm">
                        <div><span className="text-gray-500">Lý do:</span> <span className="font-medium">{selectedPatient.reason}</span></div>
                        <div><span className="text-gray-500">Triệu chứng:</span> <span className="font-medium">{selectedPatient.symptoms}</span></div>
                        <div><span className="text-gray-500">Tiền sử:</span> <span className="font-medium">{selectedPatient.medicalHistory}</span></div>
                        {selectedPatient.allergies.length > 0 && (
                          <div><span className="text-red-500">Dị ứng:</span> <span className="font-medium text-red-600">{selectedPatient.allergies.join(', ')}</span></div>
                        )}
                      </div>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                      <h3 className="font-semibold text-gray-900 mb-3">Sinh hiệu</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between"><span className="text-gray-500">Huyết áp:</span><span className="font-bold">{selectedPatient.vitalSigns.bp} mmHg</span></div>
                        <div className="flex justify-between"><span className="text-gray-500">Nhịp tim:</span><span className="font-bold">{selectedPatient.vitalSigns.hr} bpm</span></div>
                        <div className="flex justify-between"><span className="text-gray-500">Nhiệt độ:</span><span className="font-bold">{selectedPatient.vitalSigns.temp}°C</span></div>
                        <div className="flex justify-between"><span className="text-gray-500">SpO2:</span><span className="font-bold">{selectedPatient.vitalSigns.spo2}</span></div>
                      </div>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                      <h3 className="font-semibold text-gray-900 mb-3">AI Gợi ý</h3>
                      <ul className="space-y-1 text-sm">
                        <li>• Rối loạn nhịp tim (75%)</li>
                        <li>• Thiếu máu cơ tim (60%)</li>
                        <li>• Tăng huyết áp (45%)</li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Chẩn đoán *</label>
                    <textarea value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} rows={3} placeholder="Nhập chẩn đoán..." className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none resize-none text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Kê đơn thuốc</label>
                    <textarea value={prescription} onChange={(e) => setPrescription(e.target.value)} rows={3} placeholder="Nhập danh sách thuốc và liều lượng..." className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none resize-none text-sm" />
                  </div>
                </div>
                <div className="border-t border-gray-200 p-6 bg-gray-50 flex gap-3 justify-end">
                  <button onClick={() => setShowExamModal(false)} className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all font-medium">Hủy</button>
                  <button onClick={() => { setShowExamModal(false); alert('Đã lưu phiên khám!'); }} className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-xl hover:shadow-lg transition-all font-medium flex items-center gap-2">
                    <Check className="size-5" /> Hoàn thành khám
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

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
                className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden"
              >
                <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold mb-1">Kê đơn thuốc</h2>
                      <p className="text-blue-100">BN: {selectedPatient.patient} - {selectedPatient.age} tuổi</p>
                    </div>
                    <button onClick={() => setShowPrescriptionModal(false)} className="p-2 hover:bg-white/20 rounded-lg"><X className="size-6" /></button>
                  </div>
                </div>
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                  {selectedPatient.allergies.length > 0 && (
                    <div className="mb-4 p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-start gap-2">
                      <AlertCircle className="size-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div><h4 className="font-bold text-red-900 text-sm mb-1">Cảnh báo dị ứng</h4><p className="text-sm text-red-700">BN dị ứng: <strong>{selectedPatient.allergies.join(', ')}</strong></p></div>
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
                      <p className="text-green-100">BN: {selectedPatient.patient} - {selectedPatient.age} tuổi</p>
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
                        onClick={() => {
                          if (!labTests.includes(test)) setLabTests([...labTests, test]);
                        }}
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
        <AnimatePresence>
          {showVideoCall && selectedPatient && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-50 flex"
            >
              <div className="flex-1 bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center relative">
                <div className="text-center text-white">
                  <div className="size-32 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl">
                    <span className="text-5xl font-bold">{selectedPatient.patient.charAt(0)}</span>
                  </div>
                  <h3 className="text-2xl font-semibold">{selectedPatient.patient}</h3>
                  <p className="text-green-400 mt-1">Đang kết nối...</p>
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => setShowVideoCall(false)}
                    className="size-12 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-all"
                  >
                    <Phone className="size-6 text-white rotate-[135deg]" />
                  </button>
                </div>
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center justify-center gap-4">
                  <button onClick={() => setShowVideoCall(false)} className="size-14 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center shadow-lg">
                    <Phone className="size-6 text-white rotate-[135deg]" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
