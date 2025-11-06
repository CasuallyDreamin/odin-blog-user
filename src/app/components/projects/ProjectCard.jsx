'use client';
import './ProjectCard.tailwind.css';
import { motion } from 'framer-motion';

export default function ProjectCard({ title, description, techStack, link, image }) {
  return (
    <motion.div
      className="project-card"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      {image && <img src={image} alt={title} className="project-image" />}
      <h3 className="project-title">{title}</h3>
      <p className="project-description">{description}</p>
      {techStack && (
        <div className="tech-stack">
          {techStack.map((tech, idx) => (
            <span key={idx} className="tech-item">{tech}</span>
          ))}
        </div>
      )}
      {link && (
        <a href={link} target="_blank" rel="noopener noreferrer" className="project-link">
          View Project
        </a>
      )}
    </motion.div>
  );
}
