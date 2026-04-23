import React, { useState, useRef, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { AddScheduleModal } from '../components/AddScheduleModal';
import { DateSelectionModal } from '../components/DateSelectionModal';
import { format } from 'date-fns';

const SPORT_COLORS = {
  Pickleball: '#007BFF',
  'Cầu lông': '#28A745',
  'Bóng chuyền': '#D9534F',
};

const GANTT_START_HOUR = 8;
const GANTT_END_HOUR = 20; // 08:00 to 20:00 = 12 hours
const GANTT_TOTAL_HOURS = GANTT_END_HOUR - GANTT_START_HOUR;
const GANTT_TOTAL_MINUTES = GANTT_TOTAL_HOURS * 60;
const SNAP_MINUTES = 15; // Snap to 15-min increments

function timeToMinutes(timeStr) {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}

function minutesToTime(mins) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

function timeToPercent(timeStr) {
  const totalMinutes = timeToMinutes(timeStr) - GANTT_START_HOUR * 60;
  return (totalMinutes / GANTT_TOTAL_MINUTES) * 100;
}

function durationPercent(startTime, endTime) {
  const durationMinutes = timeToMinutes(endTime) - timeToMinutes(startTime);
  return (durationMinutes / GANTT_TOTAL_MINUTES) * 100;
}

const DraggableBooking = ({ schedule, color, leftPercent, widthPercent, containerWidth, onDragEnd }) => {
  const [offsetX, setOffsetX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const savedOffset = useRef(0);

  // Calculate the live-preview time based on current drag offset
  const duration = timeToMinutes(schedule.endTime) - timeToMinutes(schedule.startTime);
  const pixelsPerMinute = containerWidth > 0 ? containerWidth / GANTT_TOTAL_MINUTES : 0;
  const deltaMinutes = pixelsPerMinute > 0 ? Math.round(offsetX / pixelsPerMinute / SNAP_MINUTES) * SNAP_MINUTES : 0;
  const previewStartMin = Math.max(GANTT_START_HOUR * 60, Math.min(GANTT_END_HOUR * 60 - duration, timeToMinutes(schedule.startTime) + deltaMinutes));
  const previewEndMin = previewStartMin + duration;
  const previewStart = minutesToTime(previewStartMin);
  const previewEnd = minutesToTime(previewEndMin);

  const handlePointerDown = (e) => {
    e.stopPropagation();
    setIsDragging(true);
    startX.current = e.clientX;
    savedOffset.current = offsetX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const delta = e.clientX - startX.current;
    setOffsetX(savedOffset.current + delta);
  };

  const handlePointerUp = (e) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);

    // Commit the drag — compute new times
    if (deltaMinutes !== 0 && onDragEnd) {
      onDragEnd(schedule.id, previewStart, previewEnd);
    }
    setOffsetX(0); // Reset visual offset — the position will update from new data
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className="absolute h-20 flex flex-col justify-center px-4 shadow-md cursor-grab active:cursor-grabbing hover:brightness-105 select-none transition-shadow"
      style={{
        left: `${leftPercent}%`,
        width: `${widthPercent}%`,
        backgroundColor: color,
        borderRadius: "1.5rem 0.25rem 1.5rem 0.25rem",
        transform: `translateX(${offsetX}px)`,
        zIndex: isDragging ? 50 : 10,
        boxShadow: isDragging ? "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)" : undefined,
        touchAction: 'none'
      }}
    >
      <div className="pointer-events-none flex flex-col">
        <span className="text-white font-bold text-[18px]">{schedule.sport}</span>
        <span className="text-white/90 text-[14px]">{isDragging ? `${previewStart} - ${previewEnd}` : `${schedule.startTime} - ${schedule.endTime}`}</span>
      </div>
    </div>
  );
};

