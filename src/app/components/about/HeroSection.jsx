'use client';
import './HeroSection.tailwind.css';
import { motion } from 'framer-motion';
export default function HeroSection() {
  return (
    <section className="hero-field">
      <img
        className="hero-bg"
        src="/assets/system-bg.gif"
      />

      <div className="hero-noise" />

      <motion.div
        className="hero-core"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h1 className="hero-title">
          I build systems
          <br />
          that think.
        </h1>

        <p className="hero-subtitle">
          Code. Games. Narratives.
          <br />
          Structures under pressure.
        </p>
      </motion.div>
    </section>
  );
}
