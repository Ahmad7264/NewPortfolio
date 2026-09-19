import React, { useEffect } from 'react';
import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import Experience from '../components/Experience/Experience';
import Projects from '../components/Projects/Projects';
import Skills from '../components/Skills/Skills';
import Education from '../components/Education/Education';
import Certifications from '../components/Certifications/Certifications';
import Contact from '../components/Contact/Contact';
import SpatialOrb from '../components/ui/SpatialOrb';
import ScrollProgress from '../components/ui/ScrollProgress';

export const Home: React.FC = () => {
  useEffect(() => {
    document.title = 'MD Dilshad — Software Engineer | AI & Data Science';
  }, []);

  return (
    <main className="relative bg-[#080b11]" style={{ overflowX: 'clip' }}>
      {/* Single Moving Spatial Prop (Requirement 16, 17, 18) */}
      <SpatialOrb />

      {/* Subtle Global Scroll Progress Indicator (Requirement 19) */}
      <ScrollProgress />

      {/* Hero Section */}
      <Hero />

      {/* Subtle gradient separator */}
      <div
        style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.2), transparent)',
        }}
        aria-hidden="true"
      />

      {/* 01 / About Me Interactive Timeline */}
      <About />

      <div
        style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)',
        }}
        aria-hidden="true"
      />

      {/* 02 / Experience */}
      <Experience />

      <div
        style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)',
        }}
        aria-hidden="true"
      />

      {/* 03 / Selected Projects (Stacking Cards + Zero-Crop Previews) */}
      <Projects />

      <div
        style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)',
        }}
        aria-hidden="true"
      />

      {/* 04 / Technical Skills */}
      <Skills />

      <div
        style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)',
        }}
        aria-hidden="true"
      />

      {/* 05 / Education */}
      <Education />

      <div
        style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)',
        }}
        aria-hidden="true"
      />

      {/* 06 / Certifications */}
      <Certifications />

      <div
        style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.15), transparent)',
        }}
        aria-hidden="true"
      />

      {/* 07 / Contact */}
      <Contact />
    </main>
  );
};

export default Home;
