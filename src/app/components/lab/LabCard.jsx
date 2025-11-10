'use client';

import React from 'react';
import '../../../styles/components/labcard.tailwind.css';

export default function LabCard({ project }) {
  if (!project) return null;

  return (
    <div className="lab-card group">
      {project.image && (
        <img
          src={project.image}
          alt={project.title}
          className="lab-card-image"
        />
      )}
      <div className="lab-card-content">
        <h3 className="lab-card-title">{project.title}</h3>
        <p className="lab-card-description">{project.description}</p>

        <div className="lab-card-tags">
          {project.tags?.map((tag, idx) => (
            <span key={idx} className="lab-card-tag">{tag}</span>
          ))}
        </div>

        <div className="lab-card-links">
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="lab-card-link">
              Demo
            </a>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="lab-card-link">
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
