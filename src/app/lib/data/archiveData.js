import posts from './posts';
import projects from './projects';
import labData from './lab';
import thoughts from './thoughts';

const archiveData = [
  // Posts
  ...posts.map(p => ({
    type: 'Post',
    title: p.title,
    date: p.date,
    tags: p.tags || [],
    url: p.url,
  })),

  // Projects
  ...projects.map(p => ({
    type: 'Project',
    title: p.title,
    date: p.date,
    tags: p.tags || [],
    url: p.url,
  })),

  // Lab projects
  ...labData.flatMap(section =>
    section.projects.map(p => ({
      type: section.category,
      title: p.title,
      date: p.date || 'Untracked',
      tags: p.tags || [],
      url: p.demo || p.github || '#',
    }))
  ),

  // Thoughts
  ...thoughts.flatMap(section =>
    section.quotes.map(q => ({
      type: section.category,
      title: q.text,
      date: q.date || 'Untracked',
      tags: ['thought', section.category],
      url: '/thoughts',
    }))
  ),
];

// Optional: sort by date descending
archiveData.sort((a, b) => new Date(b.date) - new Date(a.date));

export default archiveData;
