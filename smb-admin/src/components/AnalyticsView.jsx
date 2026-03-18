const STATUS_COLORS = {
  'New Applicant': { bar: 'bg-orange-400', text: 'text-orange-600', bg: 'bg-orange-50' },
  'Consultation Scheduled': { bar: 'bg-blue-500', text: 'text-blue-600', bg: 'bg-blue-50' },
  'Documents Pending': { bar: 'bg-gray-400', text: 'text-gray-600', bg: 'bg-gray-50' },
  'Visa Lodged': { bar: 'bg-emerald-500', text: 'text-emerald-600', bg: 'bg-emerald-50' },
  'Approved': { bar: 'bg-green-500', text: 'text-green-600', bg: 'bg-green-50' },
  'Rejected/Archived': { bar: 'bg-red-400', text: 'text-red-600', bg: 'bg-red-50' },
};

function StatBar({ label, count, total, colors }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="flex items-center gap-4">
      <div className="w-36 text-sm font-medium text-gray-600 flex-shrink-0">{label}</div>
      <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
        <div
          className={`h-3 rounded-full transition-all duration-700 ${colors.bar}`}
          style={{ width: `${pct}%` }}
        ></div>
      </div>
      <div className={`w-12 text-right text-sm font-bold ${colors.text}`}>{count}</div>
      <div className="w-10 text-right text-xs text-gray-400">{pct}%</div>
    </div>
  );
}

export default function AnalyticsView({ clients }) {
  const total = clients.length;

  // Status breakdown
  const statusCounts = {};
  clients.forEach(c => {
    statusCounts[c.status] = (statusCounts[c.status] || 0) + 1;
  });

  // Country breakdown (top 5)
  const countryCounts = {};
  clients.forEach(c => {
    const key = `${c.flag} ${c.country}`;
    countryCounts[key] = (countryCounts[key] || 0) + 1;
  });
  const topCountries = Object.entries(countryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Score bands
  const bands = [
    { label: 'High (80–100)', count: clients.filter(c => c.score >= 80).length, color: 'bg-emerald-500' },
    { label: 'Mid (60–79)', count: clients.filter(c => c.score >= 60 && c.score < 80).length, color: 'bg-blue-500' },
    { label: 'Low (0–59)', count: clients.filter(c => c.score < 60).length, color: 'bg-orange-400' },
  ];

  const avgScore = total > 0
    ? Math.round(clients.reduce((sum, c) => sum + c.score, 0) / total)
    : 0;

  const approved = clients.filter(c => c.status === 'Approved').length;
  const scheduled = clients.filter(c => c.appointmentDate).length;

  return (
    <div className="flex-1 overflow-y-auto p-6 lg:p-10">
      <div className="mb-8">
        <h2 className="text-2xl font-black" style={{ color: 'var(--smb-blue)' }}>Analytics</h2>
        <p className="text-gray-500 text-sm mt-1">Overview of all applicant data</p>
      </div>

      {/* Top KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Applicants', value: total, icon: 'fa-users', iconBg: 'bg-blue-50', iconColor: 'text-blue-600', valueColor: 'text-[#0b1136]' },
          { label: 'Avg. Score', value: `${avgScore}/100`, icon: 'fa-star', iconBg: 'bg-amber-50', iconColor: 'text-amber-500', valueColor: 'text-amber-600' },
          { label: 'Appointments', value: scheduled, icon: 'fa-calendar-check', iconBg: 'bg-purple-50', iconColor: 'text-purple-500', valueColor: 'text-purple-600' },
          { label: 'Approved', value: approved, icon: 'fa-check-circle', iconBg: 'bg-emerald-50', iconColor: 'text-emerald-500', valueColor: 'text-emerald-600' },
        ].map(card => (
          <div key={card.label} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className={`w-12 h-12 ${card.iconBg} ${card.iconColor} rounded-xl flex items-center justify-center text-xl mb-4`}>
              <i className={`fas ${card.icon}`}></i>
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{card.label}</p>
            <p className={`text-3xl font-black ${card.valueColor}`}>{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Application Status Breakdown */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-base font-bold mb-1" style={{ color: 'var(--smb-blue)' }}>Status Breakdown</h3>
          <p className="text-xs text-gray-400 mb-6">Distribution of applicants by current stage</p>
          <div className="space-y-4">
            {Object.entries(STATUS_COLORS).map(([status, colors]) => {
              const count = statusCounts[status] || 0;
              return (
                <StatBar
                  key={status}
                  label={status}
                  count={count}
                  total={total}
                  colors={colors}
                />
              );
            })}
          </div>
        </div>

        {/* Top Destinations */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-base font-bold mb-1" style={{ color: 'var(--smb-blue)' }}>Top Destinations</h3>
          <p className="text-xs text-gray-400 mb-6">Most popular countries applied for</p>
          <div className="space-y-4">
            {topCountries.map(([country, count], i) => {
              const pct = total > 0 ? Math.round((count / total) * 100) : 0;
              const barColors = ['bg-blue-500', 'bg-purple-500', 'bg-emerald-500', 'bg-amber-500', 'bg-rose-500'];
              const textColors = ['text-blue-600', 'text-purple-600', 'text-emerald-600', 'text-amber-600', 'text-rose-600'];
              return (
                <div key={country} className="flex items-center gap-4">
                  <div className="w-36 text-sm font-medium text-gray-700 flex-shrink-0 truncate">{country}</div>
                  <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div className={`h-3 rounded-full ${barColors[i]}`} style={{ width: `${pct}%` }}></div>
                  </div>
                  <div className={`w-12 text-right text-sm font-bold ${textColors[i]}`}>{count}</div>
                  <div className="w-10 text-right text-xs text-gray-400">{pct}%</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Score Distribution */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-base font-bold mb-1" style={{ color: 'var(--smb-blue)' }}>Score Distribution</h3>
          <p className="text-xs text-gray-400 mb-6">Eligibility score ranges across all applicants</p>
          <div className="flex items-end gap-4 h-32 mb-4">
            {bands.map(band => {
              const heightPct = total > 0 ? (band.count / total) * 100 : 0;
              return (
                <div key={band.label} className="flex-1 flex flex-col items-center gap-2">
                  <span className="text-sm font-black text-gray-700">{band.count}</span>
                  <div className="w-full relative" style={{ height: '80px' }}>
                    <div
                      className={`absolute bottom-0 left-0 right-0 rounded-t-lg ${band.color} transition-all duration-700`}
                      style={{ height: `${Math.max(heightPct, 4)}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex gap-4">
            {bands.map(band => (
              <div key={band.label} className="flex-1 flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${band.color}`}></div>
                <span className="text-xs text-gray-500">{band.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-base font-bold mb-1" style={{ color: 'var(--smb-blue)' }}>Recent Applicants</h3>
          <p className="text-xs text-gray-400 mb-6">Latest entries in the system</p>
          <div className="space-y-4">
            {clients.slice(0, 4).map(client => {
              const scoreColor = client.score >= 70 ? 'text-emerald-600' : client.score >= 50 ? 'text-blue-600' : 'text-orange-500';
              return (
                <div key={client.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                      style={{ backgroundColor: 'var(--smb-blue)' }}
                    >
                      {client.firstName.charAt(0)}{client.lastName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">{client.firstName} {client.lastName}</p>
                      <p className="text-xs text-gray-400">{client.flag} {client.country}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-black ${scoreColor}`}>{client.score} pts</p>
                    <p className="text-xs text-gray-400">{client.id}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
