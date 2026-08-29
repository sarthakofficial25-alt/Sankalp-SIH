import type { BoundingBox, Detection, VisualMatchStatus } from '../../shared/types';

export interface PersonDetector {
  detect(imageBuffer: Uint8Array | string): Promise<Array<{
    confidence: number;
    boundingBox: BoundingBox;
    className: string;
  }>>;
}

export class MockPersonDetector implements PersonDetector {
  async detect(imageBuffer: Uint8Array | string): Promise<Array<{
    confidence: number;
    boundingBox: BoundingBox;
    className: string;
  }>> {
    // Simulated YOLOv8 inference result
    return [
      {
        confidence: 0.964,
        boundingBox: { x: 120, y: 80, width: 60, height: 140 },
        className: 'person',
      },
    ];
  }
}
