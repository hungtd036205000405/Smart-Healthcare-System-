import { getToken } from "./auth";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080/api";

type ApiEnvelope<T> = {
  success: boolean;
  message: string;
  data: T;
};

type AuthResponse = {
  accessToken: string;
  tokenType: string;
  userId: number;
  email: string;
  fullName: string;
  roles: string[];
};

type Pageable<T> = {
  content: T[];
};

export type DoctorItem = {
  id: number;
  fullName: string;
  specialties: string[];
};

export type AppointmentItem = {
  id: number;
  code: string;
  patientName: string;
  doctorName: string;
  status: string;
  start: string;
  end: string;
  reason: string;
};

export type PatientItem = {
  id: number;
  fullName: string;
  email: string;
  patientCode: string;
  dateOfBirth: string | null;
  gender: string;
  address: string | null;
};

export type UserResponse = {
  userId: number;
  email: string;
  fullName: string;
  phone?: string;
  roles: string[];
};

export type EncounterResponse = {
  id: number;
  code: string;
  patientName: string;
  doctorName: string;
  chiefComplaint: string;
  symptoms: string;
  diagnosis: string;
  treatmentPlan: string;
  doctorNotes: string;
  encounteredAt: string;
};

export type AdminStats = {
  users: number;
  doctors: number;
  patients: number;
  appointments: number;
  pendingAppointments: number;
  invoices: number;
};

export async function apiRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers = new Headers(init.headers ?? {});
  headers.set("Content-Type", "application/json");
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(`${API_BASE_URL}${path}`, { ...init, headers });
  const payload = (await response.json()) as ApiEnvelope<T>;

  if (!response.ok || !payload.success) {
    throw new Error(payload?.message || "API request failed");
  }

  return payload.data;
}

export function register(payload: {
  email: string;
  phone: string;
  password: string;
  fullName: string;
  role: string;
}) {
  return apiRequest<AuthResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function login(payload: { email: string; password: string }) {
  return apiRequest<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getDoctors() {
  const page = await apiRequest<Pageable<DoctorItem>>("/doctors?page=0&size=50");
  return page.content;
}

export async function getPatients(params?: { q?: string; page?: number; size?: number }) {
  const page = params?.page ?? 0;
  const size = params?.size ?? 50;
  const q = params?.q ? `&q=${encodeURIComponent(params.q)}` : "";
  const result = await apiRequest<Pageable<PatientItem>>(`/patients?page=${page}&size=${size}${q}`);
  return result.content;
}

export function getAdminStats() {
  return apiRequest<AdminStats>("/admin/stats");
}

export async function getAppointmentsByPatient(patientId: number) {
  const page = await apiRequest<Pageable<AppointmentItem>>(`/appointments?patientId=${patientId}&page=0&size=50`);
  return page.content;
}

export function createAppointment(payload: {
  patientId: number;
  doctorId: number;
  scheduledStart: string;
  scheduledEnd: string;
  reason: string;
  symptoms: string;
  appointmentType?: string;
  priority?: string;
}) {
  return apiRequest<AppointmentItem>("/appointments", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateAppointmentStatus(id: number, status: string, cancelReason = "") {
  return apiRequest<AppointmentItem>(`/appointments/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status, cancelReason }),
  });
}

export function getCurrentUser() {
  return apiRequest<UserResponse>("/auth/me");
}

export async function getMedicalRecordsByPatient(patientId: number) {
  const page = await apiRequest<Pageable<EncounterResponse>>(`/medical-records?patientId=${patientId}&page=0&size=50`);
  return page.content;
}

export async function getAppointmentsByDoctor(doctorId: number) {
  const page = await apiRequest<Pageable<AppointmentItem>>(`/appointments?doctorId=${doctorId}&page=0&size=50`);
  return page.content;
}
