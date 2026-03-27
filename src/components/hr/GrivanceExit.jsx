import React, { useState } from 'react';
import { toast } from 'sonner';
import { AlertCircle, Plus, Clock, CheckCircle, XCircle, LogOut, Download, MessageSquare, DollarSign, FileText } from 'lucide-react';

/* Seed grievance data locally (same pattern as other HR pages) */
const initialGrievances = [
    {
        id: "GRV/2024/001",
        empId: "EMP/MUM/2024/0001",
        empName: "Rajesh Kumar",
        category: "Workplace Harassment",
        severity: "High",
        description: "Reported harassment by manager",
        filedOn: "2024-12-10",
        status: "Under Investigation",
        sla: "7",
        daysElapsed: 9,
    },
    {
        id: "GRV/2024/002",
        empId: "EMP/MUM/2024/0002",
        empName: "Priya Singh",
        category: "Salary Related",
        severity: "Medium",
        description: "Discrepancy in salary",
        filedOn: "2024-12-05",
        status: "Resolved",
        sla: "5",
        daysElapsed: 1,
    },
    {
        id: "GRV/2024/003",
        empId: "EMP/MUM/2024/0003",
        empName: "Neha Desai",
        category: "Work Environment",
        severity: "Low",
        description: "General feedback",
        filedOn: "2024-12-18",
        status: "Pending",
        sla: "3",
        daysElapsed: 0,
    },
];

