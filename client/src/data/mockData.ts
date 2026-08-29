import type {
  Camera, Personnel, RFDevice, Zone, Alert, Incident, Detection,
  Sensor, IdentityCorrelation, AuditLog, DashboardStats, SystemHealth,
} from '../types';

// ---- CAMERAS ----
export const mockCameras: Camera[] = [
  { id: 'CAM-01', name: 'CAM-01', location: 'North Sector Gate', sector: 'North Sector', position: { lat: 26.9124, lng: 70.9010 }, status: 'ONLINE', resolution: '4K', aiEnabled: true, detectionCount: 14, lastActivity: new Date().toISOString() },
  { id: 'CAM-02', name: 'CAM-02', location: 'Checkpoint Alpha', sector: 'North Sector', position: { lat: 26.9180, lng: 70.9080 }, status: 'ONLINE', resolution: '1080p', aiEnabled: true, detectionCount: 8, lastActivity: new Date().toISOString() },
  { id: 'CAM-03', name: 'CAM-03', location: 'East Perimeter', sector: 'East Perimeter', position: { lat: 26.9050, lng: 70.9200 }, status: 'ONLINE', resolution: '4K', aiEnabled: true, detectionCount: 5, lastActivity: new Date().toISOString() },
  { id: 'CAM-04', name: 'CAM-04', location: 'Restricted Zone R-03', sector: 'Restricted Sector-03', position: { lat: 26.9000, lng: 70.8900 }, status: 'ONLINE', resolution: '1080p', aiEnabled: true, detectionCount: 2, lastActivity: new Date().toISOString() },
  { id: 'CAM-05', name: 'CAM-05', location: 'Checkpoint Bravo', sector: 'South Sector', position: { lat: 26.8950, lng: 70.9050 }, status: 'ONLINE', resolution: '4K', aiEnabled: true, detectionCount: 11, lastActivity: new Date().toISOString() },
  { id: 'CAM-06', name: 'CAM-06', location: 'West Perimeter Tower', sector: 'West Perimeter', position: { lat: 26.9100, lng: 70.8850 }, status: 'ONLINE', resolution: '1080p', aiEnabled: true, detectionCount: 3, lastActivity: new Date().toISOString() },
  { id: 'CAM-07', name: 'CAM-07', location: 'Restricted Sector Entry', sector: 'Restricted Sector-03', position: { lat: 26.8980, lng: 70.8920 }, status: 'DEGRADED', resolution: '720p', aiEnabled: true, detectionCount: 1, lastActivity: new Date().toISOString() },
  { id: 'CAM-08', name: 'CAM-08', location: 'Observation Point-07', sector: 'East Perimeter', position: { lat: 26.9070, lng: 70.9250 }, status: 'ONLINE', resolution: '4K', aiEnabled: true, detectionCount: 7, lastActivity: new Date().toISOString() },
  { id: 'CAM-09', name: 'CAM-09', location: 'Command Center Ext.', sector: 'North Sector', position: { lat: 26.9150, lng: 70.9030 }, status: 'ONLINE', resolution: '4K', aiEnabled: true, detectionCount: 4, lastActivity: new Date().toISOString() },
  { id: 'CAM-10', name: 'CAM-10', location: 'South Gate', sector: 'South Sector', position: { lat: 26.8920, lng: 70.9000 }, status: 'ONLINE', resolution: '1080p', aiEnabled: true, detectionCount: 6, lastActivity: new Date().toISOString() },
  { id: 'CAM-11', name: 'CAM-11', location: 'Patrol Route NE', sector: 'North Sector', position: { lat: 26.9200, lng: 70.9150 }, status: 'ONLINE', resolution: '1080p', aiEnabled: true, detectionCount: 9, lastActivity: new Date().toISOString() },
  { id: 'CAM-12', name: 'CAM-12', location: 'Logistics Bay', sector: 'South Sector', position: { lat: 26.8900, lng: 70.9100 }, status: 'ONLINE', resolution: '720p', aiEnabled: false, detectionCount: 0, lastActivity: new Date().toISOString() },
  { id: 'CAM-13', name: 'CAM-13', location: 'Helipad Approach', sector: 'West Perimeter', position: { lat: 26.9080, lng: 70.8800 }, status: 'ONLINE', resolution: '4K', aiEnabled: true, detectionCount: 2, lastActivity: new Date().toISOString() },
  { id: 'CAM-14', name: 'CAM-14', location: 'Fuel Depot', sector: 'Restricted Sector-03', position: { lat: 26.8960, lng: 70.8880 }, status: 'ONLINE', resolution: '1080p', aiEnabled: true, detectionCount: 1, lastActivity: new Date().toISOString() },
  { id: 'CAM-15', name: 'CAM-15', location: 'East Tower', sector: 'East Perimeter', position: { lat: 26.9030, lng: 70.9300 }, status: 'ONLINE', resolution: '4K', aiEnabled: true, detectionCount: 4, lastActivity: new Date().toISOString() },
  { id: 'CAM-16', name: 'CAM-16', location: 'Perimeter Fence N2', sector: 'North Sector', position: { lat: 26.9220, lng: 70.9060 }, status: 'ONLINE', resolution: '1080p', aiEnabled: true, detectionCount: 3, lastActivity: new Date().toISOString() },
  { id: 'CAM-17', name: 'CAM-17', location: 'Barracks Exterior', sector: 'South Sector', position: { lat: 26.8940, lng: 70.9080 }, status: 'ONLINE', resolution: '720p', aiEnabled: false, detectionCount: 0, lastActivity: new Date().toISOString() },
  { id: 'CAM-18', name: 'CAM-18', location: 'Munitions Storage', sector: 'Restricted Sector-03', position: { lat: 26.8970, lng: 70.8950 }, status: 'ONLINE', resolution: '4K', aiEnabled: true, detectionCount: 0, lastActivity: new Date().toISOString() },
  { id: 'CAM-19', name: 'CAM-19', location: 'Training Area', sector: 'West Perimeter', position: { lat: 26.9060, lng: 70.8830 }, status: 'ONLINE', resolution: '1080p', aiEnabled: true, detectionCount: 12, lastActivity: new Date().toISOString() },
  { id: 'CAM-20', name: 'CAM-20', location: 'Vehicle Entry', sector: 'North Sector', position: { lat: 26.9140, lng: 70.9070 }, status: 'ONLINE', resolution: '4K', aiEnabled: true, detectionCount: 5, lastActivity: new Date().toISOString() },
  { id: 'CAM-21', name: 'CAM-21', location: 'South Perimeter', sector: 'South Sector', position: { lat: 26.8880, lng: 70.9040 }, status: 'ONLINE', resolution: '1080p', aiEnabled: true, detectionCount: 3, lastActivity: new Date().toISOString() },
  { id: 'CAM-22', name: 'CAM-22', location: 'Comm Tower Base', sector: 'East Perimeter', position: { lat: 26.9090, lng: 70.9220 }, status: 'ONLINE', resolution: '4K', aiEnabled: true, detectionCount: 1, lastActivity: new Date().toISOString() },
  { id: 'CAM-23', name: 'CAM-23', location: 'Water Treatment', sector: 'West Perimeter', position: { lat: 26.9040, lng: 70.8870 }, status: 'ONLINE', resolution: '720p', aiEnabled: true, detectionCount: 0, lastActivity: new Date().toISOString() },
  { id: 'CAM-24', name: 'CAM-24', location: 'Emergency Exit E', sector: 'East Perimeter', position: { lat: 26.9010, lng: 70.9280 }, status: 'ONLINE', resolution: '1080p', aiEnabled: true, detectionCount: 2, lastActivity: new Date().toISOString() },
  { id: 'CAM-25', name: 'CAM-25', location: 'Patrol Route SW', sector: 'South Sector', position: { lat: 26.8910, lng: 70.8960 }, status: 'DEGRADED', resolution: '1080p', aiEnabled: true, detectionCount: 1, lastActivity: new Date().toISOString() },
  { id: 'CAM-26', name: 'CAM-26', location: 'Border Marker B-12', sector: 'North Sector', position: { lat: 26.9250, lng: 70.9100 }, status: 'ONLINE', resolution: '4K', aiEnabled: true, detectionCount: 6, lastActivity: new Date().toISOString() },
];

