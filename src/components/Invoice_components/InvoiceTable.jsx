import React, { useState, useEffect } from "react";
import axios from "axios";
import InvoiceRow from "./InvoiceRow";
import InvoiceDetailModal from "./InvoiceDetailModal";
import PaymentModal from "./PaymentModal";
import SuccessModal from "./SuccessModal";

function InvoiceTable() {
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [paymentInvoice, setPaymentInvoice] = useState(null);
  const [transactionId, setTransactionId] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [invoicesData, setInvoicesData] = useState([]);

  // ── Fetch All Invoices ──────────────────────────────────
  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/invoices"); // ← capital I
      setInvoicesData(response.data);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  // ── Click Download → Fetch Detail → Open Modal ──────────
  const handleDownload = async (invoice) => {
    try {
      console.log("Fetching invoice with id:", invoice.id);
      const response = await axios.get(
        `http://localhost:8080/api/invoices/${invoice.id}/download` // ← capital I
      );
      console.log("Invoice detail:", response.data);
      setSelectedInvoice(response.data); // ← opens modal
    } catch (error) {
      console.error("Error fetching invoice detail:", error);
      alert("Could not load invoice details. Please try again.");
    }
  };

  const handlePayNow = (invoice) => setPaymentInvoice(invoice);

  // ── Refresh After Payment ───────────────────────────────
  const handlePaymentSuccess = async (txn) => {
    setTransactionId(txn);
    setPaymentInvoice(null);
    setShowSuccess(true);
    await fetchInvoices();
  };

  return (
    <>
      <div className="rounded-xl border shadow-sm overflow-hidden bg-white border-blue-200">

        {/* TABLE HEADER */}
        <div className="grid grid-cols-5 text-xs font-bold px-6 py-4 border-b bg-white text-slate-600 border-slate-200 uppercase tracking-wider">
          <div>INVOICE #</div>
          <div>DATE</div>
          <div>AMOUNT</div>
          <div>STATUS</div>
          <div className="text-right">ACTIONS</div>
        </div>

        {/* TABLE ROWS */}
        <div className="overflow-x-auto">
          {invoicesData.length === 0 ? (
            <p className="text-center py-8 text-sm text-slate-500">
              No invoices found.
            </p>
          ) : (
            invoicesData.map((invoice) => (
              <InvoiceRow
                key={invoice.invoiceNumber}
                invoice={invoice}
                onDownload={handleDownload}
                onPayNow={handlePayNow}
              />
            ))
          )}
        </div>
      </div>

      {/* MODALS */}
      {selectedInvoice && (
        <InvoiceDetailModal
          invoice={selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
        />
      )}
      {paymentInvoice && (
        <PaymentModal
          invoice={paymentInvoice}
          onClose={() => setPaymentInvoice(null)}
          onSuccess={handlePaymentSuccess}
        />
      )}
      {showSuccess && (
        <SuccessModal
          transactionId={transactionId}
          onClose={() => setShowSuccess(false)}
        />
      )}
    </>
  );
}

export default InvoiceTable;