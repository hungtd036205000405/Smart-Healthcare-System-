import { motion } from 'motion/react';
import React, { useState } from 'react';
import {
  DollarSign, Users, TrendingUp, TrendingDown, Calendar,
  BarChart3, PieChart as PieChartIcon, ArrowUpRight, ArrowDownRight,
  Download, Filter, Star
} from 'lucide-react';
import DoctorHeader from '../../components/doctor/DoctorHeader';

export default function DoctorStats() {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [showPatientModal, setShowPatientModal] = useState(false);

  const weekData = [
    { month: 'T2', value: 25, label: '58M' },
    { month: 'T3', value: 30, label: '70M' },
    { month: 'T4', value: 22, label: '51M' },
    { month: 'T5', value: 35, label: '82M' },
    { month: 'T6', value: 40, label: '93M' },
    { month: 'T7', value: 15, label: '35M' },
    { month: 'CN', value: 8, label: '18M' },
  ];

  const monthData = [
    { month: 'T1', value: 65, label: '150M' },
    { month: 'T2', value: 72, label: '168M' },
    { month: 'T3', value: 68, label: '158M' },
    { month: 'T4', value: 85, label: '198M' },
    { month: 'T5', value: 78, label: '182M' },
    { month: 'T6', value: 92, label: '215M' },
  ];

  const yearData = [
    { month: '2025', value: 70, label: '1.8T' },
    { month: 'T1/26', value: 92, label: '215M' },
    { month: 'T2/26', value: 88, label: '205M' },
    { month: 'T3/26', value: 95, label: '221M' },
    { month: 'T4/26', value: 100, label: '233M' },
    { month: 'T5/26', value: 98, label: '228M' },
  ];

  const revenueData = timeRange === 'week' ? weekData : timeRange === 'month' ? monthData : yearData;
  const maxRevenue = Math.max(...revenueData.map(d => d.value));

  const patientTypes = [
    { name: 'Tái khám', value: 45, color: 'from-green-500 to-emerald-500' },
    { name: 'Khám bệnh mới', value: 30, color: 'from-blue-500 to-cyan-500' },
    { name: 'Tư vấn online', value: 15, color: 'from-purple-500 to-pink-500' },
    { name: 'Khám định kỳ', value: 10, color: 'from-orange-500 to-amber-500' },
  ];

  const topPatients = [
    { name: 'Nguyễn Văn A', visits: 12, lastVisit: '2026-05-15', totalSpent: '45M', status: 'active' },
    { name: 'Trần Thị B', visits: 8, lastVisit: '2026-05-10', totalSpent: '32M', status: 'active' },
    { name: 'Lê Văn C', visits: 6, lastVisit: '2026-05-05', totalSpent: '28M', status: 'active' },
    { name: 'Phạm Thị D', visits: 5, lastVisit: '2026-04-20', totalSpent: '24M', status: 'archived' },
    { name: 'Hoàng Văn E', visits: 4, lastVisit: '2026-05-01', totalSpent: '18M', status: 'active' },
  ];

  const summaryStats = {
    week: { patients: '157', revenue: '507M', appointments: '162', satisfaction: '94%' },
    month: { patients: '342', revenue: '1.07T', appointments: '358', satisfaction: '96%' },
    year: { patients: '1842', revenue: '4.8T', appointments: '1965', satisfaction: '97%' },
  };

  const currentStats = summaryStats[timeRange];

  const handleExportReport = () => {
    const content = `
========================================
BÁO CÁO THỐNG KÊ - BÁC SĨ
BS. Nguyễn Văn An
Khoa Tim mạch
========================================
Khoảng thời gian: ${timeRange === 'week' ? '7 ngày' : timeRange === 'month' ? 'Tháng 5/2026' : '6 tháng gần nhất'}
========================================
Tổng bệnh nhân: ${currentStats.patients}
Tổng doanh thu: ${currentStats.revenue} VNĐ
Lịch hẹn: ${currentStats.appointments}
Tỷ lệ hài lòng: ${currentStats.satisfaction}
========================================
PHÂN LOẠI BỆNH NHÂN:
- Tái khám: 45%
- Khám bệnh mới: 30%
- Tư vấn online: 15%
- Khám định kỳ: 10%
========================================
Ngày xuất: ${new Date().toLocaleDateString('vi-VN')}
Bệnh viện MediCare Healthcare System
`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bao-cao-thong-ke-bac-si-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePatientClick = (patient: any) => {
    setSelectedPatient(patient);
    setShowPatientModal(true);
  };

  return (
    <div>
      <DoctorHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Thống kê cá nhân</h1>
            <p className="text-gray-600">Theo dõi doanh thu và số lượng bệnh nhân</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex bg-white rounded-xl border border-gray-200 p-1">
              {(['week', 'month', 'year'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    timeRange === range
                      ? 'bg-green-600 text-white shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {range === 'week' ? '7 ngày' : range === 'month' ? 'Tháng' : 'Năm'}
                </button>
              ))}
            </div>
            <button
              onClick={handleExportReport}
              className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium flex items-center gap-2 text-sm"
            >
              <Download className="size-4" />
              Xuất báo cáo
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Tổng bệnh nhân', value: currentStats.patients, change: '+12%', trend: 'up', icon: Users },
            { label: 'Doanh thu', value: currentStats.revenue, change: '+8.5%', trend: 'up', icon: DollarSign },
            { label: 'Lịch hẹn', value: currentStats.appointments, change: '-3%', trend: 'down', icon: Calendar },
            { label: 'Hài lòng', value: currentStats.satisfaction, change: '+1.2%', trend: 'up', icon: Star },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`Size-10 bg-gradient-to-br ${index === 0 ? 'from-blue-500 to-blue-600' : index === 1 ? 'from-green-500 to-green-600' : index === 2 ? 'from-purple-500 to-purple-600' : 'from-yellow-500 to-amber-500'} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="size-5 text-white" />
                </div>
                <div className={`flex items-center gap-0.5 text-xs font-semibold ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="size-3.5" />
                  ) : (
                    <ArrowDownRight className="size-3.5" />
                  )}
                  {stat.change}
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-xs text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Doanh thu theo tháng</h3>
                  <p className="text-sm text-gray-500">6 tháng gần nhất</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-sm text-gray-600">
                    <span className="size-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></span>
                    Doanh thu
                  </span>
                </div>
              </div>
              <div className="h-72 flex items-end justify-between gap-3">
                {revenueData.map((item, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full relative group">
                      <div
                        className="w-full bg-gradient-to-t from-green-600 via-green-500 to-emerald-400 rounded-t-xl transition-all duration-500 hover:from-green-700 hover:to-emerald-500 cursor-pointer shadow-md"
                        style={{ height: `${(item.value / maxRevenue) * 260}px` }}
                      >
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-2.5 py-1.5 rounded-lg text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
                          {item.label} VNĐ
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-gray-600">{item.month}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Loại bệnh nhân</h3>
                <PieChartIcon className="size-5 text-gray-400" />
              </div>
              <div className="space-y-3">
                {patientTypes.map((type, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{type.name}</span>
                      <span className="text-sm font-bold text-gray-900">{type.value}%</span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${type.value}%` }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className={`h-full bg-gradient-to-r ${type.color} rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-green-600 to-emerald-500 rounded-2xl shadow-lg p-6 text-white"
            >
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="size-5" />
                Tóm tắt {timeRange === 'week' ? '7 ngày' : timeRange === 'month' ? 'tháng này' : '6 tháng'}
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/80 text-sm">Tổng bệnh nhân</span>
                  <span className="font-bold">{currentStats.patients} người</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80 text-sm">Tổng lịch hẹn</span>
                  <span className="font-bold">{currentStats.appointments} lịch</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80 text-sm">Hoàn thành</span>
                  <span className="font-bold">{Math.round(parseInt(currentStats.appointments) * 0.93)} ({Math.round(parseInt(currentStats.appointments) * 0.93 * 10 / parseInt(currentStats.appointments))}%)</span>
                </div>
                <div className="pt-3 border-t border-white/20">
                  <div className="flex justify-between">
                    <span className="text-white/80 text-sm font-medium">Tổng doanh thu</span>
                    <span className="text-xl font-bold">{currentStats.revenue} VNĐ</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
        >
          <div className="p-5 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Bệnh nhân thường xuyên</h3>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                Top 5
              </span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Bệnh nhân</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Số lần khám</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Khám gần nhất</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Tổng chi tiêu</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {topPatients.map((patient, index) => (
                  <tr
                    key={index}
                    onClick={() => handlePatientClick(patient)}
                    className="hover:bg-green-50 cursor-pointer transition-colors"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-9 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <span className="font-semibold text-gray-900 text-sm">{patient.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm font-bold text-gray-900">{patient.visits} lần</td>
                    <td className="px-5 py-4 text-sm text-gray-600">{new Date(patient.lastVisit).toLocaleDateString('vi-VN')}</td>
                    <td className="px-5 py-4 text-sm font-bold text-green-600">{patient.totalSpent}</td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        patient.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {patient.status === 'active' ? 'Đang theo dõi' : 'Đã kết thúc'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* Modal Chi tiết bệnh nhân */}
      {showPatientModal && selectedPatient && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white p-6 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-12 bg-white/20 rounded-full flex items-center justify-center font-bold text-lg">
                  {selectedPatient.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-xl font-bold">{selectedPatient.name}</h2>
                  <p className="text-green-100 text-sm">{selectedPatient.visits} lần khám</p>
                </div>
              </div>
              <button onClick={() => setShowPatientModal(false)} className="p-2 hover:bg-white/20 rounded-lg">
                <X className="size-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <div className="text-xs text-gray-500 mb-1">Số lần khám</div>
                  <div className="text-xl font-bold text-gray-900">{selectedPatient.visits} lần</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <div className="text-xs text-gray-500 mb-1">Tổng chi tiêu</div>
                  <div className="text-xl font-bold text-green-600">{selectedPatient.totalSpent}</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <div className="text-xs text-gray-500 mb-1">Khám gần nhất</div>
                  <div className="text-sm font-bold text-gray-900">{new Date(selectedPatient.lastVisit).toLocaleDateString('vi-VN')}</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <div className="text-xs text-gray-500 mb-1">Trạng thái</div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                    selectedPatient.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {selectedPatient.status === 'active' ? 'Đang theo dõi' : 'Đã kết thúc'}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => { setShowPatientModal(false); window.location.href = '/doctor/records'; }}
                  className="flex-1 px-4 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 font-medium text-sm"
                >
                  Xem bệnh án
                </button>
                <button
                  onClick={() => { setShowPatientModal(false); window.location.href = '/doctor/schedule'; }}
                  className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 font-medium text-sm"
                >
                  Đặt lịch khám
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
