'use client';

import { motion } from 'framer-motion';

export default function RouteTransition({ children }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className="flex-1"
    >
      {children}
    </motion.main>
  );
}
