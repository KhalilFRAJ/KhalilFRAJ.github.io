// Static site content. Translatable strings stay in src/i18n/translations.js —
// entries here are either translation keys or language-neutral values.

export const SOCIAL_LINKS = {
  github: 'https://github.com/KhalilFRAJ',
  linkedin: 'https://linkedin.com',
  email: 'khalilfrajo@gmail.com',
};

export const NAV_LINKS = [
  ['about', 'nav.about'],
  ['skills', 'nav.skills'],
  ['projects', 'nav.projects'],
  ['formation', 'nav.formation'],
  ['experience', 'nav.experience'],
  ['certifications', 'nav.certs'],
  ['contact', 'nav.contact'],
];

export const SKILL_GROUPS = [
  ['skill.f', ['Angular', 'React', 'Next.js', 'HTMX', 'Flutter', 'FlutterFlow', 'JavaFX']],
  ['skill.b', ['NestJS', 'Node.js', 'Spring Boot', 'Symfony', 'Django', '.NET']],
  ['skill.l', ['Java', 'TypeScript', 'Python', 'C#', 'PHP', 'SQL']],
  ['skill.d', ['MongoDB', 'Neo4j', 'MySQL', 'PostgreSQL']],
  ['skill.o', ['Docker', 'GitHub', 'REST APIs', 'CI/CD']],
  ['skill.s', ['Machine Learning', 'Mobile Dev', 'Architecture', 'Agile']],
];

export const EXPERIENCE = [
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

export const FORMATION = [
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

export const CERTIFICATIONS = [
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

export const COMMANDS = [
  ['cmd.home', '🏠', 'hero'],
  ['cmd.about', '👤', 'about'],
  ['cmd.skills', '⚡', 'skills'],
  ['cmd.projects', '🚀', 'projects'],
  ['cmd.formation', '🎓', 'formation'],
  ['cmd.experience', '💼', 'experience'],
  ['cmd.certs', '🎓', 'certifications'],
  ['cmd.contact', '✉️', 'contact'],
  ['cmd.email', '📧', `mailto:${SOCIAL_LINKS.email}`],
  ['cmd.theme', '🌙', 'theme'],
];

export const TYPE_LINES = ['type.1', 'type.2', 'type.3', 'type.4'];
