export default function Header({ title, searchQuery, onSearch, showSearch }) {
  return (
    <header className="h-20 bg-white shadow-sm flex items-center justify-between px-6 lg:px-10 z-10 flex-shrink-0">
      <div className="flex items-center gap-4">
        <button className="md:hidden text-gray-500 text-xl hover:text-[#0b1136]">
          <i className="fas fa-bars"></i>
        </button>
        <h1 className="text-2xl font-bold hidden sm:block" style={{ color: 'var(--smb-blue)' }}>
          {title}
        </h1>
      </div>

      {/* Search — only shown on Dashboard */}
      {showSearch && (
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i className="fas fa-search text-gray-400"></i>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-full bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:border-[#0b1136] sm:text-sm transition"
            placeholder="Search by name, ID, or email..."
          />
        </div>
      )}
    </header>
  );
}
