import React from "react";
import { Bell, User, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function PatientHeader() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-gray-900">
          Xin chào, {user?.name}!
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
          <Bell size={24} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Menu */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-600">Bệnh nhân</p>
          </div>
          <button className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200 transition-colors">
            <User size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
