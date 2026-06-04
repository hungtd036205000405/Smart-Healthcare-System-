import { motion } from 'motion/react';
import { useState } from 'react';
import {
  FileText,
  Upload,
  Download,
  Eye,
  Calendar,
  User,
  Activity,
  Pill,
  FileImage,
  FilePlus,
  Search,
  Filter,
  AlertCircle,
  CheckCircle2,
  Clock,
  Heart
} from 'lucide-react';

import PatientHeader from '../../components/patient/PatientHeader';

export default function MedicalRecordsPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'reports' | 'prescriptions' | 'images' | 'allergies'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const medicalRecords = [
    {
      id: 1,
      type: 'report',
      title: 'Kết quả xét nghiệm máu tổng quát',
      date: '2026-05-05',
      doctor: 'BS. Nguyễn Văn An',
      specialty: 'Tim mạch',
      status: 'completed',
      files: [
        { name: 'XN_Mau_050526.pdf', size: '1.2 MB', type: 'pdf' }
      ],
      summary: 'Các chỉ số trong giới hạn bình thường. HbA1c: 5.4%, Cholesterol: 180 mg/dL',
      important: false
    },
    {
      id: 2,
      type: 'prescription',
      title: 'Đơn thuốc điều trị huyết áp',
      date: '2026-05-03',
      doctor: 'BS. Nguyễn Văn An',
      specialty: 'Tim mạch',
      status: 'active',
      medications: [
        { name: 'Amlodipine 5mg', dosage: '1 viên/ngày', duration: '30 ngày', morning: true },
        { name: 'Atenolol 50mg', dosage: '1 viên/ngày', duration: '30 ngày', evening: true }
      ],
      notes: 'Uống thuốc đều đặn, theo dõi huyết áp hàng ngày',
      important: true
    },
    {
      id: 3,
      type: 'image',
      title: 'Chụp X-quang phổi',
      date: '2026-04-28',
      doctor: 'BS. Lê Văn Bình',
      specialty: 'Hô hấp',
      status: 'completed',
      files: [
        { name: 'Xquang_Phoi_280426.jpg', size: '3.5 MB', type: 'image' }
      ],
      summary: 'Phổi không có bất thường. Không phát hiện dấu hiệu viêm phổi.',
      important: false
    },
    {
      id: 4,
      type: 'report',
      title: 'Siêu âm tim Doppler',
      date: '2026-04-20',
      doctor: 'BS. Nguyễn Văn An',
      specialty: 'Tim mạch',
      status: 'completed',
      files: [
        { name: 'Sieu_am_tim_200426.pdf', size: '2.8 MB', type: 'pdf' },
        { name: 'Hinh_anh_tim.jpg', size: '1.5 MB', type: 'image' }
      ],
      summary: 'Chức năng tim bình thường. EF: 65%. Các van tim hoạt động tốt.',
      important: false
    },
    {
      id: 5,
      type: 'prescription',
      title: 'Đơn thuốc vitamin và khoáng chất',
      date: '2026-04-15',
      doctor: 'BS. Trần Thị Mai',
      specialty: 'Dinh dưỡng',
      status: 'completed',
      medications: [
        { name: 'Vitamin D3 1000IU', dosage: '1 viên/ngày', duration: '60 ngày', morning: true },
        { name: 'Calcium 500mg', dosage: '1 viên/ngày', duration: '60 ngày', evening: true }
      ],
      notes: 'Bổ sung vitamin D và canxi để tăng cường sức khỏe xương',
      important: false
    }
  ];

  const allergies = [
    { name: 'Penicillin', severity: 'high', reaction: 'Phát ban, ngứa', dateFound: '2020-03-15' },
    { name: 'Aspirin', severity: 'medium', reaction: 'Buồn nôn, chóng mặt', dateFound: '2018-07-22' },
    { name: 'Hải sản (Tôm, cua)', severity: 'high', reaction: 'Sưng môi, khó thở', dateFound: '2015-05-10' }
  ];

  const vitalSigns = {
    bloodPressure: '120/80',
    heartRate: '72',
    temperature: '36.5',
    weight: '68',
    height: '170',
    bmi: '23.5'
  };

  const filteredRecords = medicalRecords.filter(record => {
    const matchesTab = activeTab === 'all' ||
                      (activeTab === 'reports' && record.type === 'report') ||
                      (activeTab === 'prescriptions' && record.type === 'prescription') ||
                      (activeTab === 'images' && record.type === 'image');
    const matchesSearch = record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.doctor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'report': return FileText;
      case 'prescription': return Pill;
      case 'image': return FileImage;
      default: return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'report': return 'from-blue-500 to-blue-600';
      case 'prescription': return 'from-green-500 to-green-600';
      case 'image': return 'from-purple-500 to-purple-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PatientHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Hồ sơ sức khỏe điện tử</h1>
          <p className="text-gray-600">Quản lý toàn bộ hồ sơ y tế của bạn ở một nơi</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Patient Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="size-16 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  NA
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Nguyễn Văn A</h3>
                  <p className="text-sm text-gray-600">Mã BN: #MED2026001</p>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Ngày sinh:</span>
                  <span className="font-medium text-gray-900">15/03/1980</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Giới tính:</span>
                  <span className="font-medium text-gray-900">Nam</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Nhóm máu:</span>
                  <span className="font-medium text-red-600">O+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Điện thoại:</span>
                  <span className="font-medium text-gray-900">0901234567</span>
                </div>
              </div>
            </motion.div>

            {/* Vital Signs */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Activity className="size-5 text-blue-600" />
                Chỉ số sinh tồn
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-red-50 rounded-lg">
                  <div className="text-xs text-gray-600 mb-1">Huyết áp</div>
                  <div className="font-bold text-gray-900">{vitalSigns.bloodPressure} mmHg</div>
                </div>
                <div className="p-3 bg-pink-50 rounded-lg">
                  <div className="text-xs text-gray-600 mb-1">Nhịp tim</div>
                  <div className="font-bold text-gray-900">{vitalSigns.heartRate} bpm</div>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <div className="text-xs text-gray-600 mb-1">Nhiệt độ</div>
                  <div className="font-bold text-gray-900">{vitalSigns.temperature}°C</div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="text-xs text-gray-600 mb-1">Cân nặng</div>
                    <div className="font-bold text-gray-900">{vitalSigns.weight} kg</div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="text-xs text-gray-600 mb-1">BMI</div>
                    <div className="font-bold text-gray-900">{vitalSigns.bmi}</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Allergies */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl border-2 border-red-200 p-6"
            >
              <h3 className="font-semibold text-red-900 mb-4 flex items-center gap-2">
                <AlertCircle className="size-5" />
                Dị ứng
              </h3>
              <div className="space-y-3">
                {allergies.map((allergy, index) => (
                  <div key={index} className="p-3 bg-white rounded-lg border border-red-200">
                    <div className="flex items-start justify-between mb-1">
                      <span className="font-medium text-gray-900">{allergy.name}</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        allergy.severity === 'high' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {allergy.severity === 'high' ? 'Cao' : 'Trung bình'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">{allergy.reaction}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm hồ sơ..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:shadow-lg transition-all font-medium flex items-center gap-2 justify-center">
                <Upload className="size-5" />
                Tải lên hồ sơ
              </button>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-x-auto">
              <div className="flex">
                {[
                  { key: 'all', label: 'Tất cả', count: medicalRecords.length },
                  { key: 'reports', label: 'Kết quả XN', count: medicalRecords.filter(r => r.type === 'report').length },
                  { key: 'prescriptions', label: 'Đơn thuốc', count: medicalRecords.filter(r => r.type === 'prescription').length },
                  { key: 'images', label: 'Hình ảnh', count: medicalRecords.filter(r => r.type === 'image').length }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`flex-1 px-6 py-4 font-medium transition-all border-b-2 ${
                      activeTab === tab.key
                        ? 'border-blue-600 text-blue-600 bg-blue-50'
                        : 'border-transparent text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {tab.label}
                    <span className="ml-2 px-2 py-0.5 bg-gray-200 text-gray-700 rounded-full text-xs">
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Records List */}
            <div className="space-y-4">
              {filteredRecords.map((record, index) => {
                const TypeIcon = getTypeIcon(record.type);
                return (
                  <motion.div
                    key={record.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`bg-white rounded-xl shadow-sm border-2 hover:shadow-lg transition-all ${
                      record.important ? 'border-amber-300 bg-amber-50/30' : 'border-gray-200'
                    }`}
                  >
                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`size-14 bg-gradient-to-br ${getTypeColor(record.type)} rounded-xl flex items-center justify-center flex-shrink-0`}>
                          <TypeIcon className="size-7 text-white" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                {record.title}
                                {record.important && (
                                  <span className="ml-2 text-amber-600">⭐</span>
                                )}
                              </h3>
                              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                  <Calendar className="size-4" />
                                  {new Date(record.date).toLocaleDateString('vi-VN')}
                                </div>
                                <div className="flex items-center gap-1">
                                  <User className="size-4" />
                                  {record.doctor}
                                </div>
                                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                                  {record.specialty}
                                </span>
                              </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              record.status === 'active'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-gray-100 text-gray-700'
                            }`}>
                              {record.status === 'active' ? 'Đang dùng' : 'Hoàn thành'}
                            </span>
                          </div>

                          {record.summary && (
                            <p className="text-gray-700 mb-4">{record.summary}</p>
                          )}

                          {record.medications && (
                            <div className="mb-4 p-4 bg-green-50 rounded-lg border border-green-200">
                              <h4 className="font-medium text-gray-900 mb-3">Danh sách thuốc:</h4>
                              <div className="space-y-2">
                                {record.medications.map((med, idx) => (
                                  <div key={idx} className="flex items-start gap-3">
                                    <Pill className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                                    <div className="flex-1">
                                      <div className="font-medium text-gray-900">{med.name}</div>
                                      <div className="text-sm text-gray-600">
                                        {med.dosage} - {med.duration}
                                        {med.morning && <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded text-xs">Sáng</span>}
                                        {med.evening && <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">Tối</span>}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                              {record.notes && (
                                <div className="mt-3 pt-3 border-t border-green-200">
                                  <p className="text-sm text-gray-700">
                                    <strong>Lưu ý:</strong> {record.notes}
                                  </p>
                                </div>
                              )}
                            </div>
                          )}

                          {record.files && record.files.length > 0 && (
                            <div className="space-y-2">
                              {record.files.map((file, idx) => (
                                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                                  <div className="flex items-center gap-3">
                                    {file.type === 'pdf' ? (
                                      <FileText className="size-5 text-red-600" />
                                    ) : (
                                      <FileImage className="size-5 text-blue-600" />
                                    )}
                                    <div>
                                      <div className="font-medium text-gray-900">{file.name}</div>
                                      <div className="text-xs text-gray-500">{file.size}</div>
                                    </div>
                                  </div>
                                  <div className="flex gap-2">
                                    <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-all">
                                      <Eye className="size-5" />
                                    </button>
                                    <button className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-all">
                                      <Download className="size-5" />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {filteredRecords.length === 0 && (
              <div className="text-center py-12">
                <FileText className="size-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy hồ sơ</h3>
                <p className="text-gray-600">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
