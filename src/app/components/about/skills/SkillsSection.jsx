'use client';
import './SkillsSection.tailwind.css';
import DomainBlock from './DomainBlock';
import { skills } from '@/app/lib/constants';

export default function SkillsSection({ className }) {
  return (
    <section className={`skills-area-container ${className || ''}`}>
      <h2 className="section-title">Skills</h2>

      <div className="skills-domains">
        {skills.map((domain, idx) => (
          <DomainBlock key={idx} domain={domain} />
        ))}
      </div>
    </section>
  );
}