import { useState } from "react";
import {
  DollarSign,
  Download,
  CheckCircle,
  Clock,
  FileText,
  X,
} from "lucide-react";
import { toast } from "sonner";

/* INITIAL PAYROLL DATA */
const initialPayrollRecords = [
  {
    id: 1,
    month: "January 2024",
    totalEmployees: 45,
    totalAmount: 2250000,
    status: "Completed",
    processedOn: "2024-01-31",
    approvedBy: "HR Manager",
  },
  {
    id: 2,
    month: "February 2024",
    totalEmployees: 45,
    totalAmount: 2250000,
    status: "Completed",
    processedOn: "2024-02-29",
    approvedBy: "HR Manager",
  },
  {
    id: 3,
    month: "March 2024",
    totalEmployees: 45,
    totalAmount: 2250000,
    status: "Pending",
    processedOn: null,
    approvedBy: null,
  },
];

/* INITIAL EMPLOYEES DATA */
const initialEmployees = [
  { id: "EMP/MUM/2024/0001", name: "Rajesh Kumar", status: "Active", salary: 50000 },
  { id: "EMP/DEL/2024/0001", name: "Amit Verma", status: "Active", salary: 60000 },
  { id: "EMP/BNG/2024/0001", name: "Priya Singh", status: "Active", salary: 55000 },
];

/* STATUS STYLES */
const statusStyles = {
  Completed: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
};

