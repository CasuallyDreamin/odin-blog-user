'use client';

import { useState } from 'react';
import api from '../lib/api';
import { Mail, Github, Twitter, Linkedin } from 'lucide-react';
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
        <h1 className="text-3xl font-bold text-cyan-400 mb-4">Contact Me</h1>
        <p className="text-gray-300 mb-4">
          Got questions, ideas, or just want to say hi? Send me a message using the form below.
        </p>
        <p className="text-gray-400">
          I usually reply within a couple of days. You can also reach out via social media:
        </p>
        <div className="flex flex-col gap-3 mt-4">
          <a
            href="mailto:your@email.com"
            target="_blank"
            className="flex items-center gap-2 text-gray-300 hover:text-cyan-400"
          >
            <Mail size={20} /> your@email.com
          </a>
          <a
            href="https://github.com/yourusername"
            target="_blank"
            className="flex items-center gap-2 text-gray-300 hover:text-cyan-400"
          >
            <Github size={20} /> @yourusername
          </a>
          <a
            href="https://twitter.com/yourusername"
            target="_blank"
            className="flex items-center gap-2 text-gray-300 hover:text-cyan-400"
          >
            <Twitter size={20} /> @yourusername
          </a>
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            className="flex items-center gap-2 text-gray-300 hover:text-cyan-400"
          >
            <Linkedin size={20} /> @yourusername
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
          className="input-field h-32 resize-none"
        />

        {status && (
          <p
            className={`${
              status.type === 'success' ? 'text-green-400' : 'text-red-400'
            } text-sm`}
          >
            {status.text}
          </p>
        )}

        <button
          type="submit"
          className="bg-cyan-400 hover:bg-cyan-500 text-black font-semibold py-2 px-4 rounded transition duration-200"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}
