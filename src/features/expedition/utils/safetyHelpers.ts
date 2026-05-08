import type { SafetyProfile } from '../../../types';

export const calculateSafetyRisk = (profile: SafetyProfile) => {
  let score = 0;

  if (profile.groundType === 'Sand') score += 2;
  else if (profile.groundType === 'Clay') score += 1;
  else if (profile.groundType === 'Limestone') score += 1;

  if (profile.excavationDepth === 'Deep (2m+)') score += 3;
  else if (profile.excavationDepth === 'Medium (1-2m)') score += 2;

  if (profile.landSlope === 'Steep slope') score += 2;
  else if (profile.landSlope === 'Slight slope') score += 1;

  if (profile.waterRisk === 'High water accumulation') score += 2;
  else if (profile.waterRisk === 'Moderate drainage risk') score += 1;

  if (profile.collapseHistory === 'Major collapse before') score += 3;
  else if (profile.collapseHistory === 'Minor collapse before') score += 2;

  if (score <= 3) return { level: 'Low Risk', color: 'bg-green-500', textColor: 'text-green-400', borderColor: 'border-green-500' };
  if (score <= 6) return { level: 'Medium Risk', color: 'bg-yellow-500', textColor: 'text-yellow-400', borderColor: 'border-yellow-500' };
  return { level: 'High Risk', color: 'bg-red-500', textColor: 'text-red-400', borderColor: 'border-red-500' };
};
