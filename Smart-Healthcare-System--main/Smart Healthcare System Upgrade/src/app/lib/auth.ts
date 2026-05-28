export type SessionUser = {
  userId: number;
  email: string;
  fullName: string;
  roles: string[];
};

export type SessionState = {
  token: string;
  user: SessionUser;
};

const SESSION_KEY = "smart_healthcare_session";

export function getSession(): SessionState | null {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SessionState;
  } catch {
    localStorage.removeItem(SESSION_KEY);
    return null;
  }
}

export function saveSession(session: SessionState) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function getToken(): string | null {
  return getSession()?.token ?? null;
}

export function roleHomePath(roles: string[]) {
  const normalized = roles.map((r) => r.toLowerCase());
  if (normalized.includes("admin")) return "/admin/dashboard";
  if (normalized.includes("doctor")) return "/doctor/home";
  if (normalized.includes("expert")) return "/expert/dashboard";
  if (normalized.includes("consultant")) return "/consultant/dashboard";
  return "/patient/dashboard";
}
