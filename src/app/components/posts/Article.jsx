'use client';

import { motion } from 'framer-motion';
import '../../../styles/components/article.tailwind.css';

export default function Article({ post }) {
  if (!post) return null;

  return (
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
        <div
          className="prose dark:prose-invert max-w-none w-full mx-auto whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

      </motion.div>
    </article>
  );
}