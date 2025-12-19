'use client';
import { motion } from 'framer-motion';
import './SkillChip.tailwind.css';

export default function SkillChip({ name }) {
  return (
    <motion.span
      className="skill-chip"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.15 }}
    >
      {name}
    </motion.span>
  );
}
