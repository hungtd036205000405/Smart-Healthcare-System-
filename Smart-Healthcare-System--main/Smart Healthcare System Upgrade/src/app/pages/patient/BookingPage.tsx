import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, Clock, MapPin, Star, ChevronRight, ChevronLeft, Check, CheckCircle, User } from 'lucide-react';

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const specialties = [
    { id: 'cardiology', name: 'Tim mạch', icon: '❤️', doctors: 24 },
    { id: 'pediatrics', name: 'Nhi khoa', icon: '👶', doctors: 18 },
    { id: 'dermatology', name: 'Da liễu', icon: '✨', doctors: 15 },
    { id: 'gastroenterology', name: 'Tiêu hóa', icon: '🫁', doctors: 12 },
    { id: 'neurology', name: 'Thần kinh', icon: '🧠', doctors: 20 },
    { id: 'ophthalmology', name: 'Mắt', icon: '👁️', doctors: 10 }
  ];

  const doctors = [
    {
      id: 1,
      name: 'BS. Nguyễn Văn An',
      specialty: 'Tim mạch',
      experience: '15 năm',
      rating: 4.9,
      reviews: 342,
      price: '300,000',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop',
      availableDates: ['2026-05-10', '2026-05-12', '2026-05-14']
    },
    {
      id: 2,
      name: 'BS. Trần Thị Bình',
      specialty: 'Tim mạch',
      experience: '12 năm',
      rating: 5.0,
      reviews: 428,
      price: '350,000',
      image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop',
      availableDates: ['2026-05-11', '2026-05-13', '2026-05-15']
    }
  ];

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  const handleNextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleConfirmBooking = () => {
    setShowSuccessModal(true);
    setTimeout(() => {
      navigate('/patient/dashboard');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-cyan-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with guide */}
        <div className="mb-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Đặt lịch khám bệnh</h1>
              <p className="text-gray-600 mb-4">Đặt lịch khám với bác sĩ chuyên môn cao chỉ trong 3 bước đơn giản</p>
              <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 px-4 py-2 rounded-lg w-fit">
                <Calendar className="size-4" />
                <span className="font-medium">Thời gian ước tính: 2-3 phút</span>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="size-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                <Calendar className="size-10 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {[
              { step: 1, label: 'Chọn chuyên khoa', sublabel: 'Lĩnh vực khám bệnh' },
              { step: 2, label: 'Chọn bác sĩ & Thời gian', sublabel: 'Bác sĩ và lịch hẹn' },
              { step: 3, label: 'Xác nhận', sublabel: 'Hoàn tất đặt lịch' }
            ].map((item, index) => (
              <div key={item.step} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className={`size-14 rounded-full flex items-center justify-center font-bold text-lg transition-all shadow-md ${
                    currentStep >= item.step
                      ? 'bg-gradient-to-br from-blue-600 to-cyan-500 text-white'
                      : 'bg-gray-200 text-gray-400'
                  }`}>
                    {currentStep > item.step ? <Check className="size-7" /> : item.step}
                  </div>
                  <span className={`text-sm font-semibold mt-2 text-center ${
                    currentStep >= item.step ? 'text-gray-900' : 'text-gray-400'
                  }`}>
                    {item.label}
                  </span>
                  <span className={`text-xs mt-0.5 text-center ${
                    currentStep >= item.step ? 'text-gray-500' : 'text-gray-400'
                  }`}>
                    {item.sublabel}
                  </span>
                </div>
                {index < 2 && (
                  <div className={`h-1 flex-1 mx-4 rounded ${
                    currentStep > item.step ? 'bg-gradient-to-r from-blue-600 to-cyan-500' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          {/* Step 1: Select Specialty */}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Bước 1: Chọn chuyên khoa khám bệnh</h2>
                <p className="text-gray-600">Vui lòng chọn chuyên khoa phù hợp với tình trạng sức khỏe của bạn</p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Tìm kiếm nhanh</label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Ví dụ: Tim mạch, Nhi khoa, Đau đầu, Khó thở..."
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-medium"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">💡 Mẹo: Bạn có thể tìm theo tên chuyên khoa hoặc triệu chứng</p>
              </div>

              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Chuyên khoa phổ biến</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {specialties.map((specialty) => (
                  <button
                    key={specialty.id}
                    onClick={() => setSelectedSpecialty(specialty.id)}
                    className={`p-6 rounded-xl border-2 transition-all text-left relative group ${
                      selectedSpecialty === specialty.id
                        ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-cyan-50 shadow-md'
                        : 'border-gray-200 hover:border-blue-300 hover:shadow-md bg-white'
                    }`}
                  >
                    {selectedSpecialty === specialty.id && (
                      <div className="absolute top-3 right-3 size-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <Check className="size-4 text-white" />
                      </div>
                    )}
                    <div className="text-5xl mb-4">{specialty.icon}</div>
                    <h3 className="font-bold text-gray-900 mb-2">{specialty.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <User className="size-3" />
                      <span>{specialty.doctors} bác sĩ sẵn sàng</span>
                    </div>
                  </button>
                ))}
              </div>
              {selectedSpecialty && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                  <Check className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="text-green-900 font-medium">Đã chọn chuyên khoa</p>
                    <p className="text-green-700">Nhấn "Tiếp tục" để chọn bác sĩ và thời gian khám</p>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Step 2: Select Doctor and Time */}
          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Chọn bác sĩ và thời gian</h2>

              {/* Doctors List */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-4">Danh sách bác sĩ</h3>
                <div className="space-y-4">
                  {doctors.map((doctor) => (
                    <div
                      key={doctor.id}
                      onClick={() => setSelectedDoctor(doctor)}
                      className={`p-6 rounded-xl border-2 transition-all cursor-pointer ${
                        selectedDoctor?.id === doctor.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <img
                          src={doctor.image}
                          alt={doctor.name}
                          className="size-20 rounded-xl object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-lg text-gray-900">{doctor.name}</h4>
                              <p className="text-sm text-blue-600">{doctor.specialty}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-gray-900">{doctor.price}đ</div>
                              <div className="text-sm text-gray-600">/ buổi khám</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                            <span>{doctor.experience} kinh nghiệm</span>
                            <div className="flex items-center gap-1">
                              <Star className="size-4 text-yellow-400 fill-yellow-400" />
                              <span className="font-medium text-gray-900">{doctor.rating}</span>
                              <span>({doctor.reviews} đánh giá)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Date and Time Selection */}
              {selectedDoctor && (
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Chọn ngày khám</h3>
                    <div className="space-y-2">
                      {selectedDoctor.availableDates.map((date: string) => (
                        <button
                          key={date}
                          onClick={() => setSelectedDate(date)}
                          className={`w-full p-4 rounded-lg border-2 transition-all flex items-center gap-3 ${
                            selectedDate === date
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-blue-300'
                          }`}
                        >
                          <Calendar className="size-5 text-blue-600" />
                          <span className="font-medium">
                            {new Date(date).toLocaleDateString('vi-VN', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Chọn giờ khám</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            selectedTime === time
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-200 hover:border-blue-300'
                          }`}
                        >
                          <Clock className="size-4 mx-auto mb-1" />
                          <div className="text-sm font-medium">{time}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Step 3: Confirmation */}
          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Xác nhận thông tin</h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="p-6 bg-gray-50 rounded-xl">
                    <h3 className="font-semibold text-gray-900 mb-4">Thông tin lịch hẹn</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="size-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Calendar className="size-6 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Ngày khám</div>
                          <div className="font-medium text-gray-900">
                            {selectedDate && new Date(selectedDate).toLocaleDateString('vi-VN', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="size-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Clock className="size-6 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Giờ khám</div>
                          <div className="font-medium text-gray-900">{selectedTime}</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="size-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <MapPin className="size-6 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Địa điểm</div>
                          <div className="font-medium text-gray-900">Phòng 301, Tầng 3</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {selectedDoctor && (
                    <div className="p-6 bg-gray-50 rounded-xl">
                      <h3 className="font-semibold text-gray-900 mb-4">Thông tin bác sĩ</h3>
                      <div className="flex items-center gap-4">
                        <img
                          src={selectedDoctor.image}
                          alt={selectedDoctor.name}
                          className="size-16 rounded-xl object-cover"
                        />
                        <div>
                          <h4 className="font-semibold text-gray-900">{selectedDoctor.name}</h4>
                          <p className="text-sm text-blue-600">{selectedDoctor.specialty}</p>
                          <p className="text-sm text-gray-600">{selectedDoctor.experience} kinh nghiệm</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl mb-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Chi tiết thanh toán</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Phí khám</span>
                        <span className="font-medium text-gray-900">{selectedDoctor?.price}đ</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Phí dịch vụ</span>
                        <span className="font-medium text-gray-900">20,000đ</span>
                      </div>
                      <div className="border-t border-gray-300 pt-3">
                        <div className="flex justify-between">
                          <span className="font-semibold text-gray-900">Tổng cộng</span>
                          <span className="text-2xl font-bold text-blue-600">
                            {selectedDoctor && (parseInt(selectedDoctor.price.replace(/,/g, '')) + 20000).toLocaleString()}đ
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-white border-2 border-gray-200 rounded-xl">
                    <h3 className="font-semibold text-gray-900 mb-4">Phương thức thanh toán</h3>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 p-4 border-2 border-blue-500 bg-blue-50 rounded-lg cursor-pointer">
                        <input type="radio" name="payment" defaultChecked className="size-4" />
                        <span className="font-medium">Thanh toán tại phòng khám</span>
                      </label>
                      <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-300">
                        <input type="radio" name="payment" className="size-4" />
                        <span className="font-medium">Thanh toán online</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handlePrevStep}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 ${
                currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <ChevronLeft className="size-5" />
              Quay lại
            </button>

            {currentStep < 3 ? (
              <button
                onClick={handleNextStep}
                disabled={
                  (currentStep === 1 && !selectedSpecialty) ||
                  (currentStep === 2 && (!selectedDoctor || !selectedDate || !selectedTime))
                }
                className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 ${
                  ((currentStep === 1 && !selectedSpecialty) ||
                  (currentStep === 2 && (!selectedDoctor || !selectedDate || !selectedTime)))
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:shadow-lg'
                }`}
              >
                Tiếp tục
                <ChevronRight className="size-5" />
              </button>
            ) : (
              <button
                onClick={handleConfirmBooking}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-medium hover:shadow-lg flex items-center gap-2"
              >
                <Check className="size-5" />
                Xác nhận đặt lịch
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center"
            >
              <div className="size-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="size-12 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Đặt lịch thành công!</h3>
              <p className="text-gray-600 mb-6">
                Lịch khám của bạn đã được xác nhận. Chúng tôi sẽ gửi thông báo nhắc nhở trước giờ khám.
              </p>
              <div className="p-4 bg-blue-50 rounded-xl mb-6">
                <div className="text-sm text-gray-600 mb-1">Mã đặt lịch</div>
                <div className="text-2xl font-bold text-blue-600">#BK{Math.floor(Math.random() * 10000)}</div>
              </div>
              <p className="text-sm text-gray-500">Đang chuyển hướng về trang chủ...</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
