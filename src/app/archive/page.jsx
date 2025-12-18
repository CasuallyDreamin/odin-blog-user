'use client';

import { useState, useEffect } from 'react';
import FilterBar from '@/app/components/FilterBar';
import api from '@/app/lib/api';
import '@/styles/pages/archive.tailwind.css';

export default function ArchivePage() {
  const [items, setItems] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    async function fetchArchive() {
      setLoading(true);
      try {
        const res = await api.get('/archives');
        const data = res.data.items || [];

        setItems(data);
        setFilteredData(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load archive content.');
      } finally {
        setLoading(false);
      }
    }

    fetchArchive();
  }, []);

  // --- Filtering Logic ---
  useEffect(() => {
    let filtered = items;

    if (search) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedTypes.length) {
      filtered = filtered.filter(item => selectedTypes.includes(item.type));
    }

    if (selectedTags.length) {
      filtered = filtered.filter(item =>
        item.tags.some(tag => selectedTags.includes(tag))
      );
    }

    setFilteredData(filtered);
  }, [search, selectedTypes, selectedTags, items]);

  if (loading) return <div>Loading archive…</div>;
  if (error) return <div>{error}</div>;

  const allTypes = [...new Set(items.map(i => i.type))];
  const allTags = [...new Set(items.flatMap(i => i.tags))];

  return (
    <section className="archive-page">
      <FilterBar
        categories={allTypes}
        tags={allTags}
        selectedCategories={selectedTypes}
        selectedTags={selectedTags}
        onCategoryChange={setSelectedTypes}
        onTagChange={setSelectedTags}
        searchTerm={search}
        onSearchChange={setSearch}
      />

      <div className="archive-results">
        {filteredData.map((item, i) => (
          <div key={i} className="archive-item">
            <a href={item.url} className="archive-item-title">
              {item.title}
            </a>

            <div className="archive-item-meta">
              {item.type} • {new Date(item.date).toLocaleDateString()}
            </div>

            <div className="archive-item-tags">
              {item.tags.map((tag, idx) => (
                <span key={idx} className="archive-tag">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
