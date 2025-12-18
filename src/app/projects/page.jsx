'use client';

import { useState, useEffect } from 'react';
import RouteTransition from '../components/RouteTransition';
import HeroSection from '../components/projects/HeroSection';
import ProjectsGrid from '../components/projects/ProjectsGrid';
import FilterBar from '@/app/components/FilterBar';
import api from '@/app/lib/api';

import '@/styles/pages/projectpage.tailwind.css';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    async function fetchProjects() {
      setLoading(true);
      try {
        const res = await api.get('/projects');
        const data = (res.data.projects || []).filter(p => p.published).map(p => ({
          title: p.title,
          description: p.description,
          techStack: p.categories?.map(c => c.name) || [],
          tags: p.tags?.map(t => t.name) || [],
          link: `/projects/${p.slug}`,
          date: p.createdAt,
        }));

        setProjects(data);
        setFilteredProjects(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load projects.');
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  // --- Filtering logic ---
  useEffect(() => {
    let filtered = projects;

    if (search) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedCategories.length) {
      filtered = filtered.filter(p =>
        p.techStack.some(c => selectedCategories.includes(c))
      );
    }

    if (selectedTags.length) {
      filtered = filtered.filter(p =>
        p.tags.some(t => selectedTags.includes(t))
      );
    }

    setFilteredProjects(filtered);
  }, [search, selectedCategories, selectedTags, projects]);

  if (loading) return <div className="projects-loading">Loading projects…</div>;
  if (error) return <div className="projects-error">{error}</div>;

  const allCategories = [...new Set(projects.flatMap(p => p.techStack))];
  const allTags = [...new Set(projects.flatMap(p => p.tags))];

  return (
    <RouteTransition>
      <HeroSection />

      <section className="projects-page">
        <FilterBar
          categories={allCategories}
          tags={allTags}
          selectedCategories={selectedCategories}
          selectedTags={selectedTags}
          onCategoryChange={setSelectedCategories}
          onTagChange={setSelectedTags}
          searchTerm={search}
          onSearchChange={setSearch}
        />

        <ProjectsGrid projects={filteredProjects} />
      </section>
    </RouteTransition>
  );
}
