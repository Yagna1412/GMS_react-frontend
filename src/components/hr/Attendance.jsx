import { useState } from "react";
import {
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Edit,
  Download,
  Calendar,
  X,
} from "lucide-react";

/* INITIAL ATTENDANCE DATA*/
const todayDate = new Date().toISOString().split("T")[0];
const yesterdayDate = new Date(Date.now() - 86400000).toISOString().split("T")[0];

const initialAttendance = [
  {
    id: 1,
    initials: "RK",
    name: "Rajesh Kumar",
    checkIn: "09:15 AM",
    checkOut: "06:10 PM",
    status: "Present",
    overtime: "00:30",
    date: todayDate,
  },
  {
    id: 2,
    initials: "PS",
    name: "Priya Singh",
    checkIn: "09:45 AM",
    checkOut: "06:00 PM",
    status: "Late",
    overtime: "00:00",
    date: todayDate,
  },
  {
    id: 3,
    initials: "AV",
    name: "Amit Verma",
    checkIn: "-",
    checkOut: "-",
    status: "Absent",
    overtime: "00:00",
    date: todayDate,
  },
  {
    id: 4,
    initials: "ND",
    name: "Neha Desai",
    checkIn: "-",
    checkOut: "-",
    status: "Present",
    overtime: "00:00",
    date: yesterdayDate,
  },
  {
    id: 5,
    initials: "VM",
    name: "Vikram Malhotra",
    checkIn: "-",
    checkOut: "-",
    status: "Present",
    overtime: "00:30",
    date: yesterdayDate,
  },
];

/*STATUS STYLES*/
const statusStyle = {
  Present: "bg-green-100 text-green-700",
  Late: "bg-yellow-100 text-yellow-700",
  Absent: "bg-red-100 text-red-700",
};

/* VIEW MODAL - Displays detailed but read-only information about a specific employee's attendance */
const ViewModal = ({ employee, onClose }) => {
  if (!employee) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-md rounded-xl p-6 relative max-h-[90vh] overflow-y-auto">
        <button className="absolute top-4 right-4 p-1" onClick={onClose}>
          <X />
        </button>

        <h2 className="text-lg font-bold mb-4">Attendance Details</h2>

        <div className="space-y-2 text-sm">
          <p><b>Name:</b> {employee.name}</p>
          <p><b>Check In:</b> {employee.checkIn}</p>
          <p><b>Check Out:</b> {employee.checkOut}</p>
          <p><b>Status:</b> {employee.status}</p>
          <p><b>Overtime:</b> {employee.overtime}</p>
        </div>
      </div>
    </div>
  );
};

