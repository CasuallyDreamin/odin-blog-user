'use client';

export default function NotFoundPage() {
  return (
    <div className="homepage-container text-center">
      <h1 className="hero-title">404</h1>
      <p className="post-preview text-[var(--color-text-muted)]">Page not found.</p>
      <a 
        href="/" 
        className="submit-button mt-4 inline-block 
          bg-[var(--color-accent)] text-[var(--color-bg)] 
          hover:opacity-80 transition-opacity duration-200"
      >
        Back to Home
      </a>
    </div>
  );
}