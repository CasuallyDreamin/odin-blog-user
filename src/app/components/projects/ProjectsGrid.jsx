'use client';
import './ProjectsGrid.tailwind.css';
import ProjectCard from './ProjectCard';

export default function ProjectsGrid({ projects }) {
  return (
    <section className="projects-grid-section">
      <div className="projects-grid">
        {projects.map((proj, idx) => (
          <ProjectCard key={idx} {...proj} />
        ))}
      </div>
    </section>
  );
}
