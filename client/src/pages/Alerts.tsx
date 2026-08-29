import { useState } from 'react';
import {
  AlertTriangle, ShieldAlert, ArrowUpRight,
  Search, Clock, MapPin, XCircle, Check
} from 'lucide-react';
import { useSimulationStore } from '../store/simulationStore';
import { formatTimestamp } from '../lib/utils';
import type { Alert } from '../types';

export default function Alerts() {
  const { alerts, acknowledgeAlert, escalateAlert, dismissAlert } = useSimulationStore();
  const [selectedSeverity, setSelectedSeverity] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmDialog, setConfirmDialog] = useState<{ open: boolean; alert: Alert | null; action: 'ESCALATE' | 'DISMISS' | null }>({
    open: false,
    alert: null,
    action: null,
  });

  const filteredAlerts = alerts.filter(a => {
    const matchSeverity = selectedSeverity === 'ALL' || a.severity === selectedSeverity;
    const matchStatus = selectedStatus === 'ALL' || a.status === selectedStatus;
    const matchSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        a.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        (a.trackId && a.trackId.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchSeverity && matchStatus && matchSearch;
  });

  const handleActionClick = (alert: Alert, action: 'ESCALATE' | 'DISMISS') => {
    if (alert.severity === 'CRITICAL' || alert.severity === 'HIGH') {
      setConfirmDialog({ open: true, alert, action });
    } else {
      if (action === 'ESCALATE') escalateAlert(alert.id);
      if (action === 'DISMISS') dismissAlert(alert.id);
    }
  };

  const handleConfirmAction = () => {
    if (!confirmDialog.alert || !confirmDialog.action) return;
    if (confirmDialog.action === 'ESCALATE') escalateAlert(confirmDialog.alert.id);
    if (confirmDialog.action === 'DISMISS') dismissAlert(confirmDialog.alert.id);
    setConfirmDialog({ open: false, alert: null, action: null });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-foreground tracking-tight flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-400" /> Tactical Security Alerts
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Automated sensor fusion anomaly detection triage &amp; command escalation
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search alert ID, track, sector..."
              className="bg-accent/40 border border-border/50 rounded-lg pl-8 pr-3 py-1.5 text-xs text-foreground focus:outline-none focus:border-primary font-mono"
            />
          </div>

          {/* Severity Filter */}
          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="bg-accent/40 border border-border/50 rounded-lg px-3 py-1.5 text-xs text-foreground focus:ring-0 cursor-pointer font-mono"
          >
            <option value="ALL" className="bg-navy-900">ALL SEVERITIES</option>
            <option value="CRITICAL" className="bg-navy-900">CRITICAL</option>
            <option value="HIGH" className="bg-navy-900">HIGH</option>
            <option value="MEDIUM" className="bg-navy-900">MEDIUM</option>
            <option value="LOW" className="bg-navy-900">LOW</option>
            <option value="INFORMATIONAL" className="bg-navy-900">INFORMATIONAL</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-accent/40 border border-border/50 rounded-lg px-3 py-1.5 text-xs text-foreground focus:ring-0 cursor-pointer font-mono"
          >
            <option value="ALL" className="bg-navy-900">ALL STATUSES</option>
            <option value="ACTIVE" className="bg-navy-900">ACTIVE</option>
            <option value="ACKNOWLEDGED" className="bg-navy-900">ACKNOWLEDGED</option>
            <option value="ESCALATED" className="bg-navy-900">ESCALATED</option>
            <option value="RESOLVED" className="bg-navy-900">RESOLVED</option>
            <option value="DISMISSED" className="bg-navy-900">DISMISSED</option>
          </select>
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <div className="glass-card p-12 text-center text-muted-foreground font-mono text-xs">
            NO ALERTS MATCHING CRITERIA
          </div>
        ) : (
          filteredAlerts.map(alert => {
            const isCritical = alert.severity === 'CRITICAL';
            const isHigh = alert.severity === 'HIGH';

            return (
              <div
                key={alert.id}
                className={`glass-card p-5 border transition ${
                  isCritical ? 'border-red-500/50 bg-red-950/20 shadow-[0_0_15px_rgba(239,68,68,0.1)]' : isHigh ? 'border-amber-500/40 bg-amber-950/15' : 'border-border/50'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Left Info */}
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        isCritical ? 'bg-red-500 text-white animate-pulse' : isHigh ? 'bg-amber-500 text-black font-bold' : 'bg-accent text-foreground'
                      }`}>
                        {alert.severity}
                      </span>
                      <span className="text-xs font-mono text-muted-foreground">[{alert.id}]</span>
                      <h3 className="text-sm font-bold text-foreground">{alert.title}</h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-accent/60 border border-border/40 text-muted-foreground">
                        STATUS: <strong className="text-foreground">{alert.status}</strong>
                      </span>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {alert.description}
                    </p>

                    {/* Meta info */}
                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted-foreground pt-1">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-primary" /> {alert.location} ({alert.sector})</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-primary" /> {formatTimestamp(alert.timestamp)}</span>
                      {alert.trackId && <span>TRACK ID: <strong className="text-foreground">{alert.trackId}</strong></span>}
                      {alert.cameraId && <span>CAMERA: <strong className="text-foreground">{alert.cameraId}</strong></span>}
                      {alert.assignedOfficer && <span>OFFICER: <strong className="text-foreground">{alert.assignedOfficer}</strong></span>}
                    </div>
                  </div>

                  {/* Right Actions & Threat score */}
                  <div className="flex sm:flex-col items-end justify-between sm:justify-center gap-3 border-t lg:border-t-0 lg:border-l border-border/30 pt-3 lg:pt-0 lg:pl-6 flex-shrink-0">
                    <div className="text-right">
                      <span className="text-[10px] text-muted-foreground font-mono block">THREAT INDEX</span>
                      <span className={`text-lg font-mono font-bold ${alert.threatScore > 75 ? 'text-red-400' : alert.threatScore > 40 ? 'text-amber-400' : 'text-green-400'}`}>
                        {alert.threatScore}%
                      </span>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2">
                      {alert.status === 'ACTIVE' && (
                        <>
                          <button
                            onClick={() => acknowledgeAlert(alert.id)}
                            className="px-3 py-1.5 rounded-lg bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/40 text-xs font-mono font-semibold flex items-center gap-1 transition"
                            title="Acknowledge"
                          >
                            <Check className="w-3.5 h-3.5" /> ACK
                          </button>
                          <button
                            onClick={() => handleActionClick(alert, 'ESCALATE')}
                            className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/40 text-xs font-mono font-semibold flex items-center gap-1 transition"
                            title="Escalate"
                          >
                            <ArrowUpRight className="w-3.5 h-3.5" /> ESCALATE
                          </button>
                          <button
                            onClick={() => handleActionClick(alert, 'DISMISS')}
                            className="px-2.5 py-1.5 rounded-lg bg-accent hover:bg-destructive/20 text-muted-foreground hover:text-red-400 text-xs font-mono transition"
                            title="Dismiss"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Confirmation Modal for High / Critical Alert actions */}
      {confirmDialog.open && confirmDialog.alert && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-card max-w-md w-full p-6 border border-border/80 shadow-2xl space-y-4 animate-scale-in">
            <div className="flex items-center gap-3 text-red-400 border-b border-border/40 pb-3">
              <ShieldAlert className="w-6 h-6 flex-shrink-0" />
              <h3 className="text-base font-bold font-mono">
                CONFIRM {confirmDialog.action} ACTION
              </h3>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              You are about to <strong className="text-foreground">{confirmDialog.action}</strong> a <strong className="text-red-400">{confirmDialog.alert.severity}</strong> alert for:
            </p>

            <div className="bg-accent/40 p-3 rounded-lg border border-border/50 text-xs font-mono space-y-1">
              <div>Title: <strong className="text-foreground">{confirmDialog.alert.title}</strong></div>
              <div>Location: <strong className="text-foreground">{confirmDialog.alert.location}</strong></div>
              <div>Threat Score: <strong className="text-red-400">{confirmDialog.alert.threatScore}%</strong></div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setConfirmDialog({ open: false, alert: null, action: null })}
                className="px-4 py-2 rounded-lg bg-accent text-foreground text-xs font-semibold hover:bg-accent/80 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAction}
                className="px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold tracking-wide transition font-mono"
              >
                Proceed &amp; Log to Audit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
