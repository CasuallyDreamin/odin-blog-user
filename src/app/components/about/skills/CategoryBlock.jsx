'use client';
import SkillChip from './SkillChip';
import './CategoryBlock.tailwind.css';

export default function CategoryBlock({ title, items }) {
  return (
    <div className="category-block">
      <h4 className="category-title">{title}</h4>
      <div className="category-chips">
        {items.map((item, idx) => (
          <SkillChip key={idx} name={item.name} />
        ))}
      </div>
    </div>
  );
}
