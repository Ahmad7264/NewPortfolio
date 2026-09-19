import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div
      className="fixed right-3 md:right-5 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col items-center gap-2 pointer-events-none select-none"
      aria-hidden="true"
    >
      {/* Top track point */}
      <div className="w-1 h-1 rounded-full bg-slate-700" />

      {/* Progress track background */}
      <div className="w-[2px] h-24 md:h-32 bg-slate-800/80 rounded-full overflow-hidden relative">
        <motion.div
          style={{ scaleY, transformOrigin: 'top' }}
          className="w-full h-full bg-gradient-to-b from-indigo-500 via-indigo-400 to-cyan-400 shadow-[0_0_8px_rgba(99,102,241,0.6)]"
        />
      </div>

      {/* Bottom track point */}
      <div className="w-1 h-1 rounded-full bg-slate-700" />
    </div>
  );
};

export default ScrollProgress;
