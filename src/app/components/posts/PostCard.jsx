'use client';

import '../../../styles/components/postcard.tailwind.css';

export default function PostCard({ post, onClick }) {
  return (
    <li
      className="post-card"
      onClick={() => onClick(post.slug)}
    >
      <h3 className="post-title">{post.title}</h3>
      <p className="post-meta">
        {post.categories?.map(c => c.name).join(', ')} •{' '}
        {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : ''}
      </p>
      <p className="post-preview">
        {post.excerpt || 'No preview available'}
      </p>
    </li>
  );
}