'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import IntroSequence from './components/BootSequence';
import PostCard from './components/posts/PostCard';
import PinnedPostCard from './components/posts/PinnedPostCard';
import QuoteCard from './components/thoughts/QuoteCard';
import api from './lib/api';
import '../styles/pages/homepage.tailwind.css';

export default function HomePage() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [pinnedPost, setPinnedPost] = useState(null);
  const [quote, setQuote] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showIntro, setShowIntro] = useState(false);

  // search state
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem('seenIntro');
    setShowIntro(!hasSeenIntro);

    if (hasSeenIntro) fetchData();

    // Listen to global search from Navbar
    const handleGlobalSearch = (e) => setSearchTerm(e.detail ?? '');
    window.addEventListener('globalSearch', handleGlobalSearch);
    return () => window.removeEventListener('globalSearch', handleGlobalSearch);
  }, []);

  const fetchData = async () => {
    try {
      const resPosts = await api.get('/posts');
      const publishedPosts = (resPosts.data.posts || []).filter(p => p.published);

      setPinnedPost(publishedPosts.find(p => p.layout?.pinned) || null);
      setPosts(publishedPosts.filter(p => !p.layout?.pinned));

      const resSettings = await api.get('/settings');
      setQuote(resSettings.data.quote || '');
    } catch (err) {
      console.error(err);
      setError('Failed to load homepage data.');
    } finally {
      setLoading(false);
    }
  };

  const handleIntroComplete = async () => {
    sessionStorage.setItem('seenIntro', 'true');
    setShowIntro(false);
    await fetchData();
  };

  const handlePostClick = (id) => router.push(`/posts/${id}`);

  const filteredPosts = useMemo(() => {
  if (!searchTerm) return posts;
  const term = searchTerm.toLowerCase();
  return posts.filter(p => 
    p.title.toLowerCase().includes(term) ||
    (p.category?.toLowerCase?.().includes(term)) ||
    (p.tags?.some(t => String(t).toLowerCase().includes(term)))
  );
}, [posts, searchTerm]);


  if (showIntro) return <IntroSequence onComplete={handleIntroComplete} />;
  if (loading) return <div className="loading"></div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="homepage-container">
      <h1 className="hero">SINTOPIA</h1>
      <section className="hero-subtitle">
        <p>Coding, writing, and chaos</p>
      </section>

      {pinnedPost && (
        <section className="pinned-post-section">
          <h2 className="section-title">Important</h2>
          <PinnedPostCard post={pinnedPost} onClick={handlePostClick} />
        </section>
      )}

      <section className="posts-grid-section">
        <h2 className="section-title">Latest Posts</h2>
        {filteredPosts.length === 0 ? (
          <p className="text-gray-500">No posts match your search.</p>
        ) : (
          <ul className="posts-grid">
            {filteredPosts.map(post => (
              <PostCard key={post.id} post={post} onClick={handlePostClick} />
            ))}
          </ul>
        )}
      </section>

      <QuoteCard quote={quote} />
    </div>
  );
}
