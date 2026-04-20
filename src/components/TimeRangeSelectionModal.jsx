import React, { useState, useEffect } from 'react';

export function TimeRangeSelectionModal({ isOpen, onClose, initialStartTime = "08:00", initialEndTime = "10:00", onConfirm }) {
  const [editingTarget, setEditingTarget] = useState('start');
  const [startClock, setStartClock] = useState({ hour: 8, minute: 0 });
  const [endClock, setEndClock] = useState({ hour: 10, minute: 0 });

  useEffect(() => {
    if (isOpen) {
      const [sh, sm] = (initialStartTime || "08:00").split(':');
      setStartClock({ hour: parseInt(sh, 10), minute: parseInt(sm, 10) });
      const [eh, em] = (initialEndTime || "10:00").split(':');
      setEndClock({ hour: parseInt(eh, 10), minute: parseInt(em, 10) });
      setEditingTarget('start');
    }
  }, [isOpen, initialStartTime, initialEndTime]);

  if (!isOpen) return null;

  const currentClock = editingTarget === 'start' ? startClock : endClock;
  
  const updateCurrent = (updater) => {
    if (editingTarget === 'start') {
      setStartClock(updater);
    } else {
      setEndClock(updater);
    }
  };

  const pad = n => n.toString().padStart(2, '0');

  const handleHourUp = () => updateCurrent(prev => ({ ...prev, hour: (prev.hour + 1) % 24 }));
  const handleHourDown = () => updateCurrent(prev => ({ ...prev, hour: (prev.hour - 1 + 24) % 24 }));
  const handleMinuteUp = () => updateCurrent(prev => ({ ...prev, minute: (prev.minute + 15) % 60 }));
  const handleMinuteDown = () => updateCurrent(prev => ({ ...prev, minute: (prev.minute - 15 + 60) % 60 }));

  const handleConfirm = () => {
    onConfirm({
      startTime: `${pad(startClock.hour)}:${pad(startClock.minute)}`,
      endTime: `${pad(endClock.hour)}:${pad(endClock.minute)}`
    });
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
        <div className="px-10 py-6 space-y-8">
          
          {/* Time Range Status Cards */}
          <div className="grid grid-cols-2 gap-5">
            <button 
              onClick={() => setEditingTarget('start')}
              className={`p-6 rounded-3xl flex flex-col items-center transition-all outline-none ${editingTarget === 'start' ? 'bg-[#f0f4ff] border-[2.5px] border-[#1a73e8] shadow-md scale-105' : 'bg-[#f3f4f5] border-[2.5px] border-transparent hover:border-[#c1c6d6] text-[#414754]'}`}
            >
              <span className="font-medium text-[18px] mb-1 tracking-wide">Bắt đầu</span>
              <span className={`text-[28px] font-extrabold tracking-tight ${editingTarget === 'start' ? 'text-[#1a73e8]' : 'text-[#727785]'}`}>
                {pad(startClock.hour)}:{pad(startClock.minute)}
              </span>
            </button>
            <button 
              onClick={() => setEditingTarget('end')}
              className={`p-6 rounded-3xl flex flex-col items-center transition-all outline-none ${editingTarget === 'end' ? 'bg-[#f0f4ff] border-[2.5px] border-[#1a73e8] shadow-md scale-105' : 'bg-[#f3f4f5] border-[2.5px] border-transparent hover:border-[#c1c6d6] text-[#414754]'}`}
            >
              <span className="font-medium text-[18px] mb-1 tracking-wide">Kết thúc</span>
              <span className={`text-[28px] font-extrabold tracking-tight ${editingTarget === 'end' ? 'text-[#1a73e8]' : 'text-[#727785]'}`}>
                {pad(endClock.hour)}:{pad(endClock.minute)}
              </span>
            </button>
          </div>
          
          {/* Massive Time Picker Widget */}
          <div className="bg-[#f3f4f5] rounded-[2rem] p-8 flex flex-col items-center border border-gray-100 shadow-sm mt-4">
            <div className="flex items-center justify-center gap-8 w-full px-4">
               
               {/* Hour Column */}
               <div className="flex flex-col items-center gap-4 flex-1">
                 <span className="text-[20px] font-bold text-[#414754] uppercase tracking-widest">GIỜ</span>
                 <div className="flex flex-col items-center w-full bg-white rounded-3xl py-6 border border-[#e0e3e8]" style={{ boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.03)' }}>
                   <button onClick={handleHourUp} className="material-symbols-outlined text-[#c1c6d6] text-[56px] hover:text-[#1a73e8] active:scale-90 transition-transform outline-none">expand_less</button>
                   <span className="text-[76px] font-extrabold text-[#191c1d] leading-none py-1 select-none tracking-tighter">{pad(currentClock.hour)}</span>
                   <button onClick={handleHourDown} className="material-symbols-outlined text-[#c1c6d6] text-[56px] hover:text-[#1a73e8] active:scale-90 transition-transform outline-none">expand_more</button>
                 </div>
               </div>
               
               {/* Separator */}
               <div className="text-[64px] font-extrabold text-[#727785] pt-12 select-none px-2 mb-2">:</div>
               
               {/* Minute Column */}
               <div className="flex flex-col items-center gap-4 flex-1">
                 <span className="text-[20px] font-bold text-[#414754] uppercase tracking-widest">PHÚT</span>
                 <div className="flex flex-col items-center w-full bg-white rounded-3xl py-6 border border-[#e0e3e8]" style={{ boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.03)' }}>
                   <button onClick={handleMinuteUp} className="material-symbols-outlined text-[#c1c6d6] text-[56px] hover:text-[#1a73e8] active:scale-90 transition-transform outline-none">expand_less</button>
                   <span className="text-[76px] font-extrabold text-[#191c1d] leading-none py-1 select-none tracking-tighter">{pad(currentClock.minute)}</span>
                   <button onClick={handleMinuteDown} className="material-symbols-outlined text-[#c1c6d6] text-[56px] hover:text-[#1a73e8] active:scale-90 transition-transform outline-none">expand_more</button>
                 </div>
               </div>
               
            </div>
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
