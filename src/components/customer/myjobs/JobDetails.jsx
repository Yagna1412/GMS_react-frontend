import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  CheckCircle,
  X,
  MessageSquare,
  FileText,
} from "lucide-react";

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const normalizeStatus = (status) => {
    if (
      status === "In Progress" ||
      status === "In_Progress" ||
      status === "IN_PROGRESS"
    )
      return "In_Progress";

    if (status === "Booked" || status === "BOOKED")
      return "Booked";

    if (status === "Completed" || status === "COMPLETED")
      return "Completed";

    if (status === "QC") return "QC";

    return status;
  };

  const fetchJobById = async (id) => {
    // const response = await fetch(`/api/jobs/${id}`);

    const response = await fetch(`http://localhost:8080/api/jobs/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  };

  useEffect(() => {
    const loadJob = async () => {
      try {
        const data = await fetchJobById(Number(id));

        setJob({
          ...data,
          status: normalizeStatus(data.status),
          services: data.services || "",
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadJob();
  }, [id]);

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  if (error) {
    return <div className="p-10 text-red-500">Error: {error}</div>;
  }

  if (!job) {
    return <div className="p-10">Job not found</div>;
  }

  const step =
    job.status === "Booked"
      ? 1
      : job.status === "In_Progress"
      ? 2
      : job.status === "QC"
      ? 3
      : 4;

  const steps = [
    "Created",
    "In Service",
    "Quality Check",
    "Ready",
  ];

  return (
    <div className="min-h-screen bg-black/40 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="bg-[#EFF6FF] px-8 py-7 border-b border-[#BFDBFE] flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-[#1E3A8A]">
              Job Details
            </h1>
            <p className="text-[#64748B] mt-2 text-lg">
              ID: J{job.id}
            </p>
          </div>

          <button onClick={() => navigate(-1)}>
            <X className="text-[#64748B]" size={28} />
          </button>
        </div>

        {/* Body */}
        <div className="px-8 py-8">
          
          {/* Progress Tracker */}
          <div className="flex justify-between mb-10">
            {steps.map((label, index) => {
              const active = step >= index + 1;

              return (
                <div
                  key={label}
                  className="flex flex-col items-center flex-1"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      active
                        ? "bg-green-500 text-white"
                        : "border-2 border-[#BFDBFE] text-[#94A3B8]"
                    }`}
                  >
                    {active && index < step - 1 ? (
                      <CheckCircle size={20} />
                    ) : (
                      index + 1
                    )}
                  </div>

                  <p
                    className={`mt-3 text-sm font-medium ${
                      active
                        ? "text-green-600"
                        : "text-[#64748B]"
                    }`}
                  >
                    {label}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Main Cards */}
          <div className="space-y-6">

            {/* Service Details */}
            <div className="bg-[#EFF6FF] rounded-3xl p-6">
              <h2 className="text-2xl font-semibold text-[#1E3A8A] mb-5">
                Service Details
              </h2>

              <p className="text-[#64748B] text-lg">
                Service: {job.services}
              </p>

              <p className="text-[#64748B] text-lg mt-3">
                Amount: ₹{job.amount}
              </p>

              <p className="text-[#64748B] text-lg mt-3">
                Customer: {job.customer}
              </p>

              <p className="text-[#64748B] text-lg mt-3">
                Date: {job.date}
              </p>
            </div>

            {/* Vehicle Info */}
            <div className="bg-[#EFF6FF] rounded-3xl p-6">
              <h2 className="text-2xl font-semibold text-[#1E3A8A] mb-5">
                Vehicle Info
              </h2>

              <p className="text-[#64748B] text-lg">
                Model: {job.vehicle}
              </p>

              <p className="text-[#64748B] text-lg mt-3">
                Reg No: {job.carNumber}
              </p>
            </div>

            {/* Technician */}
            <div className="bg-[#EFF6FF] rounded-3xl p-6">
              <h2 className="text-2xl font-semibold text-[#1E3A8A] mb-5">
                Technician
              </h2>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#DBEAFE] text-[#2563EB] flex items-center justify-center text-2xl font-bold">
                  {job.mechanic?.charAt(0)}
                </div>

                <div>
                  <p className="font-semibold text-lg text-[#1E3A8A]">
                    {job.mechanic}
                  </p>

                  <p className="text-[#64748B]">
                    Master Mechanic
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#EFF6FF] border-t border-[#BFDBFE] px-8 py-5 flex justify-end gap-4">
          <button className="border border-[#BFDBFE] px-6 py-3 rounded-xl text-[#1E3A8A] flex items-center gap-2 hover:bg-white">
            <MessageSquare size={18} />
            Chat with Advisor
          </button>

          <button className="bg-[#2563EB] text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-[#1D4ED8]">
            <FileText size={18} />
            View QC Report
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;