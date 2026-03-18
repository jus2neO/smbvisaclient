const NAV_ITEMS = [
  { id: 'dashboard', icon: 'fa-th-large', label: 'Dashboard' },
  { id: 'schedule', icon: 'fa-calendar-check', label: 'Schedule' },
  { id: 'analytics', icon: 'fa-chart-bar', label: 'Analytics' },
  { id: 'payments', icon: 'fa-file-invoice-dollar', label: 'Payments' },
];

export default function Sidebar({ currentView, onNavigate, onLogout }) {
  return (
    <aside
      className="w-64 flex-shrink-0 flex-col hidden md:flex h-full shadow-2xl z-20 relative"
      style={{ backgroundColor: 'var(--smb-blue)' }}
    >
      {/* Logo */}
      <div className="p-6 border-b border-white/10 flex items-center justify-center flex-col">
        <img
          src="https://i.postimg.cc/d1RpQnwF/smb-logo-v3.png"
          alt="SMB Logo"
          className="h-12 brightness-0 invert mb-3"
        />
        <p className="text-xs font-bold tracking-widest text-blue-200 uppercase">Admin Portal</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition text-left ${
                isActive
                  ? 'bg-white/10 text-white'
                  : 'text-blue-200 hover:bg-white/5 hover:text-white font-medium'
              }`}
            >
              <i className={`fas ${item.icon} w-5`}></i>
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* User Info + Logout */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-4 py-2">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm flex-shrink-0"
            style={{ backgroundColor: 'var(--smb-gold)' }}
          >
            SB
          </div>
          <div>
            <p className="text-sm font-bold text-white">Shiela Bullar</p>
            <p className="text-xs text-blue-300">Super Admin</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-white/5 hover:text-red-300 rounded-lg transition"
        >
          <i className="fas fa-sign-out-alt"></i> Logout
        </button>
      </div>
    </aside>
  );
}
