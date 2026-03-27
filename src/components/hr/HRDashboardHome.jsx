import {
  Users,
  CalendarCheck,
  CalendarDays,
  AlertTriangle,
  IndianRupee,
  TrendingUp,
  GraduationCap,
  PersonStanding,
} from "lucide-react";

const HRDashboardHome = ({ onNavigate }) => {
  /* SAFE NAVIGATION HANDLERS 
     These wrappers ensure that clicking a dashboard card securely calls the 
     parent controller's navigation function to switch the active view without crashing 
     if the parent didn't pass down the 'onNavigate' prop. 
  */

  const goToEmployees = () => {
    if (typeof onNavigate === "function") {
      onNavigate("employees");
    }
  };

  const goToAttendance = () => {
    if (typeof onNavigate === "function") {
      onNavigate("attendance");
    }
  };

  const goToLeaveManagement = () => {
    if (typeof onNavigate === "function") {
      onNavigate("leaves");
    }
  };

  const goToPerformance = () => {
    if (typeof onNavigate === "function") {
      onNavigate("performance");
    }
  };

  const goToGrievance = () => {
    if (typeof onNavigate === "function") {
      onNavigate("grievance");
    }
  };

  const goToPayroll = () => {
    if (typeof onNavigate === "function") {
      onNavigate("payroll");
    }
  };

  const goToTraining = () => {
    if (typeof onNavigate === "function") {
      onNavigate("training");
    }
  };

  return (
    <div className="px-4 sm:px-6 pt-8 pb-10">

      {/* HEADER */}
      <div className="mb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-black tracking-tight">HR Dashboard</h2>
          <p className="text-sm sm:text-base text-gray-500">
            Welcome back! Here's your HR overview for today
          </p>
        </div>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        {/* Total Employees */}
        <div
          onClick={goToEmployees}
          className="bg-white rounded-2xl border p-6 cursor-pointer hover:shadow-md transition"
        >
          <div className="flex justify-between">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Users className="text-blue-600" />
            </div>
            <span className="text-gray-400">➜</span>
          </div>

          <h1 className="mt-4 text-2xl font-bold">5</h1>
          <p className="text-gray-600">Total Employees</p>

          <div className="mt-2 flex gap-2 text-sm">
            <span className="text-green-600 font-semibold">3 Active</span>
            <span className="text-yellow-600 font-semibold">1 Probation</span>
          </div>
        </div>

        {/* Attendance */}
        <div
          onClick={goToAttendance}
          className="bg-white rounded-2xl border p-6 cursor-pointer hover:shadow-md transition"
        >
          <div className="flex justify-between">
            <div className="bg-blue-100 p-2 rounded-lg">
              <CalendarCheck className="text-green-600" />
            </div>
          </div>

          <h1 className="mt-4 text-2xl font-bold">60%</h1>
          <p className="text-gray-600">Today's Attendance</p>

          <div className="mt-2 flex gap-2 text-sm">
            <span className="text-green-600">3 Present</span>
            <span className="text-red-600">1 Absent</span>
          </div>
        </div>

        {/* Leave Approvals */}
        <div
          onClick={goToLeaveManagement}
          className="bg-white rounded-2xl border p-6 cursor-pointer hover:shadow-md transition"
        >
          <CalendarDays className="text-purple-600" />
          <h1 className="mt-4 text-2xl font-bold">2</h1>
          <p className="text-gray-600">Pending Leave Approvals</p>
          <div className="text-sm mt-2">
            <span className="text-purple-600">0 Approved</span>{" "}
            <span className="text-orange-600">Action Needed</span>
          </div>
        </div>

        {/* Grievances */}
        <div
          onClick={goToGrievance}
          className="bg-white rounded-2xl border p-6 cursor-pointer hover:shadow-md transition"
        >
          <AlertTriangle className="text-red-600" />
          <h1 className="mt-4 text-2xl font-bold">0</h1>
          <p className="text-gray-600">Pending Grievances</p>
          <div className="text-sm mt-2">
            <span className="text-red-600">0 High Severity</span>{" "}
            <span className="text-orange-600">Urgent</span>
          </div>
        </div>

        {/* Payroll */}
        <div className="bg-white rounded-2xl border p-6">
          <IndianRupee className="text-green-600" />
          <h1 className="mt-4 text-2xl font-bold">0</h1>
          <p className="text-gray-600">December 2024</p>
          <span className="text-orange-600 text-sm font-semibold">Pending</span>
        </div>

        {/* Performance */}
        <div
          onClick={goToPerformance}
          className="bg-white rounded-2xl border p-6 cursor-pointer hover:shadow-md transition"
        >
          <TrendingUp className="text-blue-600" />
          <h1 className="mt-4 text-2xl font-bold">0</h1>
          <p className="text-gray-600">Pending Reviews</p>
          <span className="text-green-600 text-sm font-semibold">
            Completed
          </span>
        </div>

        {/* Training */}
        <div className="bg-white rounded-2xl border p-6">
          <GraduationCap className="text-orange-600" />
          <h1 className="mt-4 text-2xl font-bold">0</h1>
          <p className="text-gray-600">Trainees</p>
          <span className="text-yellow-600 text-sm font-semibold">
            No Records
          </span>
        </div>

        {/* Relieving */}
        <div className="bg-white rounded-2xl border p-6">
          <PersonStanding className="text-black" />
          <h1 className="mt-4 text-2xl font-bold">0</h1>
          <p className="text-gray-600">Relieving Employee</p>
          <span className="text-blue-600 text-sm font-semibold">
            No Records
          </span>
        </div>

      </div>

      {/* QUICK ACTIONS + PENDING LEAVES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-4 sm:mt-6">

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl border p-4 sm:p-5 hover:shadow-md transition">
          <h1 className="text-lg sm:text-xl font-semibold mb-4 text-black">Quick Actions</h1>

          <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4">
            <div
              onClick={goToPayroll}
              className="border rounded-xl p-3 sm:p-4 text-sm sm:text-base cursor-pointer hover:bg-gray-50 flex items-center justify-center sm:justify-start"
            >
              Process Payroll
            </div>

            <div
              onClick={goToLeaveManagement}
              className="border rounded-xl p-3 sm:p-4 text-sm sm:text-base cursor-pointer hover:bg-gray-50 flex items-center justify-center sm:justify-start text-center sm:text-left"
            >
              Approve Leaves
            </div>

            <div
              onClick={goToTraining}
              className="border rounded-xl p-3 sm:p-4 text-sm sm:text-base cursor-pointer hover:bg-gray-50 flex items-center justify-center sm:justify-start text-center sm:text-left"
            >
              Create Training
            </div>

            <div
              onClick={goToEmployees}
              className="border rounded-xl p-3 sm:p-4 text-sm sm:text-base cursor-pointer hover:bg-gray-50 flex items-center justify-center sm:justify-start"
            >
              Add Employee
            </div>
          </div>
        </div>

        {/* Pending Leave Requests */}
        <div className="bg-white rounded-2xl border p-4 sm:p-5 hover:shadow-md transition flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-lg sm:text-xl font-semibold text-black">Pending Leave Requests</h1>
            <span
              onClick={goToLeaveManagement}
              className="text-blue-600 text-sm sm:text-base font-medium cursor-pointer hover:underline whitespace-nowrap ml-2"
            >
              View All
            </span>
          </div>

          <div className="border rounded-xl p-4 text-center sm:text-left text-sm sm:text-base text-gray-500 bg-gray-50 flex-1 flex items-center justify-center sm:justify-start">
            No records found
          </div>
        </div>

      </div>

      {/* HIGH PRIORITY ALERT */}
      <div className="mt-6 sm:mt-10 bg-red-50 border border-red-200 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center">
        <div className="bg-red-100 p-2 sm:p-3 rounded-full shrink-0">
          <AlertTriangle className="text-red-600 w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-red-900 text-base sm:text-lg">
            High Priority Grievances Require Attention
          </h3>
          <p className="text-sm sm:text-base text-red-700 mt-1">
            1 high severity grievance(s) need immediate action.
          </p>
        </div>
        <button
          onClick={goToGrievance}
          className="mt-3 sm:mt-0 w-full sm:w-auto bg-red-600 text-white px-5 py-2.5 rounded-lg text-sm sm:text-base font-medium hover:bg-red-700 transition"
        >
          Review Grievances
        </button>
      </div>

    </div>
  );
};

export default HRDashboardHome;
