import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BarChart3,
  MessageSquare,
  TrendingUp,
  Menu,
  X,
  LogOut,
  Settings,
  User,
  Brain,
  Headset,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function ProfessionalSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const { logout, userRole } = useAuth();

  const getMenuItems = () => {
    const baseItems = [
      { label: "Dashboard", icon: BarChart3, path: `/${userRole}/dashboard` },
    ];

    if (userRole === "expert") {
      return [
        ...baseItems,
        {
          label: "Conversations",
          icon: MessageSquare,
          path: "/expert/analytics",
        },
        { label: "Analytics", icon: TrendingUp, path: "/expert/research" },
      ];
    } else if (userRole === "consultant") {
      return [
        ...baseItems,
        { label: "Tư vấn", icon: MessageSquare, path: "/consultant/history" },
        { label: "Chuyên gia", icon: User, path: "/consultant/experts" },
      ];
    }

    return baseItems;
  };

  const menuItems = getMenuItems();
  const isActive = (path: string) => location.pathname.startsWith(path);
  const bgColor =
    userRole === "expert"
      ? "from-indigo-700 to-indigo-900"
      : "from-cyan-700 to-cyan-900";
  const textColor = userRole === "expert" ? "indigo" : "cyan";
  const hoverColor = userRole === "expert" ? "indigo-600" : "cyan-600";
  const buttonColor = userRole === "expert" ? "indigo-100" : "cyan-100";
  const buttonTextColor = userRole === "expert" ? "indigo-600" : "cyan-600";

  const Icon = userRole === "expert" ? Brain : Headset;

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`md:hidden fixed top-4 left-4 z-50 p-2 bg-${textColor}-600 text-white rounded-lg`}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:relative w-64 h-screen bg-gradient-to-b ${bgColor} text-white transition-transform duration-300 z-40 flex flex-col`}
      >
        <div className="p-6 border-b border-opacity-20 border-white">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <Icon className={`text-${textColor}-600`} size={24} />
            </div>
            <span className="text-xl font-bold">MediCare</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const ItemIcon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  active
                    ? `bg-white text-${textColor}-700 font-semibold`
                    : `text-opacity-90 text-white hover:bg-${hoverColor}`
                }`}
              >
                <ItemIcon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div
          className={`p-4 border-t border-opacity-20 border-white space-y-2`}
        >
          <Link
            to="/settings"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-opacity-90 text-white hover:bg-${hoverColor} transition-colors`}
          >
            <Settings size={20} />
            <span>Cài đặt</span>
          </Link>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-opacity-90 text-white hover:bg-red-600 transition-colors"
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
