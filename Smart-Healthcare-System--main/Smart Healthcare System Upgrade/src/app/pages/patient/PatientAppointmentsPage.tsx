import { FormEvent, useEffect, useState } from "react";
import { createAppointment, getAppointmentsByPatient, getDoctors, updateAppointmentStatus } from "../../lib/api";
import { getSession } from "../../lib/auth";

type DoctorOption = { id: number; fullName: string; specialties: string[] };

export default function PatientAppointmentsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [doctors, setDoctors] = useState<DoctorOption[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [doctorId, setDoctorId] = useState("");
  const [scheduledStart, setScheduledStart] = useState("");
  const [reason, setReason] = useState("");
  const [symptoms, setSymptoms] = useState("");

  const session = getSession();
  const patientId = session?.user.userId;

  const loadData = async () => {
    if (!patientId) {
      setError("Chua dang nhap");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError("");
    try {
      const [doctorItems, appointmentItems] = await Promise.all([
        getDoctors(),
        getAppointmentsByPatient(patientId),
      ]);
      setDoctors(doctorItems);
      setAppointments(appointmentItems);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Tai du lieu that bai");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onCreate = async (e: FormEvent) => {
    e.preventDefault();
    if (!patientId || !doctorId || !scheduledStart) return;
    setSaving(true);
    setError("");
    try {
      const start = new Date(scheduledStart);
      const end = new Date(start.getTime() + 30 * 60 * 1000);
      await createAppointment({
        patientId,
        doctorId: Number(doctorId),
        scheduledStart: start.toISOString().slice(0, 19),
        scheduledEnd: end.toISOString().slice(0, 19),
        reason,
        symptoms,
        appointmentType: "offline",
        priority: "normal",
      });
      setDoctorId("");
      setScheduledStart("");
      setReason("");
      setSymptoms("");
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Tao lich hen that bai");
    } finally {
      setSaving(false);
    }
  };

  const onCancel = async (id: number) => {
    try {
      await updateAppointmentStatus(id, "cancelled", "Cancelled by patient");
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Cap nhat lich hen that bai");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Quan ly lich hen (CRUD)</h1>
          <p className="text-gray-600">Tao, xem, cap nhat trang thai lich hen qua backend API</p>
        </div>

        <form onSubmit={onCreate} className="bg-white rounded-xl p-5 shadow space-y-3">
          <h2 className="font-semibold">Tao lich hen moi</h2>
          <select className="w-full border rounded-lg px-3 py-2" value={doctorId} onChange={(e) => setDoctorId(e.target.value)} required>
            <option value="">Chon bac si</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.fullName} {doctor.specialties.length ? `(${doctor.specialties.join(", ")})` : ""}
              </option>
            ))}
          </select>
          <input className="w-full border rounded-lg px-3 py-2" type="datetime-local" value={scheduledStart} onChange={(e) => setScheduledStart(e.target.value)} required />
          <input className="w-full border rounded-lg px-3 py-2" placeholder="Ly do kham" value={reason} onChange={(e) => setReason(e.target.value)} />
          <textarea className="w-full border rounded-lg px-3 py-2" placeholder="Trieu chung" value={symptoms} onChange={(e) => setSymptoms(e.target.value)} />
          <button className="rounded-lg bg-blue-600 text-white px-4 py-2 disabled:opacity-60" disabled={saving}>
            {saving ? "Dang luu..." : "Tao lich hen"}
          </button>
        </form>

        <div className="bg-white rounded-xl p-5 shadow">
          <h2 className="font-semibold mb-3">Danh sach lich hen</h2>
          {loading ? <p>Dang tai...</p> : null}
          {error ? <p className="text-red-600 text-sm mb-2">{error}</p> : null}
          {!loading && appointments.length === 0 ? <p className="text-gray-600">Chua co lich hen nao.</p> : null}
          <div className="space-y-3">
            {appointments.map((item) => (
              <div key={item.id} className="border rounded-lg p-3 flex items-center justify-between">
                <div>
                  <p className="font-medium">{item.code} - {item.doctorName}</p>
                  <p className="text-sm text-gray-600">{new Date(item.start).toLocaleString("vi-VN")} - {item.status}</p>
                  <p className="text-sm text-gray-500">{item.reason || "Khong co ly do"}</p>
                </div>
                {item.status !== "cancelled" && (
                  <button className="text-sm bg-red-100 text-red-700 px-3 py-1 rounded-md" onClick={() => onCancel(item.id)}>
                    Huy lich
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
