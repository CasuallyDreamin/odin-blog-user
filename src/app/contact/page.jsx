'use client';

import SectionHeader from '../components/SectionHeader';

export default function ContactPage() {
  return (
    <div className="homepage-container">
      <SectionHeader title="Contact Me" />
      <p className="post-preview">Placeholder contact form or contact info goes here.</p>
      <a href="/" className="submit-button mt-4 inline-block">Back to Home</a>
    </div>
  );
}
