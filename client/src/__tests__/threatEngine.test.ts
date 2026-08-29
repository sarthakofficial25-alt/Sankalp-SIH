import { describe, it, expect } from 'vitest';
import { ThreatScoringEngine } from '../../../ai-engine/inference/threat-scorer';
import { IdentityCorrelationEngine } from '../../../ai-engine/inference/engine';

describe('ThreatScoringEngine Tests', () => {
  const engine = new ThreatScoringEngine();

  it('should score 0 for authorized patrol in permitted zone', () => {
    const assessment = engine.calculateScore({
      isUnknownVisual: false,
      isMissingExpectedRF: false,
      isRestrictedZone: false,
      hasUnexpectedMovement: false,
      hasTimeAnomaly: false,
      isAuthorizationMismatch: false,
    });

    expect(assessment.rawScore).toBe(0);
    expect(assessment.normalizedScore).toBe(0);
    expect(assessment.threatLevel).toBe('LOW');
  });

  it('should calculate critical threat score for unauthorized intrusion into restricted zone', () => {
    const assessment = engine.calculateScore({
      isUnknownVisual: true, // +30
      isMissingExpectedRF: true, // +20
      isRestrictedZone: true, // +25
      hasUnexpectedMovement: false,
      hasTimeAnomaly: false,
      isAuthorizationMismatch: true, // +20
    });

    // 30 + 20 + 25 + 20 = 95
    expect(assessment.rawScore).toBe(95);
    expect(assessment.normalizedScore).toBe(95);
    expect(assessment.threatLevel).toBe('CRITICAL');
    expect(assessment.recommendation).toContain('QRT unit immediately');
  });

  it('should calculate medium threat when only unknown visual occurs in regular zone', () => {
    const assessment = engine.calculateScore({
      isUnknownVisual: true, // +30
      isMissingExpectedRF: false,
      isRestrictedZone: false,
      hasUnexpectedMovement: false,
      hasTimeAnomaly: false,
      isAuthorizationMismatch: false,
    });

    expect(assessment.rawScore).toBe(30);
    expect(assessment.threatLevel).toBe('MEDIUM');
  });
});

describe('IdentityCorrelationEngine Tests', () => {
  const correlator = new IdentityCorrelationEngine();

  it('should evaluate authorized patrol target correctly', async () => {
    const result = await correlator.evaluateTarget({
      trackId: 'P-1042',
      hasVisualMatch: true,
      hasRFMatch: true,
      isRestrictedZone: false,
    });

    expect(result.overallStatus).toBe('AUTHORIZED');
    expect(result.visualMatch.status).toBe('MATCHED');
    expect(result.rfMatch.status).toBe('MATCHED');
    expect(result.identityConfidence).toBeGreaterThan(90);
  });

  it('should evaluate hostile intruder in restricted zone correctly', async () => {
    const result = await correlator.evaluateTarget({
      trackId: 'P-1098',
      hasVisualMatch: false,
      hasRFMatch: false,
      isRestrictedZone: true,
    });

    expect(result.overallStatus).toBe('HOSTILE');
    expect(result.visualMatch.status).toBe('UNKNOWN');
    expect(result.rfMatch.status).toBe('NOT_FOUND');
    expect(result.identityConfidence).toBeLessThan(20);
  });
});
