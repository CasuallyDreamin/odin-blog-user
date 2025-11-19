'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import useSearchBar from '@/app/hooks/useSearchBar';

export default function Navbar() {
  const path = usePathname();
  const [searchTerm, setSearchTerm] = useState('');

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

  return (
    <nav className="bg-neutral-900 p-4 flex flex-col md:flex-row justify-between items-center gap-3 sticky top-0 z-50">
      {/* Logo */}
      <div className="text-cyan-400 font-bold text-xl tracking-wider">
        SINTOPIA
      </div>

      {/* Search container always exists to preserve navbar height */}
      <div className="hidden md:flex w-full md:w-[420px] mx-auto items-center min-h-[40px]">
        {showSearch && (
          <input
            type="search"
            placeholder="Search all content..."
            value={search}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm rounded-lg bg-neutral-950 border border-neutral-800 text-gray-100 placeholder-gray-500
                       focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-200 ease-in-out"
          />
        )}
      </div>

      {/* Links */}
      <ul className="flex flex-wrap justify-center md:justify-center space-x-4 text-sm">
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
    </nav>
  );
}