// ---- PERSONNEL ----
export const mockPersonnel: Personnel[] = [
  { id: 'P-001', serviceId: 'IND-0421', name: 'Capt. Rajesh Kumar', rank: 'Captain', role: 'Patrol Commander', assignedSector: 'North Sector', assignedZoneId: 'Z-01', rfDeviceId: 'RF-0012', authorizationStatus: 'AUTHORIZED', status: 'ON_PATROL', lastDetectedLocation: { lat: 26.9130, lng: 70.9015 }, lastDetectedTime: new Date().toISOString() },
  { id: 'P-002', serviceId: 'IND-0538', name: 'Lt. Vikram Singh', rank: 'Lieutenant', role: 'Patrol Officer', assignedSector: 'East Perimeter', assignedZoneId: 'Z-02', rfDeviceId: 'RF-0047', authorizationStatus: 'AUTHORIZED', status: 'ON_PATROL', lastDetectedLocation: { lat: 26.9055, lng: 70.9210 }, lastDetectedTime: new Date().toISOString() },
  { id: 'P-003', serviceId: 'IND-0712', name: 'Maj. Priya Sharma', rank: 'Major', role: 'Security Analyst', assignedSector: 'Command Center', assignedZoneId: 'Z-01', rfDeviceId: 'RF-0091', authorizationStatus: 'AUTHORIZED', status: 'AT_POST', lastDetectedLocation: { lat: 26.9150, lng: 70.9030 }, lastDetectedTime: new Date().toISOString() },
  { id: 'P-004', serviceId: 'IND-0844', name: 'Sgt. Arjun Patel', rank: 'Sergeant', role: 'Gate Sentry', assignedSector: 'North Sector', assignedZoneId: 'Z-01', rfDeviceId: 'RF-0128', authorizationStatus: 'AUTHORIZED', status: 'AT_POST', lastDetectedLocation: { lat: 26.9180, lng: 70.9080 }, lastDetectedTime: new Date().toISOString() },
  { id: 'P-005', serviceId: 'IND-0956', name: 'Cpl. Anil Verma', rank: 'Corporal', role: 'Patrol Officer', assignedSector: 'South Sector', assignedZoneId: 'Z-03', rfDeviceId: 'RF-0034', authorizationStatus: 'AUTHORIZED', status: 'ON_PATROL', lastDetectedLocation: { lat: 26.8955, lng: 70.9055 }, lastDetectedTime: new Date().toISOString() },
  { id: 'P-006', serviceId: 'IND-1023', name: 'Lt. Meera Nair', rank: 'Lieutenant', role: 'Intelligence Officer', assignedSector: 'Command Center', assignedZoneId: 'Z-01', rfDeviceId: 'RF-0056', authorizationStatus: 'AUTHORIZED', status: 'AT_POST', lastDetectedLocation: { lat: 26.9148, lng: 70.9035 }, lastDetectedTime: new Date().toISOString() },
  { id: 'P-007', serviceId: 'IND-1105', name: 'Sgt. Deepak Rao', rank: 'Sergeant', role: 'Patrol Officer', assignedSector: 'West Perimeter', assignedZoneId: 'Z-04', rfDeviceId: 'RF-0078', authorizationStatus: 'AUTHORIZED', status: 'ON_PATROL', lastDetectedLocation: { lat: 26.9100, lng: 70.8855 }, lastDetectedTime: new Date().toISOString() },
  { id: 'P-008', serviceId: 'IND-1247', name: 'Cpl. Suresh Reddy', rank: 'Corporal', role: 'Sensor Technician', assignedSector: 'East Perimeter', assignedZoneId: 'Z-02', rfDeviceId: 'RF-0099', authorizationStatus: 'AUTHORIZED', status: 'IN_TRANSIT', lastDetectedLocation: { lat: 26.9065, lng: 70.9190 }, lastDetectedTime: new Date().toISOString() },
  { id: 'P-009', serviceId: 'IND-1389', name: 'Pvt. Ravi Chauhan', rank: 'Private', role: 'Sentry', assignedSector: 'South Sector', assignedZoneId: 'Z-03', rfDeviceId: 'RF-0112', authorizationStatus: 'AUTHORIZED', status: 'AT_POST', lastDetectedLocation: { lat: 26.8950, lng: 70.9050 }, lastDetectedTime: new Date().toISOString() },
  { id: 'P-010', serviceId: 'IND-1456', name: 'Lt. Karan Malhotra', rank: 'Lieutenant', role: 'Patrol Commander', assignedSector: 'North Sector', assignedZoneId: 'Z-01', rfDeviceId: 'RF-0145', authorizationStatus: 'AUTHORIZED', status: 'ON_PATROL', lastDetectedLocation: { lat: 26.9200, lng: 70.9100 }, lastDetectedTime: new Date().toISOString() },
  { id: 'P-011', serviceId: 'IND-1578', name: 'Sgt. Ajay Gupta', rank: 'Sergeant', role: 'Patrol Officer', assignedSector: 'East Perimeter', assignedZoneId: 'Z-02', rfDeviceId: 'RF-0167', authorizationStatus: 'AUTHORIZED', status: 'ON_PATROL', lastDetectedLocation: { lat: 26.9040, lng: 70.9260 }, lastDetectedTime: new Date().toISOString() },
  { id: 'P-012', serviceId: 'IND-1634', name: 'Cpl. Nitin Joshi', rank: 'Corporal', role: 'Guard', assignedSector: 'Restricted Sector-03', assignedZoneId: 'Z-05', rfDeviceId: 'RF-0189', authorizationStatus: 'AUTHORIZED', status: 'AT_POST', lastDetectedLocation: { lat: 26.8985, lng: 70.8925 }, lastDetectedTime: new Date().toISOString() },
  { id: 'P-013', serviceId: 'IND-1790', name: 'Pvt. Mohan Das', rank: 'Private', role: 'Sentry', assignedSector: 'West Perimeter', assignedZoneId: 'Z-04', rfDeviceId: 'RF-0201', authorizationStatus: 'AUTHORIZED', status: 'AT_POST', lastDetectedLocation: { lat: 26.9060, lng: 70.8830 }, lastDetectedTime: new Date().toISOString() },
  { id: 'P-014', serviceId: 'IND-1856', name: 'Lt. Anand Tiwari', rank: 'Lieutenant', role: 'Patrol Officer', assignedSector: 'South Sector', assignedZoneId: 'Z-03', rfDeviceId: 'RF-0223', authorizationStatus: 'AUTHORIZED', status: 'OFF_DUTY', lastDetectedLocation: { lat: 26.8940, lng: 70.9080 }, lastDetectedTime: new Date().toISOString() },
  { id: 'P-015', serviceId: 'IND-1923', name: 'Sgt. Vishal Kapoor', rank: 'Sergeant', role: 'Patrol Officer', assignedSector: 'North Sector', assignedZoneId: 'Z-01', rfDeviceId: 'RF-0245', authorizationStatus: 'AUTHORIZED', status: 'ON_PATROL', lastDetectedLocation: { lat: 26.9170, lng: 70.9090 }, lastDetectedTime: new Date().toISOString() },
  { id: 'P-016', serviceId: 'IND-2045', name: 'Cpl. Rohit Saxena', rank: 'Corporal', role: 'Guard', assignedSector: 'East Perimeter', assignedZoneId: 'Z-02', rfDeviceId: 'RF-0267', authorizationStatus: 'AUTHORIZED', status: 'AT_POST', lastDetectedLocation: { lat: 26.9090, lng: 70.9220 }, lastDetectedTime: new Date().toISOString() },
];

