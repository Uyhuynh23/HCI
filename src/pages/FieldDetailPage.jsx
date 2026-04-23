import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { AddScheduleModal } from '../components/AddScheduleModal';
import { playSuccessSound } from '../utils/audio';
import { format } from 'date-fns';

const SPORT_CONFIG = {
  Pickleball: { icon: 'mountain_steam', color: 'bg-blue-400', textColor: 'text-white', statusBorder: 'border-[#1a73e8]', statusBg: 'bg-[#d8e2ff]', statusText: 'text-[#1a73e8]' },
  'Cầu lông': { icon: 'sports_tennis', color: 'bg-[#006e25]', textColor: 'text-white', statusBorder: 'border-[#006e25]', statusBg: 'bg-[#dcfce7]', statusText: 'text-[#006e25]' },
  'Bóng chuyền': { icon: 'sports_volleyball', color: 'bg-[#d9534f]', textColor: 'text-white', statusBorder: 'border-[#d9534f]', statusBg: 'bg-[#ffdad7]', statusText: 'text-[#d9534f]' },
};

function formatTime(seconds) {
  if (seconds == null || seconds <= 0) return '--:--';
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function FieldDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fields, schedules, updateField, addActivity } = useApp();

  const [isTurnOffModalOpen, setIsTurnOffModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const field = fields.find((f) => f.id === id);
  const intervalRef = useRef(null);

  // Live countdown timer
  useEffect(() => {
    if (!field) return;

    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (field.status === 'active' && field.timeRemaining > 0) {
      intervalRef.current = setInterval(() => {
        const currentField = fields.find((f) => f.id === id);
        if (!currentField || currentField.status !== 'active' || !currentField.timeRemaining || currentField.timeRemaining <= 0) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          return;
        }

        const newTime = currentField.timeRemaining - 1;
        if (newTime <= 0) {
          // Timer reached zero
          updateField(id, { status: 'idle', timeRemaining: null });
          addActivity({
            message: `Hết thời gian tại ${currentField.name}. Đèn đã tự động tắt.`,
            type: 'warning',
          });
          playSuccessSound();
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        } else {
          updateField(id, { timeRemaining: newTime });
        }
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [field?.status, field?.id]);

  // Field not found
  if (!field) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-[#f8f9fa] gap-6">
        <span className="material-symbols-outlined text-[80px] text-surface-dim">error_outline</span>
        <h2 className="text-[32px] font-bold text-on-surface-variant">Không tìm thấy sân</h2>
        <p className="text-[18px] text-on-surface-variant">Sân với ID "{id}" không tồn tại.</p>
        <button
          onClick={() => navigate('/fields')}
          className="px-8 py-3 bg-primary text-on-primary rounded-xl font-bold text-[18px] active:scale-95 transition-all"
        >
          Quay lại danh sách sân
        </button>
      </div>
    );
  }

  const sportConfig = SPORT_CONFIG[field.sport] || SPORT_CONFIG['Pickleball'];
  const today = format(new Date(), 'yyyy-MM-dd');
  const todaySchedules = schedules
    .filter((s) => s.fieldId === field.id && s.date === today)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  // Current time for display
  const now = new Date();
  const currentTime = format(now, 'HH:mm');

  const handleSportChange = (sport) => {
    updateField(field.id, { sport, status: 'active', timeRemaining: 3600 });
    addActivity({
      message: `${field.name} đã chuyển sang chế độ ${sport}.`,
      type: 'info',
    });
  };

  const handleTurnOffLights = () => {
    updateField(field.id, { status: 'idle', timeRemaining: null });
    addActivity({
      message: `Đã tắt toàn bộ đèn tại ${field.name}.`,
      type: 'warning',
    });
    playSuccessSound();
    setIsTurnOffModalOpen(false);
  };

  const getScheduleStatus = (schedule) => {
    const nowMinutes = now.getHours() * 60 + now.getMinutes();
    const [sh, sm] = schedule.startTime.split(':').map(Number);
    const [eh, em] = schedule.endTime.split(':').map(Number);
    const startMinutes = sh * 60 + sm;
    const endMinutes = eh * 60 + em;

    if (nowMinutes >= startMinutes && nowMinutes < endMinutes) return 'ongoing';
    if (nowMinutes < startMinutes) return 'upcoming';
    return 'completed';
  };

  return (
    <div className="flex-1 flex flex-col bg-[#f8f9fa] overflow-y-auto relative antialiased">
      {/* TopNavBar */}
      <header className="sticky top-0 w-full h-20 flex justify-between items-center px-10 z-30 bg-slate-50/85 backdrop-blur-md shadow-sm shrink-0">
        <div className="flex items-center gap-4">
           <button 
             onClick={() => navigate('/fields')} 
             className="hover:bg-slate-200 rounded-full p-2 transition-colors flex items-center justify-center active:scale-95"
           >
             <span className="material-symbols-outlined text-slate-700">arrow_back</span>
           </button>
           <h2 className="text-[32px] font-bold uppercase text-slate-900 leading-[1.2]">QUẢN LÝ {field.name.toUpperCase()}</h2>
        </div>
        <div className="flex items-center gap-6">
          <button className="hover:bg-slate-200 rounded-full p-2 transition-colors duration-300 ease-in-out active:scale-95">
            <span className="material-symbols-outlined text-blue-700 text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>notifications</span>
          </button>
          <div className="h-10 w-[1px] bg-slate-300"></div>
          <span className="text-[16px] font-bold text-slate-900">{currentTime}</span>
        </div>
      </header>

      {/* Main Content Canvas */}
      <div className="p-10 grid grid-cols-10 gap-8 min-h-[1024px]">
        {/* Left Column (60%) */}
        <section className="col-span-6 flex flex-col gap-8">
          
          {/* Status Card */}
          <div className={`bg-white p-10 rounded-[2rem] shadow-sm flex items-center gap-8 border-l-[12px] ${sportConfig.statusBorder}`}>
            <div className={`${sportConfig.statusBg} w-24 h-24 rounded-2xl flex items-center justify-center ${sportConfig.statusText} shrink-0`}>
              <span className="material-symbols-outlined text-[60px]" style={{ fontVariationSettings: "'FILL' 1" }}>{sportConfig.icon}</span>
            </div>
            <div className="flex-1 flex flex-col">
              <h3 className="text-[16px] font-bold text-slate-500 tracking-widest uppercase mb-1">{field.name.toUpperCase()}</h3>
              <p className="text-[20px] font-bold text-[#212529] mb-2 leading-[1.4]">
                {field.status === 'active' ? `ĐANG CHIẾU: 1 SÂN ${field.sport.toUpperCase()}` : 'ĐÈN TẮT'}
              </p>
              <div className="flex items-center gap-2 text-[#1a73e8] font-bold text-[20px]">
                <span className="material-symbols-outlined">timer</span>
                <span>Thời gian còn lại: {formatTime(field.timeRemaining)}</span>
              </div>
            </div>
          </div>

          {/* Quick Controls */}
          <div className="flex flex-col gap-6">
            <h3 className="text-[24px] font-bold text-[#212529] px-2">Thay đổi nhanh</h3>
            <div className="grid grid-cols-3 gap-4">
               <button 
                 onClick={() => handleSportChange('Bóng chuyền')}
                 className={`p-6 rounded-2xl flex flex-col items-center justify-center gap-4 h-48 shadow-lg active:scale-95 transition-transform text-white font-bold text-[20px] ${field.sport === 'Bóng chuyền' ? 'bg-[#d9534f] ring-4 ring-[#d9534f]/40' : 'bg-[#d9534f]'}`}
               >
                  <span className="material-symbols-outlined text-[48px]" style={{ fontVariationSettings: "'FILL' 1" }}>sports_volleyball</span>
                  <span>Bóng chuyền</span>
               </button>
               <button 
                 onClick={() => handleSportChange('Cầu lông')}
                 className={`p-6 rounded-2xl flex flex-col items-center justify-center gap-4 h-48 shadow-lg active:scale-95 transition-transform text-white font-bold text-[20px] ${field.sport === 'Cầu lông' ? 'bg-[#006e25] ring-4 ring-[#006e25]/40' : 'bg-[#006e25]'}`}
               >
                  <span className="material-symbols-outlined text-[48px]" style={{ fontVariationSettings: "'FILL' 1" }}>sports_tennis</span>
                  <span className="text-center leading-tight">Cầu lông</span>
               </button>
               <button 
                 onClick={() => handleSportChange('Pickleball')}
                 className={`p-6 rounded-2xl flex flex-col items-center justify-center gap-4 h-48 shadow-lg active:scale-95 transition-transform text-white font-bold text-[20px] ${field.sport === 'Pickleball' ? 'bg-blue-400 ring-4 ring-blue-400/40' : 'bg-blue-400'}`}
               >
                  <span className="material-symbols-outlined text-[48px]" style={{ fontVariationSettings: "'FILL' 1" }}>mountain_steam</span>
                  <span className="text-center leading-tight">Pickleball</span>
               </button>
            </div>
          </div>

          {/* Turn Off All */}
          <div className="mt-8 flex justify-center">
            <button onClick={() => setIsTurnOffModalOpen(true)} className="w-fit px-10 bg-[#ba1a1a] rounded-2xl flex items-center justify-center gap-4 active:scale-[0.98] transition-transform shadow-xl text-white h-16 border-none">
               <div className="flex items-center gap-6">
                 <span className="material-symbols-outlined text-[24px]" style={{ fontWeight: 300 }}>power_settings_new</span>
                 <span className="font-bold uppercase tracking-tight text-[20px]">TẮT TOÀN BỘ ĐÈN</span>
               </div>
            </button>
          </div>

        </section>

        {/* Right Column (40%) */}
        <section className="col-span-4 bg-[#f1f4f9] rounded-[2rem] p-8 flex flex-col h-fit">
          <h3 className="text-[24px] font-bold text-[#212529] mb-8">Lịch trình hôm nay</h3>
          <div className="flex-1 flex flex-col gap-6">
            {todaySchedules.map((schedule) => {
              const status = getScheduleStatus(schedule);
              return (
                <div 
                  key={schedule.id} 
                  className={`bg-white p-6 rounded-2xl flex items-start gap-5 shadow-sm ${
                    status === 'completed' ? 'opacity-60' : status === 'upcoming' ? 'opacity-80' : ''
                  }`}
                >
                  <div className={`font-bold py-2 px-3 rounded-xl text-[16px] whitespace-nowrap ${
                    status === 'ongoing' ? 'bg-[#d8e2ff] text-[#1a73e8]' : 'bg-[#e0e3e8] text-[#414754]'
                  }`}>
                    {schedule.startTime} - {schedule.endTime}
                  </div>
                  <div className="flex-1">
                    <p className="text-[18px] text-[#212529] font-bold leading-tight">Sân {schedule.sport}</p>
                    {status === 'ongoing' && (
                      <span className="inline-block mt-2 bg-[#006e25] text-white text-[12px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">Diễn ra</span>
                    )}
                    {status === 'upcoming' && (
                      <span className="inline-block mt-2 bg-[#1a73e8] text-white text-[12px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">SẮP TỚI</span>
                    )}
                    {status === 'completed' && (
                      <span className="inline-block mt-2 bg-[#6c757d] text-white text-[12px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">HOÀN THÀNH</span>
                    )}
                  </div>
                </div>
              );
            })}

            {todaySchedules.length === 0 && (
              <div className="flex flex-col items-center justify-center py-8 text-[#6c757d]">
                <span className="material-symbols-outlined text-[48px] mb-2">event_busy</span>
                <p className="text-[16px] font-medium">Chưa có lịch trình hôm nay</p>
              </div>
            )}
          </div>
          
          <button onClick={() => setIsAddModalOpen(true)} className="mt-8 bg-[#1a73e8] text-white h-20 rounded-2xl font-bold text-[20px] flex items-center justify-center gap-3 shadow-[0_12px_24px_rgba(26,115,232,0.3)] active:scale-95 transition-all w-full border-none">
            <span className="material-symbols-outlined text-[28px]">add_circle</span>ĐẶT SÂN
          </button>
        </section>
      </div>

      {/* FAB */}
      <div className="fixed bottom-10 right-10 flex flex-col items-end gap-4 z-50 pointer-events-none">
         <button className="bg-[#1a73e8] w-20 h-20 rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-105 active:scale-95 transition-all group relative pointer-events-auto border-none">
            <span className="material-symbols-outlined text-[40px]">support_agent</span>
            <span className="absolute right-24 bg-[#212529] text-white px-4 py-2 rounded-xl text-[16px] font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Hỗ trợ khẩn cấp</span>
         </button>
      </div>

      {/* Tắt Toàn Bộ Đèn Modal */}
      {isTurnOffModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-[2.5rem] p-10 max-w-[400px] w-full flex flex-col items-center text-center shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <div className="w-24 h-24 bg-[#ffdad6] rounded-full flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-[64px] text-[#ba1a1a]" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
            </div>
            <h2 className="text-[28px] font-black text-[#101828] leading-[1.2] uppercase mb-4 tracking-tight">XÁC NHẬN TẮT<br/>TOÀN BỘ ĐÈN?</h2>
            <p className="text-[16px] text-slate-500 mb-8 leading-normal font-medium">
              Bạn có chắc chắn muốn tắt toàn bộ hệ thống đèn tại {field.name} không? Hành động này sẽ dừng tất cả các trận đấu đang diễn ra.
            </p>
            <div className="flex flex-col gap-3 w-full">
              <button onClick={() => setIsTurnOffModalOpen(false)} className="w-full bg-[#f1f4f9] hover:bg-[#e2e8f0] text-[#101828] font-bold py-4 rounded-2xl text-[18px] transition-colors border-none">
                Không, Quay lại
              </button>
              <button onClick={handleTurnOffLights} className="w-full bg-[#ba1a1a] hover:bg-[#93000a] text-white font-bold py-4 rounded-2xl text-[18px] transition-colors shadow-md border-none">
                Đồng Ý Tắt
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Thêm Lịch Mới Modal */}
      <AddScheduleModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />

    </div>
  );
}
