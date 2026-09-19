import React, { useState } from 'react';
import { Mail, Phone, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../icons/SocialIcons';
import { personal } from '../../data/portfolioData';
import SectionHeading from '../ui/SectionHeading';
import './Contact.css';

const INITIAL_FORM = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

const INITIAL_ERRORS = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export const Contact: React.FC = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const validate = () => {
    const newErrors = { ...INITIAL_ERRORS };
    let valid = true;

    if (!form.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email';
      valid = false;
    }

    if (!form.subject.trim()) {
      newErrors.subject = 'Subject is required';
      valid = false;
    }

    if (!form.message.trim() || form.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof INITIAL_ERRORS]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('sending');

    try {
      // Direct mailto simulation or API endpoint handler
      await new Promise((resolve) => setTimeout(resolve, 800));
      setStatus('success');
      setForm(INITIAL_FORM);
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="contact-section section-padding" aria-label="Contact">
      <div className="container-max">
        {/* Standardized Section Heading */}
        <SectionHeading
          number="07"
          category="CONTACT"
          title="Let's Build Something Meaningful"
          subtitle="Open for software engineering opportunities, full-stack roles, and technical discussions."
        />

        <div className="contact-grid">
          {/* Left Column: Direct Communication Channels */}
          <div>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              Whether you're looking to hire a full-stack engineer, collaborate on a distributed system, or discuss innovative software architecture, feel free to reach out.
            </p>

            <div className="space-y-3">
              <a
                href={`mailto:${personal.email}`}
                className="contact-info-item group"
                aria-label="Email address"
              >
                <div
                  className="contact-info-icon transition-transform duration-200 group-hover:scale-110"
                  style={{ background: 'rgba(99,102,241,0.12)', color: '#6366f1' }}
                >
                  <Mail size={16} />
                </div>
                <div>
                  <div className="contact-info-label">Email</div>
                  <div className="contact-info-value font-mono">{personal.email}</div>
                </div>
              </a>

              <a
                href={`tel:${personal.phone}`}
                className="contact-info-item group"
                aria-label="Phone number"
              >
                <div
                  className="contact-info-icon transition-transform duration-200 group-hover:scale-110"
                  style={{ background: 'rgba(6,182,212,0.12)', color: '#06b6d4' }}
                >
                  <Phone size={16} />
                </div>
                <div>
                  <div className="contact-info-label">Phone</div>
                  <div className="contact-info-value font-mono">{personal.phone}</div>
                </div>
              </a>

              <a
                href={personal.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-info-item group"
                aria-label="LinkedIn profile"
              >
                <div
                  className="contact-info-icon transition-transform duration-200 group-hover:scale-110"
                  style={{ background: 'rgba(59,130,246,0.12)', color: '#3b82f6' }}
                >
                  <LinkedinIcon size={16} />
                </div>
                <div>
                  <div className="contact-info-label">LinkedIn</div>
                  <div className="contact-info-value font-mono">
                    {personal.social.linkedin.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                  </div>
                </div>
              </a>

              <a
                href={personal.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-info-item group"
                aria-label="GitHub profile"
              >
                <div
                  className="contact-info-icon transition-transform duration-200 group-hover:scale-110"
                  style={{ background: 'rgba(148,163,184,0.1)', color: '#94a3b8' }}
                >
                  <GithubIcon size={16} />
                </div>
                <div>
                  <div className="contact-info-label">GitHub</div>
                  <div className="contact-info-value font-mono">
                    {personal.social.github.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="contact-form">
            {status === 'success' ? (
              <div className="form-success">
                <div className="form-success-icon">
                  <CheckCircle2 size={28} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#f1f5f9', marginBottom: '0.5rem' }}>
                    Message sent successfully!
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: '#94a3b8' }}>
                    Thank you for reaching out. I'll get back to you shortly.
                  </p>
                </div>
                <button
                  onClick={() => setStatus('idle')}
                  className="btn-secondary mt-2"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contact-name" className="form-label">Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className={`form-input ${errors.name ? 'error' : ''}`}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {errors.name && (
                      <span id="name-error" className="form-error">{errors.name}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-email" className="form-label">Email</label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={`form-input ${errors.email ? 'error' : ''}`}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && (
                      <span id="email-error" className="form-error">{errors.email}</span>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="contact-subject" className="form-label">Subject</label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Role Opportunity / Project Collaboration"
                    className={`form-input ${errors.subject ? 'error' : ''}`}
                    aria-describedby={errors.subject ? 'subject-error' : undefined}
                  />
                  {errors.subject && (
                    <span id="subject-error" className="form-error">{errors.subject}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message" className="form-label">Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your team, role, or project opportunity..."
                    className={`form-textarea ${errors.message ? 'error' : ''}`}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                  {errors.message && (
                    <span id="message-error" className="form-error">{errors.message}</span>
                  )}
                </div>

                <button
                  type="submit"
                  className="form-submit group"
                  disabled={status === 'sending'}
                  aria-label="Send message"
                >
                  {status === 'sending' ? (
                    <>
                      <span
                        style={{
                          width: '14px',
                          height: '14px',
                          border: '2px solid rgba(255,255,255,0.3)',
                          borderTopColor: 'white',
                          borderRadius: '50%',
                          animation: 'spin 0.7s linear infinite',
                          display: 'inline-block',
                        }}
                      />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

                {status === 'error' && (
                  <div className="form-error-msg" role="alert">
                    <AlertCircle size={12} style={{ display: 'inline', marginRight: '4px' }} />
                    Something went wrong. Please try again or email directly.
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
