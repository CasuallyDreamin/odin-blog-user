'use client';
import './SkillsSection.tailwind.css';
import SkillCard from './SkillCard';

export default function SkillsSection() {
  const skills = [
    { name: 'JavaScript', level: 'Advanced' },
    { name: 'Python', level: 'Advanced' },
    { name: 'Next.js', level: 'Intermediate' },
    // add more skills here
  ];

  return (
    <section className="skills-section">
      <h2 className="section-title">Skills</h2>
      <div className="skills-grid">
        {skills.map((skill, idx) => (
          <SkillCard key={idx} skill={skill} />
        ))}
      </div>
    </section>
  );
}
