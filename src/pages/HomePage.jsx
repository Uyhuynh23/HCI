export function HomePage() {
  return (
    <>
      {/* TOP APP BAR */}
      <header className="h-24 flex justify-between items-center px-10 w-full bg-[#F7F9FF] sticky top-0 z-10 flex-shrink-0">
        <h1 className="text-4xl font-bold text-on-background tracking-tight uppercase">TRANG CHỦ</h1>
        <div className="flex items-center gap-6">
          <button className="hover:bg-slate-100 rounded-full p-2 transition-opacity active:opacity-80">
            <span className="material-symbols-outlined text-slate-600 text-3xl">notifications</span>
          </button>
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-surface-container-high transition-opacity active:opacity-80 cursor-pointer">
            <img
              alt="Account"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQaQZJLev-2VWhffiyzXlT-Dqh6B1mbjYBLJYxWv3kvQAfl4nQ1VFMGYEqqCtMKE4r_vT3kpqEFxpAFfmTd_-i2S9WT-SxSyF3DJK1ish3sr-yhtIpMwU6vYvPoJpP7Z6qT3MFD9-OPcORYRiHT57JQ4UZomvf1kvXz_VjnJak4-b8UVo3G-kF_osMZjqqbXw0ZXNeAtM7ZsKnTxDexl9HsvH4angrESBfJJ-jz_JZz3_O67QLsySoDm2LVGPBdP-1HO5VWd-nm80"
            />
          </div>
        </div>
      </header>

      <section className="flex-1 overflow-y-auto px-10 pb-12 space-y-12">
      {/* System Status Section */}
      <div className="space-y-6">
        <h2 className="text-[32px] font-bold text-on-background">Trạng thái hệ thống</h2>
        <div className="grid grid-cols-3 gap-6">
          {/* Status Card 1 */}
          <div className="bg-surface-container-lowest p-8 rounded-xl custom-shadow flex flex-col items-center justify-center text-center space-y-3">
            <span
              className="material-symbols-outlined text-secondary text-6xl font-variation-fill"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </span>
            <p className="text-[24px] font-bold text-secondary">Hoạt động tốt</p>
            <p className="text-[16px] text-on-surface-variant">Tất cả cảm biến ổn định</p>
          </div>
          {/* Status Card 2 */}
          <div className="bg-surface-container-lowest p-8 rounded-xl custom-shadow flex flex-col items-center justify-center text-center space-y-2">
            <span className="text-[56px] font-bold text-primary">08</span>
            <p className="text-[24px] font-bold text-on-surface">Sân đang bật</p>
            <p className="text-[16px] text-on-surface-variant">Trên tổng số 12 sân</p>
          </div>
          {/* Status Card 3 */}
          <div className="bg-surface-container-lowest p-8 rounded-xl custom-shadow flex flex-col items-center justify-center text-center space-y-2">
            <span className="text-[56px] font-bold text-tertiary">02</span>
            <p className="text-[24px] font-bold text-tertiary">Cảnh báo</p>
            <p className="text-[16px] text-on-surface-variant">Cần kiểm tra thiết bị</p>
          </div>
        </div>
      </div>
      
      {/* Recent Activity Section */}
      <div className="space-y-6">
        <h2 className="text-[32px] font-bold text-on-background">Hoạt động gần đây</h2>
        <div className="bg-surface-container-low rounded-xl overflow-hidden p-2">
          {/* Row 1 */}
          <div className="flex items-center justify-between p-6 bg-surface-container-lowest rounded-lg mb-2">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-full bg-secondary-container/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-secondary">bolt</span>
              </div>
              <p className="text-[18px] text-on-surface">Hệ thống chiếu sáng Sân 1 đã được kích hoạt tự động.</p>
            </div>
            <span className="text-[16px] text-on-surface-variant font-medium">10:45 AM</span>
          </div>
          {/* Row 2 */}
          <div className="flex items-center justify-between p-6 bg-surface-container-lowest rounded-lg mb-2">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-full bg-tertiary-container/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-tertiary">warning</span>
              </div>
              <p className="text-[18px] text-on-surface">Cảnh báo: Kết nối hệ thống đèn Sân 3 có dấu hiệu bất thường.</p>
            </div>
            <span className="text-[16px] text-on-surface-variant font-medium">09:12 AM</span>
          </div>
          {/* Row 3 - from image: Lịch trình Sân Pickleball 1... */}
          <div className="flex items-center justify-between p-6 bg-surface-container-lowest rounded-lg">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-full bg-secondary-container/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-secondary">bolt</span>
              </div>
              <p className="text-[18px] text-on-surface">Lịch trình sân Pickleball 1 mới được tạo bởi: Nguyễn Văn An.</p>
            </div>
            <span className="text-[16px] text-on-surface-variant font-medium">08:30 AM</span>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
