import { simulateApiCall } from "./apiUtils";

export interface AdminStats {
  revenue: string;
  revenueChange: string;
  newPatients: string;
  newPatientsChange: string;
  appointmentsToday: string;
  appointmentsTodayChange: string;
}

export interface Doctor {
  id: number;
  name: string;
  email: string;
  phone: string;
  specialty: string;
  experience: string;
  rating: number;
  patients: number;
  revenue: string;
  status: "active" | "inactive";
}

export interface Expert {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  specialty: string;
  conversations: number;
  rating: number;
  status: "active" | "inactive";
}

export interface Patient {
  id: number;
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: "Nam" | "Nữ";
  joinDate: string;
  lastVisit: string;
  diagnosis: string;
  doctor: string;
  appointments: number;
  status: "active" | "inactive";
}

export const adminService = {
  async getStats(): Promise<AdminStats> {
    const mockStats: AdminStats = {
      revenue: "450M",
      revenueChange: "+12.5%",
      newPatients: "2,543",
      newPatientsChange: "+8.2%",
      appointmentsToday: "342",
      appointmentsTodayChange: "-3.1%",
    };

    return simulateApiCall(mockStats);
  },

  async getDoctors(): Promise<Doctor[]> {
    const mockDoctors: Doctor[] = [
      {
        id: 1,
        name: "BS. Nguyễn Văn An",
        email: "an.nguyen@healthcare.com",
        phone: "0981 111 222",
        specialty: "Tim mạch",
        experience: "15 năm",
        rating: 4.9,
        patients: 234,
        revenue: "120M",
        status: "active",
      },
      {
        id: 2,
        name: "BS. Trần Thị Bình",
        email: "binh.tran@healthcare.com",
        phone: "0982 222 333",
        specialty: "Nhi khoa",
        experience: "12 năm",
        rating: 4.8,
        patients: 189,
        revenue: "98M",
        status: "active",
      },
      {
        id: 3,
        name: "BS. Lê Minh Cường",
        email: "cuong.le@healthcare.com",
        phone: "0983 333 444",
        specialty: "Nội khoa",
        experience: "20 năm",
        rating: 4.95,
        patients: 312,
        revenue: "142M",
        status: "active",
      },
      {
        id: 4,
        name: "BS. Phạm Văn Đức",
        email: "duc.pham@healthcare.com",
        phone: "0984 444 555",
        specialty: "Thần kinh",
        experience: "18 năm",
        rating: 4.7,
        patients: 267,
        revenue: "111M",
        status: "inactive",
      },
      {
        id: 5,
        name: "BS. Hoàng Thị Hương",
        email: "huong.hoang@healthcare.com",
        phone: "0985 555 666",
        specialty: "Da liễu",
        experience: "10 năm",
        rating: 4.85,
        patients: 145,
        revenue: "76M",
        status: "active",
      },
    ];

    return simulateApiCall(mockDoctors);
  },

  async getExperts(): Promise<Expert[]> {
    const mockExperts: Expert[] = [
      {
        id: 1,
        name: "TS. Trần Đức Mạnh",
        email: "manh.tran@healthcare.com",
        phone: "0911 222 333",
        position: "Trưởng nhóm",
        department: "Khối AI",
        specialty: "Trí tuệ nhân tạo y tế",
        conversations: 1523,
        rating: 4.8,
        status: "active",
      },
      {
        id: 2,
        name: "PGS. Lê Thị Hoa",
        email: "hoa.le@healthcare.com",
        phone: "0912 333 444",
        position: "Cố vấn cao cấp",
        department: "Dinh dưỡng",
        specialty: "Dinh dưỡng",
        conversations: 892,
        rating: 4.6,
        status: "active",
      },
      {
        id: 3,
        name: "TS. Nguyễn Văn Sơn",
        email: "son.nguyen@healthcare.com",
        phone: "0913 444 555",
        position: "Chuyên gia",
        department: "Tâm lý",
        specialty: "Tâm lý",
        conversations: 1123,
        rating: 4.9,
        status: "active",
      },
      {
        id: 4,
        name: "TS. Vũ Thị Thu",
        email: "thu.vu@healthcare.com",
        phone: "0914 555 666",
        position: "Chuyên gia",
        department: "Phục hồi",
        specialty: "Thể dục y tế",
        conversations: 567,
        rating: 4.5,
        status: "inactive",
      },
      {
        id: 5,
        name: "TS. Đặng Văn Hiệp",
        email: "hiep.dang@healthcare.com",
        phone: "0915 666 777",
        position: "Chuyên gia",
        department: "Bệnh lý",
        specialty: "Bệnh lý",
        conversations: 1834,
        rating: 4.85,
        status: "active",
      },
    ];

    return simulateApiCall(mockExperts);
  },

  async getPatients(): Promise<Patient[]> {
    const mockPatients: Patient[] = [
      {
        id: 1,
        name: "Nguyễn Văn A",
        email: "nguyen.a@example.com",
        phone: "0901 234 567",
        age: 29,
        gender: "Nam",
        joinDate: "2025-01-15",
        lastVisit: "2026-05-20",
        diagnosis: "Tim mạch",
        doctor: "BS. Nguyễn Văn An",
        appointments: 5,
        status: "active",
      },
      {
        id: 2,
        name: "Trần Thị B",
        email: "tran.b@example.com",
        phone: "0902 345 678",
        age: 41,
        gender: "Nữ",
        joinDate: "2025-02-20",
        lastVisit: "2026-05-18",
        diagnosis: "Nhi khoa",
        doctor: "BS. Trần Thị Bình",
        appointments: 3,
        status: "active",
      },
      {
        id: 3,
        name: "Lê Văn C",
        email: "le.c@example.com",
        phone: "0903 456 789",
        age: 52,
        gender: "Nam",
        joinDate: "2025-03-10",
        lastVisit: "2026-05-12",
        diagnosis: "Tiêu hóa",
        doctor: "BS. Lê Minh Cường",
        appointments: 8,
        status: "active",
      },
      {
        id: 4,
        name: "Phạm Thị D",
        email: "pham.d@example.com",
        phone: "0904 567 890",
        age: 36,
        gender: "Nữ",
        joinDate: "2025-04-05",
        lastVisit: "2026-05-08",
        diagnosis: "Da liễu",
        doctor: "BS. Hoàng Thị Hương",
        appointments: 2,
        status: "inactive",
      },
    ];

    return simulateApiCall(mockPatients);
  },

  async getRevenueData() {
    const mockData = {
      monthly: [
        { month: "Jan", revenue: 200 },
        { month: "Feb", revenue: 220 },
        { month: "Mar", revenue: 250 },
        { month: "Apr", revenue: 280 },
        { month: "May", revenue: 320 },
      ],
      byService: [
        { name: "Khám thường", value: 35 },
        { name: "Tư vấn trực tuyến", value: 25 },
        { name: "Thử nghiệm", value: 20 },
        { name: "Khác", value: 20 },
      ],
    };

    return simulateApiCall(mockData);
  },

  async updateDoctor(_doctorId: number, _data: Partial<Doctor>) {
    return simulateApiCall({ success: true });
  },

  async deleteDoctor(_doctorId: number) {
    return simulateApiCall({ success: true });
  },
};
