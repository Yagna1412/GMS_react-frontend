import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { INITIAL_BRANCHES, SERVICES } from "../components/BookService_components/constants";

// Component Imports
import { StepIndicator } from "../components/BookService_components/StepIndicator";
import { ShopSelection } from "../components/BookService_components/ShopSelection";
import { ServiceSelection } from "../components/BookService_components/ServiceSelection";
import { DateTimeSelection } from "../components/BookService_components/DateTimeSelection";
import { ReviewBooking } from "../components/BookService_components/ReviewBooking";
import { NavigationButtons } from "../components/BookService_components/NavigationButtons";

export default function App() {
  const [state, setState] = useState({
    step: 1,
    searchQuery: '',
    isSearching: false,
    branches: INITIAL_BRANCHES,
    selectedBranch: null,
    selectedServices: [],
    selectedDate: '',
    selectedTime: ''
  });

  const nextStep = () => setState(prev => ({ ...prev, step: Math.min(prev.step + 1, 4) }));
  const prevStep = () => setState(prev => ({ ...prev, step: Math.max(prev.step - 1, 1) }));

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (!state.searchQuery.trim()) {
      setState(prev => ({ ...prev, branches: INITIAL_BRANCHES }));
      return;
    }

    setState(prev => ({ ...prev, isSearching: true }));
    
    // Simulate a local search delay
    setTimeout(() => {
      const filtered = INITIAL_BRANCHES.filter(branch => 
        branch.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        branch.address.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
      
      // If no matches found in mock data, just show all for demo purposes
      const results = filtered.length > 0 ? filtered : INITIAL_BRANCHES;
      
      setState(prev => ({ 
        ...prev, 
        branches: results, 
        isSearching: false 
      }));
    }, 800);
  };

  const toggleService = (service) => {
    setState(prev => {
      const isSelected = prev.selectedServices.find(s => s.id === service.id);
      if (isSelected) {
        return { ...prev, selectedServices: prev.selectedServices.filter(s => s.id !== service.id) };
      }
      return { ...prev, selectedServices: [...prev.selectedServices, service] };
    });
  };

  const totalAmount = useMemo(() => {
    return state.selectedServices.reduce((sum, s) => sum + s.price, 0);
  }, [state.selectedServices]);

  const isNextDisabled = useMemo(() => {
    if (state.step === 1) return !state.selectedBranch;
    if (state.step === 2) return state.selectedServices.length === 0;
    if (state.step === 3) {
      if (!state.selectedDate || !state.selectedTime) return true;
      
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      const todayStr = `${year}-${month}-${day}`;
      
      // Prevent proceeding if date is in the past
      if (state.selectedDate < todayStr) return true;
      
      return false;
    }
    return false;
  }, [state]);

  const handleConfirm = () => {
    alert('Booking Confirmed! You will receive a confirmation email shortly.');
  };

  return (
    
        <main className="p-8 flex flex-col items-center flex-grow">
          <style>{`
            body {
              margin: 0;
              padding: 0;
            }
            .step-indicator-line {
              position: absolute;
              top: 1.25rem;
              left: 0;
              width: 100%;
              height: 0.125rem;
              background-color: #BFDBFE;
              z-index: 0;
            }
            .card-shadow {
              box-shadow: 0 10px 30px -10px rgba(37, 99, 235, 0.1);
            }
            .custom-scrollbar::-webkit-scrollbar {
              width: 6px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: transparent;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background-color: #BFDBFE;
              border-radius: 9999px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background-color: #3B82F6;
            }
          `}</style>

          <div className="w-full max-w-5xl space-y-10">
            <StepIndicator currentStep={state.step} />

            <motion.div 
              layout
              className="w-full bg-white rounded-[2rem] border border-[#BFDBFE] card-shadow overflow-hidden flex flex-col"
            >
              <div className="p-8 md:p-12 flex-grow">
                <AnimatePresence mode="wait">
                  {state.step === 1 && (
                    <motion.div 
                      key="step1"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <ShopSelection 
                        searchQuery={state.searchQuery}
                        setSearchQuery={(query) => setState(prev => ({ ...prev, searchQuery: query }))}
                        isSearching={state.isSearching}
                        handleSearch={handleSearch}
                        branches={state.branches}
                        selectedBranch={state.selectedBranch}
                        setSelectedBranch={(branch) => setState(prev => ({ ...prev, selectedBranch: branch }))}
                      />
                    </motion.div>
                  )}

                  {state.step === 2 && (
                    <motion.div 
                      key="step2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <ServiceSelection 
                        selectedBranch={state.selectedBranch}
                        services={SERVICES}
                        selectedServices={state.selectedServices}
                        toggleService={toggleService}
                        totalAmount={totalAmount}
                      />
                    </motion.div>
                  )}

                  {state.step === 3 && (
                    <motion.div 
                      key="step3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <DateTimeSelection 
                        selectedDate={state.selectedDate}
                        setSelectedDate={(date) => setState(prev => ({ ...prev, selectedDate: date }))}
                        selectedTime={state.selectedTime}
                        setSelectedTime={(time) => setState(prev => ({ ...prev, selectedTime: time }))}
                      />
                    </motion.div>
                  )}

                  {state.step === 4 && (
                    <motion.div 
                      key="step4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <ReviewBooking 
                        selectedBranch={state.selectedBranch}
                        selectedDate={state.selectedDate}
                        selectedTime={state.selectedTime}
                        selectedServices={state.selectedServices}
                        totalAmount={totalAmount}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <NavigationButtons 
                step={state.step}
                prevStep={prevStep}
                nextStep={nextStep}
                isNextDisabled={isNextDisabled}
                onConfirm={handleConfirm}
              />
            </motion.div>
          </div>

          <div className="mt-auto pt-12 text-center text-[#64748B] text-sm">
            <p>© 2026 AutoFix Booking. All rights reserved.</p>
          </div>
        </main>
      
  );
}
