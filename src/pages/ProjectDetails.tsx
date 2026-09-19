import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { GithubIcon } from '../components/icons/SocialIcons';
import { projects } from '../data/portfolioData';
import ProjectPreview from '../components/Projects/ProjectPreview';

export const ProjectDetails: React.FC = () => {
  const { slug, projectId } = useParams<{ slug?: string; projectId?: string }>();
  const targetId = slug || projectId;
  const navigate = useNavigate();

  const currentIndex = projects.findIndex(
    (p) => p.slug === targetId || p.id === targetId
  );
  const project = currentIndex !== -1 ? projects[currentIndex] : null;

  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  useEffect(() => {
    if (project) {
      document.title = `${project.title} — MD Dilshad | Case Study`;
    }
    window.scrollTo(0, 0);
  }, [project]);

  if (!project) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.5rem',
          background: '#080b11',
        }}
      >
        <h1 style={{ fontSize: '1.75rem', color: '#f1f5f9', fontWeight: 700 }}>
          Project not found
        </h1>
        <Link
          to="/#projects"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#6366f1',
            textDecoration: 'none',
            fontSize: '0.875rem',
            border: '1px solid rgba(99,102,241,0.3)',
            padding: '0.5rem 1.25rem',
            borderRadius: '8px',
          }}
        >
          <ArrowLeft size={14} /> Return to Projects
        </Link>
      </div>
    );
  }

  const liveUrl = project.liveUrl || project.links?.live;
  const githubUrl = project.githubUrl || project.links?.github;

  return (
    <main style={{ minHeight: '100vh', background: '#080b11', paddingTop: '5rem' }}>
      {/* Hero Banner */}
      <div
        style={{
          position: 'relative',
          paddingTop: '3.5rem',
          paddingBottom: '3.5rem',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          overflow: 'hidden',
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(ellipse 60% 70% at 50% 0%, ${project.color}15, transparent)`,
            pointerEvents: 'none',
          }}
          aria-hidden="true"
        />

        <div className="container-max" style={{ position: 'relative', zIndex: 1 }}>
          {/* Back button */}
          <button
            onClick={() => navigate('/#projects')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#64748b',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.825rem',
              fontFamily: 'JetBrains Mono, monospace',
              marginBottom: '1.75rem',
              padding: 0,
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#f1f5f9')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#64748b')}
          >
            <ArrowLeft size={14} />
            Back to Projects Showcase
          </button>

          {/* Category & Number badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <span
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#64748b',
              }}
            >
              PROJECT {project.number}
            </span>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.65rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                padding: '0.25rem 0.75rem',
                borderRadius: '999px',
                color: project.color,
                background: `${project.color}15`,
                border: `1px solid ${project.color}35`,
              }}
            >
              <span
                style={{
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  background: project.color,
                }}
              />
              {project.category}
            </span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              fontWeight: 800,
              color: '#f8fafc',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              marginBottom: '0.75rem',
            }}
          >
            {project.title}
          </h1>

          <p
            style={{
              fontSize: '1.05rem',
              color: '#94a3b8',
              fontFamily: 'JetBrains Mono, monospace',
              marginBottom: '1.5rem',
            }}
          >
            {project.subtitle}
          </p>

          <p
            style={{
              fontSize: '1rem',
              color: '#cbd5e1',
              lineHeight: '1.8',
              maxWidth: '720px',
              marginBottom: '2.5rem',
            }}
          >
            {project.description}
          </p>

          {/* Action CTAs */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {liveUrl ? (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.7rem 1.4rem',
                  borderRadius: '9px',
                  background: `linear-gradient(135deg, ${project.color}, #8b5cf6)`,
                  color: '#fff',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  boxShadow: `0 4px 20px ${project.color}35`,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = '')}
              >
                <ExternalLink size={15} />
                Visit Live Project
              </a>
            ) : (
              <button
                type="button"
                disabled
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.7rem 1.4rem',
                  borderRadius: '9px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#64748b',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  cursor: 'not-allowed',
                }}
              >
                Live Demo Unavailable
              </button>
            )}

            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.7rem 1.4rem',
                  borderRadius: '9px',
                  border: '1px solid rgba(255,255,255,0.12)',
                  background: 'rgba(255,255,255,0.04)',
                  color: '#cbd5e1',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                  e.currentTarget.style.color = '#cbd5e1';
                }}
              >
                <GithubIcon size={16} />
                GitHub Repository
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Visual Showcase */}
      <div className="container-max" style={{ paddingTop: '3rem', paddingBottom: '2rem' }}>
        <div
          style={{
            borderRadius: '20px',
            border: `1px solid ${project.color}30`,
            background: 'rgba(13,17,23,0.95)',
            overflow: 'hidden',
            boxShadow: `0 20px 60px rgba(0,0,0,0.6), 0 0 40px ${project.color}15`,
            height: '420px',
          }}
        >
          <ProjectPreview project={project} />
        </div>
      </div>

      {/* Content Layout */}
      <div className="container-max" style={{ paddingTop: '2rem', paddingBottom: '6rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 340px',
            gap: '3.5rem',
            alignItems: 'start',
          }}
        >
          {/* Main Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.75rem' }}>
            {/* Key Highlights */}
            <Section title="Key Highlights" color={project.color}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {project.highlights?.map((highlight, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                    <div
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: project.color,
                        marginTop: '8px',
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ fontSize: '0.95rem', color: '#cbd5e1', lineHeight: '1.7' }}>
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </Section>

            {/* Problem & Solution */}
            {project.problem && (
              <Section title="The Challenge" color={project.color}>
                <p style={{ fontSize: '0.95rem', color: '#94a3b8', lineHeight: '1.8' }}>
                  {project.problem}
                </p>
              </Section>
            )}

            {project.solution && (
              <Section title="Architectural Solution" color={project.color}>
                <p style={{ fontSize: '0.95rem', color: '#94a3b8', lineHeight: '1.8' }}>
                  {project.solution}
                </p>
              </Section>
            )}

            {/* Architecture Details */}
            {project.architecture && (
              <Section title="Technical Architecture" color={project.color}>
                <div
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: `1px solid ${project.color}25`,
                    borderRadius: '14px',
                    padding: '1.5rem',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.85rem',
                    color: '#94a3b8',
                    lineHeight: '1.8',
                  }}
                >
                  {project.architecture}
                </div>
              </Section>
            )}
          </div>

          {/* Sidebar */}
          <aside style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'sticky', top: '7rem' }}>
            {/* Tech Stack */}
            <div
              style={{
                background: 'rgba(13,17,23,0.9)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                padding: '1.5rem',
              }}
            >
              <div
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.7rem',
                  color: '#64748b',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: '1rem',
                  fontWeight: 600,
                }}
              >
                Technologies Used
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {project.technologies?.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '0.725rem',
                      padding: '0.35rem 0.75rem',
                      borderRadius: '6px',
                      background: `${project.color}12`,
                      border: `1px solid ${project.color}28`,
                      color: project.color,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Project Specs */}
            <div
              style={{
                background: 'rgba(13,17,23,0.9)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                padding: '1.5rem',
              }}
            >
              <div
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.7rem',
                  color: '#64748b',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: '1rem',
                  fontWeight: 600,
                }}
              >
                Project Specification
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.825rem' }}>
                  <span style={{ color: '#64748b', fontFamily: 'JetBrains Mono, monospace' }}>Year</span>
                  <span style={{ color: '#f1f5f9', fontWeight: 600 }}>{project.year || '2024'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.825rem' }}>
                  <span style={{ color: '#64748b', fontFamily: 'JetBrains Mono, monospace' }}>Category</span>
                  <span style={{ color: '#f1f5f9', fontWeight: 600 }}>{project.category}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.825rem' }}>
                  <span style={{ color: '#64748b', fontFamily: 'JetBrains Mono, monospace' }}>Status</span>
                  <span style={{ color: '#10b981', fontWeight: 600 }}>● Completed</span>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Bottom Project-to-Project Navigation */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '4rem',
            marginTop: '4rem',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          {prevProject ? (
            <Link
              to={`/projects/${prevProject.slug || prevProject.id}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem',
                textDecoration: 'none',
                color: '#94a3b8',
              }}
            >
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: '#64748b' }}>
                ← Previous Project
              </span>
              <span style={{ fontSize: '1rem', fontWeight: 700, color: '#f1f5f9' }}>
                {prevProject.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {nextProject ? (
            <Link
              to={`/projects/${nextProject.slug || nextProject.id}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: '0.25rem',
                textDecoration: 'none',
                color: '#94a3b8',
              }}
            >
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: '#64748b' }}>
                Next Project →
              </span>
              <span style={{ fontSize: '1rem', fontWeight: 700, color: '#f1f5f9' }}>
                {nextProject.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </main>
  );
};

const Section: React.FC<{ title: string; color: string; children: React.ReactNode }> = ({
  title,
  color,
  children,
}) => (
  <div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
      <div style={{ width: '3px', height: '22px', borderRadius: '2px', background: color }} />
      <h2
        style={{
          fontSize: '1.25rem',
          fontWeight: 700,
          color: '#f8fafc',
          letterSpacing: '-0.02em',
        }}
      >
        {title}
      </h2>
    </div>
    {children}
  </div>
);

export default ProjectDetails;
