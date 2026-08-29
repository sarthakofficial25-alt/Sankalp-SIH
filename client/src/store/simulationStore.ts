import { create } from 'zustand';
import type { Alert, Detection, AuditLog, DashboardStats, SystemHealth } from '../types';
import { mockDashboardStats, mockSystemHealth, mockAlerts, mockDetections, mockCorrelations, mockAuditLogs, mockCameras, mockRFDevices, mockPersonnel } from '../data/mockData';
import type { IdentityCorrelation } from '../types';
import { randomBetween, randomFloat } from '../lib/utils';

interface SimulationStore {
  isRunning: boolean;
  demoMode: boolean;
  demoStep: number;
  speed: number;
  dashboardStats: DashboardStats;
  systemHealth: SystemHealth;
  alerts: Alert[];
  detections: Detection[];
  correlations: IdentityCorrelation[];
  auditLogs: AuditLog[];
  cameras: typeof mockCameras;
  rfDevices: typeof mockRFDevices;
  personnel: typeof mockPersonnel;
  activeScenario: string | null;
  toastMessage: string | null;
  toggleSimulation: () => void;
  toggleDemoMode: () => void;
  nextDemoStep: () => void;
  setSpeed: (speed: number) => void;
  runScenario: (id: string) => void;
  tick: () => void;
  addAlert: (alert: Alert) => void;
  acknowledgeAlert: (id: string) => void;
  escalateAlert: (id: string) => void;
  dismissAlert: (id: string) => void;
  clearToast: () => void;
  generateIntrusion: () => void;
}

const DEMO_STEPS = [
  { title: 'Authorized patrol detected', description: 'Capt. Rajesh Kumar detected on patrol in North Sector via CAM-01' },
  { title: 'Visual identity matched', description: 'AI face recognition matched with 97% confidence to personnel database' },
  { title: 'Authorized RF signal correlated', description: 'RF device RF-0012 detected at same location — signal matched' },
  { title: 'Personnel confirmed', description: 'Multi-factor identity correlation: 98% confidence — AUTHORIZED' },
  { title: 'Unknown individual enters restricted zone', description: 'CAM-07 detects unrecognized person entering Restricted Sector-03' },
  { title: 'Visual identity unknown', description: 'No match found in personnel database. Face recognition confidence: 12%' },
  { title: 'RF correlation unavailable', description: 'No authorized RF signal detected in vicinity. RF status: NOT FOUND' },
  { title: 'Threat score increases', description: 'Threat scoring engine: Unknown visual +30, Missing RF +20, Restricted zone +25, Authorization mismatch +20 = 87 CRITICAL' },
  { title: 'Critical alert generated', description: 'CRITICAL ALERT: Unauthorized intrusion detected in Restricted Sector-03' },
  { title: 'Authority reviews incident', description: 'Incident INC-001 created. Assigned to Capt. Rajesh Kumar for immediate response.' },
];

