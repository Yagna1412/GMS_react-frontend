import React from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

export const NavigationButtons = ({ step, prevStep, nextStep, isNextDisabled, onConfirm }) => {
  return (
    <div className="p-6 md:p-10 border-t border-[#BFDBFE] bg-blue-50/20 flex justify-between items-center">
      <button
        onClick={prevStep}
        disabled={step === 1}
        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
          step === 1 
            ? 'text-[#64748B]/50 cursor-not-allowed' 
            : 'text-[#64748B] hover:text-[#1E3A8A] bg-white border border-[#BFDBFE] shadow-sm'
        }`}
      >
        <ChevronLeft size={20} />
        Back
      </button>

      {step < 4 ? (
        <button
          onClick={nextStep}
          disabled={isNextDisabled}
          className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-bold transition-all shadow-lg ${
            isNextDisabled
              ? 'bg-[#3B82F6]/40 text-white cursor-not-allowed'
              : 'bg-[#2563EB] text-white hover:bg-blue-700 shadow-[#2563EB]/20'
          }`}
        >
          Next Step
          <ChevronRight size={20} />
        </button>
      ) : (
        <button
          onClick={onConfirm}
          className="flex items-center gap-2 px-8 py-4 rounded-2xl font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20"
        >
          Confirm Booking
          <Check size={20} />
        </button>
      )}
    </div>
  );
};
