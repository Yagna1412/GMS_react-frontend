// Mock data for HR Attendance Management
export const todayDate = new Date().toISOString().split("T")[0];
export const yesterdayDate = new Date(Date.now() - 86400000).toISOString().split("T")[0];

export const initialAttendance = [
  { id: 1, initials: "RK", name: "Rajesh Kumar", checkIn: "09:15 AM", checkOut: "06:10 PM", status: "Present", overtime: "00:30", date: todayDate },
  { id: 2, initials: "PS", name: "Priya Singh", checkIn: "09:45 AM", checkOut: "06:00 PM", status: "Late", overtime: "00:00", date: todayDate },
  { id: 3, initials: "AV", name: "Amit Verma", checkIn: "-", checkOut: "-", status: "Absent", overtime: "00:00", date: todayDate },
  { id: 4, initials: "ND", name: "Neha Desai", checkIn: "-", checkOut: "-", status: "Present", overtime: "00:00", date: yesterdayDate },
  { id: 5, initials: "VM", name: "Vikram Malhotra", checkIn: "-", checkOut: "-", status: "Present", overtime: "00:30", date: yesterdayDate },
];