// ---- RF DEVICES ----
export const mockRFDevices: RFDevice[] = [
  { id: 'RF-0012', deviceId: 'RF-0012', assignedPersonnelId: 'P-001', assignedPersonnelName: 'Capt. Rajesh Kumar', frequency: '462.5625 MHz', signalStrength: 92, status: 'ONLINE', authorizationStatus: 'AUTHORIZED', lastSeen: new Date().toISOString(), position: { lat: 26.9130, lng: 70.9015 }, sector: 'North Sector' },
  { id: 'RF-0047', deviceId: 'RF-0047', assignedPersonnelId: 'P-002', assignedPersonnelName: 'Lt. Vikram Singh', frequency: '462.5875 MHz', signalStrength: 88, status: 'ONLINE', authorizationStatus: 'AUTHORIZED', lastSeen: new Date().toISOString(), position: { lat: 26.9055, lng: 70.9210 }, sector: 'East Perimeter' },
  { id: 'RF-0091', deviceId: 'RF-0091', assignedPersonnelId: 'P-003', assignedPersonnelName: 'Maj. Priya Sharma', frequency: '462.6125 MHz', signalStrength: 98, status: 'ONLINE', authorizationStatus: 'AUTHORIZED', lastSeen: new Date().toISOString(), position: { lat: 26.9150, lng: 70.9030 }, sector: 'Command Center' },
  { id: 'RF-0128', deviceId: 'RF-0128', assignedPersonnelId: 'P-004', assignedPersonnelName: 'Sgt. Arjun Patel', frequency: '462.6375 MHz', signalStrength: 95, status: 'ONLINE', authorizationStatus: 'AUTHORIZED', lastSeen: new Date().toISOString(), position: { lat: 26.9180, lng: 70.9080 }, sector: 'North Sector' },
  { id: 'RF-0034', deviceId: 'RF-0034', assignedPersonnelId: 'P-005', assignedPersonnelName: 'Cpl. Anil Verma', frequency: '462.6625 MHz', signalStrength: 85, status: 'ONLINE', authorizationStatus: 'AUTHORIZED', lastSeen: new Date().toISOString(), position: { lat: 26.8955, lng: 70.9055 }, sector: 'South Sector' },
  { id: 'RF-0056', deviceId: 'RF-0056', assignedPersonnelId: 'P-006', assignedPersonnelName: 'Lt. Meera Nair', frequency: '462.6875 MHz', signalStrength: 97, status: 'ONLINE', authorizationStatus: 'AUTHORIZED', lastSeen: new Date().toISOString(), position: { lat: 26.9148, lng: 70.9035 }, sector: 'Command Center' },
  { id: 'RF-0078', deviceId: 'RF-0078', assignedPersonnelId: 'P-007', assignedPersonnelName: 'Sgt. Deepak Rao', frequency: '462.7125 MHz', signalStrength: 78, status: 'ONLINE', authorizationStatus: 'AUTHORIZED', lastSeen: new Date().toISOString(), position: { lat: 26.9100, lng: 70.8855 }, sector: 'West Perimeter' },
  { id: 'RF-0099', deviceId: 'RF-0099', assignedPersonnelId: 'P-008', assignedPersonnelName: 'Cpl. Suresh Reddy', frequency: '462.7375 MHz', signalStrength: 72, status: 'WEAK_SIGNAL', authorizationStatus: 'AUTHORIZED', lastSeen: new Date().toISOString(), position: { lat: 26.9065, lng: 70.9190 }, sector: 'East Perimeter' },
  { id: 'RF-0112', deviceId: 'RF-0112', assignedPersonnelId: 'P-009', assignedPersonnelName: 'Pvt. Ravi Chauhan', frequency: '462.7625 MHz', signalStrength: 91, status: 'ONLINE', authorizationStatus: 'AUTHORIZED', lastSeen: new Date().toISOString(), position: { lat: 26.8950, lng: 70.9050 }, sector: 'South Sector' },
  { id: 'RF-0145', deviceId: 'RF-0145', assignedPersonnelId: 'P-010', assignedPersonnelName: 'Lt. Karan Malhotra', frequency: '462.7875 MHz', signalStrength: 89, status: 'ONLINE', authorizationStatus: 'AUTHORIZED', lastSeen: new Date().toISOString(), position: { lat: 26.9200, lng: 70.9100 }, sector: 'North Sector' },
  { id: 'RF-0167', deviceId: 'RF-0167', assignedPersonnelId: 'P-011', assignedPersonnelName: 'Sgt. Ajay Gupta', frequency: '462.8125 MHz', signalStrength: 83, status: 'ONLINE', authorizationStatus: 'AUTHORIZED', lastSeen: new Date().toISOString(), position: { lat: 26.9040, lng: 70.9260 }, sector: 'East Perimeter' },
  { id: 'RF-0189', deviceId: 'RF-0189', assignedPersonnelId: 'P-012', assignedPersonnelName: 'Cpl. Nitin Joshi', frequency: '462.8375 MHz', signalStrength: 94, status: 'ONLINE', authorizationStatus: 'AUTHORIZED', lastSeen: new Date().toISOString(), position: { lat: 26.8985, lng: 70.8925 }, sector: 'Restricted Sector-03' },
  { id: 'RF-0201', deviceId: 'RF-0201', assignedPersonnelId: 'P-013', assignedPersonnelName: 'Pvt. Mohan Das', frequency: '462.8625 MHz', signalStrength: 76, status: 'ONLINE', authorizationStatus: 'AUTHORIZED', lastSeen: new Date().toISOString(), position: { lat: 26.9060, lng: 70.8830 }, sector: 'West Perimeter' },
  { id: 'RF-0223', deviceId: 'RF-0223', assignedPersonnelId: 'P-014', assignedPersonnelName: 'Lt. Anand Tiwari', frequency: '462.8875 MHz', signalStrength: 0, status: 'OFFLINE', authorizationStatus: 'AUTHORIZED', lastSeen: new Date(Date.now() - 3600000).toISOString(), position: { lat: 26.8940, lng: 70.9080 }, sector: 'South Sector' },
  { id: 'RF-0245', deviceId: 'RF-0245', assignedPersonnelId: 'P-015', assignedPersonnelName: 'Sgt. Vishal Kapoor', frequency: '462.9125 MHz', signalStrength: 87, status: 'ONLINE', authorizationStatus: 'AUTHORIZED', lastSeen: new Date().toISOString(), position: { lat: 26.9170, lng: 70.9090 }, sector: 'North Sector' },
  { id: 'RF-0267', deviceId: 'RF-0267', assignedPersonnelId: 'P-016', assignedPersonnelName: 'Cpl. Rohit Saxena', frequency: '462.9375 MHz', signalStrength: 93, status: 'ONLINE', authorizationStatus: 'AUTHORIZED', lastSeen: new Date().toISOString(), position: { lat: 26.9090, lng: 70.9220 }, sector: 'East Perimeter' },
  { id: 'RF-0290', deviceId: 'RF-0290', frequency: '462.9625 MHz', signalStrength: 0, status: 'OFFLINE', authorizationStatus: 'AUTHORIZED', lastSeen: new Date(Date.now() - 7200000).toISOString(), position: { lat: 26.9100, lng: 70.9000 }, sector: 'North Sector' },
  { id: 'RF-0312', deviceId: 'RF-0312', frequency: '463.0125 MHz', signalStrength: 45, status: 'WEAK_SIGNAL', authorizationStatus: 'AUTHORIZED', lastSeen: new Date().toISOString(), position: { lat: 26.8970, lng: 70.8950 }, sector: 'Restricted Sector-03' },
  { id: 'RF-0014', deviceId: 'RF-0014', frequency: '458.2250 MHz', signalStrength: 67, status: 'ONLINE', authorizationStatus: 'UNAUTHORIZED', lastSeen: new Date().toISOString(), position: { lat: 26.8990, lng: 70.8910 }, sector: 'Restricted Sector-03' },
  { id: 'RF-UNK-01', deviceId: 'RF-UNK-01', frequency: '455.1000 MHz', signalStrength: 34, status: 'ONLINE', authorizationStatus: 'UNAUTHORIZED', lastSeen: new Date().toISOString(), position: { lat: 26.9010, lng: 70.8905 }, sector: 'Restricted Sector-03' },
  { id: 'RF-0334', deviceId: 'RF-0334', frequency: '462.5000 MHz', signalStrength: 90, status: 'ONLINE', authorizationStatus: 'AUTHORIZED', lastSeen: new Date().toISOString(), position: { lat: 26.9110, lng: 70.9040 }, sector: 'North Sector' },
  { id: 'RF-0356', deviceId: 'RF-0356', frequency: '462.5250 MHz', signalStrength: 86, status: 'ONLINE', authorizationStatus: 'AUTHORIZED', lastSeen: new Date().toISOString(), position: { lat: 26.8930, lng: 70.9020 }, sector: 'South Sector' },
  { id: 'RF-0378', deviceId: 'RF-0378', frequency: '462.5500 MHz', signalStrength: 91, status: 'ONLINE', authorizationStatus: 'AUTHORIZED', lastSeen: new Date().toISOString(), position: { lat: 26.9020, lng: 70.9240 }, sector: 'East Perimeter' },
];

