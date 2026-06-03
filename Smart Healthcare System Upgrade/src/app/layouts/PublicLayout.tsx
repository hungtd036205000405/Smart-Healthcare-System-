import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ChatbotWidget from "../components/ChatbotWidget";
import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header userRole="guest" />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
}
