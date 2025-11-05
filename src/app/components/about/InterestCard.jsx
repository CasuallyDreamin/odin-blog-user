'use client';
import './InterestCard.tailwind.css';
import { motion } from 'framer-motion';

export default function InterestCard({ interest }) {
  return (
    <motion.div
      className="interest-card"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      {interest.name}
    </motion.div>
  );
}
