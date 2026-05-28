import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../lib/api";
import { roleHomePath, saveSession } from "../../lib/auth";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const auth = await register({ fullName, phone, email, password, role });
      saveSession({
        token: auth.accessToken,
        user: {
          userId: auth.userId,
          email: auth.email,
          fullName: auth.fullName,
          roles: auth.roles,
        },
      });
      navigate(roleHomePath(auth.roles));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Dang ky that bai");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow">
        <h1 className="text-2xl font-bold mb-1">Dang ky</h1>
        <p className="text-sm text-gray-600 mb-4">Tao tai khoan de su dung he thong</p>
        <form onSubmit={onSubmit} className="space-y-3">
          <input className="w-full border rounded-lg px-3 py-2" placeholder="Ho va ten" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
          <input className="w-full border rounded-lg px-3 py-2" placeholder="So dien thoai" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <input className="w-full border rounded-lg px-3 py-2" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input className="w-full border rounded-lg px-3 py-2" type="password" placeholder="Mat khau" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <select className="w-full border rounded-lg px-3 py-2" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="expert">Expert</option>
            <option value="consultant">Consultant</option>
            <option value="admin">Admin</option>
          </select>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button className="w-full rounded-lg bg-blue-600 text-white py-2 disabled:opacity-60" disabled={loading}>
            {loading ? "Dang xu ly..." : "Dang ky"}
          </button>
        </form>
        <p className="text-sm mt-4">
          Da co tai khoan?{" "}
          <Link to="/login" className="text-blue-600">
            Dang nhap
          </Link>
        </p>
      </div>
    </div>
  );
}
