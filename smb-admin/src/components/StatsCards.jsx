export default function StatsCards({ clients }) {
  const total = clients.length;
  const pending = clients.filter(c => c.status === 'New Applicant').length;
  const upcoming = 2; // Static for now — connect to appointments data later

  const stats = [
    {
      label: 'Total Leads',
      value: total,
      valueColor: 'text-[#0b1136]',
      icon: 'fa-users',
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      label: 'Pending Review',
      value: pending,
      valueColor: 'text-orange-500',
      icon: 'fa-clock',
      iconBg: 'bg-orange-50',
      iconColor: 'text-orange-500',
    },
    {
      label: 'Upcoming Appts',
      value: upcoming,
      valueColor: 'text-emerald-500',
      icon: 'fa-calendar-alt',
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between"
        >
          <div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">
              {stat.label}
            </p>
            <h3 className={`text-3xl font-black ${stat.valueColor}`}>{stat.value}</h3>
          </div>
          <div className={`w-14 h-14 ${stat.iconBg} ${stat.iconColor} rounded-xl flex items-center justify-center text-2xl`}>
            <i className={`fas ${stat.icon}`}></i>
          </div>
        </div>
      ))}
    </div>
  );
}
