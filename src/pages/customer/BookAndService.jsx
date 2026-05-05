import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { INITIAL_BRANCHES, SERVICES } from "../../components/customer/bookservice/constants";

import { StepIndicator } from "../../components/customer/bookservice/StepIndicator";
import { ShopSelection } from "../../components/customer/bookservice/ShopSelection";
import { ServiceSelection } from "../../components/customer/bookservice/ServiceSelection";
import { DateTimeSelection } from "../../components/customer/bookservice/DateTimeSelection";
import { ReviewBooking } from "../../components/customer/bookservice/ReviewBooking";
import { NavigationButtons } from "../../components/customer/bookservice/NavigationButtons";

const BASE_URL = "http://localhost:8080/api/gms";

const mapBranch = (b) => ({
  id: b.id,
  name: b.branchName,
  address: b.branchAddress,
  rating: b.branchRating ?? 0,
  city: b.branchCity,
  zipCode: b.branchZipCode,
  distance: b.branchCity || ""
});

const mapService = (s) => ({
  id: s.id,
  title: s.serviceName,
  price: s.servicePrice,
  duration: s.serviceDuration,
  description: ""
});

const BookAndService = () => {
  const [state, setState] = useState({
    step: 1,
    searchQuery: '',
    isSearching: false,
    branches: INITIAL_BRANCHES,
    services: SERVICES,
    selectedBranch: null,
    selectedServices: [],
    selectedDate: '',
    selectedTime: '',
    bookingId: null,
    bookingDetails: null,
    error: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [branchRes, serviceRes] = await Promise.all([
          fetch(`${BASE_URL}/branches`),
          fetch(`${BASE_URL}/services`)
        ]);

        if (branchRes.ok) {
          const data = await branchRes.json();
          setState(prev => ({ ...prev, branches: data.map(mapBranch) }));
        }

        if (serviceRes.ok) {
          const data = await serviceRes.json();
          setState(prev => ({ ...prev, services: data.map(mapService) }));
        }
      } catch (error) {
        console.error("API ERROR:", error);
      }
    };

    fetchData();
  }, []);

  const prevStep = () => setState(prev => ({ ...prev, step: Math.max(prev.step - 1, 1) }));

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    setState(prev => ({ ...prev, isSearching: true }));

    if (!state.searchQuery.trim()) {
      try {
        const res = await fetch(`${BASE_URL}/branches`);
        if (res.ok) {
          const data = await res.json();
          setState(prev => ({ ...prev, branches: data.map(mapBranch), isSearching: false }));
          return;
        }
      } catch {
        setState(prev => ({ ...prev, branches: INITIAL_BRANCHES, isSearching: false }));
        return;
      }
    }

    try {
      const res = await fetch(`${BASE_URL}/branches?query=${encodeURIComponent(state.searchQuery.trim())}`);
      if (res.ok) {
        const data = await res.json();
        setState(prev => ({ ...prev, branches: data.map(mapBranch), isSearching: false }));
        return;
      }
    } catch (error) {
      console.warn('Search failed:', error);
    }

    setState(prev => ({ ...prev, isSearching: false }));
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

  const handleNextStep = async () => {
    if (isSubmitting) return;
    try {
      setIsSubmitting(true);

      if (state.step === 1) {
        if (!state.selectedBranch) return;
        try {
          const res = await fetch(`${BASE_URL}/booking/select-branch`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              branchId: state.selectedBranch.id,
              branchName: state.selectedBranch.name,
              branchAddress: state.selectedBranch.address
            })
          });
          if (res.ok) {
            const booking = await res.json();
            setState(prev => ({ ...prev, bookingId: booking.id, bookingDetails: booking, step: 2 }));
          } else {
            setState(prev => ({ ...prev, bookingId: Date.now(), step: 2 }));
          }
        } catch (error) {
          console.warn('API unavailable:', error);
          setState(prev => ({ ...prev, bookingId: Date.now(), step: 2 }));
        }
        return;
      }

      if (state.step === 2) {
        if (!state.selectedServices.length) return;
        try {
          const res = await fetch(`${BASE_URL}/booking/select-services`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              bookingId: state.bookingId,
              serviceIds: state.selectedServices.map(s => s.id),
              totalPrice: state.selectedServices.reduce((sum, s) => sum + s.price, 0)
            })
          });
          if (res.ok) {
            const booking = await res.json();
            setState(prev => ({ ...prev, bookingDetails: booking, step: 3 }));
          } else {
            setState(prev => ({ ...prev, step: 3 }));
          }
        } catch (error) {
          console.warn('API unavailable:', error);
          setState(prev => ({ ...prev, step: 3 }));
        }
        return;
      }

      if (state.step === 3) {
        if (!state.selectedDate || !state.selectedTime) return;
        try {
          const res = await fetch(`${BASE_URL}/booking/select-slot`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              bookingId: state.bookingId,
              date: state.selectedDate,
              time: state.selectedTime
            })
          });
          if (res.ok) {
            const booking = await res.json();
            setState(prev => ({ ...prev, bookingDetails: booking, step: 4 }));
          } else {
            setState(prev => ({ ...prev, step: 4 }));
          }
        } catch (error) {
          console.warn('API unavailable:', error);
          setState(prev => ({ ...prev, step: 4 }));
        }
        return;
      }

      setState(prev => ({ ...prev, step: Math.min(prev.step + 1, 4) }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalAmount = useMemo(() => {
    return state.selectedServices.reduce((sum, s) => sum + s.price, 0);
  }, [state.selectedServices]);

  const isNextDisabled = useMemo(() => {
    if (isSubmitting) return true;
    if (state.step === 1) return !state.selectedBranch;
    if (state.step === 2) return state.selectedServices.length === 0;
    if (state.step === 3) {
      if (!state.selectedDate || !state.selectedTime) return true;
      const today = new Date();
      const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
      if (state.selectedDate < todayStr) return true;
      return false;
    }
    return false;
  }, [state, isSubmitting]);

  const handleConfirm = async () => {
    if (!state.bookingId) {
      alert('Booking Confirmed! You will receive a confirmation email shortly.');
      return;
    }
    try {
      setIsSubmitting(true);
      const res = await fetch(`${BASE_URL}/booking/confirm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId: state.bookingId })
      });
      if (res.ok) {
        const confirmedBooking = await res.json();
        setState(prev => ({ ...prev, bookingDetails: confirmedBooking }));
      }
      alert('Booking Confirmed! You will receive a confirmation email shortly.');
    } catch (error) {
      console.warn('Confirm API unavailable:', error);
      alert('Booking Confirmed! You will receive a confirmation email shortly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="p-8 flex flex-col items-center flex-grow">
      <style>{`
        body { margin: 0; padding: 0; }
        .step-indicator-line {
          position: absolute; top: 1.25rem; left: 0;
          width: 100%; height: 0.125rem;
          background-color: #BFDBFE; z-index: 0;
        }
        .card-shadow { box-shadow: 0 10px 30px -10px rgba(37, 99, 235, 0.1); }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #BFDBFE; border-radius: 9999px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #3B82F6; }
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
                <motion.div key="step1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
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
                <motion.div key="step2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <ServiceSelection
                    selectedBranch={state.selectedBranch}
                    services={state.services}
                    selectedServices={state.selectedServices}
                    toggleService={toggleService}
                    totalAmount={totalAmount}
                  />
                </motion.div>
              )}

              {state.step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  <DateTimeSelection
                    selectedDate={state.selectedDate}
                    setSelectedDate={(date) => setState(prev => ({ ...prev, selectedDate: date }))}
                    selectedTime={state.selectedTime}
                    setSelectedTime={(time) => setState(prev => ({ ...prev, selectedTime: time }))}
                  />
                </motion.div>
              )}

              {state.step === 4 && (
                <motion.div key="step4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
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
            nextStep={handleNextStep}
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
};

export default BookAndService;