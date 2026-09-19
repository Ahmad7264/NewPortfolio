import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface SectionHeadingProps {
  number: string;
  category: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  number,
  category,
  title,
  subtitle,
  align = 'left',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Progressive scroll transition: Starts slightly larger and settles gracefully into position
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start 30%'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 1], [0.3, 0.85, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [24, 0]);

  const isCenter = align === 'center';

  return (
    <motion.div
      ref={containerRef}
      style={{
        scale,
        opacity,
        y,
        transformOrigin: isCenter ? 'center center' : 'left center',
      }}
      className={`mb-10 md:mb-14 select-none ${isCenter ? 'text-center mx-auto' : 'text-left'} ${className}`}
    >
      {/* Monospace Metadata Tag */}
      <div
        className={`inline-flex items-center gap-2 font-mono text-[11px] md:text-xs font-semibold tracking-wider uppercase text-indigo-400 mb-2.5 ${
          isCenter ? 'justify-center' : ''
        }`}
      >
        <span className="text-slate-500 font-bold">{number}</span>
        <span className="text-slate-600">/</span>
        <span className="text-indigo-400">{category}</span>
        <span className="w-1 h-1 rounded-full bg-indigo-500 animate-pulse" />
      </div>

      {/* Primary Bold Title */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-slate-100 tracking-tight leading-[1.15]">
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p
          className={`text-slate-400 text-xs sm:text-sm md:text-base font-normal mt-2.5 max-w-xl leading-relaxed ${
            isCenter ? 'mx-auto' : ''
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeading;
