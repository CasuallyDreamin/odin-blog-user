export default function InterestsSection({ className }) {
  return (
    <section className={`interests-section ${className || ''}`}>
      <h2 className="section-title">Interests</h2>
      <div className="interests-domains">
        {interests.map((domain, idx) => (
          <DomainBlock key={idx} domain={domain} />
        ))}
      </div>
    </section>
  );
}