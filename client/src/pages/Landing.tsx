import { Link, useNavigate } from 'react-router-dom';
import { Shield, Radio, AlertTriangle, Eye, Server, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export default function Landing() {
  const isAuthenticated = useAuthStore(s => s.isAuthenticated);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-navy-900 text-foreground flex flex-col selection:bg-primary/30">
      {/* Top Navbar */}
      <header className="border-b border-border/40 bg-navy-900/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-wider text-foreground">SURAKSHA-NET</span>
                <span className="text-[10px] bg-primary/20 text-primary border border-primary/40 px-1.5 py-0.5 rounded font-mono font-bold">PS-26187</span>
              </div>
              <p className="text-[11px] text-muted-foreground tracking-tight">AI Border Intelligence & Surveillance Platform</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground font-mono mr-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              DEFENCE SIMULATION ENV
            </div>
            {isAuthenticated ? (
              <button
                onClick={() => navigate('/dashboard')}
                className="px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold tracking-wide flex items-center gap-2 transition shadow-lg shadow-primary/20"
              >
                Enter Command Center <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold tracking-wide flex items-center gap-2 transition shadow-lg shadow-primary/20"
              >
                Command Login <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-6 overflow-hidden border-b border-border/30">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293d15_1px,transparent_1px),linear-gradient(to_bottom,#1f293d15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/60 border border-border/60 text-xs font-mono text-primary mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            SIH Problem Statement ID: 26187 | Tactical Multi-Sensor Correlation
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            See Beyond the Border. <br />
            <span className="text-gradient">Intelligent Autonomous Surveillance.</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
            AI-powered multi-sensor intelligence platform correlating continuous optical camera feeds, authorized RF identities, computer vision tracking, and geofenced zones for real-time proactive perimeter defence.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/login"
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold tracking-wide flex items-center justify-center gap-2 shadow-xl shadow-primary/25 transition transform active:scale-95"
            >
              Enter Command Center <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#features"
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-secondary hover:bg-accent border border-border text-foreground text-sm font-semibold tracking-wide transition flex items-center justify-center"
            >
              Architecture & Capabilities
            </a>
          </div>

          {/* Quick Stats Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 text-left">
            <div className="glass-card p-4 border border-border/40">
              <div className="text-2xl font-bold font-mono text-primary">96.4%</div>
              <div className="text-xs font-semibold text-foreground mt-1">Multi-Modal Accuracy</div>
              <div className="text-[11px] text-muted-foreground">CV + RF Correlation</div>
            </div>
            <div className="glass-card p-4 border border-border/40">
              <div className="text-2xl font-bold font-mono text-green-400">&lt; 350ms</div>
              <div className="text-xs font-semibold text-foreground mt-1">Alert Latency</div>
              <div className="text-[11px] text-muted-foreground">Real-time edge triage</div>
            </div>
            <div className="glass-card p-4 border border-border/40">
              <div className="text-2xl font-bold font-mono text-amber-400">Zero-Trust</div>
              <div className="text-xs font-semibold text-foreground mt-1">RF Identity Logic</div>
              <div className="text-[11px] text-muted-foreground">Multi-factor validation</div>
            </div>
            <div className="glass-card p-4 border border-border/40">
              <div className="text-2xl font-bold font-mono text-blue-400">24 / 7</div>
              <div className="text-xs font-semibold text-foreground mt-1">All-Weather Guard</div>
              <div className="text-[11px] text-muted-foreground">Optical + RF fallback</div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Capabilities Grid */}
      <section id="features" className="py-20 px-6 max-w-7xl mx-auto flex-1">
        <div className="text-center mb-14">
          <h2 className="text-xs uppercase tracking-widest text-primary font-mono font-bold mb-2">Platform Capabilities</h2>
          <p className="text-3xl font-bold text-foreground">Next-Generation Border Intelligence</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 border border-border/50 hover:border-primary/40 transition">
            <div className="w-12 h-12 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4">
              <Eye className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">AI Surveillance & Tracking</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Real-time deep learning person detection, ByteTrack kinematics, and selective facial verification. Continues tracking even during partial occlusion.
            </p>
          </div>

          <div className="glass-card p-6 border border-border/50 hover:border-primary/40 transition">
            <div className="w-12 h-12 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-4">
              <Radio className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">RF Identity Correlation</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Patrol personnel carry authorized RF transponders. The system pairs optical detections with radio telemetry to detect spoofing and unauthorized presences.
            </p>
          </div>

          <div className="glass-card p-6 border border-border/50 hover:border-primary/40 transition">
            <div className="w-12 h-12 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">Weighted Threat Engine</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Normalized 0-100 threat assessment combining visual identity confidence, RF presence, geofence compliance, time-of-day, and behavior telemetry.
            </p>
          </div>

          <div className="glass-card p-6 border border-border/50 hover:border-primary/40 transition">
            <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4">
              <Server className="w-6 h-6 text-amber-400" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">Multi-Factor Geofencing</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Polygonal virtual boundaries classify areas into Authorized, Restricted, High Security, and Buffer zones with automated boundary violation alarms.
            </p>
          </div>

          <div className="glass-card p-6 border border-border/50 hover:border-primary/40 transition">
            <div className="w-12 h-12 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4">
              <Cpu className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">Modular AI Service Layer</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Decoupled inference architecture ready for drop-in replacement with YOLOv8, DeepSORT, FaceNet, and Software-Defined Radio (SDR) decoders.
            </p>
          </div>

          <div className="glass-card p-6 border border-border/50 hover:border-primary/40 transition">
            <div className="w-12 h-12 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">Mission Control Command</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Comprehensive role-based operational command center featuring live incident timelines, audit trail verification, analytics, and tactical map overlays.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/30 bg-navy-900/60 py-8 px-6 text-center text-xs text-muted-foreground">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-semibold text-foreground">SURAKSHA-NET</span> — Prototype for Smart India Hackathon (SIH ID: 26187)
          </div>
          <div className="text-[11px] font-mono">
            CLASSIFICATION: RESTRICTED DEMO ENVIRONMENT
          </div>
        </div>
      </footer>
    </div>
  );
}
