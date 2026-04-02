export const user = {
  name: "Alex Johnson",
  role: "Customer",
  location: "Springfield",
  initials: "AJ",
  vehicle: { model: "Toyota Camry", plate: "ABC-1234" },
  loyaltyPoints: 1250,
  totalSpent: 400,
  upcomingAppointments: 1,
  activeJobs: 1,
};

export const serviceHistory = [
  { date: "2026-02-16", service: "General Service",  branch: "Downtown Service Center", amount: 150, status: "In Progress" },
  { date: "2025-12-10", service: "Oil Change",        branch: "Westside Auto Hub",       amount: 50,  status: "Completed"  },
  { date: "2026-02-20", service: "Brake Inspection",  branch: "Downtown Service Center", amount: 80,  status: "Booked"     },
];

export const spendingHistory = [
  { month: "Oct", amount: 200 },
  { month: "Nov", amount: 10  },
  { month: "Dec", amount: 50  },
  { month: "Jan", amount: 5   },
  { month: "Feb", amount: 150 },
];

export const serviceBreakdown = [
  { name: "General",   value: 60, color: "#3B82F6" },
  { name: "Oil Change",value: 25, color: "#10B981" },
  { name: "Brake",     value: 15, color: "#F59E0B" },
];

export const notifications = [
  { id: 1, text: "20% Off AC Service",       time: "2h ago",  read: false },
  { id: 2, text: "Job #j1 is now In Progress",time: "5h ago", read: false },
  { id: 3, text: "Insurance Renewal Due",    time: "1d ago",  read: true  },
];