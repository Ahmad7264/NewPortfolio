import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import {
  Layout,
  Server,
  Code2,
  Database,
  Cloud,
  Brain,
} from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import './Skills.css';

interface SkillTimelineCategory {
  number: string;
  id: string;
  label: string;
  tagline: string;
  color: string;
  icon: React.ReactNode;
  technologies: string[];
}

const SKILL_CATEGORIES: SkillTimelineCategory[] = [
  {
    number: '01',
    id: 'frontend',
    label: 'Frontend Development',
    tagline: 'Modern, responsive component architecture & interactive interfaces',
    color: '#6366f1',
    icon: <Layout size={16} />,
    technologies: ['React.js', 'TypeScript', 'JavaScript', 'HTML5 / CSS3', 'Tailwind CSS', 'Vite', 'Motion'],
  },
  {
    number: '02',
    id: 'backend',
    label: 'Backend & APIs',
    tagline: 'Enterprise services, RESTful endpoint design & containerized services',
    color: '#8b5cf6',
    icon: <Server size={16} />,
    technologies: ['Spring Boot', 'Node.js', 'REST APIs', 'Java', 'Python', 'API Validation', 'Microservices'],
  },
  {
    number: '03',
    id: 'languages',
    label: 'Programming Languages',
    tagline: 'Strong core fundamentals in strongly-typed & scripting languages',
    color: '#06b6d4',
    icon: <Code2 size={16} />,
    technologies: ['Java', 'Python', 'JavaScript', 'TypeScript', 'C'],
  },
  {
    number: '04',
    id: 'databases',
    label: 'Databases & Storage',
    tagline: 'Relational data modeling, distributed edge KV & SQL queries',
    color: '#3b82f6',
    icon: <Database size={16} />,
    technologies: ['MySQL', 'PostgreSQL', 'Cloudflare KV', 'DBMS Architecture', 'SQL Optimization'],
  },
  {
    number: '05',
    id: 'devops',
    label: 'Cloud & DevOps',
    tagline: 'Containerization, serverless edge workers & production pipelines',
    color: '#f59e0b',
    icon: <Cloud size={16} />,
    technologies: ['Docker', 'Git & GitHub', 'Cloudflare Workers', 'Capacitor', 'Netlify', 'Render', 'VS Code'],
  },
  {
    number: '06',
    id: 'aiml',
    label: 'AI & Data Science',
    tagline: 'M.Tech research in deep learning, algorithms & data intelligence',
    color: '#10b981',
    icon: <Brain size={16} />,
    technologies: ['Machine Learning', 'Deep Learning', 'Data Analytics', 'Data Structures & Algorithms', 'AI Systems'],
  },
];

const SkillTimelineNode: React.FC<{
  cat: SkillTimelineCategory;
  index: number;
}> = ({ cat, index }) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(nodeRef, {
    once: false,
    margin: '-20% 0px -20% 0px',
  });

  return (
    <div
      ref={nodeRef}
      id={`skill-cat-${cat.id}`}
      className={`skills-timeline-item relative transition-opacity duration-500 ${
        isInView ? 'opacity-100' : 'opacity-40'
      }`}
    >
      {/* Node Marker for Desktop Timeline */}
      <div className="skills-node-marker hidden lg:flex">
        <div
          className={`skills-node-circle transition-all duration-300 ${
            isInView
              ? 'scale-110 shadow-[0_0_16px_rgba(99,102,241,0.6)] border-indigo-400 bg-indigo-950/80 text-indigo-300'
              : 'border-slate-700 bg-slate-900 text-slate-500'
          }`}
          style={{
            borderColor: isInView ? cat.color : undefined,
            color: isInView ? cat.color : undefined,
          }}
        >
          {cat.icon}
        </div>
      </div>

      {/* Category Card with Smooth Staggered Content */}
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
        className="skills-timeline-card"
        style={{
          // @ts-ignore
          '--cat-color': cat.color,
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-2.5 flex-wrap">
          <div className="flex items-center gap-2">
            <span
              className="lg:hidden w-6 h-6 rounded-md flex items-center justify-center text-xs"
              style={{ background: `${cat.color}20`, color: cat.color }}
            >
              {cat.icon}
            </span>
            <span
              className="font-mono text-[11px] font-bold tracking-wider uppercase"
              style={{ color: cat.color }}
            >
              CATEGORY {cat.number}
            </span>
          </div>
          <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">
            {cat.technologies.length} Technologies
          </span>
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-slate-100 mb-1.5 tracking-tight font-sans">
          {cat.label}
        </h3>

        <p className="text-xs text-slate-400 mb-4 leading-relaxed">
          {cat.tagline}
        </p>

        {/* Technology Badges with Staggered Entrance and Micro-Interactions */}
        <div className="flex flex-wrap gap-2 pt-1 border-t border-white/5">
          {cat.technologies.map((tech, tIdx) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: tIdx * 0.04 }}
              className="skill-tech-badge group/badge"
              tabIndex={0}
            >
              <span
                className="w-1.5 h-1.5 rounded-full transition-transform duration-200 group-hover/badge:scale-125"
                style={{ background: cat.color }}
              />
              <span className="text-slate-300 font-mono text-[11px] sm:text-xs transition-colors duration-200 group-hover/badge:text-white">
                {tech}
              </span>
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export const Skills: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  // Progressive scroll-fill for the vertical timeline line
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start center', 'end center'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="skills" className="skills-section section-padding" aria-label="Technical Skills">
      <div className="container-max">
        {/* Standardized Section Heading */}
        <SectionHeading
          number="04"
          category="SKILLS"
          title="Technical Skills Timeline"
          subtitle="Scroll through a structured technical progression from frontend & backend to databases, cloud infrastructure, and AI research."
        />

        {/* Vertical Skills Timeline */}
        <div ref={timelineRef} className="skills-timeline-container relative">
          {/* Animated Connecting Vertical Line (Desktop Left) */}
          <div className="skills-timeline-track hidden lg:block" aria-hidden="true">
            {/* Background passive line */}
            <div className="skills-timeline-bg-line" />
            {/* Active progressive glowing fill */}
            <motion.div
              style={{
                height: lineHeight,
              }}
              className="skills-timeline-fill-line"
            />
          </div>

          {/* Timeline Categories */}
          <div className="skills-timeline-stages">
            {SKILL_CATEGORIES.map((cat, idx) => (
              <SkillTimelineNode
                key={cat.id}
                cat={cat}
                index={idx}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
