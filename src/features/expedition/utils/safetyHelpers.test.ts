import { describe, it, expect } from 'vitest';
import { calculateSafetyRisk } from './safetyHelpers';
import type { SafetyProfile } from '../../../types';

const base: SafetyProfile = {
  groundType: 'Rocky',
  excavationDepth: 'Shallow (0-1m)',
  landSlope: 'Flat',
  waterRisk: 'Low drainage risk',
  collapseHistory: 'No',
};

describe('calculateSafetyRisk', () => {
  it('returns Low Risk with correct classes for a zero-score profile', () => {
    const result = calculateSafetyRisk(base);
    expect(result.level).toBe('Low Risk');
    expect(result.color).toBe('bg-green-500');
    expect(result.textColor).toBe('text-green-400');
    expect(result.borderColor).toBe('border-green-500');
  });

  it('score exactly 3 (boundary) → Low Risk', () => {
    const result = calculateSafetyRisk({
      ...base,
      excavationDepth: 'Medium (1-2m)', // +2
      landSlope: 'Slight slope',         // +1  → total 3
    });
    expect(result.level).toBe('Low Risk');
  });

  it('score 4 → Medium Risk', () => {
    const result = calculateSafetyRisk({
      ...base,
      groundType: 'Sand',                  // +2
      landSlope: 'Slight slope',           // +1
      waterRisk: 'Moderate drainage risk', // +1  → total 4
    });
    expect(result.level).toBe('Medium Risk');
    expect(result.color).toBe('bg-yellow-500');
    expect(result.textColor).toBe('text-yellow-400');
    expect(result.borderColor).toBe('border-yellow-500');
  });

  it('score exactly 6 (boundary) → Medium Risk', () => {
    const result = calculateSafetyRisk({
      ...base,
      groundType: 'Sand',          // +2
      excavationDepth: 'Deep (2m+)', // +3
      landSlope: 'Slight slope',   // +1  → total 6
    });
    expect(result.level).toBe('Medium Risk');
  });

  it('score 7 → High Risk', () => {
    const result = calculateSafetyRisk({
      groundType: 'Sand',          // +2
      excavationDepth: 'Deep (2m+)', // +3
      landSlope: 'Steep slope',    // +2  → total 7
      waterRisk: 'Low drainage risk',
      collapseHistory: 'No',
    });
    expect(result.level).toBe('High Risk');
    expect(result.color).toBe('bg-red-500');
    expect(result.textColor).toBe('text-red-400');
    expect(result.borderColor).toBe('border-red-500');
  });

  it('maximum all-hazard profile → High Risk', () => {
    const result = calculateSafetyRisk({
      groundType: 'Sand',                      // +2
      excavationDepth: 'Deep (2m+)',            // +3
      landSlope: 'Steep slope',                // +2
      waterRisk: 'High water accumulation',    // +2
      collapseHistory: 'Major collapse before', // +3  → total 12
    });
    expect(result.level).toBe('High Risk');
  });

  it('Clay ground type adds 1 point', () => {
    const clay = calculateSafetyRisk({ ...base, groundType: 'Clay' });    // +1
    const rocky = calculateSafetyRisk(base);                               // +0
    expect(clay.level).toBe(rocky.level); // both score ≤ 3 → Low Risk
  });

  it('Minor collapse history adds 2 points', () => {
    const result = calculateSafetyRisk({
      ...base,
      excavationDepth: 'Medium (1-2m)',       // +2
      collapseHistory: 'Minor collapse before', // +2  → total 4
    });
    expect(result.level).toBe('Medium Risk');
  });
});
