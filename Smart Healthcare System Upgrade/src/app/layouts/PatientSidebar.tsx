import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Calendar,
  FileText,
  Activity,
  Heart,
  Menu,
  X,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function PatientSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    { label: "Dashboard", icon: Heart, path: "/patient/dashboard" },
    { label: "Đặt lịch khám", icon: Calendar, path: "/patient/booking" },
    { label: "Lịch hẹn", icon: Calendar, path: "/patient/appointments" },
    { label: "Hồ sơ sức khỏe", icon: FileText, path: "/patient/records" },
    {
      label: "Tư vấn trực tuyến",
      icon: MessageSquare,
      path: "/patient/consultation",
    },
    {
      label: "Theo dõi sức khỏe",
      icon: Activity,
      path: "/patient/health-tracking",
    },
  ];

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:relative w-64 h-screen bg-gradient-to-b from-blue-700 to-blue-900 text-white transition-transform duration-300 z-40 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-blue-600">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <Heart className="text-blue-600" size={24} />
            </div>
            <span className="text-xl font-bold">MediCare</span>
          </Link>
        </div>

        {/* Menu */}
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
                    ? "bg-white text-blue-700 font-semibold"
                    : "text-blue-100 hover:bg-blue-600"
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Menu */}
        <div className="p-4 border-t border-blue-600 space-y-2">
          <Link
            to="/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-blue-100 hover:bg-blue-600 transition-colors"
          >
            <Settings size={20} />
            <span>Cài đặt</span>
          </Link>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-blue-100 hover:bg-red-600 transition-colors"
          >
            <LogOut size={20} />
            <span>Đăng xuất</span>
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

// Placeholder for MessageSquare import
const MessageSquare = ({
  size,
  className,
}: {
  size: number;
  className?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);
