'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import api from '@/app/lib/api';
import Article from '@/app/components/posts/Article';
import '@/styles/pages/projectpage.tailwind.css';

export default function ProjectPage() {
  const params = useParams();
  const slug = params.slug;

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProject() {
      setLoading(true);
      try {
        const res = await api.get(`/projects/${slug}`);
        setProject(res.data);
      } catch (err) {
        console.error(err);
        setError('Project not found.');
      } finally {
        setLoading(false);
      }
    }

    if (slug) fetchProject();
  }, [slug]);

  if (loading)
    return <div className="projects-loading">Loading project…</div>;
  if (error) return <div className="projects-error">{error}</div>;
  if (!project) return <div className="projects-error">No project data.</div>;

  return (
    <section className="max-w-3xl mx-auto px-6 py-12 space-y-8">
      
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          {project.categories && project.categories.map((cat) => (
            <span 
              key={cat.id} 
              className="text-xs font-bold uppercase tracking-widest text-cyan-500 bg-cyan-500/10 px-2 py-1 rounded"
            >
              {cat.name}
            </span>
          ))}
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          {project.title}
        </h1>

        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.map((tag) => (
              <span
                key={tag.id}
                className="text-sm text-slate-400 before:content-['#'] before:text-cyan-600 before:mr-0.5 hover:text-cyan-400 transition-colors cursor-default"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}
      </header>

      <hr className="border-slate-800" />

      <div className="article-container">
        {project.content && <Article post={project} />}
      </div>

      {project.link && (
        <div className="pt-10">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="project-button inline-flex items-center gap-2"
          >
            <span>View Live Project</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      )}
    </section>
  );
}