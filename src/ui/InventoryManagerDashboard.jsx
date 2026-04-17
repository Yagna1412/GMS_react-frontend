import React, { useState } from "react";
import { InventoryProvider } from "../context/InventoryContext";
import InventoryErrorBoundary from "../components/inventory/shared/InventoryErrorBoundary";
import { Toaster } from "sonner";
import {
  LayoutDashboard,
  Package,
  BarChart3,
  ShoppingCart,
  Users,
  FileBarChart,
  LogOut,
  Search,
  Bell,
  Menu,
  X,
} from "lucide-react";

import InventoryDashboard from "../components/inventory/InventoryDashboard";
import InventoryItems from "../components/inventory/InventoryItems";
import StockManagement from "../components/inventory/StockManagement";
import PurchaseOrders from "../components/inventory/PurchaseOrders";
import VendorManagement from "../components/inventory/VendorManagement";
import ValuationReports from "../components/inventory/ValuationReports";


function DashboardContent({ onLogout }) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifications] = useState(14);
  const [globalSearchQuery, setGlobalSearchQuery] = useState("");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <InventoryDashboard onNavigate={setActiveTab} searchQuery={globalSearchQuery} />;
      case "items":
        return <InventoryItems searchQuery={globalSearchQuery} />;
      case "stock":
        return <StockManagement searchQuery={globalSearchQuery} />;
      case "purchase-orders":
        return <PurchaseOrders searchQuery={globalSearchQuery} />;
      case "vendors":
        return <VendorManagement searchQuery={globalSearchQuery} />;
      case "reports":
        return <ValuationReports searchQuery={globalSearchQuery} />;
      default:
        return <InventoryDashboard />;
    }
  };

  const menuItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "items", icon: Package, label: "Items" },
    { id: "stock", icon: BarChart3, label: "Stock" },
    { id: "purchase-orders", icon: ShoppingCart, label: "Orders" },
    { id: "vendors", icon: Users, label: "Vendors" },
    { id: "reports", icon: FileBarChart, label: "Reports" },
  ];

  return (
    <div className="flex h-screen bg-[var(--background)] overflow-hidden">
      {/* ================= MOBILE OVERLAY ================= */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          fixed lg:static
          z-50
          w-64
          bg-[var(--sidebar-background,#E0ECFF)]
          border-r
          border-[var(--card-border,#BFDBFE)]
          h-full
          flex flex-col
          transform
          transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="p-6 border-b border-[var(--card-border,#BFDBFE)]">
          <div className="font-bold text-lg text-[var(--sidebar-text,#1E3A8A)]">Mantha Tech</div>
          <div className="text-xs text-[var(--muted-text,#64748B)]">Inventory Management</div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition
                ${
                  isActive
                    ? "bg-[var(--active-menu,#2563EB)] text-white"
                    : "text-[var(--sidebar-text,#1E3A8A)] hover:bg-[var(--accent-blue,#3B82F6)/10] hover:text-[var(--active-menu,#2563EB)]"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="m-3 flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-[var(--card-border,#BFDBFE)] rounded-lg"
        >
          <LogOut size={16} />
          Logout
        </button>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 flex flex-col w-0">

        {/* HEADER */}
        <header className="bg-[var(--cards,#FFFFFF)] border-b border-[var(--card-border,#BFDBFE)] px-4 sm:px-6 py-3 flex items-center justify-between">

          {/* Left Section */}
          <div className="flex items-center gap-3 w-full max-w-xl">
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-md hover:bg-[var(--card-border,#BFDBFE)]"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>

            {/* Search */}
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-text,#64748B)]"
              />
              <input
                type="text"
                value={globalSearchQuery}
                onChange={(e) => setGlobalSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full pl-9 pr-4 py-2 bg-[var(--background,#EFF6FF)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue,#3B82F6)]"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4 relative">
            <button className="relative p-2 rounded-md hover:bg-[var(--card-border,#BFDBFE)]">
              <Bell size={20} />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {notifications}
                </span>
              )}
            </button>

            {/* Profile */}
            <div className="relative">
              <div
                onClick={() => setProfileOpen(!profileOpen)}
                className="cursor-pointer flex items-center gap-2"
              >
                <div className="w-8 h-8 bg-[var(--active-menu,#2563EB)] text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  IM
                </div>
              </div>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-[var(--cards,#FFFFFF)] border border-[var(--card-border,#BFDBFE)] rounded-lg shadow-lg">
                  <button
                    onClick={onLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-[var(--card-border,#BFDBFE)]"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <InventoryErrorBoundary>
            {renderContent()}
          </InventoryErrorBoundary>
        </main>

        <Toaster position="top-right" richColors />
      </div>
    </div>
  );
}

import { useNavigate } from "react-router-dom";

export default function InventoryManagerDashboard() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <InventoryProvider>
      <DashboardContent onLogout={handleLogout} />
    </InventoryProvider>
  );
}
