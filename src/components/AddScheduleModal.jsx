import React, { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { useApp } from '../context/AppContext';
import { DateSelectionModal } from './DateSelectionModal';

const HOURS = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
const MINUTES = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

function LargeTimePicker({ value, onChange, label }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const [currentHour, currentMinute] = value ? value.split(':') : ['08', '00'];

  const hourRef = useRef(null);
  const minRef = useRef(null);

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
            <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex flex-col items-center gap-1 py-[100px] outline-none" style={{ scrollSnapType: 'y mandatory', scrollBehavior: 'smooth' }}>
              {HOURS.map(h => {
                const isSelected = h === currentHour;
                return (
                  <button
                    key={`h-${h}`}
                    ref={isSelected ? hourRef : null}
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
            <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex flex-col items-center gap-1 py-[100px] outline-none" style={{ scrollSnapType: 'y mandatory', scrollBehavior: 'smooth' }}>
              {MINUTES.map(m => {
                const isSelected = m === currentMinute;
                return (
                  <button
                    key={`m-${m}`}
                    ref={isSelected ? minRef : null}
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

export function AddScheduleModal({ isOpen, onClose }) {
  const { fields, schedules, addSchedule, addActivity } = useApp();

  const [selectedSport, setSelectedSport] = useState('Pickleball');
  const [selectedFieldId, setSelectedFieldId] = useState('');

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDateSelectionModalOpen, setIsDateSelectionModalOpen] = useState(false);

  // Initialize Simple string times
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('11:00');
  const [validationError, setValidationError] = useState('');

  // Reset form when opened
  useEffect(() => {
    if (isOpen) {
      setSelectedSport('Pickleball');
      setSelectedFieldId(fields.length > 0 ? fields[0].id : '');
      setSelectedDate(new Date());
      setStartTime('09:00');
      setEndTime('11:00');
      setValidationError('');
    }
  }, [isOpen, fields]);

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
    const overlapping = schedules.find((s) => {
      if (s.fieldId !== selectedFieldId || s.date !== dateStr) return false;
      const existStart = timeToMinutes(s.startTime);
      const existEnd = timeToMinutes(s.endTime);
      return startMin < existEnd && endMin > existStart;
    });

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
    };

    addSchedule(newSchedule);
    addActivity({
      message: `Lịch trình mới: ${selectedSport} tại ${selectedField?.name || 'Sân'} từ ${startTime} đến ${endTime}.`,
      type: 'info',
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#191c1d]/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4 antialiased">
      <div className="w-full max-w-lg bg-[#f8f9fa] border-none rounded-[1.5rem] shadow-[0_8px_24px_rgba(33,37,41,0.08)] overflow-visible flex flex-col max-h-[85vh] relative animate-in fade-in zoom-in duration-200">

        {/* Header */}
        <header className="px-8 pt-8 pb-6 flex justify-between items-start bg-[#f8f9fa] shrink-0 rounded-t-[1.5rem] z-10">
          <h1 className="font-headline text-[32px] font-bold leading-tight tracking-tight text-[#191c1d] uppercase">
            THÊM LỊCH MỚI
          </h1>
          <button
            onClick={onClose}
            className="w-14 h-14 flex items-center justify-center rounded-full bg-[#e7e8e9] hover:bg-[#d1d5db] text-[#191c1d] active:scale-90 transition-all border-none"
          >
            <span className="material-symbols-outlined text-[32px]">close</span>
          </button>
        </header>

        {/* Body */}
        <div className="px-8 pb-8 overflow-y-auto flex-grow space-y-8" style={{ WebkitOverflowScrolling: 'touch' }}>

          {/* Select Date */}
          <section className="space-y-4">
            <h2 className="font-headline text-[24px] font-bold text-[#191c1d] uppercase block">CHỌN NGÀY</h2>
            <button type="button" onClick={() => setIsDateSelectionModalOpen(true)} className="w-full h-20 bg-white border-b-2 border-[#e0e3e8] outline-none flex items-center px-6 gap-4 shadow-sm rounded-xl active:bg-[#f3f4f5] transition-colors text-left hover:border-[#c1c6d6]">
              <span className="material-symbols-outlined text-[#1a73e8] text-[32px]">calendar_today</span>
              <span className="font-body text-[18px] font-medium text-[#191c1d]">{dateDisplayString}</span>
            </button>
          </section>

          {/* Select Zone */}
          <section className="space-y-4">
            <h2 className="font-headline text-[24px] font-bold text-[#191c1d] uppercase block">CHỌN SÂN</h2>
            <div className="relative">
              <select
                value={selectedFieldId}
                onChange={(e) => setSelectedFieldId(e.target.value)}
                className="w-full h-20 bg-white border-b-2 border-[#e0e3e8] font-body text-[18px] font-medium text-[#191c1d] px-6 rounded-xl appearance-none shadow-sm hover:border-[#c1c6d6] focus:border-[#1a73e8] focus:ring-4 focus:ring-[#1a73e8]/10 outline-none cursor-pointer transition-all"
              >
                {fields.map((field) => (
                  <option key={field.id} value={field.id}>{field.name}</option>
                ))}
              </select>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                <span className="material-symbols-outlined text-[#727785] text-[32px]">expand_more</span>
              </div>
            </div>
          </section>

          {/* Sports Selection */}
          <section className="space-y-4">
            <h2 className="font-headline text-[24px] font-bold text-[#191c1d] uppercase block">MÔN THỂ THAO</h2>
            <div className="grid grid-cols-1 gap-4">

              <button type="button" onClick={() => setSelectedSport('Bóng chuyền')} className={`group flex items-center p-6 bg-white rounded-xl shadow-sm relative overflow-hidden border-l-[12px] active:scale-[0.98] transition-all text-left outline-none ${selectedSport === 'Bóng chuyền' ? 'border-[#ab3231] ring-2 ring-[#ab3231]' : 'border-[#ab3231]'}`}>
                <div className="w-14 h-14 rounded-full bg-[#ab3231]/10 flex items-center justify-center mr-6 shrink-0">
                  <span className="material-symbols-outlined text-[#ab3231] text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>sports_volleyball</span>
                </div>
                <div className="flex flex-col flex-1">
                  <span className="font-headline text-[18px] font-bold text-[#191c1d]">Bóng chuyền</span>
                  {selectedSport === 'Bóng chuyền' && (
                    <span className="text-[#ab3231] font-bold text-[14px] uppercase mt-1 tracking-wide">Đã chọn</span>
                  )}
                </div>
                {selectedSport === 'Bóng chuyền' && (
                  <div className="ml-auto">
                    <span className="material-symbols-outlined text-[#ab3231] text-[32px]">check_circle</span>
                  </div>
                )}
              </button>

              <button type="button" onClick={() => setSelectedSport('Cầu lông')} className={`group flex items-center p-6 bg-white rounded-xl shadow-sm relative overflow-hidden border-l-[12px] active:scale-[0.98] transition-all text-left outline-none ${selectedSport === 'Cầu lông' ? 'border-[#006a6a] ring-2 ring-[#006a6a]' : 'border-[#006a6a]'}`}>
                <div className="w-14 h-14 rounded-full bg-[#006a6a]/10 flex items-center justify-center mr-6 shrink-0">
                  <span className="material-symbols-outlined text-[#006a6a] text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>sports_tennis</span>
                </div>
                <div className="flex flex-col flex-1">
                  <span className="font-headline text-[18px] font-bold text-[#191c1d]">Cầu lông</span>
                  {selectedSport === 'Cầu lông' && (
                    <span className="text-[#006a6a] font-bold text-[14px] uppercase mt-1 tracking-wide">Đã chọn</span>
                  )}
                </div>
                {selectedSport === 'Cầu lông' && (
                  <div className="ml-auto">
                    <span className="material-symbols-outlined text-[#006a6a] text-[32px]">check_circle</span>
                  </div>
                )}
              </button>

              <button type="button" onClick={() => setSelectedSport('Pickleball')} className={`group flex items-center p-6 bg-white rounded-xl shadow-sm relative overflow-hidden border-l-[12px] active:scale-[0.98] transition-all text-left outline-none ${selectedSport === 'Pickleball' ? 'border-[#1a73e8] ring-2 ring-[#1a73e8]' : 'border-[#1a73e8]'}`}>
                <div className="w-14 h-14 rounded-full bg-[#1A73E8]/10 flex items-center justify-center mr-6 shrink-0">
                  <span className="material-symbols-outlined text-[#1a73e8] text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>sports_handball</span>
                </div>
                <div className="flex flex-col flex-1">
                  <span className="font-headline text-[18px] font-bold text-[#191c1d]">Pickleball</span>
                  {selectedSport === 'Pickleball' && (
                    <span className="text-[#1a73e8] font-bold text-[14px] uppercase mt-1 tracking-wide">Đã chọn</span>
                  )}
                </div>
                {selectedSport === 'Pickleball' && (
                  <div className="ml-auto">
                    <span className="material-symbols-outlined text-[#1a73e8] text-[32px]">check_circle</span>
                  </div>
                )}
              </button>

            </div>
          </section>

          {/* Time Selection with Large UI */}
          <section className="space-y-4">
            <h2 className="font-headline text-[24px] font-bold text-[#191c1d] uppercase block">THỜI GIAN</h2>
            <div className="grid grid-cols-2 gap-4">
              <LargeTimePicker label="BẮT ĐẦU" value={startTime} onChange={setStartTime} />
              <LargeTimePicker label="KẾT THÚC" value={endTime} onChange={setEndTime} />
            </div>
          </section>

        </div>

        {/* Footer */}
        <footer className="p-8 bg-[#f3f4f5] border-t border-[#c1c6d6]/20 flex flex-col gap-4 relative z-0 shrink-0">
          {validationError && (
            <div className="flex items-center gap-3 bg-[#ffdad6] text-[#ba1a1a] px-5 py-3.5 rounded-xl text-[16px] font-medium">
              <span className="material-symbols-outlined text-[20px]">error</span>
              {validationError}
            </div>
          )}
          <button type="button" onClick={handleConfirm} className="w-full h-16 bg-gradient-to-b from-[#1A73E8] to-[#005BBF] hover:brightness-110 text-white font-headline text-[20px] font-bold rounded-xl shadow-[0px_8px_24px_rgba(33,37,41,0.08)] active:scale-95 transition-all uppercase tracking-wide border-none outline-none">
            XÁC NHẬN
          </button>
          <button type="button" onClick={onClose} className="w-full h-16 bg-[#e7e8e9] hover:bg-[#d9dadb] text-[#191c1d] font-headline text-[20px] font-bold rounded-xl active:scale-95 transition-all uppercase tracking-wide border-none outline-none">
            HỦY
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
