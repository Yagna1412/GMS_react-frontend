import { useState, useRef, useEffect } from "react";
import { Bell, Search, ChevronDown, User, Headphones, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { user, notifications } from "./data/mockData";

export default function Header() {
  const [showNotifs, setShowNotifs] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  const unread = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    function handleClickOutside(e) {
      if (notifRef.current && !notifRef.current.contains(e.target))
        setShowNotifs(false);
      if (profileRef.current && !profileRef.current.contains(e.target))
        setShowProfile(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex items-center justify-between gap-4 px-7 py-3 bg-white border-b border-blue-200 sticky top-0 z-50">

      {/* Search */}
      <div className="relative flex-1 max-w-[400px]">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

        <input
          placeholder="Search job cards, invoices..."
          className="w-full pl-9 pr-4 py-2 text-[13.5px] text-blue-900 border border-blue-200 rounded-lg bg-blue-50 outline-none focus:border-blue-500"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">

        {/* Notifications */}
        <div ref={notifRef} className="relative">
          <div
            onClick={() => {
              setShowNotifs(!showNotifs);
              setShowProfile(false);
            }}
            className="relative p-1.5 cursor-pointer"
          >
            <Bell size={20} className="text-blue-900" />

            {unread > 0 && (
              <span className="absolute top-[2px] right-[2px] bg-red-500 text-white text-[9px] font-bold w-[14px] h-[14px] flex items-center justify-center rounded-full border-2 border-white">
                {unread}
              </span>
            )}
          </div>

          {showNotifs && (
            <div className="absolute right-0 top-11 w-80 bg-white border border-blue-200 rounded-xl shadow-xl overflow-hidden z-50">

              <div className="flex items-center justify-between px-4 py-3 border-b border-blue-50">
                <span className="font-bold text-[15px] text-blue-900">
                  Notifications
                </span>

                <span className="bg-blue-600 text-white text-[11px] font-bold px-2 py-[2px] rounded-full">
                  {unread} new
                </span>
              </div>

              {notifications.map((n) => (
                <div
                  key={n.id}
                  className={`px-4 py-3 border-b border-blue-50 cursor-pointer hover:bg-blue-50 ${
                    n.read ? "bg-white" : "bg-blue-50"
                  }`}
                >
                  <div className="flex justify-between">
                    <span className="font-semibold text-[13px] text-blue-900">
                      {n.text}
                    </span>

                    <span className="text-[11px] text-slate-400 ml-2">
                      {n.time}
                    </span>
                  </div>

                  <div className="text-[11.5px] text-slate-500 mt-1">
                    {n.id === 1 ? "Promo" : n.id === 2 ? "Update" : "Reminder"}
                  </div>
                </div>
              ))}

              <div className="text-center px-4 py-3">
                <span className="text-[13px] text-blue-600 font-semibold cursor-pointer">
                  Mark all as read
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="w-[1px] h-7 bg-blue-200"></div>

        {/* Profile */}
        <div ref={profileRef} className="relative">

          <div
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifs(false);
            }}
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <div className="flex items-center justify-center w-9 h-9 text-white font-bold text-[13px] rounded-full bg-gradient-to-br from-orange-500 to-red-500 shadow-md">
              {user.initials}
            </div>

            <div className="leading-tight">
              <div className="font-bold text-[13px] text-blue-900">
                {user.name}
              </div>

              <div className="text-[11.5px] text-slate-500">
                {user.role} • {user.location}
              </div>
            </div>

            <ChevronDown
              size={14}
              className={`text-slate-500 transition-transform ${
                showProfile ? "rotate-180" : ""
              }`}
            />
          </div>

          {showProfile && (
            <div className="absolute right-0 top-12 w-52 bg-white border border-blue-200 rounded-xl shadow-xl overflow-hidden">

              {[
                { icon: User, label: "My Profile", color: "text-blue-900", path: "/profile" },
                { icon: Headphones, label: "Support", color: "text-blue-900", path: "/feedback" },
                { icon: LogOut, label: "Sign Out", color: "text-red-500", path: null },
              ].map(({ icon: Icon, label, color, path }) => (
                <div
                  key={label}
                  className={`flex items-center gap-2.5 px-4 py-3 cursor-pointer transition ${
                    label === "Sign Out"
                      ? "hover:bg-red-50"
                      : "hover:bg-blue-50 border-b border-blue-50"
                  }`}
                  onClick={() => {
                    if (path) {
                      navigate(path);
                      setShowProfile(false);
                    }
                  }}
                >
                  <Icon size={16} className={color} />
                  <span className={`text-[13.5px] font-semibold ${color}`}>
                    {label}
                  </span>
                </div>
              ))}

            </div>
          )}
        </div>
      </div>
    </header>
  );
}