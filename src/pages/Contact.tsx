import React, { useEffect } from 'react';
import Contact from '../components/Contact/Contact';

export const ContactPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Contact — MD Dilshad';
    window.scrollTo(0, 0);
  }, []);

  return (
    <main style={{ paddingTop: '5rem', minHeight: '100vh', background: '#080b11' }}>
      {/* Hero-like top area */}
      <div
        style={{
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          paddingTop: '4rem',
          paddingBottom: '4rem',
          background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(99,102,241,0.06), transparent)',
        }}
      >
        <div className="container-max" style={{ textAlign: 'center' }}>
          <div className="section-label" style={{ justifyContent: 'center', marginBottom: '1rem' }}>
            Let's Connect
          </div>
          <h1
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 800,
              color: '#f1f5f9',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              marginBottom: '1rem',
            }}
          >
            Get in Touch
          </h1>
          <p
            style={{
              fontSize: '1rem',
              color: '#64748b',
              maxWidth: '480px',
              margin: '0 auto',
              lineHeight: '1.7',
            }}
          >
            I'm available for software engineering roles, internships, and collaborative projects.
          </p>
        </div>
      </div>

      <Contact />
    </main>
  );
};

export default ContactPage;
