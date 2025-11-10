'use client';

import Marquee from 'react-fast-marquee';
import { motion } from 'framer-motion';
import '../../styles/pages/thoughts.tailwind.css';

const thoughts = [
  {
    category: 'Existence',
    quotes: [
      { text: 'I am not afraid of dying, I am afraid of never having lived truly.', author: '— Yasin' },
      { text: 'Sometimes I stare too long into the void and it starts staring back softly.', author: '— Yasin' },
      { text: 'To exist is to endure the weight of awareness.', author: '— Unknown' },
    ],
  },
  {
    category: 'Love',
    quotes: [
      { text: 'Love is the most elegant form of madness.', author: '— Yasin' },
      { text: 'Her silence speaks the language of galaxies.', author: '— Yasin' },
      { text: 'He loved her not for her light, but for her shadows.', author: '— Unknown' },
    ],
  },
  {
    category: 'Creation',
    quotes: [
      { text: 'Every idea is a rebellion against entropy.', author: '— Yasin' },
      { text: 'I build worlds to escape the dull mercy of reality.', author: '— Yasin' },
      { text: 'Art is how gods apologize to mortals.', author: '— Unknown' },
    ],
  },
];

export default function ThoughtsPage() {
  return (
    <section className="thoughts-page">
      {thoughts.map((section, i) => (
        <motion.div
          key={section.category}
          className="category-section"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.2, duration: 0.6 }}
        >
          <h2 className="category-title">{section.category}</h2>

          <Marquee
            speed={35}
            gradient={false}
            pauseOnHover={true}
            direction={i % 2 === 0 ? 'left' : 'right'}
          >
            {section.quotes.map((quote, idx) => (
              <div key={idx} className="quote-item flex flex-col gap-1 mx-8 min-w-max">
                <p className="quote-text">“{quote.text}”</p>
                <p className="quote-author">
                  {quote.author}
                </p>
              </div>
            ))}
          </Marquee>
        </motion.div>
      ))}
    </section>
  );
}
