import { NavLink } from "react-router-dom";
import {LayoutDashboard,
  CalendarCheck,
  Wrench,
  FileText,
  MessageSquare,
  User,
  BarChart2,
  LogOut,
  CarIcon
} from "lucide-react";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/bookservice", label: "Book Service", icon: CalendarCheck },
  { to: "/myjobs", label: "My Jobs", icon: Wrench },
  { to: "/invoice", label: "Invoices", icon: FileText },
  { to: "/feedback", label: "Feedback", icon: MessageSquare },
  { to: "/profile", label: "Profile", icon: User },
  { to: "/myvehicle", label: "MyVehicle", icon: CarIcon },
  { to: "/reports", label: "Reports", icon: BarChart2 },
];

export default function Sidebar() {
  return (
    <aside className="w-[240px] h-screen bg-[#E0ECFF] flex flex-col py-7 fixed top-0 left-0 border-r border-blue-200 z-50">

      {/* Logo */}
      <div className="flex items-center gap-3 px-6 mb-10">
        <div className="bg-blue-600 rounded-lg px-3 py-2 flex items-center justify-center shadow-lg">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            className="scale-x-[-1]"
          >
            <path
              d="M5 11L7.5 5.5C7.8 4.6 8.7 4 9.7 4h4.6c1 0 1.9.6 2.2 1.5L19 11"
              stroke="#fff"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <rect
              x="2"
              y="11"
              width="20"
              height="7"
              rx="2"
              fill="#fff"
              fillOpacity="0.2"
              stroke="#fff"
              strokeWidth="1.8"
            />
            <circle cx="7" cy="18" r="2" fill="#2563EB" stroke="#fff" strokeWidth="1.8" />
            <circle cx="17" cy="18" r="2" fill="#2563EB" stroke="#fff" strokeWidth="1.8" />
            <path
              d="M7.5 11l1.8-4.5h5.4L16.5 11"
              fill="#fff"
              fillOpacity="0.3"
              stroke="#fff"
              strokeWidth="1.2"
            />
          </svg>
        </div>

        <span className="text-blue-900 font-extrabold text-xl tracking-tight" >
          AutoFix
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 px-3 flex-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg text-[14.5px] font-semibold transition 
              ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-blue-900 hover:bg-blue-200"
              }`
            }
          >
            <Icon size={19} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Sign Out */}
      <div className="px-3">
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-[14.5px] font-semibold text-blue-900 hover:bg-red-100 hover:text-red-500 transition">
          <LogOut size={19} />
          Sign Out
        </button>
      </div>

    </aside>
  );
}