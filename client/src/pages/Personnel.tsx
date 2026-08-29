import { useState } from 'react';
import { Users, Search, Radio, UserCheck } from 'lucide-react';
import { useSimulationStore } from '../store/simulationStore';
import { formatTimestamp } from '../lib/utils';
import type { Personnel } from '../types';

export default function PersonnelPage() {
  const { personnel } = useSimulationStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState('ALL');
  const [selectedPersonnel, setSelectedPersonnel] = useState<Personnel | null>(personnel[0] || null);

  const sectors = ['ALL', 'North Sector', 'East Perimeter', 'South Sector', 'West Perimeter', 'Restricted Sector-03', 'Command Center'];

  const filteredPersonnel = personnel.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        p.serviceId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        p.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        p.rfDeviceId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchSector = selectedSector === 'ALL' || p.assignedSector === selectedSector;
    return matchSearch && matchSector;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-foreground tracking-tight flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" /> Personnel &amp; Transponder Roster
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Active Duty Deployment &bull; RF Transponder Pairing &bull; Sector Authorization
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Service ID, name..."
              className="bg-accent/40 border border-border/50 rounded-lg pl-8 pr-3 py-1.5 text-xs text-foreground focus:outline-none focus:border-primary font-mono"
            />
          </div>

          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className="bg-accent/40 border border-border/50 rounded-lg px-3 py-1.5 text-xs text-foreground font-mono focus:ring-0 cursor-pointer"
          >
            {sectors.map(s => <option key={s} value={s} className="bg-navy-900">{s}</option>)}
          </select>
        </div>
      </div>

      {/* Main Grid: Personnel List Table + Selected Inspector Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personnel Table */}
        <div className="lg:col-span-2 glass-card p-5 border border-border/60">
          <div className="flex items-center justify-between border-b border-border/30 pb-3 mb-4">
            <h3 className="text-xs font-bold font-mono text-foreground">
              DEPLOYED SENTRY &amp; PATROL UNITS ({filteredPersonnel.length})
            </h3>
            <span className="text-[10px] font-mono text-muted-foreground">CLICK ROW TO INSPECT</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="text-muted-foreground border-b border-border/30 text-[10px]">
                  <th className="pb-2.5">SERVICE ID</th>
                  <th className="pb-2.5">NAME &amp; RANK</th>
                  <th className="pb-2.5">ASSIGNED SECTOR</th>
                  <th className="pb-2.5">RF TRANSPONDER</th>
                  <th className="pb-2.5">DUTY STATUS</th>
                  <th className="pb-2.5">LAST SYNC</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20">
                {filteredPersonnel.map(p => (
                  <tr
                    key={p.id}
                    onClick={() => setSelectedPersonnel(p)}
                    className={`cursor-pointer transition ${
                      selectedPersonnel?.id === p.id ? 'bg-primary/15' : 'hover:bg-accent/40'
                    }`}
                  >
                    <td className="py-3 font-bold text-foreground">{p.serviceId}</td>
                    <td className="py-3">
                      <div className="text-foreground font-sans font-medium">{p.name}</div>
                      <div className="text-[10px] text-muted-foreground">{p.rank} &bull; {p.role}</div>
                    </td>
                    <td className="py-3 text-muted-foreground">{p.assignedSector}</td>
                    <td className="py-3 text-cyan-400 flex items-center gap-1">
                      <Radio className="w-3 h-3" /> {p.rfDeviceId}
                    </td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        p.status === 'ON_PATROL' ? 'bg-green-500/15 text-green-400' : p.status === 'AT_POST' ? 'bg-blue-500/15 text-blue-400' : 'bg-muted text-muted-foreground'
                      }`}>
                        {p.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3 text-[10px] text-muted-foreground">
                      {formatTimestamp(p.lastDetectedTime)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Personnel Card */}
        <div>
          {selectedPersonnel ? (
            <div className="glass-card p-5 border border-border/60 space-y-4">
              <div className="flex items-center gap-3 border-b border-border/30 pb-3">
                <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold text-lg font-mono">
                  {selectedPersonnel.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground font-sans">{selectedPersonnel.name}</h3>
                  <p className="text-xs font-mono text-muted-foreground">{selectedPersonnel.rank} &bull; {selectedPersonnel.serviceId}</p>
                </div>
              </div>

              <div className="space-y-2.5 text-xs font-mono">
                <div className="flex justify-between p-2 rounded bg-background/40 border border-border/20">
                  <span className="text-muted-foreground">Role:</span>
                  <span className="text-foreground font-bold">{selectedPersonnel.role}</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-background/40 border border-border/20">
                  <span className="text-muted-foreground">Assigned Sector:</span>
                  <span className="text-foreground">{selectedPersonnel.assignedSector}</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-background/40 border border-border/20">
                  <span className="text-muted-foreground">RF Transponder:</span>
                  <span className="text-cyan-400 font-bold">{selectedPersonnel.rfDeviceId}</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-background/40 border border-border/20">
                  <span className="text-muted-foreground">Authorization:</span>
                  <span className="text-green-400 font-bold">{selectedPersonnel.authorizationStatus}</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-background/40 border border-border/20">
                  <span className="text-muted-foreground">Current Status:</span>
                  <span className="text-foreground">{selectedPersonnel.status}</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-background/40 border border-border/20">
                  <span className="text-muted-foreground">Last GPS Fix:</span>
                  <span className="text-muted-foreground text-[11px]">
                    {selectedPersonnel.lastDetectedLocation.lat.toFixed(4)}, {selectedPersonnel.lastDetectedLocation.lng.toFixed(4)}
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <div className="bg-accent/30 p-3 rounded-lg border border-border/40 text-xs font-mono text-muted-foreground">
                  <div className="flex items-center gap-1.5 text-foreground font-bold mb-1">
                    <UserCheck className="w-3.5 h-3.5 text-green-400" /> IDENTITY VERIFICATION STATUS
                  </div>
                  Biometric facial embedding linked to encrypted RF transponder token. Auto-sync active on all sector cameras.
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-card p-8 text-center text-muted-foreground font-mono text-xs">
              SELECT PERSONNEL TO VIEW DOSSIER
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
