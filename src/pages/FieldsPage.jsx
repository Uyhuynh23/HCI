import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { AddScheduleModal } from '../components/AddScheduleModal';
import { DateSelectionModal } from '../components/DateSelectionModal';
import { TimeRangeSelectionModal } from '../components/TimeRangeSelectionModal';
import { format } from 'date-fns';
import { getFieldStatus } from '../utils/statusUtils';

const SPORT_CONFIG = {
  Pickleball: { icon: 'sports_tennis', colorClass: 'primary', badgeBg: 'bg-primary/10', badgeText: 'text-primary', borderColor: 'border-primary', iconBg: 'bg-primary-fixed text-on-primary-fixed-variant' },
  'Cầu lông': { icon: 'sports_tennis', colorClass: 'secondary', badgeBg: 'bg-secondary/10', badgeText: 'text-secondary', borderColor: 'border-secondary', iconBg: 'bg-secondary-container text-on-secondary-container' },
  'Bóng chuyền': { icon: 'sports_volleyball', colorClass: 'tertiary', badgeBg: 'bg-tertiary/10', badgeText: 'text-tertiary', borderColor: 'border-tertiary', iconBg: 'bg-tertiary-fixed text-on-tertiary-fixed-variant' },
};

export function FieldsPage() {
  const navigate = useNavigate();
  const { fields, schedules, equipment } = useApp();
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [selectedFilterDate, setSelectedFilterDate] = useState(new Date());
  const [isTimeRangeModalOpen, setIsTimeRangeModalOpen] = useState(false);
  const [timeRange, setTimeRange] = useState({ startTime: '08:00', endTime: '10:00' });
  const [now, setNow] = useState(new Date());

  // Update "now" every second for live status/countdown
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSportFilter, setActiveSportFilter] = useState('Tất cả');
  const [activeStatusFilter, setActiveStatusFilter] = useState('Tất cả');

  // Map fields to include their derived status
  const fieldsWithStatus = fields.map(f => ({
    ...f,
    ...getFieldStatus(f.id, schedules, now)
  }));

  // Notification badge
  const warningCount = equipment.filter((e) => e.connectionStatus !== 'connected').length;

  // Date display
  const dayNames = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
  const isToday = new Date().toDateString() === selectedFilterDate.toDateString();
  const dateDisplayString = isToday 
    ? `Hôm nay, ${format(selectedFilterDate, 'dd')} Tháng ${format(selectedFilterDate, 'MM')}`
    : `${dayNames[selectedFilterDate.getDay()]}, ${format(selectedFilterDate, 'dd')} Tháng ${format(selectedFilterDate, 'MM')}`;

  // Apply filters
  let filteredFields = [...fieldsWithStatus];

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    filteredFields = filteredFields.filter((f) => f.name.toLowerCase().includes(q));
  }

  if (activeSportFilter !== 'Tất cả') {
    filteredFields = filteredFields.filter((f) => f.sport === activeSportFilter);
  }

  if (activeStatusFilter !== 'Tất cả') {
    const statusMap = { 'Hoạt động': 'active', 'Trống': 'idle' };
    filteredFields = filteredFields.filter((f) => f.status === statusMap[activeStatusFilter]);
  }

  const sportFilters = ['Tất cả', 'Pickleball', 'Cầu lông', 'Bóng chuyền'];
  const statusFilters = ['Tất cả', 'Hoạt động', 'Trống'];

  return (
    <div className="flex-1 overflow-y-auto">
      {/* TopNavBar Shell */}
      <header className="h-24 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md sticky top-0 z-40 flex justify-between items-center px-12 shadow-sm border-none">
        <h2 className="h1-style text-on-surface tracking-tight">DANH SÁCH SÂN</h2>
        <div className="flex items-center gap-6">
          <button className="w-12 h-12 flex items-center justify-center text-slate-600 hover:opacity-80 active:translate-y-0.5 duration-200 relative">
            <span className="material-symbols-outlined text-[28px]">notifications</span>
            {warningCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-3 h-3 bg-[#ba1a1a] rounded-full border-2 border-white"></span>
            )}
          </button>
          <button onClick={() => setIsAddModalOpen(true)} className="bg-primary text-on-primary action-style px-8 py-3 rounded-xl editorial-shadow active:translate-y-0.5 duration-200 flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px]">add</span>
            Đặt sân
          </button>
        </div>
      </header>

      {/* Content Area */}
      <div className="p-12 space-y-10 relative">
        {/* Horizontal Filter Bar */}
        <section className="flex flex-col gap-8 bg-surface-container-low p-8 rounded-[2rem]">
          <div className="flex flex-wrap items-end gap-6">
            <div className="flex flex-col gap-2 min-w-[200px]">
              <span className="body-medium-style text-on-surface">Ngày đặt sân</span>
              <div onClick={() => setIsDateModalOpen(true)} className="bg-surface-container-lowest p-4 rounded-xl flex items-center justify-between border border-outline-variant/20 cursor-pointer active:scale-95 transition-transform">
                <span className="body-style">{dateDisplayString}</span>
                <span className="material-symbols-outlined text-primary text-[24px]">calendar_today</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 min-w-[160px]">
              <span className="body-medium-style text-on-surface">Khung giờ</span>
              <div onClick={() => setIsTimeRangeModalOpen(true)} className="bg-surface-container-lowest p-4 rounded-xl flex items-center justify-between border border-outline-variant/20 cursor-pointer active:scale-95 transition-transform">
                <span className="body-style">{timeRange.startTime} - {timeRange.endTime}</span>
                <span className="material-symbols-outlined text-primary text-[24px]">schedule</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 min-w-[280px] flex-1">
              <span className="body-medium-style text-on-surface">Tìm kiếm</span>
              <div className="bg-surface-container-lowest p-4 rounded-xl flex items-center gap-2 border border-outline-variant/20">
                <span className="material-symbols-outlined text-outline text-[24px]">search</span>
                <input 
                  className="bg-transparent border-none focus:ring-0 w-full body-style p-0 outline-none" 
                  placeholder="Tìm kiếm tên sân..." 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-12 border-t border-outline-variant/10 pt-8">
            <div className="flex flex-col gap-3">
              <span className="body-medium-style text-on-surface">Môn thể thao</span>
              <div className="flex gap-2">
                {sportFilters.map((sport) => {
                  const isDisabled = activeStatusFilter === 'Trống';
                  return (
                    <button
                      key={sport}
                      disabled={isDisabled}
                      onClick={() => setActiveSportFilter(sport)}
                      className={`px-6 py-2 rounded-full action-style transition-all ${
                        activeSportFilter === sport
                          ? 'bg-primary text-on-primary shadow-sm'
                          : 'bg-surface-container-lowest text-on-surface-variant border border-outline-variant/20 hover:bg-white'
                      } ${isDisabled ? 'opacity-40 cursor-not-allowed grayscale-[0.5]' : ''}`}
                    >
                      {sport}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <span className="body-medium-style text-on-surface">Trạng thái</span>
              <div className="flex gap-2">
                {statusFilters.map((status) => (
                  <button
                    key={status}
                    onClick={() => {
                      setActiveStatusFilter(status);
                      if (status === 'Trống') {
                        setActiveSportFilter('Tất cả');
                      }
                    }}
                    className={`px-6 py-2 rounded-full action-style transition-colors ${
                      activeStatusFilter === status
                        ? 'bg-primary text-on-primary shadow-sm'
                        : 'bg-surface-container-lowest text-on-surface-variant border border-outline-variant/20 hover:bg-white'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Court List */}
        <section className="space-y-4">
          <div className="grid grid-cols-6 px-8 small-style font-bold uppercase tracking-widest mb-4 gap-4">
            <div className="col-span-2">Thông tin</div>
            <div className="text-center">Môn</div>
            <div className="text-center">Trạng thái</div>
            <div className="text-center">Thời gian còn lại</div>
            <div className="text-right px-4">Hành động</div>
          </div>
          
          {/* List Items */}
          <div className="space-y-8">
            {filteredFields.map((field) => {
              const isIdle = field.status === 'idle';
              const config = SPORT_CONFIG[field.sport] || SPORT_CONFIG['Pickleball'];
              const borderColor = isIdle ? 'border-outline-variant' : config.borderColor;
              const iconBg = isIdle ? 'bg-surface-container text-outline' : config.iconBg;
              const iconName = isIdle ? 'sports_score' : config.icon;

              // Format time remaining from seconds to MM:SS
              const timeDisplay = field.status === 'active' && field.timeRemaining
                ? `${String(Math.floor(field.timeRemaining / 60)).padStart(2, '0')}:${String(field.timeRemaining % 60).padStart(2, '0')}`
                : '--:--';

              return (
                <div
                  key={field.id}
                  className={`grid grid-cols-6 items-center bg-surface-container-lowest p-8 rounded-[1.5rem] editorial-shadow border-l-[6px] ${borderColor} transition-transform hover:scale-[1.01] gap-4`}
                >
                  <div className="col-span-2 flex items-center gap-4">
                    <div className={`w-14 h-14 ${iconBg} rounded-xl flex items-center justify-center`}>
                      <span className="material-symbols-outlined text-[32px]">{iconName}</span>
                    </div>
                    <div>
                      <h3 className="body-medium-style text-on-surface leading-none">{field.name}</h3>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    {isIdle ? (
                      <span className="inline-flex px-4 py-2 rounded-lg bg-surface-container text-outline body-medium-style">—</span>
                    ) : (
                      <span className={`inline-flex px-4 py-2 rounded-lg ${config.badgeBg} ${config.badgeText} body-medium-style uppercase whitespace-nowrap`}>
                        {field.sport}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 justify-center">
                    <span className={`body-medium-style whitespace-nowrap ${field.status === 'active' ? 'text-error' : 'text-outline'}`}>
                      {field.status === 'active' ? 'Hoạt động' : 'Trống'}
                    </span>
                  </div>
                  <div className="text-center flex justify-center items-center">
                    <span className="body-style !text-on-surface whitespace-nowrap">
                      {timeDisplay}
                    </span>
                  </div>
                  <div className="text-right">
                    <button
                      onClick={() => navigate(`/fields/${field.id}`)}
                      className="px-6 py-3 bg-surface-container text-on-surface action-style rounded-xl hover:bg-surface-container-high active:scale-95 transition-all cursor-pointer"
                    >
                      Quản lý
                    </button>
                  </div>
                </div>
              );
            })}

            {filteredFields.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-on-surface-variant">
                <span className="material-symbols-outlined text-[64px] mb-4">search_off</span>
                <p className="text-[20px] font-bold">Không tìm thấy sân phù hợp</p>
              </div>
            )}
          </div>
        </section>

        {/* Floating Quick Action */}
        <button className="absolute bottom-[-10px] right-0 w-20 h-20 bg-primary text-on-primary rounded-full editorial-shadow flex items-center justify-center active:scale-90 transition-transform z-50 fixed">
          <span className="material-symbols-outlined text-[40px]" style={{ fontVariationSettings: "'FILL' 1" }}>help</span>
        </button>
      </div>

      <AddScheduleModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      
      <DateSelectionModal 
        isOpen={isDateModalOpen} 
        onClose={() => setIsDateModalOpen(false)} 
        initialDate={selectedFilterDate} 
        onConfirm={(d) => setSelectedFilterDate(d)} 
      />

      <TimeRangeSelectionModal 
        isOpen={isTimeRangeModalOpen}
        onClose={() => setIsTimeRangeModalOpen(false)}
        initialStartTime={timeRange.startTime}
        initialEndTime={timeRange.endTime}
        onConfirm={setTimeRange}
      />
    </div>
  );
}
