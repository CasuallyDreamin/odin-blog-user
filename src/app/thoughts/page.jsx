'use client';

import SectionHeader from '../components/SectionHeader';

export default function ThoughtsPage() {
  return (
    <div className="homepage-container">
      <SectionHeader title="Thoughts" />
      <p className="post-preview">Placeholder for musings, philosophy, and experiments.</p>
      <a href="/posts" className="submit-button mt-4 inline-block">Go to Blog</a>
    </div>
  );
}
