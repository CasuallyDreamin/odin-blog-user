'use client';
import { motion } from 'framer-motion';
import './SkillChip.tailwind.css';

export default function SkillChip({ name, delay = 0 }) {
  return (
    <motion.span
      className="skill-chip"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, margin: '-40px' }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1], delay }}
      whileHover={{
        backgroundColor: 'hsl(180, 60%, 12%)',
        borderColor: 'hsl(180, 80%, 50%)',
        boxShadow: '0 4px 4px hsl(180, 80%, 50% / 0.5)',
        transition: { duration: 0.15, ease: 'easeOut' },
      }}
    >
      {name}
    </motion.span>
  );
}
