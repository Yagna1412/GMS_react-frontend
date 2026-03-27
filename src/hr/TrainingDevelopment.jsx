import { useState } from "react";
import {
  GraduationCap,
  Plus,
  Calendar,
  Users,
  DollarSign,
  Download,
} from "lucide-react";
import { toast } from "sonner";

/* INITIAL TRAINING DATA */
const initialTrainings = [
  {
    id: 1,
    title: "Advanced Diagnostics Training",
    type: "Technical",
    startDate: "2024-02-10",
    endDate: "2024-02-15",
    trainer: "External - AutoTech",
    cost: 45000,
    location: "Mumbai Main",
    status: "Completed",
    participants: ["EMP/MUM/2024/0001", "EMP/MUM/2024/0002"],
  },
  {
    id: 2,
    title: "Customer Service Excellence",
    type: "Soft Skills",
    startDate: "2024-02-20",
    endDate: "2024-02-22",
    trainer: "Internal - HR Team",
    cost: 25000,
    location: "Mumbai Main",
    status: "Ongoing",
    participants: ["EMP/MUM/2024/0002", "EMP/MUM/2024/0003", "EMP/DEL/2024/0001"],
  },
  {
    id: 3,
    title: "Safety Compliance Workshop",
    type: "Safety",
    startDate: "2024-03-05",
    endDate: "2024-03-07",
    trainer: "External - SafetyFirst",
    cost: 35000,
    location: "Delhi Branch",
    status: "Scheduled",
    participants: [],
  },
  {
    id: 4,
    title: "Leadership Development Program",
    type: "Soft Skills",
    startDate: "2024-03-15",
    endDate: "2024-03-20",
    trainer: "External - Leadership Institute",
    cost: 60000,
    location: "Mumbai Main",
    status: "Scheduled",
    participants: ["EMP/MUM/2024/0001"],
  },
  {
    id: 5,
    title: "ISO Certification Training",
    type: "Compliance",
    startDate: "2024-01-15",
    endDate: "2024-01-20",
    trainer: "External - ISO Standards",
    cost: 50000,
    location: "Mumbai Main",
    status: "Completed",
    participants: ["EMP/MUM/2024/0001", "EMP/MUM/2024/0002", "EMP/DEL/2024/0001"],
  },
];

/* STATUS STYLES */
const statusStyles = {
  Completed: "bg-green-100 text-green-700",
  Ongoing: "bg-blue-100 text-blue-700",
  Scheduled: "bg-yellow-100 text-yellow-700",
};

