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
                  ? 'bg-active-menu border-active-menu text-white shadow-lg shadow-active-menu/30' 
                  : isCompleted
                    ? 'bg-active-menu border-active-menu text-white'
                    : 'bg-white border-card-border text-muted-text'
              }`}
            >
              {isCompleted ? <Check size={20} /> : <span>{step.id}</span>}
            </div>
            <span className={`mt-2 text-xs font-medium transition-colors duration-300 ${
              isActive ? 'text-active-menu' : 'text-muted-text'
            }`}>
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export const INITIAL_BRANCHES = [
  {
    id: 1,
    name: "Main Branch",
    address: "123 Business Ave, Suite 100",
    phone: "(555) 012-3456",
    rating: 4.8
  },
  {
    id: 2,
    name: "Downtown Studio",
    address: "456 Center St",
    phone: "(555) 987-6543",
    rating: 4.2
  }
];
export const branches = [
  {
    id: 1,
    name: "Main Branch",
    address: "123 Business Ave, Suite 100",
    phone: "(555) 012-3456",
    rating: 4.8
  },
  {
    id: 2,
    name: "Downtown Studio",
    address: "456 Center St",
    phone: "(555) 987-6543",
    rating: 4.2
  }
];

export const SERVICES = [
  {
    id: 1,
    title: "General Service",
    description: "Standard maintenance check.",
    price: 150.00,
    duration: "2h"
  },
  {
    id: 2,
    title: "Oil Change",
    description: "Engine oil and filter replacement.",
    price: 50.00,
    duration: "45m"
  },
  {
    id: 3,
    title: "Brake Inspection",
    description: "Full brake system safety check.",
    price: 80.00,
    duration: "1h"
  },
  {
    id: 4,
    title: "Wheel Alignment",
    description: "Precision wheel balancing and alignment.",
    price: 60.00,
    duration: "1h"
  },
  {
    id: 5,
    title: "AC Service",
    description: "Cooling system diagnostic and recharge.",
    price: 120.00,
    duration: "1.5h"
  },
  {
    id: 6,
    title: "Car Wash & Detailing",
    description: "Exterior wash and interior deep clean.",
    price: 40.00,
    duration: "1h"
  }
];
export const TIME_SLOTS = {
  morning: ['09:00 AM', '10:00 AM', '11:00 AM'],
  afternoon: ['12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM']
};