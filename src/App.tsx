import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import CustomCursor from './components/CustomCursor/CustomCursor';
import SmoothScroll from './components/SmoothScroll';
import Home from './pages/Home';
import ContactPage from './pages/Contact';
import ProjectDetails from './pages/ProjectDetails';

// Universal hash and route scroll handler
const HashScrollHandler: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (pathname === '/' && hash) {
      const id = hash.replace('#', '');
      const executeScroll = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return true;
        }
        return false;
      };

      if (!executeScroll()) {
        const t1 = setTimeout(executeScroll, 60);
        const t2 = setTimeout(executeScroll, 200);
        const t3 = setTimeout(executeScroll, 450);
        return () => {
          clearTimeout(t1);
          clearTimeout(t2);
          clearTimeout(t3);
        };
      }
    } else if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname, hash]);

  return null;
};

// Page transition wrapper
const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    const el = document.getElementById('page-content');
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(10px)';
    const frame = requestAnimationFrame(() => {
      el.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return (
    <div id="page-content">
      {children}
    </div>
  );
};

const AppContent: React.FC = () => {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Navbar />
      <HashScrollHandler />
      <PageWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/projects" element={<Navigate to="/#projects" replace />} />
          <Route path="/projects/:slug" element={<ProjectDetails />} />
          <Route path="/projects/:projectId" element={<ProjectDetails />} />
          {/* 404 fallback */}
          <Route
            path="*"
            element={
              <div
                style={{
                  minHeight: '100vh',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '1.5rem',
                  background: '#080b11',
                  fontFamily: 'JetBrains Mono, monospace',
                }}
              >
                <span style={{ fontSize: '4rem', fontWeight: 800, color: 'rgba(255,255,255,0.05)' }}>
                  404
                </span>
                <h1 style={{ fontSize: '1.25rem', color: '#94a3b8', fontWeight: 600 }}>
                  Page not found
                </h1>
                <a
                  href="/"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#6366f1',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    border: '1px solid rgba(99,102,241,0.3)',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                  }}
                >
                  ← Back to Home
                </a>
              </div>
            }
          />
        </Routes>
      </PageWrapper>
      <Footer />
    </SmoothScroll>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
