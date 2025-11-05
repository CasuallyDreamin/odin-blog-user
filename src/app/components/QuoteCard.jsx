'use client';

export default function QuoteCard({ quote }) {
  if (!quote) return null;
  return (
    <section className="quote-section">
      <div className="quote-card">
        <p className="quote-text">{quote}</p>
      </div>
    </section>
  );
}
