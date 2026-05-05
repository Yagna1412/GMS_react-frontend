import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export const ReviewBooking = ({
  selectedBranch,
  selectedDate,
  selectedTime,
  selectedServices,
  totalAmount
}) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC]p-4 md:p-8 space-y-8 text-center">
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 size={48} />
        </div>
        <h2 className="text-3xl font-bold text-[#1E3A8A]">Review Booking</h2>
        <p className="text-[#64748B] mt-2">Please review your appointment details before confirming.</p>
      </div>

      <div className="bg-white rounded-2xl  border border-[#BFDBFE] overflow-hidden text-left max-w-2xl mx-auto shadow-sm">
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-start pb-4 border-b border-[#BFDBFE]/50">
            <span className="text-[#64748B] font-medium">Branch</span>
            <div className="text-right">
              <p className="font-bold text-[#1E3A8A]">{selectedBranch?.name}</p>
              <p className="text-xs text-[#64748B]">{selectedBranch?.address}</p>
            </div>
          </div>
          <div className="flex justify-between items-start pb-4 border-b border-[#BFDBFE]/50">
            <span className="text-[#64748B] font-medium">Date & Time</span>
            <span className="font-bold text-[#1E3A8A] text-right">
              {selectedDate} at {selectedTime}
            </span>
          </div>
          <div className="flex justify-between items-start pb-4 border-b border-[#BFDBFE]/50">
            <span className="text-[#64748B] font-medium">Services</span>
            <div className="text-right">
              {selectedServices.map(s => (
                <p key={s.id} className="font-bold text-[#1E3A8A]">
                  {s.title} (${s.price})
                </p>
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center pt-4">
            <span className="text-xl font-bold text-[#1E3A8A]">Total</span>
            <span className="text-3xl font-black text-[#2563EB]">${totalAmount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewBooking;
