'use client';
import InterestCard from './InterestCard';
import './DomainBlock.tailwind.css';

export default function DomainBlock({ domain }) {
  return (
    <section className="domain-block">
      <h3 className="domain-title">{domain.domain}</h3>

      <div className="domain-items">
        {domain.items.map((item, idx) => (
          <InterestCard
            key={idx}
            interest={item}
            delay={idx * 0.08}
          />
        ))}
      </div>
    </section>
  );
}
