

import { useState } from "react";
import {
  CheckCircle,
  XCircle,
  Clock,
  Download,
  AlertTriangle,
  X
} from "lucide-react";

/*INITIAL LEAVE DATA  */
const initialLeaves = [
  {
    id: 1,
    name: "Rajesh Kumar",
    empId: "EMP/MUM/2024/0001",
    type: "Casual Leave",
    from: "2024-12-23",
    to: "2024-12-24",
    days: 2,
    reason: "Personal work",
    status: "Pending",
  },
  {
    id: 2,
    name: "Amit Verma",
    empId: "EMP/DEL/2024/0001",
    type: "Earned Leave",
    from: "2024-12-25",
    to: "2024-12-28",
    days: 4,
    reason: "Family vacation",
    status: "Pending",
  },
];

/* STATUS STYLES  */
const statusStyles = {
  Pending: "bg-yellow-100 text-yellow-700",
  Approved: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
};

const LeaveManagement = () => {
  // Main collection of all employee leave requests
  const [leaves, setLeaves] = useState(initialLeaves);
  // Controls the current active filter for the table (Pending, Approved, Rejected, All)
  const [filter, setFilter] = useState("Pending");

  // State to manage the confirmation modal when taking action on a leave request
  const [actionModal, setActionModal] = useState({ isOpen: false, type: null, id: null, employee: null });

  /* COUNTS - Calculate KPIs for the dashboard cards */
  const pendingCount = leaves.filter(l => l.status === "Pending").length;
  const approvedCount = leaves.filter(l => l.status === "Approved").length;
  const rejectedCount = leaves.filter(l => l.status === "Rejected").length;

  /*  ACTIONS  */
  // Opens the confirmation modal and temporarily stores the action type (Approve/Reject)
  const handleActionClick = (id, type) => {
    const employee = leaves.find(l => l.id === id);
    setActionModal({ isOpen: true, type, id, employee });
  };

  // Executes the final status change based on the user's confirmation in the modal
  const confirmAction = () => {
    if (!actionModal.id || !actionModal.type) return;

    setLeaves(prev =>
      prev.map(l =>
        l.id === actionModal.id ? { ...l, status: actionModal.type } : l
      )
    );
    // Reset modal state after completion
    setActionModal({ isOpen: false, type: null, id: null, employee: null });
  };

  /* EXPORT - Generates a downloadable CSV containing the current state of all leave requests */
  const exportReport = () => {
    const header = "Employee,Leave Type,From,To,Days,Reason,Status\n";
    const rows = leaves
      .map(
        l =>
          `${l.name},${l.type},${l.from},${l.to},${l.days},${l.reason},${l.status}`
      )
      .join("\n");

    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "leave-report.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const filteredLeaves =
    filter === "All"
      ? leaves
      : leaves.filter(l => l.status === filter);

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-8 pb-10 w-full max-w-[100vw] overflow-x-hidden">

      {/*  HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-black tracking-tight">Leave Management</h1>
          <p className="text-sm sm:text-base text-gray-500">
            Approve and manage employee leave requests
          </p>
        </div>

        <button
          onClick={exportReport}
          className="w-full sm:w-auto bg-blue-600 text-white px-5 py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm sm:text-base font-semibold hover:bg-blue-700 transition"
        >
          <Download size={18} />
          Export Report
        </button>
      </div>

      {/*  KPI CARDS  */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 sm:mb-8">
        <div className="bg-white border rounded-xl p-4 sm:p-5 flex flex-col justify-between shadow-sm">
          <Clock className="text-yellow-600 w-6 h-6 sm:w-8 sm:h-8" />
          <div className="mt-4">
            <h2 className="text-2xl sm:text-3xl font-bold">{pendingCount}</h2>
            <p className="text-sm sm:text-base text-gray-600 mt-1">Pending</p>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-4 sm:p-5 flex flex-col justify-between shadow-sm">
          <CheckCircle className="text-green-600 w-6 h-6 sm:w-8 sm:h-8" />
          <div className="mt-4">
            <h2 className="text-2xl sm:text-3xl font-bold">{approvedCount}</h2>
            <p className="text-sm sm:text-base text-gray-600 mt-1">Approved</p>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-4 sm:p-5 flex flex-col justify-between shadow-sm">
          <XCircle className="text-red-600 w-6 h-6 sm:w-8 sm:h-8" />
          <div className="mt-4">
            <h2 className="text-2xl sm:text-3xl font-bold">{rejectedCount}</h2>
            <p className="text-sm sm:text-base text-gray-600 mt-1">Rejected</p>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-4 sm:p-5 flex flex-col justify-between shadow-sm">
          <div className="h-6 w-6 sm:h-8 sm:w-8" /> {/* Placeholder for alignment */}
          <div className="mt-4">
            <h2 className="text-2xl sm:text-3xl font-bold">{leaves.length}</h2>
            <p className="text-sm sm:text-base text-gray-600 mt-1">Total Requests</p>
          </div>
        </div>
      </div>

      {/*  FILTER  */}
      <div className="bg-white border rounded-xl p-3 sm:p-4 mb-6 sm:mb-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <span className="text-sm font-medium text-gray-700 w-full sm:w-auto">Filter by Status:</span>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full sm:w-auto border border-gray-300 px-4 py-2 rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
            <option>All</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded-xl overflow-x-auto shadow-sm max-w-full">
        <table className="w-full min-w-[900px] text-sm md:text-base">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left">EMPLOYEE</th>
              <th className="px-6 py-4 text-left">LEAVE TYPE</th>
              <th className="px-6 py-4">FROM</th>
              <th className="px-6 py-4">TO</th>
              <th className="px-6 py-4">DAYS</th>
              <th className="px-6 py-4 text-left">REASON</th>
              <th className="px-6 py-4">STATUS</th>
              <th className="px-6 py-4">ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {filteredLeaves.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                  No leave requests found for this status.
                </td>
              </tr>
            ) : null}
            {filteredLeaves.map(l => (
              <tr key={l.id} className="border-b last:border-b-0 border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="px-4 sm:px-6 py-4">
                  <p className="font-semibold text-black">{l.name}</p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">{l.empId}</p>
                </td>

                <td className="px-4 sm:px-6 py-4 font-medium text-gray-700">{l.type}</td>
                <td className="px-4 sm:px-6 py-4 text-center text-gray-600 whitespace-nowrap">{l.from}</td>
                <td className="px-4 sm:px-6 py-4 text-center text-gray-600 whitespace-nowrap">{l.to}</td>
                <td className="px-4 sm:px-6 py-4 text-center font-medium">{l.days}</td>
                <td className="px-4 sm:px-6 py-4 text-gray-600 max-w-[200px] truncate" title={l.reason}>{l.reason}</td>

                <td className="px-4 sm:px-6 py-4 text-center">
                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap ${statusStyles[l.status]}`}
                  >
                    {l.status}
                  </span>
                </td>

                <td className="px-4 sm:px-6 py-4 text-center">
                  {l.status === "Pending" && (
                    <div className="flex justify-center gap-2 sm:gap-3">
                      <button
                        onClick={() => handleActionClick(l.id, "Approved")}
                        className="bg-green-100 hover:bg-green-200 text-green-700 p-2 rounded-lg transition-colors cursor-pointer"
                        title="Approve"
                      >
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>

                      <button
                        onClick={() => handleActionClick(l.id, "Rejected")}
                        className="bg-red-100 hover:bg-red-200 text-red-700 p-2 rounded-lg transition-colors cursor-pointer"
                        title="Reject"
                      >
                        <XCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CONFIRMATION MODAL */}
      {actionModal.isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setActionModal({ isOpen: false, type: null, id: null, employee: null })}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center text-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${actionModal.type === "Approved" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                  }`}
              >
                <AlertTriangle className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Confirm {actionModal.type === "Approved" ? "Approval" : "Rejection"}
              </h3>

              <p className="text-gray-600 mb-6">
                Are you sure you want to {actionModal.type === "Approved" ? "approve" : "reject"} the leave request for <span className="font-semibold text-gray-900">{actionModal.employee?.name}</span>?
              </p>

              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setActionModal({ isOpen: false, type: null, id: null, employee: null })}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmAction}
                  className={`flex-1 px-4 py-2 text-white rounded-lg font-medium transition-colors ${actionModal.type === "Approved"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                    }`}
                >
                  Yes, {actionModal.type}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveManagement;
