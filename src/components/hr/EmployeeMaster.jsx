import { useState } from "react";
import {
  Users,
  CheckCircle,
  Clock,
  AlertCircle,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Power,
  X,
} from "lucide-react";
import { toast } from "sonner";

/* INITIAL EMPLOYEE DATA */
const initialEmployees = [
  {
    initials: "RK",
    name: "Rajesh Kumar",
    id: "EMP/MUM/2024/0001",
    role: "Senior Mechanic",
    dept: "Service",
    email: "rajesh.kumar@garageos.com",
    phone: "+91 98765 43210",
    branch: "Mumbai Main",
    status: "Active",
  },
  {
    initials: "PS",
    name: "Priya Singh",
    id: "EMP/MUM/2024/0002",
    role: "Service Advisor",
    dept: "Customer Service",
    email: "priya.singh@garageos.com",
    phone: "+91 98765 43211",
    branch: "Mumbai Main",
    status: "Active",
  },
  {
    initials: "AV",
    name: "Amit Verma",
    id: "EMP/DEL/2024/0001",
    role: "Parts Manager",
    dept: "Inventory",
    email: "amit.verma@garageos.com",
    phone: "+91 98765 43212",
    branch: "Delhi Branch",
    status: "Active",
  },
  {
    initials: "ND",
    name: "Neha Desai",
    id: "EMP/MUM/2024/0003",
    role: "Receptionist",
    dept: "Administration",
    email: "neha.desai@garageos.com",
    phone: "+91 98765 43213",
    branch: "Mumbai Main",
    status: "On Probation",
  },
  {
    initials: "VM",
    name: "Vikram Malhotra",
    id: "EMP/BLR/2023/0015",
    role: "Technician",
    dept: "Service",
    email: "vikram.malhotra@garageos.com",
    phone: "+91 98765 43214",
    branch: "Bangalore Branch",
    status: "Notice Period",
  },
];

/*  STATUS COLORS */
const statusStyles = {
  Active: "bg-green-100 text-green-700",
  "On Probation": "bg-yellow-100 text-yellow-700",
  "Notice Period": "bg-orange-100 text-orange-700",
  Inactive: "bg-gray-200 text-gray-700",
};

/*  STAT CARD COMPONENT */
const StatCard = ({ title, value, subtitle, icon, color }) => {
  const colorMap = {
    blue: "text-blue-600",
    green: "text-green-600",
    yellow: "text-yellow-600",
    orange: "text-orange-600",
  };

  return (
    <div className="bg-white border rounded-xl p-5 flex justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-2xl font-bold text-black mt-1">{value}</h2>
        <p className="text-sm text-green-600 mt-1">{subtitle}</p>
      </div>
      <div className={colorMap[color]}>{icon}</div>
    </div>
  );
};

/*    VIEW EMPLOYEE MODAL   */
const ViewEmployeeModal = ({ employee, onClose }) => {
  if (!employee) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-lg md:max-w-2xl rounded-xl p-4 md:p-6 relative max-h-[90vh] overflow-y-auto">
        <button className="absolute right-4 top-4" onClick={onClose}>
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold mb-4 pr-6">Employee Details</h2>

        <div className="space-y-2">
          <p><b>Name:</b> {employee.name}</p>
          <p><b>Email:</b> {employee.email}</p>
          <p><b>Phone:</b> {employee.phone}</p>
          <p><b>Role:</b> {employee.role}</p>
          <p><b>Department:</b> {employee.dept}</p>
          <p><b>Status:</b> {employee.status}</p>
        </div>
      </div>
    </div>
  );
};

