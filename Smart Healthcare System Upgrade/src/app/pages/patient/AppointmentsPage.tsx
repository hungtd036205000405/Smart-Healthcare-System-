import { AnimatePresence, motion } from "motion/react";
import type React from "react";
import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Search,
  Stethoscope,
  Video,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { patientService } from "../../services/patientService";
import type {
  PatientAppointmentItem,
  PatientAppointmentStatus,
} from "../../services/patientDataStore";

type TabKey = "upcoming" | "completed" | "cancelled" | "all";

const statusText: Record<PatientAppointmentStatus, string> = {
  confirmed: "Đã xác nhận",
  pending: "Chờ xác nhận",
  completed: "Đã hoàn thành",
  cancelled: "Đã hủy",
};

const statusClass: Record<PatientAppointmentStatus, string> = {
  confirmed: "bg-green-100 text-green-700 border-green-200",
  pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
  completed: "bg-blue-100 text-blue-700 border-blue-200",
  cancelled: "bg-gray-100 text-gray-600 border-gray-200",
};

export default function AppointmentsPage() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<PatientAppointmentItem[]>([]);
  const [activeTab, setActiveTab] = useState<TabKey>("upcoming");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAppointment, setSelectedAppointment] =
    useState<PatientAppointmentItem | null>(null);
  const [rescheduleTarget, setRescheduleTarget] =
    useState<PatientAppointmentItem | null>(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  const loadAppointments = async () => {
    const data = await patientService.getAppointmentDetails(user?.id || "");
    setAppointments(data);
  };

  useEffect(() => {
    loadAppointments();
  }, [user?.id]);

  const filteredAppointments = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return appointments.filter((appointment) => {
      const matchesTab =
        activeTab === "all" ||
        (activeTab === "upcoming" &&
          ["confirmed", "pending"].includes(appointment.status)) ||
        appointment.status === activeTab;

      const matchesSearch =
        !query ||
        appointment.doctor.toLowerCase().includes(query) ||
        appointment.specialty.toLowerCase().includes(query) ||
        appointment.code.toLowerCase().includes(query);

      return matchesTab && matchesSearch;
    });
  }, [activeTab, appointments, searchQuery]);

  const stats = {
    upcoming: appointments.filter((item) =>
      ["confirmed", "pending"].includes(item.status),
    ).length,
    completed: appointments.filter((item) => item.status === "completed").length,
    cancelled: appointments.filter((item) => item.status === "cancelled").length,
    all: appointments.length,
  };

  const handleCancel = async (appointmentId: number) => {
    await patientService.cancelAppointment(appointmentId);
    await loadAppointments();
    setSelectedAppointment(null);
  };

  const openReschedule = (appointment: PatientAppointmentItem) => {
    setRescheduleTarget(appointment);
    setNewDate(appointment.date);
    setNewTime(appointment.time);
  };

  const handleReschedule = async () => {
    if (!rescheduleTarget || !newDate || !newTime) return;

    await patientService.rescheduleAppointment(
      rescheduleTarget.id,
      newDate,
      newTime,
    );
    setRescheduleTarget(null);
    await loadAppointments();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold text-gray-900">
              Lịch hẹn của tôi
            </h1>
            <p className="text-gray-600">
              Theo dõi, hủy hoặc đổi lịch khám đã đặt.
            </p>
          </div>
          <Link
            to="/patient/booking"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 font-semibold text-white shadow-sm transition-all hover:shadow-lg"
          >
            <Calendar className="size-5" />
            Đặt lịch mới
          </Link>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            { key: "upcoming", label: "Sắp tới", value: stats.upcoming },
            { key: "completed", label: "Hoàn thành", value: stats.completed },
            { key: "cancelled", label: "Đã hủy", value: stats.cancelled },
            { key: "all", label: "Tất cả", value: stats.all },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key as TabKey)}
              className={`rounded-xl border p-5 text-left shadow-sm transition-all ${
                activeTab === item.key
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 bg-white hover:border-blue-300"
              }`}
            >
              <div className="text-sm font-medium text-gray-600">{item.label}</div>
              <div className="mt-1 text-3xl font-bold text-gray-900">
                {item.value}
              </div>
            </button>
          ))}
        </div>

        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-gray-400" />
            <input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Tìm theo mã lịch, bác sĩ hoặc chuyên khoa..."
              className="w-full rounded-xl border border-gray-300 py-3 pl-12 pr-4 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        <div className="space-y-4">
          {filteredAppointments.map((appointment, index) => (
            <motion.div
              key={appointment.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: index * 0.04 }}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex gap-4">
                  <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-sm">
                    {appointment.type === "video" ? (
                      <Video className="size-7" />
                    ) : (
                      <Stethoscope className="size-7" />
                    )}
                  </div>
                  <div>
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <h2 className="text-xl font-bold text-gray-900">
                        {appointment.doctor}
                      </h2>
                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusClass[appointment.status]}`}
                      >
                        {statusText[appointment.status]}
                      </span>
                    </div>
                    <p className="font-medium text-blue-600">
                      {appointment.specialty}
                    </p>
                    <p className="mt-1 text-sm text-gray-600">
                      Mã lịch: <span className="font-semibold">{appointment.code}</span>
                    </p>
                  </div>
                </div>

                <div className="grid gap-3 text-sm text-gray-700 sm:grid-cols-3 lg:min-w-[520px]">
                  <InfoLine
                    icon={Calendar}
                    label="Ngày"
                    value={new Date(appointment.date).toLocaleDateString("vi-VN")}
                  />
                  <InfoLine icon={Clock} label="Giờ" value={appointment.time} />
                  <InfoLine
                    icon={MapPin}
                    label="Địa điểm"
                    value={appointment.location}
                  />
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4">
                <p className="text-sm text-gray-600">
                  Lý do: <span className="font-medium">{appointment.reason}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedAppointment(appointment)}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50"
                  >
                    Chi tiết
                  </button>
                  {["confirmed", "pending"].includes(appointment.status) && (
                    <>
                      <button
                        onClick={() => openReschedule(appointment)}
                        className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 transition-all hover:bg-blue-100"
                      >
                        Đổi lịch
                      </button>
                      <button
                        onClick={() => handleCancel(appointment.id)}
                        className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition-all hover:bg-red-100"
                      >
                        Hủy lịch
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredAppointments.length === 0 && (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-16 text-center">
            <Calendar className="mx-auto mb-4 size-14 text-gray-300" />
            <h2 className="mb-2 text-lg font-semibold text-gray-900">
              Không có lịch hẹn phù hợp
            </h2>
            <p className="mb-6 text-gray-600">
              Thử đổi bộ lọc hoặc đặt lịch khám mới.
            </p>
            <Link
              to="/patient/booking"
              className="inline-flex rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white"
            >
              Đặt lịch mới
            </Link>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedAppointment && (
          <Modal onClose={() => setSelectedAppointment(null)}>
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Chi tiết lịch hẹn
                </h2>
                <p className="text-gray-600">{selectedAppointment.code}</p>
              </div>
              <button
                onClick={() => setSelectedAppointment(null)}
                className="rounded-lg p-2 hover:bg-gray-100"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="space-y-4">
              <DetailRow label="Bác sĩ" value={selectedAppointment.doctor} />
              <DetailRow label="Chuyên khoa" value={selectedAppointment.specialty} />
              <DetailRow
                label="Thời gian"
                value={`${selectedAppointment.time}, ${new Date(
                  selectedAppointment.date,
                ).toLocaleDateString("vi-VN")}`}
              />
              <DetailRow label="Địa điểm" value={selectedAppointment.location} />
              <DetailRow label="Liên hệ" value={selectedAppointment.phone} />
              <DetailRow label="Chi phí" value={`${selectedAppointment.price}đ`} />
              <DetailRow label="Lý do khám" value={selectedAppointment.reason} />
            </div>

            {["confirmed", "pending"].includes(selectedAppointment.status) && (
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => openReschedule(selectedAppointment)}
                  className="flex-1 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white"
                >
                  Đổi lịch
                </button>
                <button
                  onClick={() => handleCancel(selectedAppointment.id)}
                  className="flex-1 rounded-xl bg-red-50 px-4 py-3 font-semibold text-red-600"
                >
                  Hủy lịch
                </button>
              </div>
            )}
          </Modal>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {rescheduleTarget && (
          <Modal onClose={() => setRescheduleTarget(null)}>
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Đổi lịch khám</h2>
                <p className="text-gray-600">{rescheduleTarget.doctor}</p>
              </div>
              <button
                onClick={() => setRescheduleTarget(null)}
                className="rounded-lg p-2 hover:bg-gray-100"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-gray-700">
                  Ngày mới
                </span>
                <input
                  type="date"
                  value={newDate}
                  onChange={(event) => setNewDate(event.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-gray-700">
                  Giờ mới
                </span>
                <select
                  value={newTime}
                  onChange={(event) => setNewTime(event.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                >
                  {["08:00", "08:30", "09:00", "09:30", "10:00", "14:00", "14:30", "15:00", "16:00"].map(
                    (time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ),
                  )}
                </select>
              </label>
            </div>

            <div className="mt-4 rounded-xl border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
              <AlertCircle className="mr-2 inline size-4" />
              Sau khi đổi lịch, trạng thái sẽ chuyển về chờ xác nhận.
            </div>

            <button
              onClick={handleReschedule}
              className="mt-6 w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-3 font-semibold text-white"
            >
              Lưu lịch mới
            </button>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

function InfoLine({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Calendar;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2 rounded-xl bg-gray-50 p-3">
      <Icon className="mt-0.5 size-4 shrink-0 text-blue-600" />
      <div>
        <div className="text-xs text-gray-500">{label}</div>
        <div className="font-semibold text-gray-900">{value}</div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-gray-100 pb-3">
      <span className="text-gray-500">{label}</span>
      <span className="text-right font-semibold text-gray-900">{value}</span>
    </div>
  );
}

function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
      >
        {children}
      </motion.div>
      <button className="sr-only" onClick={onClose}>
        Đóng
      </button>
    </div>
  );
}
