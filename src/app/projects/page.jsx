'use client';

import RouteTransition from '../components/RouteTransition';
import HeroSection from '../components/projects/HeroSection';
import ProjectsGrid from '../components/projects/ProjectsGrid';

export default function ProjectsPage() {
  const projects = [
    {
      title: 'Sintopia Blog',
      description: 'A personal dev blog with interactive features and animations.',
      techStack: ['Next.js', 'TailwindCSS', 'Framer Motion'],
      link: '#',
    },
    {
      title: 'Neural Net Visualizer',
      description: 'Visualizing deep learning networks in real time.',
      techStack: ['React', 'Three.js', 'TensorFlow.js'],
      link: '#',
    },
    {
      title: 'FPGA Display Project',
      description: 'Low-level hardware logic for a 4-digit 7-segment display.',
      techStack: ['Verilog', 'Vivado'],
      link: '#',
    },
    // add more projects here
  ];

  return (
    <RouteTransition>
      <HeroSection />
      <ProjectsGrid projects={projects} />
    </RouteTransition>
  );
}
