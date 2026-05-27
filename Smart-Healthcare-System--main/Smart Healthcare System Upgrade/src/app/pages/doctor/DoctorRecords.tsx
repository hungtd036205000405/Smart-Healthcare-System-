import { motion } from 'motion/react';
import React, { useState } from 'react';
import {
  FileText, Search, Filter, Plus, Edit2, Trash2, X,
  Download, Eye, Calendar, User, Stethoscope, Pill,
  TestTube, ChevronRight, CheckCircle2, Clock, AlertCircle,
  ChevronDown, ChevronUp
} from 'lucide-react';
import DoctorHeader from '../../components/doctor/DoctorHeader';

export default function DoctorRecords() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'archived'>('all');
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [expandedRecord, setExpandedRecord] = useState<number | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any>(null);
  const [newRecord, setNewRecord] = useState({
    patient: '', age: '', gender: 'Nam', date: new Date().toISOString().split('T')[0],
    diagnosis: '', symptoms: '', prescription: '', notes: '', nextAppointment: '',
  });

  const [records, setRecords] = useState([
    {
      id: 1, patient: 'Nguyễn Văn A', age: 45, gender: 'Nam',
      date: '2026-05-15', doctor: 'BS. Nguyễn Văn An', specialty: 'Tim mạch',
      diagnosis: 'Rối loạn nhịp tim', status: 'active',
      symptoms: 'Đau ngực, khó thở khi gắng sức',
      prescription: 'Bisoprolol 5mg - Ngày 1 viên, sáng\nAmlodipin 5mg - Ngày 1 viên, sáng\nAspirin 81mg - Ngày 1 viên, sáng',
      labTests: ['Công thức máu', 'Điện tâm đồ (ECG)', 'Siêu âm tim'],
      notes: 'Tái khám sau 1 tháng. Hạn chế vận động mạnh.',
      nextAppointment: '2026-06-15',
    },
    {
      id: 2, patient: 'Trần Thị B', age: 32, gender: 'Nữ',
      date: '2026-05-10', doctor: 'BS. Nguyễn Văn An', specialty: 'Tim mạch',
      diagnosis: 'Theo dõi sau phẫu thuật tim',
      status: 'active',
      symptoms: 'Tái khám định kỳ sau phẫu thuật 3 tháng',
      prescription: 'Warfarin 5mg - Ngày 1 viên, tối\nMetoprolol 50mg - Ngày 2 viên, sáng & tối',
      labTests: ['Xét nghiệm đông máu INR', 'Siêu âm tim', 'X-quang ngực'],
      notes: 'Kết quả siêu âm tim tốt, không có dịch khớp. Tiếp tục theo dõi.',
      nextAppointment: '2026-08-10',
    },
    {
      id: 3, patient: 'Lê Văn C', age: 58, gender: 'Nam',
      date: '2026-05-05', doctor: 'BS. Nguyễn Văn An', specialty: 'Tim mạch',
      diagnosis: 'Tăng huyết áp độ I',
      status: 'active',
      symptoms: 'Tim đập nhanh, mệt mỏi, đau đầu',
      prescription: 'Amlodipin 5mg - Ngày 1 viên, sáng\nEnalapril 10mg - Ngày 1 viên, sáng',
      labTests: ['Đường huyết', 'Cholesterol', 'Creatinin'],
      notes: 'Chế độ ăn giảm muối, tập thể dục nhẹ. Tái khám sau 2 tuần.',
      nextAppointment: '2026-05-19',
    },
    {
      id: 4, patient: 'Phạm Thị D', age: 67, gender: 'Nữ',
      date: '2026-04-20', doctor: 'BS. Nguyễn Văn An', specialty: 'Tim mạch',
      diagnosis: 'Suy tim độ II',
      status: 'archived',
      symptoms: 'Khó thở khi gắng sức, phù chân',
      prescription: 'Furosemid 40mg - Ngày 1 viên, sáng\nDigoxin 0.25mg - Ngày 1 viên\nLisinopril 10mg - Ngày 1 viên, sáng',
      labTests: ['BNP (Suy tim)', 'X-quang ngực', 'Siêu âm bụng'],
      notes: 'Bệnh nhân đáp ứng tốt với điều trị. Đã ổn định.',
      nextAppointment: null,
    },
    {
      id: 5, patient: 'Hoàng Văn E', age: 40, gender: 'Nam',
      date: '2026-05-01', doctor: 'BS. Nguyễn Văn An', specialty: 'Tim mạch',
      diagnosis: 'Nhịp tim nhanh kịch phát (PSVT)',
      status: 'active',
      symptoms: 'Tim đập nhanh đột ngột, hoa mắt, chóng mặt',
      prescription: 'Verapamil 40mg - Khi có cơn: 1 viên\nAtenolol 50mg - Ngày 1 viên, sáng (dự phòng)',
      labTests: ['ECG 24h Holter', 'Điện giải đồ'],
      notes: 'Cần theo dõi ECG 24h. Hạn chế caffeine và rượu.',
      nextAppointment: '2026-05-25',
    },
  ]);

  const filteredRecords = records.filter(r => {
    const matchesSearch = r.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         r.diagnosis.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || r.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    { label: 'Tổng hồ sơ', value: records.length, icon: FileText, color: 'from-blue-500 to-blue-600' },
    { label: 'Đang điều trị', value: records.filter(r => r.status === 'active').length, icon: Stethoscope, color: 'from-green-500 to-green-600' },
    { label: 'Đã lưu trữ', value: records.filter(r => r.status === 'archived').length, icon: CheckCircle2, color: 'from-purple-500 to-purple-600' },
    { label: 'Tái khám sắp tới', value: records.filter(r => r.nextAppointment && new Date(r.nextAppointment) <= new Date(Date.now() + 7 * 86400000)).length, icon: Calendar, color: 'from-orange-500 to-orange-600' },
  ];

  const handleCreateRecord = () => {
    if (!newRecord.patient || !newRecord.diagnosis || !newRecord.date) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
      return;
    }
    const id = Math.max(...records.map(r => r.id)) + 1;
    setRecords([{
      id, ...newRecord, doctor: 'BS. Nguyễn Văn An', specialty: 'Tim mạch',
      labTests: [], status: 'active',
    }, ...records]);
    setNewRecord({ patient: '', age: '', gender: 'Nam', date: new Date().toISOString().split('T')[0], diagnosis: '', symptoms: '', prescription: '', notes: '', nextAppointment: '' });
    setShowCreateModal(false);
    alert('Tạo bệnh án thành công!');
  };

  const handleEditRecord = (record: any) => {
    setEditingRecord({ ...record });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (!editingRecord) return;
    setRecords(records.map(r => r.id === editingRecord.id ? editingRecord : r));
    setShowEditModal(false);
    setEditingRecord(null);
    alert('Cập nhật bệnh án thành công!');
  };

  const handleFollowUp = (record: any) => {
    const date = prompt('Nhập ngày tái khám (YYYY-MM-DD):', new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0]);
    if (date) {
      setRecords(records.map(r => r.id === record.id ? { ...r, nextAppointment: date } : r));
      alert(`Đã đặt lịch tái khám cho ${record.patient} vào ngày ${date}`);
    }
  };

  const handleExportPDF = (record: any) => {
    const content = `
========================================
BỆNH ÁN - MEDICARE HEALTHCARE SYSTEM
========================================
Họ tên: ${record.patient}
Tuổi: ${record.age} | Giới tính: ${record.gender}
Ngày khám: ${new Date(record.date).toLocaleDateString('vi-VN')}
Bác sĩ: ${record.doctor}
Chuyên khoa: ${record.specialty}
========================================
CHẨN ĐOÁN: ${record.diagnosis}
-----------------------------------
TRIỆU CHỨNG: ${record.symptoms}
-----------------------------------
ĐƠN THUỐC:
${record.prescription || 'Không có'}
-----------------------------------
XÉT NGHIỆM: ${record.labTests.join(', ') || 'Không có'}
-----------------------------------
GHI CHÚ: ${record.notes}
-----------------------------------
`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `benh-an-${record.patient.replace(/\s+/g, '-')}-${record.date}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <DoctorHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Quản lý bệnh án</h1>
            <p className="text-gray-600">Tạo, cập nhật và xem hồ sơ bệnh án của bệnh nhân</p>
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-xl hover:shadow-lg transition-all font-medium flex items-center gap-2 text-sm">
            <Plus className="size-4" />
            Tạo bệnh án mới
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`size-9 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="size-4 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">{stat.value}</span>
              </div>
              <div className="text-xs text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5"
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm theo tên bệnh nhân, chẩn đoán..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none text-sm"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none text-sm bg-white font-medium"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="active">Đang điều trị</option>
              <option value="archived">Đã lưu trữ</option>
            </select>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
        >
          <div className="p-5 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Danh sách hồ sơ bệnh án ({filteredRecords.length})</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {filteredRecords.map((record) => (
              <div key={record.id} className="p-5 hover:bg-gray-50 transition-colors">
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => setExpandedRecord(expandedRecord === record.id ? null : record.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="size-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm">
                      {record.patient.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-gray-900">{record.patient}</h4>
                        <select
                          value={record.status}
                          onChange={(e) => { e.stopPropagation(); setRecords(prev => prev.map(r => r.id === record.id ? { ...r, status: e.target.value } : r)); }}
                          onClick={(e) => e.stopPropagation()}
                          className={`px-2 py-0.5 rounded-full text-xs font-medium border outline-none cursor-pointer ${
                            record.status === 'active' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-gray-100 text-gray-600 border-gray-200'
                          }`}
                        >
                          <option value="active">Đang điều trị</option>
                          <option value="archived">Đã lưu trữ</option>
                        </select>
                      </div>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">{record.diagnosis}</span>
                        <span className="mx-2">·</span>
                        <span className="flex items-center gap-1 inline">
                          <Calendar className="size-3" />
                          {new Date(record.date).toLocaleDateString('vi-VN')}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                      <p className="text-xs text-gray-500">BN: {record.patient}</p>
                      <p className="text-xs text-gray-500">{record.age} tuổi · {record.gender}</p>
                    </div>
                    {expandedRecord === record.id ? (
                      <ChevronUp className="size-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="size-5 text-gray-400" />
                    )}
                  </div>
                </div>

                {expandedRecord === record.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-gray-100 space-y-4"
                  >
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                        <h5 className="font-semibold text-gray-900 text-sm">Thông tin chẩn đoán</h5>
                        <div className="space-y-1 text-sm">
                          <div className="flex gap-2"><span className="text-gray-500 w-24">Bác sĩ:</span><span className="font-medium">{record.doctor}</span></div>
                          <div className="flex gap-2"><span className="text-gray-500 w-24">Chuyên khoa:</span><span className="font-medium">{record.specialty}</span></div>
                          <div className="flex gap-2"><span className="text-gray-500 w-24">Ngày khám:</span><span className="font-medium">{new Date(record.date).toLocaleDateString('vi-VN')}</span></div>
                          <div className="flex gap-2"><span className="text-gray-500 w-24">Triệu chứng:</span><span className="font-medium">{record.symptoms}</span></div>
                        </div>
                      </div>
                      <div className="bg-blue-50 rounded-xl p-4 space-y-2">
                        <h5 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
                          <Pill className="size-4 text-blue-600" />
                          Đơn thuốc
                        </h5>
                        <div className="text-sm text-gray-700 whitespace-pre-line font-medium">
                          {record.prescription}
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-xl p-4">
                      <h5 className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-2">
                        <TestTube className="size-4 text-green-600" />
                        Xét nghiệm &amp; Chỉ định
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {record.labTests.map((test, idx) => (
                          <span key={idx} className="px-3 py-1 bg-white border border-green-200 rounded-full text-xs font-medium text-green-700">
                            {test}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-yellow-50 rounded-xl p-4">
                        <h5 className="font-semibold text-yellow-900 text-sm mb-1">Ghi chú của bác sĩ</h5>
                        <p className="text-sm text-gray-700">{record.notes}</p>
                      </div>
                      {record.nextAppointment ? (
                        <div className="bg-purple-50 rounded-xl p-4">
                          <h5 className="font-semibold text-purple-900 text-sm mb-1">Lịch tái khám</h5>
                          <p className="text-sm font-medium text-purple-700">
                            {new Date(record.nextAppointment).toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                          </p>
                        </div>
                      ) : (
                        <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-center">
                          <p className="text-sm text-gray-400 italic">Không có lịch tái khám</p>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button onClick={() => handleEditRecord(record)} className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-all text-sm font-medium flex items-center gap-2">
                        <Edit2 className="size-4" />
                        Chỉnh sửa
                      </button>
                      <button onClick={() => handleFollowUp(record)} className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-all text-sm font-medium flex items-center gap-2">
                        <Plus className="size-4" />
                        Tái khám
                      </button>
                      <button onClick={() => handleExportPDF(record)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all text-sm font-medium flex items-center gap-2">
                        <Download className="size-4" />
                        Xuất PDF
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Modal Tạo bệnh án mới */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold">Tạo bệnh án mới</h2>
              <button onClick={() => setShowCreateModal(false)} className="p-2 hover:bg-white/20 rounded-lg"><X className="size-5" /></button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-150px)] space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Họ tên bệnh nhân *</label>
                  <input type="text" value={newRecord.patient} onChange={e => setNewRecord({ ...newRecord, patient: e.target.value })} placeholder="VD: Nguyễn Văn A" className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Tuổi</label>
                  <input type="number" value={newRecord.age} onChange={e => setNewRecord({ ...newRecord, age: e.target.value })} placeholder="VD: 40" className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Giới tính</label>
                  <select value={newRecord.gender} onChange={e => setNewRecord({ ...newRecord, gender: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm bg-white">
                    <option>Nam</option><option>Nữ</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Ngày khám *</label>
                  <input type="date" value={newRecord.date} onChange={e => setNewRecord({ ...newRecord, date: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Chẩn đoán *</label>
                <input type="text" value={newRecord.diagnosis} onChange={e => setNewRecord({ ...newRecord, diagnosis: e.target.value })} placeholder="VD: Rối loạn nhịp tim" className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Triệu chứng</label>
                <input type="text" value={newRecord.symptoms} onChange={e => setNewRecord({ ...newRecord, symptoms: e.target.value })} placeholder="VD: Đau ngực, khó thở" className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Đơn thuốc</label>
                <textarea value={newRecord.prescription} onChange={e => setNewRecord({ ...newRecord, prescription: e.target.value })} rows={3} placeholder="VD: Bisoprolol 5mg - Ngày 1 viên..." className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 outline-none resize-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Ghi chú</label>
                <textarea value={newRecord.notes} onChange={e => setNewRecord({ ...newRecord, notes: e.target.value })} rows={2} placeholder="Lời dặn, lịch tái khám..." className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 outline-none resize-none" />
              </div>
            </div>
            <div className="p-6 border-t bg-gray-50 flex gap-3 justify-end">
              <button onClick={() => setShowCreateModal(false)} className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 font-medium">Hủy</button>
              <button onClick={handleCreateRecord} className="px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-xl hover:shadow-lg font-medium">Tạo bệnh án</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Chỉnh sửa bệnh án */}
      {showEditModal && editingRecord && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold">Chỉnh sửa bệnh án</h2>
              <button onClick={() => { setShowEditModal(false); setEditingRecord(null); }} className="p-2 hover:bg-white/20 rounded-lg"><X className="size-5" /></button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-150px)] space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Họ tên</label>
                  <input type="text" value={editingRecord.patient} onChange={e => setEditingRecord({ ...editingRecord, patient: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Chẩn đoán</label>
                  <input type="text" value={editingRecord.diagnosis} onChange={e => setEditingRecord({ ...editingRecord, diagnosis: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Triệu chứng</label>
                  <input type="text" value={editingRecord.symptoms} onChange={e => setEditingRecord({ ...editingRecord, symptoms: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Trạng thái</label>
                  <select value={editingRecord.status} onChange={e => setEditingRecord({ ...editingRecord, status: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm bg-white">
                    <option value="active">Đang điều trị</option>
                    <option value="archived">Đã lưu trữ</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Đơn thuốc</label>
                <textarea value={editingRecord.prescription} onChange={e => setEditingRecord({ ...editingRecord, prescription: e.target.value })} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 outline-none resize-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Ghi chú</label>
                <textarea value={editingRecord.notes} onChange={e => setEditingRecord({ ...editingRecord, notes: e.target.value })} rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-green-500 outline-none resize-none" />
              </div>
            </div>
            <div className="p-6 border-t bg-gray-50 flex gap-3 justify-end">
              <button onClick={() => { setShowEditModal(false); setEditingRecord(null); }} className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 font-medium">Hủy</button>
              <button onClick={handleSaveEdit} className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:shadow-lg font-medium">Lưu thay đổi</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
