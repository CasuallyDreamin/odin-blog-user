'use client';

import SectionHeader from '../components/SectionHeader';

export default function ArchivePage() {
  return (
    <div className="homepage-container">
      <SectionHeader title="Archive" />
      <p className="post-preview">Placeholder archive page. List past posts or categories here.</p>
      <a href="/posts" className="submit-button mt-4 inline-block">Go to Posts</a>
    </div>
  );
}
