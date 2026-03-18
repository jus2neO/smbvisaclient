import { useState, useMemo } from 'react';
import './index.css';
import mockClients from './data/mockClients';

import LoginPage from './components/LoginPage';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatsCards from './components/StatsCards';
import ApplicantTable from './components/ApplicantTable';
import ClientModal from './components/ClientModal';
import ScheduleView from './components/ScheduleView';
import AnalyticsView from './components/AnalyticsView';
import { PaymentsView } from './components/PlaceholderViews';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [clients, setClients] = useState(mockClients);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClientId, setSelectedClientId] = useState(null);

  // --- Auth ---
  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('dashboard');
    setSelectedClientId(null);
    setSearchQuery('');
  };

  // --- Navigation ---
  const handleNavigate = (viewId) => {
    setCurrentView(viewId);
    setSelectedClientId(null);
  };

  // --- Dashboard filter ---
  const filteredClients = useMemo(() => {
    const q = searchQuery.toLowerCase();
    if (!q) return clients;
    return clients.filter((c) => {
      const fullName = `${c.firstName} ${c.lastName}`.toLowerCase();
      return (
        fullName.includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q)
      );
    });
  }, [clients, searchQuery]);

  const selectedClient = clients.find((c) => c.id === selectedClientId) || null;

  const handleSaveStatus = (clientId, newStatus) => {
    setClients((prev) =>
      prev.map((c) => (c.id === clientId ? { ...c, status: newStatus } : c))
    );
  };

  // --- Login gate ---
  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // --- View titles ---
  const VIEW_TITLES = {
    dashboard: 'Applicant Overview',
    schedule: 'Schedule',
    analytics: 'Analytics',
    payments: 'Payments',
  };

  const renderMainContent = () => {
    switch (currentView) {
      case 'schedule':
        return <ScheduleView clients={clients} />;
      case 'analytics':
        return <AnalyticsView clients={clients} />;
      case 'payments':
        return <PaymentsView />;
      default:
        return (
          <div className="flex-1 overflow-y-auto p-6 lg:p-10">
            <StatsCards clients={clients} />
            <ApplicantTable
              clients={filteredClients}
              onViewProfile={setSelectedClientId}
            />
          </div>
        );
    }
  };

  return (
    <div className="text-gray-800 h-screen flex overflow-hidden">
      <Sidebar
        currentView={currentView}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      />

      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <Header
          title={VIEW_TITLES[currentView]}
          searchQuery={searchQuery}
          onSearch={setSearchQuery}
          showSearch={currentView === 'dashboard'}
        />
        {renderMainContent()}
      </main>

      {selectedClient && (
        <ClientModal
          client={selectedClient}
          onClose={() => setSelectedClientId(null)}
          onSave={handleSaveStatus}
        />
      )}
    </div>
  );
}
