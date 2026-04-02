import React, { useState } from "react";
import axios from "axios";

const PAYMENT_METHODS = ["Credit Card", "Google Pay", "Apple Pay", "Net Banking"];

function PaymentModal({ invoice, onClose, onSuccess }) {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }
    try {
      setLoading(true);
      await axios.post(`http://localhost:8080/api/invoices/${invoice.id}/pay`, {
        paymentMethod: paymentMethod,
      });
      const txn = "TXN-" + Math.floor(Math.random() * 1000000);
      onSuccess(txn);
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="w-full max-w-[420px] rounded-xl p-8 bg-white">

        <div className="flex justify-between items-center mb-1">
          <h2 className="text-xl font-bold text-slate-800">Make Payment</h2>
          <button onClick={onClose} className="transition hover:opacity-60 text-slate-500">✕</button>
        </div>

        <p className="text-sm mb-4 text-slate-500">
          Select payment method for ${(invoice?.totalAmount || 0).toFixed(2)}
        </p>

        <div className="flex flex-col gap-3 mb-5">
          {PAYMENT_METHODS.map((method) => (
            <label key={method}
              className="flex items-center gap-3 border p-3 rounded-lg cursor-pointer transition text-sm border-slate-300 text-slate-700 hover:bg-slate-50">
              <input type="radio" name="payment" value={method}
                onChange={(e) => setPaymentMethod(e.target.value)} />
              {method}
            </label>
          ))}
        </div>

        <button onClick={handlePay} disabled={loading}
          className={`w-full text-white py-3 rounded-lg font-bold text-sm transition hover:opacity-90 ${loading ? 'bg-blue-300' : 'bg-blue-600'}`}>
          {loading ? "Processing..." : "Pay"}
        </button>

      </div>
    </div>
  );
}

export default PaymentModal;