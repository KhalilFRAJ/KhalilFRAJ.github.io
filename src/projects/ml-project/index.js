import img1 from '../../images/bytebattle/bb1.png';
import img2 from '../../images/bytebattle/bb2.png';
import img3 from '../../images/bytebattle/bb3.png';
import img4 from '../../images/bytebattle/bb4.png';
import img5 from '../../images/bytebattle/bb5.png';
import img6 from '../../images/bytebattle/bb6.png';
import img7 from '../../images/bytebattle/bb7.png';

const meta = {
  title: 'ByteBattle',
  slug: 'bytebattle',
  category: 'Web Apps',
  subtitle: 'Web Application',
  icon: '⚔️',
  description: 'AI-powered competitive programming platform featuring real-time coding duels, secure code execution, hackathons, collaborative challenges, and enterprise hiring tools.',
  tags: ['React', 'NestJS', 'MongoDB', 'Docker'],
  overview: `**ByteBattle** is a next-generation competitive programming platform that combines coding challenges, AI-powered learning, real-time competitions, and collaborative problem solving in a single ecosystem.

Unlike traditional coding platforms, ByteBattle integrates secure code execution, algorithm visualization, live duels, hackathons, AI coaching, and enterprise hiring tools, creating an engaging experience for students, developers, educators, and recruiters.`,
  features: {
    web: [
      'Multi-language programming challenges',
      'Monaco code editor',
      'Secure Docker-based code execution',
      'Hidden test cases',
      'Performance metrics',
      'Code submissions',
    ],
    desktop: [
      'Real-time coding duels',
      'Elo ranking system',
      'ICPC-style hackathons',
      'Team competitions',
      'Live leaderboards',
    ],
    ai: [
      'AI-generated hints',
      'Automated code reviews',
      'Mock technical interviews',
      'Text-to-Speech assistance',
      'AI challenge generation',
    ],
    learning: [
      'Interactive algorithm visualizer',
      'Step-by-step animations',
      'Progress tracking',
      'Learning paths',
    ],
    gamification: [
      'XP system',
      'Levels',
      'Badges',
      'Unlockable skins',
      'Achievements',
      'Leaderboards',
    ],
    enterprise: [
      'Private coding challenges',
      'Technical assessments',
      'Hiring workflows',
      'Candidate evaluation',
    ],
  },
  architecture: `React Frontend
│
├── REST API & WebSocket Communication
│
└── NestJS Backend
    ├── MongoDB
    ├── RabbitMQ
    ├── Redis Cache
    ├── Docker Judge
    ├── FastAPI AI
    └── Google Gemini`,
  techStack: {
    frontend: ['React', 'Tailwind CSS', 'Monaco Editor', 'Excalidraw'],
    backend: ['NestJS', 'FastAPI', 'REST APIs', 'WebSockets'],
    ai: ['Google Gemini', 'FastAPI', 'Text-to-Speech'],
    database: ['MongoDB', 'Redis'],
    infrastructure: ['Docker', 'RabbitMQ', 'BullMQ'],
  },
  role: [
    'Designed the full platform architecture',
    'Developed scalable backend APIs with NestJS',
    'Built responsive React interfaces',
    'Implemented secure Docker sandbox code execution',
    'Integrated Google Gemini AI features',
    'Developed the Elo matchmaking system',
    'Built real-time coding duels and hackathons',
    'Created algorithm visualization modules',
    'Designed gamification and ranking systems',
    'Optimized application performance and scalability',
  ],
  challenges: [
    'Secure execution of untrusted user code',
    'Building a real-time multiplayer coding experience',
    'Integrating AI features with low response times',
    'Designing scalable job queues for code evaluation',
    'Maintaining fairness in competitive rankings',
    'Supporting multiple programming languages',
  ],
  results: [
    'Unified coding and learning ecosystem',
    'Secure isolated code execution',
    'AI-assisted programming experience',
    'Real-time collaborative competitions',
    'Enterprise-ready recruitment tools',
    'Highly scalable microservice architecture',
  ],
  images: [
    { src: img1, alt: 'ByteBattle Homepage', label: 'Homepage' },
    { src: img2, alt: 'ByteBattle Coding Challenge', label: 'Coding Challenge' },
    { src: img3, alt: 'ByteBattle Code Editor', label: 'Code Editor' },
    { src: img4, alt: 'ByteBattle Real-time Duel', label: 'Real-time Duel' },
    { src: img5, alt: 'ByteBattle Leaderboard', label: 'Leaderboard' },
    { src: img6, alt: 'ByteBattle Hackathon', label: 'Hackathon' },
    { src: img7, alt: 'ByteBattle AI Coach', label: 'AI Coach' },
  ],
  videos: [],
  files: [],
  fr: {
    title: 'ByteBattle',
    subtitle: 'Application Web',
    description: 'Plateforme de programmation compétitive alimentée par l\'IA, proposant des duels de codage en temps réel, une exécution sécurisée de code, des hackathons, des défis collaboratifs et des outils de recrutement d\'entreprise.',
    overview: '**ByteBattle** est une plateforme de programmation compétitive nouvelle génération qui combine défis de codage, apprentissage assisté par IA, compétitions en temps réel et résolution collaborative de problèmes dans un seul écosystème.\n\nContrairement aux plateformes de codage traditionnelles, ByteBattle intègre l\'exécution sécurisée de code, la visualisation d\'algorithmes, les duels en direct, les hackathons, le coaching IA et les outils de recrutement d\'entreprise, créant ainsi une expérience engageante pour les étudiants, développeurs, éducateurs et recruteurs.',
    features: {
      web: [
        'Défis de programmation multilingues',
        'Éditeur de code Monaco',
        'Exécution sécurisée de code via Docker',
        'Cas de test cachés',
        'Métriques de performance',
        'Soumissions de code',
      ],
      desktop: [
        'Duels de codage en temps réel',
        'Système de classement Elo',
        'Hackathons de style ICPC',
        'Compétitions par équipe',
        'Classements en direct',
      ],
      ai: [
        'Indices générés par IA',
        'Révisions de code automatisées',
        'Entretiens techniques simulés',
        'Assistance Text-to-Speech',
        'Génération de défis par IA',
      ],
      learning: [
        'Visualiseur d\'algorithmes interactif',
        'Animations pas à pas',
        'Suivi de la progression',
        'Parcours d\'apprentissage',
      ],
      gamification: [
        'Système XP',
        'Niveaux',
        'Badges',
        'Skin déblocables',
        'Succès',
        'Classements',
      ],
      enterprise: [
        'Défis de codage privés',
        'Évaluations techniques',
        'Processus de recrutement',
        'Évaluation des candidats',
      ],
    },
    architecture: 'Frontend React\n│\n├── Communication API REST & WebSocket\n│\n└── Backend NestJS\n    ├── MongoDB\n    ├── RabbitMQ\n    ├── Cache Redis\n    ├── Docker Judge\n    ├── FastAPI IA\n    └── Google Gemini',
    techStack: {
      frontend: ['React', 'Tailwind CSS', 'Monaco Editor', 'Excalidraw'],
      backend: ['NestJS', 'FastAPI', 'API REST', 'WebSockets'],
      ai: ['Google Gemini', 'FastAPI', 'Text-to-Speech'],
      database: ['MongoDB', 'Redis'],
      infrastructure: ['Docker', 'RabbitMQ', 'BullMQ'],
    },
    role: [
      'Conçu l\'architecture complète de la plateforme',
      'Développé des API backend évolutives avec NestJS',
      'Construit des interfaces React réactives',
      'Implémenté l\'exécution sécurisée de code dans un sandbox Docker',
      'Intégré les fonctionnalités IA de Google Gemini',
      'Développé le système de matchmaking Elo',
      'Construit les duels de codage en temps réel et les hackathons',
      'Créé des modules de visualisation d\'algorithmes',
      'Conçu les systèmes de gamification et de classement',
      'Optimisé les performances et l\'évolutivité de l\'application',
    ],
    challenges: [
      'Exécution sécurisée de code utilisateur non fiable',
      'Construction d\'une expérience de codage multijoueur en temps réel',
      'Intégration de fonctionnalités IA avec des temps de réponse faibles',
      'Conception de files d\'attente de tâches évolutives pour l\'évaluation du code',
      'Maintien de l\'équité dans les classements compétitifs',
      'Prise en charge de plusieurs langages de programmation',
    ],
    results: [
      'Écosystème de codage et d\'apprentissage unifié',
      'Exécution de code isolée et sécurisée',
      'Expérience de programmation assistée par IA',
      'Compétitions collaboratives en temps réel',
      'Outils de recrutement prêts pour l\'entreprise',
      'Architecture de microservices hautement évolutive',
    ],
  },
};
export default meta;
