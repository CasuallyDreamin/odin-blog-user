'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import './FilterBar.tailwind.css';

export default function FilterBar({
  tags = [],
  categories = [],
  selectedTags = [],
  selectedCategories = [],
  onTagChange,
  onCategoryChange,
  searchTerm,
  onSearchChange,
}) {
  const [openMenu, setOpenMenu] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpenMenu(null);
      }
    }
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  const toggleTag = (tag) => {
    const next =
      selectedTags.includes(tag)
        ? selectedTags.filter((t) => t !== tag)
        : [...selectedTags, tag];
    onTagChange(next);
  };

  const toggleCategory = (cat) => {
    const next =
      selectedCategories.includes(cat)
        ? selectedCategories.filter((c) => c !== cat)
        : [...selectedCategories, cat];
    onCategoryChange(next);
  };

  function Dropdown({ type, label, items, selected, onToggle }) {
    const btnRef = useRef(null);
    const [btnWidth, setBtnWidth] = useState(null);

    useEffect(() => {
      if (btnRef.current) setBtnWidth(btnRef.current.offsetWidth);
      function handleResize() {
        if (btnRef.current) setBtnWidth(btnRef.current.offsetWidth);
      }
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    const selectedCount = selected.length;
    const shownLabel =
      selectedCount > 0 ? `${label} (${selectedCount})` : label;

    return (
      <div className="relative filter-dropdown" ref={btnRef}>
        <button
          ref={btnRef}
          className={`dropdown-btn ${openMenu === type ? 'active' : ''}`}
          onClick={() => {
            console.log('[FilterBar] Toggling dropdown:', type);
            setOpenMenu(openMenu === type ? null : type);
          }}
          aria-expanded={openMenu === type}
          aria-haspopup="menu"
        >
          <span className="dropdown-label">{shownLabel}</span>
          <motion.div
            animate={{ rotate: openMenu === type ? 180 : 0 }}
            transition={{ duration: 0.18 }}
            className="inline-flex items-center"
          >
            <ChevronDown className="w-4 h-4 ml-2" />
          </motion.div>
        </button>

        <AnimatePresence>
          {openMenu === type && (
            <motion.div
              className="dropdown-menu"
              key={type}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              style={{ minWidth: btnWidth || undefined }}
              role="menu"
            >
              {items.length === 0 ? (
                <div className="empty-item">None</div>
              ) : (
                items.map((item) => (
                  <label className="dropdown-item" key={item}>
                    <input
                      type="checkbox"
                      checked={selected.includes(item)}
                      onChange={() => onToggle(item)}
                    />
                    <span className="dropdown-item-text">{item}</span>
                  </label>
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="filter-bar" ref={containerRef}>
      <input
        type="search"
        placeholder="Search titles, tags, categories..."
        value={searchTerm}
        onChange={(e) => {
          onSearchChange(e.target.value);
        }}
        className="filter-search-input"
        aria-label="Search posts"
      />

      <div className="filter-controls">
        <Dropdown
          type="categories"
          label="Categories"
          items={categories}
          selected={selectedCategories}
          onToggle={toggleCategory}
        />
        <Dropdown
          type="tags"
          label="Tags"
          items={tags}
          selected={selectedTags}
          onToggle={toggleTag}
        />
      </div>
    </div>
  );
}
