import React, { useRef } from 'react';
import { Download, ArrowRight, Code2, Cpu, Cloud, BookOpen, Lightbulb, Infinity } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { personal } from '../../data/portfolioData';
import { useSectionNavigation } from '../../hooks/useSectionNavigation';
import heroBg from '../../assets/hero-bg.jpg';
import './Hero.css';

export const Hero: React.FC = () => {
  const { scrollToSection } = useSectionNavigation();
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 0.8], [0, -45]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const handleProjectScroll = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToSection('projects');
  };

  return (
    <section id="home" ref={heroRef} className="hero-ref-section" aria-label="Introduction">
      {/* Background Image: High-Rise Developer Workspace with Triple Monitors & City Skyline */}
      <div
        className="hero-ref-bg"
        style={{ backgroundImage: `url(${heroBg})` }}
        aria-hidden="true"
      >
        {/* Dynamic Dark Vignette & Dual-tone Linear Overlays */}
        <div className="hero-ref-gradient-overlay" />
        <div className="hero-ref-radial-glow" />
      </div>

      {/* Floating Center-Right Typography from Reference: IDEAS / CODE / RESEARCH / IMPACT */}
      <div className="hero-ref-mission-quote hidden lg:flex" aria-hidden="true">
        <div className="hero-ref-mission-words">
          <span>IDEAS</span>
          <span>CODE</span>
          <span>RESEARCH</span>
          <span>IMPACT</span>
        </div>
        <div className="hero-ref-mission-line" />
        <span className="hero-ref-mission-sub">THAT'S THE JOURNEY</span>
      </div>

      {/* Floating Right Top Script: Better Code, Brighter Future */}
      <div className="hero-ref-script-tag hidden xl:block" aria-hidden="true">
        <span className="hero-ref-script-line1">Better Code,</span>
        <span className="hero-ref-script-line2">Brighter Future</span>
      </div>

      {/* Floating Right Edge Bullet Tags */}
      <div className="hero-ref-floating-tags hidden xl:flex" aria-hidden="true">
        <span>&gt; Technology</span>
        <span>&gt; Education</span>
        <span>&gt; Open Source</span>
        <span>&gt; Real World Impact</span>
      </div>

      {/* Main Left Content Container */}
      <div className="container-max w-full hero-ref-container">
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="hero-ref-content"
        >
          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="hero-ref-greeting"
          >
            Hello, I'm
          </motion.p>

          {/* Full Capital Name: MOHD DILSHAD */}
          <motion.h1
            initial={{ opacity: 0, y: 22, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="hero-ref-title select-none"
          >
            <span className="hero-ref-name-white">MOHD</span>{' '}
            <span className="hero-ref-name-cyan">DILSHAD</span>
          </motion.h1>

          {/* Roles */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2, ease: 'easeOut' }}
            className="hero-ref-roles"
          >
            <div className="hero-ref-role-primary">Full-Stack Software Engineer</div>
            <div className="hero-ref-role-secondary">
              AI/ML Researcher <span className="hero-ref-role-pipe">|</span> Technology Innovator
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3, ease: 'easeOut' }}
            className="hero-ref-desc"
          >
            Building impactful solutions at the intersection of Software Engineering, Artificial Intelligence and real-world problems.
          </motion.p>

          {/* Action CTAs: View My Work & Download CV */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.4, ease: 'easeOut' }}
            className="hero-ref-ctas"
          >
            <a
              href="#projects"
              onClick={handleProjectScroll}
              className="btn-ref-primary group"
              data-cursor="hover"
            >
              <span>View My Work</span>
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
            </a>

            <a
              href={personal.resumeUrl}
              download="MOHD-Dilshad-Resume.pdf"
              className="btn-ref-secondary group"
              aria-label="Download CV"
            >
              <span>Download CV</span>
              <Download size={15} className="transition-transform duration-200 group-hover:translate-y-0.5" />
            </a>
          </motion.div>

          {/* 5 Domain Icon Strip */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.5, ease: 'easeOut' }}
            className="hero-ref-domains"
          >
            <div className="hero-ref-domain-item">
              <span className="hero-ref-domain-icon text-cyan-400">
                <Code2 size={18} />
              </span>
              <span className="hero-ref-domain-label">Full-Stack<br />Development</span>
            </div>

            <div className="hero-ref-domain-item">
              <span className="hero-ref-domain-icon text-purple-400">
                <Cpu size={18} />
              </span>
              <span className="hero-ref-domain-label">AI &amp;<br />Data Science</span>
            </div>

            <div className="hero-ref-domain-item">
              <span className="hero-ref-domain-icon text-sky-400">
                <Cloud size={18} />
              </span>
              <span className="hero-ref-domain-label">Cloud &amp;<br />DevOps</span>
            </div>

            <div className="hero-ref-domain-item">
              <span className="hero-ref-domain-icon text-emerald-400">
                <BookOpen size={18} />
              </span>
              <span className="hero-ref-domain-label">Research &amp;<br />Systems</span>
            </div>

            <div className="hero-ref-domain-item">
              <span className="hero-ref-domain-icon text-amber-400">
                <Lightbulb size={18} />
              </span>
              <span className="hero-ref-domain-label">Problem<br />Solver</span>
            </div>
          </motion.div>

          {/* Bottom Stats Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="hero-ref-stats"
          >
            <div className="hero-ref-stat-block">
              <span className="hero-ref-stat-num">9.35</span>
              <span className="hero-ref-stat-name">M.Tech CGPA</span>
            </div>

            <div className="hero-ref-stat-block">
              <span className="hero-ref-stat-num text-cyan-400">2+</span>
              <span className="hero-ref-stat-name">Internships</span>
            </div>

            <div className="hero-ref-stat-block">
              <span className="hero-ref-stat-num text-purple-400">5+</span>
              <span className="hero-ref-stat-name">Projects</span>
            </div>

            <div className="hero-ref-stat-block">
              <span className="hero-ref-stat-num text-sky-400">
                <Infinity size={22} className="inline-block" />
              </span>
              <span className="hero-ref-stat-name">Learning</span>
            </div>

            <div className="hero-ref-stat-block">
              <span className="hero-ref-stat-num text-emerald-400">1</span>
              <span className="hero-ref-stat-name">Goal: Impact</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