const TrainingDevelopment = () => {
  // Main collection of all scheduled and historical training programs
  const [trainings, setTrainings] = useState(initialTrainings);

  // Controls the visibility of the "Schedule Training" form modal
  const [showModal, setShowModal] = useState(false);

  // Form state for creating a new training program
  const [formData, setFormData] = useState({
    title: "",
    type: "Technical",
    startDate: "",
    endDate: "",
    trainer: "",
    cost: "",
    location: "",
  });

  // State for holding validation error messages for the training form
  const [errors, setErrors] = useState({});

  /* STATS CALCULATIONS - KPI definitions for the dashboard cards */
  const totalPrograms = trainings.length;
  const ongoingPrograms = trainings.filter((t) => t.status === "Ongoing").length;
  const totalInvestment = trainings.reduce((sum, t) => sum + (t.cost || 0), 0);
  const totalParticipants = trainings.reduce(
    (sum, t) => sum + t.participants.length,
    0
  );

  /* FORM VALIDATION */
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Training title is required";
    } else if (formData.title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    } else if (formData.title.trim().length > 100) {
      newErrors.title = "Title cannot exceed 100 characters";
    }

    if (!formData.startDate) {
      newErrors.startDate = "Start date is required";
    } else if (
      new Date(formData.startDate) <
      new Date(new Date().toISOString().split("T")[0])
    ) {
      newErrors.startDate = "Start date cannot be in the past";
    }

    if (formData.endDate) {
      if (new Date(formData.endDate) < new Date(formData.startDate)) {
        newErrors.endDate = "End date must be after start date";
      }
    }

    if (formData.cost) {
      const costNum = Number(formData.cost);
      if (isNaN(costNum)) {
        newErrors.cost = "Cost must be a valid number";
      } else if (costNum < 0) {
        newErrors.cost = "Cost cannot be negative";
      } else if (costNum > 10000000) {
        newErrors.cost = "Cost cannot exceed ₹1 Crore";
      }
    }

    if (formData.trainer && formData.trainer.trim().length < 2) {
      newErrors.trainer = "Trainer name must be at least 2 characters";
    }

    if (formData.location && formData.location.trim().length < 2) {
      newErrors.location = "Location must be at least 2 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ACTIONS */

  // Appends a fully formulated new training object to the main state list
  const addTraining = (trainingData) => {
    const newTraining = {
      ...trainingData,
      id: Date.now(), // Auto-generate simple ID
      cost: Number(trainingData.cost) || 0,
    };
    setTrainings([...trainings, newTraining]);
  };

  // Handles the final check and submission of the "Schedule Training" form
  const handleSubmit = () => {
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    // Default to 'Scheduled' for new trainings with no current participants
    addTraining({
      ...formData,
      status: "Scheduled",
      participants: [],
    });

    toast.success("Training program scheduled successfully");
    handleModalClose();
  };

  // Safely closes the modal and resets the form/error states so it's fresh for next time
  const handleModalClose = () => {
    setShowModal(false);
    setErrors({});
    setFormData({
      title: "",
      type: "Technical",
      startDate: "",
      endDate: "",
      trainer: "",
      cost: "",
      location: "",
    });
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-8 pb-10 w-full max-w-[100vw] overflow-x-hidden">

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-black tracking-tight">Training & Development</h1>
          <p className="text-sm sm:text-base text-gray-500">Schedule and track employee training programs</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="w-full sm:w-auto bg-blue-600 text-white px-5 py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm sm:text-base font-semibold hover:bg-blue-700 transition"
        >
          <Plus className="w-5 h-5" />
          Schedule Training
        </button>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm sm:text-base text-gray-600 font-medium">Total Programs</span>
            <div className="bg-blue-50 p-2 rounded-lg shrink-0">
              <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-black">{trainings.length}</div>
        </div>
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm sm:text-base text-gray-600 font-medium">Ongoing</span>
            <div className="bg-green-50 p-2 rounded-lg shrink-0">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-black">{trainings.filter(t => t.status === 'Ongoing').length}</div>
        </div>
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm sm:text-base text-gray-600 font-medium">Total Investment</span>
            <div className="bg-purple-50 p-2 rounded-lg shrink-0">
              <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-black">₹{(trainings.reduce((sum, t) => sum + t.cost, 0) / 1000).toFixed(0)}K</div>
        </div>
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm sm:text-base text-gray-600 font-medium">Participants</span>
            <div className="bg-orange-50 p-2 rounded-lg shrink-0">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-black">{trainings.reduce((sum, t) => sum + t.participants.length, 0)}</div>
        </div>
      </div>


      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto max-w-full">
        <table className="w-full min-w-[1000px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-4 px-4 sm:px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Program</th>
              <th className="text-left py-4 px-4 sm:px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
              <th className="text-left py-4 px-4 sm:px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Duration</th>
              <th className="text-left py-4 px-4 sm:px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Trainer</th>
              <th className="text-left py-4 px-4 sm:px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Participants</th>
              <th className="text-left py-4 px-4 sm:px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Cost</th>
              <th className="text-left py-4 px-4 sm:px-6 text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {trainings.map((training) => (
              <tr key={training.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-4 sm:px-6">
                  <div>
                    <div className="text-sm sm:text-base font-semibold text-black truncate max-w-[200px] lg:max-w-none" title={training.title}>{training.title}</div>
                    <div className="text-xs sm:text-sm text-gray-500 whitespace-nowrap mt-1">{training.startDate} - {training.endDate}</div>
                  </div>
                </td>
                <td className="py-4 px-4 sm:px-6">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap ${training.type === 'Technical' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'
                    }`}>
                    {training.type}
                  </span>
                </td>
                <td className="py-4 px-4 sm:px-6">
                  <span className="text-sm sm:text-base text-gray-700 whitespace-nowrap">
                    {training.startDate && training.endDate
                      ? `${Math.ceil(
                        (new Date(training.endDate) -
                          new Date(training.startDate)) /
                        (1000 * 60 * 60 * 24)
                      )} days`
                      : "-"}
                  </span>
                </td>
                <td className="py-4 px-4 sm:px-6"><span className="text-sm sm:text-base text-gray-700 max-w-[150px] truncate block" title={training.trainer}>{training.trainer}</span></td>
                <td className="py-4 px-4 sm:px-6"><span className="text-sm sm:text-base font-semibold text-black">{training.participants.length}</span></td>
                <td className="py-4 px-4 sm:px-6"><span className="text-sm sm:text-base font-semibold text-black whitespace-nowrap">₹{(training.cost || 0).toLocaleString()}</span></td>
                <td className="py-4 px-4 sm:px-6">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap ${statusStyles[training.status]}`}>
                    {training.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 sm:p-8">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-5 sm:p-6 border-b border-gray-200 shrink-0">
              <h2 className="text-lg sm:text-xl font-bold text-black">Schedule Training Program</h2>
              <p className="text-sm sm:text-base text-gray-600 mt-1">Create new training or development program</p>
            </div>
            <div className="p-5 sm:p-6 space-y-4 sm:space-y-5 overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div className="col-span-1 sm:col-span-2">
                  <label className="block text-xs font-semibold text-gray-700 mb-1 sm:mb-2">TRAINING TITLE *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Advanced Diagnostics Training"
                    className={`w-full px-4 py-2.5 sm:py-3 bg-gray-50 border rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 transition-colors ${errors.title ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                      }`}
                  />
                  {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1 sm:mb-2">TYPE</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-2.5 sm:py-3 bg-gray-50 border border-gray-300 rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Technical">Technical</option>
                    <option value="Soft Skills">Soft Skills</option>
                    <option value="Safety">Safety</option>
                    <option value="Compliance">Compliance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1 sm:mb-2">TRAINER</label>
                  <input
                    type="text"
                    value={formData.trainer}
                    onChange={(e) => setFormData({ ...formData, trainer: e.target.value })}
                    placeholder="e.g., External - AutoTech"
                    className={`w-full px-4 py-2.5 sm:py-3 bg-gray-50 border rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 transition-colors ${errors.trainer ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                      }`}
                  />
                  {errors.trainer && <p className="text-red-500 text-xs mt-1">{errors.trainer}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1 sm:mb-2">START DATE *</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className={`w-full px-4 py-2.5 sm:py-3 bg-gray-50 border rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 transition-colors ${errors.startDate ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                      }`}
                  />
                  {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1 sm:mb-2">END DATE</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className={`w-full px-4 py-2.5 sm:py-3 bg-gray-50 border rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 transition-colors ${errors.endDate ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                      }`}
                  />
                  {errors.endDate && <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1 sm:mb-2">COST (₹)</label>
                  <input
                    type="number"
                    value={formData.cost}
                    onChange={(e) => setFormData({ ...formData, cost: Number(e.target.value) })}
                    placeholder="e.g., 25000"
                    className={`w-full px-4 py-2.5 sm:py-3 bg-gray-50 border rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 transition-colors ${errors.cost ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                      }`}
                  />
                  {errors.cost && <p className="text-red-500 text-xs mt-1">{errors.cost}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1 sm:mb-2">LOCATION</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g., Mumbai Main Branch"
                    className={`w-full px-4 py-2.5 sm:py-3 bg-gray-50 border rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 transition-colors ${errors.location ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                      }`}
                  />
                  {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 p-5 sm:p-6 border-t border-gray-200 bg-gray-50 shrink-0">
              <button onClick={handleModalClose} className="w-full sm:w-auto px-5 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors focus:ring-2 focus:ring-gray-300 focus:outline-none">
                Cancel
              </button>
              <button onClick={handleSubmit} className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
                Schedule Training
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainingDevelopment;