/*    ADD + EDIT EMPLOYEE MODAL (FULL 6 STEPS)  */
const AddEmployeeModal = ({ onClose, onSubmit, editEmployee }) => {
  const isEditing = !!editEmployee;

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(
    editEmployee || {
      fullName: "",
      email: "",
      phone: "",
      emergency: "",
      address: "",
      designation: "",
      department: "",
      branch: "",
      reportingTo: "",
      joiningDate: "",
      salary: "",
      aadhar: "",
      pan: "",
      aadharFile: null,
      panFile: null,
      bankAccount: "",
      ifsc: "",
      chequeFile: null,
      educationalCertificates: null,
      experienceLetters: null,
    }
  );

  const [errors, setErrors] = useState({});

  const steps = [
    "Basic Info",
    "Employment",
    "Documents",
    "Bank Details",
    "Additional",
    "Review",
  ];

  // Steps forward the stepper form up to the final review step if the current step perfectly validates
  const nextStep = () => {
    const valid = validateStep();

    if (!valid) {
      toast.error("Please complete required fields before continuing.");
      return;
    }

    setStep((p) => Math.min(p + 1, 6));
  };

  // Steps the form backward
  const prevStep = () => setStep((p) => Math.max(p - 1, 1));

  // Step-by-step rigorous validation logic for form inputs based on the Indian localized format lengths
  const validateStep = () => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = "Full name is required";
      } else if (!/^[A-Za-z\s]{3,50}$/.test(formData.fullName)) {
        newErrors.fullName = "Name must be 3-50 letters";
      }

      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Invalid email format";
      }

      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required";
      } else if (!/^(?:\+91|91)?[6-9]\d{9}$/.test(formData.phone.replace(/[\s-]/g, ""))) {
        newErrors.phone = "Invalid Indian mobile number";
      }
    }

    if (step === 2) {
      if (!formData.designation) newErrors.designation = "Designation required";
      if (!formData.department) newErrors.department = "Department required";
      if (!formData.branch) newErrors.branch = "Branch required";
      if (!formData.joiningDate) newErrors.joiningDate = "Joining date required";
    }

    if (step === 3) {
      if (!formData.aadhar.trim()) {
        newErrors.aadhar = "Aadhaar required";
      } else if (!/^\d{12}$/.test(formData.aadhar.replace(/[-\s]/g, ""))) {
        newErrors.aadhar = "Aadhaar must be exactly 12 digits";
      }

      if (!formData.pan.trim()) {
        newErrors.pan = "PAN required";
      } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan.toUpperCase())) {
        newErrors.pan = "Invalid PAN (e.g. ABCDE1234F)";
      }
    }

    if (step === 4) {
      if (formData.bankAccount && !/^\d{9,18}$/.test(formData.bankAccount)) {
        newErrors.bankAccount = "Account number must be 9-18 digits";
      }

      if (formData.ifsc && !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifsc.toUpperCase())) {
        newErrors.ifsc = "Invalid IFSC Code (e.g. SBIN0001234)";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateStep()) {
      toast.error("Please fix the generic validation errors before submitting.");
      return;
    }

    onSubmit(formData, isEditing);
    toast.success(isEditing ? "Employee Updated Successfully" : "Employee Onboarded Successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl p-4 md:p-8 relative max-h-[90vh] overflow-y-auto flex flex-col">

        {/* Header */}
        <div className="flex justify-between items-start mb-6 shrink-0">
          <div className="pr-6">
            <h2 className="text-xl md:text-2xl font-bold">
              {isEditing ? "Edit Employee" : "Add New Employee"}
            </h2>
            <p className="text-gray-500 text-sm">
              Complete all steps to onboard employee
            </p>
          </div>
          <button onClick={onClose} className="p-1"><X className="w-5 h-5 md:w-6 md:h-6" /></button>
        </div>

        {/* Stepper */}
        <div className="flex items-center gap-3 md:gap-6 mb-8 overflow-x-auto pb-2 shrink-0 flex-nowrap scrollbar-hide">
          {steps.map((label, i) => (
            <div key={i} className="flex items-center gap-2 shrink-0">
              <div
                className={`w-7 h-7 md:w-8 md:h-8 shrink-0 rounded-full flex items-center justify-center text-sm md:text-base text-white
                  ${step === i + 1 ? "bg-blue-600" : "bg-gray-200 text-gray-500"}`}
              >
                {i + 1}
              </div>
              <span className={`text-sm md:text-base whitespace-nowrap ${step === i + 1 ? "font-medium" : "text-gray-400 hidden sm:inline"}`}>
                {label}
              </span>
            </div>
          ))}
        </div>

        {/*STEP 1 – BASIC INFO*/}
        {step === 1 && (
          <div className="bg-gray-50 p-4 md:p-6 rounded-xl flex-1 overflow-y-auto">
            <h3 className="font-semibold mb-4">Basic Information</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <input
                  className={`border p-3 rounded-lg w-full ${errors.fullName ? "border-red-500" : ""}`}
                  placeholder="Full Name*"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
                {errors.fullName && <p className="text-red-500 text-xs mt-1 px-1">{errors.fullName}</p>}
              </div>

              <div>
                <input
                  className={`border p-3 rounded-lg w-full ${errors.email ? "border-red-500" : ""}`}
                  placeholder="Email*"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                {errors.email && <p className="text-red-500 text-xs mt-1 px-1">{errors.email}</p>}
              </div>

              <div>
                <input
                  className={`border p-3 rounded-lg w-full ${errors.phone ? "border-red-500" : ""}`}
                  placeholder="Phone Number*"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1 px-1">{errors.phone}</p>}
              </div>

              <div>
                <input
                  className="border p-3 rounded-lg w-full"
                  placeholder="Emergency Contact"
                  value={formData.emergency}
                  onChange={(e) =>
                    setFormData({ ...formData, emergency: e.target.value })
                  }
                />
              </div>
            </div>

            <textarea
              className="border p-3 rounded-lg w-full mt-4"
              placeholder="Complete Address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
          </div>
        )}

        {/* STEP 2 – EMPLOYMENT*/}
        {step === 2 && (
          <div className="bg-gray-50 p-4 md:p-6 rounded-xl flex-1 overflow-y-auto">
            <h3 className="font-semibold mb-4 md:mb-6">Employment Details</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <select
                  className={`border p-3 rounded-lg w-full ${errors.designation ? "border-red-500" : ""}`}
                  value={formData.designation}
                  onChange={(e) =>
                    setFormData({ ...formData, designation: e.target.value })
                  }
                >
                  <option value="">Select Designation*</option>
                  <option>Senior Mechanic</option>
                  <option>Service Advisor</option>
                  <option>Technician</option>
                  <option>Parts Manager</option>
                </select>
                {errors.designation && <p className="text-red-500 text-xs mt-1 px-1">{errors.designation}</p>}
              </div>

              <div>
                <select
                  className={`border p-3 rounded-lg w-full ${errors.department ? "border-red-500" : ""}`}
                  value={formData.department}
                  onChange={(e) =>
                    setFormData({ ...formData, department: e.target.value })
                  }
                >
                  <option value="">Select Department*</option>
                  <option>Service</option>
                  <option>Customer Service</option>
                  <option>Inventory</option>
                  <option>Administration</option>
                </select>
                {errors.department && <p className="text-red-500 text-xs mt-1 px-1">{errors.department}</p>}
              </div>

              <div>
                <select
                  className={`border p-3 rounded-lg w-full ${errors.branch ? "border-red-500" : ""}`}
                  value={formData.branch}
                  onChange={(e) =>
                    setFormData({ ...formData, branch: e.target.value })
                  }
                >
                  <option value="">Select Branch*</option>
                  <option>Mumbai Main</option>
                  <option>Delhi Branch</option>
                  <option>Bangalore Branch</option>
                </select>
                {errors.branch && <p className="text-red-500 text-xs mt-1 px-1">{errors.branch}</p>}
              </div>

              <div>
                <input
                  className="border p-3 rounded-lg w-full"
                  placeholder="Reporting to (e.g., Amit Sharma)"
                  value={formData.reportingTo}
                  onChange={(e) =>
                    setFormData({ ...formData, reportingTo: e.target.value })
                  }
                />
              </div>

              <div>
                <input
                  type="date"
                  className={`border p-3 rounded-lg w-full ${errors.joiningDate ? "border-red-500" : ""}`}
                  value={formData.joiningDate}
                  onChange={(e) =>
                    setFormData({ ...formData, joiningDate: e.target.value })
                  }
                />
                {errors.joiningDate && <p className="text-red-500 text-xs mt-1 px-1">{errors.joiningDate}</p>}
              </div>

              <div>
                <input
                  className="border p-3 rounded-lg w-full"
                  placeholder="Monthly Salary (₹)"
                  value={formData.salary}
                  onChange={(e) =>
                    setFormData({ ...formData, salary: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3 – DOCUMENT UPLOAD   */}
        {step === 3 && (
          <div className="bg-gray-50 p-4 md:p-6 rounded-xl flex-1 overflow-y-auto">
            <h3 className="font-semibold text-lg mb-4">Document Upload</h3>

            <label className="text-sm font-medium">AADHAAR NUMBER*</label>
            <input
              className={`border p-3 rounded-lg w-full mt-1 mb-1 ${errors.aadhar ? "border-red-500" : ""}`}
              placeholder="XXXX-XXXX-XXXX"
              value={formData.aadhar}
              onChange={(e) =>
                setFormData({ ...formData, aadhar: e.target.value })
              }
            />
            {errors.aadhar && <p className="text-red-500 text-xs mb-1 px-1">{errors.aadhar}</p>}
            <p className="text-xs text-gray-500 mb-4">
              Encrypted and stored securely
            </p>

            <label className="text-sm font-medium">PAN NUMBER*</label>
            <input
              className={`border p-3 rounded-lg w-full mt-1 mb-1 ${errors.pan ? "border-red-500" : ""}`}
              placeholder="ABCDE1234F"
              value={formData.pan}
              onChange={(e) =>
                setFormData({ ...formData, pan: e.target.value })
              }
            />
            {errors.pan && <p className="text-red-500 text-xs mb-1 px-1">{errors.pan}</p>}
            <p className="text-xs text-gray-500 mb-4">
              Encrypted and stored securely
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {/* Aadhar upload */}
              <div>
                <p className="text-sm font-medium mb-2">Aadhar Card Upload*</p>

                <label className="border-2 border-dashed rounded-xl w-full h-40 flex flex-col items-center justify-center cursor-pointer text-gray-500 hover:bg-gray-100 transition">
                  <input
                    type="file"
                    className="hidden"
                    accept="application/pdf,image/*"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        aadharFile: e.target.files[0],
                      })
                    }
                  />
                  <span className="text-3xl mb-2">⬆️</span>
                  <span className="text-sm">Click to upload or drag & drop</span>
                  <span className="text-xs text-gray-500">
                    PDF or Image (Max 2MB)
                  </span>
                </label>
              </div>

              {/* PAN upload */}
              <div>
                <p className="text-sm font-medium mb-2">PAN Card Upload*</p>

                <label className="border-2 border-dashed rounded-xl w-full h-40 flex flex-col items-center justify-center cursor-pointer text-gray-500 hover:bg-gray-100 transition">
                  <input
                    type="file"
                    className="hidden"
                    accept="application/pdf,image/*"
                    onChange={(e) =>
                      setFormData({ ...formData, panFile: e.target.files[0] })
                    }
                  />
                  <span className="text-3xl mb-2">⬆️</span>
                  <span className="text-sm">Click to upload or drag & drop</span>
                  <span className="text-xs text-gray-500">
                    PDF or Image (Max 2MB)
                  </span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4 – BANK DETAILS*/}
        {step === 4 && (
          <div className="bg-gray-50 p-4 md:p-6 rounded-xl flex-1 overflow-y-auto">
            <h3 className="font-semibold text-lg mb-4 md:mb-6">Bank Details</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className="text-sm font-medium">
                  BANK ACCOUNT NUMBER
                </label>
                <input
                  type="text"
                  className={`border p-3 rounded-lg w-full mt-1 ${errors.bankAccount ? "border-red-500" : ""}`}
                  placeholder="e.g., 123456789"
                  value={formData.bankAccount}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      bankAccount: e.target.value,
                    })
                  }
                />
                {errors.bankAccount && <p className="text-red-500 text-xs mt-1 px-1">{errors.bankAccount}</p>}
              </div>

              <div>
                <label className="text-sm font-medium">IFSC CODE</label>
                <input
                  type="text"
                  className={`border p-3 rounded-lg w-full mt-1 ${errors.ifsc ? "border-red-500" : ""}`}
                  placeholder="e.g., SBIN0001234"
                  value={formData.ifsc}
                  onChange={(e) =>
                    setFormData({ ...formData, ifsc: e.target.value })
                  }
                />
                {errors.ifsc && <p className="text-red-500 text-xs mt-1 px-1">{errors.ifsc}</p>}
              </div>
            </div>

            <div className="mt-8 p-5 bg-blue-50 border border-blue-200 rounded-xl">
              <p className="font-medium text-blue-700">
                📄 Cancelled Cheque Upload
              </p>

              <label className="mt-4 border-2 border-dashed border-blue-300 bg-white rounded-xl w-full h-40 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition">
                <input
                  type="file"
                  className="hidden"
                  accept="application/pdf,image/*"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      chequeFile: e.target.files[0],
                    })
                  }
                />
                <span className="text-3xl mb-2">⬆️</span>
                <span className="font-medium">Upload Cancelled Cheque</span>
                <span className="text-xs text-gray-500">(Max 2MB)</span>
              </label>
            </div>
          </div>
        )}

        {/* STEP 5 – ADDITIONAL DOCUMENTS*/}
        {step === 5 && (
          <div className="bg-gray-50 p-4 md:p-6 rounded-xl flex-1 overflow-y-auto">
            <h3 className="font-semibold text-lg mb-4 md:mb-6">
              Additional Documents
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <div>
                <p className="text-sm font-medium">Educational Certificates</p>

                <label className="mt-3 border-2 border-dashed rounded-xl w-full h-40 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100">
                  <input
                    type="file"
                    className="hidden"
                    accept="application/pdf"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        educationalCertificates: e.target.files[0],
                      })
                    }
                  />
                  <span className="text-3xl text-gray-400 mb-2">⬆️</span>
                  <span className="text-gray-700 font-medium">
                    Upload Certificates
                  </span>
                  <span className="text-xs text-gray-500">(PDF Max 5MB)</span>
                </label>
              </div>

              <div>
                <p className="text-sm font-medium">Experience Letters</p>

                <label className="mt-3 border-2 border-dashed rounded-xl w-full h-40 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100">
                  <input
                    type="file"
                    className="hidden"
                    accept="application/pdf"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        experienceLetters: e.target.files[0],
                      })
                    }
                  />
                  <span className="text-3xl text-gray-400 mb-2">⬆️</span>
                  <span className="text-gray-700 font-medium">
                    Upload Letters
                  </span>
                  <span className="text-xs text-gray-500">(PDF Max 5MB)</span>
                </label>
              </div>
            </div>

            <div className="mt-8 bg-white border p-4 rounded-xl text-sm text-gray-600">
              All documents are encrypted and stored safely.
            </div>
          </div>
        )}

        {/*STEP 6 – REVIEW & SUBMIT*/}
        {step === 6 && (
          <div className="bg-gray-50 p-4 md:p-8 rounded-xl flex-1 overflow-y-auto">
            <h3 className="font-semibold text-lg mb-4 md:mb-6">Review & Confirm</h3>

            <div className="bg-white rounded-xl p-4 md:p-6 border overflow-x-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 md:gap-y-6">
                <div>
                  <p className="text-sm text-gray-500">Employee Name</p>
                  <p className="text-black font-semibold">
                    {formData.fullName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-black font-semibold">{formData.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-black font-semibold">{formData.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Designation</p>
                  <p className="text-black font-semibold">
                    {formData.designation}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Department</p>
                  <p className="text-black font-semibold">
                    {formData.department}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Branch</p>
                  <p className="text-black font-semibold">{formData.branch}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-between mt-6 pt-4 border-t border-gray-100 shrink-0">
          <button
            className="px-4 py-2 md:px-5 md:py-2 border rounded-lg text-gray-600 text-sm md:text-base disabled:opacity-50"
            onClick={prevStep}
            disabled={step === 1}
          >
            ← Previous
          </button>

          {step === 6 ? (
            <button
              className="px-5 py-2 md:px-6 md:py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 text-sm md:text-base whitespace-nowrap transition-colors"
              onClick={handleSubmit}
            >
              ✔ Create <span className="hidden sm:inline">Employee</span>
            </button>
          ) : (
            <button
              className="px-5 py-2 md:px-6 md:py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm md:text-base disabled:bg-blue-400 transition-colors"
              onClick={nextStep}
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

/* MAIN EMPLOYEE MASTER PAGE - Manages the complete directory of employees */
const EmployeeMaster = () => {
  // Main collection of all employee data
  const [employees, setEmployees] = useState(initialEmployees);

  // State for toggling the Add/Edit single employee form modal
  const [showModal, setShowModal] = useState(false);

  // Tracks which employee is currently being edited (null when adding a new employee)
  const [editingEmployee, setEditingEmployee] = useState(null);

  // Tracks which employee is currently being viewed in read-only mode
  const [viewEmployee, setViewEmployee] = useState(null);

  // Controls the text active in the main search bar to filter the central employee table
  const [searchQuery, setSearchQuery] = useState("");

  // Dynamically filters the primary employee list against the search query across multiple fields
  const filteredEmployees = employees.filter((emp) => {
    const query = searchQuery.toLowerCase();
    return (
      emp.name.toLowerCase().includes(query) ||
      emp.id.toLowerCase().includes(query) ||
      emp.email.toLowerCase().includes(query) ||
      emp.role.toLowerCase().includes(query)
    );
  });

  /* -------- Add or Edit Handler -------- */
  // Handles the final submission from the AddEmployeeModal (both creations and updates)
  const handleSubmit = (data, isEditing) => {
    if (isEditing) {
      // If editing mode, update the specific employee by matching email
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.email === data.email
            ? { ...emp, ...data, name: data.fullName }
            : emp
        )
      );
      return;
    }

    // If adding mode, construct a new employee profile and generate a unique ID
    const newEmployee = {
      initials: data.fullName
        .split(" ")
        .map((x) => x[0])
        .join("")
        .toUpperCase(),
      name: data.fullName,
      id: `EMP/${data.branch.slice(0, 3).toUpperCase()}/2025/${String(
        employees.length + 1
      ).padStart(4, "0")}`,
      role: data.designation,
      dept: data.department,
      email: data.email,
      phone: data.phone,
      branch: data.branch,
      status: "Active",
    };

    setEmployees((prev) => [...prev, newEmployee]);
  };

  /* -------- Delete Handler -------- */
  // Removes an employee from the central list based on ID match
  const deleteEmployee = (id) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
  };

  /* -------- Change Status Toggle -------- */
  // Rotates an employee's status cyclically (Active -> On Probation -> Notice Period -> Inactive -> Active)
  const changeStatus = (id) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === id
          ? {
            ...emp,
            status:
              emp.status === "Active"
                ? "On Probation"
                : emp.status === "On Probation"
                  ? "Notice Period"
                  : emp.status === "Notice Period"
                    ? "Inactive"
                    : "Active",
          }
          : emp
      )
    );
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 pt-8 pb-10 w-full max-w-[100vw] overflow-x-hidden">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Employee Master</h1>
          <p className="text-sm sm:text-base text-gray-500">Manage employee lifecycle and records</p>
        </div>

        <button
          onClick={() => {
            setEditingEmployee(null);
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-lg flex items-center justify-center gap-2 w-full sm:w-auto text-sm md:text-base"
        >
          + Add Employee
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Employees"
          value={employees.length}
          subtitle="Active workforce"
          icon={<Users />}
          color="blue"
        />
        <StatCard
          title="Active"
          value={employees.filter((e) => e.status === "Active").length}
          subtitle="Working Staff"
          icon={<CheckCircle />}
          color="green"
        />
        <StatCard
          title="On Probation"
          value={employees.filter((e) => e.status === "On Probation").length}
          subtitle="New Joiners"
          icon={<Clock />}
          color="yellow"
        />
        <StatCard
          title="Notice Period"
          value={employees.filter((e) => e.status === "Notice Period").length}
          subtitle="Leaving Soon"
          icon={<AlertCircle />}
          color="orange"
        />
      </div>

      {/* Search */}
      <div className="bg-white border rounded-xl p-3 md:p-4 flex flex-col md:flex-row gap-3 mb-6">
        <div className="flex-1 relative w-full">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm md:text-base focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Search by name, ID, email, role..."
          />
        </div>

        <div className="flex gap-2 sm:gap-3 w-full md:w-auto">
          <button className="border px-3 sm:px-4 py-2 rounded-lg flex items-center justify-center gap-2 flex-1 md:flex-none text-sm whitespace-nowrap">
            <Filter size={16} /> <span className="hidden sm:inline">All </span>Status
          </button>

          <button className="border px-3 sm:px-4 py-2 rounded-lg flex items-center justify-center gap-2 flex-1 md:flex-none text-sm whitespace-nowrap">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border overflow-x-auto max-w-full">
        <table className="w-full min-w-[900px] text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left">EMPLOYEE</th>
              <th className="px-6 py-4 text-left">ROLE & DEPT</th>
              <th className="px-6 py-4 text-left">CONTACT</th>
              <th className="px-6 py-4 text-left">BRANCH</th>
              <th className="px-6 py-4 text-left">STATUS</th>
              <th className="px-6 py-4 text-right">ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {filteredEmployees.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                  No employee records found matching your search.
                </td>
              </tr>
            ) : null}
            {filteredEmployees.map((emp, i) => (
              <tr key={i} className="border-t">
                <td className="px-6 py-4 flex gap-3">
                  <div className="w-10 h-10 bg-indigo-500 text-white rounded-full flex items-center justify-center font-semibold">
                    {emp.initials}
                  </div>
                  <div>
                    <p className="font-semibold">{emp.name}</p>
                    <p className="text-xs text-gray-500">ID: {emp.id}</p>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <p className="font-semibold">{emp.role}</p>
                  <p className="text-xs text-gray-500">{emp.dept}</p>
                </td>

                <td className="px-6 py-4">
                  <p>{emp.email}</p>
                  <p>{emp.phone}</p>
                </td>

                <td className="px-6 py-4">{emp.branch}</td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[emp.status]}`}
                  >
                    {emp.status}
                  </span>
                </td>

                <td className="px-6 py-4 flex justify-end gap-4 text-gray-600">
                  <Eye
                    size={18}
                    onClick={() => setViewEmployee(emp)}
                    className="cursor-pointer hover:text-black"
                  />
                  <Edit
                    size={18}
                    onClick={() => {
                      setEditingEmployee(emp);
                      setShowModal(true);
                    }}
                    className="cursor-pointer hover:text-blue-600"
                  />
                  <Power
                    size={18}
                    onClick={() => changeStatus(emp.id)}
                    className="cursor-pointer hover:text-yellow-600"
                  />
                  <X
                    size={18}
                    onClick={() => deleteEmployee(emp.id)}
                    className="cursor-pointer text-red-500 hover:text-red-700"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODALS */}
      {showModal && (
        <AddEmployeeModal
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
          editEmployee={editingEmployee}
        />
      )}

      {viewEmployee && (
        <ViewEmployeeModal
          employee={viewEmployee}
          onClose={() => setViewEmployee(null)}
        />
      )}
    </div>
  );
};

export default EmployeeMaster;
