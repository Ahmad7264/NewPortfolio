import React, { useEffect } from 'react';
import About from '../components/About/About';

export const AboutPage: React.FC = () => {
  useEffect(() => {
    document.title = 'About — MD Dilshad | Software Engineer';
    window.scrollTo(0, 0);
  }, []);

  return (
    <main style={{ paddingTop: '5rem', minHeight: '100vh', background: '#080b11' }}>
      <About />
    </main>
  );
};

export default AboutPage;