// ---- ZONES ----
export const mockZones: Zone[] = [
  { id: 'Z-01', name: 'North Sector', type: 'AUTHORIZED', sector: 'North Sector', boundaries: [{ lat: 26.9100, lng: 70.8950 }, { lat: 26.9100, lng: 70.9200 }, { lat: 26.9260, lng: 70.9200 }, { lat: 26.9260, lng: 70.8950 }], color: '#22c55e33', activePersonnel: 5, maxPersonnel: 8 },
  { id: 'Z-02', name: 'East Perimeter', type: 'AUTHORIZED', sector: 'East Perimeter', boundaries: [{ lat: 26.9000, lng: 70.9150 }, { lat: 26.9000, lng: 70.9350 }, { lat: 26.9100, lng: 70.9350 }, { lat: 26.9100, lng: 70.9150 }], color: '#22c55e33', activePersonnel: 4, maxPersonnel: 6 },
  { id: 'Z-03', name: 'South Sector', type: 'AUTHORIZED', sector: 'South Sector', boundaries: [{ lat: 26.8860, lng: 70.8950 }, { lat: 26.8860, lng: 70.9150 }, { lat: 26.8960, lng: 70.9150 }, { lat: 26.8960, lng: 70.8950 }], color: '#22c55e33', activePersonnel: 3, maxPersonnel: 6 },
  { id: 'Z-04', name: 'West Perimeter', type: 'AUTHORIZED', sector: 'West Perimeter', boundaries: [{ lat: 26.9020, lng: 70.8780 }, { lat: 26.9020, lng: 70.8900 }, { lat: 26.9120, lng: 70.8900 }, { lat: 26.9120, lng: 70.8780 }], color: '#22c55e33', activePersonnel: 2, maxPersonnel: 4 },
  { id: 'Z-05', name: 'Restricted Sector-03', type: 'RESTRICTED', sector: 'Restricted Sector-03', boundaries: [{ lat: 26.8940, lng: 70.8870 }, { lat: 26.8940, lng: 70.8970 }, { lat: 26.9010, lng: 70.8970 }, { lat: 26.9010, lng: 70.8870 }], color: '#ef444433', activePersonnel: 1, maxPersonnel: 2 },
  { id: 'Z-06', name: 'High Security Zone', type: 'HIGH_SECURITY', sector: 'Command Center', boundaries: [{ lat: 26.9130, lng: 70.9010 }, { lat: 26.9130, lng: 70.9060 }, { lat: 26.9170, lng: 70.9060 }, { lat: 26.9170, lng: 70.9010 }], color: '#f59e0b33', activePersonnel: 2, maxPersonnel: 4 },
];

