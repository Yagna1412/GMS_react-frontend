import React from "react";
import { Download } from "lucide-react";

function InvoiceRow({ invoice, onDownload, onPayNow }) {
  return (
    <div className="grid grid-cols-5 px-6 py-4 border-t items-center text-sm border-slate-200 text-slate-700">

      {/* INVOICE NUMBER */}
      <div className="font-medium">{invoice.invoiceNumber || "N/A"}</div>

      {/* DATE */}
      <div className="text-slate-600">{invoice.serviceDate || "N/A"}</div>

      {/* AMOUNT */}
      <div className="font-semibold">
        ${(invoice.totalAmount || 0).toFixed(2)}
      </div>

      {/* STATUS BADGE */}
      <div>
        <span
          className={
            invoice.status?.toUpperCase() === "PAID"
              ? "px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700"
              : "px-3 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700"
          }>
          {invoice.status || "PENDING"}
        </span>
      </div>

      {/* ACTIONS */}
      <div className="flex justify-end items-center gap-3">

        {/* DOWNLOAD BUTTON → opens modal */}
        <button
          onClick={() => onDownload(invoice)}
          className="w-9 h-9 rounded-lg flex items-center justify-center transition bg-blue-100 text-blue-500 hover:bg-blue-500 hover:text-white"
          title="View & Download Invoice">
          <Download size={16} />
        </button>

        {/* PAY NOW */}
        {invoice.status?.toUpperCase() !== "PAID" && (
          <button
            onClick={() => onPayNow(invoice)}
            className="text-white text-sm font-semibold px-4 py-1.5 rounded-lg transition hover:opacity-90 bg-blue-600">
            Pay Now
          </button>
        )}
      </div>
    </div>
  );
}

export default InvoiceRow;