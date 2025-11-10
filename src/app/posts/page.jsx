'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import api from '../lib/api';
import PostCard from '../components/posts/PostCard';
import FilterBar from '../components/FilterBar';
import './posts.tailwind.css';

export default function PostsPage() {
  const router = useRouter();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    let mounted = true;
    async function fetchPosts() {
      try {
        const res = await api.get('/posts');
        const published = (res.data.posts || []).filter(p => p.published);

        const normalized = published.map(p => ({
          ...p,
          tags: (p.tags || []).map(t => (typeof t === 'string' ? t : t?.name || String(t))),

          category: typeof p.category === 'string' ? p.category : p.category?.name || 'Uncategorized',
        }));

        normalized.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        if (!mounted) return;
        setPosts(normalized);
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
  }, []);

  const categories = useMemo(() => {
    const set = new Set(posts.map(p => p.category || 'Uncategorized'));
    return Array.from(set);
  }, [posts]);

  const tags = useMemo(() => {
    const set = new Set(posts.flatMap(p => p.tags || []));
    return Array.from(set);
  }, [posts]);

  const filteredPosts = useMemo(() => {
  
  return posts.filter((p) => {
    const category = p.category?.toLowerCase?.() || '';
    const tags = (p.tags || []).map(t => t.toLowerCase());

    const selectedCatsLower = selectedCategories.map(c => c.toLowerCase());
    const selectedTagsLower = selectedTags.map(t => t.toLowerCase());

    const matchSearch =
      !searchTerm ||
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.includes(searchTerm.toLowerCase()) ||
      tags.some(tag => tag.includes(searchTerm.toLowerCase()));


    const matchCategory =
      selectedCatsLower.length === 0 ||
      selectedCatsLower.includes(category);

    const matchTag =
      selectedTagsLower.length === 0 ||
      tags.some(tag => selectedTagsLower.includes(tag));

    const passes = matchSearch && matchCategory && matchTag;

    return passes;
  });
}, [posts, selectedCategories, selectedTags, searchTerm]);



  const handlePostClick = (id) => router.push(`/posts/${id}`);

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
        <h1 className="archive-title">The Archives</h1>
        <p className="archive-subtitle">Every post, across time and thought.</p>
      </header>

      <FilterBar
        tags={tags}
        categories={categories}
        selectedTags={selectedTags}
        selectedCategories={selectedCategories}
        onTagChange={setSelectedTags}
        onCategoryChange={setSelectedCategories}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      {filteredPosts.length === 0 ? (
        <p className="text-gray-500 mt-8">No posts match your filters.</p>
      ) : (
        <ul className="posts-grid">
          {filteredPosts.map(post => (
            <PostCard key={post.id} post={post} onClick={handlePostClick} />
          ))}
        </ul>
      )}
    </motion.div>
  );
}
