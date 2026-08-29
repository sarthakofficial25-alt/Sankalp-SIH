import { Activity, Server, Radio, Video, Database, Network, Cpu } from 'lucide-react';
import { useSimulationStore } from '../store/simulationStore';
import { mockSensors } from '../data/mockData';

export default function SystemHealth() {
  const { systemHealth, cameras } = useSimulationStore();

  const subsystems = [
    { name: 'CCTV Optical Subsystem', health: systemHealth.cctvNetwork, icon: Video, desc: '26 IP Cameras streaming over private dark fiber' },
    { name: 'RF Signal Receivers & SDR', health: systemHealth.rfSensors, icon: Radio, desc: '6 High-gain Software Defined Radio base stations' },
    { name: 'AI Inference Compute Cluster', health: systemHealth.aiEngine, icon: Cpu, desc: 'Distributed Edge TensorRT & ByteTrack nodes' },
    { name: 'Database & Audit Persistence', health: systemHealth.database, icon: Database, desc: 'PostgreSQL Relational DB with WAL replication' },
    { name: 'REST & WebSocket Gateway', health: systemHealth.apiGateway, icon: Server, desc: 'Microservices API orchestrator' },
    { name: 'Tactical Mesh Backbone', health: systemHealth.network, icon: Network, desc: 'Encrypted Zero-Trust LAN' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-foreground tracking-tight flex items-center gap-2">
          <Activity className="w-5 h-5 text-green-400" /> Infrastructure &amp; Sensor Health Monitor
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Real-time hardware telemetry, heartbeat healthchecks, and sensor degradation tracking
        </p>
      </div>

      {/* Subsystem Health Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subsystems.map(sub => (
          <div key={sub.name} className="glass-card p-5 border border-border/60 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <sub.icon className="w-4 h-4 text-primary" />
                </div>
                <span className="text-xs font-bold font-mono text-foreground">{sub.name}</span>
              </div>
              <span className={`text-sm font-bold font-mono ${sub.health > 95 ? 'text-green-400' : 'text-amber-400'}`}>
                {sub.health}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-accent/40 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${sub.health > 95 ? 'bg-green-500' : 'bg-amber-500'}`}
                style={{ width: `${sub.health}%` }}
              />
            </div>

            <p className="text-[11px] text-muted-foreground">{sub.desc}</p>
          </div>
        ))}
      </div>

      {/* Sensor Grid: Cameras + Physical Auxiliary Sensors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Camera Node Status */}
        <div className="glass-card p-5 border border-border/60">
          <div className="flex items-center justify-between border-b border-border/30 pb-3 mb-4">
            <h3 className="text-xs font-bold font-mono text-foreground flex items-center gap-2">
              <Video className="w-4 h-4 text-primary" /> CAMERA EDGE NODES ({cameras.length})
            </h3>
            <span className="text-[10px] font-mono text-muted-foreground">HEARTBEAT: ~1000ms</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-80 overflow-y-auto pr-1">
            {cameras.map(cam => {
              const isOnline = cam.status === 'ONLINE';
              const isDegraded = cam.status === 'DEGRADED';
              return (
                <div key={cam.id} className="bg-background/40 p-2 rounded border border-border/30 text-xs font-mono flex items-center justify-between">
                  <div>
                    <div className="font-bold text-foreground">{cam.id}</div>
                    <div className="text-[9px] text-muted-foreground truncate max-w-[80px]">{cam.sector}</div>
                  </div>
                  <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.6)]' : isDegraded ? 'bg-amber-500' : 'bg-red-500'}`} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Auxiliary Multi-Sensor Array */}
        <div className="glass-card p-5 border border-border/60">
          <div className="flex items-center justify-between border-b border-border/30 pb-3 mb-4">
            <h3 className="text-xs font-bold font-mono text-foreground flex items-center gap-2">
              <Radio className="w-4 h-4 text-cyan-400" /> PERIMETER SENSORY NODES
            </h3>
            <span className="text-[10px] font-mono text-green-400">TELEMETRY SYNCED</span>
          </div>

          <div className="space-y-3">
            {mockSensors.map(sensor => (
              <div key={sensor.id} className="bg-background/40 p-3 rounded-lg border border-border/30 flex items-center justify-between text-xs font-mono">
                <div className="space-y-0.5">
                  <div className="font-bold text-foreground flex items-center gap-2">
                    {sensor.name}
                    <span className="text-[10px] text-muted-foreground">({sensor.type})</span>
                  </div>
                  <div className="text-[11px] text-muted-foreground font-sans">{sensor.location} &bull; {sensor.sector}</div>
                </div>

                <div className="text-right">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    sensor.status === 'ONLINE' ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {sensor.status}
                  </span>
                  <div className="text-[10px] text-muted-foreground mt-1">Health: {sensor.healthPercentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
