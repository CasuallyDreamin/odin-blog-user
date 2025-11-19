export function filterContent(items, {
  searchTerm = '',
  selectedCategories = [],
  selectedTags = [],
  selectedTypes = [],
  mapFields = (item) => ({
    title: item.title || '',
    category: item.category || '',
    tags: item.tags || [],
    type: item.type || '',
  }),
}) {
  if (!items || !Array.isArray(items)) return [];

  const termLower = searchTerm.toLowerCase();

  return items.filter(item => {
    const { title, category, tags, type } = mapFields(item);

    const categoryLower = category.toLowerCase();
    const tagsLower = (tags || []).map(t => t.toLowerCase());
    const typeLower = type.toLowerCase();

    const matchSearch =
      !termLower ||
      title.toLowerCase().includes(termLower) ||
      categoryLower.includes(termLower) ||
      tagsLower.some(tag => tag.includes(termLower)) ||
      (type && typeLower.includes(termLower));

    const selectedCatsLower = selectedCategories.map(c => c.toLowerCase());
    const matchCategory =
      selectedCatsLower.length === 0 || selectedCatsLower.includes(categoryLower);

    const selectedTagsLower = selectedTags.map(t => t.toLowerCase());
    const matchTag =
      selectedTagsLower.length === 0 || tagsLower.some(tag => selectedTagsLower.includes(tag));

    const selectedTypesLower = selectedTypes.map(t => t.toLowerCase());
    const matchType =
      selectedTypesLower.length === 0 || (type && selectedTypesLower.includes(typeLower));

    return matchSearch && matchCategory && matchTag && matchType;
  });
}
