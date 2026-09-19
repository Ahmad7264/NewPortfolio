import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * Universal navigation hook for same-page section scrolling
 * and cross-page hash navigation.
 */
export const useSectionNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = useCallback(
    (sectionId: string) => {
      if (sectionId === 'contact-page') {
        navigate('/contact');
        return;
      }

      if (location.pathname === '/') {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          window.history.replaceState(null, '', `/#${sectionId}`);
        }
      } else {
        navigate(`/#${sectionId}`);
      }
    },
    [location.pathname, navigate]
  );

  const handleLinkClick = useCallback(
    (href: string, sectionId?: string) => {
      if (href === '/contact') {
        navigate('/contact');
        return;
      }

      if (href.startsWith('/#')) {
        const targetId = sectionId || href.replace('/#', '');
        scrollToSection(targetId);
        return;
      }

      if (href === '/') {
        if (location.pathname === '/') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          window.history.replaceState(null, '', '/');
        } else {
          navigate('/');
        }
        return;
      }

      navigate(href);
    },
    [location.pathname, navigate, scrollToSection]
  );

  return { scrollToSection, handleLinkClick };
};

export default useSectionNavigation;
