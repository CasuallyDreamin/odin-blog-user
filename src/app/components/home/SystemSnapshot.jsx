'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
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
        setError('SNAPSHOT_OFFLINE');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (error) return <div className="system-bar error">{error}</div>;

  const dataPoints = [
    { label: 'POSTS', value: stats.totalPosts },
    { label: 'PROJ', value: stats.totalProjects },
    { label: 'QUOT', value: stats.totalQuotes },
  ];

  return (
    <div className="system-bar-wrapper">
      <div className="system-bar">
        {/* Connection Status Indicator */}
        <div className="flex items-center space-x-3 px-4 border-r border-(--color-border)">
          <div className={`w-2 h-2 rounded-full ${stats.health.online ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
          <span className="text-[10px] font-mono tracking-widest opacity-70 uppercase">
            {stats.health.online ? `SYS_READY [${stats.health.latency}ms]` : 'SYS_FAIL'}
          </span>
        </div>

        {/* Compact Stats */}
        <div className="flex flex-1 justify-around px-2">
          {loading ? (
            <div className="text-[10px] font-mono animate-pulse uppercase">Syncing_Data_Stream...</div>
          ) : (
            dataPoints.map((item) => (
              <div key={item.label} className="flex items-baseline space-x-2">
                <span className="text-[10px] font-mono opacity-50">{item.label}:</span>
                <span className="text-sm font-bold font-titles text-(--color-primary)">{item.value}</span>
              </div>
            ))
          )}
        </div>

        <div className="hidden md:block px-4 border-l border-(--color-border) text-[10px] font-mono opacity-50">
          V.2.0.6_STABLE
        </div>
      </div>
    </div>
  );
}