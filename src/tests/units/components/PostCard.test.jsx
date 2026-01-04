import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import PostCard from '@/app/components/posts/PostCard';

describe('PostCard', () => {
  const mockPost = {
    title: 'Testing React Components',
    slug: 'testing-react-components',
    categories: [{ name: 'Development' }, { name: 'Testing' }],
    createdAt: '2023-12-01T12:00:00.000Z',
    excerpt: 'A guide to unit testing with Vitest.'
  };

  const mockOnClick = vi.fn();

  it('renders post details correctly', () => {
    render(<PostCard post={mockPost} onClick={mockOnClick} />);

    expect(screen.getByText('Testing React Components')).toBeInTheDocument();
    
    expect(screen.getByText(/Development, Testing/)).toBeInTheDocument();
    
    expect(screen.getByText('A guide to unit testing with Vitest.')).toBeInTheDocument();
  });

  it('calls onClick with the correct slug when clicked', () => {
    render(<PostCard post={mockPost} onClick={mockOnClick} />);
    
    const card = screen.getByRole('listitem');
    fireEvent.click(card);

    expect(mockOnClick).toHaveBeenCalledWith('testing-react-components');
  });

  it('displays fallback text when excerpt is missing', () => {
    const postWithoutExcerpt = { ...mockPost, excerpt: null };
    render(<PostCard post={postWithoutExcerpt} onClick={mockOnClick} />);

    expect(screen.getByText('No preview available')).toBeInTheDocument();
  });

  it('handles missing categories gracefully', () => {
    const postWithoutCats = { ...mockPost, categories: undefined };
    render(<PostCard post={postWithoutCats} onClick={mockOnClick} />);

    const meta = screen.getByText(/•/);
    expect(meta).toBeInTheDocument();
  });

  it('renders an empty string for date if createdAt is missing', () => {
    const postWithoutDate = { ...mockPost, createdAt: null };
    render(<PostCard post={postWithoutDate} onClick={mockOnClick} />);

    const meta = screen.getByText(/Development, Testing/);
    expect(meta.textContent).not.toContain('Invalid Date');
  });
});