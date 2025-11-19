'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import useSearchBar from '@/app/hooks/useSearchBar';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
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
    { href: '/lab', label: 'Lab' },
    { href: '/archive', label: 'Archive' },
    { href: '/contact', label: 'Contact' },
  ];

  const hideSearchPages = ['/posts', '/archive', '/about', '/contact', '/thoughts'];
  const showSearch = !hideSearchPages.includes(path);

  // Close dropdown on outside click
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

  return (
    <nav className="bg-neutral-900 p-4 flex flex-col md:flex-row justify-between items-center gap-3 sticky top-0 z-50">
      {/* Logo */}
      <div className="text-cyan-400 font-bold text-xl tracking-wider">SINTOPIA</div>

      {/* Links for md+ */}
      <ul className="hidden md:flex flex-wrap justify-center md:justify-center space-x-4 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className={`hover:text-cyan-300 transition-colors ${
                path === link.href
                  ? 'text-cyan-400 font-semibold'
                  : 'text-neutral-300'
              }`}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Mobile menu button */}
      <div className="md:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-neutral-300 hover:text-cyan-400"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          ref={dropdownRef}
          className="flex flex-col md:hidden bg-neutral-950 w-full p-4 rounded-lg absolute top-16 left-0 shadow-lg space-y-2"
        >
          {/* Close button inside dropdown */}
          <button
            onClick={() => setMenuOpen(false)}
            className="self-end text-neutral-300 hover:text-cyan-400 mb-2"
          >
            <X size={24} />
          </button>

          {showSearch && (
            <input
              type="search"
              placeholder="Search all content..."
              value={search}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm rounded-lg bg-neutral-900 border border-neutral-800 text-gray-100 placeholder-gray-500
                         focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-200 ease-in-out mb-2"
            />
          )}

          <ul className="flex flex-col space-y-2">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`block px-2 py-1 rounded hover:bg-neutral-900 ${
                    path === link.href
                      ? 'text-cyan-400 font-semibold'
                      : 'text-neutral-300'
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
