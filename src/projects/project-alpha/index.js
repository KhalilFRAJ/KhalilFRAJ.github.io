import img1 from '../../images/learnify/learnify1.jpg';
import img2 from '../../images/learnify/learnify2.jpg';
import img3 from '../../images/learnify/learnify3.jpg';
import img4 from '../../images/learnify/learnify4.jpg';

const meta = {
  title: 'Learnify',
  slug: 'learnify',
  category: 'Web Apps',
  subtitle: 'Web & Desktop Application',
  icon: '📚',
  description: 'Comprehensive e-learning platform combining a Symfony web application with a JavaFX desktop application for seamless educational management.',
  tags: ['Symfony', 'JavaFX', 'MySQL'],
  overview: `**Learnify** is a full-stack educational management platform developed as both a **Symfony web application** and a **JavaFX desktop application**. The system provides a complete solution for managing educational activities, allowing different users to interact through interfaces tailored to their needs.
  
The web application focuses on online accessibility and administrative management, while the desktop application delivers a responsive experience for users who require a dedicated desktop environment. Both applications share the same SQL database, ensuring consistent and synchronized data across the platform.`,
  features: {
    web: [
      'User authentication and authorization',
      'Student and instructor management',
      'Course management',
      'Dashboard and statistics',
      'Educational content management',
      'Profile management',
      'Database administration',
      'Responsive interface',
    ],
    desktop: [
      'Secure login system',
      'Course management',
      'Student management',
      'Event management',
      'Fast CRUD operations',
      'Local desktop experience',
      'Direct database connectivity',
      'Administrative tools',
    ],
  },
  architecture: `Learnify
│
├── Symfony Web Application
│   ├── Business Logic
│   └── Controllers & Views
│
├── Shared SQL Database
│   └── MySQL
│
└── JavaFX Desktop Application
    ├── Business Logic
    └── FXML Views`,
  techStack: {
    frontend: ['Twig', 'HTML5', 'CSS3', 'JavaFX'],
    backend: ['Symfony (PHP)', 'Java'],
    database: ['MySQL'],
    tools: ['Git', 'Composer', 'Maven', 'IntelliJ IDEA', 'PhpStorm / VS Code'],
  },
  role: [
    'Designed the database structure',
    'Developed backend services with Symfony',
    'Built the JavaFX desktop interface',
    'Implemented authentication and authorization',
    'Connected both applications to the same SQL database',
    'Developed CRUD operations for educational resources',
    'Tested and debugged both applications',
  ],
  challenges: [
    'Synchronizing the web and desktop applications with a shared database',
    'Maintaining consistent business logic across two platforms',
    'Designing an efficient relational database',
    'Managing user roles and permissions',
    'Creating responsive and intuitive interfaces',
  ],
  results: [
    'Unified educational management system',
    'Shared SQL database between web and desktop applications',
    'Clean and maintainable architecture',
    'Improved productivity through dedicated desktop tools',
    'Responsive web experience accessible from any browser',
  ],
  images: [
    { src: img1, alt: 'Learnify Web App Dashboard', label: 'Web Application Dashboard' },
    { src: img2, alt: 'Learnify Web App Course Management', label: 'Course Management' },
    { src: img3, alt: 'Learnify Desktop App Login', label: 'Desktop Login Screen' },
    { src: img4, alt: 'Learnify Desktop App Student Management', label: 'Student Management' },
  ],
  videos: [],
  files: [],
  fr: {
    title: 'Learnify',
    subtitle: 'Application Web & Desktop',
    description: 'Plateforme d\'apprentissage en ligne complète combinant une application web Symfony et une application desktop JavaFX pour une gestion éducative sans faille.',
    overview: '**Learnify** est une plateforme de gestion éducative full-stack développée à la fois comme **application web Symfony** et **application desktop JavaFX**. Le système offre une solution complète pour gérer les activités éducatives, permettant à différents utilisateurs d\'interagir via des interfaces adaptées à leurs besoins.\n\nL\'application web se concentre sur l\'accessibilité en ligne et la gestion administrative, tandis que l\'application desktop offre une expérience réactive pour les utilisateurs qui nécessitent un environnement de bureau dédié. Les deux applications partagent la même base de données SQL, garantissant des données cohérentes et synchronisées sur toute la plateforme.',
    features: {
      web: [
        'Authentification et autorisation des utilisateurs',
        'Gestion des étudiants et des instructeurs',
        'Gestion des cours',
        'Tableau de bord et statistiques',
        'Gestion du contenu éducatif',
        'Gestion des profils',
        'Administration de la base de données',
        'Interface réactive',
      ],
      desktop: [
        'Système de connexion sécurisé',
        'Gestion des cours',
        'Gestion des étudiants',
        'Gestion des événements',
        'Opérations CRUD rapides',
        'Expérience desktop locale',
        'Connexion directe à la base de données',
        'Outils d\'administration',
      ],
    },
    architecture: `Learnify
│
├── Application Web Symfony
│   ├── Logique métier
│   └── Contrôleurs & Vues
│
├── Base de données SQL partagée
│   └── MySQL
│
└── Application Desktop JavaFX
    ├── Logique métier
    └── Vues FXML`,
    techStack: {
      frontend: ['Twig', 'HTML5', 'CSS3', 'JavaFX'],
      backend: ['Symfony (PHP)', 'Java'],
      database: ['MySQL'],
      tools: ['Git', 'Composer', 'Maven', 'IntelliJ IDEA', 'PhpStorm / VS Code'],
    },
    role: [
      'Conçu la structure de la base de données',
      'Développé les services backend avec Symfony',
      'Construit l\'interface desktop JavaFX',
      'Implémenté l\'authentification et l\'autorisation',
      'Connecté les deux applications à la même base de données SQL',
      'Développé les opérations CRUD pour les ressources éducatives',
      'Testé et débogué les deux applications',
    ],
    challenges: [
      'Synchronisation des applications web et desktop avec une base de données partagée',
      'Maintien d\'une logique métier cohérente sur deux plateformes',
      'Conception d\'une base de données relationnelle efficace',
      'Gestion des rôles et des permissions des utilisateurs',
      'Création d\'interfaces réactives et intuitives',
    ],
    results: [
      'Système de gestion éducative unifié',
      'Base de données SQL partagée entre les applications web et desktop',
      'Architecture propre et maintenable',
      'Productivité améliorée grâce aux outils desktop dédiés',
      'Expérience web réactive accessible depuis n\'importe quel navigateur',
    ],
    images: [
      { src: img1, alt: 'Tableau de bord de l\'application web Learnify', label: 'Tableau de bord de l\'application web' },
      { src: img2, alt: 'Gestion des cours de l\'application web Learnify', label: 'Gestion des cours' },
      { src: img3, alt: 'Écran de connexion de l\'application desktop Learnify', label: 'Écran de connexion desktop' },
      { src: img4, alt: 'Gestion des étudiants de l\'application desktop Learnify', label: 'Gestion des étudiants' },
    ],
  },
};
export default meta;