export default function GrievanceExit() {
    // Tracks the currently visible section of the page (either 'grievances' or 'exit')
    const [activeTab, setActiveTab] = useState('grievances');

    // Controls the visibility of the primary "File Grievance" form modal
    const [showModal, setShowModal] = useState(false);

    // Controls the visibility of the "Read More" modal for long grievance descriptions
    const [showDescriptionModal, setShowDescriptionModal] = useState(false);
    const [selectedDescription, setSelectedDescription] = useState('');

    // Form state for creating a new grievance ticket
    const [formData, setFormData] = useState({
        empId: '',
        empName: '',
        category: 'Work Environment',
        severity: 'Low',
        description: ''
    });
    const [errors, setErrors] = useState({});

    // Main collection of all active grievance tickets
    const [grievances, setGrievances] = useState(initialGrievances);

    /* --- ACTIONS --- */

    // Adds a new grievance ticket to the top of the list with an auto-generated ID
    const addGrievance = (grv) => {
        setGrievances((prev) => {
            const nextIndex = prev.length + 1;
            const id = `GRV/2024/${String(nextIndex).padStart(3, '0')}`;
            const newGrv = {
                id,
                empId: grv.empId || '',
                empName: grv.empName || '',
                category: grv.category || 'Other',
                severity: grv.severity || 'Low',
                description: grv.description || '',
                filedOn: new Date().toLocaleDateString(),
                status: 'Pending',
                sla: grv.sla || '7',
                daysElapsed: 0,
            };
            return [newGrv, ...prev];
        });
    };

    // Generic helper to update any property of an existing grievance by its ID
    const updateGrievance = (id, updates) => {
        setGrievances((prev) => prev.map((g) => (g.id === id ? { ...g, ...updates } : g)));
    };

    // Validates the "File Grievance" modal fields before submission
    const validateForm = () => {
        const newErrors = {};

        // Employee ID validation
        if (!formData.empId.trim()) {
            newErrors.empId = 'Employee ID is required';
        } else if (!/^EMP\/[A-Z]{3}\/\d{4}\/\d{4}$/.test(formData.empId.trim())) {
            newErrors.empId = 'Invalid format. Use: EMP/XXX/YYYY/XXXX';
        }

        // Employee Name validation
        if (!formData.empName.trim()) {
            newErrors.empName = 'Employee Name is required';
        } else if (formData.empName.trim().length < 2) {
            newErrors.empName = 'Name must be at least 2 characters';
        }

        // Category validation
        if (!formData.category.trim()) {
            newErrors.category = 'Please select a category';
        }

        // Severity validation
        if (!formData.severity.trim()) {
            newErrors.severity = 'Please select severity level';
        }

        // Description validation
        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        } else if (formData.description.trim().length < 10) {
            newErrors.description = 'Description must be at least 10 characters';
        } else if (formData.description.trim().length > 500) {
            newErrors.description = 'Description cannot exceed 500 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handles the final form submission when a user creates a new grievance ticket
    const handleSubmitGrievance = () => {
        if (!validateForm()) {
            toast.error('Please fix the errors in the form');
            return;
        }
        addGrievance(formData);
        toast.success('Grievance filed successfully');
        setShowModal(false); // Close Modal immediately

        // Reset the form state for the next use
        setFormData({ empId: '', empName: '', category: 'Work Environment', severity: 'Low', description: '' });
        setErrors({});
    };

    // Marks a specific grievance ticket as resolved and closes the loop
    const handleResolve = (grv) => {
        updateGrievance(grv.id, { status: 'Resolved', resolution: 'Issue resolved by HR team' });
        toast.success('Grievance marked as resolved');
    };

    // Helper: Returns tailwind color classes based on the severity of the grievance ticket
    const getSeverityColor = (severity) => {
        switch (severity) {
            case 'High': return 'bg-red-100 text-red-700';
            case 'Medium': return 'bg-yellow-100 text-yellow-700';
            case 'Low': return 'bg-blue-100 text-blue-700';
            default: return 'bg-gray-50 text-gray-700';
        }
    };

    // Helper: Returns tailwind color classes based on the active status of the grievance ticket
    const getStatusColor = (status) => {
        switch (status) {
            case 'Resolved': return 'bg-green-100 text-green-700';
            case 'Under Investigation': return 'bg-yellow-100 text-yellow-700';
            case 'Pending': return 'bg-orange-100 text-orange-700';
            default: return 'bg-gray-50 text-gray-700';
        }
    };

    return (
        <div className="px-4 sm:px-6 lg:px-8 pt-8 pb-10 w-full max-w-[100vw] overflow-x-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-2">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-black tracking-tight">Grievance & Exit Management</h1>
                    <p className="text-gray-500 text-sm">Handle employee grievances and process exits</p>
                </div>
                <button onClick={() => setShowModal(true)} className="flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold w-full sm:w-auto text-sm md:text-base">
                    <Plus className="w-5 h-5" />
                    File Grievance
                </button>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl p-2 border border-gray-100 shadow-sm mb-6 flex sm:inline-flex w-full sm:w-auto gap-2 overflow-x-auto">
                <button
                    onClick={() => setActiveTab('grievances')}
                    className={`flex-1 sm:flex-none whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'grievances' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                        }`}
                >
                    Grievances
                </button>
                <button
                    onClick={() => setActiveTab('exit')}
                    className={`flex-1 sm:flex-none whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'exit' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                        }`}
                >
                    Exit Management
                </button>
            </div>

            {activeTab === 'grievances' ? (
                <>
                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
                        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-gray-600">Total Grievances</span>
                                <AlertCircle className="w-5 h-5 text-blue-500" />
                            </div>
                            <div className="text-3xl font-bold text-black">{grievances.length}</div>
                        </div>
                        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-gray-600">Pending</span>
                                <Clock className="w-5 h-5 text-yellow-500" />
                            </div>
                            <div className="text-3xl font-bold text-black">{grievances.filter(g => g.status === 'Pending').length}</div>
                        </div>
                        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-gray-600">High Severity</span>
                                <AlertCircle className="w-5 h-5 text-red-500" />
                            </div>
                            <div className="text-3xl font-bold text-black">{grievances.filter(g => g.severity === 'High' && g.status !== 'Resolved').length}</div>
                        </div>
                        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-gray-600">Resolved</span>
                                <CheckCircle className="w-5 h-5 text-green-500" />
                            </div>
                            <div className="text-3xl font-bold text-black">{grievances.filter(g => g.status === 'Resolved').length}</div>
                        </div>
                    </div>

                    {/* Grievances Table */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto max-w-full">
                        <table className="w-full min-w-[1000px]">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase">ID</th>
                                    <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase">Employee</th>
                                    <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase">Category</th>
                                    <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase">Description</th>
                                    <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase">Severity</th>
                                    <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase">Filed On</th>
                                    <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase">Status</th>
                                    <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase">SLA</th>
                                    <th className="text-left py-4 px-6 text-xs font-semibold text-gray-600 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {grievances.map((grv) => (
                                    <tr key={grv.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="py-4 px-6"><span className="text-sm font-mono text-gray-700">{grv.id}</span></td>
                                        <td className="py-4 px-6">
                                            <div>
                                                <div className="text-sm font-semibold text-black">{grv.empName}</div>
                                                <div className="text-xs text-gray-600">{grv.empId}</div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6"><span className="text-sm text-gray-700">{grv.category}</span></td>
                                        <td className="py-4 px-6">
                                            <span
                                                onClick={() => {
                                                    setSelectedDescription(grv.description);
                                                    setShowDescriptionModal(true);
                                                }}
                                                className="text-sm text-sm text-gray-700 cursor-pointer hover:underline"
                                            >
                                                {grv.description.length > 30
                                                    ? grv.description.slice(0, 30) + '...'
                                                    : grv.description}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getSeverityColor(grv.severity)}`}>
                                                {grv.severity}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6"><span className="text-sm text-gray-700 whitespace-nowrap">{grv.filedOn}</span></td>
                                        <td className="py-4 px-6">
                                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(grv.status)}`}>
                                                {grv.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="text-xs">
                                                <span className="text-gray-600">{grv.sla}</span>
                                                {grv.daysElapsed > parseInt(grv.sla) && grv.status !== 'Resolved' && (
                                                    <div className="text-red-600 font-semibold">Overdue by {grv.daysElapsed - parseInt(grv.sla)} days</div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            {grv.status !== 'Resolved' && (
                                                <button onClick={() => handleResolve(grv)} className="p-1.5 bg-green-100 text-green-600 rounded hover:bg-green-200 transition-colors" title="Mark Resolved">
                                                    <CheckCircle className="w-4 h-4" />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            ) : (
                <>
                    {/* Exit Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-gray-600">Total Resignations</span>
                                <LogOut className="w-5 h-5 text-blue-500" />
                            </div>
                            <div className="text-3xl font-bold text-black">12</div>
                        </div>

                        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-gray-600">Pending Interviews</span>
                                <MessageSquare className="w-5 h-5 text-yellow-500" />
                            </div>
                            <div className="text-3xl font-bold text-black">5</div>
                        </div>

                        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-gray-600">Settlement Pending</span>
                                <DollarSign className="w-5 h-5 text-red-500" />
                            </div>
                            <div className="text-3xl font-bold text-black">3</div>
                        </div>

                        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-gray-600">This Month Exits</span>
                                <CheckCircle className="w-5 h-5 text-green-500" />
                            </div>
                            <div className="text-3xl font-bold text-black">4</div>
                        </div>
                    </div>

                    {/* Exit Actions */}
                    <div className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm">
                        <div className="text-center mb-8">
                            <LogOut className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="font-bold text-black mb-2">Exit Management</h3>
                            <p className="text-sm text-gray-600">
                                Process employee resignations, conduct exit interviews, generate relieving letters,
                                and manage final settlement calculations.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                            <button className="p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-blue-600 hover:bg-blue-50 transition-all cursor-pointer active:scale-95">
                                <MessageSquare className="w-6 h-6 text-blue-600 mb-3" />
                                <div className="text-sm font-semibold text-black mb-1">Exit Interview</div>
                                <div className="text-xs text-gray-600">Conduct exit interview</div>
                            </button>

                            <button className="p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-blue-600 hover:bg-blue-50 transition-all cursor-pointer active:scale-95">
                                <DollarSign className="w-6 h-6 text-green-600 mb-3" />
                                <div className="text-sm font-semibold text-black mb-1">Final Settlement</div>
                                <div className="text-xs text-gray-600">Calculate settlement</div>
                            </button>

                            <button className="p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-blue-600 hover:bg-blue-50 transition-all cursor-pointer active:scale-95">
                                <FileText className="w-6 h-6 text-purple-600 mb-3" />
                                <div className="text-sm font-semibold text-black mb-1">Generate Letter</div>
                                <div className="text-xs text-gray-600">Relieving & Experience</div>
                            </button>
                        </div>
                    </div>
                </>
            )

            }
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 sm:p-8">
                    <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl max-h-[90vh] flex flex-col overflow-hidden" onClick={(e) => e.stopPropagation()}>
                        <div className="p-4 sm:p-6 border-b border-gray-200 shrink-0">
                            <h2 className="font-bold text-black text-lg sm:text-xl">File Grievance</h2>
                            <p className="text-xs sm:text-sm text-gray-600 mt-1">Submit a formal grievance for investigation</p>
                        </div>
                        <div className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-2">EMPLOYEE ID *</label>
                                    <input
                                        type="text"
                                        value={formData.empId}
                                        onChange={(e) => setFormData({ ...formData, empId: e.target.value })}
                                        placeholder="e.g., EMP/MUM/2024/0001"
                                        className={`w-full px-4 py-3 bg-gray-50 border rounded-lg text-sm focus:outline-none focus:ring-2 transition ${errors.empId ? 'border-red-500 focus:ring-red-300' : 'border-gray-200 focus:ring-blue-400'
                                            }`}
                                    />
                                    {errors.empId && <p className="text-red-600 text-xs mt-1">{errors.empId}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-2">EMPLOYEE NAME *</label>
                                    <input
                                        type="text"
                                        value={formData.empName}
                                        onChange={(e) => setFormData({ ...formData, empName: e.target.value })}
                                        placeholder="e.g., Rajesh Kumar"
                                        className={`w-full px-4 py-3 bg-gray-50 border rounded-lg text-sm focus:outline-none focus:ring-2 transition ${errors.empName ? 'border-red-500 focus:ring-red-300' : 'border-gray-200 focus:ring-blue-400'
                                            }`}
                                    />
                                    {errors.empName && <p className="text-red-600 text-xs mt-1">{errors.empName}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-2">CATEGORY *</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className={`w-full px-4 py-3 bg-gray-50 border rounded-lg text-sm focus:outline-none focus:ring-2 transition ${errors.category ? 'border-red-500 focus:ring-red-300' : 'border-gray-200 focus:ring-blue-400'
                                            }`}
                                    >
                                        <option value="Work Environment">Work Environment</option>
                                        <option value="Workplace Harassment">Workplace Harassment</option>
                                        <option value="Salary Related">Salary Related</option>
                                        <option value="Leave Related">Leave Related</option>
                                        <option value="Manager Conflict">Manager Conflict</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    {errors.category && <p className="text-red-600 text-xs mt-1">{errors.category}</p>}
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-2">SEVERITY *</label>
                                    <select
                                        value={formData.severity}
                                        onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
                                        className={`w-full px-4 py-3 bg-gray-50 border rounded-lg text-sm focus:outline-none focus:ring-2 transition ${errors.severity ? 'border-red-500 focus:ring-red-300' : 'border-gray-200 focus:ring-blue-400'
                                            }`}
                                    >
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                    </select>
                                    {errors.severity && <p className="text-red-600 text-xs mt-1">{errors.severity}</p>}
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-2">DESCRIPTION * ({formData.description.length}/500)</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Describe the grievance in detail..."
                                    rows="4"
                                    className={`w-full px-4 py-3 bg-gray-50 border rounded-lg text-sm focus:outline-none focus:ring-2 transition ${errors.description ? 'border-red-500 focus:ring-red-300' : 'border-gray-200 focus:ring-blue-400'
                                        }`}
                                />
                                {errors.description && <p className="text-red-600 text-xs mt-1">{errors.description}</p>}
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 p-4 sm:p-6 border-t border-gray-200 bg-gray-50 shrink-0">
                            <button onClick={() => { setShowModal(false); setErrors({}); }} className="w-full sm:w-auto px-5 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors">
                                Cancel
                            </button>
                            <button onClick={handleSubmitGrievance} className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                                File Grievance
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Description Details Modal */}
            {showDescriptionModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 sm:p-8">
                    <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl max-h-[90vh] flex flex-col overflow-hidden" onClick={(e) => e.stopPropagation()}>
                        <div className="p-4 sm:p-6 border-b border-gray-200 shrink-0">
                            <h2 className="font-bold text-black text-lg sm:text-xl">Grievance Description</h2>
                        </div>
                        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
                            <p className="text-sm text-gray-700 whitespace-pre-wrap break-words">
                                {selectedDescription}
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 p-4 sm:p-6 border-t border-gray-200 bg-gray-50 shrink-0">
                            <button onClick={() => setShowDescriptionModal(false)} className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}