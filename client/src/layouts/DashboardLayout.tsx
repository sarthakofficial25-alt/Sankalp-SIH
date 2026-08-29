import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useSimulationStore, DEMO_STEP_DATA } from '../store/simulationStore';
import { useState, useEffect } from 'react';
import {
  LayoutDashboard, Video, AlertTriangle, Users, Radio, Map,
  FileText, BarChart3, Activity, Settings, LogOut, Shield,
  Bell, Wifi, ChevronLeft, ChevronRight, Play, Pause,
  Zap, Menu
} from 'lucide-react';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/surveillance', label: 'Live Surveillance', icon: Video },
  { path: '/map', label: 'Threat Map', icon: Map },
  { path: '/personnel', label: 'Personnel', icon: Users },
  { path: '/rf-monitoring', label: 'RF Monitoring', icon: Radio },
  { path: '/alerts', label: 'Alerts', icon: AlertTriangle },
  { path: '/incidents', label: 'Incidents', icon: FileText },
  { path: '/analytics', label: 'Analytics', icon: BarChart3 },
  { path: '/system-health', label: 'System Health', icon: Activity },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export default function DashboardLayout() {
  const { user, logout } = useAuthStore();
  const {
    isRunning, toggleSimulation, demoMode, toggleDemoMode, nextDemoStep, demoStep,
    generateIntrusion, alerts
  } = useSimulationStore();
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const activeAlerts = alerts.filter(a => a.status === 'ACTIVE').length;

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full bg-navy-900 border-r border-border/30 z-40 transition-all duration-300 flex flex-col ${sidebarCollapsed ? 'w-[68px]' : 'w-[240px]'} ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        {/* Logo */}
        <div className="p-4 border-b border-border/30 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          {!sidebarCollapsed && (
            <div className="min-w-0">
              <h1 className="text-sm font-bold text-foreground tracking-wide">SURAKSHA-NET</h1>
              <p className="text-[10px] text-muted-foreground truncate">AI Border Intelligence</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `sidebar-item ${isActive ? 'sidebar-item-active' : ''} ${sidebarCollapsed ? 'justify-center px-2' : ''}`
              }
              title={sidebarCollapsed ? item.label : undefined}
            >
              <item.icon className="w-[18px] h-[18px] flex-shrink-0" />
              {!sidebarCollapsed && <span>{item.label}</span>}
              {item.path === '/alerts' && activeAlerts > 0 && (
                <span className={`${sidebarCollapsed ? 'absolute -top-1 -right-1' : 'ml-auto'} bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center`}>
                  {activeAlerts}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Simulation Controls */}
        <div className={`border-t border-border/30 p-3 space-y-2 ${sidebarCollapsed ? 'px-2' : ''}`}>
          {!sidebarCollapsed && (
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">Simulation</p>
          )}
          <button
            onClick={toggleSimulation}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${isRunning ? 'bg-green-500/15 text-green-400 hover:bg-green-500/25' : 'bg-muted text-muted-foreground hover:bg-accent'} ${sidebarCollapsed ? 'justify-center px-2' : ''}`}
            title={isRunning ? 'Pause Simulation' : 'Resume Simulation'}
          >
            {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {!sidebarCollapsed && (isRunning ? 'SIMULATION: ON' : 'SIMULATION: OFF')}
          </button>
          <button
            onClick={generateIntrusion}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors ${sidebarCollapsed ? 'justify-center px-2' : ''}`}
            title="Generate Test Intrusion"
          >
            <Zap className="w-3.5 h-3.5" />
            {!sidebarCollapsed && 'Generate Intrusion'}
          </button>
          <button
            onClick={toggleDemoMode}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${demoMode ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground hover:bg-accent'} ${sidebarCollapsed ? 'justify-center px-2' : ''}`}
            title="Command Demo Mode"
          >
            <BarChart3 className="w-3.5 h-3.5" />
            {!sidebarCollapsed && (demoMode ? 'DEMO MODE: ON' : 'Command Demo')}
          </button>
          {!sidebarCollapsed && (
            <div className="flex gap-1">
              {['normal-patrol', 'unknown-person', 'rf-mismatch', 'camera-failure', 'poor-visibility'].map((s, i) => (
                <button
                  key={s}
                  onClick={() => useSimulationStore.getState().runScenario(s)}
                  className="flex-1 px-1 py-1.5 rounded text-[9px] font-medium bg-accent/50 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                  title={`Scenario ${i + 1}: ${s.replace(/-/g, ' ')}`}
                >
                  S{i + 1}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Collapse Button */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="hidden lg:flex border-t border-border/30 p-3 items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
        >
          {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </aside>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-[68px]' : 'lg:ml-[240px]'}`}>
        {/* Header */}
        <header className="sticky top-0 z-20 bg-navy-900/80 backdrop-blur-md border-b border-border/30">
          <div className="flex items-center justify-between px-4 h-14">
            {/* Left */}
            <div className="flex items-center gap-3">
              <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden text-muted-foreground hover:text-foreground">
                <Menu className="w-5 h-5" />
              </button>
              <div className="hidden sm:block">
                <span className="text-xs font-semibold text-primary tracking-wider">SURAKSHA-NET</span>
                <span className="text-[10px] text-muted-foreground ml-2 tracking-wide">AI BORDER INTELLIGENCE SYSTEM</span>
              </div>
            </div>

            {/* Center - Status */}
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="status-dot status-dot-online animate-pulse-slow" />
                <span className="text-[10px] text-green-400 font-mono">SYSTEM OPERATIONAL</span>
              </div>
              <div className="text-[10px] text-muted-foreground font-mono">
                {currentTime.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                {' '}
                {currentTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
              </div>
              <div className="flex items-center gap-1.5">
                <Wifi className="w-3 h-3 text-green-400" />
                <span className="text-[10px] text-muted-foreground font-mono">NET OK</span>
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-2">
              <button className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors" onClick={() => navigate('/alerts')}>
                <Bell className="w-[18px] h-[18px]" />
                {activeAlerts > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {activeAlerts}
                  </span>
                )}
              </button>
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent/50">
                <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-primary">{user?.name?.charAt(0) || 'C'}</span>
                </div>
                <div className="text-xs">
                  <p className="font-medium text-foreground">{user?.name || 'Commander'}</p>
                  <p className="text-[10px] text-muted-foreground">{user?.role || 'COMMANDER'}</p>
                </div>
              </div>
              <button onClick={handleLogout} className="p-2 rounded-lg text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-colors" title="Logout">
                <LogOut className="w-[18px] h-[18px]" />
              </button>
            </div>
          </div>
        </header>

        {/* Demo Mode Bar */}
        {demoMode && (
          <div className="bg-primary/10 border-b border-primary/20 px-4 py-3">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-primary tracking-wider">COMMAND DEMO MODE</span>
                <span className="text-xs text-muted-foreground">Step {demoStep + 1} / {DEMO_STEP_DATA.length}</span>
              </div>
              <div className="flex-1 mx-6">
                <p className="text-sm font-medium text-foreground">{DEMO_STEP_DATA[demoStep]?.title}</p>
                <p className="text-xs text-muted-foreground">{DEMO_STEP_DATA[demoStep]?.description}</p>
              </div>
              <div className="flex items-center gap-2">
                {/* Progress dots */}
                <div className="hidden sm:flex items-center gap-1 mr-3">
                  {DEMO_STEP_DATA.map((_, i) => (
                    <div key={i} className={`w-1.5 h-1.5 rounded-full transition-colors ${i <= demoStep ? 'bg-primary' : 'bg-muted'}`} />
                  ))}
                </div>
                <button
                  onClick={nextDemoStep}
                  className="px-4 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors"
                >
                  {demoStep < DEMO_STEP_DATA.length - 1 ? 'Next Step →' : 'Complete'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
