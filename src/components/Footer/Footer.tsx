import React from 'react';
import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../icons/SocialIcons';
import { personal } from '../../data/portfolioData';
import { useSectionNavigation } from '../../hooks/useSectionNavigation';
import Logo from '../ui/Logo';
import './Footer.css';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/#about', section: 'about' },
  { label: 'Experience', href: '/#experience', section: 'experience' },
  { label: 'Projects', href: '/#projects', section: 'projects' },
  { label: 'Skills', href: '/#skills', section: 'skills' },
  { label: 'Contact', href: '/contact', section: 'contact' },
];

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  const { handleLinkClick } = useSectionNavigation();

  return (
    <footer className="footer border-t border-white/5 bg-[#070a0f]" role="contentinfo">
      <div className="container-max">
        <div className="footer-grid">
          {/* Brand Column with Custom Monogram Logo */}
          <div>
            <Logo size="md" className="mb-4" />
            <p className="footer-tagline text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed mb-4">
              Software engineer specializing in full-stack web applications, scalable backend systems, and AI-driven workflows.
            </p>
            <div className="footer-social-links flex items-center gap-2.5">
              <a
                href={personal.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social"
                aria-label="GitHub profile"
              >
                <GithubIcon size={15} />
              </a>
              <a
                href={personal.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social"
                aria-label="LinkedIn profile"
              >
                <LinkedinIcon size={15} />
              </a>
              <a
                href={`mailto:${personal.email}`}
                className="footer-social"
                aria-label="Email directly"
              >
                <Mail size={15} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div className="footer-col-title font-mono text-xs text-slate-400 font-bold uppercase tracking-widest mb-4">
              Navigation
            </div>
            <div className="flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="footer-nav-link text-xs sm:text-sm text-slate-400 hover:text-indigo-400 transition-colors duration-200"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href, link.section);
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Connect & Resume */}
          <div>
            <div className="footer-col-title font-mono text-xs text-slate-400 font-bold uppercase tracking-widest mb-4">
              Direct Links
            </div>
            <div className="flex flex-col gap-2.5">
              <a
                href={personal.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-nav-link text-xs sm:text-sm text-slate-400 hover:text-indigo-400 transition-colors duration-200"
              >
                GitHub Profile →
              </a>
              <a
                href={personal.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-nav-link text-xs sm:text-sm text-slate-400 hover:text-indigo-400 transition-colors duration-200"
              >
                LinkedIn Profile →
              </a>
              <a
                href={`mailto:${personal.email}`}
                className="footer-nav-link text-xs sm:text-sm text-slate-400 hover:text-indigo-400 transition-colors duration-200"
              >
                {personal.email}
              </a>
              <a
                href={personal.resumeUrl}
                download="MD-Dilshad-Resume.pdf"
                className="footer-nav-link text-xs sm:text-sm text-indigo-400 font-mono font-semibold hover:text-indigo-300 transition-colors duration-200"
              >
                Download Resume (PDF) ↓
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-mono">
          <span>
            © {year} MD Dilshad. All rights reserved.
          </span>
          <span className="text-slate-600">
            Engineered with React 19, Vite, TypeScript & Tailwind.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