// ---- DETECTIONS ----
export const mockDetections: Detection[] = [
  { id: 'D-001', trackId: 'P-1042', cameraId: 'CAM-01', timestamp: new Date().toISOString(), confidence: 96.4, visualStatus: 'MATCHED', rfStatus: 'MATCHED', location: 'North Perimeter', zone: 'North Sector', zoneType: 'AUTHORIZED', threatScore: 8, threatLevel: 'LOW', boundingBox: { x: 120, y: 80, width: 60, height: 140 }, personnelId: 'P-001', rfDeviceId: 'RF-0012' },
  { id: 'D-002', trackId: 'P-1043', cameraId: 'CAM-02', timestamp: new Date().toISOString(), confidence: 94.8, visualStatus: 'MATCHED', rfStatus: 'MATCHED', location: 'Checkpoint Alpha', zone: 'North Sector', zoneType: 'AUTHORIZED', threatScore: 5, threatLevel: 'LOW', boundingBox: { x: 200, y: 60, width: 55, height: 130 }, personnelId: 'P-004', rfDeviceId: 'RF-0128' },
  { id: 'D-003', trackId: 'P-1098', cameraId: 'CAM-07', timestamp: new Date().toISOString(), confidence: 94.1, visualStatus: 'UNKNOWN', rfStatus: 'NOT_FOUND', location: 'Restricted Sector-03', zone: 'Restricted Sector-03', zoneType: 'RESTRICTED', threatScore: 87, threatLevel: 'CRITICAL', boundingBox: { x: 180, y: 100, width: 50, height: 120 } },
  { id: 'D-004', trackId: 'P-1044', cameraId: 'CAM-03', timestamp: new Date().toISOString(), confidence: 91.2, visualStatus: 'MATCHED', rfStatus: 'MATCHED', location: 'East Perimeter', zone: 'East Perimeter', zoneType: 'AUTHORIZED', threatScore: 12, threatLevel: 'LOW', boundingBox: { x: 280, y: 90, width: 58, height: 135 }, personnelId: 'P-002', rfDeviceId: 'RF-0047' },
  { id: 'D-005', trackId: 'P-1050', cameraId: 'CAM-04', timestamp: new Date().toISOString(), confidence: 88.7, visualStatus: 'UNVERIFIED', rfStatus: 'WEAK', location: 'Restricted Zone R-03', zone: 'Restricted Sector-03', zoneType: 'RESTRICTED', threatScore: 62, threatLevel: 'HIGH', boundingBox: { x: 150, y: 110, width: 52, height: 125 } },
];

