import React from 'react';
import { useNavigate } from 'react-router-dom';

export function FieldsPage() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 overflow-y-auto">
      {/* TopNavBar Shell */}
      <header className="h-24 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md sticky top-0 z-40 flex justify-between items-center px-12 shadow-sm border-none">
        <h2 className="h1-style text-on-surface tracking-tight">DANH SÁCH SÂN</h2>
        <div className="flex items-center gap-6">
          <button className="w-12 h-12 flex items-center justify-center text-slate-600 hover:opacity-80 active:translate-y-0.5 duration-200">
            <span className="material-symbols-outlined text-[28px]">notifications</span>
          </button>
          <button className="bg-primary text-on-primary action-style px-8 py-3 rounded-xl editorial-shadow active:translate-y-0.5 duration-200 flex items-center gap-2">
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
              <div className="bg-surface-container-lowest p-4 rounded-xl flex items-center justify-between border border-outline-variant/20 cursor-pointer">
                <span className="body-style">Hôm nay, 24 Tháng 5</span>
                <span className="material-symbols-outlined text-primary text-[24px]">calendar_today</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 min-w-[160px]">
              <span className="body-medium-style text-on-surface">Khung giờ</span>
              <div className="bg-surface-container-lowest p-4 rounded-xl flex items-center justify-between border border-outline-variant/20 cursor-pointer">
                <span className="body-style">08:00 - 10:00</span>
                <span className="material-symbols-outlined text-primary text-[24px]">schedule</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 min-w-[280px] flex-1">
              <span className="body-medium-style text-on-surface">Tìm kiếm</span>
              <div className="bg-surface-container-lowest p-4 rounded-xl flex items-center gap-2 border border-outline-variant/20">
                <span className="material-symbols-outlined text-outline text-[24px]">search</span>
                <input className="bg-transparent border-none focus:ring-0 w-full body-style p-0" placeholder="Tìm kiếm tên sân..." type="text" />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-12 border-t border-outline-variant/10 pt-8">
            <div className="flex flex-col gap-3">
              <span className="body-medium-style text-on-surface">Môn thể thao</span>
              <div className="flex gap-2">
                <button className="px-6 py-2 rounded-full bg-primary text-on-primary action-style shadow-sm">Tất cả</button>
                <button className="px-6 py-2 rounded-full bg-surface-container-lowest text-on-surface-variant action-style border border-outline-variant/20 hover:bg-white transition-colors">Pickleball</button>
                <button className="px-6 py-2 rounded-full bg-surface-container-lowest text-on-surface-variant action-style border border-outline-variant/20 hover:bg-white transition-colors">Cầu lông</button>
                <button className="px-6 py-2 rounded-full bg-surface-container-lowest text-on-surface-variant action-style border border-outline-variant/20 hover:bg-white transition-colors">Bóng chuyền</button>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <span className="body-medium-style text-on-surface">Trạng thái</span>
              <div className="flex gap-2">
                <button className="px-6 py-2 rounded-full bg-primary text-on-primary action-style shadow-sm">Tất cả</button>
                <button className="px-6 py-2 rounded-full bg-surface-container-lowest text-on-surface-variant action-style border border-outline-variant/20 hover:bg-white transition-colors">Hoạt động</button>
                <button className="px-6 py-2 rounded-full bg-surface-container-lowest text-on-surface-variant action-style border border-outline-variant/20 hover:bg-white transition-colors">Trống</button>
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
            {/* Item 1 */}
            <div className="grid grid-cols-6 items-center bg-surface-container-lowest p-8 rounded-[1.5rem] editorial-shadow border-l-[6px] border-primary transition-transform hover:scale-[1.01] gap-4">
              <div className="col-span-2 flex items-center gap-4">
                <div className="w-14 h-14 bg-primary-fixed text-on-primary-fixed-variant rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-[32px]">sports_tennis</span>
                </div>
                <div>
                  <h3 className="body-medium-style text-on-surface leading-none">Sân 1</h3>
                </div>
              </div>
              <div className="flex justify-center">
                <span className="inline-flex px-4 py-2 rounded-lg bg-primary/10 text-primary body-medium-style uppercase whitespace-nowrap">Pickleball</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <span className="body-medium-style text-error whitespace-nowrap">Hoạt động</span>
              </div>
              <div className="text-center flex justify-center items-center">
                <span className="body-style !text-on-surface whitespace-nowrap">45 phút</span>
              </div>
              <div className="text-right">
                <button className="px-6 py-3 bg-surface-container text-on-surface action-style rounded-xl hover:bg-surface-container-high active:scale-95 transition-all">Quản lý</button>
              </div>
            </div>
            
            {/* Item 2 */}
            <div className="grid grid-cols-6 items-center bg-surface-container-lowest p-8 rounded-[1.5rem] editorial-shadow border-l-[6px] border-secondary transition-transform hover:scale-[1.01] gap-4">
              <div className="col-span-2 flex items-center gap-4">
                <div className="w-14 h-14 bg-secondary-container text-on-secondary-container rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-[32px]">sports_tennis</span>
                </div>
                <div>
                  <h3 className="body-medium-style text-on-surface leading-none">Sân 4</h3>
                </div>
              </div>
              <div className="flex justify-center">
                <span className="inline-flex px-4 py-2 rounded-lg bg-secondary/10 text-secondary body-medium-style uppercase whitespace-nowrap">Cầu lông</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <span className="body-medium-style text-secondary whitespace-nowrap">Trống</span>
              </div>
              <div className="text-center flex justify-center items-center">
                <span className="body-style whitespace-nowrap">--:--</span>
              </div>
              <div className="text-right">
                <button className="px-6 py-3 bg-surface-container text-on-surface action-style rounded-xl hover:bg-surface-container-high active:scale-95 transition-all">Quản lý</button>
              </div>
            </div>

            {/* Item 3 */}
            <div className="grid grid-cols-6 items-center bg-surface-container-lowest p-8 rounded-[1.5rem] editorial-shadow border-l-[6px] border-tertiary transition-transform hover:scale-[1.01] gap-4">
              <div className="col-span-2 flex items-center gap-4">
                <div className="w-14 h-14 bg-tertiary-fixed text-on-tertiary-fixed-variant rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-[32px]">sports_volleyball</span>
                </div>
                <div>
                  <h3 className="body-medium-style text-on-surface leading-none">Sân 2</h3>
                </div>
              </div>
              <div className="flex justify-center">
                <span className="inline-flex px-4 py-2 rounded-lg bg-tertiary/10 text-tertiary body-medium-style uppercase whitespace-nowrap">Bóng chuyền</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <span className="body-medium-style text-error whitespace-nowrap">Hoạt động</span>
              </div>
              <div className="text-center flex justify-center items-center">
                <span className="body-style !text-on-surface whitespace-nowrap">12 phút</span>
              </div>
              <div className="text-right">
                <button onClick={() => navigate('/fields/2')} className="px-6 py-3 bg-surface-container text-on-surface action-style rounded-xl hover:bg-surface-container-high active:scale-95 transition-all cursor-pointer">Quản lý</button>
              </div>
            </div>

            {/* Item 4 */}
            <div className="grid grid-cols-6 items-center bg-surface-container-lowest p-8 rounded-[1.5rem] editorial-shadow border-l-[6px] border-primary transition-transform hover:scale-[1.01] gap-4">
              <div className="col-span-2 flex items-center gap-4">
                <div className="w-14 h-14 bg-primary-fixed text-on-primary-fixed-variant rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-[32px]">sports_tennis</span>
                </div>
                <div>
                  <h3 className="body-medium-style text-on-surface leading-none">Sân 3</h3>
                </div>
              </div>
              <div className="flex justify-center">
                <span className="inline-flex px-4 py-2 rounded-lg bg-primary/10 text-primary body-medium-style uppercase whitespace-nowrap">Pickleball</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <span className="body-medium-style text-secondary whitespace-nowrap">Trống</span>
              </div>
              <div className="text-center flex justify-center items-center">
                <span className="body-style whitespace-nowrap">--:--</span>
              </div>
              <div className="text-right">
                <button className="px-6 py-3 bg-surface-container text-on-surface action-style rounded-xl hover:bg-surface-container-high active:scale-95 transition-all">Quản lý</button>
              </div>
            </div>
          </div>
        </section>

        {/* Floating Quick Action */}
        <button className="absolute bottom-[-10px] right-0 w-20 h-20 bg-primary text-on-primary rounded-full editorial-shadow flex items-center justify-center active:scale-90 transition-transform z-50 fixed">
          <span className="material-symbols-outlined text-[40px]" style={{ fontVariationSettings: "'FILL' 1" }}>help</span>
        </button>
      </div>
    </div>
  );
}
