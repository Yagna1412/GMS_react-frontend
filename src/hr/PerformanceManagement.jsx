import { useState } from "react";
import { Star, Eye, TrendingUp, X } from "lucide-react";

const PerformanceManagement = ({ reviews, setReviews }) => {
  {/* KPI CALCULATIONS */ }
  // Count how many reviews are still pending completion
  const pendingCount = reviews.filter(r => r.status === "Pending").length;
  // Get an array of only the completed reviews to calculate averages
  const completedReviews = reviews.filter(r => r.status === "Completed");

  // Calculate the average score across all completed reviews, defaulting to 0.00
  const averageScore =
    completedReviews.length > 0
      ? (
        completedReviews.reduce((sum, r) => sum + r.score, 0) /
        completedReviews.length
      ).toFixed(2)
      : "0.00";

  {/* Modal State */ }
  // Controls the visibility of the "Start Appraisal Cycle" form modal
  const [showModal, setShowModal] = useState(false);
  // Controls the visibility of the read-only "Performance Review Details" modal and stores the selected review object
  const [viewReviewModal, setViewReviewModal] = useState(null);

  // Form state for creating a new appraisal cycle
  const [cycleData, setCycleData] = useState({
    name: "",
    from: "",
    to: "",
    type: "Annual",
    employees: "All Employees",
    reviewer: "",
    dueDate: "",
  });

  // State for holding validation error messages for the cycle form
  const [errors, setErrors] = useState({});

  {/*ACTIONS*/ }

  // Opens the "Start Appraisal Cycle" modal and resets its form/error states
  const startAppraisalCycle = () => {
    setErrors({});
    setCycleData({
      name: "",
      from: "",
      to: "",
      type: "Annual",
      employees: "All Employees",
      reviewer: "",
      dueDate: "",
    });
    setShowModal(true);
  };

  // Validates the cycle creation form fields before allowing submission
  const validateCycle = () => {
    const newErrors = {};
    if (!cycleData.name.trim()) newErrors.name = "Cycle Name is required";
    if (!cycleData.from) newErrors.from = "Start Date is required";
    if (!cycleData.to) newErrors.to = "End Date is required";
    if (cycleData.from && cycleData.to && cycleData.from > cycleData.to) {
      newErrors.to = "End Date cannot be before Start Date";
    }
    if (!cycleData.reviewer.trim()) newErrors.reviewer = "Reviewer Name is required";
    if (!cycleData.dueDate) newErrors.dueDate = "Due Date is required";
    if (cycleData.dueDate && cycleData.to && cycleData.dueDate < cycleData.to) {
      newErrors.dueDate = "Due date should be after End Date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitCycle = () => {
    if (!validateCycle()) {
      return;
    }

    alert(`Appraisal Cycle "${cycleData.name}" started successfully!`);
    setShowModal(false);
  };

  const viewReview = (review) => {
    setViewReviewModal(review);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-8 pb-10 w-full max-w-[100vw] overflow-x-hidden">

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-black tracking-tight">Performance Management</h2>
          <p className="text-sm sm:text-base text-gray-500">
            Manage employee appraisals
          </p>
        </div>

        <button
          onClick={startAppraisalCycle}
          className="w-full sm:w-auto bg-blue-600 text-white px-5 py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm sm:text-base font-semibold hover:bg-blue-700 transition"
        >
          <span className="text-lg">+</span> Start Appraisal Cycle
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">

        {/* Pending */}
        <div className="bg-white border rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm sm:text-base text-gray-600 font-medium">Pending Reviews</p>
            <div className="bg-yellow-50 p-2 rounded-lg shrink-0">
              <TrendingUp className="text-yellow-500 w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-black">{pendingCount}</h1>
        </div>

        {/* Completed */}
        <div className="bg-white border rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm sm:text-base text-gray-600 font-medium">Completed</p>
            <div className="bg-green-50 p-2 rounded-lg shrink-0">
              <Star className="text-green-500 w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-black">
            {completedReviews.length}
          </h1>
        </div>

        {/* Average */}
        <div className="bg-white border rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col justify-between sm:col-span-2 md:col-span-1">
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm sm:text-base text-gray-600 font-medium">Average Score</p>
            <div className="bg-blue-50 p-2 rounded-lg shrink-0">
              <Star className="text-blue-500 w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-black">{averageScore}</h1>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border rounded-2xl overflow-x-auto shadow-sm max-w-full">
        <div className="w-full min-w-[900px]">
          <div className="grid grid-cols-7 px-4 sm:px-6 py-4 text-xs font-semibold text-gray-600 border-b bg-gray-50 uppercase tracking-wider">
            <div className="col-span-1">EMPLOYEE</div>
            <div className="col-span-1">CYCLE</div>
            <div className="col-span-1 text-center">REVIEW DATE</div>
            <div className="col-span-1 text-center">OVERALL SCORE</div>
            <div className="col-span-1 text-center">REVIEWER</div>
            <div className="col-span-1 text-center">STATUS</div>
            <div className="col-span-1 text-center">ACTIONS</div>
          </div>

          {reviews.map(review => (
            <div
              key={review.id}
              className="grid grid-cols-7 px-4 sm:px-6 py-4 items-center border-b border-gray-100 last:border-none hover:bg-gray-50 transition-colors"
            >
              <div className="col-span-1 pr-4">
                <p className="font-semibold text-sm sm:text-base text-black truncate">{review.name}</p>
                <p className="text-xs sm:text-sm text-gray-500 truncate mt-1">{review.empId}</p>
              </div>

              <div className="col-span-1 text-sm text-gray-700 truncate pr-2">{review.cycle}</div>
              <div className="col-span-1 text-sm text-center text-gray-600 whitespace-nowrap">{review.date}</div>

              <div className="col-span-1 flex items-center justify-center gap-1.5">
                {review.score ? (
                  <>
                    <span className="font-semibold text-sm sm:text-base text-black">{review.score}</span>
                    <Star size={18} className="text-yellow-400 fill-yellow-400" />
                  </>
                ) : (
                  <span className="text-gray-400 font-medium">-</span>
                )}
              </div>

              <div className="col-span-1 text-sm text-center text-gray-700 truncate px-2">{review.reviewer}</div>

              <div className="col-span-1 flex justify-center">
                <span
                  className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap ${review.status === "Completed"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                    }`}
                >
                  {review.status}
                </span>
              </div>

              <div className="col-span-1 flex justify-center">
                <button
                  onClick={() => viewReview(review)}
                  className="p-2 sm:p-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-600 hover:text-blue-600 rounded-lg transition-colors cursor-pointer"
                  title="View Review"
                >
                  <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Start Appraisal cycle */}
      {/* Start Appraisal cycle */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-[500px] p-5 sm:p-6 relative max-h-[95vh] overflow-y-auto">

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <h2 className="text-lg sm:text-xl font-bold mb-5 sm:mb-6 text-black pr-8">
              Start Appraisal Cycle
            </h2>

            <div className="space-y-4 sm:space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cycle Name</label>
                <input
                  className={`w-full border rounded-lg px-3 py-2.5 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="e.g. Q1 2025"
                  value={cycleData.name}
                  onChange={e => setCycleData({ ...cycleData, name: e.target.value })}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
                  <input
                    type="date"
                    className={`w-full border rounded-lg px-3 py-2.5 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.from ? 'border-red-500' : 'border-gray-300'}`}
                    value={cycleData.from}
                    onChange={e => setCycleData({ ...cycleData, from: e.target.value })}
                  />
                  {errors.from && <p className="text-red-500 text-xs mt-1">{errors.from}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
                  <input
                    type="date"
                    className={`w-full border rounded-lg px-3 py-2.5 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.to ? 'border-red-500' : 'border-gray-300'}`}
                    value={cycleData.to}
                    onChange={e => setCycleData({ ...cycleData, to: e.target.value })}
                  />
                  {errors.to && <p className="text-red-500 text-xs mt-1">{errors.to}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Review Type</label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                  value={cycleData.type}
                  onChange={e => setCycleData({ ...cycleData, type: e.target.value })}
                >
                  <option>Annual</option>
                  <option>Quarterly</option>
                  <option>Probation</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Eligible Employees</label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                  value={cycleData.employees}
                  onChange={e => setCycleData({ ...cycleData, employees: e.target.value })}
                >
                  <option>All Employees</option>
                  <option>Department-wise</option>
                  <option>Individual</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reviewer Name</label>
                <input
                  className={`w-full border rounded-lg px-3 py-2.5 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.reviewer ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Search reviewer..."
                  value={cycleData.reviewer}
                  onChange={e => setCycleData({ ...cycleData, reviewer: e.target.value })}
                />
                {errors.reviewer && <p className="text-red-500 text-xs mt-1">{errors.reviewer}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                <input
                  type="date"
                  className={`w-full border rounded-lg px-3 py-2.5 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.dueDate ? 'border-red-500' : 'border-gray-300'}`}
                  value={cycleData.dueDate}
                  onChange={e => setCycleData({ ...cycleData, dueDate: e.target.value })}
                />
                {errors.dueDate && <p className="text-red-500 text-xs mt-1">{errors.dueDate}</p>}
              </div>
            </div>

            <button
              onClick={submitCycle}
              className="mt-6 sm:mt-8 bg-blue-600 hover:bg-blue-700 transition-colors text-white font-medium w-full py-2.5 sm:py-3 rounded-lg text-sm sm:text-base"
            >
              Start Cycle
            </button>
          </div>
        </div>
      )}

      {/* View Review Modal */}
      {viewReviewModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-[500px] p-5 sm:p-6 relative max-h-[95vh] overflow-y-auto">
            <button
              onClick={() => setViewReviewModal(null)}
              className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <h2 className="text-xl font-bold mb-6 text-black pr-8">
              Performance Review Details
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Employee</p>
                  <p className="font-semibold text-gray-900 mt-0.5">{viewReviewModal.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Employee ID</p>
                  <p className="font-semibold text-gray-900 mt-0.5">{viewReviewModal.empId}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cycle</label>
                  <p className="bg-gray-50 px-3 py-2 rounded-lg text-sm text-gray-700 border border-gray-200">{viewReviewModal.cycle}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <p className="bg-gray-50 px-3 py-2 rounded-lg text-sm text-gray-700 border border-gray-200">{viewReviewModal.status}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reviewer</label>
                <p className="bg-gray-50 px-3 py-2 rounded-lg text-sm text-gray-700 border border-gray-200">{viewReviewModal.reviewer}</p>
              </div>

              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 mt-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Overall Score</label>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-black">{viewReviewModal.score || "-"}</span>
                  {viewReviewModal.score && <Star className="text-yellow-400 fill-yellow-400 w-6 h-6" />}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reviewer Comments</label>
                <textarea
                  readOnly
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 h-24 resize-none"
                  value={viewReviewModal.status === "Completed" ? "Meets expectations in all areas. Displays excellent teamwork." : "Pending final assessment."}
                />
              </div>

            </div>

            <button
              onClick={() => setViewReviewModal(null)}
              className="mt-6 sm:mt-8 bg-gray-800 hover:bg-black transition-colors text-white font-medium w-full py-2.5 sm:py-3 rounded-lg text-sm sm:text-base border border-transparent"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>

  );
};

export default PerformanceManagement;