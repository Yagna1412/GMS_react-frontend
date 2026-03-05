import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthLayout from "./components/AuthLayout";
import ContactSupport from "./pages/ContactSupport";
import SuperAdminDashboard from "./ui/SuperAdminDashboard";
import { DashboardProvider } from "./context/DashboardContext";

export default function App() {
  return (
    <DashboardProvider>
      <Routes>
        <Route path="/" element={<AuthLayout />} />
        <Route path="/contact-support" element={<ContactSupport />} />
        <Route path="/super-admin" element={<SuperAdminDashboard />} />
      </Routes>
    </DashboardProvider>
  );
}