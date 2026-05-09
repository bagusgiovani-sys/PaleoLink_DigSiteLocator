import { describe, it, expect, vi, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useIntroSplash } from './useIntroSplash';

describe('useIntroSplash', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns true on initial render', () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useIntroSplash());
    expect(result.current).toBe(true);
  });

  it('returns false after exactly 3000 ms', () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useIntroSplash());
    act(() => { vi.advanceTimersByTime(3000); });
    expect(result.current).toBe(false);
  });

  it('still returns true at 2999 ms', () => {
    vi.useFakeTimers();
    const { result } = renderHook(() => useIntroSplash());
    act(() => { vi.advanceTimersByTime(2999); });
    expect(result.current).toBe(true);
  });
});
