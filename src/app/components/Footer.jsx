'use client';

import { Mail, Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-neutral-900 p-6 text-gray-400">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          © 2025 Yasin — All Rights Reserved
        </div>

        <div className="flex gap-4">
          <a href="mailto:your@email.com" target="_blank" className="hover:text-cyan-400">
            <Mail size={20} />
          </a>
          <a href="https://github.com/yourusername" target="_blank" className="hover:text-cyan-400">
            <Github size={20} />
          </a>
          <a href="https://twitter.com/yourusername" target="_blank" className="hover:text-cyan-400">
            <Twitter size={20} />
          </a>
          <a href="https://linkedin.com/in/yourusername" target="_blank" className="hover:text-cyan-400">
            <Linkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