/* EDIT MODAL - Allows modifying an existing attendance record (Check in/out, Status, Overtime) */
const EditModal = ({ employee, onSave, onClose }) => {
  // Initialize local form state with the passed employee data
  const [form, setForm] = useState({ ...employee });

  // Function to quickly set the date field to standard preset offsets (e.g. today=0, yesterday=-1)
  const handleDatePreset = (daysOffset) => {
    const date = new Date(Date.now() + daysOffset * 86400000);
    setForm({ ...form, date: date.toISOString().split("T")[0] });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-md rounded-xl p-6 relative max-h-[90vh] overflow-y-auto">
        <button className="absolute top-4 right-4 p-1" onClick={onClose}>
          <X />
        </button>

        <h2 className="text-lg font-bold mb-4">Edit Attendance</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <div className="flex gap-2 mb-2">
              <button
                type="button"
                className={`px-3 py-1 text-sm rounded-md border ${form.date === todayDate
                  ? "bg-blue-50 border-blue-200 text-blue-700"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                onClick={() => handleDatePreset(0)}
              >
                Today
              </button>
              <button
                type="button"
                className={`px-3 py-1 text-sm rounded-md border ${form.date === yesterdayDate
                  ? "bg-blue-50 border-blue-200 text-blue-700"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                onClick={() => handleDatePreset(-1)}
              >
                Yesterday
              </button>
            </div>
            <input
              type="date"
              className="border rounded-lg p-2 w-full"
              value={form.date || todayDate}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Check In</label>
            <input
              className="border rounded-lg p-2 w-full"
              value={form.checkIn}
              onChange={(e) => setForm({ ...form, checkIn: e.target.value })}
              placeholder="Check In"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Check Out</label>
            <input
              className="border rounded-lg p-2 w-full"
              value={form.checkOut}
              onChange={(e) => setForm({ ...form, checkOut: e.target.value })}
              placeholder="Check Out"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              className="border rounded-lg p-2 w-full"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option>Present</option>
              <option>Late</option>
              <option>Absent</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Overtime</label>
            <input
              className="border rounded-lg p-2 w-full"
              value={form.overtime}
              onChange={(e) => setForm({ ...form, overtime: e.target.value })}
              placeholder="Overtime"
            />
          </div>
        </div>

        <button
          className="mt-5 w-full bg-blue-600 text-white py-2 rounded-lg"
          onClick={() => {
            onSave(form);
            onClose();
          }}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

/*   MAIN ATTENDANCE MANAGEMENT*/
const AttendanceManagement = () => {
  const [attendance, setAttendance] = useState(initialAttendance);
  const [viewEmp, setViewEmp] = useState(null);
  const [editEmp, setEditEmp] = useState(null);
  const [filterDate, setFilterDate] = useState(todayDate);

  const filteredAttendance = filterDate
    ? attendance.filter((emp) => emp.date === filterDate)
    : attendance;

  const total = filteredAttendance.length;
  const present = filteredAttendance.filter((e) => e.status === "Present").length;
  const absent = filteredAttendance.filter((e) => e.status === "Absent").length;
  const late = filteredAttendance.filter((e) => e.status === "Late").length;
  const attendancePercent = total ? Math.round((present / total) * 100) : 0;

  /* EXPORT CSV */
  const exportReport = () => {
    const rows = [
      ["Date", "Name", "Check In", "Check Out", "Status", "Overtime"],
      ...filteredAttendance.map((e) => [
        e.date,
        e.name,
        e.checkIn,
        e.checkOut,
        e.status,
        e.overtime,
      ]),
    ];

    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "attendance-report.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-8 pb-10 w-full max-w-[100vw] overflow-x-hidden">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Attendance Management</h1>
          <p className="text-sm sm:text-base text-gray-500">Track and manage employee attendance</p>
        </div>

        <button
          onClick={exportReport}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-lg flex items-center justify-center gap-2 w-full sm:w-auto text-sm md:text-base"
        >
          <Download size={16} />
          Export Report
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Stat title="Attendance %" value={`${attendancePercent}%`} sub="Today" />
        <Stat title="Present" value={present} sub="Employees" icon={<CheckCircle className="text-green-500" />} />
        <Stat title="Absent" value={absent} sub="Employees" icon={<XCircle className="text-red-500" />} />
        <Stat title="Late Arrivals" value={late} sub="Today" icon={<Clock className="text-orange-500" />} />
      </div>

      {/* DATE */}
      <div className="bg-white border rounded-xl p-3 md:p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Calendar className="text-gray-400 shrink-0" size={20} />
          <span className="text-sm sm:hidden text-gray-600 font-medium">Select Date:</span>
        </div>
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="border rounded-lg p-2 text-sm md:text-base w-full sm:w-auto focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl border overflow-x-auto max-w-full">
        <table className="w-full min-w-[800px] text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left">DATE</th>
              <th className="px-6 py-4 text-left">EMPLOYEE</th>
              <th className="px-6 py-4 text-left">CHECK IN</th>
              <th className="px-6 py-4 text-left">CHECK OUT</th>
              <th className="px-6 py-4 text-left">STATUS</th>
              <th className="px-6 py-4 text-left">OVERTIME</th>
              <th className="px-6 py-4 text-right">ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {filteredAttendance.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                  No attendance records found for this date.
                </td>
              </tr>
            ) : null}
            {filteredAttendance.map((emp) => (
              <tr key={emp.id} className="border-t">
                <td className="px-6 py-4 text-gray-600">{emp.date}</td>
                <td className="px-6 py-4 flex gap-3 items-center">
                  <div className="w-10 h-10 bg-indigo-500 text-white rounded-full flex items-center justify-center font-semibold">
                    {emp.initials}
                  </div>
                  {emp.name}
                </td>
                <td className="px-6 py-4">{emp.checkIn}</td>
                <td className="px-6 py-4">{emp.checkOut}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyle[emp.status]}`}>
                    {emp.status}
                  </span>
                </td>
                <td className="px-6 py-4">{emp.overtime}</td>
                <td className="px-6 py-4 flex justify-end gap-4">
                  <Eye className="cursor-pointer" onClick={() => setViewEmp(emp)} />
                  <Edit className="cursor-pointer" onClick={() => setEditEmp(emp)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODALS */}
      {viewEmp && <ViewModal employee={viewEmp} onClose={() => setViewEmp(null)} />}
      {editEmp && (
        <EditModal
          employee={editEmp}
          onClose={() => setEditEmp(null)}
          onSave={(updated) =>
            setAttendance((prev) =>
              prev.map((e) => (e.id === updated.id ? updated : e))
            )
          }
        />
      )}
    </div>
  );
};

/*   SMALL STAT CARD */
const Stat = ({ title, value, sub, icon }) => (
  <div className="bg-white border rounded-xl p-5 flex justify-between">
    <div>
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-2xl font-bold mt-1">{value}</h2>
      <p className="text-sm text-gray-500">{sub}</p>
    </div>
    {icon}
  </div>
);

export default AttendanceManagement;
