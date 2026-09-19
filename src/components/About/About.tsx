import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import {
  GraduationCap,
  Briefcase,
  Code2,
  Compass,
  User,
  Zap,
  Shield,
  GitBranch,
} from 'lucide-react';
import { personal, education, experience } from '../../data/portfolioData';
import SectionHeading from '../ui/SectionHeading';
import './About.css';

interface StoryStage {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  accent: string;
  renderContent: () => React.ReactNode;
}

const PRINCIPLES = [
  {
    icon: <Code2 size={15} />,
    title: 'Clean Architecture',
    desc: 'Writing structured, modular code that scales predictably across microservices and frontend SPAs.',
    accent: '#6366f1',
  },
  {
    icon: <Zap size={15} />,
    title: 'Performance-First',
    desc: 'Optimizing backend queries, containerized runtimes, and sub-millisecond frontend interactions.',
    accent: '#06b6d4',
  },
  {
    icon: <Shield size={15} />,
    title: 'Engineering Reliability',
    desc: 'Rigorous API validation, test cases, and systematic log analysis before production deployment.',
    accent: '#8b5cf6',
  },
  {
    icon: <GitBranch size={15} />,
    title: 'Collaborative Workflows',
    desc: 'Agile sprints, atomic Git branching, code reviews, and structured engineering documentation.',
    accent: '#3b82f6',
  },
];

