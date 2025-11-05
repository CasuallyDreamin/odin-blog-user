'use client';
import '../../styles/postcard.tailwind.css';
export default function PostCard({ post, onClick }) {
  return (
    <li
      className={`post-card ${post.layout?.pinned ? 'border-cyan-400' : ''}`}
      onClick={() => onClick(post.id)}
    >
      <h3 className="post-title">{post.title}</h3>
      <p className="post-meta">
        {post.categories?.map(c => c.name).join(', ')} •{' '}
        {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : ''}
      </p>
      <p className="post-preview">
        {post.layout?.div?.p || 'No preview available'}
      </p>
    </li>
  );
}
