'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import api from '../../../lib/api';
import Article from '../../components/posts/Article';
import CommentForm from '../../components/posts/CommentForm';
import CommentList from '../../components/posts/CommentList';
import '../../../styles/pages/postpage.tailwind.css';

export default function PostPage() {
  const { id } = useParams();
  const router = useRouter();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', comment: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await api.get(`/posts/${id}`);
        const postData = res.data;

        if (!postData || !postData.published) {
          router.push('/');
          return;
        }

        setPost(postData);
        setComments(postData.comments || []);
      } catch (err) {
        console.error('Failed to fetch post:', err);
        setError('Failed to load post. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [id, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!post?.id) return;
    if (!formData.name.trim() || !formData.comment.trim()) return;

    try {
      const res = await api.post('/comments', {
        postId: post.id,
        author: formData.name.trim(),
        authorEmail: formData.email.trim() || null,
        body: formData.comment.trim(),
      });

      setComments([...comments, res.data]);
      setFormData({ name: '', email: '', comment: '' });
    } catch (err) {
      console.error('Failed to post comment:', err.response?.data || err.message);
      alert('Could not submit comment. Try again.');
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