export const useSimulationStore = create<SimulationStore>((set, get) => ({
  isRunning: true,
  demoMode: false,
  demoStep: 0,
  speed: 1,
  dashboardStats: { ...mockDashboardStats },
  systemHealth: { ...mockSystemHealth },
  alerts: [...mockAlerts],
  detections: [...mockDetections],
  correlations: [...mockCorrelations],
  auditLogs: [...mockAuditLogs],
  cameras: [...mockCameras],
  rfDevices: [...mockRFDevices],
  personnel: [...mockPersonnel],
  activeScenario: null,
  toastMessage: null,

  toggleSimulation: () => set(s => ({ isRunning: !s.isRunning })),

  toggleDemoMode: () => set(s => ({ demoMode: !s.demoMode, demoStep: 0 })),

  nextDemoStep: () => {
    const state = get();
    if (state.demoStep < DEMO_STEPS.length - 1) {
      const nextStep = state.demoStep + 1;
      set({
        demoStep: nextStep,
        toastMessage: `Step ${nextStep + 1}: ${DEMO_STEPS[nextStep].title}`,
      });
    } else {
      set({ demoMode: false, demoStep: 0, toastMessage: 'Command Demo completed' });
    }
  },

  setSpeed: (speed) => set({ speed }),

  runScenario: (id) => {
    set({ activeScenario: id });
    const state = get();

    switch (id) {
      case 'normal-patrol':
        set({
          toastMessage: 'Scenario: Normal Patrol — Authorized personnel detected and verified',
          activeScenario: null,
        });
        break;
      case 'unknown-person': {
        const newAlert: Alert = {
          id: `ALR-${Date.now()}`,
          severity: 'HIGH',
          title: 'Unknown Person Detected',
          description: 'Unidentified individual detected in patrol zone. No RF correlation.',
          timestamp: new Date().toISOString(),
          location: 'East Perimeter',
          sector: 'East Perimeter',
          status: 'ACTIVE',
          trackId: `P-${randomBetween(2000, 9999)}`,
          cameraId: 'CAM-03',
          threatScore: 72,
        };
        set({
          alerts: [newAlert, ...state.alerts],
          toastMessage: 'Scenario: Unknown Person — HIGH alert generated',
          activeScenario: null,
        });
        break;
      }
      case 'rf-mismatch': {
        const newAlert: Alert = {
          id: `ALR-${Date.now()}`,
          severity: 'MEDIUM',
          title: 'RF Signal Mismatch',
          description: 'Authorized personnel detected but RF device signal does not match expected assignment.',
          timestamp: new Date().toISOString(),
          location: 'West Perimeter',
          sector: 'West Perimeter',
          status: 'ACTIVE',
          trackId: 'P-1044',
          cameraId: 'CAM-06',
          rfDeviceId: 'RF-UNK-01',
          threatScore: 55,
        };
        set({
          alerts: [newAlert, ...state.alerts],
          toastMessage: 'Scenario: RF Mismatch — MEDIUM alert generated',
          activeScenario: null,
        });
        break;
      }
      case 'camera-failure': {
        const updatedCameras = state.cameras.map(c =>
          c.id === 'CAM-04' ? { ...c, status: 'OFFLINE' as const } : c
        );
        const newAlert: Alert = {
          id: `ALR-${Date.now()}`,
          severity: 'MEDIUM',
          title: 'Camera Offline — Coverage Degraded',
          description: 'CAM-04 is offline. Camera coverage degraded in Restricted Zone R-03. Increase reliance on adjacent sensors.',
          timestamp: new Date().toISOString(),
          location: 'Restricted Zone R-03',
          sector: 'Restricted Sector-03',
          status: 'ACTIVE',
          cameraId: 'CAM-04',
          threatScore: 40,
        };
        set({
          cameras: updatedCameras,
          alerts: [newAlert, ...state.alerts],
          dashboardStats: { ...state.dashboardStats, activeCameras: 23, degradedCameras: 3 },
          toastMessage: 'Scenario: Camera Failure — CAM-04 offline, coverage degraded',
          activeScenario: null,
        });
        break;
      }
      case 'poor-visibility': {
        const newAlert: Alert = {
          id: `ALR-${Date.now()}`,
          severity: 'LOW',
          title: 'Reduced Visual Recognition Confidence',
          description: 'Poor visibility conditions. Face recognition confidence reduced. System increasing reliance on RF correlation, tracking, and movement patterns.',
          timestamp: new Date().toISOString(),
          location: 'North Sector',
          sector: 'North Sector',
          status: 'ACTIVE',
          cameraId: 'CAM-01',
          threatScore: 20,
        };
        set({
          alerts: [newAlert, ...state.alerts],
          toastMessage: 'Scenario: Poor Visibility — Increased reliance on RF and tracking',
          activeScenario: null,
        });
        break;
      }
    }
  },

  tick: () => {
    const state = get();
    if (!state.isRunning) return;

    // Fluctuate stats slightly
    const stats = { ...state.dashboardStats };
    stats.personnelDetected = Math.max(15, Math.min(22, stats.personnelDetected + randomBetween(-1, 1)));

    // Fluctuate system health
    const health = { ...state.systemHealth };
    health.cctvNetwork = Math.max(90, Math.min(100, health.cctvNetwork + randomBetween(-1, 1)));
    health.rfSensors = Math.max(88, Math.min(100, health.rfSensors + randomBetween(-1, 1)));
    health.network = Math.max(90, Math.min(100, health.network + randomBetween(-1, 1)));

    // Update RF signal strengths
    const rfDevices = state.rfDevices.map(d => ({
      ...d,
      signalStrength: d.status === 'OFFLINE' ? 0 : Math.max(60, Math.min(100, d.signalStrength + randomBetween(-3, 3))),
      lastSeen: d.status !== 'OFFLINE' ? new Date().toISOString() : d.lastSeen,
    }));

    // Update camera detection counts
    const cameras = state.cameras.map(c => ({
      ...c,
      detectionCount: c.status === 'OFFLINE' ? 0 : Math.max(0, c.detectionCount + randomBetween(-1, 2)),
      lastActivity: c.status !== 'OFFLINE' ? new Date().toISOString() : c.lastActivity,
    }));

    // Slightly move personnel positions
    const personnel = state.personnel.map(p => ({
      ...p,
      lastDetectedLocation: {
        lat: p.lastDetectedLocation.lat + randomFloat(-0.0003, 0.0003),
        lng: p.lastDetectedLocation.lng + randomFloat(-0.0003, 0.0003),
      },
      lastDetectedTime: new Date().toISOString(),
    }));

    set({ dashboardStats: stats, systemHealth: health, rfDevices, cameras, personnel });
  },

  addAlert: (alert) => set(s => ({ alerts: [alert, ...s.alerts] })),

  acknowledgeAlert: (id) => set(s => ({
    alerts: s.alerts.map(a => a.id === id ? { ...a, status: 'ACKNOWLEDGED' as const, acknowledgedAt: new Date().toISOString() } : a),
    toastMessage: `Alert ${id} acknowledged`,
  })),

  escalateAlert: (id) => set(s => ({
    alerts: s.alerts.map(a => a.id === id ? { ...a, status: 'ESCALATED' as const } : a),
    toastMessage: `Alert ${id} escalated to higher command`,
  })),

  dismissAlert: (id) => set(s => ({
    alerts: s.alerts.map(a => a.id === id ? { ...a, status: 'DISMISSED' as const } : a),
    toastMessage: `Alert ${id} dismissed`,
  })),

  clearToast: () => set({ toastMessage: null }),

  generateIntrusion: () => {
    const state = get();
    const trackId = `P-${randomBetween(3000, 9999)}`;
    const newDetection: Detection = {
      id: `D-${Date.now()}`,
      trackId,
      cameraId: 'CAM-07',
      timestamp: new Date().toISOString(),
      confidence: randomFloat(88, 96),
      visualStatus: 'UNKNOWN',
      rfStatus: 'NOT_FOUND',
      location: 'Restricted Sector-03',
      zone: 'Restricted Sector-03',
      zoneType: 'RESTRICTED',
      threatScore: randomBetween(78, 95),
      threatLevel: 'CRITICAL',
      boundingBox: { x: randomBetween(100, 250), y: randomBetween(70, 130), width: 55, height: 130 },
    };
    const newAlert: Alert = {
      id: `ALR-${Date.now()}`,
      severity: 'CRITICAL',
      title: 'Unauthorized Intrusion Detected',
      description: `Unknown individual (${trackId}) detected in Restricted Sector-03. No authorized RF signal. Visual identity unknown.`,
      timestamp: new Date().toISOString(),
      location: 'Restricted Sector-03',
      sector: 'Restricted Sector-03',
      status: 'ACTIVE',
      trackId,
      cameraId: 'CAM-07',
      threatScore: newDetection.threatScore,
    };
    const newLog: AuditLog = {
      id: `AL-${Date.now()}`,
      timestamp: new Date().toISOString(),
      action: 'INTRUSION_DETECTED',
      details: `Critical intrusion alert generated for track ${trackId} in Restricted Sector-03. Threat score: ${newDetection.threatScore}`,
      category: 'ALERT',
      severity: 'CRITICAL',
    };
    set({
      detections: [newDetection, ...state.detections],
      alerts: [newAlert, ...state.alerts],
      auditLogs: [newLog, ...state.auditLogs],
      dashboardStats: { ...state.dashboardStats, activeAlerts: state.dashboardStats.activeAlerts + 1, criticalThreats: state.dashboardStats.criticalThreats + 1 },
      toastMessage: `🚨 CRITICAL: Unauthorized intrusion detected — Track ${trackId}`,
    });
  },
}));

export const DEMO_STEP_DATA = DEMO_STEPS;
