// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import AuthLayout from "./components/AuthLayout";
// import ContactSupport from "./pages/ContactSupport";
// import SuperAdminDashboard from "./ui/SuperAdminDashboard";
// import { DashboardProvider } from "./context/DashboardContext";

// export default function App() {
//   return (
//     <DashboardProvider>
//       <Routes>
//         <Route path="/" element={<AuthLayout />} />
//         <Route path="/contact-support" element={<ContactSupport />} />
//         <Route path="/super-admin" element={<SuperAdminDashboard />} />
//       </Routes>
//     </DashboardProvider>
//   );
// }

import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthLayout from "./components/AuthLayout";
import ContactSupport from "./pages/ContactSupport";
import SuperAdminDashboard from "./ui/SuperAdminDashboard";
import AdminDashboard from "./ui/AdminDashboard";
import { DashboardProvider } from "./context/DashboardContext";
import { NotificationsProvider } from "./context/NotificationsContext";

export default function App() {
  return (
    <DashboardProvider>
      <NotificationsProvider>
      <Routes>

        {/* Login */}
        <Route path="/" element={<AuthLayout />} />

        {/* Support */}
        <Route path="/contact-support" element={<ContactSupport />} />

        {/* Super Admin */}
        <Route path="/super-admin/*" element={<SuperAdminDashboard />} />

        {/* Admin */}
        <Route path="/admin/*" element={<AdminDashboard />} />

      </Routes>
      </NotificationsProvider>
    </DashboardProvider>
  );
}
