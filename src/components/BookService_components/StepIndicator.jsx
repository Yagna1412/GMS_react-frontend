import { Check } from 'lucide-react';

export const StepIndicator = ({ currentStep }) => {
  const steps = [
    { id: 1, label: 'Select Branch' },
    { id: 2, label: 'Choose Services' },
    { id: 3, label: 'Date & Time' },
    { id: 4, label: 'Review' }
  ];

  return (
    <div className="flex justify-between items-start w-full max-w-3xl mx-auto mb-12 relative">
      <div className="step-indicator-line" />
      {steps.map((step) => {
        const isActive = currentStep === step.id;
        const isCompleted = currentStep > step.id;
        
        return (
          <div key={step.id} className="flex flex-col items-center z-10">
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                isActive 
                  ? 'bg-[#2563EB] border-[#2563EB] text-white shadow-lg shadow-[#2563EB]/30' 
                  : isCompleted
                    ? 'bg-[#2563EB] border-[#2563EB] text-white'
                    : 'bg-white border-[#BFDBFE] text-[#64748B]'
              }`}
            >
              {isCompleted ? <Check size={20} /> : <span>{step.id}</span>}
            </div>
            <span className={`mt-2 text-xs font-medium transition-colors duration-300 ${
              isActive ? 'text-[#2563EB]' : 'text-[#64748B]'
            }`}>
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};
