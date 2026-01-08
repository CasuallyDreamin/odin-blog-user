'use client';
import './JourneySection.tailwind.css';
import { motion } from 'framer-motion';

const milestones = [
  {
    title: 'First Encounter',
    description: 'At thirteen, I wrote my first piece of software, driven purely by curiosity.',
    year: '2013',
  },
  {
    title: 'Game Engine Project',
    description: 'At seventeen, I dove into a C++/C game engine project for two years. It became a mess due to limited system design knowledge, teaching me the value of planning and structure.',
    year: '2017-2019',
  },
  {
    title: 'Data Analysis',
    description: 'I focused on Python for data analysis and visualization, freelancing for a year while learning how constraints shape real work.',
    year: '2019-2020',
  },
  {
    title: 'Web Development & Study',
    description: 'I committed to web development, completing The Odin Project, Harvard courses, and my university studies more seriously. Built websites for small businesses and internal tools.',
    year: '2020-2022',
  },
  {
    title: 'Systems, Linux & Collaboration',
    description: 'Explored Linux (Arch → Debian) for better workflow and server control. Developed web projects for private clients and collaborated with teams from university and other institutions. Also taught English (B2–C1) to sustain myself.',
    year: '2022-Present',
  },
  {
    title: 'Teaching & Knowledge Transfer',
    description:
      'I taught Python fundamentals through Django and REST APIs, guiding beginners from zero to building real systems. Teaching forced me to formalize my thinking, simplify complexity, and understand software as something meant to be shared—not hoarded.',
    year: '2023–2024',
  },
  {
    title: 'Current Ambition',
    description: 'I code to create and express ideas where traditional art fails me. My ultimate goal is to build my own game to share philosophy and gather a community of developers and gamers.',
    year: 'Present',
  },
];

export default function JourneySection({ className }) {
  return (
    <section className={`journey-section ${className || ''}`}>
      <h2 className="section-title">My Journey</h2>
      <div className="timeline-container relative">
        <div className="timeline-rail" />
        
        <div className="timeline-items space-y-12">
          {milestones.map((m, idx) => (
            <motion.div
              key={idx}
              className="milestone-entry"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className="milestone-dot" />
              <div className="milestone-content">
                <h3 className="milestone-title">
                  {m.title} <span className="milestone-year">{m.year}</span>
                </h3>
                <p className="milestone-desc">{m.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}