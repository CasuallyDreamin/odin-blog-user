'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import api from '../../lib/api';
import PostCard from '../components/PostCard';
import './posts.tailwind.css';

export default function PostsPage() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await api.get('/posts');
        const publishedPosts = (res.data.posts || []).filter(p => p.published);

        // Sort latest first
        publishedPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setPosts(publishedPosts);
      } catch (err) {
        console.error('Failed to fetch posts:', err);
        setError('Failed to load posts.');
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  const handlePostClick = (id) => router.push(`/posts/${id}`);

  if (loading) return <div className="loading">Loading posts...</div>;
  if (error) return <div className="error">{error}</div>;
  if (posts.length === 0) return <div className="text-gray-500">No posts yet.</div>;

  return (
    <motion.div
      className="posts-page-container max-w-5xl mx-auto px-4 py-8 space-y-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="section-title text-cyan-400 text-4xl">All Posts</h1>

      <ul className="posts-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(post => (
          <PostCard key={post.id} post={post} onClick={handlePostClick} />
        ))}
      </ul>
    </motion.div>
  );
}
