import { simulateApiCall } from "./apiUtils";
import {
  getPatientAppointments,
  savePatientAppointment,
  updatePatientAppointment,
  type PatientAppointmentItem,
} from "./patientDataStore";

export interface Appointment {
  id: number;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
  status: "confirmed" | "pending" | "completed" | "cancelled";
  phone?: string;
}

export interface HealthMetric {
  label: string;
  value: string;
  unit: string;
  status: string;
  description: string;
}

export interface MedicalRecord {
  id: number;
  date: string;
  doctor: string;
  diagnosis: string;
  prescription: string;
  notes: string;
}

export const patientService = {
  async getAppointments(_patientId: string): Promise<Appointment[]> {
    return simulateApiCall(
      getPatientAppointments().filter(
        (appointment) => appointment.status !== "cancelled",
      ),
    );
  },

  async getAppointmentDetails(_patientId: string): Promise<PatientAppointmentItem[]> {
    return simulateApiCall(getPatientAppointments());
  },

  async getHealthMetrics(_patientId: string): Promise<HealthMetric[]> {
    const mockMetrics: HealthMetric[] = [
      {
        label: "Nhịp tim",
        value: "72",
        unit: "bpm",
        status: "normal",
        description: "Bình thường",
      },
      {
        label: "Huyết áp",
        value: "120/80",
        unit: "mmHg",
        status: "normal",
        description: "Tốt",
      },
      {
        label: "Cân nặng",
        value: "68",
        unit: "kg",
        status: "normal",
        description: "Ổn định",
      },
      {
        label: "Đường huyết",
        value: "95",
        unit: "mg/dL",
        status: "normal",
        description: "Bình thường",
      },
    ];

    return simulateApiCall(mockMetrics);
  },

  async getMedicalRecords(_patientId: string): Promise<MedicalRecord[]> {
    const mockRecords: MedicalRecord[] = [
      {
        id: 1,
        date: "2026-04-15",
        doctor: "BS. Lê Minh Cường",
        diagnosis: "Tăng huyết áp độ 1",
        prescription: "Amlodipine 5mg hằng ngày",
        notes: "Bệnh nhân cần giảm cân và tập thể dục",
      },
      {
        id: 2,
        date: "2026-03-20",
        doctor: "BS. Nguyễn Văn An",
        diagnosis: "Kiểm tra định kỳ",
        prescription: "Không",
        notes: "Sức khỏe bình thường, tiếp tục theo dõi",
      },
    ];

    return simulateApiCall(mockRecords);
  },

  async bookAppointment(
    _patientId: string,
    appointmentData: Omit<PatientAppointmentItem, "id" | "code" | "status">,
  ): Promise<PatientAppointmentItem> {
    return simulateApiCall(savePatientAppointment(appointmentData));
  },

  async cancelAppointment(appointmentId: number): Promise<{ success: boolean }> {
    updatePatientAppointment(appointmentId, { status: "cancelled" });
    return simulateApiCall({ success: true });
  },

  async rescheduleAppointment(
    appointmentId: number,
    date: string,
    time: string,
  ): Promise<{ success: boolean }> {
    updatePatientAppointment(appointmentId, {
      date,
      time,
      status: "pending",
    });
    return simulateApiCall({ success: true });
  },

  async getHealthTrackingData(_patientId: string) {
    const mockData = {
      bloodPressure: [
        { date: "2026-05-01", systolic: 120, diastolic: 80 },
        { date: "2026-05-08", systolic: 118, diastolic: 78 },
        { date: "2026-05-15", systolic: 122, diastolic: 82 },
        { date: "2026-05-22", systolic: 119, diastolic: 79 },
        { date: "2026-05-29", systolic: 121, diastolic: 81 },
      ],
      heartRate: [
        { date: "2026-05-01", value: 72 },
        { date: "2026-05-08", value: 70 },
        { date: "2026-05-15", value: 75 },
        { date: "2026-05-22", value: 71 },
        { date: "2026-05-29", value: 73 },
      ],
      weight: [
        { date: "2026-05-01", value: 70 },
        { date: "2026-05-08", value: 69.5 },
        { date: "2026-05-15", value: 69 },
        { date: "2026-05-22", value: 68.5 },
        { date: "2026-05-29", value: 68 },
      ],
    };

    return simulateApiCall(mockData);
  },
};
