import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { useLang } from './contexts/LanguageContext';
import { usePageMeta } from './hooks/usePageMeta';

import { PROJECTS } from './data/projects';

import aboutPortrait from './images/about/Khalil.jpg';
const resumeFile = new URL('./images/about/Khalil_Fraj_CV.docx', import.meta.url).href;

const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'xsqo5PQjDF5PiBaTK';
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_n4ouirm';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_uixoa9q';

emailjs.init(EMAILJS_PUBLIC_KEY);

const NAV_LINKS = [
  ['about', 'nav.about'],
  ['skills', 'nav.skills'],
  ['projects', 'nav.projects'],
  ['formation', 'nav.formation'],
  ['experience', 'nav.experience'],
  ['certifications', 'nav.certs'],
  ['contact', 'nav.contact'],
];

const SKILL_GROUPS = [
  ['skill.f', ['Angular', 'React', 'Next.js', 'HTMX', 'Flutter', 'FlutterFlow', 'JavaFX']],
  ['skill.b', ['NestJS', 'Node.js', 'Spring Boot', 'Symfony', 'Django', '.NET']],
  ['skill.l', ['Java', 'TypeScript', 'Python', 'C#', 'PHP', 'SQL']],
  ['skill.d', ['MongoDB', 'Neo4j', 'MySQL', 'PostgreSQL']],
  ['skill.o', ['Docker', 'GitHub', 'REST APIs', 'CI/CD']],
  ['skill.s', ['Machine Learning', 'Mobile Dev', 'Architecture', 'Agile']],
];

// PROJECTS are now sourced from `src/data/projects.js` modules

const EXPERIENCE = [
  {
    company: 'ArabSoft',
    role: 'Web Developer',
    period: 'En cours',
    description: 'Developing web applications with modern full-stack architecture.',
    tags: ['Angular', 'Spring Boot', 'PostgreSQL'],
  },
  {
    company: 'OEM Engineering',
    role: 'Software Engineering Intern',
    period: '3 months - Sfax, Tunisia',
    description: 'Web Developer.',
    tags: ['React', 'Django', 'Django REST Framework', 'MySQL'],
  },
  {
    company: 'L-Mobile',
    role: 'Software Engineering Intern',
    period: '1 month - Nabeul, Tunisia',
    description: 'Web and Mobile Developer.',
    tags: ['Flutter', 'React'],
  },
];

const FORMATION = [
  {
    degree: 'Cycle Ingenieur en Informatique - Option Developpement Web',
    school: "ESPRIT (Ecole Superieure Privee d'Ingenierie et de Technologies), Tunis",
    period: '2024 - en cours',
  },
  {
    degree: "Licence Appliquee en Technologies de l'Informatique",
    school: 'Institut Superieur des Etudes Technologiques (ISET) de Sfax',
    period: '2021 - 2024',
  },
];

const CERTIFICATIONS = [
  {
    icon: '🍃',
    issuer: 'MongoDB University',
    title: 'MongoDB Data Modeling Intro',
    description: 'Schema design patterns, embedding vs referencing, and performance optimization for MongoDB.',
    back: 'Verified certification in MongoDB Data Modeling issued by MongoDB University.',
    badge: 'Certified',
  },
  {
    icon: '🔗',
    issuer: 'Neo4j GraphAcademy',
    title: 'Neo4j Fundamentals',
    description: 'Graph database concepts, Cypher query language, and building graph-powered applications.',
    back: 'Verified certification in Neo4j Fundamentals issued by Neo4j GraphAcademy.',
    badge: 'Certified',
  },
  {
    icon: '+',
    issuer: 'Coming Soon',
    title: 'More certifications on the way',
    description: 'Always learning, always growing.',
    back: 'More certifications are on the way.',
    badge: 'Learning',
  },
];

const COMMANDS = [
  ['cmd.home', '🏠', 'hero'],
  ['cmd.about', '👤', 'about'],
  ['cmd.skills', '⚡', 'skills'],
  ['cmd.projects', '🚀', 'projects'],
  ['cmd.formation', '🎓', 'formation'],
  ['cmd.experience', '💼', 'experience'],
  ['cmd.certs', '🎓', 'certifications'],
  ['cmd.contact', '✉️', 'contact'],
  ['cmd.email', '📧', 'mailto:khalilfrajo@gmail.com'],
  ['cmd.theme', '🌙', 'theme'],
];

