import { MockPersonDetector } from '../detection/detector';
import { MockPersonTracker } from '../tracking/tracker';
import { MockFaceRecognizer } from '../recognition/recognizer';
import { MockRFProcessor } from '../rf-correlation/correlator';
import { ThreatScoringEngine } from './threat-scorer';
import type { IdentityCorrelation, Detection } from '../../shared/types';

export class IdentityCorrelationEngine {
  private detector = new MockPersonDetector();
  private tracker = new MockPersonTracker();
  private recognizer = new MockFaceRecognizer();
  private rfProcessor = new MockRFProcessor();
  private threatEngine = new ThreatScoringEngine();

  public async evaluateTarget(target: {
    trackId: string;
    hasVisualMatch: boolean;
    hasRFMatch: boolean;
    isRestrictedZone: boolean;
  }): Promise<IdentityCorrelation> {
    const isUnknownVisual = !target.hasVisualMatch;
    const isMissingExpectedRF = !target.hasRFMatch;

    const assessment = this.threatEngine.calculateScore({
      isUnknownVisual,
      isMissingExpectedRF,
      isRestrictedZone: target.isRestrictedZone,
      hasUnexpectedMovement: false,
      hasTimeAnomaly: false,
      isAuthorizationMismatch: !target.hasVisualMatch && target.isRestrictedZone,
    });

    const identityConfidence = target.hasVisualMatch && target.hasRFMatch ? 98 : target.hasVisualMatch ? 70 : 12;
    const overallStatus = assessment.threatLevel === 'CRITICAL' ? 'HOSTILE' : target.hasVisualMatch && target.hasRFMatch ? 'AUTHORIZED' : 'SUSPICIOUS';

    return {
      trackId: target.trackId,
      visualMatch: {
        status: target.hasVisualMatch ? 'MATCHED' : 'UNKNOWN',
        confidence: target.hasVisualMatch ? 97 : 14,
      },
      rfMatch: {
        status: target.hasRFMatch ? 'MATCHED' : 'NOT_FOUND',
        confidence: target.hasRFMatch ? 99 : 0,
        deviceId: target.hasRFMatch ? 'RF-0012' : undefined,
      },
      authorizedZone: !target.isRestrictedZone,
      expectedSchedule: target.hasVisualMatch,
      locationValid: !target.isRestrictedZone,
      identityConfidence,
      overallStatus,
    };
  }
}
