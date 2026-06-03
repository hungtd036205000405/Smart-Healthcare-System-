import { simulateApiCall } from "./apiUtils";

export interface DoctorAppointment {
  id: number;
  patient: string;
  age: number;
  time: string;
  status: "waiting" | "in-progress" | "completed";
  reason: string;
  symptoms: string;
  priority: "normal" | "high" | "urgent";
  medicalHistory: string;
  allergies: string[];
  vitalSigns: {
    bp: string;
    hr: string;
    temp: string;
  };
}

export interface DoctorStats {
  totalPatients: number;
  appointmentToday: number;
  completedConsultations: number;
  pendingReports: number;
}

export const doctorService = {
  async getTodayAppointments(_doctorId: string): Promise<DoctorAppointment[]> {
    const mockAppointments: DoctorAppointment[] = [
      {
        id: 1,
        patient: "Nguyễn Văn A",
        age: 45,
        time: "09:00",
        status: "waiting",
        reason: "Khám định kỳ tim mạch",
        symptoms: "Đau ngực, khó thở khi gắng sức",
        priority: "normal",
        medicalHistory: "Tiền sử cao huyết áp, đang điều trị",
        allergies: ["Penicillin"],
        vitalSigns: {
          bp: "140/90",
          hr: "85",
          temp: "37.0",
        },
      },
      {
        id: 2,
        patient: "Trần Thị B",
        age: 32,
        time: "09:30",
        status: "in-progress",
        reason: "Tái khám",
        symptoms: "Theo dõi sau phẫu thuật",
        priority: "high",
        medicalHistory: "Phẫu thuật tim 3 tháng trước",
        allergies: [],
        vitalSigns: {
          bp: "120/80",
          hr: "72",
          temp: "36.5",
        },
      },
      {
        id: 3,
        patient: "Lê Văn C",
        age: 58,
        time: "10:00",
        status: "waiting",
        reason: "Khám bệnh mới",
        symptoms: "Tim đập nhanh, mệt mỏi",
        priority: "urgent",
        medicalHistory: "Không có tiền sử bệnh lý",
        allergies: ["Aspirin"],
        vitalSigns: {
          bp: "150/95",
          hr: "95",
          temp: "36.8",
        },
      },
      {
        id: 4,
        patient: "Phạm Thị D",
        age: 67,
        time: "10:30",
        status: "completed",
        reason: "Tư vấn trực tuyến",
        symptoms: "Huyết áp cao",
        priority: "normal",
        medicalHistory: "Đái tháo đường type 2",
        allergies: [],
        vitalSigns: {
          bp: "145/92",
          hr: "78",
          temp: "36.6",
        },
      },
    ];

    return simulateApiCall(mockAppointments);
  },

  async getStats(_doctorId: string): Promise<DoctorStats> {
    const mockStats: DoctorStats = {
      totalPatients: 127,
      appointmentToday: 8,
      completedConsultations: 345,
      pendingReports: 5,
    };

    return simulateApiCall(mockStats);
  },

  async getPatientHistory(_patientId: string) {
    const mockHistory = {
      visits: 12,
      lastVisit: "2026-04-15",
      diagnosis: ["Tăng huyết áp độ 1", "Béo phì"],
      medications: ["Amlodipine 5mg", "Metformin 500mg"],
      allergies: ["Penicillin"],
      notes: "Bệnh nhân tuân thủ điều trị tốt",
    };

    return simulateApiCall(mockHistory);
  },

  async createPrescription(appointmentId: number, prescription: any) {
    const mockResponse = {
      id: Date.now(),
      appointmentId,
      ...prescription,
      createdAt: new Date().toISOString(),
    };

    return simulateApiCall(mockResponse);
  },

  async completeAppointment(_appointmentId: number, _notes: string) {
    return simulateApiCall({ success: true });
  },
};
