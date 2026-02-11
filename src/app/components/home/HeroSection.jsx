'use client';

import { motion } from 'framer-motion';
import { heroFade, idlePulse } from './home.motion';
import '@/styles/components/home/HeroSection.tailwind.css';

export default function HeroSection({ 
  title = 'SINTOPIA', 
  subtitle = 'Coding, writing, and chaos',
  gifUrl = '/assets/system-bg.gif' 
}) {
  return (
    <section className="hero-section">
      <img 
        src={gifUrl} 
        alt="" 
        className="hero-background-gif" 
      />

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