'use client';

import { useState } from 'react';
import api from '../lib/api';
import { Mail, Github, X, Linkedin } from 'lucide-react';
import '../../styles/pages/contact.tailwind.css';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setStatus({ type: 'error', text: 'Please fill in all fields.' });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      await api.post('/contact', { name, email, message });
      setStatus({ type: 'success', text: 'Message sent successfully!' });
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', text: 'Failed to send message. Try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page-container max-w-2xl mx-auto px-4 py-12 flex flex-col gap-12">
      <div>
        {/* Refactored: Text color uses var(--color-accent) */}
        <h1 className="text-3xl font-bold text-[var(--color-accent)] mb-4">Contact Me</h1>
        
        {/* Refactored: Text color uses var(--color-text-base) */}
        <p className="text-[var(--color-text-base)] mb-4">
          Got questions, ideas, or just want to say hi? Send me a message using the form below.
        </p>
        
        {/* Refactored: Text color uses var(--color-text-muted) */}
        <p className="text-[var(--color-text-muted)]">
          I usually reply within a couple of days. You can also reach out via social media:
        </p>
        
        <div className="flex flex-col gap-3 mt-4">
          <a
            href="mailto:ysn.arambash@email.com"
            target="_blank"
            className="flex items-center gap-2 text-[var(--color-text-base)] hover:text-[var(--color-accent)] transition-colors"
          >
            <Mail size={20} /> ysn.arambash@gmail.com
          </a>
          <a
            href="https://github.com/CasuallyDreamin"
            target="_blank"
            className="flex items-center gap-2 text-[var(--color-text-base)] hover:text-[var(--color-accent)] transition-colors"
          >
            <Github size={20} /> @CasuallyDreamin
          </a>
          <a
            href="https://twitter.com/hithereitssin"
            target="_blank"
            className="flex items-center gap-2 text-[var(--color-text-base)] hover:text-[var(--color-accent)] transition-colors"
          >
            <X size={20} /> @hithereitssin
          </a>
          <a
            href="https://www.linkedin.com/in/yasin-aram-bash-0a333a284"
            target="_blank"
            className="flex items-center gap-2 text-[var(--color-text-base)] hover:text-[var(--color-accent)] transition-colors"
          >
            <Linkedin size={20} /> @yasin-aram-bash
          </a>
        </div>

      </div>

      {/* Contact Form */}
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-field"
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-field"
        />
        <textarea
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="input-field h-32"
        />

        {status && (
          <p
            className={`text-sm ${
              status.type === 'success' ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {status.text}
          </p>
        )}

        <button
          type="submit"
          className="bg-[var(--color-accent)] hover:opacity-90 text-[var(--color-bg)] font-semibold py-2 px-4 rounded transition duration-200"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}