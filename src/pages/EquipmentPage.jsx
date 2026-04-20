import React from 'react';

export function EquipmentPage() {
  return (
    <div className="flex-1 flex flex-col h-full bg-[#f8f9fc] overflow-hidden">
      {/* HEADER */}
      <header className="h-24 flex items-center justify-between px-12 border-b border-gray-200 bg-white shrink-0 shadow-sm">
        <h1 className="text-[32px] font-bold text-[#181c20] tracking-tight uppercase">
          KẾT NỐI THIẾT BỊ
        </h1>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-[#f1f4f9] px-4 py-2 rounded-full">
            <div className="w-2.5 h-2.5 rounded-full bg-[#006e25]"></div>
            <span className="text-[15px] font-medium text-[#414754]">Hệ thống Ổn định</span>
          </div>
          <button className="text-slate-600 hover:bg-slate-100 p-2 rounded-full transition-colors flex items-center justify-center">
            <span className="material-symbols-outlined text-[28px]">notifications</span>
          </button>
          <button className="text-slate-600 hover:bg-slate-100 p-2 rounded-full transition-colors flex items-center justify-center">
            <span className="material-symbols-outlined text-[28px]">settings</span>
          </button>
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-slate-200 transition-opacity active:opacity-80 cursor-pointer">
            <img
              alt="Admin"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQaQZJLev-2VWhffiyzXlT-Dqh6B1mbjYBLJYxWv3kvQAfl4nQ1VFMGYEqqCtMKE4r_vT3kpqEFxpAFfmTd_-i2S9WT-SxSyF3DJK1ish3sr-yhtIpMwU6vYvPoJpP7Z6qT3MFD9-OPcORYRiHT57JQ4UZomvf1kvXz_VjnJak4-b8UVo3G-kF_osMZjqqbXw0ZXNeAtM7ZsKnTxDexl9HsvH4angrESBfJJ-jz_JZz3_O67QLsySoDm2LVGPBdP-1HO5VWd-nm80"
            />
          </div>
        </div>
      </header>

      {/* CONTENT SPLIT */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT - RADAR */}
        <div className="w-1/2 flex flex-col items-center justify-center bg-[#f8f9fc] relative">
          
          <div className="relative w-[400px] h-[400px] flex items-center justify-center">
            {/* Radar Circles */}
            <div className="absolute w-[360px] h-[360px] rounded-full border border-blue-200/50"></div>
            <div className="absolute w-[280px] h-[280px] rounded-full border border-blue-300/50"></div>
            <div className="absolute w-[200px] h-[200px] rounded-full border border-blue-400/50"></div>
            <div className="absolute w-[120px] h-[120px] rounded-full border border-blue-500/30 bg-blue-100/20"></div>
            
            {/* Radar Sweep Line (approximate using CSS rotation) */}
            <div className="absolute top-1/2 left-1/2 w-[180px] h-[2px] bg-gradient-to-r from-[#1A73E8] to-transparent origin-left rotate-[130deg]"></div>

            {/* Center Icon */}
            <div className="relative z-10 w-[60px] h-[60px] bg-[#d8e2ff] rounded-full flex items-center justify-center shadow-lg border-2 border-[#adc7ff]">
              <span className="material-symbols-outlined text-[#004493] text-[32px]">sensors</span>
            </div>
          </div>

          <h3 className="text-[20px] font-bold text-[#181c20] mt-12 mb-6">
            Đang quét thiết bị xung quanh...
          </h3>
          
          <button className="px-8 py-3 rounded-full bg-[#8cf2e5] text-[#005c53] font-bold text-[16px]">
            Đã tìm thấy: 24 thiết bị
          </button>

        </div>

        {/* RIGHT - LIST */}
        <div className="w-1/2 bg-[#f1f4f9] p-8 overflow-y-auto border-l border-gray-200">
          <button className="w-full bg-[#1A73E8] hover:bg-blue-700 active:scale-[0.99] transition-all text-white rounded-[16px] py-4 flex items-center justify-center gap-3 font-bold text-[18px] mb-8 shadow-sm">
            <span className="material-symbols-outlined text-[24px]">sync</span>
            KẾT NỐI TẤT CẢ (24 THIẾT BỊ)
          </button>

          <div className="space-y-4">
            {/* DEVICE ITEM 1 */}
            <div className="bg-white p-6 rounded-[1.5rem] flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-[#f1f4f9] rounded-2xl flex items-center justify-center text-slate-600">
                  <span className="material-symbols-outlined text-[28px]">precision_manufacturing</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[18px] font-bold text-[#181c20] leading-none">Sân 1</span>
                  <div className="flex items-center gap-2 text-[#006e25]">
                    <div className="w-2 h-2 rounded-full bg-[#006e25]"></div>
                    <span className="text-[14px] font-medium leading-none">Đã kết nối</span>
                  </div>
                </div>
              </div>
              <button className="border-2 border-[#e0e3e8] text-[#181c20] font-bold text-[16px] px-8 py-2.5 rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-colors">
                Ngắt
              </button>
            </div>

            {/* DEVICE ITEM 2 */}
            <div className="bg-white p-6 rounded-[1.5rem] flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-[#f1f4f9] rounded-2xl flex items-center justify-center text-slate-600">
                  <span className="material-symbols-outlined text-[28px]">precision_manufacturing</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[18px] font-bold text-[#181c20] leading-none">Sân 2</span>
                  <div className="flex items-center gap-2 text-[#006e25]">
                    <div className="w-2 h-2 rounded-full bg-[#006e25]"></div>
                    <span className="text-[14px] font-medium leading-none">Đã kết nối</span>
                  </div>
                </div>
              </div>
              <button className="border-2 border-[#e0e3e8] text-[#181c20] font-bold text-[16px] px-8 py-2.5 rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-colors">
                Ngắt
              </button>
            </div>

            {/* DEVICE ITEM 3 */}
            <div className="bg-white p-6 rounded-[1.5rem] flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-[#f1f4f9] rounded-2xl flex items-center justify-center text-slate-600">
                  <span className="material-symbols-outlined text-[28px]">precision_manufacturing</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[18px] font-bold text-[#181c20] leading-none">Sân 3</span>
                  <div className="flex items-center gap-2 text-[#006e25]">
                    <div className="w-2 h-2 rounded-full bg-[#006e25]"></div>
                    <span className="text-[14px] font-medium leading-none">Đã kết nối</span>
                  </div>
                </div>
              </div>
              <button className="border-2 border-[#e0e3e8] text-[#181c20] font-bold text-[16px] px-8 py-2.5 rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-colors">
                Ngắt
              </button>
            </div>

            {/* DEVICE ITEM 4 */}
            <div className="bg-white/80 p-6 rounded-[1.5rem] flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-[#f1f4f9] rounded-2xl flex items-center justify-center text-slate-400">
                  <span className="material-symbols-outlined text-[28px]">precision_manufacturing</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[18px] font-bold text-[#181c20] leading-none">Sân 4</span>
                  <span className="text-[14px] text-slate-500 italic leading-none mt-[2px]">Đang kết nối...</span>
                </div>
              </div>
              <button className="bg-[#e0e3e8] text-[#414754] font-bold text-[16px] px-8 py-2.5 rounded-xl hover:bg-gray-300/80 transition-colors border-2 border-transparent">
                Hủy
              </button>
            </div>

            {/* DEVICE ITEM 5 */}
            <div className="bg-white/80 p-6 rounded-[1.5rem] flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-[#f1f4f9] rounded-2xl flex items-center justify-center text-slate-400">
                  <span className="material-symbols-outlined text-[28px]">precision_manufacturing</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[18px] font-bold text-[#181c20] leading-none">Sân 5</span>
                  <span className="text-[14px] text-slate-500 italic leading-none mt-[2px]">Đang tìm kiếm...</span>
             </div>
              </div>
              <button className="bg-[#e0e3e8] text-[#414754] font-bold text-[16px] px-8 py-2.5 rounded-xl hover:bg-gray-300/80 transition-colors border-2 border-transparent">
                Hủy
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
