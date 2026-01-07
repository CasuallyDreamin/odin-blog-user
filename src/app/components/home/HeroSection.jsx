'use client';

import { motion } from 'framer-motion';
import { heroFade, idlePulse } from './home.motion';
import '../styles/components/HeroSection.tailwind.css';

export default function HeroSection({ title = 'SINTOPIA', subtitle = 'Coding, writing, and chaos' }) {
  return (
    <section className="hero-section">
      <motion.h1
        className="hero-title"
        variants={heroFade}
        initial="hidden"
        animate="visible"
      >
        {title}
      </motion.h1>

      <motion.p
        className="hero-subtitle"
        variants={heroFade}
        initial="hidden"
        animate="visible"
        {...idlePulse}
      >
        {subtitle}
      </motion.p>
    </section>
  );
}