const TYPE_LINES = ['type.1', 'type.2', 'type.3', 'type.4'];

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function startGlobe(canvas) {
  if (!canvas) return () => {};

  const context = canvas.getContext('2d');
  if (!context) return () => {};

  let frameId = 0;
  let angle = 0;

  const draw = () => {
    const size = Math.min(canvas.clientWidth || 170, canvas.clientHeight || 170);
    canvas.width = size;
    canvas.height = size;
    context.clearRect(0, 0, size, size);

    const radius = size * 0.41;
    const centerX = size / 2;
    const centerY = size / 2;
    const latCount = 10;
    const lonCount = 18;

    for (let lat = 0; lat <= latCount; lat += 1) {
      const phi = -Math.PI / 2 + (lat * Math.PI) / latCount;
      context.beginPath();
      let first = true;
      for (let t = 0; t <= 64; t += 1) {
        const lambda = (t / 64) * Math.PI * 2 + angle;
        const x = centerX + radius * Math.cos(phi) * Math.cos(lambda);
        const y = centerY + radius * Math.sin(phi);
        const z = radius * Math.cos(phi) * Math.sin(lambda);
        if (z > -radius * 0.2) {
          if (first) context.moveTo(x, y);
          else context.lineTo(x, y);
          first = false;
        } else {
          first = true;
        }
      }
      context.strokeStyle = 'rgba(212,168,83,0.18)';
      context.lineWidth = 0.6;
      context.stroke();
    }

    for (let lon = 0; lon < lonCount; lon += 1) {
      const lambda = (lon / lonCount) * Math.PI * 2 + angle;
      context.beginPath();
      let first = true;
      for (let t = 0; t <= 32; t += 1) {
        const phi = -Math.PI / 2 + (t * Math.PI) / 32;
        const x = centerX + radius * Math.cos(phi) * Math.cos(lambda);
        const y = centerY + radius * Math.sin(phi);
        const z = radius * Math.cos(phi) * Math.sin(lambda);
        if (z > -radius * 0.2) {
          if (first) context.moveTo(x, y);
          else context.lineTo(x, y);
          first = false;
        } else {
          first = true;
        }
      }
      context.strokeStyle = 'rgba(212,168,83,0.1)';
      context.lineWidth = 0.5;
      context.stroke();
    }

    const tunisiaLat = (34 * Math.PI) / 180;
    const tunisiaLon = (9 * Math.PI) / 180 + angle;
    const dotX = centerX + radius * Math.cos(tunisiaLat) * Math.cos(tunisiaLon);
    const dotY = centerY + radius * Math.sin(tunisiaLat);
    const dotZ = radius * Math.cos(tunisiaLat) * Math.sin(tunisiaLon);

    if (dotZ > 0) {
      const pulse = (Date.now() % 2000) / 2000;
      [1, 2, 3].forEach((ring) => {
        context.beginPath();
        context.arc(dotX, dotY, 4 + ring * 5 * pulse, 0, Math.PI * 2);
        context.strokeStyle = `rgba(212,168,83,${(0.55 * (1 - pulse)) / ring})`;
        context.lineWidth = 0.8;
        context.stroke();
      });
      context.beginPath();
      context.arc(dotX, dotY, 4, 0, Math.PI * 2);
      context.fillStyle = 'rgba(212,168,83,0.95)';
      context.fill();
    }

    angle += 0.005;
    frameId = window.requestAnimationFrame(draw);
  };

  draw();
  return () => window.cancelAnimationFrame(frameId);
}

