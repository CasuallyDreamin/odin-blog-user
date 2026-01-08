'use client';

import { useEffect } from 'react';

export default function useScrollHighlight(selector = '.section-wrapper') {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-25% 0px -25% 0px',
      threshold: 0.2,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active-scan');
        } else {
          entry.target.classList.remove('active-scan');
        }
      });
    }, observerOptions);

    const targets = document.querySelectorAll(selector);
    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [selector]);
}