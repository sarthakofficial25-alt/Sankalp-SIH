import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthStore } from './store/authStore';
import { useSimulationStore } from './store/simulationStore';
import DashboardLayout from './layouts/DashboardLayout';
import AuthLayout from './layouts/AuthLayout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Surveillance from './pages/Surveillance';
import Alerts from './pages/Alerts';
import Personnel from './pages/Personnel';
import RFMonitoring from './pages/RFMonitoring';
import MapView from './pages/MapView';
import Incidents from './pages/Incidents';
import Analytics from './pages/Analytics';
import SystemHealth from './pages/SystemHealth';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore(s => s.isAuthenticated);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function SimulationTicker() {
  const tick = useSimulationStore(s => s.tick);
  const isRunning = useSimulationStore(s => s.isRunning);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(tick, 4000);
    return () => clearInterval(interval);
  }, [tick, isRunning]);

  return null;
}

function ToastNotification() {
  const toastMessage = useSimulationStore(s => s.toastMessage);
  const clearToast = useSimulationStore(s => s.clearToast);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(clearToast, 5000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage, clearToast]);

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] animate-slide-up">
      <div className="bg-card border border-border/50 rounded-lg px-5 py-3.5 shadow-2xl max-w-md flex items-start gap-3">
        <div className="flex-1 text-sm text-foreground">{toastMessage}</div>
        <button onClick={clearToast} className="text-muted-foreground hover:text-foreground text-xs mt-0.5">✕</button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <SimulationTicker />
      <ToastNotification />
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/surveillance" element={<Surveillance />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/personnel" element={<Personnel />} />
          <Route path="/rf-monitoring" element={<RFMonitoring />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/incidents" element={<Incidents />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/system-health" element={<SystemHealth />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
