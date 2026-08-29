import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Map as MapIcon, Layers } from 'lucide-react';
import { useSimulationStore } from '../store/simulationStore';
import { mockZones } from '../data/mockData';

// Custom Map Marker Icons using Leaflet divIcon
const createCustomIcon = (color: string, label: string) => {
  return L.divIcon({
    className: 'custom-map-marker',
    html: `
      <div style="
        background-color: ${color};
        width: 22px;
        height: 22px;
        border-radius: 50%;
        border: 2px solid #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-family: monospace;
        font-size: 9px;
        font-weight: bold;
        box-shadow: 0 0 10px ${color};
      ">
        ${label}
      </div>
    `,
    iconSize: [22, 22],
    iconAnchor: [11, 11],
  });
};

const cameraIcon = createCustomIcon('#3b82f6', 'C');
const personnelIcon = createCustomIcon('#22c55e', 'P');
const rfIcon = createCustomIcon('#06b6d4', 'RF');
const incidentIcon = createCustomIcon('#ef4444', '!');

export default function MapView() {
  const { cameras, personnel, rfDevices, alerts } = useSimulationStore();

  const [showCameras, setShowCameras] = useState(true);
  const [showPersonnel, setShowPersonnel] = useState(true);
  const [showRF, setShowRF] = useState(true);
  const [showZones, setShowZones] = useState(true);
  const [showIncidents, setShowIncidents] = useState(true);

  // Center coordinate of our simulated border station in Rajasthan
  const centerLat = 26.9080;
  const centerLng = 70.9050;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-foreground tracking-tight flex items-center gap-2">
            <MapIcon className="w-5 h-5 text-primary" /> Geospatial Threat &amp; Perimeter Map
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Tactical geofenced boundary intelligence &bull; Multi-layer sensor overlays
          </p>
        </div>

        {/* Map Layer Filter Toggles */}
        <div className="flex flex-wrap items-center gap-2 bg-accent/40 p-1.5 rounded-lg border border-border/40 text-xs font-mono">
          <span className="text-muted-foreground text-[10px] mr-1 flex items-center gap-1 font-bold">
            <Layers className="w-3.5 h-3.5" /> LAYERS:
          </span>
          <button
            onClick={() => setShowZones(!showZones)}
            className={`px-2 py-1 rounded text-[10px] transition ${showZones ? 'bg-primary/20 text-primary border border-primary/40' : 'text-muted-foreground'}`}
          >
            ZONES
          </button>
          <button
            onClick={() => setShowCameras(!showCameras)}
            className={`px-2 py-1 rounded text-[10px] transition ${showCameras ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40' : 'text-muted-foreground'}`}
          >
            CAMERAS ({cameras.length})
          </button>
          <button
            onClick={() => setShowPersonnel(!showPersonnel)}
            className={`px-2 py-1 rounded text-[10px] transition ${showPersonnel ? 'bg-green-500/20 text-green-400 border border-green-500/40' : 'text-muted-foreground'}`}
          >
            PATROL ({personnel.length})
          </button>
          <button
            onClick={() => setShowRF(!showRF)}
            className={`px-2 py-1 rounded text-[10px] transition ${showRF ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40' : 'text-muted-foreground'}`}
          >
            RF BEACONS
          </button>
          <button
            onClick={() => setShowIncidents(!showIncidents)}
            className={`px-2 py-1 rounded text-[10px] transition ${showIncidents ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'text-muted-foreground'}`}
          >
            INCIDENTS
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div className="glass-card overflow-hidden border border-border/60 rounded-xl relative">
        <div className="h-[600px] w-full relative z-0">
          <MapContainer
            center={[centerLat, centerLng]}
            zoom={14}
            scrollWheelZoom={true}
            className="w-full h-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Geofence Polygons */}
            {showZones && mockZones.map(zone => {
              const positions = zone.boundaries.map(b => [b.lat, b.lng] as [number, number]);
              const isRestricted = zone.type === 'RESTRICTED';
              const isHighSec = zone.type === 'HIGH_SECURITY';

              return (
                <Polygon
                  key={zone.id}
                  positions={positions}
                  pathOptions={{
                    color: isRestricted ? '#ef4444' : isHighSec ? '#f59e0b' : '#22c55e',
                    fillColor: isRestricted ? '#ef4444' : isHighSec ? '#f59e0b' : '#22c55e',
                    fillOpacity: 0.15,
                    weight: 2,
                    dashArray: isRestricted ? '5, 5' : undefined,
                  }}
                >
                  <Popup>
                    <div className="text-xs font-mono p-1">
                      <div className="font-bold text-foreground">{zone.name}</div>
                      <div className="text-muted-foreground">TYPE: {zone.type}</div>
                      <div className="text-muted-foreground">SECTOR: {zone.sector}</div>
                      <div className="text-primary mt-1">Personnel: {zone.activePersonnel} / {zone.maxPersonnel}</div>
                    </div>
                  </Popup>
                </Polygon>
              );
            })}

            {/* Cameras Markers */}
            {showCameras && cameras.map(cam => (
              <Marker
                key={cam.id}
                position={[cam.position.lat, cam.position.lng]}
                icon={cameraIcon}
              >
                <Popup>
                  <div className="text-xs font-mono p-1">
                    <div className="font-bold text-foreground">{cam.name}</div>
                    <div className="text-muted-foreground">{cam.location}</div>
                    <div className="text-green-400 mt-1">STATUS: {cam.status}</div>
                    <div className="text-muted-foreground">DETECTIONS: {cam.detectionCount}</div>
                  </div>
                </Popup>
              </Marker>
            ))}

            {/* Personnel Markers */}
            {showPersonnel && personnel.map(p => (
              <Marker
                key={p.id}
                position={[p.lastDetectedLocation.lat, p.lastDetectedLocation.lng]}
                icon={personnelIcon}
              >
                <Popup>
                  <div className="text-xs font-mono p-1">
                    <div className="font-bold text-foreground">{p.name}</div>
                    <div className="text-muted-foreground">RANK: {p.rank} ({p.serviceId})</div>
                    <div className="text-muted-foreground">SECTOR: {p.assignedSector}</div>
                    <div className="text-cyan-400 mt-1">RF BEACON: {p.rfDeviceId}</div>
                    <div className="text-green-400">STATUS: {p.status}</div>
                  </div>
                </Popup>
              </Marker>
            ))}

            {/* RF Devices Markers */}
            {showRF && rfDevices.map(d => (
              <Marker
                key={d.id}
                position={[d.position.lat, d.position.lng]}
                icon={rfIcon}
              >
                <Popup>
                  <div className="text-xs font-mono p-1">
                    <div className="font-bold text-cyan-400">{d.deviceId}</div>
                    <div className="text-foreground">{d.assignedPersonnelName || 'UNASSIGNED'}</div>
                    <div className="text-muted-foreground">FREQ: {d.frequency}</div>
                    <div className="text-muted-foreground">SIGNAL: {d.signalStrength}%</div>
                    <div className={d.authorizationStatus === 'AUTHORIZED' ? 'text-green-400' : 'text-red-400 font-bold'}>
                      {d.authorizationStatus}
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}

            {/* Active Incident Markers */}
            {showIncidents && alerts.filter(a => a.severity === 'CRITICAL' || a.severity === 'HIGH').map(a => (
              <Marker
                key={a.id}
                position={[26.8980, 70.8920]} // Restricted sector-03 hotspot
                icon={incidentIcon}
              >
                <Popup>
                  <div className="text-xs font-mono p-1">
                    <div className="font-bold text-red-400">INCIDENT: {a.id}</div>
                    <div className="text-foreground">{a.title}</div>
                    <div className="text-red-300 mt-1">THREAT SCORE: {a.threatScore}%</div>
                    <div className="text-muted-foreground">{a.location}</div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Legend in corner */}
        <div className="absolute bottom-4 right-4 z-[400] bg-navy-900/90 backdrop-blur-md p-3 rounded-lg border border-border/60 text-xs font-mono space-y-1.5 shadow-xl">
          <div className="text-[10px] font-bold text-muted-foreground uppercase border-b border-border/30 pb-1">
            MAP LEGEND
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
            <span>CCTV Camera</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
            <span>Authorized Patrol</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
            <span>RF Transponder</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
            <span>Critical Threat Alert</span>
          </div>
        </div>
      </div>
    </div>
  );
}
