'use client';

import SectionHeader from '../components/SectionHeader';

export default function LabPage() {
  return (
    <div className="homepage-container">
      <SectionHeader title="Lab" />
      <p className="post-preview">Placeholder for experimental projects and code experiments.</p>
      <a href="/projects" className="submit-button mt-4 inline-block">View Projects</a>
    </div>
  );
}
