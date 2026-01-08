'use client';

import { motion } from 'framer-motion';
import PostCard from '../posts/PostCard';

export default function ActivitySection({ post, project, quote, onPostClick, onProjectClick }) {
  return (
    <section className="activity-section space-y-6">
      <div className="flex items-center justify-between border-b border-(--color-border) pb-2">
        <h2 className="section-title text-2xl">Latest Intelligence</h2>
        <span className="text-[0.6rem] uppercase tracking-tighter opacity-50 font-mono">Status: Live_Feed</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-full">
          <div className="activity-label">Post_Update</div>
          <div className="flex-grow h-full">
            {post ? <PostCard post={post} onClick={() => onPostClick(post)} /> : <EmptyState />}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.1 }}
          className="flex flex-col h-full"
        >
          <div className="activity-label">Project_Sync</div>
          {project ? (
            <div 
              onClick={() => onProjectClick(project)}
              className="group relative flex-grow flex flex-col justify-between cursor-pointer border-2 border-(--color-border) bg-(--color-surface) p-6 overflow-hidden transition-all hover:border-(--color-primary)"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% 90%, 90% 100%, 0 100%)' }}
            >
              <div className="absolute top-0 right-0 p-2 text-[10px] font-mono opacity-20 group-hover:opacity-100">
                REV_04
              </div>
              <div>
                <h3 className="font-titles text-xl mb-4 leading-tight group-hover:text-(--color-primary)">
                  {project.title}
                </h3>
                <p className="text-sm text-(--color-text-muted) font-body leading-relaxed line-clamp-4">
                  {project.description}
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-(--color-border) pt-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-(--color-text-muted)">Project_Index</span>
                <span className="text-sm font-titles group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          ) : <EmptyState />}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.2 }}
          className="flex flex-col h-full"
        >
          <div className="activity-label">Signal_Intercept</div>
          <div className="relative flex-grow flex flex-col justify-center items-center bg-transparent p-8 text-center border border-(--color-border) group overflow-hidden">
            <div className="absolute inset-0 opacity-5 pointer-events-none font-titles text-8xl -rotate-12 translate-y-12">
              QUOTE
            </div>
            
            <div className="relative z-10 space-y-4">
              <span className="block text-4xl text-(--color-primary) font-serif opacity-40 group-hover:opacity-100 transition-opacity">“</span>
              <p className="text-lg md:text-xl font-body italic text-(--color-text-base) leading-relaxed">
                {quote || "The silence between data points is where the truth resides."}
              </p>
              <div className="w-12 h-[1px] bg-(--color-primary) mx-auto opacity-50" />
            </div>
            
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-1">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-1 h-1 rounded-full bg-(--color-border)" />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function EmptyState() {
  return (
    <div className="h-full min-h-[300px] border border-dashed border-(--color-border) flex flex-col items-center justify-center p-8 text-center opacity-30">
      <div className="text-[10px] font-mono mb-2">[ ERROR: DATA_VOID ]</div>
      <div className="w-full h-px bg-gradient-to-r from-transparent via-(--color-border) to-transparent" />
    </div>
  );
}