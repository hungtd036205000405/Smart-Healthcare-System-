import React, { createContext, useContext, useState, useEffect } from "react";

export type UserRole =
  | "guest"
  | "patient"
  | "doctor"
  | "expert"
  | "consultant"
  | "admin";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  specialty?: string; // for doctor/expert
}

interface AuthContextType {
  user: AuthUser | null;
  userRole: UserRole;
  isLoading: boolean;
  login: (role: UserRole, userData?: Partial<AuthUser>) => void;
  logout: () => void;
  updateUser: (userData: Partial<AuthUser>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [userRole, setUserRole] = useState<UserRole>("guest");
  const [isLoading, setIsLoading] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setUserRole(parsedUser.role);
      } catch (error) {
        console.error("Failed to load user from localStorage:", error);
      }
    }
  }, []);

  const login = (role: UserRole, userData?: Partial<AuthUser>) => {
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const newUser: AuthUser = {
        id: userData?.id || `user_${Date.now()}`,
        name: userData?.name || getRoleDefaultName(role),
        email: userData?.email || `${role}@healthcare.com`,
        role,
        avatar: userData?.avatar,
        phone: userData?.phone,
        specialty: userData?.specialty,
      };

      setUser(newUser);
      setUserRole(role);
      localStorage.setItem("currentUser", JSON.stringify(newUser));
      setIsLoading(false);
    }, 300);
  };

  const logout = () => {
    setUser(null);
    setUserRole("guest");
    localStorage.removeItem("currentUser");
  };

  const updateUser = (userData: Partial<AuthUser>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, userRole, isLoading, login, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

function getRoleDefaultName(role: UserRole): string {
  const names: Record<UserRole, string> = {
    patient: "Nguyễn Văn A",
    doctor: "BS. Lê Minh Cường",
    expert: "TS. Trần Đức Mạnh",
    consultant: "CTV. Hoàng Thị Huyền",
    admin: "Admin System",
    guest: "Khách",
  };
  return names[role];
}
