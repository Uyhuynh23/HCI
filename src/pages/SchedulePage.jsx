import React, { useState, useRef } from 'react';

const DraggableBooking = ({ children, color, widthClass, initialLeftPercent }) => {
  const [offsetX, setOffsetX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const currentX = useRef(0);

  const handlePointerDown = (e) => {
    e.stopPropagation(); // Stop propagation to avoid any parent drag
    // Prevent default on the event to stop text selection inside
    setIsDragging(true);
    startX.current = e.clientX;
    currentX.current = offsetX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX.current;
    setOffsetX(currentX.current + deltaX);
  };

  const handlePointerUp = (e) => {
    setIsDragging(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className="absolute h-20 flex flex-col justify-center px-4 shadow-md cursor-grab active:cursor-grabbing hover:brightness-105 select-none transition-shadow"
      style={{
        left: initialLeftPercent,
        width: widthClass,
        backgroundColor: color,
        borderRadius: "1.5rem 0.25rem 1.5rem 0.25rem",
        transform: `translateX(${offsetX}px)`,
        zIndex: isDragging ? 50 : 10,
        boxShadow: isDragging ? "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)" : undefined,
        touchAction: 'none' // Prevent scrolling when dragging on touch devices
      }}
    >
      {/* Prevent pointer events on children so drag isn't interrupted */}
      <div className="pointer-events-none flex flex-col">
        {children}
      </div>
    </div>
  );
};

export function SchedulePage() {
  return (
    <div className="flex-1 flex flex-col bg-[#F8F9FA] overflow-y-auto">
      {/* TopNavBar */}
      <header className="sticky top-0 w-full px-8 py-6 bg-[#F3F4F5]/90 backdrop-blur-md flex justify-between items-center z-30 border-b border-gray-200 shadow-sm shrink-0">
        <div className="flex items-center gap-4">
          <h2 className="text-[32px] font-bold text-[#191C1D] uppercase tracking-tight">LỊCH TRÌNH TỰ ĐỘNG</h2>
        </div>
        <div className="flex items-center gap-6">
          <button className="bg-[#1a73e8] hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl text-[18px] font-bold flex items-center gap-3 shadow-md active:scale-95 transition-all">
            <span className="material-symbols-outlined text-[24px]">add</span> THÊM LỊCH MỚI
          </button>
          <div className="flex gap-4">
            <button className="p-3 bg-[#e1e3e4] hover:bg-[#d9dadb] rounded-full text-[#191C1D] transition-colors flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">notifications</span>
            </button>
            <button className="p-3 bg-[#e1e3e4] hover:bg-[#d9dadb] rounded-full text-[#191C1D] transition-colors flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">help_outline</span>
            </button>
          </div>
        </div>
      </header>

      {/* Filter Bar */}
      <section className="px-8 py-5 flex gap-4 bg-[#F8F9FA] shrink-0">
        <button className="flex items-center gap-3 bg-[#e1e3e4] hover:bg-[#d9dadb] px-6 py-3.5 rounded-xl text-[18px] font-medium text-[#191C1D] active:scale-95 transition-all outline-none">
          <span className="material-symbols-outlined text-[#005bbf] text-[24px]">event</span> Ngày: Hôm nay, 25 Thg 10
        </button>
        <button className="flex items-center gap-3 bg-[#e1e3e4] hover:bg-[#d9dadb] px-6 py-3.5 rounded-xl text-[18px] font-medium text-[#191C1D] active:scale-95 transition-all outline-none">
          <span className="material-symbols-outlined text-[#005bbf] text-[24px]">location_on</span> Tất cả sân
        </button>
        <button className="flex items-center gap-3 bg-[#e1e3e4] hover:bg-[#d9dadb] px-6 py-3.5 rounded-xl text-[18px] font-medium text-[#191C1D] active:scale-95 transition-all outline-none">
          <span className="material-symbols-outlined text-[#005bbf] text-[24px]">sports_tennis</span> Môn: Tất cả
        </button>
      </section>

      {/* Gantt Chart Container */}
      <section className="flex-1 px-8 pb-8 flex flex-col min-h-[500px]">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 flex-1 flex flex-col relative overflow-x-auto overflow-y-hidden">
          <div className="min-w-[1200px]">
            {/* Time Header */}
            <div className="grid grid-cols-[140px_repeat(12,1fr)] bg-[#e7e8e9] border-b border-[#d9dadb]">
              <div className="p-6 border-r border-[#d9dadb] bg-[#e1e3e4] font-bold text-[18px] flex items-center justify-center text-[#191C1D]">Sân</div>
              <div className="p-6 text-center font-bold text-[16px] text-[#414754]">08:00</div>
              <div className="p-6 text-center font-bold text-[16px] text-[#414754]">09:00</div>
              <div className="p-6 text-center font-bold text-[16px] text-[#414754]">10:00</div>
              <div className="p-6 text-center font-bold text-[16px] text-[#414754]">11:00</div>
              <div className="p-6 text-center font-bold text-[16px] text-[#414754]">12:00</div>
              <div className="p-6 text-center font-bold text-[16px] text-[#414754]">13:00</div>
              <div className="p-6 text-center font-bold text-[16px] text-[#414754]">14:00</div>
              <div className="p-6 text-center font-bold text-[16px] text-[#414754]">15:00</div>
              <div className="p-6 text-center font-bold text-[16px] text-[#414754]">16:00</div>
              <div className="p-6 text-center font-bold text-[16px] text-[#414754]">17:00</div>
              <div className="p-6 text-center font-bold text-[16px] text-[#414754]">18:00</div>
              <div className="p-6 text-center font-bold text-[16px] text-[#414754]">19:00</div>
            </div>

            {/* Grid Rows */}
            <div className="relative">
              {/* Vertical Guide Lines */}
              <div className="absolute inset-0 grid grid-cols-[140px_repeat(12,1fr)] pointer-events-none">
                  <div></div>
                  <div className="border-r border-gray-100"></div>
                  <div className="border-r border-gray-100"></div>
                  <div className="border-r border-gray-100"></div>
                  <div className="border-r border-gray-100"></div>
                  <div className="border-r border-gray-100"></div>
                  <div className="border-r border-gray-100"></div>
                  <div className="border-r border-gray-100"></div>
                  <div className="border-r border-gray-100"></div>
                  <div className="border-r border-gray-100"></div>
                  <div className="border-r border-gray-100"></div>
                  <div className="border-r border-gray-100"></div>
                  <div className="border-r border-gray-100"></div>
              </div>

              {/* 'Now' Line */}
              <div className="absolute top-0 bottom-0 w-[3px] bg-[#005bbf] z-20 pointer-events-none" style={{ left: "calc(140px + 12.5%)" }}>
                <div className="absolute top-[-10px] left-[-36px] bg-[#005bbf] text-white text-[12px] py-1 px-3 rounded-full font-bold whitespace-nowrap z-30">
                  BÂY GIỜ
                </div>
              </div>

              {/* Row 1 */}
              <div className="grid grid-cols-[140px_1fr] border-b border-[#e1e3e4] min-h-[120px]">
                <div className="p-6 border-r border-[#e1e3e4] flex items-center justify-center bg-[#f3f4f5] font-bold text-[20px] text-[#191C1D] z-10">Sân 1</div>
                <div className="relative p-4 flex items-center w-full">
                  <DraggableBooking color="#007BFF" widthClass="25%" initialLeftPercent="0%">
                    <span className="text-white font-bold text-[18px]">Pickleball</span>
                    <span className="text-white/90 text-[14px]">08:00 - 10:00</span>
                  </DraggableBooking>
                  <DraggableBooking color="#28A745" widthClass="16.666%" initialLeftPercent="33.333%">
                    <span className="text-white font-bold text-[18px]">Cầu lông</span>
                    <span className="text-white/90 text-[14px]">11:00 - 12:00</span>
                  </DraggableBooking>
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-[140px_1fr] border-b border-[#e1e3e4] min-h-[120px]">
                <div className="p-6 border-r border-[#e1e3e4] flex items-center justify-center bg-[#f3f4f5] font-bold text-[20px] text-[#191C1D] z-10">Sân 2</div>
                <div className="relative p-4 flex items-center w-full">
                  <DraggableBooking color="#D9534F" widthClass="25%" initialLeftPercent="8.333%">
                    <span className="text-white font-bold text-[18px]">Bóng chuyền</span>
                    <span className="text-white/90 text-[14px]">09:00 - 11:30</span>
                  </DraggableBooking>
                  <DraggableBooking color="#007BFF" widthClass="25%" initialLeftPercent="50%">
                    <span className="text-white font-bold text-[18px]">Pickleball</span>
                    <span className="text-white/90 text-[14px]">14:00 - 16:30</span>
                  </DraggableBooking>
                </div>
              </div>

               {/* Row 3 */}
              <div className="grid grid-cols-[140px_1fr] min-h-[120px]">
                <div className="p-6 border-r border-[#e1e3e4] flex items-center justify-center bg-[#f3f4f5] font-bold text-[20px] text-[#191C1D] z-10">Sân 3</div>
                <div className="relative p-4 flex items-center w-full">
                  <DraggableBooking color="#28A745" widthClass="29.166%" initialLeftPercent="20.833%">
                    <span className="text-white font-bold text-[18px]">Cầu lông</span>
                    <span className="text-white/90 text-[14px]">10:30 - 14:00</span>
                  </DraggableBooking>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Bottom Stats */}
      <footer className="px-8 pb-8 flex gap-8 shrink-0">
        <div className="flex-1 bg-white p-6 rounded-[1.5rem_0.25rem_1.5rem_0.25rem] shadow-sm border border-gray-200 flex justify-between items-center transition-transform hover:scale-[1.02]">
          <div>
            <p className="text-[14px] text-gray-500 font-bold uppercase tracking-widest mb-1">CÔNG SUẤT SỬ DỤNG</p>
            <h3 className="text-[40px] font-black text-[#005bbf] leading-none">82%</h3>
          </div>
          <div className="w-16 h-16 rounded-full bg-[#d8e2ff] flex items-center justify-center shadow-inner">
            <span className="material-symbols-outlined text-[#005bbf] text-[36px]">analytics</span>
          </div>
        </div>
        
        <div className="flex-1 bg-white p-6 rounded-[1.5rem_0.25rem_1.5rem_0.25rem] shadow-sm border border-gray-200 flex justify-between items-center transition-transform hover:scale-[1.02]">
          <div>
            <p className="text-[14px] text-gray-500 font-bold uppercase tracking-widest mb-1">ĐẶT SÂN MỚI (24H)</p>
            <h3 className="text-[40px] font-black text-[#006a6a] leading-none">14</h3>
          </div>
          <div className="w-16 h-16 rounded-full bg-[#93f2f2] flex items-center justify-center shadow-inner">
            <span className="material-symbols-outlined text-[#006a6a] text-[36px]">add_task</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
