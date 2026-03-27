import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Calendar,
  Activity,
  AlertCircle,
  GraduationCap,
  IndianRupee,
  Power,
  Search,
  Bell,
  PersonStanding,
  Wrench,
  FileText,
  MessageSquare,
  CreditCard,
} from "lucide-react";
import { Toaster } from "sonner";
import GrievanceExit from "./hr/GrivanceExit";


/*IMPORT REAL PAGES */
import HRDashboardHome from "../components/hr/HRDashboardHome";
import EmployeeMaster from "../components/hr/EmployeeMaster";
import Attendance from "../components/hr/Attendance";
import LeaveManagement from "../components/hr/LeaveManagement";
import PerformanceManagement from "../components/hr/PerformanceManagement";
import RelievingEmployee from "../components/hr/RelievingEmployee";
import PayrollManagement from "../components/hr/PayrollManagement";
import TrainingDevelopment from "../components/hr/TrainingDevelopment";

/*  TEMP PLACEHOLDERS (UNCHANGED)  */

const HRManagerDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  /* SHARED DATA (SOURCE) */

  const [leaves, setLeaves] = useState([
    { id: 1, name: "Rajesh Kumar", status: "Pending" },
    { id: 2, name: "Amit Verma", status: "Pending" },
  ]);

  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Rajesh Kumar",
      empId: "EMP/MUM/2024/0001",
      cycle: "Q4 2024",
      date: "2024-12-15",
      score: 4.6,
      reviewer: "Amit Sharma",
      status: "Completed",
    },
    {
      id: 2,
      name: "Priya Singh",
      empId: "EMP/MUM/2024/0002",
      cycle: "Q4 2024",
      date: "2024-12-16",
      score: 4.4,
      reviewer: "Sunita Patel",
      status: "Completed",
    },
    {
      id: 3,
      name: "Neha Desai",
      empId: "EMP/MUM/2024/0003",
      cycle: "Q4 2024",
      date: "Not scheduled",
      score: null,
      reviewer: "Sunita Patel",
      status: "Pending",
    },
  ]);

  const [grievances, setGrievances] = useState([]);

  const addGrievance = (grv) => {
    const newGrv = {
      id: `G-${Date.now()}`,
      empId: grv.empId || "",
      empName: grv.empName || "",
      category: grv.category || "Other",
      severity: grv.severity || "Low",
      description: grv.description || "",
      filedOn: new Date().toLocaleDateString(),
      status: "Pending",
      sla: grv.sla || "7",
      daysElapsed: 0,
    };
    setGrievances((prev) => [newGrv, ...prev]);
  };

  const updateGrievance = (id, updates) => {
    setGrievances((prev) => prev.map((g) => (g.id === id ? { ...g, ...updates } : g)));
  };

  /* PAGE RENDERING */
  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <HRDashboardHome
            onNavigate={setActiveTab}
            leaves={leaves}
            reviews={reviews}
          />
        );

      case "employees":
        return <EmployeeMaster />;

      case "attendance":
        return <Attendance />;

      case "leaves":
        return (
          <LeaveManagement
            leaves={leaves}
            setLeaves={setLeaves}
          />
        );

      case "performance":
        return (
          <PerformanceManagement
            onNavigate={setActiveTab}
            reviews={reviews}
            setReviews={setReviews}
          />
        );

      case "payroll":
        return <PayrollManagement />;

      case "training":
        return <TrainingDevelopment />;

      case "grievance":
        return <GrievanceExit />;

      case "relieving":
        return <RelievingEmployee />;

      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-[#F5F7FB] overflow-hidden">
      {/*  SIDEBAR (TRULY STATIC) */}
      <aside className="w-72 bg-[#f8faff] border-r border-[#e2e8f0] flex flex-col flex-shrink-0 h-full">
        {/* Brand */}
        <div className="px-6 py-8 border-b border-[#e2e8f0]/50">
          <div className="flex items-center gap-4 px-2">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#2563EB] flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <Wrench size={26} className="text-white fill-current" />
            </div>
            <div>
              <h1 className="font-bold text-[#1e293b] text-xl leading-tight whitespace-nowrap">Mantha Tech</h1>
              <p className="text-sm font-medium text-[#64748b] whitespace-nowrap">HR Management</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-6 scrollbar-thin scrollbar-thumb-gray-200">
          <nav className="space-y-1.5">
            {[
              ["dashboard", "Dashboard", LayoutDashboard],
              ["employees", "Customers", Users],
              ["attendance", "Appointments", Calendar],
              ["leaves", "Job Cards", ClipboardList],
              ["performance", "Estimations", FileText],
              ["payroll", "Job Tracking", Activity],
              ["training", "Communication", MessageSquare],
              ["grievance", "Billing & Delivery", CreditCard],
            ].map(([id, label, Icon]) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl transition-all duration-200 group
                  ${activeTab === id
                    ? "bg-[#2563EB] text-white shadow-lg shadow-blue-500/30 font-semibold"
                    : "text-[#64748b] hover:bg-[#EBF2FF] hover:text-[#2563EB]"
                  }`}
              >
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                  <Icon 
                    size={22} 
                    className={`${activeTab === id ? "text-white" : "text-[#64748b] group-hover:text-[#2563EB]"}`} 
                  />
                </div>
                <span className="text-[15px] whitespace-nowrap">{label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Logout */}
        <div className="px-4 py-8 mt-auto border-t border-[#e2e8f0]/50 bg-white/10">
          <button className="w-full flex items-center gap-4 px-6 py-4 rounded-xl text-[#64748b] hover:bg-red-50 hover:text-red-600 transition-colors duration-200 font-semibold group">
            <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
              <Power size={22} className="group-hover:text-red-600" />
            </div>
            <span className="text-[15px] whitespace-nowrap">Logout</span>
          </button>
        </div>
      </aside>

      {/*  MAIN  */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-100 px-4 sm:px-6 lg:px-8 flex items-center justify-between z-30">
          {/* Search */}
          <div className="relative w-[400px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              className="w-full pl-10 pr-3 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Search..."
            />
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-6">
            <div className="relative">
              <Bell size={22} />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">0</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold flex items-center justify-center">HR</div>
              <div className="leading-tight">
                <p className="font-semibold text-sm">HR Manager</p>
                <p className="text-xs text-gray-400">Human Resources</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default HRManagerDashboard;
