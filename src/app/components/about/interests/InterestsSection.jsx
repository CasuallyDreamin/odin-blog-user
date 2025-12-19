'use client';
import './InterestsSection.tailwind.css';
import DomainBlock from './DomainBlock';
import { interests } from '@/app/lib/constants';

export default function InterestsSection({ className }) {
  return (
    <section className={`skills-section ${className || ''}`}>
      <h2 className="section-title">Interests</h2>

      <div className="interests-domains">
        {interests.map((domain, idx) => (
          <DomainBlock key={idx} domain={domain} />
        ))}
      </div>
    </section>
  );
}
