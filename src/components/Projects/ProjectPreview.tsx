import React from 'react';
import { ProjectItem } from '../../data/portfolioData';
import { CheckCircle2, Server, Database, Search, ShieldCheck } from 'lucide-react';

/* ============================================================
   SHARED HI-FI MOCKUPS
   Used on the project card stack AND the project detail page.
   ============================================================ */

interface MockupProps {
  color: string;
}

export const JavaEvaluatorMockup: React.FC<MockupProps> = ({ color }) => (
  <div className="mockup-content" style={{ background: '#0b0f17', backgroundColor: '#0b0f17' }}>
    <div className="mockup-header">
      <div className="mockup-logo" style={{ background: `linear-gradient(135deg, ${color}, #4338ca)` }}>
        JE
      </div>
      <div>
        <div className="mockup-app-name">JavaEvaluator Engine</div>
        <div className="mockup-app-sub font-mono">Spring Boot REST · MySQL</div>
      </div>
      <span className="mockup-badge" style={{ color: '#818cf8', borderColor: 'rgba(99,102,241,0.3)', background: 'rgba(30,27,75,0.8)' }}>
        Docker
      </span>
    </div>

    <div className="mockup-card">
      <div className="mockup-card-meta">
        <span style={{ color: '#818cf8' }}>QUESTION 04 / 20</span>
        <span style={{ color: '#34d399' }}>Score: 85%</span>
      </div>
      <div className="mockup-question">
        Which Java Collection guarantees O(1) amortised performance for basic operations?
      </div>
      <div className="mockup-options">
        <div className="mockup-option selected">
          <span className="opt-key" style={{ background: color }}>A</span>
          HashSet&lt;E&gt; (Backed by HashTable)
          <CheckCircle2 size={11} className="ml-auto" style={{ color: '#34d399', flexShrink: 0 }} />
        </div>
        <div className="mockup-option">
          <span className="opt-key">B</span>
          LinkedList&lt;E&gt;
        </div>
      </div>
    </div>

    <div className="mockup-footer">
      <span style={{ color: '#34d399', display: 'flex', alignItems: 'center', gap: '4px' }}>
        <Server size={9} /> Render (Backend)
      </span>
      <span style={{ color: '#06b6d4', display: 'flex', alignItems: 'center', gap: '4px' }}>
        <Database size={9} /> MySQL · Connected
      </span>
    </div>
  </div>
);

export const MedicineFinderMockup: React.FC<MockupProps> = ({ color }) => (
  <div className="mockup-content" style={{ background: '#0b0f17', backgroundColor: '#0b0f17' }}>
    <div className="mockup-header">
      <div className="mockup-logo" style={{ background: `linear-gradient(135deg, ${color}, #0891b2)` }}>
        <Search size={11} color="white" />
      </div>
      <div>
        <div className="mockup-app-name">Medicine Finder</div>
        <div className="mockup-app-sub font-mono">Pharmaceutical API</div>
      </div>
      <span className="mockup-badge" style={{ color: '#22d3ee', borderColor: 'rgba(6,182,212,0.3)', background: 'rgba(6,27,50,0.8)' }}>
        Secure .env
      </span>
    </div>

    <div className="mockup-search" style={{ borderColor: `${color}50` }}>
      <Search size={11} style={{ color, flexShrink: 0 }} />
      <span className="mockup-search-text">Amoxicillin 500mg Capsule</span>
      <span className="mockup-http-ok">200 OK</span>
    </div>

    <div className="mockup-card">
      <div className="mockup-card-meta">
        <span style={{ color: '#f1f5f9', fontWeight: 600 }}>Amoxicillin Trihydrate</span>
        <ShieldCheck size={12} style={{ color: '#34d399' }} />
      </div>
      <div className="mockup-question" style={{ fontSize: '9.5px', marginTop: '4px' }}>
        Antibacterial agent for respiratory tract, ear, and throat infections.
      </div>
    </div>

    <div className="mockup-footer">
      <span>Debounced · 250ms</span>
      <span style={{ color: '#22d3ee' }}>Cached In-Memory</span>
    </div>
  </div>
);

/* ============================================================
   BROWSER PREVIEW SHELL
   Wraps screenshot (object-contain) or an in-code mockup.
   Zero-crop guaranteed.
   ============================================================ */

export interface ProjectPreviewProps {
  project: ProjectItem;
  /** Optional override height for use on detail pages */
  height?: string;
}

const ProjectPreview: React.FC<ProjectPreviewProps> = ({ project, height }) => {
  const previewImage = project.image || (project.gallery && project.gallery[0]);

  return (
    <div className="pcard-preview" style={height ? { height } : undefined}>
      {/* Browser chrome */}
      <div className="pcard-preview-chrome">
        <div className="pcard-chrome-dots" aria-hidden="true">
          <span className="pcard-dot pcard-dot--red" />
          <span className="pcard-dot pcard-dot--yellow" />
          <span className="pcard-dot pcard-dot--green" />
        </div>
        <div className="pcard-chrome-url">
          {project.liveUrl || `${project.id}.app`}
        </div>
      </div>

      {/* Content area — zero-crop */}
      <div className="pcard-preview-body">
        {previewImage ? (
          <img
            src={previewImage}
            alt={`${project.title} application interface`}
            className="pcard-screenshot"
            loading="lazy"
          />
        ) : project.id === 'javaevaluator' ? (
          <JavaEvaluatorMockup color={project.color} />
        ) : (
          <MedicineFinderMockup color={project.color} />
        )}
      </div>
    </div>
  );
};

export default ProjectPreview;
