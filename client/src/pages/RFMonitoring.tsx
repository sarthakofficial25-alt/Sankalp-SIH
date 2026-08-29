import { useState, useEffect, useRef } from 'react';
import { Radio, Search, Shield, AlertTriangle, CheckCircle2, Activity, ShieldAlert } from 'lucide-react';
import { useSimulationStore } from '../store/simulationStore';

export default function RFMonitoring() {
  const { rfDevices } = useSimulationStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  const spectrumCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Animated SDR RF Spectrum Canvas
  useEffect(() => {
    const canvas = spectrumCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let offset = 0;

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;

      // Dark background
      ctx.fillStyle = '#070c18';
      ctx.fillRect(0, 0, w, h);

      // Grid lines
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.15)';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Draw frequency baseline & peaks
      ctx.beginPath();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;

      offset += 0.05;

      ctx.moveTo(0, h - 20);
      for (let x = 0; x < w; x += 3) {
        // Base noise
        const noise = Math.sin(x * 0.05 + offset) * 8 + (Math.random() - 0.5) * 6;
        let peak = 0;

        // Peak 1: 462.5 MHz (Authorized Beacon band)
        if (Math.abs(x - w * 0.35) < 30) {
          peak = Math.exp(-Math.pow(x - w * 0.35, 2) / 100) * 80;
        }
        // Peak 2: 462.8 MHz (Authorized Beacon band 2)
        if (Math.abs(x - w * 0.6) < 25) {
          peak = Math.exp(-Math.pow(x - w * 0.6, 2) / 80) * 65;
        }
        // Peak 3: 458.2 MHz (Unauthorized Anomaly Band!)
        if (Math.abs(x - w * 0.85) < 20) {
          peak = Math.exp(-Math.pow(x - w * 0.85, 2) / 60) * 50;
        }

        const y = Math.max(15, h - 25 - noise - peak);
        ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Peak Labels
      ctx.fillStyle = '#22c55e';
      ctx.font = '9px JetBrains Mono, monospace';
      ctx.fillText('462.56 MHz [AUTH-BAND]', w * 0.35 - 40, 25);

      ctx.fillStyle = '#22c55e';
      ctx.fillText('462.83 MHz [AUTH-BAND]', w * 0.6 - 40, 40);

      ctx.fillStyle = '#ef4444';
      ctx.fillText('458.22 MHz [ANOMALY]', w * 0.85 - 40, 55);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  const filteredDevices = rfDevices.filter(d => {
    const matchSearch = d.deviceId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        (d.assignedPersonnelName && d.assignedPersonnelName.toLowerCase().includes(searchQuery.toLowerCase())) ||
                        d.frequency.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = selectedStatus === 'ALL' || d.authorizationStatus === selectedStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-foreground tracking-tight flex items-center gap-2">
            <Radio className="w-5 h-5 text-cyan-400" /> Radio-Frequency (RF) Identity &amp; Spectrum Intelligence
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Software-Defined Radio (SDR) Signal Triangulation &bull; Encrypted Beacon Correlation
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-accent/40 px-3 py-1.5 rounded-lg border border-border/40 text-xs font-mono text-cyan-400">
            <Activity className="w-3.5 h-3.5" /> SDR SPECTRUM ACTIVE
          </div>
        </div>
      </div>

      {/* RF Spectrum Live Waterfall Banner */}
      <div className="glass-card p-4 border border-border/60">
        <div className="flex items-center justify-between border-b border-border/30 pb-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <h3 className="text-xs font-bold font-mono text-foreground">SDR REAL-TIME RF SPECTRUM WATERFALL (450.000 — 470.000 MHz)</h3>
          </div>
          <span className="text-[10px] font-mono text-muted-foreground">SCANNER: USRP B200 / RTLSDR</span>
        </div>

        <canvas
          ref={spectrumCanvasRef}
          width={900}
          height={140}
          className="w-full h-28 rounded bg-navy-900 border border-border/40 block"
        />

        <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground mt-2">
          <span>450.00 MHz</span>
          <span>455.00 MHz</span>
          <span className="text-cyan-400 font-bold">462.50 MHz (Patrol Guard Band)</span>
          <span>467.50 MHz</span>
          <span>470.00 MHz</span>
        </div>
      </div>

      {/* RF + Person Correlation Matrix Table */}
      <div className="glass-card p-5 border border-border/60">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/30 pb-3 mb-4">
          <div>
            <h3 className="text-xs font-bold font-mono text-foreground flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" /> MULTI-FACTOR RF &amp; OPTICAL CORRELATION MATRIX
            </h3>
            <p className="text-[11px] text-muted-foreground">
              Cross-validating optical detections against radio transponder beacons and assigned geofences
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search device, name, freq..."
                className="bg-accent/40 border border-border/50 rounded-lg pl-8 pr-3 py-1 text-xs text-foreground focus:outline-none focus:border-primary font-mono"
              />
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-accent/40 border border-border/50 rounded-lg px-2 py-1 text-xs text-foreground font-mono focus:ring-0 cursor-pointer"
            >
              <option value="ALL" className="bg-navy-900">ALL STATUSES</option>
              <option value="AUTHORIZED" className="bg-navy-900">AUTHORIZED</option>
              <option value="UNAUTHORIZED" className="bg-navy-900">UNAUTHORIZED</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="text-muted-foreground border-b border-border/30 text-[10px]">
                <th className="pb-2.5">DEVICE ID</th>
                <th className="pb-2.5">ASSIGNED PERSONNEL</th>
                <th className="pb-2.5">FREQUENCY</th>
                <th className="pb-2.5">SIGNAL STRENGTH</th>
                <th className="pb-2.5">SECTOR LOCATION</th>
                <th className="pb-2.5">AUTH STATUS</th>
                <th className="pb-2.5">CORRELATION DOCTRINE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              {filteredDevices.map(dev => {
                const isAuth = dev.authorizationStatus === 'AUTHORIZED';
                return (
                  <tr key={dev.id} className="hover:bg-accent/40 transition">
                    <td className="py-3 font-bold text-foreground flex items-center gap-1.5">
                      <Radio className="w-3.5 h-3.5 text-cyan-400" /> {dev.deviceId}
                    </td>
                    <td className="py-3">
                      {dev.assignedPersonnelName ? (
                        <span className="text-foreground font-sans font-medium">{dev.assignedPersonnelName}</span>
                      ) : (
                        <span className="text-red-400 font-bold">UNASSIGNED / ROGUE</span>
                      )}
                    </td>
                    <td className="py-3 text-muted-foreground">{dev.frequency}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-accent/40 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${dev.signalStrength > 70 ? 'bg-green-500' : dev.signalStrength > 30 ? 'bg-amber-500' : 'bg-red-500'}`}
                            style={{ width: `${dev.signalStrength}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-muted-foreground">{dev.signalStrength}%</span>
                      </div>
                    </td>
                    <td className="py-3 text-muted-foreground">{dev.sector}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        isAuth ? 'bg-green-500/15 text-green-400 border border-green-500/30' : 'bg-red-500/15 text-red-400 border border-red-500/30 animate-pulse'
                      }`}>
                        {dev.authorizationStatus}
                      </span>
                    </td>
                    <td className="py-3 text-[10px] text-muted-foreground font-sans">
                      {isAuth ? (
                        <span className="text-green-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Paired with patrol roster
                        </span>
                      ) : (
                        <span className="text-red-400 font-semibold flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" /> Unrecognized signal emission
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Operational Doctrine Card */}
      <div className="glass-card p-4 border border-border/50 text-xs font-mono flex items-start gap-3 bg-accent/20">
        <ShieldAlert className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="font-bold text-foreground">DOCTRINE: ZERO-TRUST MULTI-FACTOR CORRELATION</h4>
          <p className="text-muted-foreground font-sans leading-relaxed text-xs">
            Authorized personnel carry authorized RF transponders. RF signals are treated as supporting identity evidence and are dynamically correlated with optical detection, biometric verification, and geofencing rather than being used as standalone proof.
          </p>
        </div>
      </div>
    </div>
  );
}
