import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Heart, ShieldCheck, Upload, Settings, Camera, Save, Eye, Trash2, FileText, Image, X, Check, AlertCircle, Lock, Bell, EyeOff } from 'lucide-react';
import PatientHeader from '../../components/patient/PatientHeader';

type TabKey = 'personal' | 'insurance' | 'upload' | 'settings';

export default function PatientProfilePage() {
  const [activeTab, setActiveTab] = useState<TabKey>('personal');
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  // Personal info state
  const [personalInfo, setPersonalInfo] = useState({
    firstName: 'Nguyễn Văn',
    lastName: 'A',
    dob: '1980-03-15',
    gender: 'Nam',
    phone: '0901234567',
    email: 'nguyenvana@email.com',
    address: '123 Đường Nguyễn Trãi, Quận 1, TP.HCM',
    bloodType: 'O+',
    occupation: 'Kỹ sư',
    emergencyContact: '0912345678',
    emergencyName: 'Nguyễn Thị B',
  });

  // Insurance state
  const [insuranceInfo, setInsuranceInfo] = useState({
    cardNumber: 'DN123456789',
    issueDate: '2023-01-01',
    expiryDate: '2026-12-31',
    registerHospital: 'Bệnh viện Đa khoa Quốc tế',
    city: 'TP. Hồ Chí Minh',
  });

  // Medical history
  const [conditions, setConditions] = useState([
    { id: 1, name: 'Cao huyết áp', since: '2018', severity: 'medium', note: 'Đang kiểm soát bằng thuốc' },
    { id: 2, name: 'Tiểu đường type 2', since: '2020', severity: 'low', note: 'Chế độ ăn kiêng + thuốc' },
    { id: 3, name: 'Viêm dạ dày mãn tính', since: '2015', severity: 'medium', note: 'Cần tái khám định kỳ' },
  ]);
  const [newCondition, setNewCondition] = useState('');

  // Upload state
  const [uploadedFiles, setUploadedFiles] = useState([
    { id: 1, name: 'KQXN_Mau_050526.pdf', size: '1.2 MB', type: 'pdf', date: '2026-05-05' },
    { id: 2, name: 'Hinh_chup_Xquang.jpg', size: '3.5 MB', type: 'image', date: '2026-04-28' },
    { id: 3, name: 'Sieu_am_tim_200426.pdf', size: '2.8 MB', type: 'pdf', date: '2026-04-20' },
  ]);

  // Settings state
  const [settings, setSettings] = useState({
    emailNotif: true,
    smsNotif: true,
    appointmentReminders: true,
    healthAlerts: true,
    marketingEmails: false,
  });
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSavePersonal = () => {
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 3000);
  };

  const handleSaveInsurance = () => {
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 3000);
  };

  const handleAddCondition = () => {
    if (newCondition.trim()) {
      setConditions([...conditions, {
        id: Date.now(),
        name: newCondition,
        since: new Date().getFullYear().toString(),
        severity: 'low',
        note: ''
      }]);
      setNewCondition('');
    }
  };

  const handleRemoveCondition = (id: number) => {
    setConditions(conditions.filter(c => c.id !== id));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files).map((file) => ({
        id: Date.now() + Math.random(),
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        type: file.type.includes('pdf') ? 'pdf' : 'image',
        date: new Date().toISOString().split('T')[0],
      }));
      setUploadedFiles([...uploadedFiles, ...newFiles]);
    }
  };

  const handleChangePassword = () => {
    if (newPassword.length < 6) {
      setPasswordError('Mật khẩu mới phải có ít nhất 6 ký tự');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('Mật khẩu xác nhận không khớp');
      return;
    }
    setPasswordError('');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 3000);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-green-100 text-green-700';
    }
  };

  const getSeverityLabel = (severity: string) => {
    switch (severity) {
      case 'high': return 'Nặng';
      case 'medium': return 'Trung bình';
      default: return 'Nhẹ';
    }
  };

  const tabs = [
    { key: 'personal' as TabKey, label: 'Thông tin cá nhân', icon: User },
    { key: 'insurance' as TabKey, label: 'BHYT & Tiền sử', icon: Heart },
    { key: 'upload' as TabKey, label: 'Upload hồ sơ', icon: Upload },
    { key: 'settings' as TabKey, label: 'Cài đặt', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-cyan-50/30">
      <PatientHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Hồ sơ cá nhân</h1>
              <p className="text-gray-600">Quản lý thông tin cá nhân, bảo hiểm y tế và tiền sử bệnh</p>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="size-20 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                <Camera className="size-8 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all border-b-2 whitespace-nowrap ${
                    active
                      ? 'border-blue-600 text-blue-600 bg-blue-50'
                      : 'border-transparent text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="size-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >

            {/* Personal Info Tab */}
            {activeTab === 'personal' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <User className="size-6 text-blue-600" />
                  Thông tin cá nhân
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Họ</label>
                    <input
                      type="text"
                      value={personalInfo.firstName}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, firstName: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tên</label>
                    <input
                      type="text"
                      value={personalInfo.lastName}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, lastName: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ngày sinh</label>
                    <input
                      type="date"
                      value={personalInfo.dob}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, dob: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Giới tính</label>
                    <select
                      value={personalInfo.gender}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, gender: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    >
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                      <option value="Khác">Khác</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
                    <input
                      type="tel"
                      value={personalInfo.phone}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={personalInfo.email}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nhóm máu</label>
                    <select
                      value={personalInfo.bloodType}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, bloodType: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    >
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nghề nghiệp</label>
                    <input
                      type="text"
                      value={personalInfo.occupation}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, occupation: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Địa chỉ</label>
                    <input
                      type="text"
                      value={personalInfo.address}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, address: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Liên hệ khẩn cấp</label>
                    <input
                      type="tel"
                      value={personalInfo.emergencyContact}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, emergencyContact: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tên người liên hệ khẩn cấp</label>
                    <input
                      type="text"
                      value={personalInfo.emergencyName}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, emergencyName: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>
                <div className="mt-8 flex justify-end">
                  <button
                    onClick={handleSavePersonal}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center gap-2"
                  >
                    <Save className="size-5" />
                    Lưu thay đổi
                  </button>
                </div>
              </div>
            )}

            {/* Insurance & Medical History Tab */}
            {activeTab === 'insurance' && (
              <div className="space-y-6">
                {/* BHYT Info */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <ShieldCheck className="size-6 text-blue-600" />
                    Thông tin bảo hiểm y tế
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Số thẻ BHYT</label>
                      <input
                        type="text"
                        value={insuranceInfo.cardNumber}
                        onChange={(e) => setInsuranceInfo({ ...insuranceInfo, cardNumber: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Ngày cấp</label>
                      <input
                        type="date"
                        value={insuranceInfo.issueDate}
                        onChange={(e) => setInsuranceInfo({ ...insuranceInfo, issueDate: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Ngày hết hạn</label>
                      <input
                        type="date"
                        value={insuranceInfo.expiryDate}
                        onChange={(e) => setInsuranceInfo({ ...insuranceInfo, expiryDate: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nơi đăng ký KB</label>
                      <input
                        type="text"
                        value={insuranceInfo.registerHospital}
                        onChange={(e) => setInsuranceInfo({ ...insuranceInfo, registerHospital: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tỉnh/Thành phố</label>
                      <input
                        type="text"
                        value={insuranceInfo.city}
                        onChange={(e) => setInsuranceInfo({ ...insuranceInfo, city: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      />
                    </div>
                  </div>
                  <div className="mt-8 flex justify-end">
                    <button
                      onClick={handleSaveInsurance}
                      className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center gap-2"
                    >
                      <Save className="size-5" />
                      Lưu thông tin BHYT
                    </button>
                  </div>
                </div>

                {/* Medical History */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Heart className="size-6 text-red-500" />
                    Tiền sử bệnh
                  </h2>
                  <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertCircle className="size-5 text-blue-600" />
                      <span className="font-medium text-blue-900">Thông tin y tế quan trọng</span>
                    </div>
                    <p className="text-sm text-blue-800">
                      Tiền sử bệnh giúp bác sĩ hiểu rõ tình trạng sức khỏe của bạn và đưa ra chẩn đoán chính xác hơn.
                    </p>
                  </div>
                  <div className="space-y-3 mb-6">
                    {conditions.map((condition) => (
                      <div key={condition.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                        <div className="flex items-center gap-4">
                          <div className="size-10 bg-red-100 rounded-lg flex items-center justify-center">
                            <Heart className="size-5 text-red-500" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{condition.name}</h4>
                            <p className="text-sm text-gray-600">
                              Từ năm {condition.since} - {condition.note && `(${condition.note})`}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor(condition.severity)}`}>
                            {getSeverityLabel(condition.severity)}
                          </span>
                          <button
                            onClick={() => handleRemoveCondition(condition.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Thêm tiền sử bệnh (VD: Hen suyễn, Lupus...)"
                      value={newCondition}
                      onChange={(e) => setNewCondition(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddCondition()}
                      className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                    <button
                      onClick={handleAddCondition}
                      className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all flex items-center gap-2"
                    >
                      <Check className="size-5" />
                      Thêm
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Upload Documents Tab */}
            {activeTab === 'upload' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Upload className="size-6 text-blue-600" />
                  Upload hồ sơ y tế
                </h2>
                <div className="mb-8">
                  <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer">
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <div className="size-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Upload className="size-8 text-blue-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Kéo thả file vào đây hoặc nhấn để chọn
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Hỗ trợ: PDF, JPG, PNG, DOC, DOCX (tối đa 10MB mỗi file)
                      </p>
                      <div className="flex items-center justify-center gap-4">
                        <div className="flex items-center gap-1 px-3 py-1 bg-red-50 rounded-lg">
                          <FileText className="size-4 text-red-600" />
                          <span className="text-xs text-red-700">PDF</span>
                        </div>
                        <div className="flex items-center gap-1 px-3 py-1 bg-blue-50 rounded-lg">
                          <Image className="size-4 text-blue-600" />
                          <span className="text-xs text-blue-700">Hình ảnh</span>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-4">File đã tải lên ({uploadedFiles.length})</h3>
                <div className="space-y-3">
                  {uploadedFiles.map((file) => (
                    <div key={file.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="flex items-center gap-4">
                        <div className={`size-12 rounded-lg flex items-center justify-center ${
                          file.type === 'pdf' ? 'bg-red-100' : 'bg-blue-100'
                        }`}>
                          {file.type === 'pdf' ? (
                            <FileText className="size-6 text-red-600" />
                          ) : (
                            <Image className="size-6 text-blue-600" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{file.name}</h4>
                          <p className="text-sm text-gray-600">{file.size} - {new Date(file.date).toLocaleDateString('vi-VN')}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                          <Eye className="size-5" />
                        </button>
                        <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="size-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                {/* Notification Settings */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Bell className="size-6 text-blue-600" />
                    Cài đặt thông báo
                  </h2>
                  <div className="space-y-4">
                    {[
                      { key: 'emailNotif', label: 'Thông báo qua email', desc: 'Nhận thông báo lịch khám, kết quả xét nghiệm qua email' },
                      { key: 'smsNotif', label: 'Thông báo qua SMS', desc: 'Nhận tin nhắn nhắc lịch hẹn quan trọng' },
                      { key: 'appointmentReminders', label: 'Nhắc nhở lịch hẹn', desc: 'Thông báo trước 24h và 1h trước giờ khám' },
                      { key: 'healthAlerts', label: 'Cảnh báo sức khỏe', desc: 'Nhận thông báo về chỉ số sức khỏe bất thường' },
                      { key: 'marketingEmails', label: 'Email tiếp thị', desc: 'Nhận bản tin sức khỏe và khuyến mãi' },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div>
                          <h4 className="font-medium text-gray-900">{item.label}</h4>
                          <p className="text-sm text-gray-600">{item.desc}</p>
                        </div>
                        <button
                          onClick={() => setSettings({ ...settings, [item.key]: !settings[item.key as keyof typeof settings] })}
                          className={`relative size-12 rounded-full transition-all ${
                            settings[item.key as keyof typeof settings] ? 'bg-blue-600' : 'bg-gray-300'
                          }`}
                        >
                          <div className={`absolute size-10 bg-white rounded-full shadow-md top-1 transition-all ${
                            settings[item.key as keyof typeof settings] ? 'left-6' : 'left-1'
                          }`} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Password Change */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Lock className="size-6 text-blue-600" />
                    Đổi mật khẩu
                  </h2>
                  <div className="space-y-4 max-w-lg">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Mật khẩu hiện tại</label>
                      <div className="relative">
                        <input
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none pr-12"
                        />
                        <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                          <EyeOff className="size-5" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Mật khẩu mới</label>
                      <div className="relative">
                        <input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none pr-12"
                        />
                        <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                          <EyeOff className="size-5" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Xác nhận mật khẩu mới</label>
                      <div className="relative">
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none pr-12"
                        />
                        <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                          <EyeOff className="size-5" />
                        </button>
                      </div>
                    </div>
                    {passwordError && (
                      <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg text-red-700 text-sm">
                        <AlertCircle className="size-4" />
                        {passwordError}
                      </div>
                    )}
                    <button
                      onClick={handleChangePassword}
                      className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center gap-2"
                    >
                      <Lock className="size-5" />
                      Cập nhật mật khẩu
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Success Toast */}
      <AnimatePresence>
        {showSaveSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 z-50"
          >
            <div className="size-8 bg-white/20 rounded-full flex items-center justify-center">
              <Check className="size-5" />
            </div>
            <div>
              <p className="font-semibold">Lưu thành công!</p>
              <p className="text-sm text-green-100">Thông tin đã được cập nhật</p>
            </div>
            <button onClick={() => setShowSaveSuccess(false)} className="ml-2 hover:bg-white/20 rounded-lg p-1">
              <X className="size-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
