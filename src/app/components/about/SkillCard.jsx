'use client';
import './SkillCard.tailwind.css';
import { motion } from 'framer-motion';

export default function SkillCard({ domain }) {
  return (
    <motion.div
      className="skill-card"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <h3 className="skill-domain">{domain.domain}</h3>
      <ul className="skill-items">
        {domain.items.map((item, idx) => (
          <li key={idx} className="skill-item">
            <span className="skill-name">{item.skill}</span> — <span className="skill-desc">{item.description}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
