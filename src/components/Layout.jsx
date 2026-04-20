import { NavLink, Outlet } from 'react-router-dom';

const navItems = [
  { path: '/', icon: 'home', label: 'Trang chủ' },
  { path: '/fields', icon: 'stadium', label: 'Sân bãi' },
  { path: '/equipment', icon: 'precision_manufacturing', label: 'Thiết bị' },
  { path: '/schedule', icon: 'calendar_month', label: 'Lịch trình' },
  { path: '/settings', icon: 'settings', label: 'Cài đặt' },
];

export function Layout() {
  return (
    <div className="flex" data-mode="connect">
      {/* SIDEBAR */}
      <aside className="w-[260px] h-screen fixed left-0 top-0 flex flex-col border-r border-[#E9ECEF] bg-[#FFFFFF] z-20">
        <div className="px-6 py-8">
          <h2 className="text-[24px] font-bold tracking-tight text-[#1A73E8]">KINETIC GRID</h2>
          <p className="text-[16px] text-[#6C757D] font-normal">Quản lý Trung tâm</p>
        </div>
        <nav className="flex-1 px-3 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center font-bold h-[60px] px-4 rounded-[12px] transition-colors ${
                  isActive
                    ? 'text-[#FFFFFF] bg-[#1A73E8]'
                    : 'text-[#212529] bg-transparent hover:bg-slate-50'
                }`
              }
            >
              <span className="material-symbols-outlined mr-4">{item.icon}</span>
              <span className="text-[20px]">{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="p-6 mt-auto">
          <div className="flex items-center gap-3">
            <img
              alt="Profile"
              className="w-12 h-12 rounded-full bg-slate-200"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBK6jsXyXB5te0_-LQGf3mLf79V4_j-6oWmRzAe-iL2l3Fw_tA3ckMWFGQvwfBvKbBaLatht7VoaHPvU_xp4Rjq9xkE80uTl8fjh2D05qrk4GSHs8ATV40R5Qw7fKFEDTKKn_zWL2xKC1t2bV2v37nkUDrwR2e2NaBoX5emGw2cPPLfie5jFwgHtlnExey-9l3KZpjVDsqehbMI61jkzwjWsMB9lILEFg9LaYyHv0_422f6weYwbiua3iHqLpxOt6kCQHlAbH-c7sg"
            />
            <div>
              <p className="text-[#212529] font-bold text-[18px]">Admin</p>
              <p className="text-[#6C757D] text-[14px] font-normal">Quản lý khu vực</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CANVAS */}
      <main className="ml-[260px] flex-1 flex flex-col h-screen overflow-hidden">
        {/* TOP APP BAR */}
        <header className="h-24 flex justify-between items-center px-10 w-full bg-[#F7F9FF] sticky top-0 z-10 flex-shrink-0">
          {/* Note: The Title here is extracted dynamically or hidden depending on page. We will let each page handle its own title or just keep it dynamic. In the prototype it's hardcoded to TRANG CHỦ. Let's make it static or handled by Outlet context, or simple mapping. Actually, let's keep it here and use useLocation to show the title. */}
          <PageTitle />
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

        {/* CONTENT */}
        <Outlet />
      </main>
    </div>
  );
}

// Helper to display current page title
import { useLocation } from 'react-router-dom';

function PageTitle() {
  const location = useLocation();
  const currentItem = navItems.find((item) => item.path === location.pathname);
  
  return (
    <h1 className="text-4xl font-bold text-on-background tracking-tight uppercase">
      {currentItem ? currentItem.label : ''}
    </h1>
  );
}
