// ============================================================
// PORTFOLIO DATA — MD DILSHAD
// Single source of truth. Typed in TypeScript.
// ============================================================

import vidsnatchDark from '../assets/projects/vidsnatch/vidsnatch-dark.png';
import vidsnatchLight from '../assets/projects/vidsnatch/vidsnatch-light.png';
import dhabaVintage from '../assets/projects/90s-dhaba/90s-dhaba-vintage.jpg';
import dhabaGenz from '../assets/projects/90s-dhaba/90s-dhaba-genz.png';
import javaevaluatorImg from '../assets/projects/javaevaluator/javaevaluator.png';
import medicineFinderImg from '../assets/projects/medicine-finder/medicine-finder.png';
import portfolioImg from '../assets/projects/portfolio/portfolio-hero.png';

export interface PersonalInfo {
  name: string;
  initials: string;
  title: string;
  tagline: string;
  bio: string[];
  email: string;
  phone: string;
  location: string;
  resumeUrl: string;
  social: {
    github: string;
    linkedin: string;
  };
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  period: string;
  expectedGraduation?: string;
  cgpa: string;
  status: 'Pursuing' | 'Completed';
  highlights: string[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  type: string;
  period: string;
  duration: string;
  location: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
}

export interface ProjectItem {
  id: string;
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  category: string;
  description: string;
  problem?: string;
  solution?: string;
  highlights: string[];
  features?: string[];
  technologies: string[];
  architecture?: string;
  image: string;
  gallery: string[];
  liveUrl: string | null;
  githubUrl: string | null;
  links: {
    github: string | null;
    live: string | null;
  };
  featured: boolean;
  year: string;
  color: string;
}

export interface SkillCategory {
  label: string;
  icon: string;
  color: string;
  items: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  description: string;
  skills: string[];
  credentialUrl: string | null;
}

export const personal: PersonalInfo = {
  name: 'Mohd Dilshad',
  initials: 'MD',
  title: 'Software Engineer',
  tagline: 'Building reliable, scalable software systems across frontend, backend, and AI-driven technologies.',
  bio: [
    'M.Tech Computer Science & Engineering student specializing in AI & Data Science at KL University, Vijayawada, with a 9.35 CGPA.',
    'Proficient in developing full-stack applications using Java, Spring Boot, React.js, Next.js, TypeScript, REST APIs, MySQL, and Docker.',
    'Experienced in building and deploying practical web applications, debugging software issues, and implementing scalable solutions with a passion for AI & Machine Learning.',
  ],
  email: 'dilshadahmad286@gmail.com',
  phone: '+91 8809971337',
  location: 'Vijayawada, Andhra Pradesh, India',
  resumeUrl: '/resume/MD-Dilshad-Resume.pdf',
  social: {
    github: 'https://github.com/Ahmad7264',
    linkedin: 'https://www.linkedin.com/in/mohd-dilshad/',
  },
};

export const education: EducationItem[] = [
  {
    id: 'klu',
    institution: 'KL University',
    degree: 'Master of Technology',
    field: 'Artificial Intelligence & Data Science',
    location: 'Vijayawada, Andhra Pradesh',
    period: '2025 – 2027',
    expectedGraduation: '2027',
    cgpa: '9.35',
    status: 'Pursuing',
    highlights: [
      'Machine Learning & Deep Learning',
      'Data Science & Analytics',
      'AI Systems Engineering',
    ],
  },
  {
    id: 'mgu',
    institution: 'Mansarovar Global University',
    degree: 'Bachelor of Technology',
    field: 'Computer Science',
    location: 'Bhopal, Madhya Pradesh',
    period: '2021 – 2025',
    cgpa: '7.6',
    status: 'Completed',
    highlights: [
      'Data Structures & Algorithms',
      'Object-Oriented Programming (OOP)',
      'Database Management Systems (DBMS)',
      'Computer Networks & Operating Systems',
    ],
  },
];

export const experience: ExperienceItem[] = [
  {
    id: 'adm',
    company: 'ADM Educational & Welfare Society',
    role: 'Full Stack Developer Intern',
    type: 'Internship',
    period: 'March 2024 – December 2024',
    duration: '10 months',
    location: 'Remote',
    description:
      'Developed and maintained application components while troubleshooting software issues across multiple systems. Built and enhanced React.js-based user interfaces and contributed to backend functionality.',
    responsibilities: [
      'Developed and maintained application components while troubleshooting software issues across multiple systems.',
      'Built and enhanced React.js-based user interfaces and contributed to backend functionality for application features.',
      'Debugged software issues, investigated application failures, and performed functional testing to validate features before deployment.',
      'Collaborated on application maintenance, issue resolution, and software development tasks to support project requirements.',
    ],
    technologies: ['React.js', 'JavaScript', 'REST APIs', 'Git', 'Debugging', 'Testing'],
  },
  {
    id: 'ilearnings',
    company: 'iLearnings',
    role: 'Full Stack Developer Intern',
    type: 'Internship',
    period: 'June 2024 – July 2024',
    duration: '2 months',
    location: 'Remote',
    description:
      'Developed reusable and modular React.js components to support scalable and maintainable frontend development, integrated RESTful APIs, and optimized UI performance.',
    responsibilities: [
      'Developed reusable and modular React.js components to support scalable and maintainable frontend development.',
      'Integrated RESTful APIs to enable seamless communication between frontend interfaces and backend services.',
      'Optimized frontend performance and contributed to the development and enhancement of application features.',
      'Utilized Git-based version control workflows for source-code management, collaboration, and project maintenance.',
    ],
    technologies: ['React.js', 'JavaScript', 'RESTful APIs', 'Git', 'Frontend Optimization', 'Agile'],
  },
];

export const projects: ProjectItem[] = [
  {
    id: 'javaevaluator',
    slug: 'javaevaluator',
    number: '01',
    title: 'JavaEvaluator',
    shortTitle: 'JavaEvaluator',
    subtitle: 'Full Stack Quiz Assessment Platform',
    category: 'Full-Stack Web Application',
    description:
      'Designed REST APIs using Spring Boot and MySQL. Built a responsive React frontend. Deployed using Render/Netlify. Containerized the backend using Docker. Performed API debugging and validation.',
    problem:
      'Educational platforms needed a reliable, self-contained quiz system that could evaluate Java programming knowledge with structured question banks and instant feedback.',
    solution:
      'Designed a full-stack platform with a Spring Boot REST API backend and a React frontend, containerized using Docker for consistent deployment and connected to a MySQL database for persistent data storage.',
    highlights: [
      'Designed REST APIs using Spring Boot and MySQL for reliable quiz assessment management.',
      'Built a responsive React frontend with interactive question selection and score calculations.',
      'Deployed application using Render (backend) and Netlify (frontend).',
      'Containerized the backend service using Docker for parity across environments.',
      'Performed comprehensive API debugging and validation workflows.',
    ],
    features: [
      'RESTful API design using Spring Boot and MySQL',
      'Responsive React frontend with clean UI',
      'Docker containerization for consistent environments',
      'Deployment on Render and Netlify',
      'API debugging and validation workflows',
    ],
    technologies: ['Java', 'Spring Boot', 'MySQL', 'React', 'Docker', 'REST APIs'],
    architecture:
      'Three-tier architecture: React SPA frontend communicating over authenticated REST endpoints with a Spring Boot service, backed by a persistent MySQL relational database and containerized via Docker.',
    image: javaevaluatorImg,
    gallery: [javaevaluatorImg],
    liveUrl: 'https://javaquizz.netlify.app/',
    githubUrl: null,
    links: {
      github: null,
      live: 'https://javaquizz.netlify.app/',
    },
    featured: true,
    year: '2024',
    color: '#6366f1',
  },
  {
    id: 'medicine-finder',
    slug: 'medicine-finder',
    number: '02',
    title: 'Medicine Finder',
    shortTitle: 'Medicine Finder',
    subtitle: 'Medicine Search & API Integration Platform',
    category: 'Frontend API Platform',
    description:
      'Developed a medicine search platform integrating third-party APIs. Implemented secure environment-variable configuration. Optimized API response handling and search performance.',
    problem:
      'Users needed a fast, reliable way to search for medicine information from external sources without exposing sensitive API credentials in the frontend code.',
    solution:
      'Built a React-based medicine search platform with proper environment-variable API key management, optimized API response handling, and clean search UX that delivers relevant results quickly.',
    highlights: [
      'Developed a medicine search platform integrating third-party pharmaceutical APIs.',
      'Implemented secure environment-variable configuration safeguarding API credentials.',
      'Optimized API response handling and debounced search performance for quick queries.',
      'Engineered a clean, user-friendly interface for finding medicine details efficiently.',
    ],
    features: [
      'Third-party API integration for medicine data',
      'Secure API key management via environment variables',
      'Optimized API response handling and caching',
      'Fast, intuitive medicine search interface',
    ],
    technologies: ['React', 'APIs', 'JavaScript', 'Backend/API integration'],
    architecture:
      'Single Page React Architecture with an isolated API service layer, environment-variable key abstraction, debounced request throttling, and declarative error boundary handling.',
    image: medicineFinderImg,
    gallery: [medicineFinderImg],
    liveUrl: 'https://medicinefinde.netlify.app/',
    githubUrl: 'https://github.com/Ahmad7264/MediFinder',
    links: {
      github: 'https://github.com/Ahmad7264/MediFinder',
      live: 'https://medicinefinde.netlify.app/',
    },
    featured: true,
    year: '2025',
    color: '#06b6d4',
  },
  {
    id: 'vidsnatch',
    slug: 'vidsnatch',
    number: '03',
    title: 'VidSnatch',
    shortTitle: 'VidSnatch',
    subtitle: 'Multi-Platform Video Downloader',
    category: 'Full-Stack Web Application',
    description:
      'Engineered a full-stack media downloading application supporting 9+ social platforms.',
    problem:
      'Users across different platforms required a reliable, fast, and multi-format media extraction utility with clean platform-specific workflows and responsive controls.',
    solution:
      'Constructed a modern full-stack web application powered by React and Vite on the frontend and Node.js with yt-dlp on the backend for multi-quality stream extraction and real-time metadata parsing.',
    highlights: [
      'Integrated yt-dlp + Node.js backend for real-time metadata extraction and multi-quality media downloads.',
      'Created a responsive, reusable frontend architecture with shared components, themes, localization, and platform-specific experiences.',
      'Added SEO-optimized landing pages and consistent UX across all downloader routes.',
    ],
    features: [
      'Multi-platform media download support across 9+ social networks',
      'yt-dlp + Node.js extraction engine with adaptive format selection',
      'Real-time video/audio metadata extraction and quality selectors (1080p, 720p, MP3)',
      'Responsive React + Vite frontend with modular UI components and theme support',
      'SEO-optimized landing pages with dynamic meta tags for high search discovery',
    ],
    technologies: ['React', 'Vite', 'Node.js', 'yt-dlp', 'JavaScript', 'REST/API integration', 'SEO'],
    architecture:
      'Full-stack architecture featuring a high-performance React + Vite SPA frontend connecting to a Node.js REST API service wrapping the yt-dlp core engine for background stream extraction, metadata synthesis, and dynamic media payload delivery.',
    image: vidsnatchDark,
    gallery: [vidsnatchDark, vidsnatchLight],
    liveUrl: 'https://vidsnatch.fun/',
    githubUrl: 'https://github.com/Ahmad7264/vidsntch',
    links: {
      github: 'https://github.com/Ahmad7264/vidsntch',
      live: 'https://vidsnatch.fun/',
    },
    featured: true,
    year: '2026',
    color: '#f59e0b',
  },
  {
    id: '90s-dhaba',
    slug: '90s-dhaba',
    number: '04',
    title: '90s Dhaba',
    shortTitle: '90s Dhaba',
    subtitle: 'Full-Stack Music Streaming Platform',
    category: 'Full-Stack Music Streaming Platform',
    description:
      'Built a responsive 90s Bollywood music platform with custom playlists, synchronized music/video playback, seeking, and advanced player controls.',
    problem:
      'Nostalgic 90s Bollywood music lovers lacked an immersive, synchronized audio-video streaming platform with real-time community presence and modern cross-platform mobile access.',
    solution:
      'Created a full-stack streaming platform combining vintage aesthetic themes with modern edge-computing infrastructure on Cloudflare Workers and Capacitor for mobile delivery.',
    highlights: [
      'Built a responsive 90s Bollywood music platform with custom playlists, synchronized music/video playback, seeking, and advanced player controls.',
      'Implemented real-time online-user and visitor analytics using Cloudflare Workers + KV heartbeat architecture.',
      'Created distinct 90s Dhaba and Gen-Z themed experiences with responsive/neomorphic UI and interactive playlists.',
      'Converted the web platform into an Android app using Capacitor and deployed the production website on Cloudflare.',
    ],
    features: [
      'Synchronized Bollywood audio and video playback with sub-second seeking and cueing',
      'Curated 90s Bollywood playlists, custom queues, and interactive track exploration',
      'Real-time active listener counts powered by Cloudflare Workers + KV heartbeat',
      'Dual-theme switchable experience: Classic 90s Dhaba & Gen-Z modern neomorphic mode',
      'Cross-platform Android application compiled via Capacitor wrapper',
    ],
    technologies: ['React', 'Vite', 'Capacitor', 'Cloudflare Workers', 'Cloudflare KV'],
    architecture:
      'Cloud-native edge architecture: React + Vite client paired with Cloudflare Workers serverless edge functions, Cloudflare KV distributed key-value storage for real-time heartbeat telemetry, and Capacitor bridge for native Android execution.',
    image: dhabaVintage,
    gallery: [dhabaVintage, dhabaGenz],
    liveUrl: 'https://90sdhaba.in',
    githubUrl: null,
    links: {
      github: null,
      live: 'https://90sdhaba.in',
    },
    featured: true,
    year: '2026',
    color: '#e11d48',
  },
  {
    id: 'portfolio',
    slug: 'portfolio',
    number: '05',
    title: 'Personal Portfolio',
    shortTitle: 'Portfolio',
    subtitle: 'Interactive 3D Developer Portfolio',
    category: 'Frontend & Interactive UI',
    description:
      'Engineered a high-performance modern developer portfolio with dynamic 3D spatial orb animations, pinned card stack mechanics, responsive layouts, and rich dark cyberpunk aesthetics.',
    problem:
      'Standard developer portfolios often lack engaging visual storytelling, smooth spatial animations, and immersive responsiveness across all modern device viewports.',
    solution:
      'Built a cutting-edge portfolio in React 19 and TypeScript utilizing Motion for physics-based spring animations, pinned stacking card showcase, zero-crop browser mockups, and glassmorphism styling.',
    highlights: [
      'Engineered dynamic pinned scroll timeline with physics-based card stacking interaction.',
      'Crafted cinematic developer workspace atmosphere with dual-tone glowing neon aesthetics.',
      'Designed responsive navigation with smart section scroll-spy and mobile drawer overlay.',
      'Optimized asset loading and production bundling achieving sub-2s builds with zero lint errors.',
    ],
    features: [
      'Cinematic high-rise developer workstation hero banner',
      'Interactive pinned project stacking cards with zero-crop previews',
      'Smooth spring-driven spatial navigation and active section indicators',
      'Fully responsive glassmorphic design system and typography',
    ],
    technologies: ['React 19', 'TypeScript', 'Motion', 'Vite', 'Tailwind CSS', 'CSS3'],
    architecture:
      'Component-driven architecture using React 19, Vite, and Motion hooks (useScroll, useTransform, useSpring) for GPU-accelerated 60fps animations, paired with modular CSS tokens.',
    image: portfolioImg,
    gallery: [portfolioImg],
    liveUrl: 'https://mohddilshadportfolio-32.vercel.app/',
    githubUrl: 'https://github.com/Ahmad7264/NewPortfolio',
    links: {
      github: 'https://github.com/Ahmad7264/NewPortfolio',
      live: 'https://mohddilshadportfolio-32.vercel.app/',
    },
    featured: true,
    year: '2026',
    color: '#38bdf8',
  },
];

export const skills: Record<string, SkillCategory> = {
  languages: {
    label: 'Programming Languages',
    icon: 'Code2',
    color: '#6366f1',
    items: ['Java', 'C', 'Python', 'JavaScript', 'TypeScript'],
  },
  frameworks: {
    label: 'Frameworks & Libraries',
    icon: 'Layers',
    color: '#8b5cf6',
    items: ['React.js', 'Next.js', 'Spring Boot', 'Node.js', 'Express.js', 'Vite'],
  },
  databases: {
    label: 'Databases & Storage',
    icon: 'Database',
    color: '#06b6d4',
    items: ['MySQL', 'PostgreSQL', 'Cloudflare KV'],
  },
  tools: {
    label: 'Tools & Cloud',
    icon: 'Wrench',
    color: '#3b82f6',
    items: ['Git', 'Docker', 'Netlify', 'Render', 'VS Code', 'IntelliJ IDEA', 'Google Colab', 'Cloudflare Workers', 'Capacitor'],
  },
  cs_core: {
    label: 'CS Fundamentals & AI',
    icon: 'Cpu',
    color: '#f59e0b',
    items: ['Data Structures & Algorithms', 'OOP', 'DBMS', 'Operating Systems', 'Computer Networks', 'Generative AI', 'Machine Learning', 'Data Analysis'],
  },
  testing: {
    label: 'Testing & QA',
    icon: 'TestTube2',
    color: '#10b981',
    items: ['Debugging', 'Unit Testing', 'API Testing', 'Log Analysis', 'Test Case Execution'],
  },
};

export const certifications: CertificationItem[] = [
  {
    id: 'fullstack-developer',
    title: 'Full Stack Developer Certification',
    issuer: 'Full Stack Development',
    year: '2024',
    description:
      'Hands-on experience with React.js, JavaScript, backend development, and full-stack application deployment.',
    skills: ['React.js', 'JavaScript', 'Backend Development', 'Full-Stack Deployment'],
    credentialUrl: null,
  },
];
