'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import api from '../../../lib/api';
import './page.tailwind.css';

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

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

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

  // --- loading control ---
   if (loading) return <div className="message"></div>;
  if (error) return <div className="error">{error}</div>;
  if (!post) return <div className="error">Post not found.</div>;

  return (
    <motion.div
      className="post-container"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <button onClick={() => router.back()} className="back-button">
        &larr; Back to Home
      </button>

      <article className="article">
        <h1 className="article-title">{post.title}</h1>
        <p className="article-meta">
          {post.author ? `by ${post.author} • ` : ''}
          {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : ''}
        </p>

        <motion.div
          className="prose-content"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {post.layout?.div?.h1 && <h2>{post.layout.div.h1}</h2>}
          {post.layout?.div?.p && <p>{post.layout.div.p}</p>}
          {post.layout?.ol?.li?.length > 0 && (
            <ol>
              {post.layout.ol.li.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ol>
          )}
        </motion.div>
      </article>

        <form onSubmit={handleSubmit} className="comment-form">
          <h3 className="comment-form-title">Leave a Comment</h3>

          <div>
            <label>Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>

          <div>
            <label>Email (optional)</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          <div>
            <label>Comment *</label>
            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              required
              rows={5}
              className="text-area"
            />
          </div>

          <button type="submit" className="submit-button">Submit</button>
        </form>

        <motion.section
        className="comments-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <h2 className="comments-title">Comments</h2>

        {comments.length === 0 ? (
          <p className="no-comments">No comments yet. Be the first!</p>
        ) : (
          <ul className="comments-list">
            {comments.map((c) => (
              <motion.li
                key={c.id}
                className="comment-item"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <p className="comment-author">{c.author || c.name}</p>
                <p className="comment-date">
                  {c.createdAt ? new Date(c.createdAt).toLocaleString() : ''}
                </p>
                <p className="comment-body">{c.body || c.comment}</p>
              </motion.li>
            ))}
          </ul>
        )}

      </motion.section>
    </motion.div>
  );
}
