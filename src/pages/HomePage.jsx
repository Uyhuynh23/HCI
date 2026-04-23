import { useApp } from '../context/AppContext';
import { format, parseISO } from 'date-fns';

export function HomePage() {
  const { fields, equipment, activities } = useApp();

  // Compute live stats
  const activeFieldCount = fields.filter((f) => f.status === 'active').length;
  const totalFieldCount = fields.length;
  const warningCount = equipment.filter((e) => e.connectionStatus !== 'connected').length;
  const allSensorsOk = warningCount === 0;

  // Latest 5 activities sorted by time desc
  const recentActivities = [...activities]
    .sort((a, b) => new Date(b.time) - new Date(a.time))
    .slice(0, 5);

  const formatActivityTime = (isoTime) => {
    try {
      return format(parseISO(isoTime), 'HH:mm');
    } catch {
      return isoTime;
    }
  };

  return (
    <>
      {/* TOP APP BAR */}
      <header className="h-24 flex justify-between items-center px-10 w-full bg-[#F7F9FF] sticky top-0 z-10 flex-shrink-0">
        <h1 className="text-4xl font-bold text-on-background tracking-tight uppercase">TRANG CHỦ</h1>
        <div className="flex items-center gap-6">
          <button className="hover:bg-slate-100 rounded-full p-2 transition-opacity active:opacity-80 relative">
            <span className="material-symbols-outlined text-slate-600 text-3xl">notifications</span>
            {warningCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-3 h-3 bg-[#ba1a1a] rounded-full border-2 border-white"></span>
            )}
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
              {allSensorsOk ? 'check_circle' : 'warning'}
            </span>
            <p className={`text-[24px] font-bold ${allSensorsOk ? 'text-secondary' : 'text-tertiary'}`}>
              {allSensorsOk ? 'Hoạt động tốt' : 'Có cảnh báo'}
            </p>
            <p className="text-[16px] text-on-surface-variant">
              {allSensorsOk ? 'Tất cả cảm biến ổn định' : `${warningCount} thiết bị cần kiểm tra`}
            </p>
          </div>
          {/* Status Card 2 */}
          <div className="bg-surface-container-lowest p-8 rounded-xl custom-shadow flex flex-col items-center justify-center text-center space-y-2">
            <span className="text-[56px] font-bold text-primary">{String(activeFieldCount).padStart(2, '0')}</span>
            <p className="text-[24px] font-bold text-on-surface">Sân đang bật</p>
            <p className="text-[16px] text-on-surface-variant">Trên tổng số {totalFieldCount} sân</p>
          </div>
          {/* Status Card 3 */}
          <div className="bg-surface-container-lowest p-8 rounded-xl custom-shadow flex flex-col items-center justify-center text-center space-y-2">
            <span className="text-[56px] font-bold text-tertiary">{String(warningCount).padStart(2, '0')}</span>
            <p className="text-[24px] font-bold text-tertiary">Cảnh báo</p>
            <p className="text-[16px] text-on-surface-variant">Cần kiểm tra thiết bị</p>
          </div>
        </div>
      </div>
      
      {/* Recent Activity Section */}
      <div className="space-y-6">
        <h2 className="text-[32px] font-bold text-on-background">Hoạt động gần đây</h2>
        <div className="bg-surface-container-low rounded-xl overflow-hidden p-2">
          {recentActivities.map((activity, index) => (
            <div
              key={activity.id}
              className={`flex items-center justify-between p-6 bg-surface-container-lowest rounded-lg ${
                index < recentActivities.length - 1 ? 'mb-2' : ''
              }`}
            >
              <div className="flex items-center gap-6">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  activity.type === 'warning' ? 'bg-tertiary-container/20' : 'bg-secondary-container/20'
                }`}>
                  <span className={`material-symbols-outlined ${
                    activity.type === 'warning' ? 'text-tertiary' : 'text-secondary'
                  }`}>
                    {activity.type === 'warning' ? 'warning' : 'bolt'}
                  </span>
                </div>
                <p className="text-[18px] text-on-surface">{activity.message}</p>
              </div>
              <span className="text-[16px] text-on-surface-variant font-medium whitespace-nowrap ml-4">
                {formatActivityTime(activity.time)}
              </span>
            </div>
          ))}
          {recentActivities.length === 0 && (
            <div className="flex items-center justify-center p-6 text-on-surface-variant">
              Chưa có hoạt động nào.
            </div>
          )}
        </div>
      </div>
    </section>
    </>
  );
}
