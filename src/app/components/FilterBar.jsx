import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import './FilterBar.tailwind.css';

// Mock implementation for useSearchBar to resolve import error
const useSearchBar = ({ initialValue, debounceMs, onSearchChange }) => {
  const [search, setSearch] = useState(initialValue);
  const debouncedValue = useRef(initialValue);

  // Debouncing logic
  useEffect(() => {
    const handler = setTimeout(() => {
      if (search !== debouncedValue.current) {
        debouncedValue.current = search;
        onSearchChange(search);
      }
    }, debounceMs);

    return () => {
      clearTimeout(handler);
    };
  }, [search, debounceMs, onSearchChange]);

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  return { search, handleChange };
};

export default function FilterBar({
  tags = [],
  categories = [],
  types = [],
  selectedTags = [],
  selectedCategories = [],
  selectedTypes = [],
  onTagChange = () => {},
  onCategoryChange = () => {},
  onTypeChange = () => {},
  searchTerm = '',
  onSearchChange = () => {},
  placeholder = 'Search titles, tags, categories...',
  debounceMs = 200,
}) {
  const [openMenu, setOpenMenu] = useState(null);
  const containerRef = useRef(null);

  const { search, handleChange } = useSearchBar({
    initialValue: searchTerm,
    debounceMs,
    onSearchChange,
  });

  const toggleTag = useCallback(
    (tag) => {
      const next = selectedTags.includes(tag)
        ? selectedTags.filter((t) => t !== tag)
        : [...selectedTags, tag];
      onTagChange(next);
    },
    [selectedTags, onTagChange]
  );

  const toggleCategory = useCallback(
    (cat) => {
      const next = selectedCategories.includes(cat)
        ? selectedCategories.filter((c) => c !== cat)
        : [...selectedCategories, cat];
      onCategoryChange(next);
    },
    [selectedCategories, onCategoryChange]
  );

  const toggleType = useCallback(
    (t) => {
      const next = selectedTypes.includes(t)
        ? selectedTypes.filter((x) => x !== t)
        : [...selectedTypes, t];
      onTypeChange(next);
    },
    [selectedTypes, onTypeChange]
  );

  const Dropdown = ({ type, label, items = [], selected = [], onToggle }) => {
    const btnRef = useRef(null);
    const selectedCount = Array.isArray(selected) ? selected.length : 0;
    const shownLabel = selectedCount > 0 ? `${label} (${selectedCount})` : label;

    return (
      <div className="relative filter-dropdown">
        <button
          ref={btnRef}
          className={`dropdown-btn ${openMenu === type ? 'active' : ''}`}
          onClick={() => setOpenMenu((prev) => (prev === type ? null : type))}
          aria-expanded={openMenu === type}
          aria-haspopup="menu"
          type="button"
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
              role="menu"
            >
              {items.map((item) => (
                <label className="dropdown-item" key={item}>
                  <input
                    type="checkbox"
                    checked={selected.includes(item)}
                    onChange={() => onToggle(item)}
                  />
                  <span className="dropdown-item-text">{item}</span>
                </label>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="filter-bar" ref={containerRef}>
      <input
        type="search"
        placeholder={placeholder}
        value={search}
        onChange={handleChange}
        className="filter-search-input"
        aria-label="Search content"
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
        <Dropdown
          type="types"
          label="Types"
          items={types}
          selected={selectedTypes}
          onToggle={toggleType}
        />
      </div>
    </div>
  );
}