import React from 'react';
import { education } from '../../data/portfolioData';
import SectionHeading from '../ui/SectionHeading';
import './Education.css';

const EDU_COLORS = ['#6366f1', '#06b6d4'];

export const Education: React.FC = () => {
  return (
    <section id="education" className="education-section section-padding">
      <div className="container-max">
        {/* Standardized Section Heading */}
        <SectionHeading
          number="05"
          category="EDUCATION"
          title="Academic Background"
          subtitle="Formal engineering education in Artificial Intelligence & Data Science and Computer Science."
        />

        <div className="education-grid">
          {education.map((edu, i) => {
            const color = EDU_COLORS[i] || '#6366f1';
            return (
              <div
                key={edu.id}
                className="edu-card-full"
                // @ts-ignore
                style={{ '--edu-color': color }}
              >
                {/* Large background number */}
                <div className="edu-card-number font-mono" aria-hidden="true">
                  0{i + 1}
                </div>

                {/* Status badge */}
                <div
                  className="edu-status-badge font-mono"
                  style={{
                    color,
                    background: `${color}12`,
                    borderColor: `${color}30`,
                  }}
                >
                  <span
                    style={{
                      width: '5px',
                      height: '5px',
                      borderRadius: '50%',
                      background: color,
                      display: 'inline-block',
                      animation: edu.status === 'Pursuing' ? 'pulse-glow 2s infinite' : 'none',
                    }}
                  />
                  {edu.status}
                </div>

                <div className="edu-inst-name font-sans font-bold">{edu.institution}</div>
                <div className="edu-degree-full font-sans">{edu.degree}</div>
                <div className="edu-field text-slate-400">{edu.field}</div>

                <div className="edu-stats-row font-mono">
                  <div className="edu-stat">
                    <span className="edu-stat-val" style={{ color }}>
                      {edu.cgpa}
                    </span>
                    <span className="edu-stat-lbl">CGPA</span>
                  </div>
                  <div className="edu-stat">
                    <span className="edu-stat-val text-slate-200">
                      {edu.period}
                    </span>
                    <span className="edu-stat-lbl">PERIOD</span>
                  </div>
                </div>

                <div className="edu-highlights">
                  {edu.highlights.map((h) => (
                    <div key={h} className="edu-highlight-item text-xs text-slate-300">
                      <div className="edu-highlight-dot" style={{ background: color }} />
                      {h}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Education;
