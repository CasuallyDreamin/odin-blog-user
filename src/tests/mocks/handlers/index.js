import { http, HttpResponse } from 'msw';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const handlers = [
  http.get(`${API_URL}/settings`, () => {
    return HttpResponse.json({
      data: {
        blogName: 'My Awesome Blog',
        tagline: 'Coding, writing, and chaos',
        logoUrl: null,
        theme: 'default',
        socialLinks: null,
      }
    });
  }),
];