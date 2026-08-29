import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Lock, User as UserIcon, AlertCircle, ArrowLeft, KeyRound } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import type { UserRole } from '../types';

export default function Login() {
  const [serviceId, setServiceId] = useState('IND-CMD-001');
  const [password, setPassword] = useState('suraksha2024');
  const [role, setRole] = useState<UserRole>('COMMANDER');
  const [rememberDevice, setRememberDevice] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const login = useAuthStore(s => s.login);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      if (!serviceId || !password) {
        setError('Please enter valid credentials');
        setIsLoading(false);
        return;
      }

      // Mock Authentication
      const user = {
        id: 'USR-001',
        username: serviceId.toLowerCase(),
        name: role === 'COMMANDER' ? 'Brig. A. K. Verma' : role === 'SUPER_ADMIN' ? 'Admin Master' : 'Capt. Rajesh Kumar',
        role,
        rank: role === 'COMMANDER' ? 'Brigadier' : 'Captain',
        serviceId,
        lastLogin: new Date().toISOString(),
      };

      login(user, 'mock-jwt-token-suraksha-26187');
      setIsLoading(false);
      navigate('/dashboard');
    }, 600);
  };

  const handleQuickFill = (presetRole: UserRole, id: string) => {
    setRole(presetRole);
    setServiceId(id);
    setPassword('suraksha2024');
  };

  return (
    <div className="min-h-screen bg-navy-900 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Back Link */}
        <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground mb-6 transition">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Overview
        </Link>

        <div className="glass-card p-8 border border-border/60 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center mx-auto mb-3 shadow-[0_0_15px_rgba(59,130,246,0.25)]">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-xl font-bold text-foreground tracking-wide">SURAKSHA-NET</h1>
            <p className="text-xs text-muted-foreground font-mono mt-0.5">SECURE COMMAND ACCESS &bull; RESTRICTED</p>
          </div>

          {/* Demo Credentials Hint */}
          <div className="bg-accent/40 border border-border/60 rounded-lg p-3 mb-6 text-xs">
            <div className="flex items-center justify-between text-muted-foreground font-mono text-[11px] mb-2 font-semibold">
              <span>DEMO CREDENTIAL PRESETS:</span>
              <span className="text-green-400">READY</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickFill('COMMANDER', 'IND-CMD-001')}
                className={`text-left p-1.5 rounded border text-[11px] font-mono transition ${role === 'COMMANDER' ? 'bg-primary/20 border-primary text-primary' : 'bg-background/40 border-border/40 hover:bg-background/80'}`}
              >
                <div className="font-bold">Commander</div>
                <div className="text-[10px] text-muted-foreground">IND-CMD-001</div>
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('SECURITY_OFFICER', 'IND-OFF-042')}
                className={`text-left p-1.5 rounded border text-[11px] font-mono transition ${role === 'SECURITY_OFFICER' ? 'bg-primary/20 border-primary text-primary' : 'bg-background/40 border-border/40 hover:bg-background/80'}`}
              >
                <div className="font-bold">Security Officer</div>
                <div className="text-[10px] text-muted-foreground">IND-OFF-042</div>
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs p-3 rounded-lg flex items-center gap-2 mb-4">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                Service ID / Badge Number
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={serviceId}
                  onChange={(e) => setServiceId(e.target.value)}
                  placeholder="e.g. IND-0421"
                  required
                  className="w-full bg-background/60 border border-border rounded-lg pl-9 pr-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary font-mono transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                Security Passcode
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full bg-background/60 border border-border rounded-lg pl-9 pr-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary font-mono transition"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-muted-foreground hover:text-foreground">
                <input
                  type="checkbox"
                  checked={rememberDevice}
                  onChange={(e) => setRememberDevice(e.target.checked)}
                  className="rounded bg-background/80 border-border text-primary focus:ring-0"
                />
                Remember this terminal
              </label>
              <span className="text-[11px] font-mono text-muted-foreground">TLS 1.3 ENC</span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-2.5 px-4 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold tracking-wide transition flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Authenticating...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" /> Authorize Command Access
                </>
              )}
            </button>
          </form>

          {/* Security Disclaimer */}
          <div className="mt-6 pt-4 border-t border-border/30 text-center text-[10px] text-muted-foreground font-mono">
            CLASSIFIED DEMONSTRATION ENVIRONMENT &bull; SIH 2024
          </div>
        </div>
      </div>
    </div>
  );
}
