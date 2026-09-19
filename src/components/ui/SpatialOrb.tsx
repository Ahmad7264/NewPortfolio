import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

export const SpatialOrb: React.FC = () => {
  // Global page scroll progress
  const { scrollYProgress } = useScroll();

  // Smooth out scroll progression with a spring
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 24,
    restDelta: 0.001,
  });

  // Waypoints across sections: [0: Home, 0.18: About, 0.38: Experience, 0.58: Projects, 0.78: Skills, 1.0: Contact]
  const scrollRange = [0, 0.18, 0.38, 0.58, 0.78, 1.0];

  // Screen X position percentage (0 to 100vw)
  const x = useTransform(smoothProgress, scrollRange, [
    '78vw',  // Home: upper-right
    '52vw',  // About: center-right
    '16vw',  // Experience: left side
    '74vw',  // Projects: right side
    '38vw',  // Skills: center-left
    '28vw',  // Contact: bottom-left
  ]);

  // Screen Y position percentage (0 to 100vh)
  const y = useTransform(smoothProgress, scrollRange, [
    '18vh',  // Home
    '32vh',  // About
    '48vh',  // Experience
    '62vh',  // Projects
    '76vh',  // Skills
    '88vh',  // Contact
  ]);

  // Dynamic subtle scale
  const scale = useTransform(smoothProgress, scrollRange, [
    1.0,
    1.15,
    0.95,
    1.2,
    1.0,
    1.1,
  ]);

  // Subtle rotation to enhance the spatial feeling
  const rotate = useTransform(smoothProgress, [0, 1], [0, 360]);

  // Dynamic hue tint based on section
  const glowColor = useTransform(smoothProgress, scrollRange, [
    'rgba(99, 102, 241, 0.25)', // Indigo for Hero
    'rgba(6, 182, 212, 0.25)',  // Cyan for About
    'rgba(139, 92, 246, 0.25)', // Violet for Experience
    'rgba(99, 102, 241, 0.3)',  // Indigo for Projects
    'rgba(59, 130, 246, 0.25)', // Blue for Skills
    'rgba(168, 85, 247, 0.25)', // Purple for Contact
  ]);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[1] overflow-hidden"
      aria-hidden="true"
    >
      <motion.div
        style={{
          x,
          y,
          scale,
          rotate,
          transformOrigin: 'center center',
        }}
        className="absolute -top-10 -left-10 w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center will-change-transform"
      >
        {/* Outer ambient glow halo */}
        <motion.div
          style={{
            backgroundColor: glowColor,
          }}
          className="absolute inset-0 rounded-full blur-2xl opacity-60 transition-colors duration-700"
        />

        {/* Geometric spatial node ring */}
        <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-xl border border-indigo-400/40 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.35)]">
          {/* Inner core node */}
          <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-indigo-400 to-cyan-300 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />

          {/* Micro orbital coordinates */}
          <div className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping opacity-75" />
        </div>
      </motion.div>
    </div>
  );
};

export default SpatialOrb;
