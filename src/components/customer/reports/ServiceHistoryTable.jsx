import { useState, useMemo } from "react";
import { FileText, Pencil, Trash2, Filter, Loader2 } from "lucide-react";

const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-8">
    <div className="relative w-8 h-8">
      <div className="absolute inset-0 border-4 border-[#BFDBFE] rounded-full"></div>
      <div className="absolute inset-0 border-4 border-transparent border-t-[#2563EB] rounded-full animate-spin"></div>
    </div>
  </div>
);

const ErrorMessage = ({ message, onRetry }) => (
  <div className="bg-red-50 border border-red-200 rounded-xl p-6">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-red-900 font-semibold mb-1">Error</h3>
        <p className="text-red-700 text-sm">{message || "Something went wrong."}</p>
      </div>
      {onRetry && (
        <button onClick={onRetry}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-medium">
          Retry
        </button>
      )}
    </div>
  </div>
);

export default function ServiceHistoryTable({
  services,
  onDelete,
  onRating,
  onViewReceipt,
  onUpdate,
  loading = false,
  error = null,
  onRetry = null,
  isDeleting = {},
  isUpdating = {},
}) {
  const [visible, setVisible] = useState(3);
  const [sort, setSort] = useState("");
  const [showSort, setShowSort] = useState(false);
  const [viewItem, setViewItem] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [actionError, setActionError] = useState(null);

  const servicesData = useMemo(() =>
    (services ?? []).map(s => ({
      ...s,
      service: s.serviceName ?? s.service ?? "",
      date: s.serviceDate ?? s.date ?? "",
    })),
  [services]);

  const sortedServices = [...servicesData].sort((a, b) => {
    if (sort === "date_new") return new Date(b.date) - new Date(a.date);
    if (sort === "date_old") return new Date(a.date) - new Date(b.date);
    if (sort === "amount_high") return b.amount - a.amount;
    if (sort === "amount_low") return a.amount - b.amount;
    return 0;
  });

  const updateRating = async (id, value) => {
    setActionError(null);
    const success = await onRating?.(id, value);
    if (!success) setActionError("Failed to update rating.");
  };

  const deleteService = async (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      setActionError(null);
      const success = await onDelete?.(id);
      if (!success) setActionError("Failed to delete service.");
    }
  };

  const handleView = async (item) => {
    if (onViewReceipt) {
      const receipt = await onViewReceipt(item.id);
      setViewItem(receipt ? { ...item, ...receipt } : item);
    } else {
      setViewItem(item);
    }
  };

  const saveEdit = async () => {
    setActionError(null);
    const success = await onUpdate?.(editItem.id, {
      serviceName: editItem.service,
      branch: editItem.branch,
      amount: Number(editItem.amount),
      rating: editItem.rating ?? 0,
    });
    if (success) setEditItem(null);
    else setActionError("Failed to save changes.");
  };

  return (
    <div>
      {actionError && (
        <div className="mb-4">
          <ErrorMessage message={actionError} onRetry={() => setActionError(null)} />
        </div>
      )}

      <div className="bg-white border border-[#BFDBFE] rounded-xl overflow-hidden">

        <div className="px-6 py-4 border-b border-[#BFDBFE] flex justify-between items-center">
          <h2 className="text-[#1E3A8A] font-semibold text-lg">Service History</h2>
          <div className="relative">
            <button
              onClick={() => setShowSort(!showSort)}
              className="p-2 border border-gray-300 rounded hover:bg-gray-100">
              <Filter size={18} className="text-[#1E3A8A]" />
            </button>
            {showSort && (
              <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded shadow w-44 text-sm z-10">
                {[
                  { label: "Newest Date", value: "date_new" },
                  { label: "Oldest Date", value: "date_old" },
                  { label: "Amount High → Low", value: "amount_high" },
                  { label: "Amount Low → High", value: "amount_low" },
                ].map(opt => (
                  <button key={opt.value}
                    onClick={() => { setSort(opt.value); setShowSort(false); }}
                    className="block w-full text-left px-3 py-2 hover:bg-gray-100">
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-[#E2E8F0] text-[#1E3A8A] uppercase text-xs">
            <tr>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Service</th>
              <th className="px-6 py-3 text-left">Branch</th>
              <th className="px-6 py-3 text-left">Amount</th>
              <th className="px-6 py-3 text-left">Rating</th>
              <th className="px-6 py-3 text-left">Receipt</th>
            </tr>
          </thead>
          <tbody className="divide-y">

            {loading && (
              <tr>
                <td colSpan={6} className="py-8">
                  <LoadingSpinner />
                </td>
              </tr>
            )}

            {/* ✅ FIXED HERE */}
            {!loading && error && (
              <tr>
                <td colSpan={6} className="text-center py-8 text-[#64748B]">
                  No service history found for the selected period.
                </td>
              </tr>
            )}

            {!loading && !error && servicesData.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-8 text-[#64748B]">
                  No service history found for the selected period.
                </td>
              </tr>
            )}

            {!loading && !error && sortedServices.slice(0, visible).map(item => (
              <tr key={item.id}
                className={`bg-white ${isDeleting[item.id] ? "opacity-50" : ""}`}>
                <td className="px-6 py-4 text-[#1E3A8A]">{item.date}</td>
                <td className="px-6 py-4 text-[#64748B]">{item.service}</td>
                <td className="px-6 py-4 text-[#64748B]">{item.branch}</td>
                <td className="px-6 py-4 text-[#2563EB] font-medium">${item.amount}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-1 text-[#F59E0B] text-2xl cursor-pointer">
                    {[1, 2, 3, 4, 5].map(star => (
                      <span key={star}
                        onClick={() => !isUpdating[item.id] && updateRating(item.id, star)}
                        className={!isUpdating[item.id] ? "" : "opacity-50 cursor-not-allowed"}>
                        {star <= (item.rating || 0) ? "★" : "☆"}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-6 items-center text-sm">
                    <button onClick={() => handleView(item)}
                      className="flex items-center gap-1 text-[#2563EB] hover:text-[#1E40AF] disabled:opacity-50"
                      disabled={isDeleting[item.id] || isUpdating[item.id]}>
                      <FileText size={16} /> View
                    </button>
                    <button onClick={() => setEditItem({ ...item })}
                      className="flex items-center gap-1 text-green-600 hover:text-green-700 disabled:opacity-50"
                      disabled={isDeleting[item.id] || isUpdating[item.id]}>
                      <Pencil size={16} /> Edit
                    </button>
                    <button onClick={() => deleteService(item.id)}
                      className="flex items-center gap-1 text-red-600 hover:text-red-700 disabled:opacity-50"
                      disabled={isDeleting[item.id] || isUpdating[item.id]}>
                      {isDeleting[item.id]
                        ? <Loader2 size={16} className="animate-spin" />
                        : <Trash2 size={16} />}
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!loading && !error && visible < sortedServices.length && (
          <div className="text-center py-4 border-t">
            <button onClick={() => setVisible(v => v + 3)}
              className="text-[#2563EB] hover:text-[#1E40AF]">
              Load More
            </button>
          </div>
        )}
      </div>

      {/* VIEW MODAL */}
      {viewItem && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[420px]">
            <h2 className="text-lg font-semibold text-[#1E3A8A] mb-4">Invoice</h2>
            <p className="mb-2"><strong>Date:</strong> {viewItem.date}</p>
            <p className="mb-2"><strong>Service:</strong> {viewItem.service}</p>
            <p className="mb-2"><strong>Branch:</strong> {viewItem.branch}</p>
            <p className="mb-4"><strong>Amount:</strong> ${viewItem.amount}</p>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => window.print()}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Print
              </button>
              <button onClick={() => setViewItem(null)}
                className="px-4 py-2 border rounded hover:bg-gray-50">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editItem && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[400px]">
            <h3 className="text-lg font-semibold mb-4">Edit Service</h3>
            <input type="text" placeholder="Service Name"
              value={editItem.service}
              onChange={(e) => setEditItem({ ...editItem, service: e.target.value })}
              className="border p-2 w-full mb-3 rounded" />
            <input type="text" placeholder="Branch"
              value={editItem.branch}
              onChange={(e) => setEditItem({ ...editItem, branch: e.target.value })}
              className="border p-2 w-full mb-3 rounded" />
            <input type="number" placeholder="Amount"
              value={editItem.amount}
              onChange={(e) => setEditItem({ ...editItem, amount: Number(e.target.value) })}
              className="border p-2 w-full mb-3 rounded" />
            <div className="mb-4">
              <label className="text-sm text-[#64748B] mb-2 block">Rating</label>
              <input type="number" placeholder="Rating (1-5)" min="0" max="5"
                value={editItem.rating ?? 0}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setEditItem({ ...editItem, rating: val >= 0 && val <= 5 ? val : editItem.rating });
                }}
                className="border p-2 w-full rounded" />
            </div>
            <div className="flex justify-end gap-3">
              <button onClick={() => setEditItem(null)}
                className="px-4 py-2 border rounded hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={saveEdit}
                disabled={isUpdating[editItem?.id]}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 flex items-center gap-2">
                {isUpdating[editItem?.id] && <Loader2 size={14} className="animate-spin" />}
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}