import { useState } from 'react';
import { Video, Filter, Grid, Sliders, Shield, Activity } from 'lucide-react';
import { useSimulationStore } from '../store/simulationStore';
import CameraFeed from '../components/surveillance/CameraFeed';
import type { Camera } from '../types';

export default function Surveillance() {
  const { cameras, detections } = useSimulationStore();
  const [selectedSector, setSelectedSector] = useState<string>('ALL');
  const [activeCam, setActiveCam] = useState<Camera | null>(cameras[0] || null);
  const [filterAiOnly, setFilterAiOnly] = useState(false);

  const sectors = ['ALL', 'North Sector', 'East Perimeter', 'South Sector', 'West Perimeter', 'Restricted Sector-03'];

  const filteredCameras = cameras.filter(c => {
    const matchSector = selectedSector === 'ALL' || c.sector === selectedSector;
    const matchAi = !filterAiOnly || c.aiEnabled;
    return matchSector && matchAi;
  });

  const activeDetections = detections.filter(d => d.cameraId === activeCam?.id);

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-foreground tracking-tight flex items-center gap-2">
            <Video className="w-5 h-5 text-primary" /> Live Surveillance Command Wall
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            26 High-Resolution Tactical Optical Sensors &bull; Autonomous Tracking &bull; Edge Inference
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-accent/40 p-1 rounded-lg border border-border/40 text-xs">
            <Filter className="w-3.5 h-3.5 text-muted-foreground ml-2" />
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="bg-transparent border-0 text-foreground text-xs focus:ring-0 cursor-pointer pr-2"
            >
              {sectors.map(s => <option key={s} value={s} className="bg-navy-900 text-foreground">{s}</option>)}
            </select>
          </div>

          <button
            onClick={() => setFilterAiOnly(!filterAiOnly)}
            className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition flex items-center gap-1.5 ${
              filterAiOnly ? 'bg-primary/20 border-primary text-primary font-bold' : 'bg-accent/40 border-border/40 text-muted-foreground'
            }`}
          >
            <Sliders className="w-3 h-3" /> AI-ACTIVE ONLY
          </button>
        </div>
      </div>

      {/* Main Layout: Large Active Inspector + Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Active Camera Detailed Feed */}
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-card p-4 border border-border/60">
            <div className="flex items-center justify-between border-b border-border/30 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                <h3 className="text-sm font-bold font-mono text-foreground">{activeCam?.name} — {activeCam?.location}</h3>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground">
                <span>SECTOR: <strong className="text-foreground">{activeCam?.sector}</strong></span>
                <span>STATUS: <strong className="text-green-400">{activeCam?.status}</strong></span>
              </div>
            </div>

            {activeCam && (
              <div className="relative">
                <CameraFeed camera={activeCam} detections={activeDetections} compact={false} />
              </div>
            )}

            {/* Target telemetry breakdown for active camera */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-3 border-t border-border/30 text-xs font-mono">
              <div className="bg-background/40 p-2 rounded border border-border/20">
                <span className="text-[10px] text-muted-foreground block">RESOLUTION</span>
                <span className="font-bold text-foreground">{activeCam?.resolution} (H.265)</span>
              </div>
              <div className="bg-background/40 p-2 rounded border border-border/20">
                <span className="text-[10px] text-muted-foreground block">AI INFERENCE</span>
                <span className="font-bold text-green-400">YOLOv8 + ByteTrack</span>
              </div>
              <div className="bg-background/40 p-2 rounded border border-border/20">
                <span className="text-[10px] text-muted-foreground block">DETECTIONS NOW</span>
                <span className="font-bold text-primary">{activeDetections.length} Target(s)</span>
              </div>
              <div className="bg-background/40 p-2 rounded border border-border/20">
                <span className="text-[10px] text-muted-foreground block">RF PROXIMITY</span>
                <span className="font-bold text-cyan-400">SDR-NODE-04</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tactical Info & Targets List */}
        <div className="space-y-4">
          <div className="glass-card p-4 border border-border/60">
            <h3 className="text-xs font-bold font-mono text-foreground flex items-center gap-2 border-b border-border/30 pb-2 mb-3">
              <Activity className="w-4 h-4 text-primary" /> DETECTED TARGETS IN VIEW
            </h3>

            {activeDetections.length === 0 ? (
              <div className="p-6 text-center text-xs text-muted-foreground font-mono">
                NO HUMAN TARGETS CURRENTLY IN CAMERA FOV
              </div>
            ) : (
              <div className="space-y-2.5">
                {activeDetections.map(det => (
                  <div
                    key={det.id}
                    className={`p-3 rounded-lg border text-xs font-mono ${
                      det.threatLevel === 'CRITICAL'
                        ? 'bg-red-500/15 border-red-500/40 text-red-300'
                        : 'bg-accent/40 border-border/40 text-foreground'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold">{det.trackId}</span>
                      <span className="px-1.5 py-0.5 rounded bg-black/40 text-[10px] font-bold">
                        {det.threatLevel} THREAT
                      </span>
                    </div>
                    <div className="text-[11px] text-muted-foreground space-y-0.5">
                      <div>Confidence: <strong className="text-foreground">{det.confidence}%</strong></div>
                      <div>Visual Match: <strong className={det.visualStatus === 'MATCHED' ? 'text-green-400' : 'text-red-400'}>{det.visualStatus}</strong></div>
                      <div>RF Transponder: <strong className={det.rfStatus === 'MATCHED' ? 'text-green-400' : 'text-red-400'}>{det.rfStatus}</strong></div>
                      <div>Zone: <strong className="text-foreground">{det.zone}</strong></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="glass-card p-4 border border-border/60 text-xs font-mono space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground font-bold border-b border-border/30 pb-1.5">
              <Shield className="w-4 h-4 text-primary" /> SURVEILLANCE PROTOCOLS
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Optical sensors utilize edge inference. When face recognition drops below threshold (due to low lighting/distance), system automatically triggers cross-modal correlation with RF transponder beacons.
            </p>
          </div>
        </div>
      </div>

      {/* Camera Grid (Remaining Feeds) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold font-mono tracking-wider text-muted-foreground flex items-center gap-2">
            <Grid className="w-4 h-4 text-primary" /> ALL NETWORKED CAMERAS ({filteredCameras.length})
          </h2>
          <span className="text-[11px] font-mono text-muted-foreground">CLICK TO FOCUS INSPECTOR</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredCameras.map(cam => {
            const camDets = detections.filter(d => d.cameraId === cam.id);
            return (
              <CameraFeed
                key={cam.id}
                camera={cam}
                detections={camDets}
                compact={true}
                isSelected={activeCam?.id === cam.id}
                onSelect={() => setActiveCam(cam)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
