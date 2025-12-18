'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

const THEME_KEY = 'color-theme';

export default function ThemeToggle() {
  const [mode, setMode] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_KEY);
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    
    let initialMode = savedTheme || (prefersLight ? 'light' : 'dark');

    if (initialMode === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
    setMode(initialMode);
  }, []);

  const toggleTheme = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark';
    setMode(newMode);
    localStorage.setItem(THEME_KEY, newMode);

    if (newMode === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  };

  return (
    <button 
      onClick={toggleTheme} 
      className="p-2 rounded-full text-[var(--color-text-base)] hover:text-[var(--color-accent)] hover:bg-(--color-bg) transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
      aria-label="Toggle theme"
    >
      {mode === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
}