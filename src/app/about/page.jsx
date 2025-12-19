'use client';

import HeroSection from '../components/about/HeroSection';
import JourneySection from '../components/about/journey/JourneySection';
import PhilosophySection from '../components/about/philosophy/PhilosophySection';
import SkillsSection from '../components/about/skills/SkillsSection';
import InterestsSection from '../components/about/interests/InterestsSection';
import RouteTransition from '../components/RouteTransition';
import '../../styles/pages/about.tailwind.css';

export default function AboutPage() {
    return (
    <RouteTransition>
      <div className="about-container">
        <HeroSection className="section-wrapper"/>
        
        <SkillsSection className="section-wrapper"/>

        <JourneySection className="section-wrapper"/>

        <PhilosophySection className="section-wrapper"/>


        <InterestsSection className="section-wrapper"/>
      </div>
    </RouteTransition>
  );
}