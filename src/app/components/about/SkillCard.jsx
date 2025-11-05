'use client';
import './SkillCard.tailwind.css';
import { motion } from 'framer-motion';

export default function SkillCard({ skill }) {
  return (
    <motion.div
      className="skill-card"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <h3 className="skill-name">{skill.name}</h3>
      <p className="skill-level">{skill.level}</p>
    </motion.div>
  );
}
