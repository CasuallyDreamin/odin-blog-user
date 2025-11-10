'use client';

import PostCard from './PostCard';

export default function PinnedPostCard({ post, onClick }) {
  return <PostCard post={{ ...post, layout: { ...post.layout, pinned: true } }} onClick={onClick} />;
}
