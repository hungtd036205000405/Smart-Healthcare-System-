import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Calendar, User, Clock, MapPin, FileText, Download, RefreshCw,
  Search, Filter, ChevronRight, CheckCircle2, XCircle, AlertCircle,
  Pill, Stethoscope, Eye
} from 'lucide-react';
import PatientHeader from '../../components/patient/PatientHeader';

type TabKey = 'all' | 'completed' | 'pending' | 'cancelled';

interface Appointment {
  id: string;
  date: string;
  time: string;
  doctor: string;
  specialty: string;
  hospital: string;
  location: string;
  type: 'online' | 'offline';
  status: 'completed' | 'pending' | 'cancelled';
  diagnosis?: string;
  prescription?: string;
  notes?: string;
  followUp?: string;
}

export default function AppointmentHistoryPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  const appointments: Appointment[] = [
    {
      id: 'APT001',
      date: '2026-05-28',
      time: '14:30',
      doctor: 'BS. Trần Thị Bình',
      specialty: 'Nhi khoa',
      hospital: 'Phòng khám Nhi đồng BigC',
      location: 'Quận 3, TP.HCM',
      type: 'offline',
      status: 'completed',
      diagnosis: 'Viêm họng cấp tính, kê đơn thuốc kháng sinh Amoxicillin 500mg',
      prescription: 'Amoxicillin 500mg x 3 lần/ngày sau ăn, 7 ngày\nParacetamol 500mg x 3 lần/ngày khi sốt, Vitamin C 500mg x 1 lần/ngày',
      notes: 'Tái khám sau 1 tuần nếu không giảm triệu chứng',
      followUp: '2026-06-04',
    },
    {
      id: 'APT002',
      date: '2026-05-20',
      time: '09:00',
      doctor: 'BS. Lê Văn Cường',
      specialty: 'Da liễu',
      hospital: 'TT Da liễu Trung ương',
      location: 'Quận 5, TP.HCM',
      type: 'offline',
      status: 'completed',
      diagnosis: 'Viêm da dị ứng, da khô',
      prescription: 'Kem dưỡng ẩm Cetaphil x 2 lần/ngày\nThuốc bôi Tacrolimus 0.1% x 2 lần/ngày',
      notes: 'Tránh tiếp xúc với hóa chất, giữ ẩm da',
    },
    {
      id: 'APT003',
      date: '2026-05-15',
      time: '10:00',
      doctor: 'BS. Phạm Thị Dung',
      specialty: 'Tiêu hoá',
      hospital: 'Bệnh viện Ung Bướu TP.HCM',
      location: 'Bình Thạnh, TP.HCM',
      type: 'online',
      status: 'completed',
      diagnosis: 'Viêm dạ dày mãn tính, H. pylori âm tính',
      prescription: 'Esomeprazole 40mg x 1 lần/ngày sáng trước ăn 30 phút\nMetoclopramide 10mg x 3 lần/ngày trước ăn',
      notes: 'Chế độ ăn nhẹ, tránh đồ cay nóng, caféin',
      followUp: '2026-06-15',
    },
    {
      id: 'APT004',
      date: '2026-06-03',
      time: '09:00',
      doctor: 'BS. Nguyễn Văn An',
      specialty: 'Tim mạch',
      hospital: 'Bệnh viện Đa khoa Quốc tế',
      location: 'Quận 1, TP.HCM',
      type: 'online',
      status: 'pending',
    },
    {
      id: 'APT005',
      date: '2026-05-10',
      time: '08:30',
      doctor: 'BS. Hoàng Minh Đức',
      specialty: 'Thần kinh',
      hospital: 'Bệnh viện Quận Thủ Đức',
      location: 'Thủ Đức, TP.HCM',
      type: 'offline',
      status: 'cancelled',
      notes: 'Hủy do bệnh nhân có việc đột xuất, đã đặt lịch lại',
    },
    {
      id: 'APT006',
      date: '2026-04-25',
      time: '11:00',
      doctor: 'BS. Ngô Thị Hoa',
      specialty: 'Mắt',
      hospital: 'Bệnh viện Mắt TP.HCM',
      location: 'Quận 1, TP.HCM',
      type: 'offline',
      status: 'completed',
      diagnosis: 'Cận thị nhẹ, khô mắt',
      prescription: 'Thuốc nhỏ mắtRefresh 0.5% x 3 lần/ngày\nNghỉ ngơi mắt, hạn chế màn hình',
    },
  ];

  const filteredAppointments = appointments.filter((apt) => {
    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'completed' && apt.status === 'completed') ||
      (activeTab === 'pending' && apt.status === 'pending') ||
      (activeTab === 'cancelled' && apt.status === 'cancelled');
    const matchesSearch =
      !searchQuery ||
      apt.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.hospital.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold flex items-center gap-1">
            <CheckCircle2 className="size-3" /> Hoàn thành
          </span>
        );
      case 'pending':
        return (
          <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold flex items-center gap-1">
            <Clock className="size-3" /> Đang chờ
          </span>
        );
      case 'cancelled':
        return (
          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold flex items-center gap-1">
            <XCircle className="size-3" /> Đã hủy
          </span>
        );
      default:
        return null;
    }
  };

  const handleDownloadPrescription = (apt: Appointment) => {
    const content = `
LICH KE DON THUOC
====================
Ma lich hen: ${apt.id}
Ngay: ${new Date(apt.date).toLocaleDateString('vi-VN')}
Gio: ${apt.time}
Bac si: ${apt.doctor}
Chuyen khoa: ${apt.specialty}
--------------------
CHAN DOAN:
${apt.diagnosis || 'Khong co'}

DON THUOC:
${apt.prescription || 'Khong co'}

GHI CHU:
${apt.notes || 'Khong co'}
${apt.followUp ? `Tai khám: ${new Date(apt.followUp).toLocaleDateString('vi-VN')}` : ''}
    `;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Don_thuoc_${apt.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-cyan-50/30">
      <PatientHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Lịch sử khám bệnh</h1>
              <p className="text-gray-600">Theo dõi tất cả các lần khám của bạn</p>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">{appointments.filter(a => a.status === 'completed').length}</div>
                <div className="text-sm text-gray-600">Lần khám hoàn thành</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
          <div className="flex overflow-x-auto">
            {[
              { key: 'all' as TabKey, label: 'Tất cả', count: appointments.length },
              { key: 'completed' as TabKey, label: 'Đã hoàn thành', count: appointments.filter(a => a.status === 'completed').length },
              { key: 'pending' as TabKey, label: 'Đang chờ', count: appointments.filter(a => a.status === 'pending').length },
              { key: 'cancelled' as TabKey, label: 'Đã hủy', count: appointments.filter(a => a.status === 'cancelled').length },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all border-b-2 whitespace-nowrap ${
                  activeTab === tab.key
                    ? 'border-blue-600 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tab.label}
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                  activeTab === tab.key ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-700'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo bác sĩ, chuyên khoa..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Appointments List */}
        <div className="space-y-4">
          {filteredAppointments.map((apt, index) => (
            <motion.div
              key={apt.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`bg-white rounded-2xl shadow-sm border-2 hover:shadow-lg transition-all overflow-hidden ${
                apt.status === 'completed' ? 'border-gray-200' :
                apt.status === 'pending' ? 'border-yellow-300' :
                'border-red-200'
              }`}
            >
              <div className="p-6">
                <div className="flex items-start gap-5">
                  {/* Doctor Avatar */}
                  <div className="size-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                    <Stethoscope className="size-8 text-white" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-bold text-gray-900">{apt.doctor}</h3>
                          {apt.type === 'online' ? (
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">Online</span>
                          ) : (
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">Trực tiếp</span>
                          )}
                        </div>
                        <p className="text-blue-600 font-medium text-sm">{apt.specialty}</p>
                      </div>
                      {getStatusBadge(apt.status)}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="size-4" />
                        {new Date(apt.date).toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="size-4" />
                        {apt.time}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="size-4" />
                        {apt.location}
                      </div>
                    </div>

                    {apt.diagnosis && (
                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-100 mb-3">
                        <p className="text-sm">
                          <span className="font-semibold text-blue-900">Chẩn đoán:</span>{' '}
                          <span className="text-blue-800">{apt.diagnosis}</span>
                        </p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => setSelectedAppointment(apt)}
                        className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-all flex items-center gap-1"
                      >
                        <Eye className="size-4" />
                        Xem chi tiết
                      </button>
                      {apt.status === 'completed' && apt.prescription && (
                        <button
                          onClick={() => handleDownloadPrescription(apt)}
                          className="px-4 py-2 bg-green-50 text-green-600 rounded-lg text-sm font-medium hover:bg-green-100 transition-all flex items-center gap-1"
                        >
                          <Download className="size-4" />
                          Tải đơn thuốc
                        </button>
                      )}
                      {apt.status === 'pending' && (
                        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-all flex items-center gap-1">
                          <RefreshCw className="size-4" />
                          Đổi lịch
                        </button>
                      )}
                      {apt.status !== 'cancelled' && (
                        <button className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-all flex items-center gap-1">
                          Hủy lịch
                        </button>
                      )}
                      <button
                        onClick={() => {}}
                        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all flex items-center gap-1"
                      >
                        Đặt lịch lại
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredAppointments.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="size-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="size-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Không tìm thấy lịch khám</h3>
            <p className="text-gray-600">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 sticky top-0 bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Chi tiết lịch khám</h2>
                  <p className="text-sm text-gray-600">Mã: {selectedAppointment.id}</p>
                </div>
                <button
                  onClick={() => setSelectedAppointment(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <XCircle className="size-6 text-gray-400" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              {/* Doctor Info */}
              <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl">
                <div className="size-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Stethoscope className="size-8 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{selectedAppointment.doctor}</h3>
                  <p className="text-blue-600 font-medium">{selectedAppointment.specialty}</p>
                  <p className="text-sm text-gray-600">{selectedAppointment.hospital}</p>
                </div>
                {getStatusBadge(selectedAppointment.status)}
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="size-5 text-blue-600" />
                    <span className="text-sm font-medium text-gray-600">Ngày khám</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">
                    {new Date(selectedAppointment.date).toLocaleDateString('vi-VN')}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="size-5 text-blue-600" />
                    <span className="text-sm font-medium text-gray-600">Giờ khám</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{selectedAppointment.time}</p>
                </div>
              </div>

              {/* Location */}
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="size-5 text-blue-600" />
                  <span className="text-sm font-medium text-gray-600">Địa điểm</span>
                </div>
                <p className="text-lg font-bold text-gray-900">{selectedAppointment.hospital}</p>
                <p className="text-sm text-gray-600">{selectedAppointment.location}</p>
              </div>

              {/* Diagnosis */}
              {selectedAppointment.diagnosis && (
                <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="size-5 text-green-600" />
                    <span className="font-bold text-green-900">Chẩn đoán</span>
                  </div>
                  <p className="text-green-800">{selectedAppointment.diagnosis}</p>
                </div>
              )}

              {/* Prescription */}
              {selectedAppointment.prescription && (
                <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Pill className="size-5 text-purple-600" />
                    <span className="font-bold text-purple-900">Đơn thuốc</span>
                  </div>
                  <div className="space-y-2">
                    {selectedAppointment.prescription.split('\n').map((line, i) => (
                      <p key={i} className="text-purple-800 whitespace-pre-line">{line}</p>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              {selectedAppointment.notes && (
                <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="size-5 text-yellow-600" />
                    <span className="font-bold text-yellow-900">Ghi chú</span>
                  </div>
                  <p className="text-yellow-800">{selectedAppointment.notes}</p>
                </div>
              )}

              {/* Follow-up */}
              {selectedAppointment.followUp && (
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="size-5 text-blue-600" />
                    <span className="font-bold text-blue-900">Tái khám</span>
                  </div>
                  <p className="text-blue-800">
                    {new Date(selectedAppointment.followUp).toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t">
                <button
                  onClick={() => setSelectedAppointment(null)}
                  className="flex-1 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-all"
                >
                  Đóng
                </button>
                {selectedAppointment.status === 'completed' && selectedAppointment.prescription && (
                  <button
                    onClick={() => handleDownloadPrescription(selectedAppointment)}
                    className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Download className="size-5" />
                    Tải đơn thuốc
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
