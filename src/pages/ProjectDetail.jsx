import { useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLang } from '../contexts/LanguageContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { PROJECTS } from '../data/projects';

const s = {
  section: { marginTop: 36 },
  title: { fontSize: 22, fontWeight: 600, marginBottom: 16 },
  card: {
    borderRadius: 12,
    border: '1px solid var(--border)',
    background: 'var(--bg3)',
    padding: 20,
  },
  tag: {
    display: 'inline-block',
    marginRight: 8,
    marginBottom: 4,
    padding: '6px 10px',
    borderRadius: 10,
    border: '1px solid var(--border)',
    color: 'var(--text2)',
    fontSize: 13,
  },
  text: { color: 'var(--text2)', lineHeight: 1.7, whiteSpace: 'pre-wrap' },
  grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 },
  list: { color: 'var(--text2)', lineHeight: 2, paddingLeft: 20 },
};

function List({ items }) {
  return (
    <ul style={s.list}>
      {items.map((item, i) => <li key={i}>{item}</li>)}
    </ul>
  );
}

function TechGroup({ label, items }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontWeight: 600, marginBottom: 6, fontSize: 14 }}>{label}</div>
      <div>{items.map((t) => <span key={t} style={s.tag}>{t}</span>)}</div>
    </div>
  );
}

