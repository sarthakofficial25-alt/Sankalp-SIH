import { CheckCircle2, XCircle, HelpCircle, ShieldAlert, Cpu, Radio } from 'lucide-react';
import type { IdentityCorrelation } from '../../types';

interface IdentityCorrelationPanelProps {
  correlation?: IdentityCorrelation;
  allCorrelations?: IdentityCorrelation[];
  onSelectTrack?: (trackId: string) => void;
}

export default function IdentityCorrelationPanel({
  correlation,
  allCorrelations = [],
  onSelectTrack,
}: IdentityCorrelationPanelProps) {
  const active = correlation || allCorrelations[0];

  if (!active) {
    return (
      <div className="glass-card p-5 border border-border/40 text-center text-muted-foreground text-xs font-mono">
        NO ACTIVE TRACK SELECTED FOR CORRELATION
      </div>
    );
  }

  const isAuthorized = active.overallStatus === 'AUTHORIZED';
  const isHostile = active.overallStatus === 'HOSTILE';

  return (
    <div className="glass-card p-5 border border-border/50 flex flex-col justify-between">
      <div>
        {/* Panel Header */}
        <div className="flex items-center justify-between border-b border-border/30 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-primary/20 flex items-center justify-center border border-primary/40">
              <Cpu className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h3 className="text-xs font-bold font-mono tracking-wider text-foreground">IDENTITY CORRELATION ENGINE</h3>
              <p className="text-[10px] text-muted-foreground">Multi-Factor CV + RF Fusion</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {allCorrelations.map(c => (
              <button
                key={c.trackId}
                onClick={() => onSelectTrack?.(c.trackId)}
                className={`px-2 py-1 rounded text-[10px] font-mono transition ${
                  c.trackId === active.trackId
                    ? 'bg-primary/20 text-primary border border-primary/40 font-bold'
                    : 'bg-accent/40 text-muted-foreground hover:text-foreground border border-border/40'
                }`}
              >
                {c.trackId}
              </button>
            ))}
          </div>
        </div>

        {/* Track Title */}
        <div className="flex items-center justify-between bg-accent/30 p-3 rounded-lg border border-border/40 mb-4 font-mono">
          <div>
            <span className="text-[10px] text-muted-foreground">TRACK ID:</span>
            <span className="text-sm font-bold text-foreground ml-2">{active.trackId}</span>
            {active.personnelName && (
              <span className="text-xs text-primary ml-2 font-sans font-medium">({active.personnelName})</span>
            )}
          </div>
          <span
            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
              isAuthorized
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : isHostile
                ? 'bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse'
                : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
            }`}
          >
            {active.overallStatus}
          </span>
        </div>

        {/* Multi-Factor Checklist */}
        <div className="space-y-2.5 text-xs font-mono mb-5">
          {/* Visual Match */}
          <div className="flex items-center justify-between p-2 rounded bg-background/40 border border-border/20">
            <div className="flex items-center gap-2">
              {active.visualMatch.status === 'MATCHED' ? (
                <CheckCircle2 className="w-4 h-4 text-green-400" />
              ) : active.visualMatch.status === 'UNVERIFIED' ? (
                <HelpCircle className="w-4 h-4 text-amber-400" />
              ) : (
                <XCircle className="w-4 h-4 text-red-400" />
              )}
              <span>Visual / Face Match</span>
            </div>
            <span className={active.visualMatch.confidence > 70 ? 'text-green-400 font-bold' : 'text-amber-400 font-bold'}>
              {active.visualMatch.confidence}% ({active.visualMatch.status})
            </span>
          </div>

          {/* RF Match */}
          <div className="flex items-center justify-between p-2 rounded bg-background/40 border border-border/20">
            <div className="flex items-center gap-2">
              {active.rfMatch.status === 'MATCHED' ? (
                <CheckCircle2 className="w-4 h-4 text-green-400" />
              ) : active.rfMatch.status === 'WEAK' ? (
                <HelpCircle className="w-4 h-4 text-amber-400" />
              ) : (
                <XCircle className="w-4 h-4 text-red-400" />
              )}
              <span className="flex items-center gap-1">
                <Radio className="w-3 h-3 text-muted-foreground" /> Authorized RF Beacon
              </span>
            </div>
            <span className={active.rfMatch.status === 'MATCHED' ? 'text-green-400 font-bold' : 'text-red-400 font-bold'}>
              {active.rfMatch.deviceId ? `${active.rfMatch.deviceId} (${active.rfMatch.confidence}%)` : 'NOT DETECTED'}
            </span>
          </div>

          {/* Authorized Zone */}
          <div className="flex items-center justify-between p-2 rounded bg-background/40 border border-border/20">
            <div className="flex items-center gap-2">
              {active.authorizedZone ? (
                <CheckCircle2 className="w-4 h-4 text-green-400" />
              ) : (
                <XCircle className="w-4 h-4 text-red-400" />
              )}
              <span>Geofence Authorization</span>
            </div>
            <span className={active.authorizedZone ? 'text-green-400' : 'text-red-400'}>
              {active.authorizedZone ? 'VALID SECTOR' : 'RESTRICTED / UNPERMITTED'}
            </span>
          </div>

          {/* Expected Schedule */}
          <div className="flex items-center justify-between p-2 rounded bg-background/40 border border-border/20">
            <div className="flex items-center gap-2">
              {active.expectedSchedule ? (
                <CheckCircle2 className="w-4 h-4 text-green-400" />
              ) : (
                <XCircle className="w-4 h-4 text-red-400" />
              )}
              <span>Duty Roster & Time Sync</span>
            </div>
            <span className={active.expectedSchedule ? 'text-green-400' : 'text-amber-400'}>
              {active.expectedSchedule ? 'SCHEDULED PATROL' : 'NO ACTIVE ROSTER'}
            </span>
          </div>
        </div>

        {/* Identity Confidence Meter */}
        <div className="bg-background/60 p-3 rounded-lg border border-border/40">
          <div className="flex justify-between text-xs font-mono mb-1.5">
            <span className="text-muted-foreground">IDENTITY CONFIDENCE:</span>
            <span className={`font-bold ${active.identityConfidence > 70 ? 'text-green-400' : active.identityConfidence > 40 ? 'text-amber-400' : 'text-red-400'}`}>
              {active.identityConfidence}%
            </span>
          </div>
          <div className="w-full bg-accent/40 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                active.identityConfidence > 70 ? 'bg-green-500' : active.identityConfidence > 40 ? 'bg-amber-500' : 'bg-red-500'
              }`}
              style={{ width: `${active.identityConfidence}%` }}
            />
          </div>
        </div>
      </div>

      {/* Rationale Notice */}
      <div className="mt-4 pt-3 border-t border-border/30 text-[10px] text-muted-foreground leading-tight flex items-start gap-1.5">
        <ShieldAlert className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
        <span>
          Multi-factor verification doctrine: RF signals are correlated with visual detection and spatial boundaries rather than treated as standalone proof.
        </span>
      </div>
    </div>
  );
}
