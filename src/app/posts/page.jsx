'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import api from '../lib/api';
import PostCard from '../components/posts/PostCard';
import FilterBar from '../components/FilterBar';
// Updated import path to centralized styles
import '../../styles/pages/postpage.tailwind.css'; 

/**
 * Utility function to extract a clean text excerpt from HTML content.
 */
function getExcerptFromHtml(htmlContent, maxLength = 150) {
  if (!htmlContent) return '...';
  
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlContent;
  
  const textContent = tempDiv.textContent || tempDiv.innerText || '';
  
  const trimmedText = textContent.trim();
  
  if (trimmedText.length > maxLength) {
    return trimmedText.substring(0, maxLength).trim() + '...';
  }
  return trimmedText;
}


export default function PostsPage() {
  const router = useRouter();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortOrder, setSortOrder] = useState('desc');

  const [allCategories, setAllCategories] = useState([]);
  const [allTags, setAllTags] = useState([]);

  useEffect(() => {
    const handleGlobalSearch = (e) => setSearchTerm(e.detail ?? '');
    window.addEventListener('globalSearch', handleGlobalSearch);
    return () => window.removeEventListener('globalSearch', handleGlobalSearch);
  }, []);

  useEffect(() => {
    let mounted = true;

    async function fetchPosts() {
      setLoading(true);
      try {
        const params = {
            sort: sortOrder,
            search: searchTerm,
            category: selectedCategories.join(','),
            tag: selectedTags.join(','),
        };

        Object.keys(params).forEach(key => (params[key] === '' || params[key] === undefined) && delete params[key]);

        const res = await api.get('/posts', { params });
        if (!mounted) return;

        const normalized = (res.data.posts || [])
          .filter(p => p.published)
          .map(p => ({
            ...p,
            tags: (p.tags || []).map(t => (typeof t === 'string' ? t : t?.name || String(t))),
            categories: p.categories || [],
            // Inject clean excerpt
            excerpt: getExcerptFromHtml(p.content, 180),
          }));

        if (!mounted) return;
        setPosts(normalized);

        const categoriesSet = new Set(normalized.flatMap(p => p.categories?.map(c => c.name) || []));
        const tagsSet = new Set(normalized.flatMap(p => p.tags || []));

        setAllCategories(Array.from(categoriesSet));
        setAllTags(Array.from(tagsSet));
      } catch (err) {
        console.error(err);
        if (!mounted) return;
        setError('Failed to load posts.');
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchPosts();
    return () => { mounted = false; };
  }, [sortOrder, searchTerm, selectedCategories, selectedTags]); 

  const filteredPosts = posts; 

  const handlePostClick = (post) => router.push(`/posts/${post.slug}`);

  if (loading) return <div className="loading">Loading posts...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <motion.div
      className="posts-page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28 }}
    >
      <header className="archive-header">
        <h1 className="archive-title">Posts</h1>
        <p className="archive-subtitle">Only the posts</p>
      </header>

      <FilterBar
        categories={allCategories}
        tags={allTags}
        selectedCategories={selectedCategories}
        selectedTags={selectedTags}
        onCategoryChange={setSelectedCategories}
        onTagChange={setSelectedTags}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
      />

      {posts.length === 0 ? (
        <p className="text-[var(--color-text-muted)] mt-8">No posts match your filters.</p>
      ) : (
        <ul className="posts-grid">
          {posts.map(post => (
            <PostCard key={post.id} post={post} onClick={() => handlePostClick(post)} />
          ))}
        </ul>
      )}
    </motion.div>
  );
}