'use client';
import CategoryBlock from './CategoryBlock';
import './DomainBlock.tailwind.css';

export default function DomainBlock({ domain }) {
  return (
    <section className="domain-block">
      <h3 className="domain-title">{domain.domain}</h3>

      <div className="domain-categories">
        {domain.categories.map((category, idx) => (
          <CategoryBlock
            key={idx}
            title={category.name}
            items={category.items}
          />
        ))}
      </div>
    </section>
  );
}
