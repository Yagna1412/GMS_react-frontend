import React, { useState } from 'react';

const NewTicketModal = ({ onClose, onSubmit }) => {
  const [issueType, setIssueType] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (!description.trim() || !issueType) return;

    const newTicket = {
      id: Date.now(),
      issue: issueType,
      date: new Date().toISOString().split("T")[0],
      status: "Open",
      description: description,
    };

    onSubmit(newTicket);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className="bg-white w-full max-w-md rounded-2xl p-8 shadow-2xl">
        <h2 className="text-2xl font-bold text-[#1E3A8A] mb-2">Submit a Support Ticket</h2>
        <p className="text-[#64748B] text-sm mb-6">Tell us what's going on and we'll help you out</p>

        <div className="mb-5">
          <label className="block mb-2 text-sm font-semibold text-[#1E3A8A]">
            Issue Type
          </label>
          <select
            value={issueType}
            onChange={(e) => setIssueType(e.target.value)}
            className="w-full border-2 border-[#BFDBFE] rounded-lg p-3 focus:outline-none focus:border-[#2563EB] transition text-[#1E3A8A] font-medium"
          >
            <option value="">Select an issue type...</option>
            <option value="Billing Issue">💳 Billing Issue</option>
            <option value="Service Delay">⏰ Service Delay</option>
            <option value="Technical Problem">🔧 Technical Problem</option>
            <option value="Quality Concern">⚠️ Quality Concern</option>
            <option value="Other">❓ Other</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-semibold text-[#1E3A8A]">
            Description
          </label>
          <textarea
            placeholder="Describe your issue in detail..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border-2 border-[#BFDBFE] rounded-lg p-3 h-32 focus:outline-none focus:border-[#2563EB] transition resize-none"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 text-[#64748B] font-semibold hover:bg-[#F0F9FF] rounded-lg transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-[#2563EB] text-white font-semibold rounded-lg hover:bg-[#1D4ED8] transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!issueType || !description.trim()}
          >
            Open Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewTicketModal;