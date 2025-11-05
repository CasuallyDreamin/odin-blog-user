'use client';
import './JourneySection.tailwind.css';
import { motion } from 'framer-motion';

const milestones = [
  {
    title: 'Early Days',
    description: 'I started exploring coding and technology, fueled by curiosity and chaos.',
    year: '2015-2018',
  },
  {
    title: 'Professional Growth',
    description: 'I honed my skills in software development, web projects, and problem solving.',
    year: '2019-2022',
  },
  {
    title: 'Current Focus',
    description: 'I’m combining coding, writing, and creative exploration to build meaningful experiences.',
    year: '2023-Present',
  },
];

export default function JourneySection() {
  return (
    <section className="journey-section">
      <h2 className="section-title">My Journey</h2>
      <div className="timeline">
        {milestones.map((m, idx) => (
          <motion.div
            key={idx}
            className="milestone"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
          >
            <h3 className="milestone-title">{m.title} <span className="milestone-year">{m.year}</span></h3>
            <p className="milestone-desc">{m.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
