import React from 'react';
import { Award, ExternalLink } from 'lucide-react';
import { certifications } from '../../data/portfolioData';
import SectionHeading from '../ui/SectionHeading';

export const Certifications: React.FC = () => {
  return (
    <section id="certifications" className="section-padding" aria-label="Certifications">
      <div className="container-max">
        {/* Standardized Section Heading */}
        <SectionHeading
          number="06"
          category="CERTIFICATIONS"
          title="Credentials & Certifications"
          subtitle="Verified full-stack engineering certifications and professional skill assessments."
        />

        <div className="flex flex-col gap-4">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="p-6 rounded-2xl bg-[#0d121c] border border-white/8 relative overflow-hidden transition-all duration-300 hover:border-amber-500/30 hover:-translate-y-0.5 shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.6)]"
            >
              {/* Top amber accent gradient line */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500/60 to-transparent"
                aria-hidden="true"
              />

              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400 flex-shrink-0">
                    <Award size={18} />
                  </div>
                  <div>
                    <h3 className="font-sans text-base sm:text-lg font-bold text-slate-100 mb-1">
                      {cert.title}
                    </h3>
                    <div className="text-xs text-slate-400 font-mono">
                      {cert.issuer} · {cert.year}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 mt-2.5 leading-relaxed max-w-2xl">
                      {cert.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-3.5">
                      {cert.skills.map((sk) => (
                        <span
                          key={sk}
                          className="font-mono text-[10px] sm:text-[11px] px-2.5 py-1 rounded bg-amber-500/8 border border-amber-500/20 text-amber-300"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 py-2 px-3.5 rounded-lg border border-amber-500/20 bg-amber-500/6 hover:bg-amber-500/12 transition-colors duration-200"
                  >
                    <ExternalLink size={13} />
                    View Credential
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
