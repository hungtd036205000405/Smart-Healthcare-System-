import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CreditCard, Smartphone, QrCode, Check, Clock, X, Download,
  FileText, Calendar, User, Search, ChevronRight, RefreshCw
} from 'lucide-react';
import PatientHeader from '../../components/patient/PatientHeader';

type PaymentMethod = 'vnpay' | 'momo' | 'qr' | 'hospital';
type TransactionStatus = 'success' | 'pending' | 'failed';

interface Transaction {
  id: string;
  date: string;
  amount: number;
  method: PaymentMethod;
  service: string;
  doctor: string;
  status: TransactionStatus;
  transactionCode: string;
}

export default function PaymentPage() {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('vnpay');
  const [showPaymentProcess, setShowPaymentProcess] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<TransactionStatus>('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const pendingPayment = {
    id: 'PAY001',
    amount: 320000,
    service: 'Khám tim mạch',
    doctor: 'BS. Nguyễn Văn An',
    date: '2026-06-03',
    time: '09:00',
    type: 'online',
  };

  const transactions: Transaction[] = [
    {
      id: 'TRX001',
      date: '2026-05-28',
      amount: 250000,
      method: 'momo',
      service: 'Khám nhi khoa',
      doctor: 'BS. Trần Thị Bình',
      status: 'success',
      transactionCode: 'MM295847102',
    },
    {
      id: 'TRX002',
      date: '2026-05-20',
      amount: 200000,
      method: 'vnpay',
      service: 'Khám da liễu',
      doctor: 'BS. Lê Văn Cường',
      status: 'success',
      transactionCode: 'VNP2026854712',
    },
    {
      id: 'TRX003',
      date: '2026-05-15',
      amount: 350000,
      method: 'qr',
      service: 'Khám tiêu hoá',
      doctor: 'BS. Phạm Thị Dung',
      status: 'success',
      transactionCode: 'QR849263715',
    },
    {
      id: 'TRX004',
      date: '2026-05-10',
      amount: 300000,
      method: 'hospital',
      service: 'Khám tim mạch',
      doctor: 'BS. Nguyễn Văn An',
      status: 'success',
      transactionCode: 'CSKH001234',
    },
    {
      id: 'TRX005',
      date: '2026-04-25',
      amount: 280000,
      method: 'vnpay',
      service: 'Khám thần kinh',
      doctor: 'BS. Hoàng Minh Đức',
      status: 'failed',
      transactionCode: 'VNP2026845621',
    },
  ];

  const paymentMethods = [
    { id: 'vnpay' as PaymentMethod, name: 'VNPay', icon: QrCode, color: 'from-blue-600 to-blue-800', desc: 'Thanh toán qua VNPay' },
    { id: 'momo' as PaymentMethod, name: 'MoMo', icon: Smartphone, color: 'from-pink-500 to-red-500', desc: 'Ví điện tử MoMo' },
    { id: 'qr' as PaymentMethod, name: 'QR Banking', icon: CreditCard, color: 'from-green-500 to-emerald-600', desc: 'Quét mã QR ngân hàng' },
    { id: 'hospital' as PaymentMethod, name: 'Tại bệnh viện', icon: Building, color: 'from-gray-500 to-gray-700', desc: 'Thanh toán trực tiếp' },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Building: any = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L2 7v15h20V7L12 2zm0 2.5L19 8v11H5V8l7-3.5zM7 11h2v2H7v-2zm0 4h2v2H7v-2zm4-4h2v2h-2v-2zm0 4h2v2h-2v-2zm4-4h2v2h-2v-2zm0 4h2v2h-2v-2z"/>
    </svg>
  );

  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch =
      !searchQuery ||
      t.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.transactionCode.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || t.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handlePayment = () => {
    setShowPaymentProcess(true);
    setPaymentStatus('pending');
    setTimeout(() => {
      setPaymentStatus('success');
    }, 3000);
  };

  const getStatusBadge = (status: TransactionStatus) => {
    switch (status) {
      case 'success':
        return (
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold flex items-center gap-1">
            <Check className="size-3" /> Thành công
          </span>
        );
      case 'pending':
        return (
          <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold flex items-center gap-1">
            <Clock className="size-3" /> Đang chờ
          </span>
        );
      case 'failed':
        return (
          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold flex items-center gap-1">
            <X className="size-3" /> Thất bại
          </span>
        );
    }
  };

  const getMethodBadge = (method: PaymentMethod) => {
    const labels: Record<PaymentMethod, string> = {
      vnpay: 'VNPay', momo: 'MoMo', qr: 'QR Banking', hospital: 'Tại bệnh viện',
    };
    return (
      <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs font-medium">
        {labels[method]}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-cyan-50/30">
      <PatientHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Thanh toán</h1>
          <p className="text-gray-600">Thanh toán viện phí và xem lịch sử giao dịch</p>
        </div>

        {/* Pending Payment */}
        {!showPaymentProcess && (
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <CreditCard className="size-6 text-blue-600" />
                  Thanh toán ngay
                </h2>

                {/* Payment Info */}
                <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Dịch vụ</p>
                      <p className="text-lg font-bold text-gray-900">{pendingPayment.service}</p>
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                      {pendingPayment.type === 'online' ? 'Khám online' : 'Khám trực tiếp'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="size-4 text-gray-500" />
                      <span className="text-gray-600">{pendingPayment.doctor}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="size-4 text-gray-500" />
                      <span className="text-gray-600">{pendingPayment.date} - {pendingPayment.time}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Phương thức thanh toán</h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {paymentMethods.map((method) => {
                    const Icon = method.icon;
                    return (
                      <button
                        key={method.id}
                        onClick={() => setSelectedMethod(method.id)}
                        className={`p-4 rounded-xl border-2 transition-all flex items-center gap-4 text-left ${
                          selectedMethod === method.id
                            ? 'border-blue-500 bg-blue-50 shadow-md'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className={`size-12 bg-gradient-to-br ${method.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                          <Icon className="size-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{method.name}</h4>
                          <p className="text-xs text-gray-600">{method.desc}</p>
                        </div>
                        {selectedMethod === method.id && (
                          <div className="ml-auto size-6 bg-blue-500 rounded-full flex items-center justify-center">
                            <Check className="size-4 text-white" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Amount */}
                <div className="p-6 bg-gray-50 rounded-xl mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Phí khám</span>
                    <span className="font-medium text-gray-900">300,000đ</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Phí dịch vụ</span>
                    <span className="font-medium text-gray-900">20,000đ</span>
                  </div>
                  <div className="border-t border-gray-300 pt-2 mt-2">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold text-gray-900">Tổng cộng</span>
                      <span className="text-2xl font-bold text-blue-600">{(pendingPayment.amount).toLocaleString()}đ</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handlePayment}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-bold text-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <CreditCard className="size-5" />
                  Thanh toán {(pendingPayment.amount).toLocaleString()}đ
                </button>
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Tóm tắt</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Tổng giao dịch</span>
                    <span className="font-bold text-gray-900">{transactions.filter(t => t.status === 'success').length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Thành công</span>
                    <span className="font-bold text-green-600">{transactions.filter(t => t.status === 'success').length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Thất bại</span>
                    <span className="font-bold text-red-600">{transactions.filter(t => t.status === 'failed').length}</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Tổng chi</span>
                      <span className="font-bold text-blue-600">
                        {transactions.filter(t => t.status === 'success').reduce((sum, t) => sum + t.amount, 0).toLocaleString()}đ
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-center gap-2 mb-3">
                  <CreditCard className="size-5" />
                  <h3 className="font-bold">Thanh toán an toàn</h3>
                </div>
                <p className="text-sm text-blue-100 mb-4">
                  Mọi giao dịch được bảo mật bằng công nghệ mã hóa 256-bit
                </p>
                <div className="flex items-center gap-3">
                  <div className="px-3 py-1.5 bg-white/20 rounded-lg text-xs font-medium">VNPay</div>
                  <div className="px-3 py-1.5 bg-white/20 rounded-lg text-xs font-medium">MoMo</div>
                  <div className="px-3 py-1.5 bg-white/20 rounded-lg text-xs font-medium">SSL</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payment Process Modal */}
        <AnimatePresence>
          {showPaymentProcess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center"
              >
                {paymentStatus === 'pending' && (
                  <>
                    <div className="size-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                      <CreditCard className="size-10 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Đang xử lý thanh toán...</h3>
                    <p className="text-gray-600 mb-6">Vui lòng chờ trong giây lát</p>
                    <div className="flex items-center justify-center gap-2">
                      <RefreshCw className="size-5 text-blue-600 animate-spin" />
                      <span className="text-blue-600 font-medium">Đang kết nối {paymentMethods.find(m => m.id === selectedMethod)?.name}...</span>
                    </div>
                  </>
                )}
                {paymentStatus === 'success' && (
                  <>
                    <div className="size-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Check className="size-12 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Thanh toán thành công!</h3>
                    <p className="text-gray-600 mb-4">Giao dịch của bạn đã được xử lý thành công</p>
                    <div className="p-4 bg-gray-50 rounded-xl mb-6">
                      <p className="text-sm text-gray-600">Mã giao dịch</p>
                      <p className="text-lg font-bold text-blue-600">#PAY{Math.floor(Math.random() * 1000000)}</p>
                    </div>
                    <button
                      onClick={() => setShowPaymentProcess(false)}
                      className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-medium hover:shadow-lg transition-all"
                    >
                      Đóng
                    </button>
                  </>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Transaction History */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <FileText className="size-6 text-blue-600" />
              Lịch sử giao dịch
            </h2>
          </div>

          {/* Filters */}
          <div className="p-6 border-b border-gray-100 bg-gray-50">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm giao dịch..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div className="flex gap-2">
                {['all', 'success', 'pending', 'failed'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      filterStatus === status
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {status === 'all' ? 'Tất cả' : status === 'success' ? 'Thành công' : status === 'pending' ? 'Đang chờ' : 'Thất bại'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Mã GD</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Dịch vụ</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Bác sĩ</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Ngày</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Thanh toán</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Số tiền</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Trạng thái</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((t) => (
                  <tr key={t.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm text-gray-600">{t.transactionCode}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-900">{t.service}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-700">{t.doctor}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-600">{new Date(t.date).toLocaleDateString('vi-VN')}</span>
                    </td>
                    <td className="px-6 py-4">
                      {getMethodBadge(t.method)}
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-gray-900">{t.amount.toLocaleString()}đ</span>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(t.status)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Xem chi tiết">
                          <FileText className="size-4" />
                        </button>
                        <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Tải biên lai">
                          <Download className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredTransactions.length === 0 && (
            <div className="p-12 text-center">
              <FileText className="size-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy giao dịch</h3>
              <p className="text-gray-600">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
