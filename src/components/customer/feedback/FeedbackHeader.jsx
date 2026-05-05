import React from 'react';

const FeedbackHeader = ({ setShowModal, setShowTicketModal }) => {
  return (
    <div className="flex justify-between items-center mb-8 gap-4">
      <h1 className="text-3xl font-bold text-[#1F2937]">
        Support & Feedback
      </h1>

      <div className="flex gap-3">
        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-2.5 border-2 border-[#D1D5DB] rounded-lg text-[#374151] font-semibold hover:bg-[#F9FAFB] transition"
        >
          ⭐ Rate Service
        </button>

        <button  
          onClick={() => setShowTicketModal(true)}
          className="px-5 py-2.5 bg-[#2563EB] text-white rounded-lg font-semibold hover:bg-[#1D4ED8] transition"
        >
          + New Ticket
        </button>
      </div>
    </div>
  )
}

export default FeedbackHeader