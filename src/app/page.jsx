'use client';

import { useState, useEffect, useCallback } from 'react';
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showIntro, setShowIntro] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [quote, setQuote] = useState('');
  const [latestPost, setLatestPost] = useState(null);
  const [latestProject, setLatestProject] = useState(null);
  const [postCount, setPostCount] = useState(0);

  const fetchData = useCallback(async () => {
    try {
      const [resPosts, resProjects, resSettings] = await Promise.all([
        api.get('/posts', { params: { page: 1, limit: 10, sort: 'desc', search: searchTerm } }),
        api.get('/projects', { params: { limit: 1, sort: 'desc' } }),
        api.get('/settings')
      ]);

      const allPosts = resPosts.data.posts || [];
      const publishedPosts = allPosts.filter(p => p.published);
      
      if (publishedPosts.length > 0) {
        setLatestPost({
          ...publishedPosts[0],
          excerpt: getExcerptFromHtml(publishedPosts[0].content, 180)
        });
      }

      setPostCount(publishedPosts.length);
      setLatestProject(resProjects.data.projects?.[0] || null);
      setQuote(resSettings.data.quote || '');
    } catch (err) {
      console.error(err);
      setError('Failed to load homepage data.');
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem('seenIntro');
    setShowIntro(!hasSeenIntro);
    if (hasSeenIntro) fetchData();

    const handleGlobalSearch = (e) => setSearchTerm(e.detail ?? '');
    window.addEventListener('globalSearch', handleGlobalSearch);
    return () => window.removeEventListener('globalSearch', handleGlobalSearch);
  }, [fetchData]);

  useEffect(() => {
    if (!showIntro) fetchData();
  }, [showIntro, fetchData]);

  const handleIntroComplete = async () => {
    sessionStorage.setItem('seenIntro', 'true');
    setShowIntro(false);
  };

  if (showIntro) return <IntroSequence onComplete={handleIntroComplete} />;
  if (loading) return <div className="loading"></div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="homepage-container space-y-16">
      <HeroSection />
      <SystemSnapshot />
      
      <ActivitySection 
        post={latestPost}
        project={latestProject}
        quote={quote}
        onPostClick={(post) => router.push(`/posts/${post.slug}`)}
        onProjectClick={(project) => router.push(`/projects/${project.slug}`)}
      />

      <DataSignal stats={[
        { label: 'Network_Posts', value: postCount },
        { label: 'Active_Quote', value: quote ? 1 : 0 }
      ]} />
      
      <QuoteCard quote={quote} />
    </div>
  );
}