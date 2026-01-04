import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import PostsPage from '@/app/posts/page';
import api from '@/app/lib/api';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

vi.mock('@/app/lib/api', () => ({
  default: {
    get: vi.fn(),
  },
}));

describe('PostsPage Integration', () => {
  const mockPosts = [
    {
      id: '1',
      title: 'First Post',
      slug: 'first-post',
      published: true,
      content: '<h1>Heading 1</h1><p>Content here</p>',
      categories: [{ name: 'Tech' }],
      tags: ['React'],
      createdAt: '2024-01-01',
    },
    {
      id: '2',
      title: 'Second Post',
      slug: 'second-post',
      published: true,
      content: 'Just some text content',
      categories: [{ name: 'Life' }],
      tags: ['Personal'],
      createdAt: '2024-01-02',
    }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches and displays posts on mount', async () => {
    api.get.mockResolvedValue({ data: { posts: mockPosts } });

    render(<PostsPage />);

    expect(screen.getByText(/loading posts/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('First Post')).toBeInTheDocument();
      expect(screen.getByText('Second Post')).toBeInTheDocument();
    });
  });

  it('correctly extracts excerpts from HTML content', async () => {
    api.get.mockResolvedValue({ data: { posts: mockPosts } });
    render(<PostsPage />);

    await waitFor(() => {
      expect(screen.getByText('Heading 1')).toBeInTheDocument();
    });
  });

  it('updates the API call when the search term changes', async () => {
    api.get.mockResolvedValue({ data: { posts: mockPosts } });
    render(<PostsPage />);

    const searchInput = await screen.findByPlaceholderText(/search/i);
    
    fireEvent.change(searchInput, { target: { value: 'Testing' } });

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith('/posts', expect.objectContaining({
        params: expect.objectContaining({ search: 'Testing' })
      }));
    }, { timeout: 1000 });
  });

  it('shows an empty state when no posts are returned', async () => {
    api.get.mockResolvedValue({ data: { posts: [] } });
    render(<PostsPage />);

    await waitFor(() => {
      expect(screen.getByText(/no posts match your filters/i)).toBeInTheDocument();
    });
  });

  it('handles API errors gracefully', async () => {
    api.get.mockRejectedValue(new Error('Network Error'));
    render(<PostsPage />);

    await waitFor(() => {
      expect(screen.getByText(/failed to load posts/i)).toBeInTheDocument();
    });
  });
});