import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { ChevronDown, MapPin } from 'lucide-react';
import { experience, ExperienceItem } from '../../data/portfolioData';
import SectionHeading from '../ui/SectionHeading';
import './Experience.css';

interface ExperienceCardProps {
  exp: ExperienceItem;
  index: number;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ exp, index }) => {
  const itemRef = useRef<HTMLElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Active node determination via scroll
  const isInView = useInView(itemRef, {
    once: false,
    margin: '-20% 0px -20% 0px',
  });

  const showDetails = isHovered || isExpanded;

  return (
    <motion.article
      ref={itemRef}
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: 'easeOut' }}
      className={`exp-item ${isInView ? 'active-node' : ''} ${showDetails ? 'expanded' : ''}`}
      tabIndex={0}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      onClick={() => setIsExpanded((prev) => !prev)}
      aria-label={`${exp.role} at ${exp.company}. Click or tap to toggle complete details.`}
    >
      {/* Connector dot */}
      <div className="exp-dot" aria-hidden="true">
        <div className={`exp-dot-inner ${isInView ? 'active' : ''}`} />
      </div>

      {/* Date Column (Desktop layout) */}
      <div className="exp-date">
        <div className="exp-period">
          {exp.period.split(' – ').map((part, j) => (
            <span key={j}>
              {part}
              {j === 0 && <br />}
              {j === 0 && '–'}
            </span>
          ))}
        </div>
        <div className="exp-duration font-mono">{exp.duration}</div>
      </div>

      {/* Content Card */}
      <div className="exp-content">
        {/* Mobile Date Row (visible on mobile only) */}
        <div className="exp-mobile-date-row">
          <span className="exp-period-mobile">{exp.period}</span>
          <span className="exp-duration font-mono">{exp.duration}</span>
        </div>

        {/* Header Area */}
        <div className="exp-header">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="exp-company font-sans font-bold">{exp.company}</div>
            <div className="flex items-center gap-2">
              <span className="exp-type-badge">{exp.type}</span>
              <span className="exp-location-badge hidden sm:inline-flex items-center gap-1 font-mono text-[10px] text-slate-500">
                <MapPin size={10} /> {exp.location}
              </span>
            </div>
          </div>

          <div className="exp-role">
            <span className="font-semibold text-slate-200">{exp.role}</span>
          </div>
        </div>

        {/* Short Summary Preview */}
        <p className="exp-summary-preview">
          {exp.description}
        </p>

        {/* Expand/Hover Prompt Hint */}
        <div className="exp-expand-hint" aria-hidden="true">
          <span className="font-mono text-[11px] text-indigo-400 font-medium">
            {showDetails ? 'Hide details' : 'Tap for full responsibilities & tech'}
          </span>
          <ChevronDown
            size={13}
            className={`text-indigo-400 transition-transform duration-300 ${
              showDetails ? 'rotate-180' : ''
            }`}
          />
        </div>

        {/* Expanded Content (Animated Reveal on Hover/Tap) */}
        <div className={`exp-expandable-wrapper ${showDetails ? 'open' : ''}`}>
          <div className="exp-expandable-content pt-3 border-t border-white/5 mt-3">
            {/* Responsibilities list */}
            <div className="exp-responsibilities">
              <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Key Contributions & Responsibilities:
              </div>
              {exp.responsibilities.map((resp, j) => (
                <div key={j} className="exp-responsibility">
                  {resp}
                </div>
              ))}
            </div>

            {/* Tech Tags */}
            <div className="exp-tech-tags">
              {exp.technologies.map((tech) => (
                <span key={tech} className="exp-tech-tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export const Experience: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  // Progressive timeline line fill on scroll
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start center', 'end center'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="experience" className="experience-section section-padding" aria-label="Work Experience">
      <div className="container-max">
        {/* Standardized Section Heading */}
        <SectionHeading
          number="02"
          category="EXPERIENCE"
          title="Work & Internship Experience"
          subtitle="Hands-on engineering across backend optimization, responsive React SPAs, and cross-functional Agile delivery."
        />

        <div ref={timelineRef} className="experience-timeline relative">
          {/* Animated progressive timeline fill line (Responsive coordinates) */}
          <motion.div
            className="exp-progress-line"
            style={{
              height: lineHeight,
            }}
            aria-hidden="true"
          />

          {experience.map((exp, i) => (
            <ExperienceCard key={exp.id} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
