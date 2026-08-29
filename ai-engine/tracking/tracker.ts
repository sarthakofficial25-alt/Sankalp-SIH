import type { BoundingBox } from '../../shared/types';

export interface TrackedObject {
  trackId: string;
  boundingBox: BoundingBox;
  velocity: { vx: number; vy: number };
  age: number;
}

export interface PersonTracker {
  update(detections: Array<{ boundingBox: BoundingBox; confidence: number }>): Promise<TrackedObject[]>;
}

export class MockPersonTracker implements PersonTracker {
  private currentTracks: Map<string, TrackedObject> = new Map();

  async update(detections: Array<{ boundingBox: BoundingBox; confidence: number }>): Promise<TrackedObject[]> {
    // Simulated ByteTrack kinematic state update
    return detections.map((d, index) => {
      const trackId = `P-${1040 + index}`;
      const tracked: TrackedObject = {
        trackId,
        boundingBox: d.boundingBox,
        velocity: { vx: 0.2, vy: 0.1 },
        age: 120,
      };
      this.currentTracks.set(trackId, tracked);
      return tracked;
    });
  }
}
