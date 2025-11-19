'use client';
import { useState, useEffect, useCallback } from 'react';

export default function useSearchBar({
  initialValue = '',
  debounceMs = 200,
  onSearchChange = () => {},
  emitGlobal = true,
} = {}) {
  const [search, setSearch] = useState(initialValue);

  // update when parent changes
  useEffect(() => {
    setSearch(initialValue ?? '');
  }, [initialValue]);

  // debounce updates
  useEffect(() => {
    const handler = setTimeout(() => {
      onSearchChange(search);
      if (emitGlobal) {
        window.dispatchEvent(new CustomEvent('globalSearch', { detail: search }));
      }
    }, debounceMs);
    return () => clearTimeout(handler);
  }, [search, debounceMs, emitGlobal, onSearchChange]);

  const handleChange = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  return { search, setSearch, handleChange };
}
