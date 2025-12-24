'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import useSearchBar from '@/app/hooks/useSearchBar';
import { Menu, X } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import ThemeToggle from './ThemeToggle';
import Link from 'next/link';
import './Navbar.tailwind.css';
export default function Navbar() {
  const { settings, loading } = useSettings();
  const path = usePathname();
  const [searchTerm, setSearchTerm] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { search, handleChange } = useSearchBar({
    initialValue: searchTerm,
    onSearchChange: setSearchTerm,
  });

  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/posts', label: 'Posts' },
    { href: '/thoughts', label: 'Thoughts' },
    { href: '/archive', label: 'Archive' },
    { href: '/contact', label: 'Contact' },
  ];

  const hideSearchPages = ['/posts', '/archive', '/about', '/contact', '/thoughts'];
  const showSearch = !hideSearchPages.includes(path);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  // Loading skeleton
  if (loading) {
    return (
      <nav className="navbar-loading">
        <div className="navbar-loading-title"></div>

        <div className="navbar-loading-links">
          <div className="navbar-loading-link"></div>
          <div className="navbar-loading-link"></div>
          <div className="navbar-loading-link"></div>
        </div>

        <div className="navbar-loading-icon"></div>
      </nav>
    );
  }

  const { blogName, logoUrl } = settings;

  return (
    <nav className={`navbar-base ${menuOpen ? 'menu-open' : ''}`}>
      <div className="navbar-main">
        
        {/* Logo / Blog Name */}
        <div className="navbar-logo-container">
          <Link href="/">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={blogName || 'Blog Logo'}
                className="navbar-logo-img"
              />
            ) : (
              blogName || 'SINTOPIA'
            )}
          </Link>
        </div>

        {/* Desktop Links */}
        <ul className="navbar-desktop-links">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={
                  path === link.href
                    ? 'nav-link-base nav-link-active'
                    : 'nav-link-base nav-link-inactive'
                }
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Utilities */}
        <div className="navbar-utilities">
          <ThemeToggle />

          {/* Mobile menu toggle */}
          <div className="navbar-mobile-toggle-wrapper">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="navbar-mobile-toggle-btn"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div ref={dropdownRef} className="navbar-mobile-dropdown">
        <button
          onClick={() => setMenuOpen(false)}
          className="navbar-mobile-close-btn"
        >
          <X size={24} />
        </button>

        {/* Search */}
        {showSearch && (
          <input
            type="search"
            placeholder="Search all content..."
            value={search}
            onChange={handleChange}
            className="navbar-mobile-search-input"
          />
        )}

        {/* Links */}
        <ul className="navbar-mobile-link-list">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={
                  path === link.href
                    ? 'nav-mobile-link-item nav-link-active'
                    : 'nav-mobile-link-item nav-link-inactive'
                }
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
