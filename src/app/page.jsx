'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import IntroSequence from './components/BootSequence';
import QuoteCard from './components/thoughts/QuoteCard';
import HeroSection from './components/home/HeroSection';
import SystemSnapshot from './components/home/SystemSnapshot';
import ActivitySection from './components/home/ActivitySection';
import DataSignal from './components/home/DataSignal';
import api from './lib/api';
import '../styles/pages/homepage.tailwind.css';

function getExcerptFromHtml(htmlContent, maxLength = 150) {
  if (!htmlContent) return '...';
  
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlContent;
  
  const textContent = tempDiv.textContent || tempDiv.innerText || '';
  const trimmedText = textContent.trim();
  
  return trimmedText.length > maxLength 
    ? trimmedText.substring(0, maxLength).trim() + '...'
    : trimmedText;
}

export default function HomePage() {
  const router = useRouter();
  const [quote, setQuote] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showIntro, setShowIntro] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem('seenIntro');
    setShowIntro(!hasSeenIntro);

    if (hasSeenIntro) fetchData();

    const handleGlobalSearch = (e) => setSearchTerm(e.detail ?? '');
    window.addEventListener('globalSearch', handleGlobalSearch);
    return () => window.removeEventListener('globalSearch', handleGlobalSearch);
  }, []);

  const fetchData = async () => {
    try {
      const resPosts = await api.get('/posts', { params: { page: 1, limit: 10, sort: 'desc', search: searchTerm } });
      const publishedPosts = (resPosts.data.posts || [])
        .filter(p => p.published)
        .map(p => ({
          ...p,
          excerpt: getExcerptFromHtml(p.content, 180)
        }));
      setPosts(publishedPosts);

      const resSettings = await api.get('/settings');
      setQuote(resSettings.data.quote || '');
    } catch (err) {
      console.error(err);
      setError('Failed to load homepage data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!showIntro) fetchData();
  }, [searchTerm]);

  const handleIntroComplete = async () => {
    sessionStorage.setItem('seenIntro', 'true');
    setShowIntro(false);
    await fetchData();
  };

  const handlePostClick = (post) => router.push(`/posts/${post.slug}`);
  const filteredPosts = posts;

  if (showIntro) return <IntroSequence onComplete={handleIntroComplete} />;
  if (loading) return <div className="loading"></div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="homepage-container space-y-16">
      <HeroSection />
      <SystemSnapshot />
      <ActivitySection posts={filteredPosts} onPostClick={handlePostClick} />
      <DataSignal stats={[
        { label: 'Posts', value: filteredPosts.length },
        { label: 'Quote', value: quote ? 1 : 0 }
      ]} />
      <QuoteCard quote={quote} />
    </div>
  );
}
