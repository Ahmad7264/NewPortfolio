import React, { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [cursorState, setCursorState] = useState('default');
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const animFrame = useRef<number | null>(null);

  useEffect(() => {
    // Disable on touch devices
    const isTouchDevice = window.matchMedia('(hover: none)').matches;
    if (isTouchDevice) return;

    // Hide native cursor on body
    document.body.style.cursor = 'none';

    const moveDot = (x: number, y: number) => {
      if (dotRef.current) {
        dotRef.current.style.left = `${x}px`;
        dotRef.current.style.top = `${y}px`;
      }
    };

    const lerpRing = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`;
        ringRef.current.style.top = `${ringPos.current.y}px`;
      }
      animFrame.current = requestAnimationFrame(lerpRing);
    };

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      moveDot(e.clientX, e.clientY);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      if (target.closest('[data-cursor="project"]')) {
        setCursorState('cursor-project');
      } else if (target.closest('a, button, [role="button"], [data-cursor="link"]')) {
        setCursorState('cursor-link');
      } else if (target.closest('[data-cursor="hover"]')) {
        setCursorState('cursor-hover');
      } else {
        setCursorState('default');
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    animFrame.current = requestAnimationFrame(lerpRing);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
      document.body.style.cursor = '';
    };
  }, []);

  const stateClass = cursorState === 'default' ? '' : cursorState;

  return (
    <>
      <div ref={dotRef} className={`cursor-dot ${stateClass}`} aria-hidden="true" />
      <div ref={ringRef} className={`cursor-ring ${stateClass}`} aria-hidden="true" />
    </>
  );
};

export default CustomCursor;
