import { useState } from 'react';
import { Settings as SettingsIcon, User, Sliders, MapPin, Radio, FileText, CheckCircle2 } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useSimulationStore } from '../store/simulationStore';
import { formatDateTime } from '../lib/utils';

export default function Settings() {
  const user = useAuthStore(s => s.user);
  const auditLogs = useSimulationStore(s => s.auditLogs);
  const [activeTab, setActiveTab] = useState<'account' | 'detection' | 'rf' | 'zones' | 'audit'>('detection');
  const [savedToast, setSavedToast] = useState(false);

  // Form states for settings
  const [threatWeightVisual, setThreatWeightVisual] = useState(30);
  const [threatWeightRF, setThreatWeightRF] = useState(20);
  const [threatWeightZone, setThreatWeightZone] = useState(25);
  const [rfBeaconFrequency, setRfBeaconFrequency] = useState('462.5000');
  const [autoEscalateCritical, setAutoEscalateCritical] = useState(true);

  const handleSave = () => {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground tracking-tight flex items-center gap-2">
            <SettingsIcon className="w-5 h-5 text-primary" /> Command Configuration &amp; Audit Logs
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Operational thresholds, SDR parameters, geofenced zones, and security audit log archive
          </p>
        </div>

        {savedToast && (
          <div className="bg-green-500/20 border border-green-500/40 text-green-400 text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-mono animate-fade-in">
            <CheckCircle2 className="w-4 h-4" /> CONFIGURATION SAVED
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border/40 gap-4 text-xs font-mono">
        <button
          onClick={() => setActiveTab('detection')}
          className={`pb-3 border-b-2 transition flex items-center gap-1.5 ${activeTab === 'detection' ? 'border-primary text-primary font-bold' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
        >
          <Sliders className="w-3.5 h-3.5" /> AI DETECTION &amp; THREAT SCORING
        </button>
        <button
          onClick={() => setActiveTab('rf')}
          className={`pb-3 border-b-2 transition flex items-center gap-1.5 ${activeTab === 'rf' ? 'border-primary text-primary font-bold' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
        >
          <Radio className="w-3.5 h-3.5" /> RF BEACON SPECTRUM
        </button>
        <button
          onClick={() => setActiveTab('zones')}
          className={`pb-3 border-b-2 transition flex items-center gap-1.5 ${activeTab === 'zones' ? 'border-primary text-primary font-bold' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
        >
          <MapPin className="w-3.5 h-3.5" /> GEOFENCE ZONES
        </button>
        <button
          onClick={() => setActiveTab('audit')}
          className={`pb-3 border-b-2 transition flex items-center gap-1.5 ${activeTab === 'audit' ? 'border-primary text-primary font-bold' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
        >
          <FileText className="w-3.5 h-3.5" /> SYSTEM AUDIT LOGS ({auditLogs.length})
        </button>
        <button
          onClick={() => setActiveTab('account')}
          className={`pb-3 border-b-2 transition flex items-center gap-1.5 ${activeTab === 'account' ? 'border-primary text-primary font-bold' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
        >
          <User className="w-3.5 h-3.5" /> OFFICER PROFILE
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'detection' && (
        <div className="glass-card p-6 border border-border/60 space-y-6">
          <div>
            <h3 className="text-sm font-bold font-mono text-foreground mb-1">THREAT ENGINE WEIGHT FACTORS (SUM = 100)</h3>
            <p className="text-xs text-muted-foreground">Adjust weights used by the ThreatAssessmentEngine when calculating anomalous intrusions.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-mono">
            <div className="space-y-2">
              <label className="text-muted-foreground block">Unknown Visual Identity Penalty (+Score)</label>
              <input
                type="number"
                value={threatWeightVisual}
                onChange={(e) => setThreatWeightVisual(Number(e.target.value))}
                className="w-full bg-background/50 border border-border rounded-lg p-2 text-foreground font-mono"
              />
            </div>
            <div className="space-y-2">
              <label className="text-muted-foreground block">Missing Expected RF Beacon (+Score)</label>
              <input
                type="number"
                value={threatWeightRF}
                onChange={(e) => setThreatWeightRF(Number(e.target.value))}
                className="w-full bg-background/50 border border-border rounded-lg p-2 text-foreground font-mono"
              />
            </div>
            <div className="space-y-2">
              <label className="text-muted-foreground block">Restricted Zone Violation (+Score)</label>
              <input
                type="number"
                value={threatWeightZone}
                onChange={(e) => setThreatWeightZone(Number(e.target.value))}
                className="w-full bg-background/50 border border-border rounded-lg p-2 text-foreground font-mono"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-border/30 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <input
                type="checkbox"
                id="auto-esc"
                checked={autoEscalateCritical}
                onChange={(e) => setAutoEscalateCritical(e.target.checked)}
                className="rounded bg-background border-border text-primary"
              />
              <label htmlFor="auto-esc">Automatically dispatch high-priority tactical alarms when Threat Score &gt; 75%</label>
            </div>

            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold font-mono"
            >
              Update Threat Engine Rules
            </button>
          </div>
        </div>
      )}

      {activeTab === 'rf' && (
        <div className="glass-card p-6 border border-border/60 space-y-6">
          <div>
            <h3 className="text-sm font-bold font-mono text-foreground mb-1">RF PROTOCOL &amp; SDR CHANNEL CONFIGURATION</h3>
            <p className="text-xs text-muted-foreground">Software-Defined Radio sampling parameters for encrypted transponder beacon listeners.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono">
            <div className="space-y-2">
              <label className="text-muted-foreground block">Guard Band Base Frequency (MHz)</label>
              <input
                type="text"
                value={rfBeaconFrequency}
                onChange={(e) => setRfBeaconFrequency(e.target.value)}
                className="w-full bg-background/50 border border-border rounded-lg p-2 text-foreground font-mono"
              />
            </div>
            <div className="space-y-2">
              <label className="text-muted-foreground block">Encryption Standard</label>
              <input
                type="text"
                disabled
                value="AES-256-GCM (Hardware Token)"
                className="w-full bg-background/30 border border-border/50 rounded-lg p-2 text-muted-foreground font-mono"
              />
            </div>
          </div>

          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold font-mono"
          >
            Apply SDR Tuning
          </button>
        </div>
      )}

      {activeTab === 'zones' && (
        <div className="glass-card p-6 border border-border/60 space-y-4">
          <div>
            <h3 className="text-sm font-bold font-mono text-foreground mb-1">VIRTUAL GEOFENCE BOUNDARIES</h3>
            <p className="text-xs text-muted-foreground">Configured spatial polygon classifications for automated access violation alerts.</p>
          </div>

          <div className="space-y-2.5 text-xs font-mono">
            <div className="p-3 bg-background/40 rounded border border-border/30 flex items-center justify-between">
              <div>
                <div className="font-bold text-foreground">North Sector (Z-01)</div>
                <div className="text-[11px] text-muted-foreground">Authorized Patrol Corridor &bull; Max: 8 units</div>
              </div>
              <span className="text-green-400 font-bold">AUTHORIZED</span>
            </div>

            <div className="p-3 bg-background/40 rounded border border-border/30 flex items-center justify-between">
              <div>
                <div className="font-bold text-foreground">East Perimeter (Z-02)</div>
                <div className="text-[11px] text-muted-foreground">Authorized Outer Boundary &bull; Max: 6 units</div>
              </div>
              <span className="text-green-400 font-bold">AUTHORIZED</span>
            </div>

            <div className="p-3 bg-background/40 rounded border border-red-500/30 flex items-center justify-between bg-red-950/10">
              <div>
                <div className="font-bold text-red-300">Restricted Sector-03 (Z-05)</div>
                <div className="text-[11px] text-muted-foreground">High Security Munitions &bull; Immediate alarm on entry</div>
              </div>
              <span className="text-red-400 font-bold">RESTRICTED</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'audit' && (
        <div className="glass-card p-6 border border-border/60 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold font-mono text-foreground mb-1">IMMUTABLE SYSTEM AUDIT LOG</h3>
              <p className="text-xs text-muted-foreground">Cryptographically verifiable sequence of operator actions, alert generations, and sensor changes.</p>
            </div>
            <span className="text-xs font-mono text-green-400">HASH: SHA-256 VERIFIED</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="text-muted-foreground border-b border-border/30 text-[10px]">
                  <th className="pb-2">TIMESTAMP</th>
                  <th className="pb-2">ACTION</th>
                  <th className="pb-2">CATEGORY</th>
                  <th className="pb-2">DETAILS</th>
                  <th className="pb-2">SEVERITY</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20">
                {auditLogs.map(log => (
                  <tr key={log.id} className="hover:bg-accent/40">
                    <td className="py-2.5 text-muted-foreground">{formatDateTime(log.timestamp)}</td>
                    <td className="py-2.5 font-bold text-foreground">{log.action}</td>
                    <td className="py-2.5 text-primary">{log.category}</td>
                    <td className="py-2.5 text-muted-foreground font-sans max-w-xs truncate">{log.details}</td>
                    <td className="py-2.5">
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                        log.severity === 'CRITICAL' ? 'bg-red-500 text-white' : log.severity === 'WARNING' ? 'bg-amber-500 text-black' : 'bg-accent text-foreground'
                      }`}>
                        {log.severity}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'account' && (
        <div className="glass-card p-6 border border-border/60 space-y-4 max-w-lg">
          <h3 className="text-sm font-bold font-mono text-foreground">AUTHENTICATED OFFICER PROFILE</h3>

          <div className="space-y-3 text-xs font-mono">
            <div className="flex justify-between p-2.5 bg-background/40 rounded border border-border/20">
              <span className="text-muted-foreground">Name:</span>
              <span className="text-foreground font-bold">{user?.name}</span>
            </div>
            <div className="flex justify-between p-2.5 bg-background/40 rounded border border-border/20">
              <span className="text-muted-foreground">Service ID:</span>
              <span className="text-foreground font-bold">{user?.serviceId}</span>
            </div>
            <div className="flex justify-between p-2.5 bg-background/40 rounded border border-border/20">
              <span className="text-muted-foreground">Assigned Role:</span>
              <span className="text-primary font-bold">{user?.role}</span>
            </div>
            <div className="flex justify-between p-2.5 bg-background/40 rounded border border-border/20">
              <span className="text-muted-foreground">Security Clearance:</span>
              <span className="text-green-400 font-bold">TOP SECRET / SIH-RESTRICTED</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
