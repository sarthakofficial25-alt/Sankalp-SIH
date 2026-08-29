import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Video, Users, AlertTriangle, ShieldAlert, Radio,
  ArrowUpRight, Clock, MapPin, Eye, CheckCircle2
} from 'lucide-react';
import { useSimulationStore } from '../store/simulationStore';
import CameraFeed from '../components/surveillance/CameraFeed';
import IdentityCorrelationPanel from '../components/surveillance/IdentityCorrelationPanel';
import { formatTimestamp, getThreatBg } from '../lib/utils';

export default function Dashboard() {
  const navigate = useNavigate();
  const { dashboardStats, cameras, detections, alerts, correlations } = useSimulationStore();
  const [selectedTrackId, setSelectedTrackId] = useState<string>('P-1098');

  const selectedCorrelation = correlations.find(c => c.trackId === selectedTrackId) || correlations[0];
  const primaryCameras = cameras.slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Top Header / Status bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-foreground tracking-tight flex items-center gap-2">
            Mission Operations Center
            <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded border border-primary/30 font-mono">
              LEVEL-4 READY
            </span>
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Real-time sector intelligence, active automated optical feeds, and RF transponder telemetry.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/surveillance')}
            className="px-3 py-1.5 rounded-lg bg-accent/60 hover:bg-accent border border-border text-xs font-semibold text-foreground flex items-center gap-1.5 transition"
          >
            <Video className="w-3.5 h-3.5" /> Full Camera Wall
          </button>
          <button
            onClick={() => navigate('/alerts')}
            className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-xs font-semibold text-red-400 flex items-center gap-1.5 transition"
          >
            <AlertTriangle className="w-3.5 h-3.5" /> Review Alerts ({alerts.filter(a => a.status === 'ACTIVE').length})
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {/* Active Cameras */}
        <div className="kpi-card border-l-4 border-l-primary">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-mono">
            <span>CAMERAS</span>
            <Video className="w-3.5 h-3.5 text-primary" />
          </div>
          <div className="text-xl font-bold font-mono text-foreground mt-2">
            {dashboardStats.activeCameras} <span className="text-xs text-muted-foreground font-normal">/ {dashboardStats.totalCameras}</span>
          </div>
          <div className="text-[10px] text-amber-400 font-mono mt-1">
            {dashboardStats.degradedCameras} degraded
          </div>
        </div>

        {/* Personnel Detected */}
        <div className="kpi-card border-l-4 border-l-blue-400">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-mono">
            <span>DETECTED</span>
            <Users className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <div className="text-xl font-bold font-mono text-foreground mt-2">
            {dashboardStats.personnelDetected}
          </div>
          <div className="text-[10px] text-green-400 font-mono mt-1">
            CV optical tracking active
          </div>
        </div>

        {/* Authorized Personnel */}
        <div className="kpi-card border-l-4 border-l-green-500">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-mono">
            <span>AUTHORIZED</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
          </div>
          <div className="text-xl font-bold font-mono text-foreground mt-2">
            {dashboardStats.authorizedPersonnel}
          </div>
          <div className="text-[10px] text-muted-foreground font-mono mt-1">
            Verified roster &amp; RF
          </div>
        </div>

        {/* Active Alerts */}
        <div className="kpi-card border-l-4 border-l-amber-500">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-mono">
            <span>ALERTS</span>
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <div className="text-xl font-bold font-mono text-amber-400 mt-2">
            0{dashboardStats.activeAlerts}
          </div>
          <div className="text-[10px] text-muted-foreground font-mono mt-1">
            Pending triage
          </div>
        </div>

        {/* Critical Threats */}
        <div className="kpi-card border-l-4 border-l-red-500">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-mono">
            <span>CRITICAL</span>
            <ShieldAlert className="w-3.5 h-3.5 text-red-500" />
          </div>
          <div className="text-xl font-bold font-mono text-red-400 mt-2">
            0{dashboardStats.criticalThreats}
          </div>
          <div className="text-[10px] text-red-400 font-mono mt-1 animate-pulse">
            Sector-03 Intrusion
          </div>
        </div>

        {/* RF Devices Online */}
        <div className="kpi-card border-l-4 border-l-cyan-500">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-mono">
            <span>RF BEACONS</span>
            <Radio className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="text-xl font-bold font-mono text-foreground mt-2">
            {dashboardStats.rfDevicesOnline} <span className="text-xs text-muted-foreground font-normal">/ {dashboardStats.totalRFDevices}</span>
          </div>
          <div className="text-[10px] text-green-400 font-mono mt-1">
            SDR Telemetry OK
          </div>
        </div>
      </div>

      {/* Main Grid: Live Surveillance + Identity Correlation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Surveillance Quadrant (2 Cols) */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold font-mono tracking-wider text-muted-foreground flex items-center gap-2">
              <Eye className="w-4 h-4 text-primary" /> LIVE SECTOR SURVEILLANCE FEED (TOP PRIORITY QUAD)
            </h2>
            <span className="text-[11px] font-mono text-muted-foreground">LATENCY: ~12ms</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {primaryCameras.map(cam => {
              const camDetections = detections.filter(d => d.cameraId === cam.id);
              return (
                <CameraFeed
                  key={cam.id}
                  camera={cam}
                  detections={camDetections}
                  compact={true}
                  onSelect={() => navigate('/surveillance')}
                />
              );
            })}
          </div>
        </div>

        {/* Identity Correlation Engine (1 Col) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold font-mono tracking-wider text-muted-foreground">
              MULTI-SENSOR CORRELATION
            </h2>
            <span className="text-[10px] text-primary font-mono cursor-pointer hover:underline" onClick={() => navigate('/rf-monitoring')}>
              RF DETAILS &rarr;
            </span>
          </div>

          <IdentityCorrelationPanel
            correlation={selectedCorrelation}
            allCorrelations={correlations}
            onSelectTrack={setSelectedTrackId}
          />
        </div>
      </div>

      {/* Lower Section: Recent Threat Alerts & Tactical Detection Log */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Active Alerts */}
        <div className="glass-card p-5 border border-border/50">
          <div className="flex items-center justify-between border-b border-border/30 pb-3 mb-4">
            <h3 className="text-xs font-bold font-mono text-foreground flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400" /> ACTIVE SECURITY ALERTS
            </h3>
            <button
              onClick={() => navigate('/alerts')}
              className="text-xs text-primary hover:underline font-mono flex items-center gap-1"
            >
              View All <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {alerts.slice(0, 3).map(alert => (
              <div
                key={alert.id}
                className={`p-3.5 rounded-lg border flex items-start justify-between gap-3 ${getThreatBg(alert.severity)}`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-black/40 text-foreground">
                      {alert.severity}
                    </span>
                    <h4 className="text-xs font-bold text-foreground">{alert.title}</h4>
                  </div>
                  <p className="text-[11px] text-muted-foreground line-clamp-2">{alert.description}</p>
                  <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-mono pt-1">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {alert.location}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {formatTimestamp(alert.timestamp)}</span>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <div className="text-xs font-mono font-bold text-red-400">
                    SCORE: {alert.threatScore}%
                  </div>
                  <button
                    onClick={() => navigate('/alerts')}
                    className="mt-2 text-[10px] font-semibold text-primary hover:underline block"
                  >
                    Examine &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Optical & RF Detection Log */}
        <div className="glass-card p-5 border border-border/50">
          <div className="flex items-center justify-between border-b border-border/30 pb-3 mb-4">
            <h3 className="text-xs font-bold font-mono text-foreground flex items-center gap-2">
              <Radio className="w-4 h-4 text-cyan-400" /> REAL-TIME DETECTION CORRELATION LOG
            </h3>
            <span className="text-[10px] font-mono text-green-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping"></span> STREAMING
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="text-muted-foreground border-b border-border/30 text-[10px]">
                  <th className="pb-2">TRACK ID</th>
                  <th className="pb-2">CAMERA</th>
                  <th className="pb-2">VISUAL</th>
                  <th className="pb-2">RF BEACON</th>
                  <th className="pb-2">THREAT</th>
                  <th className="pb-2">TIME</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20">
                {detections.slice(0, 5).map(det => (
                  <tr key={det.id} className="hover:bg-accent/40 transition">
                    <td className="py-2.5 font-bold text-foreground">{det.trackId}</td>
                    <td className="py-2.5 text-muted-foreground">{det.cameraId}</td>
                    <td className="py-2.5">
                      <span className={det.visualStatus === 'MATCHED' ? 'text-green-400' : 'text-red-400 font-bold'}>
                        {det.visualStatus}
                      </span>
                    </td>
                    <td className="py-2.5">
                      <span className={det.rfStatus === 'MATCHED' ? 'text-green-400' : 'text-red-400 font-bold'}>
                        {det.rfStatus}
                      </span>
                    </td>
                    <td className="py-2.5">
                      <span className={det.threatScore > 50 ? 'text-red-400 font-bold' : 'text-green-400'}>
                        {det.threatScore}%
                      </span>
                    </td>
                    <td className="py-2.5 text-[10px] text-muted-foreground">
                      {formatTimestamp(det.timestamp)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
