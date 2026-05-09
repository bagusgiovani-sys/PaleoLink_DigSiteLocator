import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

const ThrowingChild = () => {
  throw new Error('test render error');
};

describe('ErrorBoundary', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <p>Safe content</p>
      </ErrorBoundary>
    );
    expect(screen.getByText('Safe content')).toBeTruthy();
  });

  it('renders fallback UI when a child throws', () => {
    render(
      <ErrorBoundary>
        <ThrowingChild />
      </ErrorBoundary>
    );
    expect(screen.getByText('SECTION UNAVAILABLE')).toBeTruthy();
    expect(screen.getByText('An unexpected error occurred. Try switching tabs.')).toBeTruthy();
  });

  it('does not render children when in error state', () => {
    render(
      <ErrorBoundary>
        <ThrowingChild />
        <p>Should not appear</p>
      </ErrorBoundary>
    );
    expect(screen.queryByText('Should not appear')).toBeNull();
  });
});
