export type PatientAppointmentStatus =
  | "confirmed"
  | "pending"
  | "completed"
  | "cancelled";

export type PatientAppointmentType = "clinic" | "video";

export interface PatientAppointmentItem {
  id: number;
  code: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
  status: PatientAppointmentStatus;
  type: PatientAppointmentType;
  phone: string;
  price: string;
  reason: string;
  note?: string;
}

export interface PatientDoctor {
  id: number;
  name: string;
  specialty: string;
  experience: string;
  rating: number;
  reviews: number;
  price: string;
  image: string;
  phone: string;
  location: string;
  availableDates: string[];
}

const APPOINTMENTS_KEY = "patientAppointments";

export const patientSpecialties = [
  { id: "cardiology", name: "Tim mạch", doctors: 24 },
  { id: "pediatrics", name: "Nhi khoa", doctors: 18 },
  { id: "dermatology", name: "Da liễu", doctors: 15 },
  { id: "gastroenterology", name: "Tiêu hóa", doctors: 12 },
  { id: "neurology", name: "Thần kinh", doctors: 20 },
  { id: "ophthalmology", name: "Mắt", doctors: 10 },
];

export const patientDoctors: PatientDoctor[] = [
  {
    id: 1,
    name: "BS. Nguyễn Văn An",
    specialty: "Tim mạch",
    experience: "15 năm",
    rating: 4.9,
    reviews: 342,
    price: "300,000",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
    phone: "0901 234 567",
    location: "Phòng 301, Tầng 3",
    availableDates: ["2026-06-05", "2026-06-07", "2026-06-10"],
  },
  {
    id: 2,
    name: "BS. Trần Thị Bình",
    specialty: "Nhi khoa",
    experience: "12 năm",
    rating: 5,
    reviews: 428,
    price: "350,000",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop",
    phone: "0902 345 678",
    location: "Phòng 205, Tầng 2",
    availableDates: ["2026-06-06", "2026-06-09", "2026-06-12"],
  },
  {
    id: 3,
    name: "BS. Hoàng Thị Hương",
    specialty: "Da liễu",
    experience: "10 năm",
    rating: 4.8,
    reviews: 219,
    price: "280,000",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
    phone: "0903 456 789",
    location: "Phòng 402, Tầng 4",
    availableDates: ["2026-06-05", "2026-06-08", "2026-06-11"],
  },
  {
    id: 4,
    name: "BS. Lê Minh Cường",
    specialty: "Tiêu hóa",
    experience: "20 năm",
    rating: 4.95,
    reviews: 512,
    price: "400,000",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    phone: "0904 567 890",
    location: "Phòng 308, Tầng 3",
    availableDates: ["2026-06-07", "2026-06-10", "2026-06-13"],
  },
];

const defaultAppointments: PatientAppointmentItem[] = [
  {
    id: 1,
    code: "BK1001",
    doctor: "BS. Nguyễn Văn An",
    specialty: "Tim mạch",
    date: "2026-06-05",
    time: "09:00",
    location: "Phòng 301, Tầng 3",
    status: "confirmed",
    type: "clinic",
    phone: "0901 234 567",
    price: "300,000",
    reason: "Khám định kỳ tim mạch",
  },
  {
    id: 2,
    code: "BK1002",
    doctor: "BS. Trần Thị Bình",
    specialty: "Nhi khoa",
    date: "2026-06-09",
    time: "14:30",
    location: "Video call",
    status: "pending",
    type: "video",
    phone: "0902 345 678",
    price: "350,000",
    reason: "Tư vấn sức khỏe trực tuyến",
  },
  {
    id: 3,
    code: "BK0988",
    doctor: "BS. Lê Minh Cường",
    specialty: "Tiêu hóa",
    date: "2026-05-20",
    time: "10:00",
    location: "Phòng 308, Tầng 3",
    status: "completed",
    type: "clinic",
    phone: "0904 567 890",
    price: "400,000",
    reason: "Tái khám",
  },
];

function readAppointments(): PatientAppointmentItem[] {
  const raw = localStorage.getItem(APPOINTMENTS_KEY);
  if (!raw) return defaultAppointments;

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : defaultAppointments;
  } catch {
    return defaultAppointments;
  }
}

function writeAppointments(appointments: PatientAppointmentItem[]) {
  localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments));
}

export function getPatientAppointments() {
  const appointments = readAppointments();
  writeAppointments(appointments);
  return appointments;
}

export function savePatientAppointment(
  appointment: Omit<PatientAppointmentItem, "id" | "code" | "status"> & {
    status?: PatientAppointmentStatus;
  },
) {
  const appointments = getPatientAppointments();
  const nextId = Math.max(0, ...appointments.map((item) => item.id)) + 1;
  const newAppointment: PatientAppointmentItem = {
    ...appointment,
    id: nextId,
    code: `BK${1000 + nextId}`,
    status: appointment.status ?? "pending",
  };

  writeAppointments([newAppointment, ...appointments]);
  return newAppointment;
}

export function updatePatientAppointment(
  id: number,
  updates: Partial<PatientAppointmentItem>,
) {
  const appointments = getPatientAppointments().map((appointment) =>
    appointment.id === id ? { ...appointment, ...updates } : appointment,
  );
  writeAppointments(appointments);
  return appointments;
}

export function clearPatientAppointmentData() {
  localStorage.removeItem(APPOINTMENTS_KEY);
}
