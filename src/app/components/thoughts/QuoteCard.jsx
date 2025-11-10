'use client';

import { motion } from 'framer-motion';
import '../../../styles/components/quotecard.tailwind.css';

export default function QuoteCard({ quote }) {
  if (!quote) return null;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="quote-card"
    >
      <p className="quote-text">“{quote}”</p>
    </motion.div>
  );
}
