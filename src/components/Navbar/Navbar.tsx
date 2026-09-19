import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Download, ArrowRight } from 'lucide-react';
import { personal } from '../../data/portfolioData';
import Logo from '../ui/Logo';
import './Navbar.css';

interface NavLinkItem {
  label: string;
  href: string;
  section: string;
}

const NAV_LINKS: NavLinkItem[] = [
  { label: 'Home', href: '/', section: 'home' },
  { label: 'About', href: '/#about', section: 'about' },
  { label: 'Experience', href: '/#experience', section: 'experience' },
  { label: 'Projects', href: '/#projects', section: 'projects' },
  { label: 'Skills', href: '/#skills', section: 'skills' },
  { label: 'Academics', href: '/#education', section: 'education' },
  { label: 'Certifications', href: '/#certifications', section: 'certifications' },
  { label: 'Contact', href: '/contact', section: 'contact' },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll listener for navbar glass styling & active section on homepage
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);

          if (location.pathname === '/') {
            const sections = ['contact', 'certifications', 'education', 'skills', 'projects', 'experience', 'about', 'home'];
            const scrollPos = window.scrollY + 200;

            for (const sec of sections) {
              const el = document.getElementById(sec);
              if (el) {
                const top = el.offsetTop;
                if (scrollPos >= top) {
                  setActiveSection(sec);
                  break;
                }
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent, link: NavLinkItem) => {
      e.preventDefault();
      setMobileOpen(false);

      if (link.href === '/contact') {
        if (location.pathname === '/contact') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          navigate('/contact');
        }
        return;
      }

      if (link.href === '/') {
        if (location.pathname === '/') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          window.history.replaceState(null, '', '/');
          setActiveSection('home');
        } else {
          navigate('/');
        }
        return;
      }

      if (link.href.startsWith('/#')) {
        const sectionId = link.section || link.href.slice(2);
        if (location.pathname === '/') {
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            window.history.replaceState(null, '', `/#${sectionId}`);
            setActiveSection(sectionId);
          }
        } else {
          navigate(`/#${sectionId}`);
        }
      }
    },
    [location.pathname, navigate]
  );

  const isLinkActive = (link: NavLinkItem) => {
    if (link.section === 'contact') {
      return location.pathname === '/contact' || (location.pathname === '/' && activeSection === 'contact');
    }
    if (location.pathname.startsWith('/projects')) {
      return link.section === 'projects';
    }
    if (location.pathname === '/') {
      return activeSection === link.section;
    }
    return false;
  };

  return (
    <>
      <header
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
        role="banner"
      >
        <div className="navbar-container">
          {/* Left: AI-Generated MD Emblem Logo */}
          <div className="navbar-brand">
            <Logo size="md" showText={false} />
          </div>

          {/* Center: Full Desktop Navigation Links */}
          <nav className="desktop-nav" role="navigation" aria-label="Main navigation">
            {NAV_LINKS.map((link) => {
              const active = isLinkActive(link);
              return (
                <a
                  key={link.section}
                  href={link.href}
                  className={`nav-link ${active ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(e, link)}
                >
                  {link.label}
                  {active && (
                    <span className="nav-active-indicator" aria-hidden="true" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right: Let's Connect (LinkedIn) + Mobile Menu Toggle */}
          <div className="navbar-right">
            <a
              href={personal.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-connect-btn desktop-connect group"
              aria-label="Connect on LinkedIn"
            >
              <span>Let's Connect</span>
              <ArrowRight size={14} className="connect-arrow transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>

            {/* Mobile Menu Toggle Button (Visible on mobile screens <= 768px) */}
            <button
              className={`mobile-menu-btn ${mobileOpen ? 'open' : ''}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              type="button"
            >
              {mobileOpen ? <X size={20} className="text-slate-200" /> : <Menu size={20} className="text-slate-200" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer Overlay */}
      <div
        className={`mobile-menu-overlay ${mobileOpen ? 'open' : ''}`}
        aria-hidden={!mobileOpen}
        role="dialog"
        aria-label="Mobile navigation menu"
      >
        <div className="mobile-menu-backdrop" onClick={() => setMobileOpen(false)} />
        <nav className="mobile-menu-panel" role="navigation" aria-label="Mobile Navigation">
          <div className="mobile-menu-header">
            <Logo size="sm" showText={false} />
            <button
              className="mobile-close-btn"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          </div>

          <div className="mobile-links-list">
            {NAV_LINKS.map((link) => {
              const active = isLinkActive(link);
              return (
                <a
                  key={link.section}
                  href={link.href}
                  className={`mobile-nav-item ${active ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(e, link)}
                >
                  <span className="mobile-nav-text">{link.label}</span>
                  {active && <span className="mobile-active-dot" />}
                </a>
              );
            })}
          </div>

          <div className="mobile-menu-footer flex flex-col gap-2">
            <a
              href={personal.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-connect-btn mobile-connect-btn justify-center group"
              aria-label="Connect on LinkedIn"
            >
              <span>Let's Connect</span>
              <ArrowRight size={14} className="connect-arrow transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>

            <a
              href={personal.resumeUrl}
              download="MD-Dilshad-Resume.pdf"
              className="mobile-resume-btn"
              aria-label="Download Resume PDF"
              onClick={() => setMobileOpen(false)}
            >
              <Download size={15} />
              <span>Resume</span>
            </a>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
