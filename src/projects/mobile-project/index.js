import img1 from '../../images/eshop/eshop.png';
import img2 from '../../images/eshop/eshop2.png';
import img3 from '../../images/eshop/eshop3.png';
import img4 from '../../images/eshop/eshop4.png';
import img5 from '../../images/eshop/eshop8.png';

const meta = {
  title: 'eShop',
  slug: 'eshop',
  category: 'Web Apps',
  subtitle: 'Web Application',
  icon: '🛒',
  description: 'Modern e-commerce platform built with React and Django REST Framework, featuring secure authentication, product management, and responsive shopping experiences.',
  tags: ['React', 'Django REST', 'MySQL'],
  overview: `**eShop** is a full-stack e-commerce platform developed as my **Final Year Internship Project**. The application provides a modern online shopping experience with a responsive React frontend and a powerful Django REST Framework backend.

The platform enables customers to browse products, manage their shopping cart, and place orders securely, while administrators can efficiently manage products, categories, inventory, and customer orders through a dedicated administration interface.`,
  features: {
    web: [
      'Secure user authentication',
      'Product catalog',
      'Product search and filtering',
      'Shopping cart',
      'Wishlist',
      'Order placement',
      'Order history',
      'User profile management',
      'Responsive design',
    ],
    desktop: [
      'Product management',
      'Category management',
      'Inventory management',
      'Order management',
      'Customer management',
      'Dashboard',
      'Image upload',
      'REST API management',
    ],
  },
  architecture: `React Frontend
│
├── REST API (JSON)
│
└── Django REST Framework Backend
    │
    └── MySQL`,
  techStack: {
    frontend: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'Bootstrap'],
    backend: ['Django', 'Django REST Framework', 'JWT Authentication'],
    database: ['MySQL'],
    tools: ['Git', 'Postman', 'VS Code', 'Figma'],
  },
  role: [
    'Designed and developed the React frontend',
    'Built RESTful APIs using Django REST Framework',
    'Designed the relational database',
    'Implemented JWT authentication and user authorization',
    'Integrated frontend with backend APIs',
    'Developed CRUD operations for products, categories, and orders',
    'Tested and optimized application performance',
  ],
  challenges: [
    'Designing scalable REST APIs',
    'Managing authentication and authorization',
    'Synchronizing frontend state with backend APIs',
    'Optimizing database queries',
    'Creating a smooth user shopping experience',
  ],
  results: [
    'Complete full-stack e-commerce platform',
    'Clean separation between frontend and backend',
    'Responsive design across devices',
    'Secure authentication system',
    'Modular and maintainable codebase',
    'Production-ready REST API architecture',
  ],
  images: [
    { src: img1, alt: 'eShop Homepage', label: 'Homepage' },
    { src: img2, alt: 'eShop Product Catalog', label: 'Product Catalog' },
    { src: img3, alt: 'eShop Shopping Cart', label: 'Shopping Cart' },
    { src: img4, alt: 'eShop Admin Dashboard', label: 'Admin Dashboard' },
    { src: img5, alt: 'eShop Order Management', label: 'Order Management' },
  ],
  videos: [],
  files: [],
  fr: {
    title: 'eShop',
    subtitle: 'Application Web',
    description: 'Plateforme e-commerce moderne construite avec React et Django REST Framework, offrant une authentification sécurisée, la gestion des produits et une expérience d\'achat réactive.',
    overview: '**eShop** est une plateforme e-commerce full-stack développée dans le cadre de mon **Projet de Stage de Fin d\'Études**. L\'application offre une expérience d\'achat en ligne moderne avec un frontend React réactif et un puissant backend Django REST Framework.\n\nLa plateforme permet aux clients de parcourir les produits, gérer leur panier et passer des commandes en toute sécurité, tandis que les administrateurs peuvent gérer efficacement les produits, les catégories, les stocks et les commandes clients via une interface d\'administration dédiée.',
    features: {
      web: [
        'Authentification sécurisée des utilisateurs',
        'Catalogue de produits',
        'Recherche et filtrage de produits',
        'Panier d\'achat',
        'Liste de souhaits',
        'Passation de commandes',
        'Historique des commandes',
        'Gestion du profil utilisateur',
        'Design réactif',
      ],
      desktop: [
        'Gestion des produits',
        'Gestion des catégories',
        'Gestion des stocks',
        'Gestion des commandes',
        'Gestion des clients',
        'Tableau de bord',
        'Téléchargement d\'images',
        'Gestion de l\'API REST',
      ],
    },
    architecture: 'Frontend React\n│\n├── API REST (JSON)\n│\n└── Backend Django REST Framework\n    │\n    └── MySQL',
    techStack: {
      frontend: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'Bootstrap'],
      backend: ['Django', 'Django REST Framework', 'JWT Authentication'],
      database: ['MySQL'],
      tools: ['Git', 'Postman', 'VS Code', 'Figma'],
    },
    role: [
      'Conçu et développé le frontend React',
      'Construit les API REST avec Django REST Framework',
      'Conçu la base de données relationnelle',
      'Implémenté l\'authentification JWT et l\'autorisation des utilisateurs',
      'Intégré le frontend avec les API backend',
      'Développé les opérations CRUD pour les produits, catégories et commandes',
      'Testé et optimisé les performances de l\'application',
    ],
    challenges: [
      'Conception d\'API REST évolutives',
      'Gestion de l\'authentification et de l\'autorisation',
      'Synchronisation de l\'état du frontend avec les API backend',
      'Optimisation des requêtes de base de données',
      'Création d\'une expérience d\'achat utilisateur fluide',
    ],
    results: [
      'Plateforme e-commerce full-stack complète',
      'Séparation nette entre le frontend et le backend',
      'Design réactif sur tous les appareils',
      'Système d\'authentification sécurisé',
      'Codebase modulaire et maintenable',
      'Architecture API REST prête pour la production',
    ],
  },
};
export default meta;