const StoryNode: React.FC<{
  stage: StoryStage;
  index: number;
  total: number;
}> = ({ stage, index }) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(nodeRef, {
    once: false,
    margin: '-20% 0px -20% 0px',
  });

  return (
    <div
      ref={nodeRef}
      id={`story-${stage.id}`}
      className={`about-story-item relative transition-opacity duration-500 ${
        isInView ? 'opacity-100' : 'opacity-40'
      }`}
    >
      {/* Node Marker for Desktop Left Column */}
      <div className="about-node-marker hidden lg:flex">
        <div
          className={`about-node-circle transition-all duration-300 ${
            isInView
              ? 'scale-110 shadow-[0_0_16px_rgba(99,102,241,0.6)] border-indigo-400 bg-indigo-950/80 text-indigo-300'
              : 'border-slate-700 bg-slate-900 text-slate-500'
          }`}
          style={{ borderColor: isInView ? stage.accent : undefined }}
        >
          {stage.icon}
        </div>
      </div>

      {/* Content Card with Smooth Activation */}
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="about-story-card"
        style={{
          // @ts-ignore
          '--card-accent': stage.accent,
        }}
      >
        {/* Stage Header */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span
              className="lg:hidden w-6 h-6 rounded-md flex items-center justify-center text-xs"
              style={{ background: `${stage.accent}20`, color: stage.accent }}
            >
              {stage.icon}
            </span>
            <span
              className="font-mono text-[11px] font-semibold tracking-wider uppercase"
              style={{ color: stage.accent }}
            >
              STAGE 0{index + 1} // {stage.tag}
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-500">{stage.subtitle}</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-slate-100 mb-4 tracking-tight">
          {stage.title}
        </h3>

        {/* Dynamic Stage Body */}
        {stage.renderContent()}
      </motion.div>
    </div>
  );
};

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Progressive scroll-fill for the vertical timeline line
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start center', 'end center'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const STAGES: StoryStage[] = [
    {
      id: 'intro',
      tag: 'ABOUT ME',
      title: 'Designing Reliable Systems Across the Stack',
      subtitle: 'Profile Overview',
      icon: <User size={14} />,
      accent: '#6366f1',
      renderContent: () => (
        <div className="space-y-3.5 text-slate-300 text-sm leading-relaxed">
          {personal.bio.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
          <div className="pt-2 flex flex-wrap gap-2">
            {['Java', 'Spring Boot', 'React', 'TypeScript', 'Docker', 'MySQL'].map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-slate-900/80 border border-slate-700/60 text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'education',
      tag: 'EDUCATION',
      title: 'Academic Excellence & Research Depth',
      subtitle: 'KL University & MGU',
      icon: <GraduationCap size={14} />,
      accent: '#06b6d4',
      renderContent: () => (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {education.map((edu) => (
            <div
              key={edu.id}
              className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase ${
                      edu.status === 'Pursuing'
                        ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-500/30'
                        : 'bg-slate-900 text-slate-400 border border-slate-700'
                    }`}
                  >
                    ✦ {edu.status}
                  </span>
                  <span className="text-xs font-mono font-bold text-cyan-400">
                    CGPA {edu.cgpa}
                  </span>
                </div>
                <div className="font-bold text-slate-100 text-sm sm:text-base">
                  {edu.institution}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  {edu.degree} · {edu.field}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] font-mono text-slate-500">
                {edu.location} ({edu.period})
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'experience',
      tag: 'EXPERIENCE',
      title: 'Real-World Engineering & Team Delivery',
      subtitle: 'Internship Engagements',
      icon: <Briefcase size={14} />,
      accent: '#8b5cf6',
      renderContent: () => (
        <div className="space-y-4">
          {experience.map((exp) => (
            <div
              key={exp.id}
              className="p-4 rounded-xl bg-slate-950/60 border border-slate-800"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <div>
                  <div className="font-bold text-slate-100 text-sm sm:text-base">
                    {exp.role}
                  </div>
                  <div className="text-xs text-indigo-400 font-mono font-medium">
                    {exp.company}
                  </div>
                </div>
                <div className="text-[11px] font-mono text-slate-500">
                  {exp.period} · {exp.duration}
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                {exp.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {exp.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded text-[10px] font-mono bg-violet-950/40 border border-violet-500/25 text-violet-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'journey',
      tag: 'ENGINEERING PRINCIPLES',
      title: 'How I Approach Software Development',
      subtitle: 'Core Philosophy',
      icon: <Code2 size={14} />,
      accent: '#3b82f6',
      renderContent: () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {PRINCIPLES.map((p) => (
            <div
              key={p.title}
              className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/90 flex flex-col gap-1.5"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded-lg flex items-center justify-center"
                  style={{ background: `${p.accent}18`, color: p.accent }}
                >
                  {p.icon}
                </div>
                <div className="text-xs font-bold text-slate-100">{p.title}</div>
              </div>
              <p className="text-[12px] text-slate-400 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: 'focus',
      tag: 'CURRENT FOCUS',
      title: 'Continuous Growth & Scalable Systems',
      subtitle: 'Next Horizons',
      icon: <Compass size={14} />,
      accent: '#10b981',
      renderContent: () => (
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
          <p className="text-sm text-slate-300 leading-relaxed">
            Actively expanding my knowledge in distributed microservices architectures, container orchestration, and deep learning models for intelligent automated software workflows.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
            <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-center">
              <div className="text-emerald-400 font-mono text-[11px] font-semibold">Backend</div>
              <div className="text-xs text-slate-200 mt-0.5">High-Throughput APIs</div>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-center">
              <div className="text-cyan-400 font-mono text-[11px] font-semibold">Edge Cloud</div>
              <div className="text-xs text-slate-200 mt-0.5">Cloudflare & Workers</div>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-center">
              <div className="text-indigo-400 font-mono text-[11px] font-semibold">AI Systems</div>
              <div className="text-xs text-slate-200 mt-0.5">Deep Learning & ML</div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="about" ref={sectionRef} className="about-section section-padding">
      <div className="container-max">
        {/* Standardized Section Heading */}
        <SectionHeading
          number="01"
          category="ABOUT"
          title="Engineering Story & Background"
          subtitle="Scroll to explore my background, academic excellence, internship experience, and engineering principles."
        />

        {/* Interactive Story Timeline Container */}
        <div ref={timelineRef} className="about-timeline-container relative">
          {/* Animated Connecting Vertical Line (Desktop Left) */}
          <div className="about-timeline-track hidden lg:block" aria-hidden="true">
            {/* Background passive line */}
            <div className="about-timeline-bg-line" />
            {/* Active progressive glowing fill */}
            <motion.div
              style={{
                height: lineHeight,
              }}
              className="about-timeline-fill-line"
            />
          </div>

          {/* Story Stages List */}
          <div className="about-story-stages">
            {STAGES.map((stage, idx) => (
              <StoryNode
                key={stage.id}
                stage={stage}
                index={idx}
                total={STAGES.length}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
