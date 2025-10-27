'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '../lib/api';
import './homepage.tailwind.css';

export default function HomePage() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [pinnedPost, setPinnedPost] = useState(null);
  const [quote, setQuote] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showIntro, setShowIntro] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem('seenIntro');
    setShowIntro(!hasSeenIntro);

    async function fetchData() {
      try {
        const resPosts = await api.get('/posts');
        const publishedPosts = (resPosts.data.posts || []).filter(p => p.published);

        const pinned = publishedPosts.find(p => p.layout?.pinned) || null;
        const latestPosts = publishedPosts
          .filter(p => !p.layout?.pinned)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setPinnedPost(pinned);
        setPosts(latestPosts);

        const resSettings = await api.get('/settings');
        setQuote(resSettings.data.quote || '');
      } catch (err) {
        console.error(err);
        setError('Failed to load homepage data.');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handlePostClick = (id) => {
    setTransitioning(true);
    setTimeout(() => router.push(`/post/${id}`), 400);
  };
  // loading animation section
  if (loading) return <div className="loading"></div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <AnimatePresence mode="wait">
      {showIntro ? (
        <IntroSequence onComplete={() => {
          sessionStorage.setItem('seenIntro', 'true');
          setShowIntro(false);
        }} />
      ) : (
        !transitioning && (
        <motion.div
          className="homepage-container"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          <h1 className="hero">SINTOPIA</h1>
          <section className="hero-subtitle">
            <p>Coding, writing, and chaos</p>
          </section>

          {pinnedPost && (
            <section className="pinned-post-section">
              <h2 className="section-title">📌 Important</h2>
              <div
                className="pinned-post-card"
                onClick={() => handlePostClick(pinnedPost.id)}
              >
                <h3 className="post-title">{pinnedPost.title}</h3>
                <p className="post-meta">
                  {pinnedPost.categories.map(c => c.name).join(', ')} •{' '}
                  {new Date(pinnedPost.createdAt).toLocaleDateString()}
                </p>
                <p className="post-preview">{pinnedPost.layout?.div?.p || 'No preview available'}</p>
              </div>
            </section>
          )}

          <section className="posts-grid-section">
            <h2 className="section-title">Latest Posts</h2>
            {posts.length === 0 ? (
              <p className="text-gray-500">No posts yet.</p>
            ) : (
              <ul className="posts-grid">
                {posts.map((post) => (
                  <li
                    key={post.id}
                    className="post-card"
                    onClick={() => handlePostClick(post.id)}
                  >
                    <h3 className="post-title">{post.title}</h3>
                    <p className="post-meta">
                      {post.categories.map(c => c.name).join(', ')} •{' '}
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                    <p className="post-preview">{post.layout?.div?.p || 'No preview available'}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {quote && (
            <section className="quote-section">
              <div className="quote-card">
                <p className="quote-text">{quote}</p>
              </div>
            </section>
          )}
        </motion.div>
        )
      )}
    </AnimatePresence>
  );
}

// ---------------- Intro Sequence ----------------
function IntroSequence({ onComplete }) {
  const letters = [...'SINTOPIA'];

  return (
    <div className="logo-animation-container">
      {letters.map((letter, i) => (
        <div key={i} className="letter">
          <motion.div
            className="line line-horizontal"
            initial={{ width: 0, x: i % 2 === 0 ? '-100%' : '100%' }}
            animate={{ width: '100%', x: 0 }}
            transition={{ delay: i * 0.15, duration: 0.4, ease: 'easeInOut' }}
          />
          <motion.div
            className="line line-vertical"
            initial={{ height: 0, y: i % 2 === 0 ? '-100%' : '100%' }}
            animate={{ height: '100%', y: 0 }}
            transition={{ delay: 0.1 + i * 0.15, duration: 0.4, ease: 'easeInOut' }}
          />
          <motion.span
            className="intro-letter flicker"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.12, duration: 0.2 }}
          >
            {letter}
          </motion.span>
        </div>
      ))}

      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: letters.length * 0.15 + 0.4, duration: 0.3 }}
        onAnimationComplete={onComplete}
      />
    </div>
  );
}