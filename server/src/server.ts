import express from 'express';
import cors from 'cors';
import { config } from './config';
import { errorHandler } from './middleware/errorHandler';

// Seed data
import {
  mockCameras, mockPersonnel, mockRFDevices, mockZones,
  mockDetections, mockAlerts, mockIncidents, mockSensors,
  mockCorrelations, mockAuditLogs, mockDashboardStats, mockSystemHealth
} from './data/mockData';

const app = express();

app.use(cors());
app.use(express.json());

// In-memory working copies for live mutation
let alerts = [...mockAlerts];
let incidents = [...mockIncidents];
let auditLogs = [...mockAuditLogs];

// Healthcheck
app.get('/api/health', (req, res) => {
  res.json({ status: 'ONLINE', timestamp: new Date().toISOString(), platform: 'SURAKSHA-NET' });
});

// Auth
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Missing credentials' });
  }

  res.json({
    success: true,
    token: 'mock-jwt-token-suraksha-26187',
    user: {
      id: 'USR-001',
      username,
      name: 'Brig. A. K. Verma',
      rank: 'Brigadier',
      role: 'COMMANDER',
      serviceId: username.toUpperCase(),
      lastLogin: new Date().toISOString(),
    },
    timestamp: new Date().toISOString(),
  });
});

// Dashboard Overview Stats
app.get('/api/dashboard', (req, res) => {
  res.json({
    success: true,
    data: {
      stats: mockDashboardStats,
      systemHealth: mockSystemHealth,
      recentAlerts: alerts.slice(0, 5),
      correlations: mockCorrelations,
      activeFeedsCount: mockCameras.filter(c => c.status === 'ONLINE').length,
    },
    timestamp: new Date().toISOString(),
  });
});

// Cameras
app.get('/api/cameras', (req, res) => {
  res.json({ success: true, data: mockCameras, timestamp: new Date().toISOString() });
});

app.get('/api/cameras/:id', (req, res) => {
  const cam = mockCameras.find(c => c.id === req.params.id);
  if (!cam) return res.status(404).json({ success: false, message: 'Camera not found' });
  res.json({ success: true, data: cam, timestamp: new Date().toISOString() });
});

// Personnel
app.get('/api/personnel', (req, res) => {
  res.json({ success: true, data: mockPersonnel, timestamp: new Date().toISOString() });
});

// RF Devices
app.get('/api/rf/devices', (req, res) => {
  res.json({ success: true, data: mockRFDevices, timestamp: new Date().toISOString() });
});

// Detections
app.get('/api/detections', (req, res) => {
  res.json({ success: true, data: mockDetections, timestamp: new Date().toISOString() });
});

// Alerts
app.get('/api/alerts', (req, res) => {
  res.json({ success: true, data: alerts, timestamp: new Date().toISOString() });
});

app.post('/api/alerts/:id/acknowledge', (req, res) => {
  const alert = alerts.find(a => a.id === req.params.id);
  if (!alert) return res.status(404).json({ success: false, message: 'Alert not found' });
  alert.status = 'ACKNOWLEDGED';
  alert.acknowledgedAt = new Date().toISOString();
  res.json({ success: true, data: alert, timestamp: new Date().toISOString() });
});

app.post('/api/alerts/:id/escalate', (req, res) => {
  const alert = alerts.find(a => a.id === req.params.id);
  if (!alert) return res.status(404).json({ success: false, message: 'Alert not found' });
  alert.status = 'ESCALATED';
  res.json({ success: true, data: alert, timestamp: new Date().toISOString() });
});

// Incidents
app.get('/api/incidents', (req, res) => {
  res.json({ success: true, data: incidents, timestamp: new Date().toISOString() });
});

// Analytics
app.get('/api/analytics', (req, res) => {
  res.json({
    success: true,
    data: {
      stats: mockDashboardStats,
      alertsResolvedRate: 94.2,
      averageTriageTimeSeconds: 14.5,
    },
    timestamp: new Date().toISOString(),
  });
});

// System Health
app.get('/api/system/health', (req, res) => {
  res.json({
    success: true,
    data: {
      subsystems: mockSystemHealth,
      sensors: mockSensors,
    },
    timestamp: new Date().toISOString(),
  });
});

// Error handling
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`[SURAKSHA-NET] Command Server active on port ${config.port} (${config.nodeEnv})`);
});
