import { useEffect, useRef } from 'react';

/**
 * useScrollAnimation — triggers 'revealed' class on elements 
 * when they enter the viewport using IntersectionObserver.
 *
 * Usage: attach `animate-reveal` (or animate-reveal-left/right) class
 * to any element and wrap the section/parent with the ref returned.
 *
 * Alternatively, call without a ref to observe all elements with 
 * the class on the document.
 */
export function useScrollAnimation(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const targets = ref.current
      ? ref.current.querySelectorAll('.animate-reveal, .animate-reveal-left, .animate-reveal-right')
      : document.querySelectorAll('.animate-reveal, .animate-reveal-left, .animate-reveal-right');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || i * 80;
            setTimeout(() => {
              entry.target.classList.add('revealed');
            }, Number(delay));
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: options.threshold || 0.15,
        rootMargin: options.rootMargin || '0px 0px -40px 0px',
      }
    );

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin]);

  return ref;
}

/**
 * useInView — returns true when the referenced element is in the viewport.
 */
export function useInView(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.inView = 'true';
          if (options.once) observer.unobserve(el);
        } else {
          el.dataset.inView = 'false';
        }
      },
      { threshold: options.threshold || 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
