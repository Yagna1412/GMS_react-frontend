import { useState } from "react";
import jobsData from "../components/MyJobs_components/data/jobsData";
import QcReportModal from "../components/MyJobs_components/QcReportModal";
import {
  Wrench,
  ChevronRight,
  Search,
  SlidersHorizontal,
} from "lucide-react";

function MyJobs() {

  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [statusFilters, setStatusFilters] = useState([]);
  const [openJob, setOpenJob] = useState(null); // ⭐ MODAL STATE

  const getTotal = (services) => {
    const serviceTotal = services.reduce((sum, s) => sum + s.price, 0);
    const gst = Math.round(serviceTotal * 0.18);
    return serviceTotal + gst;
  };

  let filtered = jobsData
    .filter((job) =>
      activeTab === "All" ? true : job.status === activeTab
    )
    .filter((job) =>
      statusFilters.length === 0
        ? true
        : statusFilters.includes(job.status)
    )
    .filter((job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase()) ||
      job.status.toLowerCase().includes(search.toLowerCase())
    );

  const toggleStatus = (status) => {
    setStatusFilters((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">

      <h1 className="text-2xl font-bold mb-6">My Jobs</h1>

      {/* Tabs + Search */}
      <div className="flex items-center justify-between mb-6">

        <div className="flex gap-4">
          {["All", "Booked", "In Progress", "Completed"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full border ${
                activeTab === tab
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">

          <div className="flex items-center bg-white px-4 py-2 rounded-xl border w-[380px]">
            <Search size={18} className="text-gray-400" />
            <input
              placeholder="Search by Job ID or Service..."
              className="ml-2 outline-none w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="relative">
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border"
            >
              <SlidersHorizontal size={18} />
              Filter
            </button>

            {showFilter && (
              <div className="absolute right-0 top-12 bg-white shadow-xl border rounded-xl p-4 w-48 z-50">
                <p className="font-semibold mb-2">Status</p>

                {["Booked", "In Progress", "Completed"].map((s) => (
                  <label key={s} className="flex items-center gap-2 mb-2">
                    <input
                      type="checkbox"
                      checked={statusFilters.includes(s)}
                      onChange={() => toggleStatus(s)}
                    />
                    {s}
                  </label>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Cards */}
      <div className="space-y-4">

        {filtered.map((job) => {
          const total = getTotal(job.services);

          const bg =
            job.status === "Completed"
              ? "bg-green-100"
              : job.status === "In Progress"
              ? "bg-orange-100"
              : "bg-blue-100";

          const iconColor =
            job.status === "Completed"
              ? "text-green-600"
              : job.status === "In Progress"
              ? "text-orange-600"
              : "text-blue-600";

          const badge =
            job.status === "Completed"
              ? "bg-green-100 text-green-600"
              : job.status === "In Progress"
              ? "bg-orange-100 text-orange-600"
              : "bg-blue-100 text-blue-600";

          return (
            <div
              key={job.id}
              onClick={() => setOpenJob(job)}   // ⭐ MODAL OPEN
              className="bg-white border border-blue-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition flex justify-between items-center cursor-pointer"
            >

              <div className="flex items-center gap-4">

                <div className={`w-14 h-14 ${bg} rounded-xl flex items-center justify-center`}>
                  <Wrench className={`${iconColor}`} size={26} />
                </div>

                <div>
                  <h2 className="font-semibold text-lg flex items-center gap-3">
                    {job.title}
                    <span className={`px-3 py-1 text-xs rounded-full ${badge}`}>
                      {job.status}
                    </span>
                  </h2>

                  <p className="text-gray-500 text-sm">
                    {job.date} • {job.location}
                  </p>
                </div>

              </div>

              <div className="flex items-center gap-6">

                <div className="text-right">
                  <p className="text-gray-400 text-sm">Total Amount</p>
                  <p className="font-bold text-blue-600 text-lg">₹{total}</p>
                </div>

                <ChevronRight className="text-gray-300" size={26} />

              </div>

            </div>
          );
        })}

      </div>

      {/* ⭐ QC MODAL RENDER */}
      {openJob && (
        <QcReportModal
          job={openJob}
          onClose={() => setOpenJob(null)}
        />
      )}

    </div>
  );
}

export default MyJobs;