'use client';

import { motion } from 'framer-motion';
import PostCard from '../posts/PostCard';

export default function ActivitySection({ post, project, quote, onPostClick, onProjectClick }) {
  const items = [
    { type: 'post', data: post },
    { type: 'project', data: project },
    { type: 'quote', data: quote }
  ];

  return (
    <section className="activity-section space-y-6">
      <div className="flex items-center justify-between border-b border-(--color-border) pb-2">
        <h2 className="section-title text-2xl">Latest Intelligence</h2>
        <span className="text-[0.6rem] uppercase tracking-tighter opacity-50">Filter: All_Activity</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="activity-label">Post_Update</div>
          {post ? <PostCard post={post} onClick={() => onPostClick(post)} /> : <EmptyState />}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <div className="activity-label">Project_Sync</div>
          {project ? (
            <div 
              onClick={() => onProjectClick(project)}
              className="group cursor-pointer border border-(--color-border) bg-(--color-surface) p-6 rounded-lg hover:border-(--color-primary) transition-all"
            >
              <h3 className="font-titles text-lg mb-2">{project.title}</h3>
              <p className="text-sm text-(--color-text-muted) line-clamp-3">{project.description}</p>
              <div className="mt-4 text-xs font-mono text-(--color-primary)">{'>'} VIEW_SOURCE</div>
            </div>
          ) : <EmptyState />}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <div className="activity-label">Signal_Intercept</div>
          <div className="border border-(--color-border) bg-(--color-bg) p-6 rounded-lg italic relative overflow-hidden">
            <span className="absolute top-0 right-0 text-4xl opacity-10 font-serif">"</span>
            <p className="text-(--color-text-base) relative z-10 font-body">
              {quote || "No signal detected..."}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function EmptyState() {
  return <div className="h-full border border-dashed border-(--color-border) rounded-lg flex items-center justify-center p-8 text-xs opacity-30">DATA_MISSING</div>;
}