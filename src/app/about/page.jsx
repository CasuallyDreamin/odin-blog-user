'use client';

import HeroSection from '../components/about/HeroSection';
import JourneySection from '../components/about/JourneySection';
import PhilosophySection from '../components/about/PhilosophySection';
import SkillsSection from '../components/about/SkillsSection';
import SkillCard from '../components/about/SkillCard';
import InterestsSection from '../components/about/InterestsSection';
import InterestCard from '../components/about/InterestCard';
import RouteTransition from '../components/RouteTransition';
import Timeline from '../components/about/Timeline';

export default function AboutPage() {
  const skills = [
    { name: 'JavaScript', level: 'Advanced', description: 'Frontend & Node.js' },
    { name: 'Python', level: 'Advanced', description: 'Data analysis & backend' },
    { name: 'Next.js', level: 'Intermediate', description: 'Fullstack React framework' },
    { name: 'TailwindCSS', level: 'Intermediate', description: 'Utility-first styling' },
    { name: 'Verilog', level: 'Beginner', description: 'Hardware description & FPGA' },
    { name: 'Game Design', level: 'Intermediate', description: 'Story-driven interactive systems' },
  ];

  const interests = [
    { name: 'Philosophy' },
    { name: 'Mythology' },
    { name: 'Music Production' },
    { name: 'Gaming' },
    { name: 'AI & Neural Nets' },
    { name: 'Metal Music' },
    { name: 'Writing' },
    { name: 'Fitness' },
  ];

  const journeyItems = [
    { title: 'Started Coding', description: 'Tinkered with HTML, CSS, and JS', year: '2015' },
    { title: 'Built First Project', description: 'Created my first small app', year: '2017' },
    { title: 'Joined Dev Community', description: 'Participated in open-source projects', year: '2019' },
  ];

  return (
    <RouteTransition>
      <HeroSection />

      <JourneySection />

      <PhilosophySection />

      <SkillsSection>
        <div className="skills-grid">
          {skills.map((skill, idx) => (
            <SkillCard key={idx} skill={skill} />
          ))}
        </div>
      </SkillsSection>

      <InterestsSection>
        <div className="interests-grid">
          {interests.map((interest, idx) => (
            <InterestCard key={idx} interest={interest} />
          ))}
        </div>
      </InterestsSection>

      <Timeline items={journeyItems} />
    </RouteTransition>
  );
}
