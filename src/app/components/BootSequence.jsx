'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function IntroSequence({ onComplete }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onComplete?.();
    }, 3200); // total intro duration (3.2s)
    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col justify-center items-center bg-neutral-950">
      {/* Hero Text */}
      <motion.h1
        className="text-6xl sm:text-7xl md:text-8xl font-extrabold text-cyan-400 tracking-wide relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        SINTOPIA
        {/* Subtle shimmer effect */}
        <motion.span
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white via-white/50 to-white/0 opacity-20 pointer-events-none"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ repeat: 0, duration: 1.2, delay: 0.8, ease: 'easeInOut' }}
        />
      </motion.h1>

      <motion.p
        className="mt-4 text-lg sm:text-xl text-gray-300"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8, ease: 'easeOut' }}
      >
        Coding, writing, and chaos
      </motion.p>
    </div>
  );
}
