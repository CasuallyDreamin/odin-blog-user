import React, { useContext } from 'react'; // Add this import
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '../../mocks/server';
import SettingsProvider from '@/app/context/SettingsProvider';
import SettingsContext from '@/app/context/SettingsContext';

const TestConsumer = () => {
  const { settings, loading, error } = useContext(SettingsContext);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return <div data-testid="blog-name">{settings.blogName}</div>;
};

describe('SettingsProvider', () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  it('provides settings data after successful fetch', async () => {
    server.use(
      http.get(`${API_URL}/settings`, () => {
        return HttpResponse.json({ 
          blogName: 'Test Blog Title',
          tagline: 'Test Tagline' 
        });
      })
    );

    render(
      <SettingsProvider>
        <TestConsumer />
      </SettingsProvider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId('blog-name')).toHaveTextContent('Test Blog Title');
    }, { timeout: 2000 });
  });

  it('handles API errors gracefully', async () => {
    server.use(
      http.get(`${API_URL}/settings`, () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    render(
      <SettingsProvider>
        <TestConsumer />
      </SettingsProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/error:/i)).toBeInTheDocument();
    });
  });
});