// ---- ALERTS ----
export const mockAlerts: Alert[] = [
  { id: 'ALR-001', severity: 'CRITICAL', title: 'Unauthorized Person Detected', description: 'Unknown individual detected in Restricted Sector-03 without authorized RF signal. No visual match found in personnel database.', timestamp: new Date(Date.now() - 120000).toISOString(), location: 'Restricted Sector-03', sector: 'Restricted Sector-03', status: 'ACTIVE', trackId: 'P-1098', cameraId: 'CAM-07', threatScore: 87, evidence: [{ id: 'E-001', type: 'SNAPSHOT', description: 'Detection snapshot from CAM-07', timestamp: new Date().toISOString() }] },
  { id: 'ALR-002', severity: 'HIGH', title: 'Unverified Personnel in Restricted Zone', description: 'Person detected with weak RF signal in restricted area. Visual identity could not be confirmed due to camera angle.', timestamp: new Date(Date.now() - 300000).toISOString(), location: 'Restricted Zone R-03', sector: 'Restricted Sector-03', status: 'ACTIVE', trackId: 'P-1050', cameraId: 'CAM-04', rfDeviceId: 'RF-0312', threatScore: 62, evidence: [] },
  { id: 'ALR-003', severity: 'MEDIUM', title: 'RF Signal Anomaly', description: 'Unauthorized RF signal detected on non-standard frequency in Restricted Sector-03.', timestamp: new Date(Date.now() - 600000).toISOString(), location: 'Restricted Sector-03', sector: 'Restricted Sector-03', status: 'ACKNOWLEDGED', rfDeviceId: 'RF-0014', threatScore: 45, acknowledgedAt: new Date(Date.now() - 500000).toISOString(), assignedOfficer: 'Maj. Priya Sharma', evidence: [] },
  { id: 'ALR-004', severity: 'LOW', title: 'Camera Degradation', description: 'CAM-25 reporting degraded video quality. AI detection confidence reduced.', timestamp: new Date(Date.now() - 900000).toISOString(), location: 'Patrol Route SW', sector: 'South Sector', status: 'ACKNOWLEDGED', cameraId: 'CAM-25', threatScore: 15, acknowledgedAt: new Date(Date.now() - 800000).toISOString(), assignedOfficer: 'Cpl. Suresh Reddy', evidence: [] },
  { id: 'ALR-005', severity: 'INFORMATIONAL', title: 'Patrol Route Completed', description: 'Capt. Rajesh Kumar completed scheduled patrol of North Sector. All checkpoints verified.', timestamp: new Date(Date.now() - 1800000).toISOString(), location: 'North Sector', sector: 'North Sector', status: 'RESOLVED', trackId: 'P-1042', threatScore: 0, resolvedAt: new Date(Date.now() - 1700000).toISOString(), evidence: [] },
];

