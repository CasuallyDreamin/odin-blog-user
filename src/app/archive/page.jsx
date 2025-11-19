'use client';

import FilterBar from '@/app/components/FilterBar';
import archiveData from '../lib/data/archiveData';
import { useState, useEffect } from 'react';

export default function ArchivePage() {
  const [filteredData, setFilteredData] = useState(archiveData);
  const [search, setSearch] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    let filtered = archiveData.filter(item =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );

    if (selectedTypes.length)
      filtered = filtered.filter(item => selectedTypes.includes(item.type));

    if (selectedTags.length)
      filtered = filtered.filter(item => item.tags.some(tag => selectedTags.includes(tag)));

    setFilteredData(filtered);
  }, [search, selectedTypes, selectedTags]);

  return (
    <section className="archive-page max-w-6xl mx-auto px-6 py-16">
      <FilterBar
        categories={[...new Set(archiveData.map(i => i.type))]}
        tags={[...new Set(archiveData.flatMap(i => i.tags))]}
        selectedCategories={selectedTypes}
        selectedTags={selectedTags}
        onCategoryChange={setSelectedTypes}
        onTagChange={setSelectedTags}
        searchTerm={search}
        onSearchChange={setSearch}
      />
      <div className="mt-10 space-y-6">
        {filteredData.map((item, i) => (
          <div key={i} className="border-b border-neutral-800 pb-4">
            <a href={item.url} className="text-[oklch(0.8_0.18_190)] font-[var(--font-titles)] text-lg hover:underline">
              {item.title}
            </a>
            <div className="text-xs text-neutral-400 mt-1">
              {item.type} • {item.date}
            </div>
            <div className="flex gap-2 mt-1 flex-wrap">
              {item.tags.map((tag, idx) => (
                <span key={idx} className="text-[oklch(0.7_0.02_260)] text-xs">#{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
