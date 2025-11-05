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
        About Me
      </motion.h1>
      <motion.p
        className="hero-subtitle"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
      >
        A little insight into my journey, philosophy, and skills
      </motion.p>
    </section>
  );
}
