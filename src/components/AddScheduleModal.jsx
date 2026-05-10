import React, { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { useApp } from '../context/AppContext';
import { DateSelectionModal } from './DateSelectionModal';
import { getFieldStatus, getOverlappingSchedule } from '../utils/statusUtils';
import { playSuccessSound } from '../utils/audio';

const HOURS = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
const MINUTES = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

export function LargeTimePicker({ value, onChange, label }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const [currentHour, currentMinute] = value ? value.split(':') : ['08', '00'];

  const hourRef = useRef(null);
  const minRef = useRef(null);
  const hourScrollRef = useRef(null);
  const minScrollRef = useRef(null);
  const hourScrollTimer = useRef(null);
  const minScrollTimer = useRef(null);
  // Track whether user is actively scrolling to avoid fighting with programmatic scrolls
  const isUserScrollingHour = useRef(false);
  const isUserScrollingMin = useRef(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (hourRef.current) hourRef.current.scrollIntoView({ behavior: 'auto', block: 'center' });
        if (minRef.current) minRef.current.scrollIntoView({ behavior: 'auto', block: 'center' });
      }, 50);
    }
  }, [isOpen]);

  // Helper: find the centered item in a scroll container
  const findCenteredItem = (scrollContainer, items, dataAttr) => {
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

  // Auto-select hour when scroll ends
  const handleHourScroll = () => {
    isUserScrollingHour.current = true;
    clearTimeout(hourScrollTimer.current);
    hourScrollTimer.current = setTimeout(() => {
      isUserScrollingHour.current = false;
      const centered = findCenteredItem(hourScrollRef.current, HOURS, 'hour');
      if (centered !== null && centered !== currentHour) {
        onChange(`${centered}:${currentMinute}`);
      }
    }, 120);
  };

  // Auto-select minute when scroll ends
  const handleMinuteScroll = () => {
    isUserScrollingMin.current = true;
    clearTimeout(minScrollTimer.current);
    minScrollTimer.current = setTimeout(() => {
      isUserScrollingMin.current = false;
      const centered = findCenteredItem(minScrollRef.current, MINUTES, 'minute');
      if (centered !== null && centered !== currentMinute) {
        onChange(`${currentHour}:${centered}`);
      }
    }, 120);
  };

  // Cleanup timers
  useEffect(() => {
    return () => {
      clearTimeout(hourScrollTimer.current);
      clearTimeout(minScrollTimer.current);
    };
  }, []);

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Trigger Button */}
      <div className="flex flex-col gap-2 relative">
        <span className="font-headline text-[16px] text-[#727785] font-bold uppercase tracking-wider">{label}</span>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full h-[72px] bg-white border ${isOpen ? 'border-[#6366f1] ring-4 ring-[#6366f1]/20' : 'border-[#e0e3e8] shadow-[0px_2px_4px_rgba(0,0,0,0.02)]'} rounded-[1rem] flex items-center justify-between px-6 hover:border-[#c1c6d6] active:bg-[#f8f9fa] transition-all outline-none`}
        >
          <span className="font-headline text-[24px] font-bold text-[#101828] tracking-tight">{value}</span>
          <span className="material-symbols-outlined text-[#101828] text-[26px]">schedule</span>
        </button>
      </div>

      {/* Custom Big Picker Dropdown */}
      {isOpen && (
        <div className="absolute top-[102px] left-0 w-full bg-white rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.15)] border border-[#e0e3e8] z-50 p-6 h-[340px] flex flex-col animate-in fade-in slide-in-from-top-2 duration-200">

          <div className="flex justify-center gap-6 h-full relative">
            {/* Central Active Band highlighting the middle row */}
            <div className="absolute top-1/2 left-0 right-0 h-16 -translate-y-1/2 bg-[#f1f4f9] rounded-xl pointer-events-none -z-10"></div>

            {/* Colon Separator */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              <span className="text-[32px] font-bold text-[#727785] mb-2">:</span>
            </div>

            {/* Hours Scroll Area */}
            <div
              ref={hourScrollRef}
              onScroll={handleHourScroll}
              className="flex-1 overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex flex-col items-center gap-1 py-[100px] outline-none"
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
                    onClick={() => { onChange(`${h}:${currentMinute}`); }}
                    className={`w-24 shrink-0 h-16 rounded-xl flex items-center justify-center text-[28px] font-bold transition-all ${isSelected ? 'bg-[#6366f1] text-white shadow-lg scale-105' : 'text-[#c1c6d6] hover:text-[#727785] hover:bg-[#f8f9fa] bg-transparent'}`}
                    style={{ scrollSnapAlign: 'center' }}
                  >
                    {h}
                  </button>
                );
              })}
            </div>

            {/* Minutes Scroll Area */}
            <div
              ref={minScrollRef}
              onScroll={handleMinuteScroll}
              className="flex-1 overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex flex-col items-center gap-1 py-[100px] outline-none"
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
                    onClick={() => { onChange(`${currentHour}:${m}`); }}
                    className={`w-24 shrink-0 h-16 rounded-xl flex items-center justify-center text-[28px] font-bold transition-all ${isSelected ? 'bg-[#6366f1] text-white shadow-lg scale-105' : 'text-[#c1c6d6] hover:text-[#727785] hover:bg-[#f8f9fa] bg-transparent'}`}
                    style={{ scrollSnapAlign: 'center' }}
                  >
                    {m}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function AddScheduleModal({ isOpen, onClose, initialFieldId, initialDate }) {
  const { fields, schedules, addSchedule, addActivity } = useApp();

  const [selectedSport, setSelectedSport] = useState('Pickleball');
  const [selectedFieldId, setSelectedFieldId] = useState('');

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDateSelectionModalOpen, setIsDateSelectionModalOpen] = useState(false);

  // Initialize Simple string times
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('11:00');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [validationError, setValidationError] = useState('');

  const prevIsOpen = useRef(false);

  // Reset form when opened
  useEffect(() => {
    if (isOpen && !prevIsOpen.current) {
      setSelectedSport('Pickleball');
      setSelectedFieldId(initialFieldId || (fields.length > 0 ? fields[0].id : ''));
      setSelectedDate(initialDate || new Date());
      setStartTime('09:00');
      setEndTime('11:00');
      setCustomerName('');
      setCustomerPhone('');
      setValidationError('');
    }
    prevIsOpen.current = isOpen;
  }, [isOpen, fields, initialFieldId, initialDate]);

  const dayNames = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
  const isToday = new Date().toDateString() === selectedDate.toDateString();
  const dateDisplayString = isToday
    ? `Hôm nay, ${format(selectedDate, 'dd')} Tháng ${format(selectedDate, 'MM')}, ${format(selectedDate, 'yyyy')}`
    : `${dayNames[selectedDate.getDay()]}, ${format(selectedDate, 'dd')} Tháng ${format(selectedDate, 'MM')}, ${format(selectedDate, 'yyyy')}`;

  const timeToMinutes = (t) => {
    const [h, m] = t.split(':').map(Number);
    return h * 60 + m;
  };

  const handleConfirm = () => {
    setValidationError('');

    const startMin = timeToMinutes(startTime);
    const endMin = timeToMinutes(endTime);

    // Validate end > start
    if (endMin <= startMin) {
      setValidationError('Giờ kết thúc phải sau giờ bắt đầu.');
      return;
    }

    // Validate minimum 30 min
    if (endMin - startMin < 30) {
      setValidationError('Thời gian đặt sân tối thiểu là 30 phút.');
      return;
    }

    // Check for overlapping schedules on the same field & date
    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    const overlapping = getOverlappingSchedule(selectedFieldId, dateStr, startTime, endTime, schedules);

    if (overlapping) {
      setValidationError(`Trùng lịch! ${overlapping.sport} đã đặt từ ${overlapping.startTime} - ${overlapping.endTime}.`);
      return;
    }

    const selectedField = fields.find((f) => f.id === selectedFieldId);
    const newSchedule = {
      id: `sched-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      fieldId: selectedFieldId,
      sport: selectedSport,
      date: dateStr,
      startTime,
      endTime,
      status: 'upcoming',
      createdAt: new Date().toISOString(),
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
    };

    addSchedule(newSchedule);
    addActivity({
      message: `Lịch trình mới: ${selectedSport} tại ${selectedField?.name || 'Sân'} từ ${startTime} đến ${endTime}${customerName.trim() ? ` — KH: ${customerName.trim()}` : ''}.`,
      type: 'info',
    });
    playSuccessSound();
    onClose();
  };

  if (!isOpen) return null;

  const SPORTS = [
    { key: 'Bóng chuyền', color: '#ab3231', icon: '/volleyball-1-svgrepo-com.svg' },
    { key: 'Cầu lông', color: '#006a6a', icon: '/badminton-3-svgrepo-com.svg' },
    { key: 'Pickleball', color: '#1a73e8', icon: '/pickleball.png' },
  ];

  return (
    <div className="fixed inset-0 bg-[#191c1d]/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4 antialiased">
      <div className="w-full max-w-4xl bg-[#f8f9fa] border-none rounded-[1.5rem] shadow-[0_8px_24px_rgba(33,37,41,0.08)] overflow-visible flex flex-col relative animate-in fade-in zoom-in duration-200">

        {/* Header */}
        <header className="px-8 pt-6 pb-4 flex justify-between items-center bg-[#f8f9fa] shrink-0 rounded-t-[1.5rem] z-10">
          <h1 className="font-headline text-[28px] font-bold leading-tight tracking-tight text-[#191c1d] uppercase">
            THÊM LỊCH MỚI
          </h1>
          <button
            onClick={onClose}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-[#e7e8e9] hover:bg-[#d1d5db] text-[#191c1d] active:scale-90 transition-all border-none"
          >
            <span className="material-symbols-outlined text-[28px]">close</span>
          </button>
        </header>

        {/* Two-Column Body */}
        <div className="px-8 pb-6 grid grid-cols-2 gap-8">

          {/* LEFT COLUMN — Date, Court, Sport */}
          <div className="space-y-5">

            {/* Select Date */}
            <section className="space-y-2">
              <h2 className="font-headline text-[16px] font-bold text-[#727785] uppercase tracking-wider">CHỌN NGÀY</h2>
              <button type="button" onClick={() => setIsDateSelectionModalOpen(true)} className="w-full h-14 bg-white border-b-2 border-[#e0e3e8] outline-none flex items-center px-5 gap-3 shadow-sm rounded-xl active:bg-[#f3f4f5] transition-colors text-left hover:border-[#c1c6d6]">
                <span className="material-symbols-outlined text-[#1a73e8] text-[24px]">calendar_today</span>
                <span className="font-body text-[16px] font-medium text-[#191c1d]">{dateDisplayString}</span>
              </button>
            </section>

            {/* Select Court */}
            <section className="space-y-2">
              <h2 className="font-headline text-[16px] font-bold text-[#727785] uppercase tracking-wider">CHỌN SÂN</h2>
              <div className="relative">
                <select
                  value={selectedFieldId}
                  onChange={(e) => setSelectedFieldId(e.target.value)}
                  className="w-full h-14 bg-white border-b-2 border-[#e0e3e8] font-body text-[16px] font-medium text-[#191c1d] px-5 rounded-xl appearance-none shadow-sm hover:border-[#c1c6d6] focus:border-[#1a73e8] focus:ring-4 focus:ring-[#1a73e8]/10 outline-none cursor-pointer transition-all"
                >
                  {fields.map((field) => (
                    <option key={field.id} value={field.id}>{field.name}</option>
                  ))}
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                  <span className="material-symbols-outlined text-[#727785] text-[24px]">expand_more</span>
                </div>
              </div>
            </section>

            {/* Sport Selection — Compact */}
            <section className="space-y-2">
              <h2 className="font-headline text-[16px] font-bold text-[#727785] uppercase tracking-wider">MÔN THỂ THAO</h2>
              <div className="flex flex-col gap-2.5">
                {SPORTS.map(({ key, color, icon }) => {
                  const isActive = selectedSport === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedSport(key)}
                      className={`flex items-center gap-4 px-5 py-3 bg-white rounded-xl shadow-sm border-l-[8px] active:scale-[0.98] transition-all text-left outline-none ${isActive ? `ring-2` : ''}`}
                      style={{ borderLeftColor: color, ...(isActive ? { boxShadow: `0 0 0 2px ${color}` } : {}) }}
                    >
                      <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: `${color}15` }}>
                        <img src={icon} className="w-6 h-6 object-contain" alt={key} />
                      </div>
                      <span className="font-headline text-[16px] font-bold text-[#191c1d] flex-1">{key}</span>
                      {isActive && (
                        <span className="material-symbols-outlined text-[24px]" style={{ color }}>check_circle</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </section>

          </div>

          {/* RIGHT COLUMN — Time Pickers + Customer Info */}
          <div className="space-y-5">

            {/* Time Selection */}
            <section className="space-y-2">
              <h2 className="font-headline text-[16px] font-bold text-[#727785] uppercase tracking-wider">THỜI GIAN</h2>
              <div className="grid grid-cols-2 gap-4">
                <LargeTimePicker label="BẮT ĐẦU" value={startTime} onChange={setStartTime} />
                <LargeTimePicker label="KẾT THÚC" value={endTime} onChange={setEndTime} />
              </div>
            </section>

            {/* Customer Info */}
            <section className="space-y-2">
              <h2 className="font-headline text-[16px] font-bold text-[#727785] uppercase tracking-wider">KHÁCH HÀNG</h2>
              <div className="space-y-2.5">
                <div className="flex items-center bg-white border-b-2 border-[#e0e3e8] rounded-xl shadow-sm px-5 h-14 gap-3 hover:border-[#c1c6d6] focus-within:border-[#1a73e8] focus-within:ring-4 focus-within:ring-[#1a73e8]/10 transition-all">
                  <span className="material-symbols-outlined text-[#1a73e8] text-[22px]">person</span>
                  <input
                    type="text"
                    placeholder="Tên khách hàng (không bắt buộc)"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    maxLength={100}
                    className="flex-1 bg-transparent border-none outline-none font-body text-[15px] font-medium text-[#191c1d] placeholder:text-[#a0a4b0]"
                  />
                </div>
                <div className="flex items-center bg-white border-b-2 border-[#e0e3e8] rounded-xl shadow-sm px-5 h-14 gap-3 hover:border-[#c1c6d6] focus-within:border-[#1a73e8] focus-within:ring-4 focus-within:ring-[#1a73e8]/10 transition-all">
                  <span className="material-symbols-outlined text-[#1a73e8] text-[22px]">phone</span>
                  <input
                    type="tel"
                    placeholder="Số điện thoại (không bắt buộc)"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none font-body text-[15px] font-medium text-[#191c1d] placeholder:text-[#a0a4b0]"
                  />
                </div>
              </div>
            </section>

          </div>

        </div>

        {/* Full-Width Footer — Actions */}
        <footer className="px-8 pb-6 pt-4 border-t border-[#e0e3e8] flex gap-4">
          {validationError && (
            <div className="flex items-center gap-3 bg-[#ffdad6] text-[#ba1a1a] px-5 py-3 rounded-xl text-[14px] font-medium shrink-0">
              <span className="material-symbols-outlined text-[18px]">error</span>
              {validationError}
            </div>
          )}
          <div className="flex-1" />
          <button type="button" onClick={onClose} className="px-10 h-14 bg-[#e7e8e9] hover:bg-[#d9dadb] text-[#191c1d] font-headline text-[18px] font-bold rounded-xl active:scale-95 transition-all uppercase tracking-wide border-none outline-none">
            HỦY
          </button>
          <button type="button" onClick={handleConfirm} className="px-10 h-14 bg-gradient-to-b from-[#1A73E8] to-[#005BBF] hover:brightness-110 text-white font-headline text-[18px] font-bold rounded-xl shadow-[0px_8px_24px_rgba(33,37,41,0.08)] active:scale-95 transition-all uppercase tracking-wide border-none outline-none">
            XÁC NHẬN
          </button>
        </footer>

      </div >

      <DateSelectionModal
        isOpen={isDateSelectionModalOpen}
        onClose={() => setIsDateSelectionModalOpen(false)}
        initialDate={selectedDate}
        onConfirm={(d) => setSelectedDate(d)}
      />
    </div>
  );
}
