import { useState } from 'react';
import { FileText, ShieldAlert, Clock } from 'lucide-react';
import { mockIncidents } from '../data/mockData';
import { formatTimestamp, formatDateTime } from '../lib/utils';
import type { Incident } from '../types';

export default function Incidents() {
  const [incidents] = useState<Incident[]>(mockIncidents);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(mockIncidents[0] || null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-foreground tracking-tight flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" /> Incident Command &amp; Evidence Dossier
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          End-to-end incident lifecycle management &bull; Forensic audit timeline &bull; Multi-sensor evidence
        </p>
      </div>

      {/* Grid: Incident List + Incident Detail Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Incidents List */}
        <div className="space-y-3">
          <div className="text-xs font-bold font-mono text-muted-foreground">
            SECURITY INCIDENTS ({incidents.length})
          </div>

          {incidents.map(inc => {
            const isCritical = inc.threatLevel === 'CRITICAL';
            return (
              <div
                key={inc.id}
                onClick={() => setSelectedIncident(inc)}
                className={`glass-card p-4 border transition cursor-pointer ${
                  selectedIncident?.id === inc.id
                    ? 'border-primary ring-1 ring-primary'
                    : isCritical
                    ? 'border-red-500/40 hover:border-red-500'
                    : 'border-border/50 hover:border-primary/40'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5 font-mono">
                  <span className="text-xs font-bold text-foreground">{inc.id}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    isCritical ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {inc.threatLevel}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-foreground line-clamp-1">{inc.title}</h4>
                <p className="text-[11px] text-muted-foreground mt-1 line-clamp-2">{inc.description}</p>
                <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground mt-3 pt-2 border-t border-border/20">
                  <span>{inc.location}</span>
                  <span>{inc.status}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Incident Detail Dossier */}
        <div className="lg:col-span-2">
          {selectedIncident ? (
            <div className="glass-card p-6 border border-border/60 space-y-6">
              {/* Dossier Header */}
              <div className="border-b border-border/30 pb-4">
                <div className="flex items-center justify-between font-mono mb-2">
                  <span className="text-xs text-muted-foreground">INCIDENT ID: <strong className="text-foreground">{selectedIncident.id}</strong></span>
                  <span className="px-2.5 py-1 rounded text-xs font-bold bg-accent text-foreground border border-border/40">
                    LIFECYCLE: {selectedIncident.status}
                  </span>
                </div>
                <h2 className="text-base font-bold text-foreground">{selectedIncident.title}</h2>
                <p className="text-xs text-muted-foreground mt-1">{selectedIncident.description}</p>
              </div>

              {/* Meta Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="bg-background/40 p-3 rounded-lg border border-border/20">
                  <span className="text-[10px] text-muted-foreground block">CAMERA ID</span>
                  <span className="font-bold text-foreground">{selectedIncident.cameraId}</span>
                </div>
                <div className="bg-background/40 p-3 rounded-lg border border-border/20">
                  <span className="text-[10px] text-muted-foreground block">TARGET TRACK</span>
                  <span className="font-bold text-foreground">{selectedIncident.trackId}</span>
                </div>
                <div className="bg-background/40 p-3 rounded-lg border border-border/20">
                  <span className="text-[10px] text-muted-foreground block">ASSIGNED OFFICER</span>
                  <span className="font-bold text-foreground">{selectedIncident.assignedOfficer || 'UNASSIGNED'}</span>
                </div>
                <div className="bg-background/40 p-3 rounded-lg border border-border/20">
                  <span className="text-[10px] text-muted-foreground block">TIMESTAMP</span>
                  <span className="font-bold text-foreground">{formatDateTime(selectedIncident.timestamp)}</span>
                </div>
              </div>

              {/* Forensic Timeline */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold font-mono text-foreground flex items-center gap-2 border-b border-border/30 pb-2">
                  <Clock className="w-4 h-4 text-primary" /> INCIDENT AUDIT TIMELINE
                </h3>

                <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-border/60">
                  {selectedIncident.timeline.map((step, idx) => (
                    <div key={idx} className="relative text-xs font-mono space-y-1">
                      <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-navy-900" />
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-primary">{step.action}</span>
                        <span className="text-[10px] text-muted-foreground">{formatTimestamp(step.timestamp)}</span>
                        {step.actor && <span className="text-[10px] bg-accent/60 px-1.5 py-0.2 rounded text-foreground font-sans">by {step.actor}</span>}
                      </div>
                      <p className="text-[11px] text-muted-foreground font-sans">{step.details}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Evidence Log */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-bold font-mono text-foreground flex items-center gap-2 border-b border-border/30 pb-2">
                  <ShieldAlert className="w-4 h-4 text-cyan-400" /> CORROBORATING SENSOR EVIDENCE
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedIncident.evidence.map(ev => (
                    <div key={ev.id} className="bg-accent/30 p-3 rounded-lg border border-border/40 text-xs font-mono space-y-1">
                      <div className="flex justify-between items-center text-[10px] text-muted-foreground">
                        <span className="font-bold text-cyan-400">{ev.type}</span>
                        <span>{formatTimestamp(ev.timestamp)}</span>
                      </div>
                      <p className="text-foreground text-[11px] font-sans">{ev.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-card p-12 text-center text-muted-foreground font-mono text-xs">
              SELECT INCIDENT TO INSPECT DOSSIER
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
