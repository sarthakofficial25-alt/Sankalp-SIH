// ============================================
// SURAKSHA-NET — Shared Type Definitions
// ============================================

// ---- Enums ----

export type UserRole = 'SUPER_ADMIN' | 'COMMANDER' | 'SECURITY_OFFICER' | 'ANALYST';

export type ThreatLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type AlertSeverity = 'INFORMATIONAL' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type AlertStatus = 'ACTIVE' | 'ACKNOWLEDGED' | 'ESCALATED' | 'DISMISSED' | 'RESOLVED';

export type IncidentStatus = 'DETECTED' | 'UNDER_REVIEW' | 'ACKNOWLEDGED' | 'RESOLVED';

export type PersonnelStatus = 'ON_PATROL' | 'AT_POST' | 'OFF_DUTY' | 'IN_TRANSIT' | 'UNKNOWN';

export type CameraStatus = 'ONLINE' | 'DEGRADED' | 'OFFLINE' | 'MAINTENANCE';

export type RFDeviceStatus = 'ONLINE' | 'WEAK_SIGNAL' | 'OFFLINE' | 'UNKNOWN';

export type SensorStatus = 'ONLINE' | 'DEGRADED' | 'OFFLINE';

export type ZoneType = 'AUTHORIZED' | 'RESTRICTED' | 'HIGH_SECURITY' | 'BUFFER';

export type VisualMatchStatus = 'MATCHED' | 'UNKNOWN' | 'UNVERIFIED' | 'NO_FACE';

export type RFMatchStatus = 'MATCHED' | 'MISMATCHED' | 'NOT_FOUND' | 'WEAK';

export type AuthorizationStatus = 'AUTHORIZED' | 'UNAUTHORIZED' | 'PENDING' | 'REVOKED';

// ---- Core Entities ----

export interface User {
  id: string;
  username: string;
  name: string;
  role: UserRole;
  rank: string;
  serviceId: string;
  avatar?: string;
  lastLogin?: string;
}

export interface Personnel {
  id: string;
  serviceId: string;
  name: string;
  rank: string;
  role: string;
  assignedSector: string;
  assignedZoneId: string;
  rfDeviceId: string;
  authorizationStatus: AuthorizationStatus;
  status: PersonnelStatus;
  lastDetectedLocation: GeoPoint;
  lastDetectedTime: string;
  photo?: string;
  expectedSchedule?: Schedule;
}

export interface Camera {
  id: string;
  name: string;
  location: string;
  sector: string;
  position: GeoPoint;
  status: CameraStatus;
  resolution: string;
  aiEnabled: boolean;
  detectionCount: number;
  lastActivity: string;
  feedUrl?: string;
}

export interface Detection {
  id: string;
  trackId: string;
  cameraId: string;
  timestamp: string;
  confidence: number;
  visualStatus: VisualMatchStatus;
  rfStatus: RFMatchStatus;
  location: string;
  zone: string;
  zoneType: ZoneType;
  threatScore: number;
  threatLevel: ThreatLevel;
  boundingBox: BoundingBox;
  personnelId?: string;
  rfDeviceId?: string;
  snapshot?: string;
}

export interface RFDevice {
  id: string;
  deviceId: string;
  assignedPersonnelId?: string;
  assignedPersonnelName?: string;
  frequency: string;
  signalStrength: number;
  status: RFDeviceStatus;
  authorizationStatus: AuthorizationStatus;
  lastSeen: string;
  position: GeoPoint;
  sector: string;
}

export interface RFSignal {
  id: string;
  deviceId: string;
  timestamp: string;
  frequency: number;
  signalStrength: number;
  position: GeoPoint;
  isAuthorized: boolean;
  associatedPersonnelId?: string;
}

export interface Zone {
  id: string;
  name: string;
  type: ZoneType;
  sector: string;
  boundaries: GeoPoint[];
  color: string;
  activePersonnel: number;
  maxPersonnel: number;
}

export interface Alert {
  id: string;
  severity: AlertSeverity;
  title: string;
  description: string;
  timestamp: string;
  location: string;
  sector: string;
  status: AlertStatus;
  trackId?: string;
  cameraId?: string;
  rfDeviceId?: string;
  threatScore: number;
  assignedOfficer?: string;
  acknowledgedAt?: string;
  resolvedAt?: string;
  evidence?: Evidence[];
}

export interface Incident {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  location: string;
  sector: string;
  threatLevel: ThreatLevel;
  status: IncidentStatus;
  cameraId: string;
  trackId: string;
  rfDeviceId?: string;
  assignedOfficer?: string;
  evidence: Evidence[];
  timeline: IncidentTimelineEntry[];
  relatedAlertIds: string[];
  resolvedAt?: string;
  resolution?: string;
}

export interface Sensor {
  id: string;
  name: string;
  type: 'CAMERA' | 'RF_RECEIVER' | 'MOTION' | 'THERMAL' | 'ACOUSTIC';
  location: string;
  sector: string;
  position: GeoPoint;
  status: SensorStatus;
  lastHeartbeat: string;
  healthPercentage: number;
}

export interface ThreatAssessment {
  trackId: string;
  factors: ThreatFactor[];
  rawScore: number;
  normalizedScore: number;
  threatLevel: ThreatLevel;
  timestamp: string;
  recommendation: string;
}

export interface IdentityCorrelation {
  trackId: string;
  visualMatch: { status: VisualMatchStatus; confidence: number };
  rfMatch: { status: RFMatchStatus; deviceId?: string; confidence: number };
  authorizedZone: boolean;
  expectedSchedule: boolean;
  locationValid: boolean;
  identityConfidence: number;
  overallStatus: 'AUTHORIZED' | 'SUSPICIOUS' | 'UNKNOWN' | 'HOSTILE';
  personnelId?: string;
  personnelName?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userId?: string;
  userName?: string;
  action: string;
  details: string;
  category: 'AUTH' | 'DETECTION' | 'ALERT' | 'SYSTEM' | 'PERSONNEL' | 'INCIDENT' | 'RF';
  severity: 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL';
}

// ---- Supporting Types ----

export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Schedule {
  startTime: string;
  endTime: string;
  days: string[];
}

export interface Evidence {
  id: string;
  type: 'SNAPSHOT' | 'VIDEO_CLIP' | 'RF_LOG' | 'DETECTION_LOG' | 'AUDIT_ENTRY';
  description: string;
  timestamp: string;
  url?: string;
}

export interface IncidentTimelineEntry {
  timestamp: string;
  action: string;
  actor?: string;
  details: string;
}

export interface ThreatFactor {
  name: string;
  score: number;
  maxScore: number;
  description: string;
}

// ---- Dashboard Types ----

export interface DashboardStats {
  activeCameras: number;
  totalCameras: number;
  degradedCameras: number;
  personnelDetected: number;
  authorizedPersonnel: number;
  activeAlerts: number;
  criticalThreats: number;
  rfDevicesOnline: number;
  totalRFDevices: number;
}

export interface SystemHealth {
  cctvNetwork: number;
  rfSensors: number;
  aiEngine: number;
  database: number;
  apiGateway: number;
  network: number;
}

// ---- API Types ----

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

// ---- Simulation Types ----

export interface SimulationState {
  isRunning: boolean;
  speed: number;
  scenarioId?: string;
  demoMode: boolean;
  demoStep: number;
}

export interface DemoScenario {
  id: string;
  name: string;
  description: string;
  steps: DemoStep[];
}

export interface DemoStep {
  id: number;
  title: string;
  description: string;
  duration: number;
  action: string;
  data?: Record<string, unknown>;
}
