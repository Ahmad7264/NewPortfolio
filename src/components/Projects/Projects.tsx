import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';
import { projects, ProjectItem } from '../../data/portfolioData';
import ProjectPreview from './ProjectPreview';
import './Projects.css';

interface StackingCardProps {
  project: ProjectItem;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

const ProjectStackCard: React.FC<StackingCardProps> = ({
  project,
  index,
  total,
  progress,
}) => {
  // Calibrated timeline keyframe intervals for 5 projects
  // Project 01: front at start
  // Project 02: slides up onto 01
  // Project 03: slides up onto 02
  // Project 04: slides up onto 03
  // Project 05: slides up onto 04
  const timeline = [0, 0.06, 0.24, 0.30, 0.48, 0.54, 0.72, 0.78, 0.94, 1.0];

  let yOutput: number[];
  let scaleOutput: number[];
  let brightnessOutput: number[];

  if (index === 0) {
    yOutput = [0, 0, -20, -20, -40, -40, -60, -60, -80, -80];
    scaleOutput = [1.0, 1.0, 0.98, 0.98, 0.96, 0.96, 0.94, 0.94, 0.92, 0.92];
    brightnessOutput = [1.0, 1.0, 0.92, 0.92, 0.85, 0.85, 0.78, 0.78, 0.72, 0.72];
  } else if (index === 1) {
    yOutput = [450, 450, 0, 0, -20, -20, -40, -40, -60, -60];
    scaleOutput = [0.98, 0.98, 1.0, 1.0, 0.98, 0.98, 0.96, 0.96, 0.94, 0.94];
    brightnessOutput = [1.0, 1.0, 1.0, 1.0, 0.92, 0.92, 0.85, 0.85, 0.78, 0.78];
  } else if (index === 2) {
    yOutput = [450, 450, 450, 450, 0, 0, -20, -20, -40, -40];
    scaleOutput = [0.98, 0.98, 0.98, 0.98, 1.0, 1.0, 0.98, 0.98, 0.96, 0.96];
    brightnessOutput = [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.92, 0.92, 0.85, 0.85];
  } else if (index === 3) {
    yOutput = [450, 450, 450, 450, 450, 450, 0, 0, -20, -20];
    scaleOutput = [0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 1.0, 1.0, 0.98, 0.98];
    brightnessOutput = [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.92, 0.92];
  } else {
    yOutput = [450, 450, 450, 450, 450, 450, 450, 450, 0, 0];
    scaleOutput = [0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 0.98, 1.0, 1.0];
    brightnessOutput = [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0];
  }

  const y = useTransform(progress, timeline, yOutput);
  const scale = useTransform(progress, timeline, scaleOutput);
  const brightness = useTransform(progress, timeline, brightnessOutput);
  const filter = useTransform(brightness, (b) => `brightness(${b})`);

  const hasLiveUrl = Boolean(project.liveUrl);

  const actionButtons = (
    <div className="pcard-actions">
      <Link
        to={`/projects/${project.slug || project.id}`}
        className="pcard-btn pcard-btn--secondary group/btn"
        aria-label={`View full case study for ${project.title}`}
      >
        <span>View Details</span>
        <ArrowRight size={13} className="transition-transform duration-200 group-hover/btn:translate-x-0.5" />
      </Link>

      {hasLiveUrl ? (
        <a
          href={project.liveUrl!}
          target="_blank"
          rel="noopener noreferrer"
          className="pcard-btn pcard-btn--primary group/live"
          style={{
            background: `linear-gradient(135deg, ${project.color} 0%, #6366f1 100%)`,
            boxShadow: `0 4px 18px ${project.color}30`,
          }}
          aria-label={`Open ${project.title} live demo in new tab`}
        >
          <ExternalLink size={13} className="transition-transform duration-200 group-hover/live:-translate-y-0.5" />
          <span>Live Project →</span>
        </a>
      ) : (
        <button
          type="button"
          disabled
          className="pcard-btn pcard-btn--disabled"
          aria-disabled="true"
          title="Live demo not currently hosted"
        >
          No Live Demo
        </button>
      )}
    </div>
  );

  return (
    <div
      className="pcard-stack-item"
      style={{
        zIndex: (index + 1) * 10,
      }}
    >
      <motion.article
        style={{
          y,
          scale,
          filter,
          transformOrigin: 'top center',
          // @ts-ignore
          '--card-glow': `${project.color}15`,
        }}
        className="pcard"
        aria-label={`Project ${project.number}: ${project.title}`}
      >
        {/* ── Content Area: Metadata, tags & buttons (100% SOLID OPAQUE) ── */}
        <div className="pcard-content">
          <div className="pcard-content-top">
            {/* Meta row: Number + Category */}
            <div className="pcard-meta-row">
              <span className="pcard-number">PROJECT {project.number}</span>
              <span
                className="pcard-category"
                style={{
                  color: project.color,
                  borderColor: `${project.color}35`,
                  background: `${project.color}15`,
                }}
              >
                <span
                  className="pcard-category-dot"
                  style={{ background: project.color }}
                />
                {project.category}
              </span>
            </div>

            {/* Title & subtitle */}
            <h3 className="pcard-title">{project.title}</h3>
            <p className="pcard-subtitle">{project.subtitle}</p>

            {/* Short description */}
            <p className="pcard-description">{project.description}</p>
          </div>

          <div className="pcard-content-bottom">
            {/* Technology tags */}
            <div className="pcard-tags">
              {project.technologies.slice(0, 5).map((tech) => (
                <span key={tech} className="pcard-tag">
                  {tech}
                </span>
              ))}
              {project.technologies.length > 5 && (
                <span className="pcard-tag pcard-tag--more">
                  +{project.technologies.length - 5}
                </span>
              )}
            </div>

            {/* Desktop Action buttons */}
            <div className="pcard-desktop-actions">
              {actionButtons}
            </div>
          </div>
        </div>

        {/* ── Mobile Action buttons (shown above image on mobile) ── */}
        <div className="pcard-mobile-actions">
          {actionButtons}
        </div>

        {/* ── Right side / Mobile Bottom: Large Website Preview ── */}
        <div className="pcard-preview-column">
          <ProjectPreview project={project} />
        </div>
      </motion.article>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   PROJECTS SECTION ROOT
───────────────────────────────────────────────────────────── */
export const Projects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const featuredProjects = projects.filter((p) => p.featured !== false);
  const total = featuredProjects.length;

  // Single shared scroll tracker for the entire pinned section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section id="projects" className="projects-section" aria-label="Selected Projects">
      {/*
        PINNED INTERACTION AREA:
        The scroll track sets the calibrated travel distance (240vh).
        Inside is a sticky frame (top: 0, height: 100vh) that locks to the screen,
        keeping the entire showcase in ONE FIXED SCREEN POSITION while cards stack!
      */}
      <div ref={containerRef} className="projects-scroll-track">
        <div className="projects-pinned-frame">
          <div className="projects-pinned-content">
            {/* Pinned Section Heading — Centered, properly spaced above stack */}
            <div className="projects-heading-wrap">
              <div className="projects-category-label">
                <span className="projects-category-num">03</span>
                <span className="projects-category-sep">/</span>
                <span className="projects-category-text">PROJECTS</span>
              </div>
              <h2 className="projects-main-title">Selected Projects</h2>
              <p className="projects-subtitle">Scroll to explore my work.</p>
            </div>

            {/* Pinned Card Stack Viewport */}
            <div className="pcard-stack-viewport">
              {featuredProjects.map((project, idx) => (
                <ProjectStackCard
                  key={project.id}
                  project={project}
                  index={idx}
                  total={total}
                  progress={scrollYProgress}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
