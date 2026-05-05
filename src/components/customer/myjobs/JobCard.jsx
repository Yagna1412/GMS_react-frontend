import { Wrench, ChevronRight } from "lucide-react";

function JobCard({ job, onClick }) {
  const normalizeStatus = (status) => {
    if (
      status === "In Progress" ||
      status === "In_Progress" ||
      status === "IN_PROGRESS"
    ) {
      return "In_Progress";
    }

    if (status === "Booked" || status === "BOOKED") {
      return "Booked";
    }

    if (
      status === "Completed" ||
      status === "COMPLETED"
    ) {
      return "Completed";
    }

    return status;
  };

  const getStatusLabel = (status) => {
    const normalized = normalizeStatus(status);

    return normalized === "In_Progress"
      ? "In Progress"
      : normalized;
  };

  const normalizedStatus = normalizeStatus(job.status);

  const statusStyles = {
    Booked: {
      tag: "bg-[#DBEAFE] text-[#2563EB]",
      icon: "text-[#2563EB]",
      card: "bg-[#DBEAFE]",
    },
    In_Progress: {
      tag: "bg-[#FEF3C7] text-[#D97706]",
      icon: "text-[#D97706]",
      card: "bg-[#FEF3C7]",
    },
    Completed: {
      tag: "bg-[#D1FAE5] text-[#059669]",
      icon: "text-[#059669]",
      card: "bg-[#D1FAE5]",
    },
  };

  const style =
    statusStyles[normalizedStatus] ||
    statusStyles.Booked;

  return (
    <div
      key={job.id}
      onClick={onClick}
      className="bg-white border border-[#BFDBFE] p-5 rounded-2xl shadow-sm hover:shadow-md transition flex justify-between items-center cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-14 h-14 ${style.card} rounded-xl flex items-center justify-center`}
        >
          <Wrench className={style.icon} size={26} />
        </div>

        <div>
          <h2 className="font-semibold text-lg flex items-center gap-3 text-[#1E3A8A]">
            {job.services}

            <span
              className={`px-3 py-1 text-xs font-medium rounded-full ${style.tag}`}
            >
              {getStatusLabel(job.status)}
            </span>
          </h2>

          <p className="text-[#64748B] text-sm">
            {job.date} • {job.location}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-right">
          <p className="text-[#64748B] text-sm">
            Total Amount
          </p>

          <p className="font-bold text-[#1E3A8A] text-lg">
            ₹{job.amount}
          </p>
        </div>

        <ChevronRight
          className="text-[#64748B]"
          size={26}
        />
      </div>
    </div>
  );
}

export default JobCard;