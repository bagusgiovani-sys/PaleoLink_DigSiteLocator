import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { getWeatherColor, getWeatherIcon, getSiteIcon } from './weatherHelpers';

describe('getWeatherColor', () => {
  it('returns bg-green-400 for good', () => {
    expect(getWeatherColor('good')).toBe('bg-green-400');
  });
  it('returns bg-yellow-400 for warning', () => {
    expect(getWeatherColor('warning')).toBe('bg-yellow-400');
  });
  it('returns bg-red-500 for catastrophic', () => {
    expect(getWeatherColor('catastrophic')).toBe('bg-red-500');
  });
});

describe('getWeatherIcon', () => {
  const conditions = ['sunny', 'rainy', 'thunderstorm', 'flood', 'typhoon'] as const;
  conditions.forEach((condition) => {
    it(`renders an SVG icon for ${condition}`, () => {
      const { container } = render(getWeatherIcon(condition));
      expect(container.querySelector('svg')).not.toBeNull();
    });
  });
});

describe('getSiteIcon', () => {
  it('returns Wrench SVG for Planning status (fossil type)', () => {
    const { container } = render(getSiteIcon('fossil', 'Planning'));
    expect(container.querySelector('svg')).not.toBeNull();
  });

  it('returns Wrench SVG for Planning status (archaeological type)', () => {
    const { container } = render(getSiteIcon('archaeological', 'Planning'));
    expect(container.querySelector('svg')).not.toBeNull();
  });

  it('returns an SVG for Active fossil site', () => {
    const { container } = render(getSiteIcon('fossil', 'Active'));
    expect(container.querySelector('svg')).not.toBeNull();
  });

  it('returns an SVG for Active archaeological site', () => {
    const { container } = render(getSiteIcon('archaeological', 'Active'));
    expect(container.querySelector('svg')).not.toBeNull();
  });
});
