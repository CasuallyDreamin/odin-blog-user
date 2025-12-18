'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import api from '../../lib/api';
import Article from '../../components/posts/Article';
import CommentForm from '../../components/posts/CommentForm';
import CommentList from '../../components/posts/CommentList';
import '../../../styles/pages/postpage.tailwind.css';

export default function PostPage() {
  const { slug } = useParams();
  const router = useRouter();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', comment: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await api.get(`/posts/${slug}`); 
        const postData = res.data;

        if (!postData || !postData.published || !postData.content) {
          router.push('/');
          return;
        }

        setPost(postData);
        setComments((postData.comments || []).slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      } catch (err) {
        console.error('Failed to fetch post:', err);
        setError('Failed to load post. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [slug, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!post?.id) return;
    if (!formData.name.trim() || !formData.comment.trim()) {
      console.error('Comment submission failed: Name and comment are required.');
      return;
    }

    try {
      const res = await api.post('/comments', {
        postId: post.id,
        author: formData.name.trim(),
        authorEmail: formData.email.trim() || null,
        body: formData.comment.trim(),
      });

      setComments((currentComments) => [res.data, ...currentComments].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      setFormData({ name: '', email: '', comment: '' });
    } catch (err) {
      console.error('Failed to post comment:', err.response?.data || err.message);
    }
  };

  if (loading) return <div className="message"></div>;
  if (error) return <div className="error">{error}</div>;
  if (!post) return <div className="error">Post not found.</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className="post-container"
    >
      <button onClick={() => router.back()} className="back-button">
        &larr; Back to Home
      </button>

      <Article post={post} />

      <CommentForm formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} />
      <CommentList comments={comments} />
    </motion.div>
  );
}