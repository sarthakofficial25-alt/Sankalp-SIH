import type { RFMatchStatus, GeoPoint } from '../../shared/types';

export interface RFSignalReading {
  frequency: number;
  rssi: number;
  deviceId: string;
  timestamp: string;
  triangulatedLocation?: GeoPoint;
}

export interface RFSignalProcessor {
  processSpectrum(rawIQSamples: Float32Array): Promise<RFSignalReading[]>;
  correlateWithTarget(targetPosition: GeoPoint, expectedDeviceId?: string): Promise<{
    status: RFMatchStatus;
    confidence: number;
    detectedDeviceId?: string;
  }>;
}

export class MockRFProcessor implements RFSignalProcessor {
  async processSpectrum(rawIQSamples: Float32Array): Promise<RFSignalReading[]> {
    return [
      {
        frequency: 462.5625,
        rssi: -65,
        deviceId: 'RF-0012',
        timestamp: new Date().toISOString(),
      },
    ];
  }

  async correlateWithTarget(targetPosition: GeoPoint, expectedDeviceId?: string): Promise<{
    status: RFMatchStatus;
    confidence: number;
    detectedDeviceId?: string;
  }> {
    if (expectedDeviceId === 'RF-0012') {
      return {
        status: 'MATCHED',
        confidence: 99.0,
        detectedDeviceId: 'RF-0012',
      };
    }
    return {
      status: 'NOT_FOUND',
      confidence: 0,
    };
  }
}
