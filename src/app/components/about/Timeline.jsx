'use client';
import './Timeline.tailwind.css';
import TimelineCard from './TimelineCard';

export default function Timeline({ items }) {
  return (
    <section className="timeline-section max-w-4xl mx-auto px-4 py-16 relative">
      <div
        className="timeline-line absolute left-1/2 top-0 w-1 h-full transform -translate-x-1/2"
        style={{ backgroundColor: 'var(--color-primary)' }}
      />

      <div className="timeline-items space-y-12">
        {items.map((item, idx) => {
          const isLeft = idx % 2 === 0;

          return (
            <div
              key={idx}
              className={`timeline-item flex w-full relative ${isLeft ? 'justify-start' : 'justify-end'}`}
            >

              <div
                className="timeline-point w-4 h-4 rounded-full absolute left-1/2 transform -translate-x-1/2 top-2 z-10"
                style={{ backgroundColor: 'var(--color-primary)' }}
              />

              <div
                className={`timeline-trunk absolute top-4 z-0`}
                style={{
                  left: '50%',
                  width: '1px',
                  height: '100%',
                  backgroundColor: 'var(--color-primary)',
                  transform: 'translateX(-50%)',
                }}
              />

              <div className={`timeline-card-wrapper ${isLeft ? 'ml-8' : 'mr-8'}`}>
                <TimelineCard {...item} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
