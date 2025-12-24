'use client';
import './ProjectCard.tailwind.css';
import { motion } from 'framer-motion';

export default function ProjectCard({ title, description, techStack, link, image }) {
  return (
    <motion.div
      className="project-card flex flex-col"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      {image && <img src={image} alt={title} className="project-image" />}

      <h3 className="project-title">{title}</h3>

      {/* Description grows */}
      <p className="project-description flex-grow">
        {description}
      </p>

      {/* Tech stack has fixed vertical rhythm */}
      <div className="tech-stack-wrapper">
        {techStack && (
          <div className="tech-stack">
            {techStack.map((tech, idx) => (
              <span key={idx} className="tech-item">
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* CTA always last */}
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="project-button"
        >
          View Project
        </a>
      )}
    </motion.div>
  );
}
