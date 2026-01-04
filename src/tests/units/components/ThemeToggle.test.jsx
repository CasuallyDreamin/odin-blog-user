import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ThemeToggle from '@/app/components/ThemeToggle';

describe('ThemeToggle', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('light');
    vi.clearAllMocks();
  });

  it('renders with dark mode by default (if no preference)', () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button', { name: /toggle theme/i });
    
    expect(document.documentElement.classList.contains('light')).toBe(false);
  });

  it('toggles to light mode on click', () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button', { name: /toggle theme/i });

    fireEvent.click(button);

    expect(document.documentElement.classList.contains('light')).toBe(true);
    expect(localStorage.getItem('color-theme')).toBe('light');
  });

  it('toggles back to dark mode after being light', () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button', { name: /toggle theme/i });

    fireEvent.click(button);
    fireEvent.click(button);

    expect(document.documentElement.classList.contains('light')).toBe(false);
    expect(localStorage.getItem('color-theme')).toBe('dark');
  });

  it('initializes from localStorage if available', () => {
    localStorage.setItem('color-theme', 'light');
    render(<ThemeToggle />);
    
    expect(document.documentElement.classList.contains('light')).toBe(true);
  });
});