// ---- INCIDENTS ----
export const mockIncidents: Incident[] = [
  {
    id: 'INC-001', title: 'Unauthorized Intrusion - Restricted Sector-03', description: 'Unknown individual detected entering Restricted Sector-03 without authorization. No matching RF signal. Visual identity unknown.', timestamp: new Date(Date.now() - 120000).toISOString(), location: 'Restricted Sector-03', sector: 'Restricted Sector-03', threatLevel: 'CRITICAL', status: 'UNDER_REVIEW', cameraId: 'CAM-07', trackId: 'P-1098', assignedOfficer: 'Capt. Rajesh Kumar',
    evidence: [
      { id: 'E-001', type: 'SNAPSHOT', description: 'Detection frame from CAM-07', timestamp: new Date().toISOString() },
      { id: 'E-002', type: 'RF_LOG', description: 'RF scan log showing no authorized signals in vicinity', timestamp: new Date().toISOString() },
    ],
    timeline: [
      { timestamp: new Date(Date.now() - 120000).toISOString(), action: 'DETECTED', details: 'AI engine detected unknown person in Restricted Sector-03' },
      { timestamp: new Date(Date.now() - 118000).toISOString(), action: 'RF_SCAN', details: 'RF correlation failed — no authorized signal found' },
      { timestamp: new Date(Date.now() - 117000).toISOString(), action: 'THREAT_ASSESSED', actor: 'AI Engine', details: 'Threat score calculated: 87 (CRITICAL)' },
      { timestamp: new Date(Date.now() - 115000).toISOString(), action: 'ALERT_CREATED', details: 'Critical alert ALR-001 generated' },
      { timestamp: new Date(Date.now() - 60000).toISOString(), action: 'ASSIGNED', actor: 'System', details: 'Assigned to Capt. Rajesh Kumar' },
    ],
    relatedAlertIds: ['ALR-001'],
  },
  {
    id: 'INC-002', title: 'RF Signal Anomaly Investigation', description: 'Unauthorized RF signal detected on non-standard frequency. Investigation underway.', timestamp: new Date(Date.now() - 600000).toISOString(), location: 'Restricted Sector-03', sector: 'Restricted Sector-03', threatLevel: 'MEDIUM', status: 'ACKNOWLEDGED', cameraId: 'CAM-04', trackId: 'P-1050', rfDeviceId: 'RF-0014', assignedOfficer: 'Maj. Priya Sharma',
    evidence: [{ id: 'E-003', type: 'RF_LOG', description: 'Unauthorized RF signal log', timestamp: new Date().toISOString() }],
    timeline: [
      { timestamp: new Date(Date.now() - 600000).toISOString(), action: 'DETECTED', details: 'Unauthorized RF signal detected on 458.2250 MHz' },
      { timestamp: new Date(Date.now() - 580000).toISOString(), action: 'ALERT_CREATED', details: 'Medium alert ALR-003 generated' },
      { timestamp: new Date(Date.now() - 500000).toISOString(), action: 'ACKNOWLEDGED', actor: 'Maj. Priya Sharma', details: 'Alert acknowledged and investigation initiated' },
    ],
    relatedAlertIds: ['ALR-003'],
  },
];

// ---- SENSORS ----
export const mockSensors: Sensor[] = [
  { id: 'S-01', name: 'Motion Sensor N1', type: 'MOTION', location: 'North Gate', sector: 'North Sector', position: { lat: 26.9120, lng: 70.9000 }, status: 'ONLINE', lastHeartbeat: new Date().toISOString(), healthPercentage: 98 },
  { id: 'S-02', name: 'Thermal Sensor E1', type: 'THERMAL', location: 'East Tower', sector: 'East Perimeter', position: { lat: 26.9050, lng: 70.9200 }, status: 'ONLINE', lastHeartbeat: new Date().toISOString(), healthPercentage: 95 },
  { id: 'S-03', name: 'Acoustic Sensor S1', type: 'ACOUSTIC', location: 'South Gate', sector: 'South Sector', position: { lat: 26.8920, lng: 70.9000 }, status: 'ONLINE', lastHeartbeat: new Date().toISOString(), healthPercentage: 92 },
  { id: 'S-04', name: 'RF Receiver R1', type: 'RF_RECEIVER', location: 'Command Center', sector: 'North Sector', position: { lat: 26.9150, lng: 70.9030 }, status: 'ONLINE', lastHeartbeat: new Date().toISOString(), healthPercentage: 99 },
  { id: 'S-05', name: 'Motion Sensor W1', type: 'MOTION', location: 'West Approach', sector: 'West Perimeter', position: { lat: 26.9080, lng: 70.8850 }, status: 'DEGRADED', lastHeartbeat: new Date(Date.now() - 30000).toISOString(), healthPercentage: 71 },
  { id: 'S-06', name: 'Thermal Sensor R1', type: 'THERMAL', location: 'Restricted Zone', sector: 'Restricted Sector-03', position: { lat: 26.8980, lng: 70.8920 }, status: 'ONLINE', lastHeartbeat: new Date().toISOString(), healthPercentage: 97 },
];

