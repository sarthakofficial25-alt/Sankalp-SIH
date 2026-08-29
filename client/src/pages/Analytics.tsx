import { useState } from 'react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { BarChart3, Calendar } from 'lucide-react';

const threatsBySectorData = [
  { sector: 'North Sector', threats: 12, resolved: 10 },
  { sector: 'East Perimeter', threats: 8, resolved: 7 },
  { sector: 'South Sector', threats: 6, resolved: 5 },
  { sector: 'West Perimeter', threats: 4, resolved: 4 },
  { sector: 'Restricted-03', threats: 18, resolved: 14 },
];

const alertsOverTimeData = [
  { time: '00:00', alerts: 2, critical: 0 },
  { time: '04:00', alerts: 1, critical: 0 },
  { time: '08:00', alerts: 5, critical: 1 },
  { time: '12:00', alerts: 8, critical: 2 },
  { time: '16:00', alerts: 12, critical: 3 },
  { time: '20:00', alerts: 9, critical: 1 },
];

const detectionTypeData = [
  { name: 'Authorized Patrol', value: 68, color: '#22c55e' },
  { name: 'Unidentified Person', value: 16, color: '#ef4444' },
  { name: 'RF Signal Anomaly', value: 11, color: '#f59e0b' },
  { name: 'Sensor Degrade', value: 5, color: '#3b82f6' },
];

const rfAvailabilityData = [
  { day: 'Mon', active: 22, offline: 1 },
  { day: 'Tue', active: 23, offline: 0 },
  { day: 'Wed', active: 21, offline: 2 },
  { day: 'Thu', active: 22, offline: 1 },
  { day: 'Fri', active: 21, offline: 2 },
  { day: 'Sat', active: 23, offline: 0 },
  { day: 'Sun', active: 21, offline: 2 },
];

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('7D');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-foreground tracking-tight flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" /> Tactical Security Analytics &amp; Threat Trends
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Statistical anomaly distributions &bull; Historical sensor performance &bull; Incident response metrics
          </p>
        </div>

        {/* Time Filter */}
        <div className="flex items-center gap-1.5 bg-accent/40 p-1 rounded-lg border border-border/40 text-xs font-mono">
          <Calendar className="w-3.5 h-3.5 text-muted-foreground ml-2" />
          {['24H', '7D', '30D', 'CUSTOM'].map(t => (
            <button
              key={t}
              onClick={() => setTimeRange(t)}
              className={`px-3 py-1 rounded text-xs transition ${timeRange === t ? 'bg-primary text-primary-foreground font-bold' : 'text-muted-foreground hover:text-foreground'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Analytics KPI Metric Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-card p-4 border border-border/50">
          <div className="text-xs font-mono text-muted-foreground">TOTAL ANOMALIES (7D)</div>
          <div className="text-2xl font-bold font-mono text-foreground mt-1">48</div>
          <div className="text-[10px] text-green-400 font-mono mt-1">&darr; 12% vs previous period</div>
        </div>
        <div className="glass-card p-4 border border-border/50">
          <div className="text-xs font-mono text-muted-foreground">AVG RESOLUTION TIME</div>
          <div className="text-2xl font-bold font-mono text-primary mt-1">3.4 min</div>
          <div className="text-[10px] text-green-400 font-mono mt-1">&darr; 45s faster response</div>
        </div>
        <div className="glass-card p-4 border border-border/50">
          <div className="text-xs font-mono text-muted-foreground">RF CORRELATION RATE</div>
          <div className="text-2xl font-bold font-mono text-green-400 mt-1">98.2%</div>
          <div className="text-[10px] text-muted-foreground font-mono mt-1">Cross-modal sync</div>
        </div>
        <div className="glass-card p-4 border border-border/50">
          <div className="text-xs font-mono text-muted-foreground">CCTV NETWORK UPTIME</div>
          <div className="text-2xl font-bold font-mono text-cyan-400 mt-1">99.8%</div>
          <div className="text-[10px] text-muted-foreground font-mono mt-1">26 Edge Nodes</div>
        </div>
      </div>

      {/* Charts Grid 1: Bar Chart (Threats by Sector) + Line Chart (Alerts Timeline) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Threats by Sector */}
        <div className="glass-card p-5 border border-border/60">
          <div className="flex items-center justify-between border-b border-border/30 pb-3 mb-4">
            <h3 className="text-xs font-bold font-mono text-foreground">THREAT INCIDENTS BY SECTOR</h3>
            <span className="text-[10px] font-mono text-muted-foreground">TOTAL DETECTIONS</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={threatsBySectorData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f293d" />
                <XAxis dataKey="sector" stroke="#64748b" tick={{ fontSize: 10 }} angle={-15} textAnchor="end" />
                <YAxis stroke="#64748b" tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px', fontFamily: 'monospace' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="threats" name="Detected Threats" fill="#ef4444" radius={[4, 4, 0, 0]} />
                <Bar dataKey="resolved" name="Resolved" fill="#22c55e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Alerts Over Time */}
        <div className="glass-card p-5 border border-border/60">
          <div className="flex items-center justify-between border-b border-border/30 pb-3 mb-4">
            <h3 className="text-xs font-bold font-mono text-foreground">ALERT VOLUME &amp; CRITICAL SPIKES</h3>
            <span className="text-[10px] font-mono text-muted-foreground">24-HOUR TREND</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={alertsOverTimeData} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f293d" />
                <XAxis dataKey="time" stroke="#64748b" tick={{ fontSize: 10 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px', fontFamily: 'monospace' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Line type="monotone" dataKey="alerts" name="Total Alerts" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="critical" name="Critical Threats" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Charts Grid 2: Detection Types Breakdown + RF Beacon Availability */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Detection Breakdown Donut */}
        <div className="glass-card p-5 border border-border/60">
          <div className="flex items-center justify-between border-b border-border/30 pb-3 mb-4">
            <h3 className="text-xs font-bold font-mono text-foreground">DETECTION COMPOSITION BREAKDOWN</h3>
            <span className="text-[10px] font-mono text-muted-foreground">AI CLASSIFICATION</span>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={detectionTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {detectionTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px', fontFamily: 'monospace' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* RF Transponder Reliability */}
        <div className="glass-card p-5 border border-border/60">
          <div className="flex items-center justify-between border-b border-border/30 pb-3 mb-4">
            <h3 className="text-xs font-bold font-mono text-foreground">RF BEACON FLEET AVAILABILITY (7D)</h3>
            <span className="text-[10px] font-mono text-muted-foreground">SDR NETWORK HEALTH</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={rfAvailabilityData} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f293d" />
                <XAxis dataKey="day" stroke="#64748b" tick={{ fontSize: 10 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px', fontFamily: 'monospace' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="active" name="Online Beacons" fill="#06b6d4" stackId="a" />
                <Bar dataKey="offline" name="Offline / Weak" fill="#64748b" stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
