import { motion } from 'motion/react';
import { useState } from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Activity, Heart, Droplet, TrendingUp, TrendingDown, Minus, Plus, Calendar, Download } from 'lucide-react';

export default function HealthTrackingPage() {
  const [timeRange, setTimeRange] = useState<'7days' | '30days' | '90days'>('30days');

  const bloodPressureData = [
    { date: '01/04', systolic: 120, diastolic: 80 },
    { date: '05/04', systolic: 125, diastolic: 82 },
    { date: '10/04', systolic: 118, diastolic: 78 },
    { date: '15/04', systolic: 122, diastolic: 81 },
    { date: '20/04', systolic: 119, diastolic: 79 },
    { date: '25/04', systolic: 121, diastolic: 80 },
    { date: '30/04', systolic: 120, diastolic: 80 },
    { date: '05/05', systolic: 123, diastolic: 82 }
  ];

  const heartRateData = [
    { date: '01/04', bpm: 72 },
    { date: '05/04', bpm: 75 },
    { date: '10/04', bpm: 70 },
    { date: '15/04', bpm: 73 },
    { date: '20/04', bpm: 71 },
    { date: '25/04', bpm: 74 },
    { date: '30/04', bpm: 72 },
    { date: '05/05', bpm: 72 }
  ];

  const glucoseData = [
    { date: '01/04', level: 95 },
    { date: '05/04', level: 98 },
    { date: '10/04', level: 92 },
    { date: '15/04', level: 96 },
    { date: '20/04', level: 94 },
    { date: '25/04', level: 97 },
    { date: '30/04', level: 95 },
    { date: '05/05', level: 93 }
  ];

  const weightData = [
    { date: '01/04', weight: 70.2 },
    { date: '08/04', weight: 69.8 },
    { date: '15/04', weight: 69.5 },
    { date: '22/04', weight: 69.0 },
    { date: '29/04', weight: 68.5 },
    { date: '05/05', weight: 68.0 }
  ];

  const currentMetrics = [
    {
      name: 'Huyết áp',
      value: '120/80',
      unit: 'mmHg',
      status: 'normal',
      trend: 'stable',
      icon: Activity,
      color: 'from-red-500 to-pink-500',
      lastUpdated: '2 giờ trước',
      target: '<140/90'
    },
    {
      name: 'Nhịp tim',
      value: '72',
      unit: 'bpm',
      status: 'normal',
      trend: 'stable',
      icon: Heart,
      color: 'from-pink-500 to-rose-500',
      lastUpdated: '2 giờ trước',
      target: '60-100'
    },
    {
      name: 'Đường huyết',
      value: '95',
      unit: 'mg/dL',
      status: 'normal',
      trend: 'down',
      icon: Droplet,
      color: 'from-blue-500 to-cyan-500',
      lastUpdated: 'Hôm qua',
      target: '<100'
    },
    {
      name: 'Cân nặng',
      value: '68.0',
      unit: 'kg',
      status: 'normal',
      trend: 'down',
      icon: Activity,
      color: 'from-green-500 to-emerald-500',
      lastUpdated: 'Hôm nay',
      target: '65-75'
    }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="size-4 text-red-600" />;
      case 'down':
        return <TrendingDown className="size-4 text-green-600" />;
      default:
        return <Minus className="size-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'bg-green-100 text-green-700';
      case 'warning':
        return 'bg-yellow-100 text-yellow-700';
      case 'danger':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Theo dõi sức khỏe</h1>
              <p className="text-gray-600">Giám sát các chỉ số sức khỏe quan trọng của bạn</p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all flex items-center gap-2">
                <Download className="size-4" />
                Xuất báo cáo
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2">
                <Plus className="size-4" />
                Thêm chỉ số
              </button>
            </div>
          </div>
        </div>

        {/* Current Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {currentMetrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`size-12 bg-gradient-to-br ${metric.color} rounded-lg flex items-center justify-center`}>
                  <metric.icon className="size-6 text-white" />
                </div>
                {getTrendIcon(metric.trend)}
              </div>
              <h3 className="text-sm text-gray-600 mb-1">{metric.name}</h3>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-bold text-gray-900">{metric.value}</span>
                <span className="text-sm text-gray-500">{metric.unit}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(metric.status)}`}>
                  Bình thường
                </span>
                <span className="text-xs text-gray-500">{metric.lastUpdated}</span>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="text-xs text-gray-600">
                  Mục tiêu: <span className="font-medium text-gray-900">{metric.target}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Time Range Selector */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Xu hướng theo thời gian</h2>
          <div className="flex gap-2 bg-white rounded-lg p-1 border border-gray-200">
            {[
              { value: '7days', label: '7 ngày' },
              { value: '30days', label: '30 ngày' },
              { value: '90days', label: '90 ngày' }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setTimeRange(option.value as any)}
                className={`px-4 py-2 rounded-md font-medium transition-all ${
                  timeRange === option.value
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Blood Pressure Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Huyết áp</h3>
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="size-3 bg-red-500 rounded-full"></div>
                  <span className="text-gray-600">Tâm thu</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-3 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600">Tâm trương</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={bloodPressureData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#888" fontSize={12} />
                <YAxis stroke="#888" fontSize={12} domain={[60, 140]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="systolic"
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={{ fill: '#ef4444', r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="diastolic"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Heart Rate Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Nhịp tim</h3>
              <span className="text-sm text-gray-600">bpm</span>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={heartRateData}>
                <defs>
                  <linearGradient id="heartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#888" fontSize={12} />
                <YAxis stroke="#888" fontSize={12} domain={[60, 85]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="bpm"
                  stroke="#ec4899"
                  strokeWidth={2}
                  fill="url(#heartGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Glucose Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Đường huyết</h3>
              <span className="text-sm text-gray-600">mg/dL</span>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={glucoseData}>
                <defs>
                  <linearGradient id="glucoseGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#888" fontSize={12} />
                <YAxis stroke="#888" fontSize={12} domain={[80, 110]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="level"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  fill="url(#glucoseGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Weight Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Cân nặng</h3>
              <span className="text-sm text-gray-600">kg</span>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={weightData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#888" fontSize={12} />
                <YAxis stroke="#888" fontSize={12} domain={[67, 71]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ fill: '#10b981', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 text-sm">
                <TrendingDown className="size-4 text-green-600" />
                <span className="text-green-700">
                  Đã giảm <strong>2.2 kg</strong> trong 30 ngày qua
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Health Goals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl shadow-lg p-8 text-white"
        >
          <h3 className="text-2xl font-bold mb-6">Mục tiêu sức khỏe</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl mb-2">🎯</div>
              <h4 className="font-semibold mb-2">Giảm cân</h4>
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span>Tiến độ</span>
                  <span>73%</span>
                </div>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full" style={{ width: '73%' }}></div>
                </div>
              </div>
              <p className="text-sm text-white/80">Mục tiêu: 65kg (còn 3kg)</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl mb-2">💪</div>
              <h4 className="font-semibold mb-2">Tập luyện</h4>
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span>Tuần này</span>
                  <span>4/5 ngày</span>
                </div>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
              <p className="text-sm text-white/80">Mục tiêu: 5 ngày/tuần</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl mb-2">💧</div>
              <h4 className="font-semibold mb-2">Uống nước</h4>
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span>Hôm nay</span>
                  <span>1.8/2L</span>
                </div>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>
              <p className="text-sm text-white/80">Mục tiêu: 2 lít/ngày</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
