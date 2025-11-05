'use client';

import { usePathname } from 'next/navigation';

export default function Navbar() {
  const path = usePathname();

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

  return (
    <nav className="bg-neutral-900 p-4 flex justify-between items-center">
      <div className="text-cyan-400 font-bold text-xl">SINTOPIA</div>
      <ul className="flex space-x-4">
        {links.map(link => (
          <li key={link.href}>
            <a
              href={link.href}
              className={`hover:text-cyan-300 ${path === link.href ? 'text-cyan-400 font-semibold' : ''}`}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
