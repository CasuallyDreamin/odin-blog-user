'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/app/lib/api';

export default function SystemSnapshot() {
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalProjects: 0,
    totalQuotes: 0,
    health: { online: false, latency: 0 },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);

        const res = await api.get('/stats');
        const counts = res.data;

        let health = { online: false, latency: 0 };
        try {
          const start = Date.now();
          await api.get('/');
          const end = Date.now();
          health = { online: true, latency: end - start };
        } catch {}

        setStats({
          totalPosts: counts.posts ?? 0,
          totalQuotes: counts.quotes ?? 0,
          totalProjects: counts.projects ?? 0,
          health,
        });
      } catch (err) {
        console.error(err);
        setError('Failed to fetch system snapshot.');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (error) {
    return (
      <div className="p-4 text-red-500 font-mono text-sm">
        {error}
      </div>
    );
  }

  return (
    <section className="system-snapshot grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <AnimatePresence>
        {loading
          ? [1, 2, 3, 4].map((n) => (
              <motion.div
                key={n}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-4 bg-(--color-surface) border border-(--color-border) rounded-lg animate-pulse"
              >
                <div className="h-6 bg-neutral-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-neutral-600 rounded w-1/2"></div>
              </motion.div>
            ))
          : [
              { label: 'Total Posts', value: stats.totalPosts },
              { label: 'Total Projects', value: stats.totalProjects },
              { label: 'Total Quotes', value: stats.totalQuotes },
              { label: 'API Health', value: stats.health.online ? `Online (${stats.health.latency}ms)` : 'Offline' },
            ].map((item) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="p-4 bg-(--color-surface) border border-(--color-border) rounded-lg flex flex-col justify-center items-center text-center"
              >
                <span
                  className={`text-xl font-bold ${
                    item.label === 'API Health'
                      ? stats.health.online
                        ? 'text-green-400'
                        : 'text-red-500'
                      : 'text-(--color-primary)'
                  }`}
                >
                  {item.value}
                </span>
                <span className="text-xs mt-1 text-(--color-text-muted)">{item.label}</span>
              </motion.div>
            ))}
      </AnimatePresence>
    </section>
  );
}