export function SchedulePage() {
  const { fields, schedules, equipment, updateSchedule, addActivity } = useApp();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Measure the timeline content width for drag calculations
  const ganttBodyRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  const measureContainer = useCallback((node) => {
    if (node) {
      ganttBodyRef.current = node;
      setContainerWidth(node.offsetWidth);
      const ro = new ResizeObserver(([entry]) => setContainerWidth(entry.contentRect.width));
      ro.observe(node);
      return () => ro.disconnect();
    }
  }, []);

  const handleDragEnd = (scheduleId, newStart, newEnd) => {
    const sched = schedules.find(s => s.id === scheduleId);
    if (!sched) return;
    updateSchedule(scheduleId, { startTime: newStart, endTime: newEnd });
    addActivity({
      message: `Đã di chuyển lịch ${sched.sport} sang ${newStart} - ${newEnd}.`,
      type: 'info',
    });
  };

  // Filter state
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [filterDate, setFilterDate] = useState(new Date());
  const [filterCourt, setFilterCourt] = useState('Tất cả');
  const [filterSport, setFilterSport] = useState('Tất cả');
  const [showCourtDropdown, setShowCourtDropdown] = useState(false);
  const [showSportDropdown, setShowSportDropdown] = useState(false);

  const warningCount = equipment.filter((e) => e.connectionStatus !== 'connected').length;

  const dayNames = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
  const isToday = new Date().toDateString() === filterDate.toDateString();
  const dateStr = format(filterDate, 'yyyy-MM-dd');
  const dateDisplay = isToday
    ? `Hôm nay, ${format(filterDate, 'dd')} Thg ${format(filterDate, 'MM')}`
    : `${dayNames[filterDate.getDay()]}, ${format(filterDate, 'dd')} Thg ${format(filterDate, 'MM')}`;

  // Filter schedules for selected date
  const todaySchedules = schedules.filter((s) => s.date === dateStr);

  // Filter fields to display
  let displayFields = [...fields];
  if (filterCourt !== 'Tất cả') {
    displayFields = displayFields.filter((f) => f.id === filterCourt);
  }

  // "Now" marker position
  const now = new Date();
  const nowHour = now.getHours();
  const nowMinute = now.getMinutes();
  const nowPercent = ((nowHour - GANTT_START_HOUR) * 60 + nowMinute) / (GANTT_TOTAL_HOURS * 60) * 100;
  const showNowMarker = nowPercent >= 0 && nowPercent <= 100;

  // Compute stats
  const totalFieldHours = fields.length * GANTT_TOTAL_HOURS;
  const bookedHours = todaySchedules.reduce((sum, s) => {
    const [sh, sm] = s.startTime.split(':').map(Number);
    const [eh, em] = s.endTime.split(':').map(Number);
    return sum + ((eh * 60 + em) - (sh * 60 + sm)) / 60;
  }, 0);
  const usagePercent = totalFieldHours > 0 ? Math.round((bookedHours / totalFieldHours) * 100) : 0;

  // 24h booking count
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const recentBookingCount = schedules.filter((s) => s.createdAt && s.createdAt > oneDayAgo).length;

  // Time header columns
  const timeHeaders = Array.from({ length: GANTT_TOTAL_HOURS }, (_, i) => {
    const hour = GANTT_START_HOUR + i;
    return `${String(hour).padStart(2, '0')}:00`;
  });

  return (
    <div className="flex-1 flex flex-col bg-[#F8F9FA] overflow-y-auto">
      {/* TopNavBar */}
      <header className="sticky top-0 w-full px-8 py-6 bg-[#F3F4F5]/90 backdrop-blur-md flex justify-between items-center z-30 border-b border-gray-200 shadow-sm shrink-0">
        <div className="flex items-center gap-4">
          <h2 className="text-[32px] font-bold text-[#191C1D] uppercase tracking-tight">LỊCH TRÌNH TỰ ĐỘNG</h2>
        </div>
        <div className="flex items-center gap-6">
          <button onClick={() => setIsAddModalOpen(true)} className="bg-[#1a73e8] hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl text-[18px] font-bold flex items-center gap-3 shadow-md active:scale-95 transition-all">
            <span className="material-symbols-outlined text-[24px]">add</span> THÊM LỊCH MỚI
          </button>

          <div className="flex gap-4">
            <button className="p-3 bg-[#e1e3e4] hover:bg-[#d9dadb] rounded-full text-[#191C1D] transition-colors flex items-center justify-center relative">
              <span className="material-symbols-outlined text-[24px]">notifications</span>
              {warningCount > 0 && (
                <span className="absolute top-1 right-1 w-3 h-3 bg-[#ba1a1a] rounded-full border-2 border-white"></span>
              )}
            </button>
            <button className="p-3 bg-[#e1e3e4] hover:bg-[#d9dadb] rounded-full text-[#191C1D] transition-colors flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">help_outline</span>
            </button>
          </div>
        </div>
      </header>

      {/* Filter Bar */}
      <section className="px-8 py-5 flex gap-4 bg-[#F8F9FA] shrink-0">
        <button 
          onClick={() => setIsDateModalOpen(true)}
          className="flex items-center gap-3 bg-[#e1e3e4] hover:bg-[#d9dadb] px-6 py-3.5 rounded-xl text-[18px] font-medium text-[#191C1D] active:scale-95 transition-all outline-none"
        >
          <span className="material-symbols-outlined text-[#005bbf] text-[24px]">event</span> Ngày: {dateDisplay}
        </button>

        {/* Court filter dropdown */}
        <div className="relative">
          <button 
            onClick={() => { setShowCourtDropdown(!showCourtDropdown); setShowSportDropdown(false); }}
            className="flex items-center gap-3 bg-[#e1e3e4] hover:bg-[#d9dadb] px-6 py-3.5 rounded-xl text-[18px] font-medium text-[#191C1D] active:scale-95 transition-all outline-none"
          >
            <span className="material-symbols-outlined text-[#005bbf] text-[24px]">location_on</span> 
            {filterCourt === 'Tất cả' ? 'Tất cả sân' : fields.find(f => f.id === filterCourt)?.name || 'Tất cả sân'}
          </button>
          {showCourtDropdown && (
            <div className="absolute top-full mt-2 left-0 bg-white rounded-xl shadow-lg border border-gray-200 z-50 min-w-[200px] overflow-hidden">
              <button 
                onClick={() => { setFilterCourt('Tất cả'); setShowCourtDropdown(false); }}
                className={`w-full text-left px-6 py-3 text-[16px] font-medium hover:bg-[#f1f4f9] transition-colors ${filterCourt === 'Tất cả' ? 'bg-[#f0f4ff] text-[#1a73e8]' : 'text-[#191C1D]'}`}
              >
                Tất cả sân
              </button>
              {fields.map((f) => (
                <button 
                  key={f.id}
                  onClick={() => { setFilterCourt(f.id); setShowCourtDropdown(false); }}
                  className={`w-full text-left px-6 py-3 text-[16px] font-medium hover:bg-[#f1f4f9] transition-colors ${filterCourt === f.id ? 'bg-[#f0f4ff] text-[#1a73e8]' : 'text-[#191C1D]'}`}
                >
                  {f.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sport filter dropdown */}
        <div className="relative">
          <button 
            onClick={() => { setShowSportDropdown(!showSportDropdown); setShowCourtDropdown(false); }}
            className="flex items-center gap-3 bg-[#e1e3e4] hover:bg-[#d9dadb] px-6 py-3.5 rounded-xl text-[18px] font-medium text-[#191C1D] active:scale-95 transition-all outline-none"
          >
            <span className="material-symbols-outlined text-[#005bbf] text-[24px]">sports_tennis</span> 
            Môn: {filterSport}
          </button>
          {showSportDropdown && (
            <div className="absolute top-full mt-2 left-0 bg-white rounded-xl shadow-lg border border-gray-200 z-50 min-w-[200px] overflow-hidden">
              {['Tất cả', 'Pickleball', 'Cầu lông', 'Bóng chuyền'].map((sport) => (
                <button 
                  key={sport}
                  onClick={() => { setFilterSport(sport); setShowSportDropdown(false); }}
                  className={`w-full text-left px-6 py-3 text-[16px] font-medium hover:bg-[#f1f4f9] transition-colors ${filterSport === sport ? 'bg-[#f0f4ff] text-[#1a73e8]' : 'text-[#191C1D]'}`}
                >
                  {sport}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Gantt Chart Container */}
      <section className="flex-1 px-8 pb-8 flex flex-col min-h-[500px]">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 flex-1 flex flex-col relative overflow-x-auto overflow-y-hidden">
          <div className="min-w-[1200px]">
            {/* Time Header */}
            <div className={`grid bg-[#e7e8e9] border-b border-[#d9dadb]`} style={{ gridTemplateColumns: `140px repeat(${GANTT_TOTAL_HOURS}, 1fr)` }}>
              <div className="p-6 border-r border-[#d9dadb] bg-[#e1e3e4] font-bold text-[18px] flex items-center justify-center text-[#191C1D]">Sân</div>
              {timeHeaders.map((t) => (
                <div key={t} className="p-6 text-center font-bold text-[16px] text-[#414754]">{t}</div>
              ))}
            </div>

            {/* Grid Rows */}
            <div className="relative">
              {/* Vertical Guide Lines */}
              <div className="absolute inset-0 pointer-events-none" style={{ display: 'grid', gridTemplateColumns: `140px repeat(${GANTT_TOTAL_HOURS}, 1fr)` }}>
                  <div></div>
                  {timeHeaders.map((t, i) => (
                    <div key={i} className="border-r border-gray-100"></div>
                  ))}
              </div>

              {/* 'Now' Line */}
              {showNowMarker && (
                <div className="absolute top-0 bottom-0 w-[3px] bg-[#005bbf] z-20 pointer-events-none" style={{ left: `calc(140px + ${nowPercent}% * (100% - 140px) / 100)`, marginLeft: `${nowPercent * 0.01 * (100)}%` }}>
                  <div className="absolute top-[-10px] left-[-36px] bg-[#005bbf] text-white text-[12px] py-1 px-3 rounded-full font-bold whitespace-nowrap z-30">
                    BÂY GIỜ
                  </div>
                </div>
              )}

              {displayFields.map((field, rowIdx) => {
                const fieldSchedules = todaySchedules
                  .filter((s) => s.fieldId === field.id)
                  .filter((s) => filterSport === 'Tất cả' || s.sport === filterSport);

                return (
                  <div key={field.id} className={`min-h-[120px] ${rowIdx < displayFields.length - 1 ? 'border-b border-[#e1e3e4]' : ''}`} style={{ display: 'grid', gridTemplateColumns: '140px 1fr' }}>
                    <div className="p-6 border-r border-[#e1e3e4] flex items-center justify-center bg-[#f3f4f5] font-bold text-[20px] text-[#191C1D] z-10">{field.name}</div>
                    <div ref={rowIdx === 0 ? measureContainer : undefined} className="relative p-4 flex items-center w-full">
                      {fieldSchedules.map((schedule) => {
                        const left = timeToPercent(schedule.startTime);
                        const width = durationPercent(schedule.startTime, schedule.endTime);
                        const color = SPORT_COLORS[schedule.sport] || '#007BFF';

                        return (
                          <DraggableBooking
                            key={schedule.id}
                            schedule={schedule}
                            color={color}
                            leftPercent={left}
                            widthPercent={width}
                            containerWidth={containerWidth}
                            onDragEnd={handleDragEnd}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Stats */}
      <footer className="px-8 pb-8 flex gap-8 shrink-0">
        <div className="flex-1 bg-white p-6 rounded-[1.5rem_0.25rem_1.5rem_0.25rem] shadow-sm border border-gray-200 flex justify-between items-center transition-transform hover:scale-[1.02]">
          <div>
            <p className="text-[14px] text-gray-500 font-bold uppercase tracking-widest mb-1">CÔNG SUẤT SỬ DỤNG</p>
            <h3 className="text-[40px] font-black text-[#005bbf] leading-none">{usagePercent}%</h3>
          </div>
          <div className="w-16 h-16 rounded-full bg-[#d8e2ff] flex items-center justify-center shadow-inner">
            <span className="material-symbols-outlined text-[#005bbf] text-[36px]">analytics</span>
          </div>
        </div>
        
        <div className="flex-1 bg-white p-6 rounded-[1.5rem_0.25rem_1.5rem_0.25rem] shadow-sm border border-gray-200 flex justify-between items-center transition-transform hover:scale-[1.02]">
          <div>
            <p className="text-[14px] text-gray-500 font-bold uppercase tracking-widest mb-1">ĐẶT SÂN MỚI (24H)</p>
            <h3 className="text-[40px] font-black text-[#006a6a] leading-none">{recentBookingCount}</h3>
          </div>
          <div className="w-16 h-16 rounded-full bg-[#93f2f2] flex items-center justify-center shadow-inner">
            <span className="material-symbols-outlined text-[#006a6a] text-[36px]">add_task</span>
          </div>
        </div>
      </footer>

      <AddScheduleModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />

      <DateSelectionModal
        isOpen={isDateModalOpen}
        onClose={() => setIsDateModalOpen(false)}
        initialDate={filterDate}
        onConfirm={(d) => setFilterDate(d)}
      />
    </div>
  );
}
