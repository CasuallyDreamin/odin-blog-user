'use client';

import { motion } from 'framer-motion';

export default function DataSignal({ stats }) {
  return (
    <section className="data-signal grid grid-cols-1 sm:grid-cols-3 gap-6">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="p-4 bg-(--color-surface) border border-(--color-border) rounded-lg flex flex-col items-center"
        >
          <span className="text-(--color-primary) font-bold text-xl">{stat.value}</span>
          <span className="text-(--color-text-muted) text-xs mt-1">{stat.label}</span>
        </motion.div>
      ))}
    </section>
  );
}
