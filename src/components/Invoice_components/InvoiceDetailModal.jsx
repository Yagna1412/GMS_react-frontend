import React from "react";
import { FiPrinter, FiShare2, FiDownload } from "react-icons/fi";
import generateStatementPDF from "./utils/generateStatementPDF";

function InvoiceDetailModal({ invoice, onClose }) {

  // ── Print ───────────────────────────────────────────────
  const printInvoice = () => window.print();

  // ── Download PDF ────────────────────────────────────────
  const downloadPDF = () => {
    console.log("Downloading PDF for:", invoice);
    generateStatementPDF([invoice], `Invoice-${invoice.invoiceNumber}.pdf`);
  };

  // ── Share ───────────────────────────────────────────────
  const shareInvoice = () => {
    const text = `Invoice: ${invoice.invoiceNumber}\nCustomer: ${invoice.customerName}\nAmount: $${invoice.totalAmount}\nDate: ${invoice.serviceDate}`;
    if (navigator.share) {
      navigator.share({ title: "Invoice Details", text });
    } else {
      navigator.clipboard.writeText(text);
      alert("Invoice details copied to clipboard!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="w-full max-w-[650px] rounded-xl p-8 bg-white">

        {/* HEADER */}
        <div className="flex justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-800">
            Invoice Details
          </h2>
          <button onClick={onClose}
            className="transition hover:opacity-60 text-slate-500">✕
          </button>
        </div>

        {/* CUSTOMER & INVOICE INFO */}
        <div className="flex justify-between mb-6">
          <div>
            <p className="text-sm text-slate-500">Invoice To</p>
            <h3 className="font-bold text-lg text-slate-800">
              {invoice.customerName || "Customer"}
            </h3>
            <p className="text-sm text-slate-500">
              {invoice.customerAddress || ""}
            </p>
            <p className="text-sm text-slate-500">
              {invoice.customerPhone || ""}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-500">Invoice #</p>
            <h3 className="font-bold text-lg text-slate-800">
              {invoice.invoiceNumber || "N/A"}
            </h3>
            <p className="text-sm text-slate-500">
              {invoice.serviceDate || ""}
            </p>
          </div>
        </div>

        {/* VEHICLE INFO */}
        <div className="mb-4 p-3 rounded-lg bg-slate-50 border border-slate-200">
          <p className="text-sm font-semibold mb-1 text-blue-900">
            Vehicle Details
          </p>
          <p className="text-sm text-slate-500">
            {invoice.vehicleName || "N/A"} — {invoice.vehicleNumber || "N/A"}
          </p>
          <p className="text-sm text-slate-500">
            {invoice.serviceType || "N/A"} at {invoice.serviceLocation || "N/A"}
          </p>
        </div>

        {/* CHARGES TABLE */}
        <table className="w-full rounded-lg overflow-hidden border border-slate-200">
          <thead>
            <tr className="bg-slate-100 text-slate-800">
              <th className="p-3 text-left text-sm font-bold">Description</th>
              <th className="p-3 text-left text-sm font-bold">Cost</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-slate-200">
              <td className="p-3 text-sm text-slate-700">Service Charge</td>
              <td className="p-3 text-sm text-slate-700">
                ${(invoice.serviceCharge || 0).toFixed(2)}
              </td>
            </tr>
            <tr className="border-t border-slate-200">
              <td className="p-3 text-sm text-slate-700">Labor Charge</td>
              <td className="p-3 text-sm text-slate-700">
                ${(invoice.laborCharge || 0).toFixed(2)}
              </td>
            </tr>
            <tr className="border-t font-bold border-slate-200">
              <td className="p-3 text-sm text-slate-800">Total</td>
              <td className="p-3 text-sm text-slate-800">
                ${(invoice.totalAmount || 0).toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>

        {/* PAYMENT INFO */}
        <div className="mt-4 p-3 rounded-lg bg-slate-50 border border-slate-200">
          <p className="text-sm font-semibold mb-1 text-blue-900">
            Payment Details
          </p>
          <p className="text-sm text-slate-500">
            Method: {invoice.paymentMethod || "N/A"}
          </p>
          <p className="text-sm text-slate-500">
            Date: {invoice.paymentDate || "N/A"}
          </p>
          <p className="text-sm text-slate-500">
            Status: {invoice.status || "N/A"}
          </p>
        </div>

        {/* FOOTER ACTIONS */}
        <div className="flex justify-end gap-4 mt-6">

          {/* PRINT */}
          <button onClick={printInvoice}
            className="flex items-center gap-2 border px-4 py-2 rounded-lg text-sm font-semibold transition hover:opacity-80 border-slate-300 text-slate-700">
            <FiPrinter /> Print
          </button>

          {/* DOWNLOAD PDF */}
          <button onClick={downloadPDF}
            className="flex items-center gap-2 border px-4 py-2 rounded-lg text-sm font-semibold transition hover:opacity-80 border-slate-300 text-slate-700">
            <FiDownload /> Download
          </button>

          {/* SHARE */}
          <button onClick={shareInvoice}
            className="flex items-center gap-2 text-white px-4 py-2 rounded-lg text-sm font-semibold transition hover:opacity-90 bg-blue-600">
            <FiShare2 /> Share
          </button>

        </div>
      </div>
    </div>
  );
}

export default InvoiceDetailModal;