export default function ProjectDetail() {
  const { t, tp } = useLang();
  const { slug } = useParams();

  const project = useMemo(() => PROJECTS.find((p) => p.slug === slug), [slug]);

  const title = project ? `${tp(project, 'title')} — Khalil Fraj` : 'Project Not Found';
  const description = project
    ? (tp(project, 'overview') || tp(project, 'description') || '').slice(0, 160)
    : '';

  usePageMeta({
    title,
    description,
    path: project ? `/projects/${project.slug}` : undefined,
  });

  const features = useMemo(() => project && tp(project, 'features'), [project, tp]);
  const arch = useMemo(() => project && tp(project, 'architecture'), [project, tp]);
  const tech = useMemo(() => project && tp(project, 'techStack'), [project, tp]);
  const roleItems = useMemo(() => project && tp(project, 'role'), [project, tp]);
  const challengeItems = useMemo(() => project && tp(project, 'challenges'), [project, tp]);
  const resultItems = useMemo(() => project && tp(project, 'results'), [project, tp]);
  const images = useMemo(() => project && tp(project, 'images'), [project, tp]);
  const overview = useMemo(() => project && (tp(project, 'overview') || tp(project, 'description')), [project, tp]);

  useEffect(() => {
    if (!project || document.querySelector(`#jsonld-${project.slug}`)) return;

    const softwareApp = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: tp(project, 'title'),
      description: (tp(project, 'overview') || tp(project, 'description') || '').slice(0, 500),
      url: `https://khalilfraj.com/projects/${project.slug}`,
      applicationCategory: project.tags?.includes('Mobile') ? 'MobileApplication' : 'WebApplication',
      operatingSystem: 'All',
    };

    const s1 = document.createElement('script');
    s1.id = `jsonld-${project.slug}`;
    s1.type = 'application/ld+json';
    s1.textContent = JSON.stringify(softwareApp);
    document.head.appendChild(s1);

    return () => {
      const el = document.getElementById(`jsonld-${project.slug}`);
      if (el) el.remove();
    };
  }, [project, tp]);

  if (!project) {
    return (
      <main id="main-content" className="container" style={{ padding: '120px 0' }}>
        <h1>{t('detail.notfound')}</h1>
        <p>{t('detail.notfound_msg')}</p>
        <Link to="/">{t('detail.backhome')}</Link>
      </main>
    );
  }

  if (project.comingSoon) {
    return (
      <main id="main-content" style={{ padding: '120px 0' }}>
        <div className="container" style={{ maxWidth: 960, textAlign: 'center' }}>
          <div style={{ fontSize: 64, marginBottom: 20 }}>{project.icon}</div>
          <h1>{tp(project, 'title')}</h1>
          <p style={{ color: 'var(--text2)', marginTop: 12, fontSize: 18 }}>{t('detail.coming')}</p>
          <p style={{ color: 'var(--text3)', marginTop: 8 }}>{t('detail.coming_msg')}</p>
          <div style={{ marginTop: 32 }}><Link to="/" className="button primary">{t('detail.back')}</Link></div>
        </div>
      </main>
    );
  }

  return (
    <main id="main-content" style={{ padding: '72px 0' }}>
      <div className="container" style={{ maxWidth: 960 }}>
        <Link to="/" className="button ghost" style={{ marginBottom: 24, display: 'inline-block' }}>{t('detail.back')}</Link>

        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 280px' }}>
            <div style={{ ...s.card, textAlign: 'center' }}>
              <div style={{ fontSize: 56, marginBottom: 12 }} aria-hidden="true">{project.icon}</div>
              <div style={{ color: 'var(--text2)', fontSize: 14, marginBottom: 4 }}>{tp(project, 'subtitle')}</div>
              <h1 style={{ margin: '8px 0' }}>{tp(project, 'title')}</h1>
              <div style={{ marginTop: 12 }}>{project.tags.map((t) => <span key={t} style={s.tag}>{t}</span>)}</div>
            </div>
          </div>

          <div style={{ flex: '2 1 400px' }}>
            <section>
              <h2 style={s.title}>{t('detail.overview')}</h2>
              <div style={s.text}>{overview}</div>
            </section>

            {features && (
              <section style={s.section}>
                <h2 style={s.title}>{t('detail.features')}</h2>
                <div style={s.grid2}>
                  {Object.entries(features).filter(([key]) => key !== 'ai' && key !== 'learning' && key !== 'gamification' && key !== 'enterprise').map(([key, items]) => (
                    <div key={key} style={s.card}>
                      <h3 style={{ fontSize: 16, marginBottom: 12, color: 'var(--accent)' }}>{t('feature.' + key) || key}</h3>
                      <List items={items} />
                    </div>
                  ))}
                </div>
                {Object.entries(features).filter(([key]) => key === 'ai' || key === 'learning' || key === 'gamification' || key === 'enterprise').map(([key, items]) => (
                  <div key={key} style={{ ...s.card, marginTop: 16 }}>
                    <h3 style={{ fontSize: 16, marginBottom: 12, color: 'var(--accent)' }}>{t('feature.' + key) || key}</h3>
                    <List items={items} />
                  </div>
                ))}
              </section>
            )}

            {arch && (
              <section style={s.section}>
                <h2 style={s.title}>{t('detail.architecture')}</h2>
                <div style={{ ...s.card, ...s.text, fontFamily: 'monospace', fontSize: 13, lineHeight: 1.6 }}>{arch}</div>
              </section>
            )}

            {images && images.length > 0 && (
              <section style={s.section}>
                <h2 style={s.title}>{t('detail.gallery')}</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
                  {images.map((img, i) => (
                    <div key={i} style={{ ...s.card, padding: 8, textAlign: 'center' }}>
                      <img src={img.src} alt={img.alt} loading="lazy" style={{ width: '100%', borderRadius: 8, display: 'block' }} />
                      <div style={{ marginTop: 8, color: 'var(--text2)', fontSize: 13 }}>{img.label}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {tech && (
              <section style={s.section}>
                <h2 style={s.title}>{t('detail.tech')}</h2>
                <div style={s.card}>
                  {Object.entries(tech).map(([label, items]) => (
                    <TechGroup key={label} label={label.charAt(0).toUpperCase() + label.slice(1)} items={items} />
                  ))}
                </div>
              </section>
            )}

            {roleItems && (
              <section style={s.section}>
                <h2 style={s.title}>{t('detail.role')}</h2>
                <div style={s.card}>
                  <List items={roleItems} />
                </div>
              </section>
            )}

            {challengeItems && (
              <section style={s.section}>
                <h2 style={s.title}>{t('detail.challenges')}</h2>
                <div style={s.card}>
                  <List items={challengeItems} />
                </div>
              </section>
            )}

            {resultItems && (
              <section style={s.section}>
                <h2 style={s.title}>{t('detail.results')}</h2>
                <div style={s.card}>
                  <List items={resultItems} />
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