const PayrollManagement = () => {
  // State for toggling the confirmation popup before finalizing a payroll month
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  // State for toggling the success popup after finalizing a payroll month
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Tracks the specific month and record ID currently being processed
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedRecordId, setSelectedRecordId] = useState(null);

  // State for toggling the salary slip generation popup and simulating a loading state
  const [showSlipsModal, setShowSlipsModal] = useState(false);
  const [slipsProcessing, setSlipsProcessing] = useState(false);

  // Collections of historical payroll runs and current employee salary structures
  const [payrollRecords, setPayrollRecords] = useState(initialPayrollRecords);
  const [employees] = useState(initialEmployees);

  /* STATS CALCULATIONS */
  const totalActiveEmployees = employees.filter((e) => e.status === "Active").length;
  const totalSalary = employees
    .filter((e) => e.status === "Active")
    .reduce((sum, e) => sum + e.salary, 0);
  const processingStatus = payrollRecords.find((r) => r.status === "Pending")
    ? "Pending"
    : "Up to date";

  /* ACTIONS */

  // Initiates the payroll processing workflow for a specific month
  const handleProcessPayroll = (recordId, month) => {
    setSelectedMonth(month);
    setSelectedRecordId(recordId);
    setShowConfirmModal(true);
  };

  // Finalizes the payroll after confirmation, marking the month as "Completed"
  const handleConfirmProcess = () => {
    const today = new Date().toISOString().split("T")[0];
    setPayrollRecords((prevRecords) =>
      prevRecords.map((record) =>
        record.id === selectedRecordId
          ? {
            ...record,
            status: "Completed",
            processedOn: today,
            approvedBy: "HR Manager",
          }
          : record
      )
    );
    setShowConfirmModal(false);
    setShowSuccessModal(true);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    setSelectedMonth(null);
  };

  const handleCancelProcess = () => {
    setShowConfirmModal(false);
    setSelectedMonth(null);
  };

  // Simulates an API call to generate salary slips, calculates taxes/PF, and generates a downloadable CSV
  const handleGenerateSlips = () => {
    setShowSlipsModal(true);
    setSlipsProcessing(true);

    setTimeout(() => {
      const header =
        "Emp ID,Employee Name,Salary,PF (12%),ESI (0.75%),TDS,Net Salary,Month\n";

      const latestMonth =
        payrollRecords.length > 0
          ? payrollRecords[payrollRecords.length - 1].month
          : "March 2024";

      const rows = employees
        .filter((emp) => emp.status === "Active")
        .map((emp) => {
          const pf = Math.round(emp.salary * 0.12);
          const esi = Math.round(emp.salary * 0.0075);
          const tds = Math.round(emp.salary * 0.1);
          const netSalary = emp.salary - pf - esi - tds;
          return `${emp.id},${emp.name},${emp.salary},${pf},${esi},${tds},${netSalary},${latestMonth}`;
        })
        .join("\n");

      const csvContent = header + rows;
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `salary-slips-${new Date().toISOString().split("T")[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setSlipsProcessing(false);
    }, 2000);
  };

  const handleCloseSlipsModal = () => {
    setShowSlipsModal(false);
    setSlipsProcessing(false);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-8 pb-10 w-full max-w-[100vw] overflow-x-hidden">
      {/* HEADER - Page title and Generate Slips button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-black mb-1 tracking-tight">Payroll Management</h1>
          <p className="text-sm sm:text-base text-gray-500">Process monthly payroll and generate salary slips</p>
        </div>
        <button onClick={handleGenerateSlips} className="flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold w-full sm:w-auto text-sm md:text-base">
          <Download className="w-5 h-5" />
          Generate Slips
        </button>
      </div>

      {/* KPI CARDS - Display key metrics (Total Employees, Salary, Processing Status) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {/* Card 1: Total Active Employees Count */}
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm sm:text-base text-gray-600 font-medium">Total Employees</span>
            <div className="bg-blue-50 p-2 rounded-lg shrink-0">
              <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-black">{employees.filter(e => e.status === 'Active').length}</div>
        </div>

        {/* Card 2: Total Salary In Hand for Active Employees */}
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm sm:text-base text-gray-600 font-medium">Total Salary</span>
            <div className="bg-green-50 p-2 rounded-lg shrink-0">
              <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-black">₹{(employees.filter(e => e.status === 'Active').reduce((sum, e) => sum + e.salary, 0) / 100000).toFixed(1)}L</div>
        </div>

        {/* Card 3: Current Processing Status (Pending or Up to date) */}
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm sm:text-base text-gray-600 font-medium">Processing Status</span>
            <div className="bg-yellow-50 p-2 rounded-lg shrink-0">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
            </div>
          </div>
          <div className={`text-xl sm:text-2xl font-bold ${payrollRecords.find(r => r.status === 'Pending') ? 'text-yellow-600' : 'text-green-600'}`}>
            {payrollRecords.find(r => r.status === 'Pending') ? 'Pending' : 'Up to date'}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto max-w-full">
        <table className="w-full min-w-[800px] text-sm md:text-base">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-4 px-4 sm:px-6 text-xs font-semibold text-gray-600 uppercase">Month</th>
              <th className="text-left py-4 px-4 sm:px-6 text-xs font-semibold text-gray-600 uppercase">Employees</th>
              <th className="text-left py-4 px-4 sm:px-6 text-xs font-semibold text-gray-600 uppercase">Total Amount</th>
              <th className="text-left py-4 px-4 sm:px-6 text-xs font-semibold text-gray-600 uppercase whitespace-nowrap">Processed On</th>
              <th className="text-left py-4 px-4 sm:px-6 text-xs font-semibold text-gray-600 uppercase whitespace-nowrap">Approved By</th>
              <th className="text-left py-4 px-4 sm:px-6 text-xs font-semibold text-gray-600 uppercase">Status</th>
              <th className="text-left py-4 px-4 sm:px-6 text-xs font-semibold text-gray-600 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {payrollRecords.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-4 sm:px-6"><span className="text-sm font-semibold text-black">{record.month}</span></td>
                <td className="py-4 px-4 sm:px-6"><span className="text-sm text-gray-700">{record.totalEmployees}</span></td>
                <td className="py-4 px-4 sm:px-6"><span className="text-sm font-semibold text-black">₹{(record.totalAmount / 100000).toFixed(1)}L</span></td>
                <td className="py-4 px-4 sm:px-6"><span className="text-sm text-gray-700 whitespace-nowrap">{record.processedOn || '-'}</span></td>
                <td className="py-4 px-4 sm:px-6"><span className="text-sm text-gray-700 whitespace-nowrap">{record.approvedBy || '-'}</span></td>
                <td className="py-4 px-4 sm:px-6">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${record.status === 'Completed' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'
                    }`}>
                    {record.status}
                  </span>
                </td>
                <td className="py-4 px-4 sm:px-6">
                  {record.status === 'Pending' ? (
                    <button onClick={() => handleProcessPayroll(record.id, record.month)} className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-xs font-medium hover:bg-green-700 transition-colors">
                      <CheckCircle className="w-4 h-4" />
                      Process
                    </button>
                  ) : (
                    <button onClick={() => toast.info('Download payroll report')} className="p-2 bg-gray-50 border border-gray-200 hover:bg-gray-100 rounded-lg transition-colors" title="Download Report">
                      <Download className="w-4 h-4 text-gray-600" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-6 mt-6 sm:mt-8 flex flex-col sm:flex-row items-start gap-4">
        <div className="bg-blue-100 p-2 sm:p-3 rounded-full shrink-0">
          <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
        </div>
        <div>
          <h3 className="font-bold text-blue-900 text-base sm:text-lg mb-1">Payroll Processing Information</h3>
          <p className="text-sm sm:text-base text-blue-800 mb-2 sm:mb-3">
            Processing payroll will automatically calculate PF, ESI, TDS, and generate salary slips and bank transfer files.
          </p>
          <ul className="text-xs sm:text-sm text-blue-700 space-y-1.5 flex flex-col">
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0" /> Attendance-based salary calculation</li>
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0" /> Automatic statutory compliance deductions</li>
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0" /> Salary slip PDF generation</li>
            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0" /> Bank transfer file (.xlsx) for bulk payment</li>
          </ul>
        </div>
      </div>


      {/* CONFIRM MODAL */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg p-5 sm:p-6 max-w-sm w-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg sm:text-xl font-bold text-black">Process Payroll</h2>
              <button onClick={handleCancelProcess} className="text-gray-400 hover:text-gray-600 p-1">
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
            <p className="text-sm sm:text-base text-gray-700 mb-6 sm:mb-8">
              Process payroll for <span className="font-semibold text-black">{selectedMonth}</span>? This will generate salary slips and bank transfer files.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-end">
              <button
                onClick={handleCancelProcess}
                className="w-full sm:w-auto px-5 py-2.5 border border-gray-300 rounded-lg text-sm sm:text-base text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmProcess}
                className="w-full sm:w-auto px-5 py-2.5 bg-green-600 text-white rounded-lg text-sm sm:text-base font-medium hover:bg-green-700 transition-colors"
              >
                Process Payroll
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full mx-4 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 rounded-full p-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <h2 className="text-lg font-bold text-black mb-2">Payroll Processed</h2>
            <p className="text-gray-700 mb-6">
              Payroll for <span className="font-semibold">{selectedMonth}</span> has been successfully processed. Salary slips and bank transfer files have been generated.
            </p>
            <button
              onClick={handleCloseSuccessModal}
              className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors w-full"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Generate Slips Modal */}
      {showSlipsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full mx-4 text-center">
            <div className="flex justify-center mb-4">
              <div className={`rounded-full p-4 ${slipsProcessing ? 'bg-blue-100' : 'bg-green-100'}`}>
                {slipsProcessing ? (
                  <div className="animate-spin">
                    <Download className="w-8 h-8 text-blue-600" />
                  </div>
                ) : (
                  <CheckCircle className="w-8 h-8 text-green-600" />
                )}
              </div>
            </div>
            <h2 className="text-lg font-bold text-black mb-2">
              {slipsProcessing ? 'Generating Salary Slips' : 'Salary Slips Generated'}
            </h2>
            <p className="text-gray-700 mb-6">
              {slipsProcessing
                ? 'Please wait while we generate salary slips for all employees...'
                : 'Salary slips have been generated successfully and are ready for download.'}
            </p>
            {!slipsProcessing && (
              <button
                onClick={handleCloseSlipsModal}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors w-full"
              >
                Done
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PayrollManagement;
