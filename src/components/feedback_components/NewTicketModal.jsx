import { useState, useEffect } from "react";
import { MdAttachFile } from "react-icons/md";

const NewTicketModal = ({
  onClose,
  onSubmit,
  isEditing = false,
  initialIssueType = "",
  initialDescription = ""
}) => {

  const [issueType, setIssueType] = useState(initialIssueType);
  const [description, setDescription] = useState(initialDescription);
  const [attachedFile, setAttachedFile] = useState(null);

  useEffect(() => {
    setIssueType(initialIssueType);
    setDescription(initialDescription);
  }, [initialIssueType, initialDescription]);

  const handleFileChange = (e) => {
    setAttachedFile(e.target.files[0]);
  };

  const handleSubmit = () => {
    if (!description.trim()) return;

    const ticketData = {
      issue: issueType || "Billing Issue",
      description,
    };

    onSubmit(ticketData);

    setIssueType("");
    setDescription("");
    setAttachedFile(null);
    onClose();
  };

  return (
    // 🔹 Overlay with blur + click outside close
    <div
      className="fixed inset-0 backdrop-blur-sm bg-black/30 flex justify-center items-center z-50"
      onClick={onClose}
    >

      {/* 🔹 Modal Card */}
      <div
        className="bg-white w-full max-w-[500px] rounded-2xl p-8 shadow-xl transform transition-all duration-300 scale-100"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >

        <h2 className="text-xl font-semibold mb-6 text-gray-900">
          {isEditing ? "Edit Ticket" : "Submit a Ticket"}
        </h2>

        {/* Issue Type */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Issue Type
          </label>

          <select
            value={issueType}
            onChange={(e) => setIssueType(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:ring-2 focus:ring-blue-400 outline-none"
          >
            <option value="Billing Issue">Billing Issue</option>
            <option value="Service Delay">Service Delay</option>
            <option value="Technical Problem">Technical Problem</option>
          </select>
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Description
          </label>

          <textarea
            placeholder="Describe your issue in detail..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 h-28 text-gray-800 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* File Upload */}
        <div className="mb-6">
          <label className="flex flex-col items-center justify-center w-full h-20 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 bg-gray-50 transition">

            <MdAttachFile size={24} className="text-gray-500 mb-1" />

            <span className="text-xs text-gray-500">
              Attach screenshots or documents (optional)
            </span>

            <input
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          {attachedFile && (
            <p className="mt-2 text-xs text-gray-500">
              ✓ {attachedFile.name}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="text-gray-500 font-medium hover:text-gray-800"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {isEditing ? "Update Ticket" : "Open Ticket"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default NewTicketModal;