function startSkillsGalaxy(canvas) {
  if (!canvas) return () => {};

  const context = canvas.getContext('2d');
  if (!context) return () => {};

  const colors = ['#d4a853', '#4a9eff', '#ff7057', '#4ade80', '#a78bfa', '#f472b6'];
  const categoryNames = ['Frontend', 'Backend', 'Languages', 'Databases', 'DevOps', 'Specializations'];
  const skills = [
    { name: 'React', category: 0 },
    { name: 'Next.js', category: 0 },
    { name: 'Angular', category: 0 },
    { name: 'Flutter', category: 0 },
    { name: 'JavaFX', category: 0 },
    { name: 'HTMX', category: 0 },
    { name: 'FlutterFlow', category: 0 },
    { name: 'NestJS', category: 1 },
    { name: 'Node.js', category: 1 },
    { name: 'Spring Boot', category: 1 },
    { name: 'Django', category: 1 },
    { name: 'Symfony', category: 1 },
    { name: '.NET', category: 1 },
    { name: 'TypeScript', category: 2 },
    { name: 'Python', category: 2 },
    { name: 'Java', category: 2 },
    { name: 'C#', category: 2 },
    { name: 'PHP', category: 2 },
    { name: 'SQL', category: 2 },
    { name: 'MongoDB', category: 3 },
    { name: 'PostgreSQL', category: 3 },
    { name: 'Neo4j', category: 3 },
    { name: 'MySQL', category: 3 },
    { name: 'Docker', category: 4 },
    { name: 'GitHub', category: 4 },
    { name: 'REST APIs', category: 4 },
    { name: 'CI/CD', category: 4 },
    { name: 'Machine Learning', category: 5 },
    { name: 'Architecture', category: 5 },
    { name: 'Mobile Dev', category: 5 },
  ];

  const nodes = skills.map((skill, index) => {
    const phi = Math.acos(1 - (2 * (index + 0.5)) / skills.length);
    const theta = Math.PI * (1 + Math.sqrt(5)) * index;
    const radius = 170 + Math.random() *75;
    return {
      skill,
      ox: radius * Math.sin(phi) * Math.cos(theta),
      oy: radius * Math.sin(phi) * Math.sin(theta),
      oz: radius * Math.cos(phi),
      radius,
    };
  });

  const edges = [];
  for (let i = 0; i < nodes.length; i += 1) {
    for (let j = i + 1; j < nodes.length; j += 1) {
      if (nodes[i].skill.category === nodes[j].skill.category) edges.push([i, j]);
    }
  }

  const projections = nodes.map(() => ({ x: 0, y: 0, z: 0, radius: 0, scale: 0 }));
  let rotationX = 0.25;
  let rotationY = 0;
  let velocityX = 0;
  let velocityY = 0.007;
  let dragging = false;
  let lastX = 0;
  let lastY = 0;
  let hoverIndex = -1;
  let zoom = 1.5;
  let time = 0;
  let frameId = 0;

  const resize = () => {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
  };

  const draw = () => {
    time += 0.008;
    if (!dragging) {
      velocityX *= 0.97;
      velocityY *= 0.97;
      if (Math.abs(velocityY) < 0.004) velocityY = 0.004;
    }

    rotationX += velocityX;
    rotationY += velocityY;

    const width = canvas.width;
    const height = canvas.height;
    context.clearRect(0, 0, width, height);

    const glow = context.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width * 0.5);
    glow.addColorStop(0, 'rgba(212,168,83,0.03)');
    glow.addColorStop(1, 'rgba(0,0,0,0)');
    context.fillStyle = glow;
    context.fillRect(0, 0, width, height);

    const cosY = Math.cos(rotationY);
    const sinY = Math.sin(rotationY);
    const cosX = Math.cos(rotationX);
    const sinX = Math.sin(rotationX);

    nodes.forEach((node, index) => {
      const fx = node.ox + Math.sin(time * 0.55 + index * 0.4) * 7;
      const fy = node.oy + Math.cos(time * 0.48 + index * 0.3) * 5;
      const fz = node.oz + Math.sin(time * 0.38 + index * 0.5) * 7;
      const x1 = fx * cosY - fz * sinY;
      const z1 = fx * sinY + fz * cosY;
      const y2 = fy * cosX - z1 * sinX;
      const z2 = fy * sinX + z1 * cosX;
      const scale = (500 / (500 + z2 + 300)) * zoom;
      projections[index] = {
        x: width / 2 + x1 * scale,
        y: height / 2 + y2 * scale,
        z: z2,
        radius: Math.max(3.5, scale * 8.5),
        scale,
      };
    });

    const sorted = [...nodes.keys()].sort((a, b) => projections[a].z - projections[b].z);

    edges.forEach(([a, b]) => {
      const pa = projections[a];
      const pb = projections[b];
      const highlighted = hoverIndex === a || hoverIndex === b;
      context.beginPath();
      context.moveTo(pa.x, pa.y);
      context.lineTo(pb.x, pb.y);
      context.globalAlpha = Math.min(pa.scale, pb.scale) * (highlighted ? 0.5 : 0.15);
      context.strokeStyle = colors[nodes[a].skill.category];
      context.lineWidth = highlighted ? 0.9 : 0.45;
      context.stroke();
    });

    context.globalAlpha = 1;
    sorted.forEach((index) => {
      const point = projections[index];
      if (point.z < -270) return;

      const skill = nodes[index].skill;
      const color = colors[skill.category];
      const highlighted = hoverIndex === index;
      const size = highlighted ? point.radius * 2.1 : point.radius;
      const alpha = (0.22 + point.scale * 0.65) * (point.z > 0 ? 1 : 0.42);

      context.save();
      context.globalAlpha = alpha;
      if (highlighted) {
        context.shadowBlur = 26;
        context.shadowColor = color;
      }

      if (point.scale > 0.45) {
        const red = Number.parseInt(color.slice(1, 3), 16);
        const green = Number.parseInt(color.slice(3, 5), 16);
        const blue = Number.parseInt(color.slice(5, 7), 16);
        context.beginPath();
        context.arc(point.x, point.y, size + 5, 0, Math.PI * 2);
        context.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha * 0.2})`;
        context.fill();
      }

      context.beginPath();
      context.arc(point.x, point.y, size, 0, Math.PI * 2);
      context.fillStyle = color;
      context.fill();
      context.globalAlpha = alpha * 0.5;
      context.strokeStyle = 'rgba(255,255,255,0.7)';
      context.lineWidth = 0.6;
      context.stroke();
      context.shadowBlur = 0;

      if (point.scale > 0.46 || highlighted) {
        const fontSize = Math.max(9, Math.min(13, point.scale * 11 + (highlighted ? 3 : 0)));
        context.globalAlpha = Math.min(1, alpha + 0.1);
        context.font = `${highlighted ? 600 : 400} ${fontSize}px Inter, sans-serif`;
        context.fillStyle = highlighted ? '#ffffff' : color;
        context.textAlign = 'center';
        context.fillText(skill.name, point.x, point.y - size - 5);
      }

      context.restore();
    });

    categoryNames.forEach((name, index) => {
      context.save();
      context.beginPath();
      context.arc(14, 14 + index * 19, 4, 0, Math.PI * 2);
      context.fillStyle = colors[index];
      context.globalAlpha = 0.8;
      context.fill();
      context.globalAlpha = 0.65;
      context.font = '11px Inter, sans-serif';
      context.fillStyle = colors[index];
      context.textAlign = 'left';
      context.fillText(name, 22, 18 + index * 19);
      context.restore();
    });

    frameId = window.requestAnimationFrame(draw);
  };

  const handleMouseMove = (event) => {
    if (dragging) {
      velocityY += (event.clientX - lastX) * 0.004;
      velocityX += (event.clientY - lastY) * 0.004;
      lastX = event.clientX;
      lastY = event.clientY;
    }

    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    hoverIndex = -1;
    projections.forEach((point, index) => {
      if (Math.hypot(point.x - mouseX, point.y - mouseY) < point.radius + 5) hoverIndex = index;
    });
  };

  const handleMouseDown = (event) => {
    dragging = true;
    lastX = event.clientX;
    lastY = event.clientY;
    velocityX = 0;
    velocityY = 0;
  };

  const stopDrag = () => {
    dragging = false;
  };

  const handleMouseLeave = () => {
    hoverIndex = -1;
  };

  

  resize();
  window.addEventListener('resize', resize);
  canvas.addEventListener('mousedown', handleMouseDown);
  window.addEventListener('mouseup', stopDrag);
  canvas.addEventListener('mousemove', handleMouseMove);
  canvas.addEventListener('mouseleave', handleMouseLeave);
  frameId = window.requestAnimationFrame(draw);

  return () => {
    window.cancelAnimationFrame(frameId);
    window.removeEventListener('resize', resize);
    canvas.removeEventListener('mousedown', handleMouseDown);
    window.removeEventListener('mouseup', stopDrag);
    canvas.removeEventListener('mousemove', handleMouseMove);
    canvas.removeEventListener('mouseleave', handleMouseLeave);
  };
}

function CountUp({ end, suffix = '+' }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    let started = false;
    let timerId = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          let current = 0;
          timerId = window.setInterval(() => {
            current = Math.min(current + end / 40, end);
            setValue(Math.floor(current));
            if (current >= end) window.clearInterval(timerId);
          }, 28);
        }
      },
      { threshold: 0.6 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      window.clearInterval(timerId);
    };
  }, [end]);

  return <span ref={ref}>{value}{suffix}</span>;
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
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: trimmed.name,
          from_email: trimmed.email,
          subject: trimmed.subject,
          message: trimmed.message,
          to_email: 'khalilfrajo@gmail.com',
        },
      );
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

  const heroGlobeRef = useRef(null);
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
      email: 'khalilfrajo@gmail.com',
      telephone: '+21620628396',
      address: { '@type': 'PostalAddress', addressCountry: 'TN' },
      knowsAbout: ['React', 'Angular', 'NestJS', 'Node.js', 'Spring Boot', 'Symfony', 'Django', 'Flutter', 'Java', 'TypeScript', 'Python', 'MongoDB', 'Neo4j', 'Docker'],
      sameAs: ['https://github.com', 'https://linkedin.com'],
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
    if (!isHome) return;
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
    if (!isHome) return;

    const sections = NAV_LINKS.map(([id]) => document.getElementById(id)).filter(Boolean);
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.5 },
    );
    sections.forEach((section) => sectionObserver.observe(section));

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('v');
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

      const pattern = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
      window.__konamiIndex = window.__konamiIndex ?? 0;
      window.__konamiIndex = event.keyCode === pattern[window.__konamiIndex] ? window.__konamiIndex + 1 : 0;
      if (window.__konamiIndex === pattern.length) {
        setKonamiVisible(true);
        window.setTimeout(() => setKonamiVisible(false), 4000);
        window.__konamiIndex = 0;
      }
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const cleanup1 = startGlobe(heroGlobeRef.current);
    const cleanup2 = startGlobe(aboutGlobeRef.current);
    return () => { cleanup1(); cleanup2(); };
  }, [isHome]);

  useEffect(() => {
    if (!isHome) return;
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

      <nav className={`topbar ${scrollProgress > 4 ? 'scrolled' : ''}`}>
        <a href="#hero" className="brand">KF<em>.</em></a>

        <ul className="nav-links desktop-only">
          {NAV_LINKS.map(([id, key]) => (
            <li key={id}>
              <a href={`#${id}`} className={activeSection === id ? 'active' : ''} onClick={() => setMobileOpen(false)}>{t(key)}</a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <button type="button" className="icon-button" onClick={() => { const next = theme === 'dark' ? 'light' : 'dark'; setTheme(next); }} aria-label={t('nav.theme')}>
            {theme === 'dark' ? '☀' : '🌙'}
          </button>
          <button type="button" className="icon-button" onClick={() => toggleLang()} aria-label="Toggle language">
            {lang === 'en' ? 'FR' : 'EN'}
          </button>
          <a href="#contact" className="cta desktop-only">{t('nav.hire')}</a>
          <button type="button" className="burger mobile-only" onClick={() => setMobileOpen((value) => !value)} aria-label={t('nav.menu')}>
            <span className={mobileOpen ? 'open' : ''} />
            <span className={mobileOpen ? 'open' : ''} />
            <span className={mobileOpen ? 'open' : ''} />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
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
  <div className="container hero-grid">
    <div className="hero-copy rv">
      <div className="pill">{t('hero.badge')}</div>
      <div className="eyebrow">{t('hero.eyebrow')}</div>
      <h1 className="hero-title" dangerouslySetInnerHTML={{ __html: t('hero.title') }} />
      <p className="hero-lead">{t('hero.lead')}</p>
      <div className="typewriter"><span>{typedText}</span><span className="caret" /></div>
      <div className="hero-actions">
        <a href="#projects" className="button primary">{t('hero.view')}</a>
        <a href="#contact" className="button ghost">{t('hero.touch')}</a>
          <a href={resumeFile} className="button ghost" download="Khalil_Fraj_CV.docx">{t('hero.resume')}</a>
      </div>
      <div className="hero-socials">
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg></a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
        <a href="mailto:khalilfrajo@gmail.com" aria-label="Email"><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg></a>
      </div>
    </div>
  </div>
  <div className="hero-scroll"><span>{t('hero.scroll')}</span><div className="hero-scroll-line" /></div>
</section>
      <section id="about" className="section section-alt">
        <div className="container">
          <div className="rv">
            <div className="section-tag">{t('about.tag')}</div>
            <h2 className="section-title" dangerouslySetInnerHTML={{ __html: t('about.title') }} />
            <div className="section-divider" />
          </div>

          <div className="about-grid">
            <div className="about-card rv-l">
              <div className="about-frame">
                <img
                  src={aboutPortrait}
                  alt={t('about.portrait')}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                />
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
          <div className="rv">
            <div className="section-tag">{t('skills.tag')}</div>
            <h2 className="section-title">{t('skills.title')}</h2>
            <div className="section-divider" />
            <p className="section-subtitle">{t('skills.sub')}</p>
          </div>

          <div className="skills-canvas-wrap rv rv-d2">
            <canvas ref={skillsCanvasRef} className="skills-canvas" />
            <div className="skills-hint">{t('skills.hint')}</div>
          </div>

          <div className="skills-grid rv rv-d3">
            {SKILL_GROUPS.map(([key, items]) => (
              <div key={key} className="skill-card">
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
          <div className="rv">
            <div className="section-tag">{t('projects.tag')}</div>
            <h2 className="section-title">{t('projects.title')}</h2>
            <div className="section-divider" />
          </div>

          <div className="tabs rv rv-d2">
            {[{ key: 'All', label: t('projects.all') }, { key: 'Web Apps', label: t('projects.web') }, { key: 'Mobile', label: t('projects.mobile') }, { key: 'AI / ML', label: t('projects.ai') }, { key: 'Academic', label: t('projects.academic') }].map((tab) => (
              <button key={tab.key} type="button" className={`tab ${activeTab === tab.key ? 'active' : ''}`} onClick={() => setActiveTab(tab.key)}>{tab.label}</button>
            ))}
          </div>          
          <div className="project-grid rv rv-d3">
            {filteredProjects.map((project) => {
              const slug = project.slug;
              const imgs = tp(project, 'images');
              return (
              <article key={project.title} className={`project-card ${project.comingSoon ? 'coming-soon' : ''}`}>
                <div className="project-mock">
                  {project.comingSoon && <div className="coming-soon-overlay"><span>{t('projects.coming')}</span></div>}
                  {imgs && imgs.length > 0 ? (
                    <img src={imgs[0].src} alt={imgs[0].alt} loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }} />
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
                    <a href="#" className="button ghost compact" onClick={(event) => event.preventDefault()}>{t('social.github')}</a>
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
          <div className="rv">
            <div className="section-tag">{t('formation.tag')}</div>
            <h2 className="section-title">{t('formation.title')}</h2>
            <div className="section-divider" />
          </div>

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
          <div className="rv">
            <div className="section-tag">{t('exp.tag')}</div>
            <h2 className="section-title">{t('exp.title')}</h2>
            <div className="section-divider" />
          </div>

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
          <div className="rv">
            <div className="section-tag">{t('certs.tag')}</div>
            <h2 className="section-title">{t('certs.title')}</h2>
            <div className="section-divider" />
            <p className="section-subtitle">{t('certs.sub')}</p>
          </div>

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
          <div className="rv">
            <div className="section-tag">{t('contact.tag')}</div>
            <h2 className="section-title">{t('contact.title')}</h2>
            <div className="section-divider" />
          </div>

          <div className="contact-grid">
            <div className="rv rv-d2">
              <p className="contact-intro">{t('contact.intro')}</p>
              <div className="contact-list">
                <div className="contact-item">
                  <div className="contact-ico">✉</div>
                  <div>
                    <div className="contact-label">{t('contact.email')}</div>
                    <a href="mailto:khalilfrajo@gmail.com" className="contact-value">khalilfrajo@gmail.com</a>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-ico">📞</div>
                  <div>
                    <div className="contact-label">{t('contact.phone')}</div>
                    <a href="tel:+21620628396" className="contact-value">+216 20 628 396</a>
                  </div>
                </div>
                <div className="contact-item borderless">
                  <div className="contact-ico">📍</div>
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
              {formStatus === 'sent' && <p className="form-status success">Message sent successfully!</p>}
              {formStatus === 'error' && formError && <p className="form-status error">{formError}</p>}
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
            <div className="footer-links">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
              <a href="mailto:khalilfrajo@gmail.com" aria-label="Email"><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg></a>
            </div>
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
