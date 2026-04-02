// Placeholder views for sidebar nav items
// Replace with real content when those features are built

export function ApplicantsView() {
  return (
    <div className="flex-1 overflow-y-auto p-6 lg:p-10 flex items-center justify-center">
      <div className="text-center text-gray-400">
        <i className="fas fa-users text-5xl mb-4 opacity-20 block"></i>
        <h2 className="text-xl font-bold text-gray-600 mb-2">Applicants</h2>
        <p className="text-sm">Full applicant management view coming soon.</p>
      </div>
    </div>
  );
}

export function AppointmentsView() {
  return (
    <div className="flex-1 overflow-y-auto p-6 lg:p-10 flex items-center justify-center">
      <div className="text-center text-gray-400">
        <i className="fas fa-calendar-check text-5xl mb-4 opacity-20 block"></i>
        <h2 className="text-xl font-bold text-gray-600 mb-2">Appointments</h2>
        <p className="text-sm">Appointment calendar and scheduling view coming soon.</p>
      </div>
    </div>
  );
}

export function PaymentsView() {
  return (
    <div className="flex-1 overflow-y-auto p-6 lg:p-10 flex items-center justify-center">
      <div className="text-center text-gray-400">
        <i className="fas fa-file-invoice-dollar text-5xl mb-4 opacity-20 block"></i>
        <h2 className="text-xl font-bold text-gray-600 mb-2">Payments</h2>
        <p className="text-sm">Payment records and invoicing view coming soon.</p>
      </div>
    </div>
  );
}
