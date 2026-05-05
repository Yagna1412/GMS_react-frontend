import React from "react";

function SuccessModal({ transactionId, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="w-full max-w-[520px] rounded-3xl overflow-hidden shadow-xl bg-white">

        <div className="flex justify-between items-center px-8 py-5 border-b bg-blue-50 border-blue-200">
          <h2 className="text-lg font-bold text-slate-800">Payment Successful</h2>
          <button onClick={onClose} className="transition hover:opacity-60 text-slate-500">✕</button>
        </div>

        <div className="px-10 py-10 text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 bg-green-100">
            <span className="text-3xl text-green-700">✓</span>
          </div>

          <h3 className="text-2xl font-bold mb-2 text-slate-800">Payment Confirmed!</h3>
          <p className="text-sm mb-1 text-slate-500">Transaction ID: #{transactionId}</p>
          <p className="text-sm text-slate-500">A receipt has been sent to your email.</p>

          <button onClick={onClose}
            className="mt-6 w-full text-white py-3 rounded-xl text-sm font-bold transition hover:opacity-90 bg-blue-600">
            Done
          </button>
        </div>

      </div>
    </div>
  );
}

export default SuccessModal;