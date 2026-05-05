import { X, MessageCircle, FileText } from "lucide-react";

function QcReportModal({ job, onClose }) {
  const steps = ["Created", "In Service", "Quality Check", "Ready"];

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

    if (status === "QC") {
      return "QC";
    }

    return status;
  };

  const normalizedStatus = normalizeStatus(job.status);

  const currentIndex =
    normalizedStatus === "Booked"
      ? 0
      : normalizedStatus === "In_Progress"
      ? 1
      : normalizedStatus === "QC"
      ? 2
      : 3;

  const serviceCost = job.amount || 0;
  const parts = Math.round(serviceCost * 0.15);
  const tax = Math.round((serviceCost + parts) * 0.05);
  const total = serviceCost + parts + tax;

  const handleQc = () => {
    alert("QC Report Download Started ✅");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Blur */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-[780px] max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 bg-blue-50 border-b">
          <div>
            <h2 className="text-xl font-bold text-blue-900">
              Job Details
            </h2>
            <p className="text-sm text-gray-400">
              ID: {job.id}
            </p>
          </div>

          <X
            className="cursor-pointer"
            onClick={onClose}
          />
        </div>

        {/* Status */}
        <div className="flex items-center px-8 py-6">
          {steps.map((step, index) => {
            const done = index < currentIndex;
            const active = index === currentIndex;

            return (
              <div
                key={index}
                className="flex items-center w-full"
              >
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500
                    ${
                      done || active
                        ? "bg-green-500 border-green-500 text-white scale-110"
                        : "border-blue-300 text-blue-300"
                    }`}
                  >
                    {done ? "✓" : index + 1}
                  </div>

                  <p
                    className={`mt-2 text-sm ${
                      done || active
                        ? "text-green-600 font-semibold"
                        : "text-gray-400"
                    }`}
                  >
                    {step}
                  </p>
                </div>

                {index !== 3 && (
                  <div className="flex-1 h-[4px] bg-blue-200 mx-2 rounded overflow-hidden">
                    <div
                      className={`h-full bg-green-500 origin-left transition-transform duration-700
                      ${
                        index < currentIndex
                          ? "scale-x-100"
                          : "scale-x-0"
                      }`}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Body */}
        <div className="px-8 pb-8 grid grid-cols-2 gap-6">
          
          {/* Left */}
          <div className="space-y-4">
            <div className="bg-blue-50 p-5 rounded-xl">
              <h3 className="text-blue-900 font-semibold mb-2">
                Service Info
              </h3>
              <p className="text-gray-500">
                Service: {job.services}
              </p>
              <p className="text-gray-500">
                Customer: {job.customer}
              </p>
              <p className="text-gray-500">
                Date: {job.date}
              </p>
            </div>

            <div className="bg-blue-50 p-5 rounded-xl">
              <h3 className="text-blue-900 font-semibold mb-2">
                Vehicle Info
              </h3>
              <p className="text-gray-500">
                Model: {job.vehicle}
              </p>
              <p className="text-gray-500">
                Reg No: {job.carNumber}
              </p>
            </div>

            <div className="bg-blue-50 p-5 rounded-xl">
              <h3 className="text-blue-900 font-semibold mb-2">
                Technician
              </h3>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center font-bold text-blue-700">
                  {job.mechanic?.[0]}
                </div>

                <div>
                  <p className="font-semibold text-gray-700">
                    {job.mechanic}
                  </p>
                  <p className="text-xs text-gray-400">
                    Master Mechanic
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div>
            <h3 className="text-blue-900 font-semibold mb-4">
              Service Breakdown
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-500">
                <p>Service Cost</p>
                <p>₹{serviceCost}</p>
              </div>

              <div className="flex justify-between text-gray-500">
                <p>Parts & Oil</p>
                <p>₹{parts}</p>
              </div>

              <div className="flex justify-between text-gray-500 border-b pb-3">
                <p>Taxes</p>
                <p>₹{tax}</p>
              </div>

              <div className="flex justify-between text-blue-600 font-bold text-lg pt-2">
                <p>Total</p>
                <p>₹{total}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t px-6 py-4 flex justify-end gap-4 bg-gray-50 sticky bottom-0">
          <button className="flex items-center gap-2 border px-5 py-2 rounded-xl">
            <MessageCircle size={18} />
            Chat
          </button>

          <button
            onClick={handleQc}
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-xl"
          >
            <FileText size={18} />
            QC Report
          </button>
        </div>
      </div>
    </div>
  );
}

export default QcReportModal;