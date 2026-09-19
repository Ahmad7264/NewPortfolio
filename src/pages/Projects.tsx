import React, { useEffect } from 'react';
import Projects from '../components/Projects/Projects';

export const ProjectsPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Projects — MD Dilshad | Selected Works';
    window.scrollTo(0, 0);
  }, []);

  return (
    <main style={{ minHeight: '100vh', background: '#080b11', paddingTop: '2rem' }}>
      <Projects />
    </main>
  );
};

export default ProjectsPage;
