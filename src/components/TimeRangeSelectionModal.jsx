import React, { useState, useEffect, useRef } from 'react';

const HOURS = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
const MINUTES = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

/**
 * Internal scroll-based time picker column pair (hours : minutes).
 * Mirrors the LargeTimePicker UX from AddScheduleModal but rendered inline.
 */
function ScrollTimePicker({ value, onChange }) {
  const [currentHour, currentMinute] = value ? value.split(':') : ['08', '00'];

  const hourRef = useRef(null);
  const minRef = useRef(null);
  const hourScrollRef = useRef(null);
  const minScrollRef = useRef(null);
  const hourScrollTimer = useRef(null);
  const minScrollTimer = useRef(null);

  // Scroll selected items into view on mount
  useEffect(() => {
    setTimeout(() => {
      if (hourRef.current) hourRef.current.scrollIntoView({ behavior: 'auto', block: 'center' });
      if (minRef.current) minRef.current.scrollIntoView({ behavior: 'auto', block: 'center' });
    }, 50);
  }, []);

  // Helper: find the centered item in a scroll container
  const findCenteredItem = (scrollContainer, dataAttr) => {
    if (!scrollContainer) return null;
    const containerRect = scrollContainer.getBoundingClientRect();
    const containerCenter = containerRect.top + containerRect.height / 2;
    let closestItem = null;
    let closestDistance = Infinity;
    const buttons = scrollContainer.querySelectorAll(`[data-${dataAttr}]`);
    buttons.forEach(btn => {
      const btnRect = btn.getBoundingClientRect();
      const btnCenter = btnRect.top + btnRect.height / 2;
      const distance = Math.abs(btnCenter - containerCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestItem = btn.getAttribute(`data-${dataAttr}`);
      }
    });
    return closestItem;
  };

  const handleHourScroll = () => {
    clearTimeout(hourScrollTimer.current);
    hourScrollTimer.current = setTimeout(() => {
      const centered = findCenteredItem(hourScrollRef.current, 'hour');
      if (centered !== null && centered !== currentHour) {
        onChange(`${centered}:${currentMinute}`);
      }
    }, 120);
  };

  const handleMinuteScroll = () => {
    clearTimeout(minScrollTimer.current);
    minScrollTimer.current = setTimeout(() => {
      const centered = findCenteredItem(minScrollRef.current, 'minute');
      if (centered !== null && centered !== currentMinute) {
        onChange(`${currentHour}:${centered}`);
      }
    }, 120);
  };

  useEffect(() => {
    return () => {
      clearTimeout(hourScrollTimer.current);
      clearTimeout(minScrollTimer.current);
    };
  }, []);

  return (
    <div className="flex justify-center gap-4 h-[280px] relative">
      {/* Central Active Band */}
      <div className="absolute top-1/2 left-0 right-0 h-16 -translate-y-1/2 bg-[#f1f4f9] rounded-xl pointer-events-none -z-10"></div>

      {/* Colon Separator */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <span className="text-[36px] font-bold text-[#727785] mb-1">:</span>
      </div>

      {/* Hours Column */}
      <div
        ref={hourScrollRef}
        onScroll={handleHourScroll}
        className="flex-1 overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex flex-col items-center gap-1 py-[112px] outline-none"
        style={{ scrollSnapType: 'y mandatory', scrollBehavior: 'smooth' }}
      >
        {HOURS.map(h => {
          const isSelected = h === currentHour;
          return (
            <button
              key={`h-${h}`}
              ref={isSelected ? hourRef : null}
              data-hour={h}
              type="button"
              onClick={() => onChange(`${h}:${currentMinute}`)}
              className={`w-24 shrink-0 h-16 rounded-xl flex items-center justify-center text-[32px] font-bold transition-all ${isSelected ? 'bg-[#6366f1] text-white shadow-lg scale-105' : 'text-[#c1c6d6] hover:text-[#727785] hover:bg-[#f8f9fa] bg-transparent'}`}
              style={{ scrollSnapAlign: 'center' }}
            >
              {h}
            </button>
          );
        })}
      </div>

      {/* Minutes Column */}
      <div
        ref={minScrollRef}
        onScroll={handleMinuteScroll}
        className="flex-1 overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex flex-col items-center gap-1 py-[112px] outline-none"
        style={{ scrollSnapType: 'y mandatory', scrollBehavior: 'smooth' }}
      >
        {MINUTES.map(m => {
          const isSelected = m === currentMinute;
          return (
            <button
              key={`m-${m}`}
              ref={isSelected ? minRef : null}
              data-minute={m}
              type="button"
              onClick={() => onChange(`${currentHour}:${m}`)}
              className={`w-24 shrink-0 h-16 rounded-xl flex items-center justify-center text-[32px] font-bold transition-all ${isSelected ? 'bg-[#6366f1] text-white shadow-lg scale-105' : 'text-[#c1c6d6] hover:text-[#727785] hover:bg-[#f8f9fa] bg-transparent'}`}
              style={{ scrollSnapAlign: 'center' }}
            >
              {m}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function TimeRangeSelectionModal({ isOpen, onClose, initialStartTime = "08:00", initialEndTime = "10:00", onConfirm }) {
  const [editingTarget, setEditingTarget] = useState('start');
  const [startTime, setStartTime] = useState(initialStartTime);
  const [endTime, setEndTime] = useState(initialEndTime);

  useEffect(() => {
    if (isOpen) {
      setStartTime(initialStartTime || '08:00');
      setEndTime(initialEndTime || '10:00');
      setEditingTarget('start');
    }
  }, [isOpen, initialStartTime, initialEndTime]);

  if (!isOpen) return null;

  const currentValue = editingTarget === 'start' ? startTime : endTime;
  const handleTimeChange = (newValue) => {
    if (editingTarget === 'start') {
      setStartTime(newValue);
    } else {
      setEndTime(newValue);
    }
  };

  const handleConfirm = () => {
    onConfirm({ startTime, endTime });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center bg-[#191c1d]/40 backdrop-blur-md p-4">
      <div className="bg-[#fcfdfd] w-full max-w-lg rounded-[2.5rem] shadow-[0_24px_60px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="px-8 pt-10 pb-6 text-center shadow-sm">
          <h2 className="text-[32px] font-bold text-[#191c1d] tracking-tight uppercase">CHỌN KHUNG GIỜ</h2>
        </div>
        
        {/* Modal Content */}
        <div className="px-10 py-6 space-y-6">
          
          {/* Start / End Toggle Cards */}
          <div className="grid grid-cols-2 gap-5">
            <button 
              onClick={() => setEditingTarget('start')}
              className={`p-6 rounded-3xl flex flex-col items-center transition-all outline-none ${editingTarget === 'start' ? 'bg-[#f0f4ff] border-[2.5px] border-[#1a73e8] shadow-md scale-105' : 'bg-[#f3f4f5] border-[2.5px] border-transparent hover:border-[#c1c6d6] text-[#414754]'}`}
            >
              <span className="font-medium text-[18px] mb-1 tracking-wide">Bắt đầu</span>
              <span className={`text-[28px] font-extrabold tracking-tight ${editingTarget === 'start' ? 'text-[#1a73e8]' : 'text-[#727785]'}`}>
                {startTime}
              </span>
            </button>
            <button 
              onClick={() => setEditingTarget('end')}
              className={`p-6 rounded-3xl flex flex-col items-center transition-all outline-none ${editingTarget === 'end' ? 'bg-[#f0f4ff] border-[2.5px] border-[#1a73e8] shadow-md scale-105' : 'bg-[#f3f4f5] border-[2.5px] border-transparent hover:border-[#c1c6d6] text-[#414754]'}`}
            >
              <span className="font-medium text-[18px] mb-1 tracking-wide">Kết thúc</span>
              <span className={`text-[28px] font-extrabold tracking-tight ${editingTarget === 'end' ? 'text-[#1a73e8]' : 'text-[#727785]'}`}>
                {endTime}
              </span>
            </button>
          </div>
          
          {/* Scroll-based Time Picker */}
          <div className="bg-[#f3f4f5] rounded-[2rem] p-6 border border-gray-100 shadow-sm">
            {/* Key forces remount when switching start/end so scroll position resets */}
            <ScrollTimePicker
              key={editingTarget}
              value={currentValue}
              onChange={handleTimeChange}
            />
          </div>
          
        </div>
        
        {/* Primary Actions */}
        <div className="px-10 pb-10 space-y-4">
           <button onClick={handleConfirm} className="w-full bg-[#1a73e8] hover:bg-[#1557b0] text-white h-[72px] rounded-2xl font-bold text-[24px] transition-colors shadow-lg active:scale-[0.98] outline-none tracking-wide">
             XÁC NHẬN
           </button>
           <button onClick={onClose} className="w-full bg-[#e7e8e9] hover:bg-[#d9dadb] text-[#191c1d] h-[72px] rounded-2xl font-bold text-[24px] transition-colors active:scale-[0.98] outline-none tracking-wide">
             HỦY
           </button>
        </div>
        
      </div>
    </div>
  );
}
