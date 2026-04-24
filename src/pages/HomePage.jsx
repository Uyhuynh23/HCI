import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { format, parseISO } from 'date-fns';
import { getFieldStatus } from '../utils/statusUtils';

export function HomePage() {
  const { fields, schedules, equipment, activities } = useApp();
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);

  // Compute live stats
  const now = new Date();
  const activeFieldCount = fields.filter((f) => getFieldStatus(f.id, schedules, now).status === 'active').length;
  const totalFieldCount = fields.length;
  const warningEquipment = equipment.filter((e) => e.connectionStatus !== 'connected');
  const warningCount = warningEquipment.length;
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

  // Map connection status to Vietnamese labels and colors
  const getStatusInfo = (status) => {
    switch (status) {
      case 'connecting':
        return { label: 'Đang kết nối lại', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200', icon: 'sync', iconColor: 'text-amber-500' };
      case 'searching':
        return { label: 'Đang tìm kiếm tín hiệu', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', icon: 'wifi_find', iconColor: 'text-red-500' };
      case 'disconnected':
        return { label: 'Mất kết nối', color: 'text-red-700', bg: 'bg-red-100', border: 'border-red-300', icon: 'signal_disconnected', iconColor: 'text-red-600' };
      default:
        return { label: status, color: 'text-gray-600', bg: 'bg-gray-50', border: 'border-gray-200', icon: 'help', iconColor: 'text-gray-500' };
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
          <div className="grid grid-cols-2 gap-6">
            {/* Status Card - Active Fields */}
            <div className="bg-surface-container-lowest p-8 rounded-xl custom-shadow flex flex-col items-center justify-center text-center space-y-2">
              <span className="text-[56px] font-bold text-primary">{String(activeFieldCount).padStart(2, '0')}</span>
              <p className="text-[24px] font-bold text-on-surface">Sân đang bật</p>
              <p className="text-[16px] text-on-surface-variant">Trên tổng số {totalFieldCount} sân</p>
            </div>
            {/* Status Card - Clickable Warning Card */}
            <div
              onClick={() => warningCount > 0 && setIsWarningModalOpen(true)}
              className={`p-8 rounded-xl custom-shadow flex flex-col items-center justify-center text-center space-y-2 transition-all duration-200 ${warningCount > 0
                ? 'bg-[#ba1a1a] cursor-pointer hover:bg-[#93000a] hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] ring-4 ring-[#ba1a1a]/30'
                : 'bg-surface-container-lowest'
                }`}
            >
              <span className={`text-[56px] font-bold ${warningCount > 0 ? 'text-white' : 'text-tertiary'}`}>{String(warningCount).padStart(2, '0')}</span>
              <p className={`text-[24px] font-bold ${warningCount > 0 ? 'text-white' : 'text-tertiary'}`}>Cảnh báo</p>
              <p className={`text-[16px] ${warningCount > 0 ? 'text-white/90' : 'text-on-surface-variant'}`}>
                {warningCount > 0 ? 'Nhấn để xem chi tiết' : 'Không có cảnh báo'}
              </p>
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
                className={`flex items-center justify-between p-6 bg-surface-container-lowest rounded-lg ${index < recentActivities.length - 1 ? 'mb-2' : ''
                  }`}
              >
                <div className="flex items-center gap-6">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${activity.type === 'warning' ? 'bg-tertiary-container/20' : 'bg-secondary-container/20'
                    }`}>
                    <span className={`material-symbols-outlined ${activity.type === 'warning' ? 'text-tertiary' : 'text-secondary'
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

      {/* Warning Detail Modal */}
      {isWarningModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4" onClick={() => setIsWarningModalOpen(false)}>
          <div
            className="bg-white rounded-[2rem] p-8 max-w-[560px] w-full flex flex-col shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: 'modalFadeIn 0.2s ease-out' }}
          >
            {/* Modal Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-[#ffdad6] rounded-2xl flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[36px] text-[#ba1a1a]" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
              </div>
              <div>
                <h2 className="text-[24px] font-bold text-[#101828] leading-tight">Chi tiết cảnh báo</h2>
                <p className="text-[14px] text-slate-500 mt-0.5">{warningCount} thiết bị cần kiểm tra</p>
              </div>
              <button
                onClick={() => setIsWarningModalOpen(false)}
                className="ml-auto w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors"
              >
                <span className="material-symbols-outlined text-slate-500">close</span>
              </button>
            </div>

            {/* Divider */}
            <div className="h-[1px] bg-slate-200 mb-6"></div>

            {/* Warning Equipment List */}
            <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto pr-1">
              {warningEquipment.map((eq) => {
                const statusInfo = getStatusInfo(eq.connectionStatus);
                return (
                  <div
                    key={eq.id}
                    className={`flex items-center gap-4 p-5 rounded-2xl border ${statusInfo.border} ${statusInfo.bg} transition-all hover:shadow-sm`}
                  >
                    {/* Status Icon */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-white shadow-sm shrink-0`}>
                      <span className={`material-symbols-outlined text-[28px] ${statusInfo.iconColor}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                        {statusInfo.icon}
                      </span>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[18px] font-bold text-[#101828] truncate">{eq.fieldName}</p>
                      <p className={`text-[14px] font-semibold ${statusInfo.color} mt-0.5`}>
                        {statusInfo.label}
                      </p>
                    </div>

                    {/* Status Indicator Dot */}
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`inline-block w-2.5 h-2.5 rounded-full ${eq.connectionStatus === 'connecting' ? 'bg-amber-400 animate-pulse' : 'bg-red-500 animate-pulse'
                        }`}></span>
                      <span className={`text-[13px] font-semibold ${statusInfo.color}`}>
                        {eq.connectionStatus === 'connecting' ? 'Đang thử' : 'Lỗi'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="mt-6 pt-4 border-t border-slate-200 flex gap-3">
              <button
                onClick={() => setIsWarningModalOpen(false)}
                className="flex-1 bg-[#f1f4f9] hover:bg-[#e2e8f0] text-[#101828] font-bold py-3.5 rounded-2xl text-[16px] transition-colors border-none"
              >
                Đóng
              </button>
              <button
                onClick={() => {
                  setIsWarningModalOpen(false);
                  // Navigate to equipment page for detailed management
                  window.location.href = '/equipment';
                }}
                className="flex-1 bg-[#1a73e8] hover:bg-[#1557b0] text-white font-bold py-3.5 rounded-2xl text-[16px] transition-colors border-none flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">build</span>
                Quản lý thiết bị
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
