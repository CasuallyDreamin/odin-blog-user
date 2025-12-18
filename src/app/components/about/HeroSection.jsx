'use client';
import './HeroSection.tailwind.css';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="hero-section">
      <motion.h1
        className="hero-title"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        I build systems, stories, and tools —
        <br />
        usually at the intersection of logic and meaning.
      </motion.h1>

      <motion.p
        className="hero-subtitle"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
      >
        I’m Yasin. A developer who thinks in structures, questions assumptions,
        and uses code as a way to explore ideas — not just ship features.
      </motion.p>

      <motion.p
        className="hero-text"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
      >
        My work moves between software engineering, game systems, and narrative design.
        I care about <em>why</em> things exist as much as <em>how</em> they work.
        Clean abstractions, honest constraints, and ideas that don’t dissolve under pressure.
      </motion.p>

      <motion.p
        className="hero-anchor"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
      >
        This page isn’t a résumé. It’s a map of how I think.
      </motion.p>
    </section>
  );
}
