import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Calendar,
  Users,
  Clock,
  Menu,
  X,
  LogOut,
  Settings,
  User,
  Stethoscope,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function DoctorSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    { label: "Dashboard", icon: Stethoscope, path: "/doctor/dashboard" },
    { label: "Lịch hẹn hôm nay", icon: Calendar, path: "/doctor/schedule" },
    { label: "Danh sách bệnh nhân", icon: Users, path: "/doctor/patients" },
    { label: "Hồ sơ bệnh nhân", icon: Users, path: "/doctor/patients" },
  ];

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-green-600 text-white rounded-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:relative w-64 h-screen bg-gradient-to-b from-green-700 to-green-900 text-white transition-transform duration-300 z-40 flex flex-col`}
      >
        <div className="p-6 border-b border-green-600">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <Stethoscope className="text-green-600" size={24} />
            </div>
            <span className="text-xl font-bold">MediCare</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  active
                    ? "bg-white text-green-700 font-semibold"
                    : "text-green-100 hover:bg-green-600"
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-green-600 space-y-2">
          <Link
            to="/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-green-100 hover:bg-green-600 transition-colors"
          >
            <Settings size={20} />
            <span>Cài đặt</span>
          </Link>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-green-100 hover:bg-red-600 transition-colors"
          >
            <LogOut size={20} />
            <span>Đăng xuất</span>
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
