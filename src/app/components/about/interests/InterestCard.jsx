'use client';
import { motion } from 'framer-motion';
import './InterestCard.tailwind.css';

export default function InterestCard({ interest, delay = 0 }) {
  return (
    <motion.span
      className="interest-card"
      title={interest.notes || ''}
      initial={{ opacity: 0, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-40px' }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1], delay }}
      whileHover={{
        borderColor: 'hsl(180, 80%, 50%)',
        boxShadow: '0 4px 4px hsl(180, 80%, 50% / 0.5)',
        transition: { duration: 0.15, ease: 'easeOut' },
      }}
    >
      {interest.name}
    </motion.span>
  );
}
