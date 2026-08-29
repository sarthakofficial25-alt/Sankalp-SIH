import type { VisualMatchStatus } from '../../shared/types';

export interface FaceRecognitionResult {
  status: VisualMatchStatus;
  confidence: number;
  personnelId?: string;
  matchedFeatureDistance?: number;
}

export interface FaceRecognizer {
  recognizeFace(cropBuffer: Uint8Array | string): Promise<FaceRecognitionResult>;
}

export class MockFaceRecognizer implements FaceRecognizer {
  async recognizeFace(cropBuffer: Uint8Array | string): Promise<FaceRecognitionResult> {
    // Simulated FaceNet embedding vector comparison with thresholding
    return {
      status: 'MATCHED',
      confidence: 96.4,
      personnelId: 'P-001',
      matchedFeatureDistance: 0.28,
    };
  }
}
