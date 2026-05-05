import React from 'react';
import { Clock, Check } from 'lucide-react';

export const ServiceSelection = ({ selectedBranch, services, selectedServices, toggleService, totalAmount }) => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#1E3A8A]">Choose Services</h2>
        <div className="text-sm text-[#64748B] bg-blue-50 px-3 py-1 rounded-full border border-[#BFDBFE]">
          {selectedBranch?.name}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service) => {
          const isSelected = selectedServices.some(s => s.id === service.id);
          return (
            <button
              key={service.id}
              onClick={() => toggleService(service)}
              className={`flex items-center p-6 rounded-2xl border-2 transition-all duration-200 group ${
                isSelected
                  ? 'border-[#2563EB] bg-blue-50/50 shadow-sm'
                  : 'border-[#BFDBFE] hover:border-[#2563EB]/30 hover:bg-slate-50'
              }`}
            >
              <div className={`w-6 h-6 rounded-lg border-2 mr-4 flex items-center justify-center transition-colors ${
                isSelected ? 'bg-[#2563EB] border-[#2563EB] text-white' : 'border-[#BFDBFE] bg-white'
              }`}>
                {isSelected && <Check size={14} strokeWidth={3} />}
              </div>
              <div className="flex-grow text-left">
                <h3 className="font-bold text-[#1E3A8A]">{service.title}</h3>
                <div className="flex items-center gap-1 text-[#64748B] text-sm">
                  <Clock size={14} />
                  {service.duration}
                </div>
              </div>
              <div className="text-lg font-bold text-[#1E3A8A]">
                ${service.price}
              </div>
            </button>
          );
        })}
      </div>
      <div className="bg-blue-50/50 p-6 rounded-2xl flex justify-between items-center border border-[#BFDBFE]">
        <span className="text-[#64748B] font-medium">Estimated Total</span>
        <span className="text-2xl font-bold text-[#1E3A8A]">${totalAmount}</span>
      </div>
    </div>
  );
};
