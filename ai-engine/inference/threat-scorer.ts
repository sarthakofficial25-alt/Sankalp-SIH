import type { ThreatAssessment, ThreatLevel, ThreatFactor } from '../../shared/types';

export interface ThreatScoringInput {
  isUnknownVisual: boolean;
  isMissingExpectedRF: boolean;
  isRestrictedZone: boolean;
  hasUnexpectedMovement: boolean;
  hasTimeAnomaly: boolean;
  isAuthorizationMismatch: boolean;
}

export class ThreatScoringEngine {
  /**
   * Modular scoring calculation implementing the SIH Problem Statement formula:
   * Unknown visual identity: +30
   * Missing expected RF: +20
   * Restricted-zone presence: +25
   * Unexpected movement: +10
   * Time anomaly: +5
   * Authorization mismatch: +20
   * Normalized 0 - 100
   */
  public calculateScore(input: ThreatScoringInput): ThreatAssessment {
    const factors: ThreatFactor[] = [];
    let rawScore = 0;

    if (input.isUnknownVisual) {
      factors.push({ name: 'Unknown Visual Identity', score: 30, maxScore: 30, description: 'Biometric face verification failed / no roster match' });
      rawScore += 30;
    }
    if (input.isMissingExpectedRF) {
      factors.push({ name: 'Missing Expected RF Beacon', score: 20, maxScore: 20, description: 'No paired authorized radio transponder detected at coordinate' });
      rawScore += 20;
    }
    if (input.isRestrictedZone) {
      factors.push({ name: 'Restricted Zone Incursion', score: 25, maxScore: 25, description: 'Spatial breach inside prohibited perimeter polygon' });
      rawScore += 25;
    }
    if (input.hasUnexpectedMovement) {
      factors.push({ name: 'Kinematic Trajectory Anomaly', score: 10, maxScore: 10, description: 'Erratic or accelerated vector deviation' });
      rawScore += 10;
    }
    if (input.hasTimeAnomaly) {
      factors.push({ name: 'Out-of-Hours Schedule Breach', score: 5, maxScore: 5, description: 'Movement outside authorized duty shift' });
      rawScore += 5;
    }
    if (input.isAuthorizationMismatch) {
      factors.push({ name: 'Roster Privilege Mismatch', score: 20, maxScore: 20, description: 'Personnel not credentialed for this specific security clearance zone' });
      rawScore += 20;
    }

    const normalizedScore = Math.min(100, rawScore);

    let threatLevel: ThreatLevel = 'LOW';
    let recommendation = 'Maintain standard visual monitoring.';

    if (normalizedScore >= 76) {
      threatLevel = 'CRITICAL';
      recommendation = 'Dispatch rapid response QRT unit immediately. Sound sector lockdown.';
    } else if (normalizedScore >= 51) {
      threatLevel = 'HIGH';
      recommendation = 'Escalate to Duty Commander and focus adjacent optical sensors.';
    } else if (normalizedScore >= 26) {
      threatLevel = 'MEDIUM';
      recommendation = 'Request radio confirmation from sector patrol.';
    }

    return {
      trackId: 'TARGET-EVAL',
      factors,
      rawScore,
      normalizedScore,
      threatLevel,
      timestamp: new Date().toISOString(),
      recommendation,
    };
  }
}
