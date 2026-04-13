import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthLayout from "./components/AuthLayout";
import ContactSupport from "./pages/ContactSupport";
import SuperAdminDashboard from "./ui/SuperAdminDashboard";
import AdminDashboard from "./ui/AdminDashboard";
import ServiceAdvisorDashboard from "./ui/ServiceAdvisorDashboard";
import MechanicDashboard from "./ui/MechanicDashboard";
import HRManagerDashboard from "./components/HRManagerDashboard";
import InventoryManagerDashboard from "./ui/InventoryManagerDashboard";
import { DashboardProvider } from "./context/DashboardContext";
import { NotificationsProvider } from "./context/NotificationsContext";
import { MechanicProvider } from "./context/MechanicContext";

export default function App() {
  return (
    <DashboardProvider>
      <NotificationsProvider>
        <MechanicProvider>
          <Routes>
            {/* Login */}
            <Route path="/" element={<AuthLayout />} />

            {/* Support */}
            <Route path="/contact-support" element={<ContactSupport />} />

            {/* Super Admin */}
            <Route path="/super-admin/*" element={<SuperAdminDashboard />} />

            {/* Admin */}
            <Route path="/admin/*" element={<AdminDashboard />} />

            {/* Service-Advisor */}
            <Route path="/service-advisor/*" element={<ServiceAdvisorDashboard />} />

            {/* Mechanic */}
            <Route path="/mechanic/*" element={<MechanicDashboard />} />

            {/* HR Manager */}
            <Route path="/hr/*" element={<HRManagerDashboard />} />

            {/*Inventory Manager*/}
            <Route path="/inventory-manager/*" element={<InventoryManagerDashboard />} />
          </Routes>
        </MechanicProvider>
      </NotificationsProvider>
    </DashboardProvider>
  );
}