// ---- IDENTITY CORRELATIONS ----
export const mockCorrelations: IdentityCorrelation[] = [
  { trackId: 'P-1042', visualMatch: { status: 'MATCHED', confidence: 97 }, rfMatch: { status: 'MATCHED', deviceId: 'RF-0012', confidence: 99 }, authorizedZone: true, expectedSchedule: true, locationValid: true, identityConfidence: 98, overallStatus: 'AUTHORIZED', personnelId: 'P-001', personnelName: 'Capt. Rajesh Kumar' },
  { trackId: 'P-1043', visualMatch: { status: 'MATCHED', confidence: 94 }, rfMatch: { status: 'MATCHED', deviceId: 'RF-0128', confidence: 96 }, authorizedZone: true, expectedSchedule: true, locationValid: true, identityConfidence: 95, overallStatus: 'AUTHORIZED', personnelId: 'P-004', personnelName: 'Sgt. Arjun Patel' },
  { trackId: 'P-1098', visualMatch: { status: 'UNKNOWN', confidence: 12 }, rfMatch: { status: 'NOT_FOUND', confidence: 0 }, authorizedZone: false, expectedSchedule: false, locationValid: false, identityConfidence: 8, overallStatus: 'HOSTILE' },
  { trackId: 'P-1044', visualMatch: { status: 'MATCHED', confidence: 91 }, rfMatch: { status: 'MATCHED', deviceId: 'RF-0047', confidence: 95 }, authorizedZone: true, expectedSchedule: true, locationValid: true, identityConfidence: 93, overallStatus: 'AUTHORIZED', personnelId: 'P-002', personnelName: 'Lt. Vikram Singh' },
  { trackId: 'P-1050', visualMatch: { status: 'UNVERIFIED', confidence: 38 }, rfMatch: { status: 'WEAK', deviceId: 'RF-0312', confidence: 42 }, authorizedZone: false, expectedSchedule: false, locationValid: false, identityConfidence: 18, overallStatus: 'SUSPICIOUS' },
];

// ---- AUDIT LOGS ----
export const mockAuditLogs: AuditLog[] = [
  { id: 'AL-001', timestamp: new Date(Date.now() - 120000).toISOString(), action: 'CRITICAL_ALERT_CREATED', details: 'Critical alert ALR-001 generated for unauthorized intrusion in Restricted Sector-03', category: 'ALERT', severity: 'CRITICAL' },
  { id: 'AL-002', timestamp: new Date(Date.now() - 118000).toISOString(), action: 'THREAT_SCORE_CALCULATED', details: 'Threat score 87 (CRITICAL) calculated for track P-1098', category: 'DETECTION', severity: 'WARNING' },
  { id: 'AL-003', timestamp: new Date(Date.now() - 117000).toISOString(), action: 'RF_CORRELATION_FAILED', details: 'RF correlation failed for detection in Restricted Sector-03 — no authorized signal detected', category: 'RF', severity: 'WARNING' },
  { id: 'AL-004', timestamp: new Date(Date.now() - 116000).toISOString(), action: 'UNKNOWN_PERSON_DETECTED', details: 'CAM-07 detected unknown person (Track: P-1098, Confidence: 94.1%)', category: 'DETECTION', severity: 'WARNING' },
  { id: 'AL-005', timestamp: new Date(Date.now() - 300000).toISOString(), userId: 'U-003', userName: 'Maj. Priya Sharma', action: 'ALERT_ACKNOWLEDGED', details: 'Alert ALR-003 acknowledged by Maj. Priya Sharma', category: 'ALERT', severity: 'INFO' },
  { id: 'AL-006', timestamp: new Date(Date.now() - 600000).toISOString(), action: 'RF_ANOMALY_DETECTED', details: 'Unauthorized RF signal detected on 458.2250 MHz in Restricted Sector-03', category: 'RF', severity: 'WARNING' },
  { id: 'AL-007', timestamp: new Date(Date.now() - 1800000).toISOString(), userId: 'U-001', userName: 'Capt. Rajesh Kumar', action: 'PATROL_COMPLETED', details: 'North Sector patrol completed. All 6 checkpoints verified.', category: 'PERSONNEL', severity: 'INFO' },
  { id: 'AL-008', timestamp: new Date(Date.now() - 3600000).toISOString(), userId: 'U-001', userName: 'Commander', action: 'USER_LOGIN', details: 'Commander logged in from Command Center terminal', category: 'AUTH', severity: 'INFO' },
  { id: 'AL-009', timestamp: new Date(Date.now() - 7200000).toISOString(), action: 'SYSTEM_HEALTH_CHECK', details: 'All systems nominal. 24/26 cameras online, 21/23 RF devices active.', category: 'SYSTEM', severity: 'INFO' },
  { id: 'AL-010', timestamp: new Date(Date.now() - 900000).toISOString(), action: 'CAMERA_DEGRADED', details: 'CAM-25 reporting degraded video quality (720p effective). AI confidence reduced.', category: 'SYSTEM', severity: 'WARNING' },
];

// ---- DASHBOARD STATS ----
export const mockDashboardStats: DashboardStats = {
  activeCameras: 24,
  totalCameras: 26,
  degradedCameras: 2,
  personnelDetected: 18,
  authorizedPersonnel: 16,
  activeAlerts: 3,
  criticalThreats: 1,
  rfDevicesOnline: 21,
  totalRFDevices: 23,
};

// ---- SYSTEM HEALTH ----
export const mockSystemHealth: SystemHealth = {
  cctvNetwork: 98,
  rfSensors: 96,
  aiEngine: 99,
  database: 100,
  apiGateway: 99,
  network: 97,
};
