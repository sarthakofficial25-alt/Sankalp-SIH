import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-navy-900 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 mb-6 shadow-2xl">
        <ShieldAlert className="w-8 h-8" />
      </div>

      <h1 className="text-3xl font-extrabold font-mono text-foreground tracking-wide mb-2">
        404 — SECTOR RESTRICTED
      </h1>
      <p className="text-xs text-muted-foreground max-w-md mb-8 font-mono">
        The requested tactical coordinate or intelligence sub-resource does not exist or has been relocated by Command.
      </p>

      <Link
        to="/dashboard"
        className="px-6 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold font-mono tracking-wider flex items-center gap-2 transition"
      >
        <ArrowLeft className="w-4 h-4" /> RETURN TO MISSION DASHBOARD
      </Link>
    </div>
  );
}
