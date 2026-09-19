import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoImg from '../../assets/logo.jpg';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showText = false,
}) => {
  const location = useLocation();

  const iconSizes = {
    sm: { size: 34, radius: 9 },
    md: { size: 40, radius: 11 },
    lg: { size: 48, radius: 13 },
  };

  const current = iconSizes[size];

  const handleClick = (e: React.MouseEvent) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.replaceState(null, '', '/');
    }
  };

  return (
    <Link
      to="/"
      onClick={handleClick}
      className={`group inline-flex items-center select-none transition-all duration-300 ${className}`}
      aria-label="MD Dilshad Portfolio Home"
    >
      {/* Precision AI-Generated Monogram Emblem */}
      <div
        className="relative flex items-center justify-center transition-all duration-300 group-hover:scale-105"
        style={{
          width: current.size,
          height: current.size,
        }}
      >
        {/* Ambient subtle glow ring on hover */}
        <div
          className="absolute inset-0 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-400 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-75"
          style={{ borderRadius: current.radius }}
        />

        {/* The AI-Generated MD Emblem */}
        <img
          src={logoImg}
          alt="MD Logo"
          className="relative w-full h-full object-cover rounded-xl border border-white/10 shadow-[0_0_15px_rgba(99,102,241,0.25)] transition-all duration-300 group-hover:border-indigo-400/50 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.6)]"
          style={{ borderRadius: current.radius }}
        />
      </div>

      {showText && (
        <div className="flex items-center tracking-tight font-sans font-bold text-text-primary text-sm sm:text-base ml-2.5">
          <span>MD</span>
          <span className="text-slate-400 font-normal ml-1 hidden sm:inline">Dilshad</span>
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 ml-1 inline-block animate-pulse" />
        </div>
      )}
    </Link>
  );
};

export default Logo;
