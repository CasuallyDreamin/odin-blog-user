'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import api from '@/app/lib/api';

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

  if (loading) return <div>Loading project…</div>;
  if (error) return <div>{error}</div>;
  if (!project) return <div>No project data.</div>;

  return (
    <section className="max-w-3xl mx-auto px-6 py-10 space-y-6">
      <h1 className="text-3xl font-bold">{project.title}</h1>
      {project.description && <p className="text-lg">{project.description}</p>}
      {project.content && <div className="prose">{project.content}</div>}
      {project.tags && project.tags.length > 0 && (
        <div className="flex gap-2 mt-4">
          {project.tags.map((tag) => (
            <span
              key={tag.id}
              className="px-2 py-1 bg-cyan-600 text-white rounded"
            >
              {tag.name}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}
