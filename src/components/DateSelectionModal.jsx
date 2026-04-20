import React, { useState, useEffect } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays, setMonth, setYear } from 'date-fns';

export function DateSelectionModal({ isOpen, onClose, initialDate, onConfirm }) {
  const [selectedDate, setSelectedDate] = useState(initialDate || new Date());
  const [currentMonth, setCurrentMonth] = useState(initialDate || new Date());
  
  // 'date', 'month', 'year'
  const [viewMode, setViewMode] = useState('date');
  const [yearDecadeStart, setYearDecadeStart] = useState(parseInt(format(initialDate || new Date(), 'yyyy'), 10) - 4);

  useEffect(() => {
    if (isOpen) {
      setSelectedDate(initialDate || new Date());
      setCurrentMonth(initialDate || new Date());
      setViewMode('date');
    }
  }, [isOpen, initialDate]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (viewMode === 'date') setCurrentMonth(addMonths(currentMonth, 1));
    else if (viewMode === 'month') setCurrentMonth(addMonths(currentMonth, 12));
    else if (viewMode === 'year') setYearDecadeStart(prev => prev + 12);
  };
  
  const handlePrev = () => {
    if (viewMode === 'date') setCurrentMonth(subMonths(currentMonth, 1));
    else if (viewMode === 'month') setCurrentMonth(subMonths(currentMonth, 12));
    else if (viewMode === 'year') setYearDecadeStart(prev => prev - 12);
  };

  const handleConfirm = () => {
    onConfirm(selectedDate);
    onClose();
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-6 min-h-[64px]">
        <button onClick={handlePrev} className="w-14 h-14 shrink-0 bg-white border border-gray-100 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center text-[#1a73e8] hover:bg-gray-50 active:scale-95 transition-all outline-none">
          <span className="material-symbols-outlined text-[32px] font-bold">chevron_left</span>
        </button>
        
        <div className="flex flex-col items-center justify-center">
           <button 
             onClick={() => setViewMode(viewMode === 'month' ? 'date' : 'month')} 
             className={`px-4 py-1.5 rounded-xl transition-all text-[26px] font-bold tracking-tight active:scale-95 leading-none outline-none ${viewMode === 'month' ? 'text-[#1a73e8] bg-blue-50 hover:bg-blue-100' : 'text-[#101828] hover:bg-gray-100 bg-transparent'}`}
           >
             {viewMode === 'year' ? `${yearDecadeStart} - ${yearDecadeStart + 11}` : `Tháng ${format(currentMonth, 'M')}`}
           </button>
           {viewMode !== 'year' && (
             <button 
               onClick={() => { setViewMode(viewMode === 'year' ? 'date' : 'year'); setYearDecadeStart(parseInt(format(currentMonth, 'yyyy'), 10) - 4); }} 
               className={`px-4 py-1 mt-1 rounded-xl transition-all text-[20px] font-bold active:scale-95 leading-none outline-none ${viewMode === 'year' ? 'text-[#1a73e8] bg-blue-50 hover:bg-blue-100' : 'text-[#727785] hover:bg-gray-100 bg-transparent'}`}
             >
               Năm {format(currentMonth, 'yyyy')}
             </button>
           )}
        </div>

        <button onClick={handleNext} className="w-14 h-14 shrink-0 bg-white border border-gray-100 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center text-[#1a73e8] hover:bg-gray-50 active:scale-95 transition-all outline-none">
          <span className="material-symbols-outlined text-[32px] font-bold">chevron_right</span>
        </button>
      </div>
    );
  };

  const renderDateView = () => {
    const days = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
    
    // Days Header
    const daysHeader = (
      <div className="grid grid-cols-7 mb-2">
        {days.map((day, i) => (
          <div key={i} className={`text-center font-bold text-[18px] ${i === 6 ? 'text-[#d9534f]' : 'text-[#414754]'}`}>
            {day}
          </div>
        ))}
      </div>
    );

    // Cells
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const rows = [];
    let daysArr = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, 'd');
        const cloneDay = day;
        const isCurrentMonth = isSameMonth(day, monthStart);
        const isSelected = isSameDay(day, selectedDate);
        const isSunday = i === 6;

        daysArr.push(
          <div key={day.toISOString()} className="flex justify-center items-center py-2 h-[60px] w-full">
            {isCurrentMonth ? (
              <button
                onClick={() => setSelectedDate(cloneDay)}
                className={`w-[48px] h-[48px] rounded-full flex items-center justify-center text-[22px] font-bold transition-all outline-none ${
                  isSelected 
                    ? 'bg-[#1a73e8] text-white shadow-lg scale-110' 
                    : isSunday 
                      ? 'text-[#d9534f] hover:bg-red-50' 
                      : 'text-[#101828] hover:bg-gray-100'
                }`}
              >
                {formattedDate}
              </button>
            ) : (
              <div className="w-[48px] h-[48px]"></div>
            )}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7 w-full gap-x-2" key={day.toISOString()}>
          {daysArr}
        </div>
      );
      daysArr = [];
    }

    return (
      <div className="mb-6 min-h-[300px]">
        {daysHeader}
        {rows}
      </div>
    );
  };

  const renderMonthView = () => {
    const months = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
    const currentM = parseInt(format(currentMonth, 'M'), 10);
    
    return (
      <div className="grid grid-cols-3 gap-x-4 gap-y-6 mb-6 min-h-[300px] content-center p-2">
        {months.map((m, index) => {
          const isSelected = (index + 1) === currentM;
          return (
            <button 
              key={m}
              onClick={() => {
                setCurrentMonth(setMonth(currentMonth, index));
                setViewMode('date');
              }}
              className={`h-16 rounded-2xl flex items-center justify-center text-[18px] font-bold transition-all outline-none ${isSelected ? 'bg-[#1a73e8] text-white shadow-lg scale-105' : 'text-[#101828] bg-gray-50 hover:bg-gray-100 shadow-sm border border-gray-100'}`}
            >
              {m}
            </button>
          );
        })}
      </div>
    );
  };

  const renderYearView = () => {
    const years = Array.from({length: 12}, (_, i) => yearDecadeStart + i);
    const currentY = parseInt(format(currentMonth, 'yyyy'), 10);
    
    return (
      <div className="grid grid-cols-3 gap-x-4 gap-y-6 mb-6 min-h-[300px] content-center p-2">
        {years.map((y) => {
          const isSelected = y === currentY;
          return (
            <button 
              key={y}
              onClick={() => {
                setCurrentMonth(setYear(currentMonth, y));
                setViewMode('month'); 
              }}
              className={`h-16 rounded-2xl flex items-center justify-center text-[20px] font-bold transition-all outline-none ${isSelected ? 'bg-[#1a73e8] text-white shadow-lg scale-105' : 'text-[#101828] bg-gray-50 hover:bg-gray-100 shadow-sm border border-gray-100'}`}
            >
              {y}
            </button>
          );
        })}
      </div>
    );
  };

  const dayNames = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
  const displayString = `${dayNames[selectedDate.getDay()]}, ${format(selectedDate, 'dd')} Tháng ${format(selectedDate, 'MM')}`;

  return (
    <div className="fixed inset-0 z-[300] bg-[#191c1d]/40 backdrop-blur-sm flex flex-col items-center justify-center p-4 antialiased">
      <div className="mb-6 mt-[-40px]">
         <h1 className="text-[36px] font-bold text-[#191c1d] uppercase tracking-tighter shadow-sm mix-blend-color-burn">CHỌN NGÀY</h1>
      </div>
      
      <div className="bg-[#fcfdfd] rounded-[2rem] w-full max-w-[460px] p-8 shadow-[0_24px_60px_rgba(0,0,0,0.15)] animate-in fade-in zoom-in-95 duration-200">
        
        {renderHeader()}
        
        <div className="transition-all duration-300 relative">
          {viewMode === 'date' && renderDateView()}
          {viewMode === 'month' && renderMonthView()}
          {viewMode === 'year' && renderYearView()}
        </div>

        {/* Selected Date Indicator */}
        <div className="bg-[#e7e8e9] rounded-2xl p-6 mb-8 flex items-center gap-5 outline-none select-none">
           <span className="material-symbols-outlined text-[#1a73e8] text-[36px]">event</span>
           <div className="flex flex-col">
             <span className="text-[18px] text-[#414754] mb-1 leading-none font-medium">Ngày bạn đã chọn:</span>
             <span className="text-[20px] font-bold text-[#101828] leading-none mt-1">{displayString}</span>
           </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-4">
           <button onClick={handleConfirm} className="w-full bg-[#1a73e8] hover:bg-[#1557b0] text-white h-[68px] rounded-2xl font-bold text-[22px] transition-colors shadow-lg active:scale-[0.98] outline-none">
             XÁC NHẬN
           </button>
           <button onClick={onClose} className="w-full bg-[#e7e8e9] hover:bg-[#d9dadb] text-[#191c1d] h-[68px] rounded-2xl font-bold text-[22px] transition-colors active:scale-[0.98] outline-none">
             HỦY
           </button>
        </div>

      </div>
    </div>
  );
}
