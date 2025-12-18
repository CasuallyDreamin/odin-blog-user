'use client';
import './SkillsSection.tailwind.css';
import SkillCard from './SkillCard';
import { skills as skillsData } from '@/app/lib/constants';

export default function SkillsSection() {
  return (
    <section className="skills-section">
      <h2 className="section-title">Skills</h2>
      <div className="skills-grid">
        {skillsData.map((domain, idx) => (
          <SkillCard key={idx} domain={domain} />
        ))}
      </div>
    </section>
  );
}
