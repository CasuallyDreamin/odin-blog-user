import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import useSearchBar from '@/app/hooks/useSearchBar';

describe('useSearchBar', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
  });

  it('initializes with the provided value', () => {
    const { result } = renderHook(() => useSearchBar({ initialValue: 'hello' }));
    expect(result.current.search).toBe('hello');
  });

  it('updates search value immediately via handleChange', () => {
    const { result } = renderHook(() => useSearchBar());
    
    act(() => {
      result.current.handleChange({ target: { value: 'react' } });
    });

    expect(result.current.search).toBe('react');
  });

  it('debounces the onSearchChange callback', () => {
    const onSearchChange = vi.fn();
    const { result } = renderHook(() => useSearchBar({ onSearchChange, debounceMs: 500 }));

    act(() => {
      result.current.setSearch('test');
    });

    vi.advanceTimersByTime(499);
    expect(onSearchChange).not.toHaveBeenCalledWith('test');

    act(() => {
      vi.advanceTimersByTime(1);
    });

    expect(onSearchChange).toHaveBeenCalledWith('test');
  });

  it('emits a globalSearch CustomEvent after debounce', () => {
    const eventSpy = vi.fn();
    window.addEventListener('globalSearch', eventSpy);

    const { result } = renderHook(() => useSearchBar({ debounceMs: 200 }));

    eventSpy.mockClear();

    act(() => {
      result.current.setSearch('global-test');
    });

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(eventSpy).toHaveBeenCalled();
    const lastCallIndex = eventSpy.mock.calls.length - 1;
    const eventData = eventSpy.mock.calls[lastCallIndex][0];
    expect(eventData.detail).toBe('global-test');

    window.removeEventListener('globalSearch', eventSpy);
  });

  it('does not emit global event if emitGlobal is false', () => {
    const eventSpy = vi.fn();
    window.addEventListener('globalSearch', eventSpy);

    const { result } = renderHook(() => useSearchBar({ emitGlobal: false, debounceMs: 200 }));
    eventSpy.mockClear();

    act(() => {
      result.current.setSearch('hidden-test');
      vi.advanceTimersByTime(200);
    });

    expect(eventSpy).not.toHaveBeenCalled();
    window.removeEventListener('globalSearch', eventSpy);
  });

  it('updates search state when initialValue prop changes', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useSearchBar({ initialValue: value }),
      { initialProps: { value: 'first' } }
    );

    expect(result.current.search).toBe('first');

    rerender({ value: 'second' });

    expect(result.current.search).toBe('second');
  });
});