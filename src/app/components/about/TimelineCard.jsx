'use client';
import './TimelineCard.tailwind.css';

export default function TimelineCard({ title, description, year }) {
  return (
    <div className="timeline-card p-4 bg-neutral-800 rounded-lg shadow-md max-w-sm">
      <h3 className="timeline-card-title">{title}</h3>
      <p className="timeline-card-description">{description}</p>
      <span className="timeline-card-year">{year}</span>
    </div>
  );
}
