'use client';

import React from 'react';
import LabCard from './LabCard';
import '../../../styles/components/labsection.tailwind.css';

export default function LabSection({ title, projects }) {
  if (!projects || !projects.length) return null;

  return (
    <section className="lab-section">
      <h2 className="lab-section-title">{title}</h2>
      <div className="lab-section-grid">
        {projects.map((project) => (
          <LabCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
