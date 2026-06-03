import React from "react";
import { Bell, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function ProfessionalHeader() {
  const { user, userRole } = useAuth();

  const getRoleLabel = () => {
    const labels: Record<string, string> = {
      expert: "Chuyên gia",
      consultant: "Cố vấn",
    };
    return labels[userRole] || "Chuyên gia";
  };

  return (
    <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-gray-900">
          Xin chào, {user?.name}!
        </h1>
        <p className="text-sm text-gray-600">
          Chuyên khoa: {user?.specialty || "Tư vấn"}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
          <Bell size={24} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-600">{getRoleLabel()}</p>
          </div>
          <button className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center hover:bg-indigo-200 transition-colors">
            <User size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
