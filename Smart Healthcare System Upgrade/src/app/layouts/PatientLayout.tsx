import React from "react";
import { Outlet } from "react-router-dom";
import PatientSidebar from "./PatientSidebar";
import PatientHeader from "./PatientHeader";

export default function PatientLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <PatientSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <PatientHeader />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
