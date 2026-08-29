import { describe, it, expect } from 'vitest';
import { useSimulationStore } from '../store/simulationStore';
import { mockCameras, mockPersonnel, mockZones } from '../data/mockData';

describe('Data Models and SimulationStore Tests', () => {
  it('should have 26 cameras initialized with valid locations and sectors', () => {
    expect(mockCameras.length).toBe(26);
    mockCameras.forEach(cam => {
      expect(cam.id).toMatch(/^CAM-\d{2}$/);
      expect(cam.position.lat).toBeGreaterThan(0);
      expect(cam.position.lng).toBeGreaterThan(0);
    });
  });

  it('should have 16 personnel with service IDs and assigned RF transponders', () => {
    expect(mockPersonnel.length).toBe(16);
    mockPersonnel.forEach(p => {
      expect(p.serviceId).toMatch(/^IND-\d{4}$/);
      expect(p.rfDeviceId).toBeDefined();
    });
  });

  it('should have geofence zones with valid polygon boundaries', () => {
    expect(mockZones.length).toBeGreaterThanOrEqual(5);
    const restrictedZone = mockZones.find(z => z.type === 'RESTRICTED');
    expect(restrictedZone).toBeDefined();
    expect(restrictedZone?.name).toBe('Restricted Sector-03');
  });

  it('simulation store should respond to generateIntrusion action', () => {
    const store = useSimulationStore.getState();
    const initialAlertsCount = store.alerts.length;

    store.generateIntrusion();

    const updatedStore = useSimulationStore.getState();
    expect(updatedStore.alerts.length).toBe(initialAlertsCount + 1);
    expect(updatedStore.alerts[0].severity).toBe('CRITICAL');
    expect(updatedStore.alerts[0].sector).toBe('Restricted Sector-03');
  });

  it('simulation store should acknowledge alert correctly', () => {
    const store = useSimulationStore.getState();
    const alertId = store.alerts[0].id;

    store.acknowledgeAlert(alertId);

    const updatedStore = useSimulationStore.getState();
    const targetAlert = updatedStore.alerts.find(a => a.id === alertId);
    expect(targetAlert?.status).toBe('ACKNOWLEDGED');
  });
});
