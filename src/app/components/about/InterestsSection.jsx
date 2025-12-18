'use client';
import './InterestsSection.tailwind.css';
import InterestCard from './InterestCard';

export default function InterestsSection() {
  const interests = [
    { name: 'Gaming' },
    { name: 'Mythology' },
    { name: 'Metal Music' },
  ];

  return (
    <section className="interests-section">
      <h2 className="section-title">Interests</h2>
      <div className="interests-grid">
        {interests.map((interest, idx) => (
          <InterestCard key={idx} interest={interest} />
        ))}
      </div>
    </section>
  );
}
