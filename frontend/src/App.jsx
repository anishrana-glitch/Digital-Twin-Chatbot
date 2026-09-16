import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Onboarding from './pages/Onboarding';
import Chat from './pages/Chat';
import Dashboard from './pages/Dashboard';
import Share from './pages/Share';
import Settings from './pages/Settings';
import SharedChat from './pages/SharedChat';

function App() {
  const hasProfile = !!localStorage.getItem('twin_profile');

  return (
    <Router>
      <div className="flex h-screen bg-background font-body-md text-on-surface overflow-hidden selection:bg-primary-container selection:text-on-primary-container relative">
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-primary-container/10 blur-[120px]"></div>
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-tertiary-container/10 blur-[120px]"></div>
        </div>

        <Sidebar />
        
        <main className="flex-1 overflow-y-auto pl-64 relative z-10">
          <div className="w-full max-w-7xl mx-auto px-gutter py-8 min-h-screen flex flex-col">
            <Routes>
              <Route path="/" element={<Navigate to={hasProfile ? "/chat" : "/onboarding"} replace />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/share" element={<Share />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/share/:sessionId" element={<SharedChat />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
