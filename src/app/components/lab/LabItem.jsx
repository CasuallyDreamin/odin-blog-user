'use client';

import { motion } from 'framer-motion';

export default function LabItem({ project, index }) {
  return (
    <motion.div
      className="lab-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
    >
      <h3 className="lab-card-title">{project.title}</h3>
      <p className="lab-card-desc">{project.description}</p>

      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="lab-card-link"
        >
          View More →
        </a>
      )}
    </motion.div>
  );
}
