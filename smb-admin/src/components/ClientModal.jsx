import { useState, useEffect } from 'react';

const STATUS_OPTIONS = [
  { value: 'New Applicant', label: 'New Applicant (Pending Review)' },
  { value: 'Consultation Scheduled', label: 'Consultation Scheduled' },
  { value: 'Documents Pending', label: 'Documents Pending' },
  { value: 'Visa Lodged', label: 'Visa Lodged' },
  { value: 'Approved', label: 'Visa Approved!' },
  { value: 'Rejected/Archived', label: 'Archived' },
];

export default function ClientModal({ client, onClose, onSave }) {
  const [selectedStatus, setSelectedStatus] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (client) setSelectedStatus(client.status);
  }, [client]);

  if (!client) return null;

  const initials = client.firstName.charAt(0) + client.lastName.charAt(0);
  const hasAppointment = client.status === 'Consultation Scheduled';

  const handleSave = () => {
    onSave(client.id, selectedStatus);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 1000);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 modal-overlay z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">

        {/* Modal Header */}
        <div className="p-6 text-white flex justify-between items-center flex-shrink-0" style={{ backgroundColor: 'var(--smb-blue)' }}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-xl font-bold">
              {initials}
            </div>
            <div>
              <h2 className="text-xl font-bold">{client.firstName} {client.lastName}</h2>
              <p className="text-blue-200 text-sm font-medium tracking-wide">{client.id}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-white/10 hover:bg-red-500 rounded-full transition flex items-center justify-center"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto bg-gray-50 flex-1">
          <div className="grid md:grid-cols-2 gap-6">

            {/* Left: Info */}
            <div className="space-y-6">
              {/* Contact */}
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Contact Information</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <i className="fas fa-envelope text-gray-400 w-4"></i>
                    <span className="font-medium text-gray-800">{client.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-phone text-gray-400 w-4"></i>
                    <span className="font-medium text-gray-800">{client.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-map-marker-alt text-gray-400 w-4"></i>
                    <span className="font-medium text-gray-800">{client.city}</span>
                  </div>
                </div>
              </div>

              {/* Assessment */}
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Assessment Results</h3>
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Target Country</p>
                    <p className="font-bold text-lg" style={{ color: 'var(--smb-blue)' }}>
                      {client.country} {client.flag}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 font-medium">Eligibility Score</p>
                    <p className="font-black text-2xl" style={{ color: 'var(--smb-gold)' }}>{client.score}/100</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-bold text-gray-600">Background Data:</p>
                  <p className="text-sm"><span className="text-gray-500">Work Exp:</span> <span className="font-medium">{client.work}</span></p>
                  <p className="text-sm"><span className="text-gray-500">Civil Status:</span> <span className="font-medium">{client.civil}</span></p>
                </div>
              </div>
            </div>

            {/* Right: Admin Actions */}
            <div className="space-y-6">
              {/* Status Manager */}
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm border-l-4 border-l-[#0b1136]">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Manage Status</h3>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Application Stage:</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 font-semibold text-sm outline-none focus:border-[#0b1136] mb-3"
                >
                  {STATUS_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <button
                  onClick={handleSave}
                  className={`w-full text-white py-2.5 rounded-xl font-bold text-sm transition ${
                    saveSuccess ? 'bg-green-500' : 'hover:bg-blue-900'
                  }`}
                  style={!saveSuccess ? { backgroundColor: 'var(--smb-blue)' } : {}}
                >
                  {saveSuccess ? '✓ Saved Successfully!' : 'Update Status'}
                </button>
              </div>

              {/* Appointments */}
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm border-l-4 border-l-[#b45309]">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Appointments</h3>
                {hasAppointment ? (
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <p className="text-sm text-blue-800 font-bold flex items-center gap-2">
                      <i className="fas fa-video"></i> Zoom Call: Oct 25, 2:00 PM
                    </p>
                    <p className="text-xs text-blue-500 mt-1 ml-6">Booked by client</p>
                  </div>
                ) : (
                  <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                    <p className="text-sm text-orange-800 font-medium flex items-center gap-2">
                      <i className="fas fa-exclamation-circle"></i> No consultation scheduled yet.
                    </p>
                    <p className="text-xs text-orange-500 mt-1 ml-6">Client will book through the portal</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
