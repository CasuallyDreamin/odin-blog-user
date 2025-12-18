'use client';

import React, { useState, useEffect } from 'react';
import SettingsContext from './SettingsContext';
import api from '../lib/api';

const defaultSettings = {
  blogName: 'My Awesome Blog',
  tagline: 'Coding, writing, and chaos',
  logoUrl: null,
  theme: 'default',
  socialLinks: null,
};

export default function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const resSettings = await api.get('/settings');
        setSettings(resSettings.data || defaultSettings);
      } catch (err) {
        console.error('Failed to load global settings:', err);
        setError('Failed to load global settings.');
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const contextValue = {
    settings,
    loading,
    error,
  };

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
}