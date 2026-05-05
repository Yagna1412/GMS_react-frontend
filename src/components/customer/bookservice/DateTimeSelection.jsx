import React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { TIME_SLOTS } from './constants';

export const DateTimeSelection = ({ selectedDate, setSelectedDate, selectedTime, setSelectedTime }) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const todayStr = `${year}-${month}-${day}`;

  const isTimeSlotPast = (timeSlot) => {
    if (selectedDate !== todayStr) return false;
    
    const [hours, minutes] = timeSlot.split(':').map(Number);
    
    const slotTime = new Date();
    slotTime.setHours(hours, minutes, 0, 0);
    
    return slotTime < today;
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-header-text">Select Date & Time</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-muted-text mb-2">Select Date</label>
            <div className="relative">
              <input type="date" 
                value={selectedDate}
                min="2026-01-01" max="2026-12-31"
                onChange={(e) => {
              
                 const val = e.target.value;
                 if (!val) return;
  
                 const selectedYear = new Date(val).getFullYear();
  
  // Strict check: Only allow 2026
                if (selectedYear !== 2026) {
                alert("Invalid Year: Please select a date in 2026.");
               return;
                }

                if (val < todayStr) return;

                setSelectedDate(val);
                setSelectedTime(''); 
                }}
                className="w-full p-4 rounded-xl border-2 border-card-border focus:border-active-menu focus:outline-none transition-colors text-header-text"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-muted-text mb-3">Morning Slots</label>
            <div className="grid grid-cols-3 gap-3">
              {TIME_SLOTS?.morning?.map((time) => {
                const isPast = isTimeSlotPast(time);
                return (
                  <button
                    key={time}
                    disabled={isPast}
                    onClick={() => setSelectedTime(time)}
                    className={`p-3 rounded-xl border-2 text-sm font-bold transition-all ${
                      selectedTime === time
                        ? 'bg-active-menu border-active-menu text-white shadow-md'
                        : isPast
                          ? 'bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed'
                          : 'border-card-border text-header-text hover:border-accent-blue/50'
                    }`}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-muted-text mb-3">Afternoon Slots</label>
            <div className="grid grid-cols-3 gap-3">
              {TIME_SLOTS?.afternoon?.map((time) => {
                const isPast = isTimeSlotPast(time);
                return (
                  <button
                    key={time}
                    disabled={isPast}
                    onClick={() => setSelectedTime(time)}
                    className={`p-3 rounded-xl border-2 text-sm font-bold transition-all ${
                      selectedTime === time
                        ? 'bg-active-menu border-active-menu text-white shadow-md'
                        : isPast
                          ? 'bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed'
                          : 'border-card-border text-header-text hover:border-accent-blue/50'
                    }`}
                  >
                    {time}
                  </button>
                );
               })}
            </div>
          </div>
        </div>

        <div className="bg-blue-50/50 rounded-2xl border border-card-border p-8 flex flex-col items-center justify-center text-center">
          {selectedDate && selectedTime ? (
            <div className="space-y-4">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-active-menu shadow-sm mx-auto">
                <CalendarIcon size={32} />
              </div>
              <div>
                <p className="text-xl font-bold text-header-text">
                  {new Date(selectedDate).toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    month: 'short', 
                    day: '2-digit', 
                    year: 'numeric' 
                  })}
                </p>
                <p className="text-3xl font-black text-active-menu mt-1">{selectedTime}</p>
              </div>
            </div>
          ) : (
            <div className="text-muted-text space-y-4">
              <CalendarIcon size={48} className="mx-auto opacity-50" />
              <div>
                <p className="text-lg font-bold text-header-text">Select a date</p>
                <p className="text-sm">-- : --</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
