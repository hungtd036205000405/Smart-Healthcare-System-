import { motion, AnimatePresence } from 'motion/react';
import React, { useState } from 'react';
import {
  Calendar, Clock, Users, Check, X, AlertCircle,
  Video, Edit2, Trash2, Plus, ChevronLeft, ChevronRight,
  Search, Filter, CheckCircle2, XCircle, CalendarClock, RefreshCw,
  User, Phone, Mail, Stethoscope, MapPin
} from 'lucide-react';
import DoctorHeader from '../../components/doctor/DoctorHeader';

export default function DoctorSchedule() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'week' | 'day'>('week');
  const [filterStatus, setFilterStatus] = useState<'all' | 'confirmed' | 'pending' | 'cancelled'>('all');
  const [showNewBookingModal, setShowNewBookingModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [bookings, setBookings] = useState([
    { id: 1, patient: 'Nguyễn Văn A', age: '45', phone: '0901 234 567', time: '09:00', endTime: '09:30', status: 'confirmed', reason: 'Khám định kỳ tim mạch', type: 'offline', room: 'P101', priority: 'normal', date: '20/05/2026' },
    { id: 2, patient: 'Trần Thị B', age: '32', phone: '0902 345 678', time: '09:30', endTime: '10:00', status: 'confirmed', reason: 'Tái khám', type: 'online', room: 'P101', priority: 'high', date: '20/05/2026' },
    { id: 3, patient: 'Lê Văn C', age: '58', phone: '0903 456 789', time: '10:00', endTime: '10:30', status: 'pending', reason: 'Khám bệnh mới', type: 'offline', room: 'P101', priority: 'urgent', date: '20/05/2026' },
    { id: 4, patient: 'Phạm Thị D', age: '67', phone: '0904 567 890', time: '10:30', endTime: '11:00', status: 'confirmed', reason: 'Tư vấn trực tuyến', type: 'online', room: 'P101', priority: 'normal', date: '20/05/2026' },
    { id: 5, patient: 'Hoàng Văn E', age: '40', phone: '0905 678 901', time: '11:00', endTime: '11:30', status: 'cancelled', reason: 'Kiểm tra sức khỏe', type: 'offline', room: 'P101', priority: 'normal', date: '20/05/2026' },
    { id: 6, patient: 'Vũ Thị F', age: '52', phone: '0906 789 012', time: '13:00', endTime: '13:30', status: 'confirmed', reason: 'Tái khám định kỳ', type: 'offline', room: 'P101', priority: 'normal', date: '20/05/2026' },
    { id: 7, patient: 'Đặng Văn G', age: '35', phone: '0907 890 123', time: '13:30', endTime: '14:00', status: 'pending', reason: 'Đau ngực', type: 'online', room: 'P101', priority: 'urgent', date: '20/05/2026' },
    { id: 8, patient: 'Ngô Thị H', age: '48', phone: '0908 901 234', time: '14:00', endTime: '14:30', status: 'confirmed', reason: 'Theo dõi huyết áp', type: 'offline', room: 'P101', priority: 'high', date: '20/05/2026' },
    { id: 9, patient: 'Trịnh Văn I', age: '61', phone: '0909 012 345', time: '14:30', endTime: '15:00', status: 'confirmed', reason: 'Tư vấn điều trị', type: 'online', room: 'P101', priority: 'normal', date: '20/05/2026' },
    { id: 10, patient: 'Lý Thị J', age: '29', phone: '0910 123 456', time: '15:00', endTime: '15:30', status: 'pending', reason: 'Khám tổng quát', type: 'offline', room: 'P101', priority: 'normal', date: '20/05/2026' },
  ]);

  const [newBooking, setNewBooking] = useState({
    patient: '',
    age: '',
    phone: '',
    email: '',
    reason: '',
    date: '',
    time: '09:00',
    type: 'offline',
    priority: 'normal',
    notes: '',
  });

  const [bookingSuccess, setBookingSuccess] = useState(false);

  const daysInWeek = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() - currentDate.getDay() + i);
    return date;
  });

  const monthYear = currentDate.toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' });

  const timeSlots = Array.from({ length: 18 }, (_, i) => {
    const hour = Math.floor(i / 2) + 7;
    const minute = (i % 2) * 30;
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  });

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'confirmed': return { color: 'bg-green-100 text-green-700 border-green-200', label: 'Đã xác nhận', icon: CheckCircle2 };
      case 'pending': return { color: 'bg-yellow-100 text-yellow-700 border-yellow-200', label: 'Chờ xác nhận', icon: Clock };
      case 'cancelled': return { color: 'bg-red-100 text-red-700 border-red-200', label: 'Đã hủy', icon: XCircle };
      default: return { color: 'bg-gray-100 text-gray-700 border-gray-200', label: 'Chưa xác nhận', icon: AlertCircle };
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'border-l-4 border-l-red-500';
      case 'high': return 'border-l-4 border-l-orange-500';
      default: return 'border-l-4 border-l-green-500';
    }
  };

  const filteredBookings = bookings.filter(apt => {
    if (filterStatus !== 'all' && apt.status !== filterStatus) return false;
    if (selectedDate) {
      return apt.id === selectedDate;
    }
    return true;
  });

  const handleConfirm = (id: number) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'confirmed' } : b));
  };

  const handleCancel = (id: number) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'cancelled' } : b));
  };

  const handleDelete = (id: number) => {
    if (confirm('Bạn có chắc muốn xóa lịch hẹn này?')) {
      setBookings(prev => prev.filter(b => b.id !== id));
    }
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBooking.patient || !newBooking.phone || !newBooking.date || !newBooking.time || !newBooking.reason) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
      return;
    }
    const endHour = parseInt(newBooking.time.split(':')[0]) + 0.5;
    const endTime = `${Math.floor(endHour).toString().padStart(2, '0')}:${endHour % 1 === 0.5 ? '30' : '00'}`;
    const newId = Math.max(...bookings.map(b => b.id)) + 1;
    setBookings(prev => [...prev, {
      id: newId,
      patient: newBooking.patient,
      age: newBooking.age,
      phone: newBooking.phone,
      time: newBooking.time,
      endTime,
      status: 'pending',
      reason: newBooking.reason,
      type: newBooking.type,
      room: 'P101',
      priority: newBooking.priority,
      date: newBooking.date,
    }]);
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setShowNewBookingModal(false);
      setNewBooking({ patient: '', age: '', phone: '', email: '', reason: '', date: '', time: '09:00', type: 'offline', priority: 'normal', notes: '' });
    }, 2000);
  };

  const stats = [
    { label: 'Tổng lịch hẹn', value: bookings.length, icon: Calendar, color: 'from-blue-500 to-blue-600' },
    { label: 'Đã xác nhận', value: bookings.filter(a => a.status === 'confirmed').length, icon: CheckCircle2, color: 'from-green-500 to-green-600' },
    { label: 'Chờ xác nhận', value: bookings.filter(a => a.status === 'pending').length, icon: Clock, color: 'from-yellow-500 to-yellow-600' },
    { label: 'Đã hủy', value: bookings.filter(a => a.status === 'cancelled').length, icon: XCircle, color: 'from-red-500 to-red-600' },
  ];

  const bookedTimes = bookings.map(b => b.time);

  return (
    <div>
      <DoctorHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Quản lý lịch khám</h1>
            <p className="text-gray-600">Xem, xác nhận và quản lý lịch hẹn của bệnh nhân</p>
          </div>
          <button
            onClick={() => setShowNewBookingModal(true)}
            className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-xl hover:shadow-lg transition-all font-medium flex items-center gap-2 text-sm"
          >
            <Plus className="size-4" />
            Đặt lịch mới
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

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
            >
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-semibold text-gray-900 capitalize">{monthYear}</h2>
                  <div className="flex gap-1">
                    <button
                      onClick={() => { const d = new Date(currentDate); d.setMonth(d.getMonth() - 1); setCurrentDate(d); }}
                      className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <ChevronLeft className="size-4 text-gray-600" />
                    </button>
                    <button
                      onClick={() => setCurrentDate(new Date())}
                      className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors font-medium"
                    >
                      Hôm nay
                    </button>
                    <button
                      onClick={() => { const d = new Date(currentDate); d.setMonth(d.getMonth() + 1); setCurrentDate(d); }}
                      className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <ChevronRight className="size-4 text-gray-600" />
                    </button>
                  </div>
                </div>
                <div className="flex gap-1">
                  {['week', 'day'].map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setViewMode(mode as any)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        viewMode === mode ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {mode === 'week' ? 'Tuần' : 'Ngày'}
                    </button>
                  ))}
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-7 gap-2 mb-2">
                  {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map((day, i) => (
                    <div key={i} className="text-center text-xs font-semibold text-gray-500 py-2">{day}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {daysInWeek.map((date, i) => {
                    const isToday = date.toDateString() === new Date().toDateString();
                    const isSelected = selectedDate === date.getDate();
                    const aptCount = bookings.filter(a => a.id <= date.getDate() && a.id > date.getDate() - 5).length;
                    return (
                      <button
                        key={i}
                        onClick={() => setSelectedDate(isSelected ? null : date.getDate())}
                        className={`p-2 rounded-xl text-center transition-all ${
                          isToday ? 'bg-green-600 text-white' : isSelected ? 'bg-green-100 text-green-700' : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className={`text-sm font-bold ${isToday ? '' : 'text-gray-700'}`}>{date.getDate()}</div>
                        {aptCount > 0 && (
                          <div className={`mt-1 text-xs rounded-full px-1 py-0.5 ${
                            isToday ? 'bg-white/20 text-white' : 'bg-green-100 text-green-700'
                          }`}>
                            {aptCount} lịch
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 mt-6"
            >
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold text-gray-900">Danh sách lịch hẹn ({filteredBookings.length})</h3>
                  <div className="flex gap-2">
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value as any)}
                      className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none bg-white"
                    >
                      <option value="all">Tất cả</option>
                      <option value="confirmed">Đã xác nhận</option>
                      <option value="pending">Chờ xác nhận</option>
                      <option value="cancelled">Đã hủy</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="divide-y divide-gray-100">
                {filteredBookings.map((apt) => {
                  const statusConfig = getStatusConfig(apt.status);
                  return (
                    <div key={apt.id} className={`p-4 hover:bg-gray-50 transition-colors ${getPriorityColor(apt.priority)}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="size-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {apt.patient.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 text-sm">{apt.patient}</h4>
                            <p className="text-xs text-gray-500">{apt.age} tuổi · {apt.phone}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <div className="flex items-center gap-1 text-gray-600 bg-gray-100 rounded-lg px-2 py-1">
                            <Calendar className="size-3" />
                            <span>{apt.date}</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-600 bg-gray-100 rounded-lg px-2 py-1">
                            <Clock className="size-3" />
                            <span className="font-medium">{apt.time}</span>
                          </div>
                          <select
                            value={apt.status}
                            onChange={(e) => setBookings(prev => prev.map(b => b.id === apt.id ? { ...b, status: e.target.value } : b))}
                            className={`px-2 py-1 rounded-full text-xs font-medium border outline-none cursor-pointer ${
                              apt.status === 'confirmed' ? 'bg-green-100 text-green-700 border-green-200' :
                              apt.status === 'pending' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                              'bg-red-100 text-red-700 border-red-200'
                            }`}
                          >
                            <option value="pending">Chờ</option>
                            <option value="confirmed">Xác nhận</option>
                            <option value="cancelled">Hủy</option>
                          </select>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-gray-600">
                          <span className="flex items-center gap-1">
                            <Stethoscope className="size-3" />
                            {apt.reason}
                          </span>
                          {apt.type === 'online' && (
                            <span className="flex items-center gap-1 text-blue-600">
                              <Video className="size-3" />
                              Trực tuyến
                            </span>
                          )}
                        </div>
                        <div className="flex gap-1">
                          {apt.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleConfirm(apt.id)}
                                className="p-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-all"
                                title="Xác nhận"
                              >
                                <Check className="size-3.5" />
                              </button>
                              <button
                                onClick={() => handleCancel(apt.id)}
                                className="p-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-all"
                                title="Hủy"
                              >
                                <X className="size-3.5" />
                              </button>
                            </>
                          )}
                          {apt.status === 'confirmed' && (
                            <button
                              onClick={() => handleCancel(apt.id)}
                              className="p-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-all"
                              title="Hủy lịch"
                            >
                              <X className="size-3.5" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(apt.id)}
                            className="p-1.5 bg-gray-100 text-gray-500 rounded-lg hover:bg-red-100 hover:text-red-700 transition-all"
                            title="Xóa"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5"
            >
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar className="size-5 text-green-600" />
                Lịch hôm nay
              </h3>
              <div className="space-y-2">
                {timeSlots.slice(0, 10).map((time) => {
                  const apt = bookings.find(a => a.time === time);
                  return (
                    <div key={time} className="flex items-start gap-2">
                      <div className="w-12 text-xs text-gray-500 font-medium pt-1">{time}</div>
                      <div className={`flex-1 h-10 rounded-lg flex items-center px-2 text-xs font-medium ${
                        apt
                          ? apt.status === 'cancelled'
                            ? 'bg-red-50 text-red-600 border border-red-200'
                            : 'bg-green-50 text-green-700 border border-green-200'
                          : 'bg-gray-50 text-gray-400'
                      }`}>
                        {apt ? `${apt.patient} - ${apt.reason}` : 'Trống'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5"
            >
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Filter className="size-4 text-gray-600" />
                Bộ lọc nhanh
              </h3>
              <div className="space-y-2">
                {[
                  { label: 'Lịch khám online', count: bookings.filter(a => a.type === 'online').length },
                  { label: 'Lịch khám offline', count: bookings.filter(a => a.type === 'offline').length },
                  { label: 'Khẩn cấp', count: bookings.filter(a => a.priority === 'urgent').length },
                  { label: 'Cao ưu tiên', count: bookings.filter(a => a.priority === 'high').length },
                ].map((filter) => (
                  <button
                    key={filter.label}
                    onClick={() => setFilterStatus(filter.label === 'Lịch khám online' ? 'confirmed' : 'all')}
                    className="w-full p-2.5 bg-gray-50 hover:bg-green-50 rounded-xl text-left transition-all flex items-center justify-between"
                  >
                    <span className="text-sm text-gray-700">{filter.label}</span>
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-bold">{filter.count}</span>
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-green-600 to-emerald-500 rounded-2xl shadow-lg p-5 text-white"
            >
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Clock className="size-4" />
                Giờ làm việc
              </h3>
              <div className="space-y-2 text-sm">
                {[
                  { day: 'Thứ 2 - Thứ 6', time: '08:00 - 17:00' },
                  { day: 'Thứ 7', time: '08:00 - 12:00' },
                  { day: 'Chủ nhật', time: 'Nghỉ' },
                ].map((slot) => (
                  <div key={slot.day} className="flex justify-between">
                    <span className="text-white/80">{slot.day}</span>
                    <span className="font-medium">{slot.time}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Modal Đặt lịch mới */}
      <AnimatePresence>
        {showNewBookingModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowNewBookingModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
            >
              <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-10 bg-white/20 rounded-lg flex items-center justify-center">
                      <Plus className="size-5" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">Đặt lịch khám mới</h2>
                      <p className="text-green-100 text-sm">Tạo lịch hẹn cho bệnh nhân</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowNewBookingModal(false)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-all"
                  >
                    <X className="size-5" />
                  </button>
                </div>
              </div>

              {bookingSuccess ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="p-12 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: 'spring' }}
                    className="size-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <Check className="size-10 text-green-600" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Đặt lịch thành công!</h3>
                  <p className="text-gray-600">Lịch khám đã được thêm vào danh sách.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmitBooking} className="p-6 overflow-y-auto max-h-[calc(90vh-180px)] space-y-5">
                  {/* Thông tin bệnh nhân */}
                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <User className="size-4 text-blue-600" />
                      Thông tin bệnh nhân
                    </h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Họ tên bệnh nhân <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={newBooking.patient}
                          onChange={(e) => setNewBooking({ ...newBooking, patient: e.target.value })}
                          placeholder="VD: Nguyễn Văn A"
                          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Tuổi</label>
                        <input
                          type="number"
                          value={newBooking.age}
                          onChange={(e) => setNewBooking({ ...newBooking, age: e.target.value })}
                          placeholder="VD: 35"
                          min="0"
                          max="120"
                          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Số điện thoại <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          value={newBooking.phone}
                          onChange={(e) => setNewBooking({ ...newBooking, phone: e.target.value })}
                          placeholder="VD: 0901 234 567"
                          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          value={newBooking.email}
                          onChange={(e) => setNewBooking({ ...newBooking, email: e.target.value })}
                          placeholder="VD: email@example.com"
                          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Thông tin lịch khám */}
                  <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Calendar className="size-4 text-green-600" />
                      Thông tin lịch khám
                    </h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Ngày khám <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          value={newBooking.date}
                          onChange={(e) => setNewBooking({ ...newBooking, date: e.target.value })}
                          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Giờ khám <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={newBooking.time}
                          onChange={(e) => setNewBooking({ ...newBooking, time: e.target.value })}
                          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm bg-white"
                        >
                          {timeSlots.map(t => (
                            <option key={t} value={t} disabled={bookedTimes.includes(t)}>
                              {t} {bookedTimes.includes(t) ? '(đã đặt)' : ''}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Lý do khám <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={newBooking.reason}
                          onChange={(e) => setNewBooking({ ...newBooking, reason: e.target.value })}
                          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm bg-white"
                        >
                          <option value="">-- Chọn lý do --</option>
                          <option value="Khám bệnh mới">Khám bệnh mới</option>
                          <option value="Tái khám">Tái khám</option>
                          <option value="Khám định kỳ">Khám định kỳ</option>
                          <option value="Tư vấn trực tuyến">Tư vấn trực tuyến</option>
                          <option value="Đau ngực">Đau ngực</option>
                          <option value="Kiểm tra sức khỏe">Kiểm tra sức khỏe</option>
                          <option value="Theo dõi huyết áp">Theo dõi huyết áp</option>
                          <option value="Khám tổng quát">Khám tổng quát</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Hình thức</label>
                        <select
                          value={newBooking.type}
                          onChange={(e) => setNewBooking({ ...newBooking, type: e.target.value })}
                          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm bg-white"
                        >
                          <option value="offline">Khám trực tiếp</option>
                          <option value="online">Tư vấn trực tuyến</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Mức ưu tiên</label>
                        <select
                          value={newBooking.priority}
                          onChange={(e) => setNewBooking({ ...newBooking, priority: e.target.value })}
                          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm bg-white"
                        >
                          <option value="normal">Bình thường</option>
                          <option value="high">Cao ưu tiên</option>
                          <option value="urgent">Khẩn cấp</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Phòng khám</label>
                        <select className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm bg-white">
                          <option>P101 - Phòng Tim mạch</option>
                          <option>P102 - Phòng Nội tổng hợp</option>
                          <option>P103 - Phòng Tai mũi họng</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Ghi chú */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Ghi chú</label>
                    <textarea
                      value={newBooking.notes}
                      onChange={(e) => setNewBooking({ ...newBooking, notes: e.target.value })}
                      placeholder="Lời dặn, triệu chứng đặc biệt..."
                      rows={2}
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none resize-none text-sm"
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-2 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => setShowNewBookingModal(false)}
                      className="flex-1 px-5 py-2.5 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition-all font-medium"
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-xl hover:shadow-lg transition-all font-medium flex items-center justify-center gap-2"
                    >
                      <Check className="size-4" />
                      Xác nhận đặt lịch
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
