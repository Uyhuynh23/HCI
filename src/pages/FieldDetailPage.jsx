import React from 'react';
import { useNavigate } from 'react-router-dom';

export function FieldDetailPage() {
  const navigate = useNavigate();

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
           <h2 className="text-[32px] font-bold uppercase text-slate-900 leading-[1.2]">QUẢN LÝ SÂN 2</h2>
        </div>
        <div className="flex items-center gap-6">
          <button className="hover:bg-slate-200 rounded-full p-2 transition-colors duration-300 ease-in-out active:scale-95">
            <span className="material-symbols-outlined text-blue-700 text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>notifications</span>
          </button>
          <div className="h-10 w-[1px] bg-slate-300"></div>
          <span className="text-[16px] font-bold text-slate-900">14:25</span>
        </div>
      </header>

      {/* Main Content Canvas */}
      <div className="p-10 grid grid-cols-10 gap-8 min-h-[1024px]">
        {/* Left Column (60%) */}
        <section className="col-span-6 flex flex-col gap-8">
          
          {/* Status Card */}
          <div className="bg-white p-10 rounded-[2rem] shadow-sm flex items-center gap-8 border-l-[12px] border-[#d9534f]">
            <div className="bg-[#ffdad7] w-24 h-24 rounded-2xl flex items-center justify-center text-[#d9534f] shrink-0">
              <span className="material-symbols-outlined text-[60px]" style={{ fontVariationSettings: "'FILL' 1" }}>sports_volleyball</span>
            </div>
            <div className="flex-1 flex flex-col">
              <h3 className="text-[16px] font-bold text-slate-500 tracking-widest uppercase mb-1">SÁN 02</h3>
              <p className="text-[20px] font-bold text-[#212529] mb-2 leading-[1.4]">ĐANG CHIẾU: 1 SÂN BÓNG CHUYỀN</p>
              <div className="flex items-center gap-2 text-[#1a73e8] font-bold text-[20px]">
                <span className="material-symbols-outlined">timer</span>
                <span>Thời gian còn lại: 00:12</span>
              </div>
            </div>
          </div>

          {/* Quick Controls */}
          <div className="flex flex-col gap-6">
            <h3 className="text-[24px] font-bold text-[#212529] px-2">Thay đổi nhanh</h3>
            <div className="grid grid-cols-3 gap-4">
               <button className="bg-[#d9534f] p-6 rounded-2xl flex flex-col items-center justify-center gap-4 h-48 shadow-lg active:scale-95 transition-transform text-white font-bold text-[20px]">
                  <span className="material-symbols-outlined text-[48px]" style={{ fontVariationSettings: "'FILL' 1" }}>sports_volleyball</span>
                  <span>Bóng chuyền</span>
               </button>
               <button className="bg-[#006e25] p-6 rounded-2xl flex flex-col items-center justify-center gap-4 h-48 shadow-lg active:scale-95 transition-transform text-white font-bold text-[20px]">
                  <span className="material-symbols-outlined text-[48px]" style={{ fontVariationSettings: "'FILL' 1" }}>sports_tennis</span>
                  <span className="text-center leading-tight">Cầu lông</span>
               </button>
               <button className="bg-blue-400 p-6 rounded-2xl flex flex-col items-center justify-center gap-4 h-48 shadow-lg active:scale-95 transition-transform text-white font-bold text-[20px]">
                  <span className="material-symbols-outlined text-[48px]" style={{ fontVariationSettings: "'FILL' 1" }}>mountain_steam</span>
                  <span className="text-center leading-tight">Pickleball</span>
               </button>
            </div>
          </div>

          {/* Swipe Slider / Turn Off All */}
          <div className="mt-8 flex justify-center">
            <button className="w-fit px-10 bg-[#ba1a1a] rounded-2xl flex items-center justify-center gap-4 active:scale-[0.98] transition-transform shadow-xl text-white h-16 border-none">
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
             {/* Slot 1 */}
            <div className="bg-white p-6 rounded-2xl flex items-start gap-5 shadow-sm">
                <div className="bg-[#d8e2ff] text-[#1a73e8] font-bold py-2 px-3 rounded-xl text-[16px] whitespace-nowrap">
                   14:00 - 16:00
                </div>
                <div className="flex-1">
                   <p className="text-[18px] text-[#212529] font-bold leading-tight">Sân Bóng chuyền</p>
                   <span className="inline-block mt-2 bg-[#006e25] text-white text-[12px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">Diễn ra</span>
                </div>
            </div>
             {/* Slot 2 */}
            <div className="bg-white p-6 rounded-2xl flex items-start gap-5 shadow-sm opacity-80">
                <div className="bg-[#e0e3e8] text-[#414754] font-bold py-2 px-3 rounded-xl text-[16px] whitespace-nowrap">
                   16:30 - 18:30
                </div>
                <div className="flex-1">
                   <p className="text-[18px] text-[#212529] font-bold leading-tight">Sân Cầu lông</p>
                   <span className="inline-block mt-2 bg-[#1a73e8] text-white text-[12px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">SẮP TỚI</span>
                </div>
            </div>
             {/* Slot 3 */}
            <div className="bg-white p-6 rounded-2xl flex items-start gap-5 shadow-sm opacity-60">
                <div className="bg-[#e0e3e8] text-[#414754] font-bold py-2 px-3 rounded-xl text-[16px] whitespace-nowrap">
                   19:00 - 21:00
                </div>
                <div className="flex-1">
                   <p className="text-[18px] text-[#212529] font-bold leading-tight">Sân Pickleball</p>
                </div>
            </div>
          </div>
          
          <button className="mt-8 bg-[#1a73e8] text-white h-20 rounded-2xl font-bold text-[20px] flex items-center justify-center gap-3 shadow-[0_12px_24px_rgba(26,115,232,0.3)] active:scale-95 transition-all w-full border-none">
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
    </div>
  );
}
