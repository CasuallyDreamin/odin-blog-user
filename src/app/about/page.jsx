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
import '../../styles/pages/about.tailwind.css';

export default function AboutPage() {
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

  return (
    <RouteTransition>
      <div className="about-container">
        <HeroSection />

        <JourneySection />

        <PhilosophySection />

        <SkillsSection />

        <InterestsSection>
          <div className="interests-grid">
            {interests.map((interest, idx) => (
              <InterestCard key={idx} interest={interest} />
            ))}
          </div>
        </InterestsSection>
      </div>
    </RouteTransition>
  );
}