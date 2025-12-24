'use client';

import { useState, useEffect } from 'react';
import Marquee from 'react-fast-marquee';
import { motion } from 'framer-motion';
import api from '@/app/lib/api';
import '@/styles/pages/thoughts.tailwind.css';

export default function ThoughtsPage() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchQuotes() {
      setLoading(true);
      try {
        const res = await api.get('/quotes');
        const data = (res.data.quotes || []).map(q => ({
          id: q.id,
          text: q.content,
          author: q.author || '— Unknown',
          categories: q.categories?.map(c => c.name) || [],
        }));

        setQuotes(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load quotes.');
      } finally {
        setLoading(false);
      }
    }

    fetchQuotes();
  }, []);

  if (loading) return <div className="thoughts-loading">Loading quotes…</div>;
  if (error) return <div className="thoughts-error">{error}</div>;

  const grouped = quotes.reduce((acc, quote) => {
    const categoryName = quote.categories[0] || 'General';
    if (!acc[categoryName]) acc[categoryName] = [];
    acc[categoryName].push(quote);
    return acc;
  }, {});

  const categoryKeys = Object.keys(grouped);

  return (
    <section className="thoughts-page">
      {categoryKeys.map((category, i) => (
        <motion.div
          key={category}
          className="category-section"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.2, duration: 0.6 }}
        >
          <h2 className="category-title">{category}</h2>

          <Marquee
            speed={35}
            gradient={false}
            pauseOnHover={true}
            direction={i % 2 === 0 ? 'left' : 'right'}
          >
            {grouped[category].map((quote) => (
              <div key={quote.id} className="quote-item">
                <p className="quote-text">“{quote.text}”</p>
                <p className="quote-author">{quote.author}</p>
              </div>
            ))}
          </Marquee>
        </motion.div>
      ))}
    </section>
  );
}