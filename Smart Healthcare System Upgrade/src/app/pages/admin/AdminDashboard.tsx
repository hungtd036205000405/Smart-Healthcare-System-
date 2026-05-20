import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import {
  DollarSign, Users, Calendar, TrendingUp, Activity, AlertCircle, Download,
  Filter, Search, Plus, Edit2, Trash2, X, Check, Clock, UserPlus,
  FileText, Settings, BarChart3, Brain, Stethoscope, Save, ChevronDown
} from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'doctors' | 'experts' | 'patients' | 'schedule'>('overview');
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [showExpertModal, setShowExpertModal] = useState(false);
  const [showPatientModal, setShowPatientModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSpecialty, setFilterSpecialty] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [deleteItem, setDeleteItem] = useState<any>(null);

  const stats = [
    {
      label: 'Doanh thu tháng',
      value: '450M',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'from-green-500 to-green-600'
    },
    {
      label: 'Bệnh nhân mới',
      value: '2,543',
      change: '+8.2%',
      trend: 'up',
      icon: Users,
      color: 'from-blue-500 to-blue-600'
    },
    {
      label: 'Lịch hẹn hôm nay',
      value: '342',
      change: '-3.1%',
      trend: 'down',
      icon: Calendar,
      color: 'from-purple-500 to-purple-600'
    },
    {
      label: 'Tỷ lệ lấp đầy',
      value: '87%',
      change: '+5.4%',
      trend: 'up',
      icon: TrendingUp,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const [doctors, setDoctors] = useState([
    { id: 1, name: 'BS. Nguyễn Văn An', specialty: 'Tim mạch', phone: '0901234567', email: 'nva@hospital.com', status: 'active', patients: 145, revenue: '43.5M' },
    { id: 2, name: 'BS. Trần Thị Bình', specialty: 'Nhi khoa', phone: '0902345678', email: 'ttb@hospital.com', status: 'active', patients: 132, revenue: '39.6M' },
    { id: 3, name: 'BS. Lê Minh Cường', specialty: 'Da liễu', phone: '0903456789', email: 'lmc@hospital.com', status: 'active', patients: 128, revenue: '38.4M' },
    { id: 4, name: 'BS. Phạm Thu Dung', specialty: 'Phụ sản', phone: '0904567890', email: 'ptd@hospital.com', status: 'active', patients: 156, revenue: '46.8M' },
    { id: 5, name: 'BS. Hoàng Minh Đức', specialty: 'Nội khoa', phone: '0905678901', email: 'hmd@hospital.com', status: 'inactive', patients: 98, revenue: '29.4M' }
  ]);

  const [experts, setExperts] = useState([
    { id: 1, name: 'Nguyễn Thị Lan', position: 'Chuyên gia AI', department: 'Chatbot & Tư vấn', phone: '0911234567', email: 'ntl@hospital.com', status: 'active', specialty: 'AI Healthcare' },
    { id: 2, name: 'Trần Văn Hùng', position: 'Chuyên gia phân tích', department: 'Data Analytics', phone: '0912345678', email: 'tvh@hospital.com', status: 'active', specialty: 'Big Data' },
    { id: 3, name: 'Lê Thị Mai', position: 'Chuyên gia tâm lý', department: 'Tư vấn sức khỏe', phone: '0913456789', email: 'ltm@hospital.com', status: 'active', specialty: 'Psychology' },
    { id: 4, name: 'Phạm Văn Nam', position: 'Chuyên gia dinh dưỡng', department: 'Tư vấn sức khỏe', phone: '0914567890', email: 'pvn@hospital.com', status: 'active', specialty: 'Nutrition' },
    { id: 5, name: 'Hoàng Thị Thu', position: 'Chuyên gia nghiên cứu', department: 'R&D', phone: '0915678901', email: 'htt@hospital.com', status: 'active', specialty: 'Medical Research' }
  ]);

  const [patients, setPatients] = useState([
    { id: 1, name: 'Nguyễn Văn A', age: 45, gender: 'Nam', phone: '0921234567', lastVisit: '2024-05-01', diagnosis: 'Cao huyết áp', doctor: 'BS. Nguyễn Văn An' },
    { id: 2, name: 'Trần Thị B', age: 32, gender: 'Nữ', phone: '0922345678', lastVisit: '2024-05-02', diagnosis: 'Viêm họng', doctor: 'BS. Trần Thị Bình' },
    { id: 3, name: 'Lê Văn C', age: 28, gender: 'Nam', phone: '0923456789', lastVisit: '2024-05-03', diagnosis: 'Dị ứng da', doctor: 'BS. Lê Minh Cường' },
    { id: 4, name: 'Phạm Thị D', age: 35, gender: 'Nữ', phone: '0924567890', lastVisit: '2024-05-04', diagnosis: 'Thai nghén', doctor: 'BS. Phạm Thu Dung' }
  ]);

  const [schedules, setSchedules] = useState([
    { id: 1, doctor: 'BS. Nguyễn Văn An', day: 'Thứ 2', time: '08:00 - 12:00', room: 'P101', maxPatients: 20 },
    { id: 2, doctor: 'BS. Trần Thị Bình', day: 'Thứ 2', time: '13:00 - 17:00', room: 'P102', maxPatients: 15 },
    { id: 3, doctor: 'BS. Lê Minh Cường', day: 'Thứ 3', time: '08:00 - 12:00', room: 'P103', maxPatients: 18 },
    { id: 4, doctor: 'BS. Phạm Thu Dung', day: 'Thứ 3', time: '13:00 - 17:00', room: 'P104', maxPatients: 16 }
  ]);

  const specialties = ['Tất cả', 'Tim mạch', 'Nhi khoa', 'Da liễu', 'Phụ sản', 'Nội khoa'];

  const handleAddDoctor = () => {
    setEditingItem(null);
    setShowDoctorModal(true);
  };

  const handleEditDoctor = (doctor: any) => {
    setEditingItem(doctor);
    setShowDoctorModal(true);
  };

  const handleDeleteClick = (item: any, type: string) => {
    setDeleteItem({ ...item, type });
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (deleteItem) {
      if (deleteItem.type === 'doctor') {
        setDoctors(doctors.filter(d => d.id !== deleteItem.id));
      } else if (deleteItem.type === 'expert') {
        setExperts(experts.filter(s => s.id !== deleteItem.id));
      } else if (deleteItem.type === 'patient') {
        setPatients(patients.filter(p => p.id !== deleteItem.id));
      } else if (deleteItem.type === 'schedule') {
        setSchedules(schedules.filter(s => s.id !== deleteItem.id));
      }
    }
    setShowDeleteConfirm(false);
    setDeleteItem(null);
  };

  const handleExportReport = () => {
    alert('Đang xuất báo cáo... File sẽ được tải về trong giây lát.');
  };

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = filterSpecialty === 'all' || filterSpecialty === 'Tất cả' || doctor.specialty === filterSpecialty;
    const matchesStatus = filterStatus === 'all' || doctor.status === filterStatus;
    return matchesSearch && matchesSpecialty && matchesStatus;
  });

  const filteredExperts = experts.filter(e =>
    e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPatients = patients.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.diagnosis.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSchedules = schedules.filter(s =>
    s.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.day.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-cyan-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-2">
                Quản trị hệ thống
              </h1>
              <p className="text-gray-600">Quản lý toàn diện bác sĩ, nhân viên, bệnh nhân và lịch làm việc</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleExportReport}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2 font-medium"
              >
                <Download className="size-5" />
                Xuất báo cáo
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 bg-white rounded-xl p-2 shadow-sm border border-gray-200">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                activeTab === 'overview'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <BarChart3 className="size-5" />
              Tổng quan
            </button>
            <button
              onClick={() => setActiveTab('doctors')}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                activeTab === 'doctors'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Stethoscope className="size-5" />
              Bác sĩ
            </button>
            <button
              onClick={() => setActiveTab('experts')}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                activeTab === 'experts'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Brain className="size-5" />
              Chuyên gia
            </button>
            <button
              onClick={() => setActiveTab('patients')}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                activeTab === 'patients'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Users className="size-5" />
              Bệnh nhân
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                activeTab === 'schedule'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Clock className="size-5" />
              Lịch làm việc
            </button>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-xl transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`size-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                      <stat.icon className="size-7 text-white" />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      stat.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Revenue Chart */}
              <div className="lg:col-span-2 space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
                >
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">Doanh thu theo tháng</h2>
                    <select className="px-4 py-2 border border-gray-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                      <option>6 tháng gần nhất</option>
                      <option>12 tháng gần nhất</option>
                      <option>Năm nay</option>
                    </select>
                  </div>
                  <div className="h-72 flex items-end justify-between gap-3">
                    {[65, 72, 68, 85, 78, 92].map((height, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center gap-3">
                        <div className="w-full relative group">
                          <div
                            className="w-full bg-gradient-to-t from-blue-600 via-blue-500 to-cyan-400 rounded-t-xl transition-all duration-300 hover:from-blue-700 hover:to-cyan-500 cursor-pointer shadow-lg"
                            style={{ height: `${height * 2.5}px` }}
                          >
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-3 py-1.5 rounded-lg text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
                              {height}M VNĐ
                            </div>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-gray-600">Tháng {index + 1}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Quick Stats Grid */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="grid grid-cols-3 gap-6"
                >
                  <div className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl shadow-lg p-6 text-white">
                    <div className="flex items-center justify-between mb-2">
                      <Stethoscope className="size-8" />
                      <span className="text-4xl font-bold">{doctors.length}</span>
                    </div>
                    <div className="text-sm font-medium text-white/90">Tổng bác sĩ</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-600 to-emerald-500 rounded-2xl shadow-lg p-6 text-white">
                    <div className="flex items-center justify-between mb-2">
                      <Users className="size-8" />
                      <span className="text-4xl font-bold">15.2K</span>
                    </div>
                    <div className="text-sm font-medium text-white/90">Tổng bệnh nhân</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-600 to-pink-500 rounded-2xl shadow-lg p-6 text-white">
                    <div className="flex items-center justify-between mb-2">
                      <Calendar className="size-8" />
                      <span className="text-4xl font-bold">24</span>
                    </div>
                    <div className="text-sm font-medium text-white/90">Phòng khám</div>
                  </div>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* System Alerts */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-200"
                >
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-bold text-gray-900">Cảnh báo hệ thống</h2>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-start gap-3 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-xl">
                      <AlertCircle className="size-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-yellow-900 text-sm mb-1">Tỷ lệ hủy lịch cao</h4>
                        <p className="text-xs text-yellow-700">15% lịch hẹn bị hủy trong tuần qua</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
                      <Activity className="size-6 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-blue-900 text-sm mb-1">Cập nhật hệ thống</h4>
                        <p className="text-xs text-blue-700">Phiên bản mới có sẵn (v2.5.0)</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-green-50 border-2 border-green-200 rounded-xl">
                      <Check className="size-6 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-green-900 text-sm mb-1">Hệ thống ổn định</h4>
                        <p className="text-xs text-green-700">Uptime 99.9% trong tháng này</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Top Doctors */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-200"
                >
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-bold text-gray-900">Bác sĩ xuất sắc</h2>
                  </div>
                  <div className="p-6 space-y-3">
                    {doctors.filter(d => d.status === 'active').slice(0, 4).map((doctor, index) => (
                      <div key={doctor.id} className="flex items-start gap-3 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl hover:shadow-md transition-all border border-blue-100">
                        <div className="size-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-lg">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 truncate">{doctor.name}</h3>
                          <p className="text-sm text-blue-600 font-medium">{doctor.specialty}</p>
                          <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                            <div>
                              <span className="text-gray-500">BN:</span>
                              <span className="ml-1 font-bold text-gray-900">{doctor.patients}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">DT:</span>
                              <span className="ml-1 font-bold text-green-600">{doctor.revenue}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </>
        )}

        {/* Doctors Tab */}
        {activeTab === 'doctors' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Quản lý bác sĩ</h2>
                  <button
                    onClick={handleAddDoctor}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2 font-medium"
                  >
                    <Plus className="size-5" />
                    Thêm bác sĩ
                  </button>
                </div>

                {/* Search and Filters */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Tìm kiếm theo tên, chuyên khoa..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                    />
                  </div>
                  <select
                    value={filterSpecialty}
                    onChange={(e) => setFilterSpecialty(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium bg-white"
                  >
                    {specialties.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium bg-white"
                  >
                    <option value="all">Tất cả trạng thái</option>
                    <option value="active">Đang hoạt động</option>
                    <option value="inactive">Tạm nghỉ</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Bác sĩ</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Chuyên khoa</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Liên hệ</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Bệnh nhân</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Doanh thu</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Trạng thái</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredDoctors.map((doctor) => (
                      <tr key={doctor.id} className="hover:bg-blue-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-bold text-gray-900">{doctor.name}</div>
                          <div className="text-sm text-gray-500">{doctor.email}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                            {doctor.specialty}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 font-medium">{doctor.phone}</td>
                        <td className="px-6 py-4 text-sm font-bold text-gray-900">{doctor.patients}</td>
                        <td className="px-6 py-4 text-sm font-bold text-green-600">{doctor.revenue}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            doctor.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {doctor.status === 'active' ? 'Hoạt động' : 'Tạm nghỉ'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleEditDoctor(doctor)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                              title="Chỉnh sửa"
                            >
                              <Edit2 className="size-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteClick(doctor, 'doctor')}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                              title="Xóa"
                            >
                              <Trash2 className="size-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Experts Tab */}
        {activeTab === 'experts' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Quản lý chuyên gia</h2>
                  <button
                    onClick={() => setShowExpertModal(true)}
                    className="px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2 font-medium"
                  >
                    <UserPlus className="size-5" />
                    Thêm chuyên gia
                  </button>
                </div>

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm theo tên, chức vụ, chuyên môn..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-orange-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Chuyên gia</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Chức vụ</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Chuyên môn</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Phòng ban</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Liên hệ</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Trạng thái</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredExperts.map((e) => (
                      <tr key={e.id} className="hover:bg-orange-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-bold text-gray-900">{e.name}</div>
                          <div className="text-sm text-gray-500">{e.email}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                            {e.position}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                            {e.specialty}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 font-medium">{e.department}</td>
                        <td className="px-6 py-4 text-sm text-gray-600 font-medium">{e.phone}</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                            {e.status === 'active' ? 'Hoạt động' : 'Tạm nghỉ'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="Chỉnh sửa">
                              <Edit2 className="size-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteClick(e, 'expert')}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                              title="Xóa"
                            >
                              <Trash2 className="size-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Patients Tab */}
        {activeTab === 'patients' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Quản lý bệnh nhân</h2>
                  <button
                    onClick={() => setShowPatientModal(true)}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2 font-medium"
                  >
                    <UserPlus className="size-5" />
                    Thêm bệnh nhân
                  </button>
                </div>

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm theo tên, chẩn đoán..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-purple-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Bệnh nhân</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Tuổi</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Giới tính</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Liên hệ</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Khám gần nhất</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Chẩn đoán</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Bác sĩ</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredPatients.map((p) => (
                      <tr key={p.id} className="hover:bg-purple-50/50 transition-colors">
                        <td className="px-6 py-4 font-bold text-gray-900">{p.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-600 font-medium">{p.age}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            p.gender === 'Nam' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'
                          }`}>
                            {p.gender}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 font-medium">{p.phone}</td>
                        <td className="px-6 py-4 text-sm text-gray-600 font-medium">{p.lastVisit}</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                            {p.diagnosis}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 font-medium">{p.doctor}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="Chỉnh sửa">
                              <Edit2 className="size-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteClick(p, 'patient')}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                              title="Xóa"
                            >
                              <Trash2 className="size-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Schedule Tab */}
        {activeTab === 'schedule' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Quản lý lịch làm việc</h2>
                  <button
                    onClick={() => setShowScheduleModal(true)}
                    className="px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-500 text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2 font-medium"
                  >
                    <Plus className="size-5" />
                    Thêm lịch
                  </button>
                </div>

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm theo bác sĩ, thời gian..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-orange-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Bác sĩ</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Ngày</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Giờ làm việc</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Phòng</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Số BN tối đa</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredSchedules.map((s) => (
                      <tr key={s.id} className="hover:bg-orange-50/50 transition-colors">
                        <td className="px-6 py-4 font-bold text-gray-900">{s.doctor}</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                            {s.day}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 font-medium">{s.time}</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                            {s.room}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-bold text-gray-900">{s.maxPatients} người</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="Chỉnh sửa">
                              <Edit2 className="size-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteClick(s, 'schedule')}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                              title="Xóa"
                            >
                              <Trash2 className="size-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8"
            >
              <div className="text-center">
                <div className="size-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="size-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Xác nhận xóa</h3>
                <p className="text-gray-600 mb-6">
                  Bạn có chắc chắn muốn xóa <span className="font-bold">{deleteItem?.name || 'mục này'}</span>?
                  Hành động này không thể hoàn tác.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowDeleteConfirm(false);
                      setDeleteItem(null);
                    }}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={handleConfirmDelete}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:shadow-lg transition-all font-medium"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Doctor Modal */}
      <AnimatePresence>
        {showDoctorModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 my-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  {editingItem ? 'Chỉnh sửa bác sĩ' : 'Thêm bác sĩ mới'}
                </h3>
                <button
                  onClick={() => {
                    setShowDoctorModal(false);
                    setEditingItem(null);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                >
                  <X className="size-6" />
                </button>
              </div>

              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Họ và tên</label>
                    <input
                      type="text"
                      defaultValue={editingItem?.name}
                      placeholder="BS. Nguyễn Văn A"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Chuyên khoa</label>
                    <select
                      defaultValue={editingItem?.specialty}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium bg-white"
                    >
                      <option>Tim mạch</option>
                      <option>Nhi khoa</option>
                      <option>Da liễu</option>
                      <option>Phụ sản</option>
                      <option>Nội khoa</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Số điện thoại</label>
                    <input
                      type="tel"
                      defaultValue={editingItem?.phone}
                      placeholder="0901234567"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue={editingItem?.email}
                      placeholder="doctor@hospital.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Trạng thái</label>
                    <select
                      defaultValue={editingItem?.status || 'active'}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium bg-white"
                    >
                      <option value="active">Đang hoạt động</option>
                      <option value="inactive">Tạm nghỉ</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 mt-8">
                  <button
                    type="button"
                    onClick={() => {
                      setShowDoctorModal(false);
                      setEditingItem(null);
                    }}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowDoctorModal(false);
                      setEditingItem(null);
                      alert('Đã lưu thông tin bác sĩ thành công!');
                    }}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:shadow-lg transition-all font-medium flex items-center justify-center gap-2"
                  >
                    <Save className="size-5" />
                    Lưu thông tin
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Expert Modal */}
      <AnimatePresence>
        {showExpertModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 my-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Thêm chuyên gia mới</h3>
                <button
                  onClick={() => setShowExpertModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                >
                  <X className="size-6" />
                </button>
              </div>

              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Họ và tên</label>
                    <input
                      type="text"
                      placeholder="Nguyễn Văn A"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Chức vụ</label>
                    <input
                      type="text"
                      placeholder="Chuyên gia AI"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Chuyên môn</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium bg-white">
                      <option>AI Healthcare</option>
                      <option>Big Data</option>
                      <option>Psychology</option>
                      <option>Nutrition</option>
                      <option>Medical Research</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phòng ban</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium bg-white">
                      <option>Chatbot & Tư vấn</option>
                      <option>Data Analytics</option>
                      <option>Tư vấn sức khỏe</option>
                      <option>R&D</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Số điện thoại</label>
                    <input
                      type="tel"
                      placeholder="0901234567"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      placeholder="expert@hospital.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-8">
                  <button
                    type="button"
                    onClick={() => setShowExpertModal(false)}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowExpertModal(false);
                      alert('Đã thêm chuyên gia thành công!');
                    }}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-500 text-white rounded-xl hover:shadow-lg transition-all font-medium flex items-center justify-center gap-2"
                  >
                    <Save className="size-5" />
                    Lưu thông tin
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Patient Modal */}
      <AnimatePresence>
        {showPatientModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 my-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Thêm bệnh nhân mới</h3>
                <button
                  onClick={() => setShowPatientModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                >
                  <X className="size-6" />
                </button>
              </div>

              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Họ và tên</label>
                    <input
                      type="text"
                      placeholder="Nguyễn Văn A"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Tuổi</label>
                    <input
                      type="number"
                      placeholder="30"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Giới tính</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium bg-white">
                      <option>Nam</option>
                      <option>Nữ</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Số điện thoại</label>
                    <input
                      type="tel"
                      placeholder="0901234567"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Chẩn đoán</label>
                    <input
                      type="text"
                      placeholder="Cao huyết áp"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Bác sĩ phụ trách</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium bg-white">
                      {doctors.map(d => (
                        <option key={d.id}>{d.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 mt-8">
                  <button
                    type="button"
                    onClick={() => setShowPatientModal(false)}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowPatientModal(false);
                      alert('Đã thêm bệnh nhân thành công!');
                    }}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl hover:shadow-lg transition-all font-medium flex items-center justify-center gap-2"
                  >
                    <Save className="size-5" />
                    Lưu thông tin
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Schedule Modal */}
      <AnimatePresence>
        {showScheduleModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 my-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Thêm lịch làm việc</h3>
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                >
                  <X className="size-6" />
                </button>
              </div>

              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Bác sĩ</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium bg-white">
                      {doctors.filter(d => d.status === 'active').map(d => (
                        <option key={d.id}>{d.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Ngày trong tuần</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium bg-white">
                      <option>Thứ 2</option>
                      <option>Thứ 3</option>
                      <option>Thứ 4</option>
                      <option>Thứ 5</option>
                      <option>Thứ 6</option>
                      <option>Thứ 7</option>
                      <option>Chủ nhật</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Giờ bắt đầu</label>
                    <input
                      type="time"
                      defaultValue="08:00"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Giờ kết thúc</label>
                    <input
                      type="time"
                      defaultValue="17:00"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phòng khám</label>
                    <input
                      type="text"
                      placeholder="P101"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Số bệnh nhân tối đa</label>
                    <input
                      type="number"
                      defaultValue="20"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-8">
                  <button
                    type="button"
                    onClick={() => setShowScheduleModal(false)}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowScheduleModal(false);
                      alert('Đã thêm lịch làm việc thành công!');
                    }}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-500 text-white rounded-xl hover:shadow-lg transition-all font-medium flex items-center justify-center gap-2"
                  >
                    <Save className="size-5" />
                    Lưu lịch làm việc
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
