import { useState, useEffect } from "react";
import JobCard from "../../components/customer/myjobs/JobCard";
import QcReportModal from "../../components/customer/myjobs/QcReportModal";
import { Search, SlidersHorizontal } from "lucide-react";

function MyJobs() {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [statusFilters, setStatusFilters] = useState([]);
  const [openJob, setOpenJob] = useState(null); 
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/jobs");
        if (res.ok) {
          const data = await res.json();
          setJobs(data);
        } else {
          console.error("Failed to fetch jobs");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const filtered = jobs
    .filter((job) =>
      activeTab === "All" ? true : job.status === activeTab
    )
    .filter((job) =>
      statusFilters.length === 0
        ? true
        : statusFilters.includes(job.status)
    )
    .filter((job) => {
      const s = search.toLowerCase();
      return (
        (job.title && job.title.toLowerCase().includes(s)) ||
        (job.services && job.services.toLowerCase().includes(s)) ||
        (job.location && job.location.toLowerCase().includes(s)) ||
        (job.status && job.status.toLowerCase().includes(s))
      );
    });

  const toggleStatus = (status) => {
    setStatusFilters((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-[#1E3A8A]">My Jobs</h1>

      {/* Tabs + Search */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div className="flex flex-wrap gap-4">
          {["All", "Booked", "In Progress", "Completed"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full border font-medium transition ${
                activeTab === tab
                  ? "bg-blue-600 text-white border-blue-600 shadow-md"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center bg-white px-4 py-2 rounded-xl border flex-grow md:w-[300px]">
            <Search size={18} className="text-gray-400" />
            <input
              placeholder="Search services..."
              className="ml-2 outline-none w-full bg-transparent"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="relative">
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border hover:bg-gray-50"
            >
              <SlidersHorizontal size={18} />
              Filter
            </button>

            {showFilter && (
              <div className="absolute right-0 top-12 bg-white shadow-xl border rounded-xl p-4 w-48 z-50">
                <p className="font-semibold mb-2">Status</p>
                {["Booked", "In Progress", "Completed"].map((s) => (
                  <label key={s} className="flex items-center gap-2 mb-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={statusFilters.includes(s)}
                      onChange={() => toggleStatus(s)}
                      className="rounded text-blue-600 focus:ring-blue-500"
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
      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading jobs...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-10 text-gray-500">No jobs found.</div>
      ) : (
        <div className="space-y-4">
          {filtered.map((job) => (
            <JobCard key={job.id} job={job} onClick={() => setOpenJob(job)} />
          ))}
        </div>
      )}

      {openJob && (
        <QcReportModal job={openJob} onClose={() => setOpenJob(null)} />
      )}
    </div>
  );
}

export default MyJobs;