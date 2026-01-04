import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Navbar from '@/app/components/Navbar';
import { useSettings } from '@/app/context/SettingsContext';
import { usePathname } from 'next/navigation';

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}));

vi.mock('next/link', () => ({
  default: ({ children, href }) => <a href={href}>{children}</a>,
}));

vi.mock('@/app/context/SettingsContext', () => ({
  useSettings: vi.fn(),
}));

vi.mock('./ThemeToggle', () => ({
  default: () => <button aria-label="Toggle theme" data-testid="theme-toggle" />,
}));

describe('Navbar', () => {
  const mockSettings = {
    settings: { blogName: 'SINTOPIA', logoUrl: '' },
    loading: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    useSettings.mockReturnValue(mockSettings);
    usePathname.mockReturnValue('/');
  });

  it('renders the loading skeleton when loading is true', () => {
    useSettings.mockReturnValue({ ...mockSettings, loading: true });
    const { container } = render(<Navbar />);
    expect(container.querySelector('.navbar-loading')).toBeInTheDocument();
  });

  it('renders the blog name from settings when no logo is provided', () => {
    render(<Navbar />);
    expect(screen.getByText('SINTOPIA')).toBeInTheDocument();
  });

  it('renders the logo image when logoUrl is present', () => {
    useSettings.mockReturnValue({
      settings: { blogName: 'SINTOPIA', logoUrl: '/logo.png' },
      loading: false,
    });
    render(<Navbar />);
    const img = screen.getByAltText('SINTOPIA');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/logo.png');
  });

  it('highlights the active link based on the current pathname', () => {
    usePathname.mockReturnValue('/about');
    render(<Navbar />);
    
    const aboutLinks = screen.getAllByText('About');
    expect(aboutLinks[0]).toHaveClass('nav-link-active');
    
    const homeLinks = screen.getAllByText('Home');
    expect(homeLinks[0]).toHaveClass('nav-link-inactive');
  });

  it('toggles the mobile menu when the toggle button is clicked', () => {
    const { container } = render(<Navbar />);
    const toggleBtn = container.querySelector('.navbar-mobile-toggle-btn');

    fireEvent.click(toggleBtn);
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('menu-open');
  });

  it('hides the search input on excluded pages', () => {
    usePathname.mockReturnValue('/posts');
    render(<Navbar />);
    
    expect(screen.queryByPlaceholderText(/search all content/i)).not.toBeInTheDocument();
  });

  it('shows search input on allowed pages (like home)', () => {
    usePathname.mockReturnValue('/');
    render(<Navbar />);
    
    expect(screen.getByPlaceholderText(/search all content/i)).toBeInTheDocument();
  });

  it('closes the mobile menu when a link is clicked', () => {
    const { container } = render(<Navbar />);
    
    const toggleBtn = container.querySelector('.navbar-mobile-toggle-btn');
    fireEvent.click(toggleBtn);
    
    const mobileList = container.querySelector('.navbar-mobile-link-list');
    const aboutLink = within(mobileList).getByText('About');
    
    fireEvent.click(aboutLink);

    const nav = screen.getByRole('navigation');
    expect(nav).not.toHaveClass('menu-open');
  });
});