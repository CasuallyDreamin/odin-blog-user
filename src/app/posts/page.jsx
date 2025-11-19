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
  const [sortOrder, setSortOrder] = useState('desc');

  // full unfiltered lists
  const [allCategories, setAllCategories] = useState([]);
  const [allTags, setAllTags] = useState([]);

  // Listen to global search from Navbar
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
        const res = await api.get('/posts', { params: { sort: sortOrder } });
        if (!mounted) return;

        const normalized = (res.data.posts || [])
          .filter(p => p.published)
          .map(p => ({
            ...p,
            tags: (p.tags || []).map(t => (typeof t === 'string' ? t : t?.name || String(t))),
            categories: p.categories || [],
          }));

        if (!mounted) return;
        setPosts(normalized);

        // Extract full category/tag lists from all posts
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
  }, [sortOrder]);

  // filtered posts based on search + selected filters
  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      const postCategories = (p.categories || []).map(c => c.name.toLowerCase());
      const postTags = (p.tags || []).map(t => t.toLowerCase());
      const search = searchTerm.toLowerCase();

      const matchSearch =
        !searchTerm ||
        p.title.toLowerCase().includes(search) ||
        postCategories.some(c => c.includes(search)) ||
        postTags.some(t => t.includes(search));

      const matchCategory =
        selectedCategories.length === 0 ||
        selectedCategories.some(c => postCategories.includes(c.toLowerCase()));

      const matchTag =
        selectedTags.length === 0 ||
        selectedTags.some(t => postTags.includes(t.toLowerCase()));

      return matchSearch && matchCategory && matchTag;
    });
  }, [posts, searchTerm, selectedCategories, selectedTags]);

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

      {filteredPosts.length === 0 ? (
        <p className="text-gray-500 mt-8">No posts match your filters.</p>
      ) : (
        <ul className="posts-grid">
          {filteredPosts.map(post => (
            <PostCard key={post.id} post={post} onClick={() => handlePostClick(post)} />
          ))}
        </ul>
      )}
    </motion.div>
  );
}
