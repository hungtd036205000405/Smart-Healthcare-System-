import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import {
  Calendar,
  Check,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Search,
  Star,
  Stethoscope,
  User,
  Video,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { patientService } from "../../services/patientService";
import {
  patientDoctors,
  patientSpecialties,
  type PatientAppointmentType,
  type PatientDoctor,
} from "../../services/patientDataStore";

const timeSlots = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
];

export default function BookingPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<PatientDoctor | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [appointmentType, setAppointmentType] =
    useState<PatientAppointmentType>("clinic");
  const [reason, setReason] = useState("Khám tư vấn sức khỏe");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [bookingCode, setBookingCode] = useState("");

  const filteredSpecialties = patientSpecialties.filter((specialty) =>
    specialty.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const filteredDoctors = useMemo(() => {
    const selectedSpecialtyName = patientSpecialties.find(
      (specialty) => specialty.id === selectedSpecialty,
    )?.name;

    return patientDoctors.filter(
      (doctor) => !selectedSpecialtyName || doctor.specialty === selectedSpecialtyName,
    );
  }, [selectedSpecialty]);

  const canContinue =
    (currentStep === 1 && selectedSpecialty) ||
    (currentStep === 2 && selectedDoctor && selectedDate && selectedTime) ||
    currentStep === 3;

  const handleNextStep = () => {
    if (currentStep < 3 && canContinue) setCurrentStep((step) => step + 1);
  };

  const handlePrevStep = () => {
    if (currentStep > 1) setCurrentStep((step) => step - 1);
  };

  const handleConfirmBooking = async () => {
    if (!selectedDoctor || !selectedDate || !selectedTime) return;

    const appointment = await patientService.bookAppointment(user?.id || "", {
      doctor: selectedDoctor.name,
      specialty: selectedDoctor.specialty,
      date: selectedDate,
      time: selectedTime,
      location: appointmentType === "video" ? "Video call" : selectedDoctor.location,
      type: appointmentType,
      phone: selectedDoctor.phone,
      price: selectedDoctor.price,
      reason,
    });

    setBookingCode(appointment.code);
    setShowSuccessModal(true);
    window.setTimeout(() => navigate("/patient/appointments"), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-cyan-50/30">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="mb-2 text-3xl font-bold text-gray-900">
                Đặt lịch khám bệnh
              </h1>
              <p className="mb-4 text-gray-600">
                Chọn chuyên khoa, bác sĩ và thời gian phù hợp với bạn.
              </p>
              <div className="flex w-fit items-center gap-2 rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">
                <Calendar className="size-4" />
                Hoàn tất trong 3 bước
              </div>
            </div>
            <div className="hidden size-20 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg md:flex">
              <Calendar className="size-10 text-white" />
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="mx-auto flex max-w-3xl items-center justify-between">
            {[
              { step: 1, label: "Chọn chuyên khoa" },
              { step: 2, label: "Bác sĩ và thời gian" },
              { step: 3, label: "Xác nhận" },
            ].map((item, index) => (
              <div key={item.step} className="flex flex-1 items-center">
                <div className="flex flex-1 flex-col items-center">
                  <div
                    className={`flex size-12 items-center justify-center rounded-full text-lg font-bold shadow-sm ${
                      currentStep >= item.step
                        ? "bg-gradient-to-br from-blue-600 to-cyan-500 text-white"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {currentStep > item.step ? <Check className="size-6" /> : item.step}
                  </div>
                  <span
                    className={`mt-2 text-center text-sm font-semibold ${
                      currentStep >= item.step ? "text-gray-900" : "text-gray-400"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
                {index < 2 && (
                  <div
                    className={`mx-4 h-1 flex-1 rounded ${
                      currentStep > item.step
                        ? "bg-gradient-to-r from-blue-600 to-cyan-500"
                        : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          {currentStep === 1 && (
            <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className="mb-2 text-2xl font-bold text-gray-900">
                Chọn chuyên khoa
              </h2>
              <p className="mb-6 text-gray-600">
                Bạn có thể tìm theo tên chuyên khoa hoặc chọn từ danh sách.
              </p>
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-gray-400" />
                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Ví dụ: Tim mạch, Nhi khoa, Da liễu..."
                  className="w-full rounded-xl border-2 border-gray-300 py-3 pl-12 pr-4 font-medium outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredSpecialties.map((specialty) => (
                  <button
                    key={specialty.id}
                    onClick={() => {
                      setSelectedSpecialty(specialty.id);
                      setSelectedDoctor(null);
                      setSelectedDate("");
                      setSelectedTime("");
                    }}
                    className={`rounded-xl border-2 p-6 text-left transition-all ${
                      selectedSpecialty === specialty.id
                        ? "border-blue-500 bg-blue-50 shadow-md"
                        : "border-gray-200 hover:border-blue-300 hover:shadow-md"
                    }`}
                  >
                    <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white">
                      <Stethoscope className="size-6" />
                    </div>
                    <h3 className="mb-2 font-bold text-gray-900">{specialty.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <User className="size-4" />
                      {specialty.doctors} bác sĩ sẵn sàng
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                Chọn bác sĩ và thời gian
              </h2>
              <div className="mb-8 space-y-4">
                {filteredDoctors.map((doctor) => (
                  <button
                    key={doctor.id}
                    onClick={() => {
                      setSelectedDoctor(doctor);
                      setSelectedDate("");
                      setSelectedTime("");
                    }}
                    className={`w-full rounded-xl border-2 p-5 text-left transition-all ${
                      selectedDoctor?.id === doctor.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <div className="flex flex-col gap-4 sm:flex-row">
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="size-20 rounded-xl object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">
                              {doctor.name}
                            </h3>
                            <p className="font-medium text-blue-600">
                              {doctor.specialty}
                            </p>
                          </div>
                          <div className="font-bold text-gray-900">
                            {doctor.price}đ
                          </div>
                        </div>
                        <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                          <span>{doctor.experience} kinh nghiệm</span>
                          <span className="flex items-center gap-1">
                            <Star className="size-4 fill-yellow-400 text-yellow-400" />
                            {doctor.rating} ({doctor.reviews} đánh giá)
                          </span>
                          <span>{doctor.location}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {selectedDoctor && (
                <div className="grid gap-6 lg:grid-cols-2">
                  <div>
                    <h3 className="mb-3 font-semibold text-gray-900">Ngày khám</h3>
                    <div className="space-y-2">
                      {selectedDoctor.availableDates.map((date) => (
                        <button
                          key={date}
                          onClick={() => setSelectedDate(date)}
                          className={`flex w-full items-center gap-3 rounded-lg border-2 p-4 transition-all ${
                            selectedDate === date
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-blue-300"
                          }`}
                        >
                          <Calendar className="size-5 text-blue-600" />
                          <span className="font-medium">
                            {new Date(date).toLocaleDateString("vi-VN", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-3 font-semibold text-gray-900">Giờ khám</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`rounded-lg border-2 p-3 transition-all ${
                            selectedTime === time
                              ? "border-blue-500 bg-blue-50 text-blue-700"
                              : "border-gray-200 hover:border-blue-300"
                          }`}
                        >
                          <Clock className="mx-auto mb-1 size-4" />
                          <div className="text-sm font-medium">{time}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {currentStep === 3 && selectedDoctor && (
            <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                Xác nhận lịch hẹn
              </h2>
              <div className="grid gap-8 lg:grid-cols-2">
                <div className="space-y-5">
                  <SummaryCard icon={Calendar} label="Ngày khám" value={new Date(selectedDate).toLocaleDateString("vi-VN")} />
                  <SummaryCard icon={Clock} label="Giờ khám" value={selectedTime} />
                  <SummaryCard icon={MapPin} label="Địa điểm" value={appointmentType === "video" ? "Video call" : selectedDoctor.location} />
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-gray-700">
                      Lý do khám
                    </span>
                    <textarea
                      value={reason}
                      onChange={(event) => setReason(event.target.value)}
                      rows={4}
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                    />
                  </label>
                </div>
                <div className="space-y-5">
                  <div className="rounded-xl bg-gray-50 p-6">
                    <h3 className="mb-4 font-bold text-gray-900">Bác sĩ</h3>
                    <div className="flex items-center gap-4">
                      <img
                        src={selectedDoctor.image}
                        alt={selectedDoctor.name}
                        className="size-16 rounded-xl object-cover"
                      />
                      <div>
                        <div className="font-bold text-gray-900">{selectedDoctor.name}</div>
                        <div className="text-sm text-blue-600">{selectedDoctor.specialty}</div>
                        <div className="text-sm text-gray-600">{selectedDoctor.phone}</div>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-xl border border-gray-200 p-6">
                    <h3 className="mb-3 font-bold text-gray-900">Hình thức khám</h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <TypeButton
                        active={appointmentType === "clinic"}
                        icon={Stethoscope}
                        label="Tại phòng khám"
                        onClick={() => setAppointmentType("clinic")}
                      />
                      <TypeButton
                        active={appointmentType === "video"}
                        icon={Video}
                        label="Video call"
                        onClick={() => setAppointmentType("video")}
                      />
                    </div>
                  </div>
                  <div className="rounded-xl bg-blue-50 p-6">
                    <div className="flex justify-between text-gray-700">
                      <span>Phí khám</span>
                      <span className="font-semibold">{selectedDoctor.price}đ</span>
                    </div>
                    <div className="mt-3 border-t border-blue-200 pt-3">
                      <div className="flex justify-between text-lg font-bold text-gray-900">
                        <span>Tổng cộng</span>
                        <span className="text-blue-600">{selectedDoctor.price}đ</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <div className="mt-8 flex items-center justify-between border-t border-gray-200 pt-6">
            <button
              onClick={handlePrevStep}
              disabled={currentStep === 1}
              className={`flex items-center gap-2 rounded-lg px-6 py-3 font-medium ${
                currentStep === 1
                  ? "cursor-not-allowed bg-gray-100 text-gray-400"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <ChevronLeft className="size-5" />
              Quay lại
            </button>

            {currentStep < 3 ? (
              <button
                onClick={handleNextStep}
                disabled={!canContinue}
                className={`flex items-center gap-2 rounded-lg px-6 py-3 font-medium ${
                  !canContinue
                    ? "cursor-not-allowed bg-gray-300 text-gray-500"
                    : "bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:shadow-lg"
                }`}
              >
                Tiếp tục
                <ChevronRight className="size-5" />
              </button>
            ) : (
              <button
                onClick={handleConfirmBooking}
                className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 px-8 py-3 font-medium text-white hover:shadow-lg"
              >
                <Check className="size-5" />
                Xác nhận đặt lịch
              </button>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl"
            >
              <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="size-12 text-green-600" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-gray-900">
                Đặt lịch thành công
              </h3>
              <p className="mb-6 text-gray-600">
                Lịch khám đã được ghi nhận và đang chờ xác nhận.
              </p>
              <div className="mb-6 rounded-xl bg-blue-50 p-4">
                <div className="mb-1 text-sm text-gray-600">Mã đặt lịch</div>
                <div className="text-2xl font-bold text-blue-600">{bookingCode}</div>
              </div>
              <p className="text-sm text-gray-500">
                Đang chuyển sang trang lịch hẹn...
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SummaryCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Calendar;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-gray-50 p-5">
      <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
        <Icon className="size-6" />
      </div>
      <div>
        <div className="text-sm text-gray-600">{label}</div>
        <div className="font-semibold text-gray-900">{value}</div>
      </div>
    </div>
  );
}

function TypeButton({
  active,
  icon: Icon,
  label,
  onClick,
}: {
  active: boolean;
  icon: typeof Stethoscope;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-xl border-2 px-4 py-3 font-semibold transition-all ${
        active
          ? "border-blue-500 bg-blue-50 text-blue-700"
          : "border-gray-200 text-gray-700 hover:border-blue-300"
      }`}
    >
      <Icon className="size-5" />
      {label}
    </button>
  );
}
