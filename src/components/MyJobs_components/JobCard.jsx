import { useNavigate } from "react-router-dom";
import { Wrench, ChevronRight } from "lucide-react";

function JobCard({ job }) {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/job/${job.id}`);
  };

  // STATUS COLORS
  const statusColor =
    job.status === "Booked"
      ? "bg-blue-100 text-blue-600"
      : job.status === "In Progress"
      ? "bg-yellow-100 text-yellow-600"
      : "bg-green-100 text-green-600";

  return (
    <div
      onClick={handleClick}
      className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md cursor-pointer transition"
    >

      {/* TOP SECTION */}
      <div className="flex justify-between items-center">

        <div className="flex gap-4 items-center">

          {/* ICON */}
          <div className="w-12 h-12 bg-yellow-100 flex items-center justify-center rounded-lg text-yellow-600">
            <Wrench size={22} />
          </div>

          <div>

            {/* TITLE + STATUS */}
            <div className="flex items-center gap-3">

              <h2 className="font-semibold text-lg">
                {job.title}
              </h2>

              <span className={`text-xs px-3 py-1 rounded-full ${statusColor}`}>
                {job.status}
              </span>

            </div>

            {/* DATE + LOCATION */}
            <p className="text-gray-500 text-sm mt-1">
              {job.date} • {job.location}
            </p>

          </div>

        </div>

      </div>

      {/* DIVIDER */}
      <div className="border-t my-4"></div>

      {/* BOTTOM SECTION */}
      <div className="flex justify-between items-center">

        <div>

          <p className="text-gray-400 text-sm">
            Total Amount
          </p>

          <p className="text-lg font-bold text-blue-600">
            ₹{job.amount}
          </p>

        </div>

        <ChevronRight size={20} className="text-gray-400" />

      </div>

    </div>
  );
}

export default JobCard;