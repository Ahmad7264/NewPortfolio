import { useEffect, useRef } from 'react';

/**
 * useMagneticButton — creates a subtle magnetic attraction effect
 * on the referenced element when the cursor is nearby.
 * Automatically disabled on touch devices and with prefers-reduced-motion.
 */
export function useMagneticButton(strength = 0.3) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const isTouchDevice = window.matchMedia('(hover: none)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouchDevice || prefersReducedMotion) return;

    let animFrame;

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.sqrt(distX * distX + distY * distY);
      const maxDist = Math.max(rect.width, rect.height) * 1.5;

      cancelAnimationFrame(animFrame);
      animFrame = requestAnimationFrame(() => {
        if (distance < maxDist) {
          const ratio = 1 - distance / maxDist;
          const moveX = distX * ratio * strength;
          const moveY = distY * ratio * strength;
          el.style.transform = `translate(${moveX}px, ${moveY}px)`;
        } else {
          el.style.transform = 'translate(0, 0)';
        }
      });
    };

    const handleMouseLeave = () => {
      cancelAnimationFrame(animFrame);
      el.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
      el.style.transform = 'translate(0, 0)';
      setTimeout(() => {
        if (el) el.style.transition = '';
      }, 500);
    };

    const area = document.documentElement;
    area.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      area.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animFrame);
    };
  }, [strength]);

  return ref;
}
