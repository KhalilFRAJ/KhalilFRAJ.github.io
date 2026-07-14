import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { useLang } from './contexts/LanguageContext';
import { usePageMeta } from './hooks/usePageMeta';

import { PROJECTS } from './data/projects';
import {
  NAV_LINKS,
  SKILL_GROUPS,
  EXPERIENCE,
  FORMATION,
  CERTIFICATIONS,
  COMMANDS,
  TYPE_LINES,
  SOCIAL_LINKS,
} from './data/content';
import { startGlobe, startSkillsGalaxy } from './lib/canvas';
import CountUp from './components/CountUp';
import SectionHeader from './components/SectionHeader';
import SocialLinks from './components/SocialLinks';

import aboutPortrait from './images/about/Khalil-web.jpg';
const resumeFile = new URL('./images/about/Khalil_Fraj_CV.docx', import.meta.url).href;

const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'xsqo5PQjDF5PiBaTK';
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_n4ouirm';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_uixoa9q';

emailjs.init(EMAILJS_PUBLIC_KEY);

const PROJECT_TABS = [
  ['All', 'projects.all'],
  ['Web Apps', 'projects.web'],
  ['Mobile', 'projects.mobile'],
  ['AI / ML', 'projects.ai'],
  ['Academic', 'projects.academic'],
];

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Feeds the cursor-following spotlight on cards; writes CSS vars directly so
// no React re-render happens on mouse move.
function trackSpotlight(event) {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`);
}

export default function App() {
  const { t, tp, lang, toggleLang } = useLang();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [theme, setTheme] = useState(() => window.localStorage.getItem('portfolio-theme') || 'dark');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('All');
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [paletteQuery, setPaletteQuery] = useState('');
  const [paletteIndex, setPaletteIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [konamiVisible, setKonamiVisible] = useState(false);

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle');
  const [formError, setFormError] = useState('');

  const handleChange = useCallback((e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmed = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
    };

    if (!trimmed.name || !trimmed.email || !trimmed.subject || !trimmed.message) {
      setFormStatus('error');
      setFormError('All fields are required.');
      return;
    }

    setFormStatus('sending');
    setFormError('');

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: trimmed.name,
        from_email: trimmed.email,
        subject: trimmed.subject,
        message: trimmed.message,
        to_email: SOCIAL_LINKS.email,
      });
      setFormStatus('sent');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error('EmailJS error:', err.status, err.text);
      setFormStatus('error');

      if (err.text?.includes('empty') || err.text?.includes('required')) {
        setFormError('Please fill in all required fields.');
      } else if (err.text?.includes('rate') || err.text?.includes('limit')) {
        setFormError('Too many requests. Please try again later.');
      } else if (err.status === 400) {
        setFormError('Invalid request. Check your input and try again.');
      } else {
        setFormError('Failed to send. Try again later.');
      }
    }
  };

  const aboutGlobeRef = useRef(null);
  const skillsCanvasRef = useRef(null);
  const paletteInputRef = useRef(null);

  const filteredProjects = useMemo(() => {
    if (activeTab === 'All') return PROJECTS;
    return PROJECTS.filter((project) => project.category === activeTab);
  }, [activeTab]);

  const commandItems = useMemo(() => {
    const query = paletteQuery.trim().toLowerCase();
    return COMMANDS.filter(([key]) => t(key).toLowerCase().includes(query)).map(([key, icon, target]) => ({ label: t(key), icon, target }));
  }, [paletteQuery, t]);

  usePageMeta({
    title: isHome ? 'Khalil Fraj - Full-Stack & Mobile Developer' : undefined,
    description: isHome
      ? 'Khalil Fraj — Full-Stack & Mobile Developer based in Tunisia. Building scalable web apps, immersive mobile experiences, and modern software architectures.'
      : undefined,
    path: isHome ? '/' : undefined,
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (document.querySelector('#jsonld-person')) return;

    const person = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Khalil Fraj',
      givenName: 'Khalil',
      familyName: 'Fraj',
      jobTitle: 'Full-Stack & Mobile Developer',
      url: 'https://khalilfraj.com/',
      email: SOCIAL_LINKS.email,
      telephone: '+21620628396',
      address: { '@type': 'PostalAddress', addressCountry: 'TN' },
      knowsAbout: ['React', 'Angular', 'NestJS', 'Node.js', 'Spring Boot', 'Symfony', 'Django', 'Flutter', 'Java', 'TypeScript', 'Python', 'MongoDB', 'Neo4j', 'Docker'],
      sameAs: [SOCIAL_LINKS.github, SOCIAL_LINKS.linkedin],
    };
    const ws = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Khalil Fraj - Portfolio',
      url: 'https://khalilfraj.com/',
    };

    const s1 = document.createElement('script');
    s1.id = 'jsonld-person';
    s1.type = 'application/ld+json';
    s1.textContent = JSON.stringify(person);
    document.head.appendChild(s1);

    const s2 = document.createElement('script');
    s2.id = 'jsonld-website';
    s2.type = 'application/ld+json';
    s2.textContent = JSON.stringify(ws);
    document.head.appendChild(s2);
  }, []);

  useEffect(() => {
    if (!isHome) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTypedText(t(TYPE_LINES[0]));
      return undefined;
    }

    let lineIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timerId = 0;

    const lines = TYPE_LINES.map((k) => t(k));
    const type = () => {
      const line = lines[lineIndex];
      if (!deleting) {
        charIndex += 1;
        setTypedText(line.slice(0, charIndex));
        if (charIndex === line.length) {
          deleting = true;
          timerId = window.setTimeout(type, 2000);
          return;
        }
      } else {
        charIndex -= 1;
        setTypedText(line.slice(0, charIndex));
        if (charIndex === 0) {
          deleting = false;
          lineIndex = (lineIndex + 1) % lines.length;
        }
      }
      timerId = window.setTimeout(type, deleting ? 36 : 62);
    };

    type();
    return () => window.clearTimeout(timerId);
  }, [isHome, t]);

  useEffect(() => {
    if (!isHome) return undefined;

    const sections = ['hero', ...NAV_LINKS.map(([id]) => id)]
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    // A narrow band around the viewport center decides the active section —
    // more reliable than a threshold for sections taller than the viewport.
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );
    sections.forEach((section) => sectionObserver.observe(section));

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('v');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    document.querySelectorAll('.rv, .rv-l').forEach((node) => revealObserver.observe(node));

    return () => {
      sectionObserver.disconnect();
      revealObserver.disconnect();
    };
  }, [isHome]);

  useEffect(() => {
    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    let konamiIndex = 0;
    const pattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    const onKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setPaletteOpen((open) => !open);
        setPaletteQuery('');
        setPaletteIndex(0);
      }
      if (event.key === 'Escape') {
        setPaletteOpen(false);
        setMobileOpen(false);
      }

      konamiIndex = event.key === pattern[konamiIndex] ? konamiIndex + 1 : 0;
      if (konamiIndex === pattern.length) {
        setKonamiVisible(true);
        window.setTimeout(() => setKonamiVisible(false), 4000);
        konamiIndex = 0;
      }
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!isHome) return undefined;
    return startGlobe(aboutGlobeRef.current);
  }, [isHome]);

  useEffect(() => {
    if (!isHome) return undefined;
    return startSkillsGalaxy(skillsCanvasRef.current);
  }, [isHome]);

  useEffect(() => {
    if (paletteOpen) paletteInputRef.current?.focus();
  }, [paletteOpen]);

  const runCommand = (target) => {
    if (target === 'theme') {
      setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
    } else if (target.startsWith('mailto:')) {
      window.location.href = target;
    } else {
      scrollToSection(target);
    }
    setPaletteOpen(false);
  };

  return (
    <>
      <div className="app-bg" aria-hidden="true" />
      <div className="scroll-progress" role="progressbar" aria-valuenow={Math.round(scrollProgress)} aria-valuemin={0} aria-valuemax={100} aria-label="Page scroll progress"><div className="scroll-fill" style={{ width: `${scrollProgress}%` }} /></div>

      <nav className={`topbar ${scrollProgress > 1 ? 'scrolled' : ''}`} aria-label="Primary">
        <a href="#hero" className="brand">KF<em>.</em></a>

        <ul className="nav-links desktop-only">
          {NAV_LINKS.map(([id, key]) => (
            <li key={id}>
              <a href={`#${id}`} className={activeSection === id ? 'active' : ''} onClick={() => setMobileOpen(false)}>{t(key)}</a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <button type="button" className="icon-button" onClick={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))} aria-label={t('nav.theme')}>
            {theme === 'dark' ? '☀' : '🌙'}
          </button>
          <button type="button" className="icon-button" onClick={() => toggleLang()} aria-label="Toggle language">
            {lang === 'en' ? 'FR' : 'EN'}
          </button>
          <a href="#contact" className="cta desktop-only">{t('nav.hire')}</a>
          <button
            type="button"
            className="burger mobile-only"
            onClick={() => setMobileOpen((value) => !value)}
            aria-label={t('nav.menu')}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <span className={mobileOpen ? 'open' : ''} />
            <span className={mobileOpen ? 'open' : ''} />
            <span className={mobileOpen ? 'open' : ''} />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`} id="mobile-menu">
        {NAV_LINKS.map(([id, key]) => (
          <a key={id} href={`#${id}`} onClick={() => setMobileOpen(false)}>{t(key)}</a>
        ))}
      </div>

      <div className="dotnav">
        {NAV_LINKS.map(([id, key]) => (
          <button key={id} type="button" className={`dot ${activeSection === id ? 'active' : ''}`} onClick={() => scrollToSection(id)} aria-label={t(key)}>
            <span className="dot-tip">{t(key)}</span>
          </button>
        ))}
      </div>

      {isHome ? (<>
      <div id="main-content">
      <section id="hero" className="hero section">
        <div className="hero-aurora" aria-hidden="true" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="pill ha ha-1"><span className="pill-dot" aria-hidden="true" />{t('hero.badge')}</div>
            <div className="eyebrow ha ha-2">{t('hero.eyebrow')}</div>
            <h1 className="hero-title ha ha-3" dangerouslySetInnerHTML={{ __html: t('hero.title') }} />
            <p className="hero-lead ha ha-4">{t('hero.lead')}</p>
            <div className="typewriter ha ha-5" aria-hidden="true"><span>{typedText}</span><span className="caret" /></div>
            <div className="hero-actions ha ha-5">
              <a href="#projects" className="button primary">{t('hero.view')}</a>
              <a href="#contact" className="button ghost">{t('hero.touch')}</a>
              <a href={resumeFile} className="button ghost" download="Khalil_Fraj_CV.docx">{t('hero.resume')}</a>
            </div>
            <SocialLinks className="hero-socials ha ha-6" />
          </div>
        </div>
        <div className="hero-scroll" aria-hidden="true"><span>{t('hero.scroll')}</span><div className="hero-scroll-line" /></div>
      </section>

      <section id="about" className="section section-alt">
        <div className="container">
          <SectionHeader tag={t('about.tag')} titleHtml={t('about.title')} />

          <div className="about-grid">
            <div className="about-card rv-l">
              <div className="about-frame">
                <img src={aboutPortrait} alt={t('about.portrait')} className="about-portrait" />
                <canvas ref={aboutGlobeRef} className="about-globe" />
              </div>
            </div>

            <div className="rv rv-d2">
              <p className="section-copy" dangerouslySetInnerHTML={{ __html: t('about.p1') }} />
              <p className="section-copy" dangerouslySetInnerHTML={{ __html: t('about.p2') }} />
              <p className="section-copy" dangerouslySetInnerHTML={{ __html: t('about.p3') }} />

              <div className="stats-grid">
                <div className="mini-stat"><div className="mini-number"><CountUp end={3} suffix="+" /></div><div className="mini-label">{t('about.stat1')}</div></div>
                <div className="mini-stat"><div className="mini-number"><CountUp end={10} suffix="+" /></div><div className="mini-label">{t('about.stat2')}</div></div>
                <div className="mini-stat"><div className="mini-number"><CountUp end={20} suffix="+" /></div><div className="mini-label">{t('about.stat3')}</div></div>
                <div className="mini-stat"><div className="mini-number"><CountUp end={2} suffix="" /></div><div className="mini-label">{t('about.stat4')}</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="section">
        <div className="container">
          <SectionHeader tag={t('skills.tag')} title={t('skills.title')} subtitle={t('skills.sub')} />

          <div className="skills-canvas-wrap rv rv-d2">
            <canvas ref={skillsCanvasRef} className="skills-canvas" />
            <div className="skills-hint">{t('skills.hint')}</div>
          </div>

          <div className="skills-grid rv rv-d3">
            {SKILL_GROUPS.map(([key, items]) => (
              <div key={key} className="skill-card" onMouseMove={trackSpotlight}>
                <div className="skill-name">{t(key)}</div>
                <div className="skill-tags">
                  {items.map((item) => <span key={item} className="skill-tag">{item}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="section section-alt">
        <div className="container">
          <SectionHeader tag={t('projects.tag')} title={t('projects.title')} />

          <div className="tabs rv rv-d2">
            {PROJECT_TABS.map(([key, labelKey]) => (
              <button key={key} type="button" className={`tab ${activeTab === key ? 'active' : ''}`} aria-pressed={activeTab === key} onClick={() => setActiveTab(key)}>{t(labelKey)}</button>
            ))}
          </div>

          <div className="project-grid rv rv-d3">
            {filteredProjects.map((project, index) => {
              const slug = project.slug;
              const imgs = tp(project, 'images');
              const featured = activeTab === 'All' && index === 0 && !project.comingSoon;
              return (
                <article
                  key={slug}
                  className={`project-card ${featured ? 'featured' : ''} ${project.comingSoon ? 'coming-soon' : ''}`}
                  onMouseMove={trackSpotlight}
                >
                  <div className="project-mock">
                    {project.comingSoon && <div className="coming-soon-overlay"><span>{t('projects.coming')}</span></div>}
                    {imgs && imgs.length > 0 ? (
                      <img src={imgs[0].src} alt={imgs[0].alt} loading="lazy" className="project-img" />
                    ) : (
                      <div className="project-placeholder">
                        <span className="project-icon">{project.icon}</span>
                        {!project.comingSoon && t('projects.placeholder')}
                        <div className="project-dim">{tp(project, 'subtitle')}</div>
                      </div>
                    )}
                    {!project.comingSoon && (
                      <div className="project-hover">
                        <Link to={`/projects/${slug}`} className="button primary compact">{t('projects.details')}</Link>
                      </div>
                    )}
                  </div>
                  <div className="project-body">
                    <div className="project-kicker">{tp(project, 'subtitle')}</div>
                    <h3 className="project-title">{project.comingSoon ? tp(project, 'title') : <Link to={`/projects/${slug}`}>{tp(project, 'title')}</Link>}</h3>
                    <p className="project-copy">{tp(project, 'description')}</p>
                    <div className="project-tags">{project.tags.map((tag) => <span key={tag} className="project-badge">{tag}</span>)}</div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="formation" className="section">
        <div className="container">
          <SectionHeader tag={t('formation.tag')} title={t('formation.title')} />

          <div className="timeline">
            {FORMATION.map((item, index) => (
              <div key={item.degree} className={`timeline-item rv ${index === 1 ? 'rv-d2' : ''}`}>
                <div className="timeline-dot" />
                <article className="timeline-card">
                  <div className="timeline-company">{item.degree}</div>
                  <div className="timeline-role">{item.school}</div>
                  <div className="timeline-period">{item.period}</div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="section">
        <div className="container">
          <SectionHeader tag={t('exp.tag')} title={t('exp.title')} />

          <div className="timeline">
            {EXPERIENCE.map((item, index) => (
              <div key={item.company} className={`timeline-item rv ${index === 1 ? 'rv-d2' : ''} ${index === 2 ? 'rv-d3' : ''}`}>
                <div className="timeline-dot" />
                <article className="timeline-card">
                  <div className="timeline-company">{item.company}</div>
                  <div className="timeline-role">{item.role}</div>
                  <div className="timeline-period">{item.period}</div>
                  <p className="timeline-copy">{item.description}</p>
                  <div className="timeline-tags">{item.tags.map((tag) => <span key={tag} className="timeline-tag">{tag}</span>)}</div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="certifications" className="section section-alt">
        <div className="container">
          <SectionHeader tag={t('certs.tag')} title={t('certs.title')} subtitle={t('certs.sub')} />

          <div className="cert-grid">
            {CERTIFICATIONS.map((cert, index) => (
              <div key={cert.title} className={`cert-card rv ${index === 1 ? 'rv-d3' : ''} ${index === 2 ? 'rv-d4' : 'rv-d2'}`}>
                <div className="cert-inner">
                  <div className="cert-front">
                    <div className="cert-ico">{cert.icon}</div>
                    <div className="cert-issuer">{cert.issuer}</div>
                    <div className="cert-title">{cert.title}</div>
                    <p className="cert-copy">{cert.description}</p>
                    <div className="cert-badge">{cert.badge}</div>
                  </div>
                  <div className="cert-back">
                    <div className="cert-back-ico">🏆</div>
                    <div className="cert-back-copy">{cert.back}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section">
        <div className="container">
          <SectionHeader tag={t('contact.tag')} title={t('contact.title')} />

          <div className="contact-grid">
            <div className="rv rv-d2">
              <p className="contact-intro">{t('contact.intro')}</p>
              <div className="contact-list">
                <div className="contact-item">
                  <div className="contact-ico" aria-hidden="true">✉</div>
                  <div>
                    <div className="contact-label">{t('contact.email')}</div>
                    <a href={`mailto:${SOCIAL_LINKS.email}`} className="contact-value">{SOCIAL_LINKS.email}</a>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-ico" aria-hidden="true">📞</div>
                  <div>
                    <div className="contact-label">{t('contact.phone')}</div>
                    <a href="tel:+21620628396" className="contact-value">+216 20 628 396</a>
                  </div>
                </div>
                <div className="contact-item borderless">
                  <div className="contact-ico" aria-hidden="true">📍</div>
                  <div>
                    <div className="contact-label">{t('contact.location')}</div>
                    <span className="contact-value">{t('contact.value.location')}</span>
                  </div>
                </div>
              </div>
            </div>

            <form className="contact-form rv rv-d3" id="cform" onSubmit={handleSubmit}>
              <div className="form-window">
                <span className="window-dot red" />
                <span className="window-dot yellow" />
                <span className="window-dot green" />
                <span className="window-title">{t('contact.form.title')}</span>
              </div>

              <label className="field">
                <span className="field-label">{t('contact.form.name')}</span>
                <input className="input" type="text" name="name" value={formData.name} onChange={handleChange} placeholder={t('contact.form.name_ph')} required />
              </label>

              <label className="field">
                <span className="field-label">{t('contact.form.email')}</span>
                <input className="input" type="email" name="email" value={formData.email} onChange={handleChange} placeholder={t('contact.form.email_ph')} required />
              </label>

              <label className="field">
                <span className="field-label">{t('contact.form.subject')}</span>
                <input className="input" type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder={t('contact.form.subject_ph')} required />
              </label>

              <label className="field">
                <span className="field-label">{t('contact.form.msg')}</span>
                <textarea className="input" rows="4" name="message" value={formData.message} onChange={handleChange} placeholder={t('contact.form.msg_ph')} required />
              </label>

              <button className="button primary submit" type="submit" disabled={formStatus === 'sending'}>{formStatus === 'sending' ? 'Sending...' : t('contact.form.send')}</button>
              <p className="form-status success" role="status" aria-live="polite" hidden={formStatus !== 'sent'}>Message sent successfully!</p>
              <p className="form-status error" role="alert" hidden={formStatus !== 'error' || !formError}>{formError}</p>
            </form>
          </div>
        </div>
      </section>
      </div>
      </>) : (
        <main id="main-content"><Outlet /></main>
      )}

      <footer className="footer">
        <div className="container footer-inner">
          <div>
            <div className="footer-title" dangerouslySetInnerHTML={{ __html: t('footer.title') }} />
            <div className="footer-subtitle">{t('footer.sub')}</div>
          </div>
          <div className="footer-right">
            <div className="footer-copy">{t('footer.copy')}</div>
            <SocialLinks className="footer-links" />
          </div>
        </div>
      </footer>

      <div className={`palette-overlay ${paletteOpen ? 'open' : ''}`} id="cmd-bg" onClick={(event) => { if (event.target === event.currentTarget) setPaletteOpen(false); }}>
        <div className="palette-box" role="dialog" aria-modal="true" aria-label={t('palette.aria')}>
          <div className="palette-top">
            <span className="palette-icon">⌘</span>
            <input
              ref={paletteInputRef}
              className="palette-input"
              placeholder={t('palette.search')}
              value={paletteQuery}
              onChange={(event) => {
                setPaletteQuery(event.target.value);
                setPaletteIndex(0);
              }}
              onKeyDown={(event) => {
                if (event.key === 'ArrowDown') {
                  event.preventDefault();
                  setPaletteIndex((index) => Math.min(index + 1, Math.max(commandItems.length - 1, 0)));
                }
                if (event.key === 'ArrowUp') {
                  event.preventDefault();
                  setPaletteIndex((index) => Math.max(index - 1, 0));
                }
                if (event.key === 'Enter' && commandItems[paletteIndex]) {
                  event.preventDefault();
                  runCommand(commandItems[paletteIndex].target);
                }
              }}
            />
            <span className="palette-hint">{t('palette.esc')}</span>
          </div>
          <div className="palette-items">
            {commandItems.map((item, index) => (
              <button key={item.label} type="button" className={`palette-item ${index === paletteIndex ? 'selected' : ''}`} onMouseEnter={() => setPaletteIndex(index)} onClick={() => runCommand(item.target)}>
                <span className="palette-item-icon">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
          <div className="palette-foot">{t('palette.foot')}</div>
        </div>
      </div>

      <div className={`egg ${konamiVisible ? 'show' : ''}`}>{t('egg')}</div>
    </>
  );
}
