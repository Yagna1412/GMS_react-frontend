import { useState } from "react";
import { initialAttendance, todayDate } from '../data/attendance';

const yesterdayDate = new Date(Date.now() - 86400000).toISOString().split("T")[0];

export function useAttendanceManagement() {
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

  return {
    attendance, setAttendance,
    viewEmp, setViewEmp,
    editEmp, setEditEmp,
    filterDate, setFilterDate,
    filteredAttendance,
    total, present, absent, late, attendancePercent,
    exportReport
  };
}
