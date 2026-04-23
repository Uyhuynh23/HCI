import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { playSuccessSound } from '../utils/audio';

export function EquipmentPage() {
  const { equipment, updateEquipment, batchUpdateEquipment, addActivity } = useApp();
  const [disconnectTarget, setDisconnectTarget] = useState(null);

  // Connect-all state machine: 'idle' | 'connecting' | 'success'
  const [connectPhase, setConnectPhase] = useState('idle');
  const connectTimerRef = useRef(null);
  const successTimerRef = useRef(null);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (connectTimerRef.current) clearTimeout(connectTimerRef.current);
      if (successTimerRef.current) clearTimeout(successTimerRef.current);
    };
  }, []);

  const connectedCount = equipment.filter((e) => e.connectionStatus === 'connected').length;
  const totalCount = equipment.length;
  const warningCount = equipment.filter((e) => e.connectionStatus !== 'connected').length;

  const handleDisconnect = (device) => {
    setDisconnectTarget(device);
  };

  const confirmDisconnect = () => {
    if (disconnectTarget) {
      updateEquipment(disconnectTarget.id, { connectionStatus: 'disconnected' });
      addActivity({
        message: `Đã ngắt kết nối thiết bị ${disconnectTarget.fieldName}.`,
        type: 'warning',
      });
      playSuccessSound();
      setDisconnectTarget(null);
    }
  };

  const handleCancel = (device) => {
    updateEquipment(device.id, { connectionStatus: 'disconnected' });
    addActivity({
      message: `Đã hủy kết nối thiết bị ${device.fieldName}.`,
      type: 'info',
    });
  };

  const handleConnectAll = () => {
    if (connectPhase !== 'idle') return;
    setConnectPhase('connecting');

    connectTimerRef.current = setTimeout(() => {
      // Phase transition: connecting → success
      batchUpdateEquipment({ connectionStatus: 'connected' });
      addActivity({
        message: `Đã kết nối tất cả ${totalCount} thiết bị.`,
        type: 'info',
      });
      playSuccessSound();
      setConnectPhase('success');

      successTimerRef.current = setTimeout(() => {
        setConnectPhase('idle');
      }, 2000);
    }, 5000);
  };

  const getStatusDisplay = (status) => {
    switch (status) {
      case 'connected':
        return { text: 'Đã kết nối', dotColor: 'bg-[#006e25]', textColor: 'text-[#006e25]', isItalic: false };
      case 'connecting':
        return { text: 'Đang kết nối...', dotColor: null, textColor: 'text-slate-500', isItalic: true };
      case 'searching':
        return { text: 'Đang tìm kiếm...', dotColor: null, textColor: 'text-slate-500', isItalic: true };
      case 'disconnected':
        return { text: 'Đã ngắt kết nối', dotColor: 'bg-[#ba1a1a]', textColor: 'text-[#ba1a1a]', isItalic: false };
      default:
        return { text: status, dotColor: null, textColor: 'text-slate-500', isItalic: false };
    }
  };

  // Render connect-all button based on phase
  const renderConnectAllButton = () => {
    if (connectPhase === 'connecting') {
      return (
        <button
          disabled
          className="w-full bg-[#1A73E8] text-white rounded-[16px] py-4 flex items-center justify-center gap-3 font-bold text-[18px] mb-8 shadow-sm opacity-90 cursor-not-allowed"
        >
          <span className="material-symbols-outlined text-[24px] animate-spin">sync</span>
          ĐANG KẾT NỐI...
        </button>
      );
    }
    if (connectPhase === 'success') {
      return (
        <button
          disabled
          className="w-full bg-[#006e25] text-white rounded-[16px] py-4 flex items-center justify-center gap-3 font-bold text-[18px] mb-8 shadow-sm cursor-not-allowed"
        >
          <span className="material-symbols-outlined text-[24px]">check_circle</span>
          ĐÃ KẾT NỐI THÀNH CÔNG ✓
        </button>
      );
    }
    return (
      <button
        onClick={handleConnectAll}
        className="w-full bg-[#1A73E8] hover:bg-blue-700 active:scale-[0.99] transition-all text-white rounded-[16px] py-4 flex items-center justify-center gap-3 font-bold text-[18px] mb-8 shadow-sm"
      >
        <span className="material-symbols-outlined text-[24px]">sync</span>
        KẾT NỐI TẤT CẢ ({totalCount} THIẾT BỊ)
      </button>
    );
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#f8f9fc] overflow-hidden">
      {/* HEADER */}
      <header className="h-24 flex items-center justify-between px-12 border-b border-gray-200 bg-white shrink-0 shadow-sm">
        <h1 className="text-[32px] font-bold text-[#181c20] tracking-tight uppercase">
          KẾT NỐI THIẾT BỊ
        </h1>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-[#f1f4f9] px-4 py-2 rounded-full">
            <div className={`w-2.5 h-2.5 rounded-full ${warningCount === 0 ? 'bg-[#006e25]' : 'bg-[#c75b00]'}`}></div>
            <span className="text-[15px] font-medium text-[#414754]">
              {warningCount === 0 ? 'Hệ thống Ổn định' : `${warningCount} thiết bị cần xử lý`}
            </span>
          </div>
          <button className="text-slate-600 hover:bg-slate-100 p-2 rounded-full transition-colors flex items-center justify-center relative">
            <span className="material-symbols-outlined text-[28px]">notifications</span>
            {warningCount > 0 && (
              <span className="absolute top-1 right-1 w-3 h-3 bg-[#ba1a1a] rounded-full border-2 border-white"></span>
            )}
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
            
            {/* Radar Sweep Line */}
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
            Đã tìm thấy: {totalCount} thiết bị
          </button>

        </div>

        {/* RIGHT - LIST */}
        <div className="w-1/2 bg-[#f1f4f9] p-8 overflow-y-auto border-l border-gray-200">
          {renderConnectAllButton()}

          <div className="space-y-4">
            {equipment.map((device) => {
              const statusDisplay = getStatusDisplay(device.connectionStatus);
              const isConnected = device.connectionStatus === 'connected';
              const isPending = device.connectionStatus === 'connecting' || device.connectionStatus === 'searching';
              const isDisconnected = device.connectionStatus === 'disconnected';

              return (
                <div key={device.id} className={`bg-white p-6 rounded-[1.5rem] flex items-center justify-between shadow-sm ${isPending || isDisconnected ? 'opacity-80' : ''}`}>
                  <div className="flex items-center gap-5">
                    <div
                      title="Bộ điều khiển chiếu sáng"
                      className={`w-14 h-14 bg-[#f1f4f9] rounded-2xl flex items-center justify-center ${isPending || isDisconnected ? 'text-slate-400' : 'text-slate-600'}`}
                    >
                      <span className="material-symbols-outlined text-[28px]">precision_manufacturing</span>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[18px] font-bold text-[#181c20] leading-none">{device.fieldName}</span>
                      <div className="flex items-center gap-2">
                        {statusDisplay.dotColor && (
                          <div className={`w-2 h-2 rounded-full ${statusDisplay.dotColor}`}></div>
                        )}
                        <span className={`text-[14px] font-medium leading-none ${statusDisplay.textColor} ${statusDisplay.isItalic ? 'italic' : ''} ${!statusDisplay.dotColor ? 'mt-[2px]' : ''}`}>
                          {statusDisplay.text}
                        </span>
                      </div>
                    </div>
                  </div>
                  {isConnected && (
                    <button
                      title="Ngắt kết nối thiết bị này"
                      onClick={() => handleDisconnect(device)} 
                      className="border-2 border-[#e0e3e8] text-[#181c20] font-bold text-[16px] px-8 py-2.5 rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-colors"
                    >
                      Ngắt
                    </button>
                  )}
                  {isPending && (
                    <button
                      title="Hủy quá trình kết nối"
                      onClick={() => handleCancel(device)}
                      className="bg-[#e0e3e8] text-[#414754] font-bold text-[16px] px-8 py-2.5 rounded-xl hover:bg-gray-300/80 transition-colors border-2 border-transparent"
                    >
                      Hủy
                    </button>
                  )}
                  {isDisconnected && (
                    <button
                      title="Kết nối lại thiết bị"
                      onClick={() => {
                        updateEquipment(device.id, { connectionStatus: 'connected' });
                        addActivity({ message: `Đã kết nối lại thiết bị ${device.fieldName}.`, type: 'info' });
                        playSuccessSound();
                      }}
                      className="bg-[#1A73E8] text-white font-bold text-[16px] px-8 py-2.5 rounded-xl hover:bg-blue-700 transition-colors border-2 border-transparent"
                    >
                      Kết nối
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Disconnect Modal */}
      {disconnectTarget && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-[2rem] p-10 max-w-[400px] w-full flex flex-col items-center text-center shadow-2xl relative animate-in fade-in zoom-in duration-200 border-b-[8px] border-[#1a73e8] overflow-hidden">
            <div className="w-24 h-24 bg-[#ffeed2] rounded-full flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-[64px] text-[#c75b00]" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
            </div>
            <h2 className="text-[28px] font-black text-[#101828] leading-[1.2] uppercase mb-4 tracking-tight">XÁC NHẬN<br/>NGẮT KẾT NỐI</h2>
            <p className="text-[18px] text-[#414754] mb-8 leading-normal font-medium">
              {disconnectTarget.fieldName} hiện tại đang chiếu<br/>
              <span className="text-[#1a73e8] font-bold text-[20px]">[{(() => {
                const fieldData = equipment.find(e => e.id === disconnectTarget.id);
                return fieldData ? fieldData.fieldName : '';
              })()}]</span>.<br/><br/>
              Bạn có chắc chắn muốn<br/>ngắt kết nối không?
            </p>
            <div className="flex gap-4 w-full">
              <button onClick={() => setDisconnectTarget(null)} className="flex-1 bg-[#e0e3e8] hover:bg-[#d1d5db] text-[#101828] font-bold py-4 rounded-2xl text-[18px] transition-colors border-none">
                Không
              </button>
              <button onClick={confirmDisconnect} className="flex-1 bg-[#1a73e8] hover:bg-[#1557b0] text-white font-bold py-4 rounded-2xl text-[18px] transition-colors shadow-md border-none">
                Đồng Ý
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
