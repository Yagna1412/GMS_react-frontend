import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Header from "../components/admin/Header";
import Sidebar from "../components/admin/Sidebar";

import BranchManagement from "../pages/admin/BranchManagement";
import EmployeeManagement from "../pages/admin/EmployeeManagement";
import CustomerAppointments from "../pages/admin/CustomerAppointments";
import ServiceJobCards from "../pages/admin/ServiceJobCards";
import InventoryParts from "../pages/admin/InventoryParts";
import FinanceAndBilling from "../pages/admin/FinanceAndBilling";
import ReportingAnalytics from "../pages/admin/ReportingAnalytics";
import SecurityControl from "../pages/admin/SecurityControl";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#EFF6FF] overflow-hidden">

      {/* Sidebar */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Main */}
      <div className="flex flex-col flex-1 overflow-hidden">

        {/* Header */}
        <Header onMenuClick={() => setSidebarOpen(true)} />

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <Routes>
            <Route path="/" element={<BranchManagement />} />
            <Route path="branches" element={<BranchManagement />} />
            <Route path="employees" element={<EmployeeManagement />} />
            <Route path="customers" element={<CustomerAppointments />} />
            <Route path="jobs" element={<ServiceJobCards />} />
            <Route path="inventory" element={<InventoryParts />} />
            <Route path="finance" element={<FinanceAndBilling />} />
            <Route path="reports" element={<ReportingAnalytics />} />
            <Route path="security" element={<SecurityControl />} />
          </Routes>
        </div>

      </div>
    </div>
  );
}