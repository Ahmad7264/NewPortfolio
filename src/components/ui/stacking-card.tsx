import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue, HTMLMotionProps } from 'motion/react';
import { cn } from '@/lib/utils';

export interface StackingCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  index: number;
  totalCards: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale?: number;
  children: React.ReactNode;
  className?: string;
  topOffset?: number;
}

export const StackingCard: React.FC<StackingCardProps> = ({
  index,
  totalCards,
  progress,
  range,
  targetScale = 0.9,
  children,
  className,
  topOffset = 24,
  ...props
}) => {
  const clampedRange: [number, number] = [
    Math.max(0, Math.min(1, range[0])),
    Math.max(0, Math.min(1, range[1])),
  ];

  // Scale down card as we scroll past its range
  const scale = useTransform(progress, clampedRange, [1, targetScale]);
  // Subtle opacity reduction for background cards
  const opacity = useTransform(progress, clampedRange, [1, 0.6]);

  return (
    <div
      className="sticky top-0 flex items-center justify-center w-full"
      style={{
        top: `calc(12vh + ${index * topOffset}px)`,
        zIndex: index + 1,
      }}
    >
      <motion.div
        style={{
          scale,
          opacity,
          transformOrigin: 'top center',
        }}
        className={cn(
          'relative w-full rounded-2xl transition-shadow duration-300',
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    </div>
  );
};

export interface StackingContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const StackingContainer: React.FC<StackingContainerProps> = ({
  children,
  className,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <div ref={containerRef} className={cn('relative w-full', className)} {...props}>
      {children}
    </div>
  );
};
