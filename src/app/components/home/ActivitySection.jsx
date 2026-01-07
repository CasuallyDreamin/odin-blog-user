'use client';

import { motion } from 'framer-motion';
import PostCard from './posts/PostCard';

export default function ActivitySection({ posts = [], onPostClick }) {
  return (
    <section className="activity-section space-y-6">
      <h2 className="section-title">Recent Activity</h2>

      {posts.length === 0 ? (
        <p className="text-(--color-text-muted)">No recent activity found.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <motion.li
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <PostCard post={post} onClick={() => onPostClick(post)} />
            </motion.li>
          ))}
        </ul>
      )}
    </section>
  );
}
