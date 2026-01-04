import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react'; // waitFor added here
import { describe, it, expect, vi, beforeEach } from 'vitest';
import FilterBar from '@/app/components/FilterBar';

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}));

describe('FilterBar', () => {
  const mockProps = {
    categories: ['Development', 'Design'],
    tags: ['React', 'CSS'],
    types: ['Article', 'Project'],
    selectedCategories: [],
    selectedTags: [],
    selectedTypes: [],
    onCategoryChange: vi.fn(),
    onTagChange: vi.fn(),
    onTypeChange: vi.fn(),
    onSearchChange: vi.fn(),
  };

  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
  });

  it('renders the search input and dropdown buttons', () => {
    render(<FilterBar {...mockProps} />);
    
    expect(screen.getByPlaceholderText(/search titles/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Categories/i })).toBeInTheDocument();
  });

  it('updates search value and triggers debounced callback', () => {
    render(<FilterBar {...mockProps} />);
    const input = screen.getByPlaceholderText(/search titles/i);

    fireEvent.change(input, { target: { value: 'test query' } });
    
    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(mockProps.onSearchChange).toHaveBeenCalledWith('test query');
  });

  it('opens a dropdown menu on click', () => {
    render(<FilterBar {...mockProps} />);
    const categoryBtn = screen.getByRole('button', { name: /Categories/i });

    fireEvent.click(categoryBtn);

    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.getByText('Development')).toBeInTheDocument();
  });

  it('closes a dropdown when clicking the same button again', async () => {
    
    vi.useRealTimers();

    render(<FilterBar {...mockProps} />);
    const categoryBtn = screen.getByRole('button', { name: /Categories/i });

    fireEvent.click(categoryBtn);
    expect(screen.getByRole('menu')).toBeInTheDocument();

    fireEvent.click(categoryBtn);

    await waitFor(() => {
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });

    vi.useFakeTimers();
  });

  it('triggers onCategoryChange when a checkbox is clicked', () => {
    render(<FilterBar {...mockProps} />);
    
    fireEvent.click(screen.getByRole('button', { name: /Categories/i }));
    
    const checkbox = screen.getByLabelText('Development');
    fireEvent.click(checkbox);

    expect(mockProps.onCategoryChange).toHaveBeenCalledWith(['Development']);
  });

  it('shows the count of selected items in the button label', () => {
    render(<FilterBar {...mockProps} selectedTags={['React', 'CSS']} />);
    expect(screen.getByText('Tags (2)')).toBeInTheDocument();
  });

  it('removes a tag from selection when unchecked', () => {
    render(<FilterBar {...mockProps} selectedTags={['React']} />);
    
    fireEvent.click(screen.getByRole('button', { name: /Tags/i }));
    
    const checkbox = screen.getByLabelText('React');
    fireEvent.click(checkbox);

    expect(mockProps.onTagChange).toHaveBeenCalledWith([]);
  });
});