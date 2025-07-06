import { Language } from '@/context/LanguageContext';

export const translations = {
  fr: {
    // Header
    nav: {
      home: 'Accueil',
      services: 'Services',
      projects: 'Réalisations',
      guarantees: 'Garanties',
      contact: 'Contact',
    },
    
    // Hero Section
    hero: {
      title: 'Architecte',
      subtitle: 'numérique',
      rotatingWords: {
        0: 'Solutions web pensées et réalisées avec soin',
        1: 'Applications modernes adaptées aux besoins réels',
        2: 'Créations numériques fonctionnelles et élégantes',
      },
      cta: 'Découvrir',
    },
    
    // Services Section
    services: {
      title: 'Domaines d\'Expertise',
      subtitle: 'Du site vitrine simple à l\'application web complexe, chaque projet est développé avec attention.',
      expandAll: 'Afficher tous les détails',
      collapseAll: 'Masquer les détails',
      services: [
        {
          title: 'Présences Digitales',
          description: 'Sites web efficaces pour présenter une activité, des services ou des produits. Du site vitrine simple au portail plus élaboré.',
          extendedDescription: [
            'Design adapté à l\'identité de chaque projet',
            'Optimisation pour les moteurs de recherche',
            'Intégration avec les réseaux sociaux',
            'Formulaires de contact et fonctionnalités pratiques',
            'Navigation claire et adaptée à tous les écrans',
          ],
        },
        {
          title: 'Systèmes Interactifs',
          description: 'Applications web sur mesure pour répondre à des besoins spécifiques. Solutions pensées pour simplifier et organiser.',
          extendedDescription: [
            'Développement avec des technologies éprouvées',
            'Interfaces utilisateur claires et fonctionnelles',
            'Sécurité et protection des données',
            'Gestion et visualisation de données',
            'Intégrations avec les outils existants',
          ],
        },
        {
          title: 'Écosystèmes Commerciaux',
          description: 'Boutiques en ligne fonctionnelles pour vendre efficacement. De la vitrine produit simple à la plateforme de vente complète.',
          extendedDescription: [
            'Solutions e-commerce adaptées à la taille du projet',
            'Gestion intuitive des produits et commandes',
            'Systèmes de paiement fiables et sécurisés',
            'Parcours d\'achat optimisé et clair',
            'Connexion avec les outils de gestion',
          ],
        },
      ],
    },
    
    // Projects Section
    projects: {
      title: 'Créations Sélectionnées',
      subtitle: 'Quelques projets réalisés, du simple au plus élaboré.',
      loading: 'Chargement du site...',
      visitSite: 'Visiter le site',
      projects: [
        {
          title: 'Sanctuaire Sonore',
          description: 'Site vitrine pour un studio d\'enregistrement. Présentation claire des services, galerie de réalisations et prise de contact simplifiée.',
          category: 'Site Vitrine',
        },
        {
          title: 'Essence Artisanale',
          description: 'Vitrine web pour une boulangerie traditionnelle. Mise en valeur des produits artisanaux et des informations pratiques pour les clients.',
          category: 'Site Vitrine',
        },
        {
          title: 'Manifeste Créatif',
          description: 'Portfolio personnel moderne avec animations fluides. Présentation structurée des projets et compétences dans une interface épurée.',
          category: 'Portfolio',
        },
      ],
    },
    
    // Guarantees Section
    guarantees: {
      title: 'Signature Distinctive',
      subtitle: 'Une approche réfléchie où technique et créativité s\'allient pour créer des solutions efficaces.',
      philosophy: 'Philosophie',
      philosophyText: 'Chaque projet est développé avec soin et méthodologie, dans le respect des délais et budgets convenus. L\'objectif : créer des solutions qui répondent aux besoins réels.',
      cta: 'Initier le Dialogue',
      pricing: {
        title: 'Projets Web,',
        subtitle: 'Solutions Concrètes',
        description: 'Chaque projet étant unique, le tarif est adapté selon les besoins et la complexité',
        features: [
          'Design responsive et accessible',
          'Optimisation technique et SEO',
          'Interface claire et fonctionnelle',
          'Support et maintenance inclus',
        ],
        from: 'À partir de',
        amount: 'Sur Devis',
        contact: 'Demande de Devis',
      },
      counters: [
        {
          title: 'D\'Expérience',
          description: 'Expertise développée dans le développement web moderne et les technologies récentes.',
          suffix: ' ans',
        },
        {
          title: 'Projets Livrés',
          description: 'Sites web et applications développés avec attention aux détails et à la qualité.',
          suffix: '+',
        },
        {
          title: 'Délai de Réponse',
          description: 'Réponse assurée dans les meilleurs délais pour chaque demande d\'information.',
          suffix: 'h',
        },
      ],
    },
    
    // Footer
    footer: {
      about: 'À propos',
      aboutText: 'Développement web sur mesure alliant technique et créativité. Du site vitrine simple à l\'application complexe.',
      navigation: 'Navigation',
      contact: 'Contact',
      location: 'Grenoble, France',
      email: 'contact@anthracite.app',
      phone: '+33 6 31 15 67 84',
      copyright: 'Anthracite Applications. Tous droits réservés.',
    },
    
    // Contact Page
    contactPage: {
      title: 'Établir la Connexion',
      subtitle: 'Parlons ensemble de ce que pourrait être une solution web adaptée à vos besoins.',
      channels: {
        title: 'Canaux de Communication',
        email: 'Email',
        phone: 'Téléphone',
        location: 'Adresse',
      },
      approach: {
        title: 'Approche Personnalisée',
        description: 'Chaque projet est unique, valorisé selon sa complexité et son potentiel',
      },
      form: {
        title: 'Initier l\'Échange',
        name: 'Nom',
        email: 'Email',
        phone: 'Téléphone (optionnel)',
        subject: 'Sujet',
        message: 'Message',
        submit: 'Envoyer le Message',
        sending: 'Envoi en cours...',
      },
      responseTime: 'Chaque message reçoit une attention particulière, réponse assurée sous 48h.',
    },
    
    // Contact Form
    contactForm: {
      validation: {
        nameRequired: 'Le nom est requis',
        emailRequired: 'L\'email est requis',
        emailInvalid: 'Format d\'email invalide',
        messageRequired: 'Le message est requis',
      },
      success: {
        title: 'Message transmis !',
        message: 'Votre message a été reçu avec attention. Une réponse personnalisée sera transmise dans les meilleurs délais.',
        sendAnother: 'Envoyer un autre message',
      },
      subjects: [
        { value: 'site-vitrine', label: 'Site vitrine' },
        { value: 'application-web', label: 'Application web' },
        { value: 'e-commerce', label: 'E-commerce' },
        { value: 'optimisation', label: 'Optimisation' },
        { value: 'autre', label: 'Autre' },
      ],
      placeholders: {
        name: 'Votre nom',
        email: 'votre@email.com',
        phone: '+33 6 00 00 00 00',
        subject: 'Choisissez un sujet',
        message: 'Décrivez votre projet ou votre besoin...',
      },
    },
  },
  
  en: {
    // Header
    nav: {
      home: 'Home',
      services: 'Services',
      projects: 'Work',
      guarantees: 'Guarantees',
      contact: 'Contact',
    },
    
    // Hero Section
    hero: {
      title: 'Digital',
      subtitle: 'Architect',
      rotatingWords: {
        0: 'Thoughtfully crafted web solutions',
        1: 'Modern applications tailored to real needs',
        2: 'Functional and elegant digital creations',
      },
      cta: 'Discover',
    },
    
    // Services Section
    services: {
      title: 'Expertise Domains',
      subtitle: 'From simple showcase sites to complex web applications, each project is developed with attention.',
      expandAll: 'Show All Details',
      collapseAll: 'Hide Details',
      services: [
        {
          title: 'Digital Presences',
          description: 'Effective websites to present an activity, services or products. From simple showcase sites to more elaborate portals.',
          extendedDescription: [
            'Design adapted to each project\'s identity',
            'Search engine optimization',
            'Social media integration',
            'Contact forms and practical features',
            'Clear navigation adapted to all screens',
          ],
        },
        {
          title: 'Interactive Systems',
          description: 'Custom web applications to meet specific needs. Solutions designed to simplify and organize.',
          extendedDescription: [
            'Development with proven technologies',
            'Clear and functional user interfaces',
            'Security and data protection',
            'Data management and visualization',
            'Integrations with existing tools',
          ],
        },
        {
          title: 'Commercial Ecosystems',
          description: 'Functional online stores to sell effectively. From simple product showcases to complete sales platforms.',
          extendedDescription: [
            'E-commerce solutions adapted to project size',
            'Intuitive product and order management',
            'Reliable and secure payment systems',
            'Optimized and clear purchase journey',
            'Connection with management tools',
          ],
        },
      ],
    },
    
    // Projects Section
    projects: {
      title: 'Selected Creations',
      subtitle: 'Some completed projects, from simple to more elaborate.',
      loading: 'Loading site...',
      visitSite: 'Visit Site',
      projects: [
        {
          title: 'Sound Sanctuary',
          description: 'Showcase website for a recording studio. Clear service presentation, portfolio gallery and simplified contact.',
          category: 'Showcase Site',
        },
        {
          title: 'Artisan Essence',
          description: 'Web showcase for a traditional bakery. Highlighting artisan products and practical information for customers.',
          category: 'Showcase Site',
        },
        {
          title: 'Creative Manifesto',
          description: 'Modern personal portfolio with smooth animations. Structured presentation of projects and skills in a clean interface.',
          category: 'Portfolio',
        },
      ],
    },
    
    // Guarantees Section
    guarantees: {
      title: 'Distinctive Signature',
      subtitle: 'A thoughtful approach where technique and creativity combine to create effective solutions.',
      philosophy: 'Philosophy',
      philosophyText: 'Each project is developed with care and methodology, respecting agreed deadlines and budgets. The goal: create solutions that meet real needs.',
      cta: 'Initiate Dialogue',
      pricing: {
        title: 'Web Projects,',
        subtitle: 'Concrete Solutions',
        description: 'Each project being unique, pricing is adapted according to needs and complexity',
        features: [
          'Responsive and accessible design',
          'Technical optimization and SEO',
          'Clear and functional interface',
          'Support and maintenance included',
        ],
        from: 'From',
        amount: 'On Quote',
        contact: 'Request Quote',
      },
      counters: [
        {
          title: 'Experience',
          description: 'Expertise developed in modern web development and recent technologies.',
          suffix: ' years',
        },
        {
          title: 'Delivered Projects',
          description: 'Websites and applications developed with attention to detail and quality.',
          suffix: '+',
        },
        {
          title: 'Response Time',
          description: 'Guaranteed response within the best timeframes for each information request.',
          suffix: 'h',
        },
      ],
    },
    
    // Footer
    footer: {
      about: 'About',
      aboutText: 'Custom web development combining technique and creativity. From simple showcase sites to complex applications.',
      navigation: 'Navigation',
      contact: 'Contact',
      location: 'Grenoble, France',
      email: 'contact@anthracite.app',
      phone: '+33 6 31 15 67 84',
      copyright: 'Anthracite Applications. All rights reserved.',
    },
    
    // Contact Page
    contactPage: {
      title: 'Establish Connection',
      subtitle: 'Let\'s talk about what a web solution adapted to your needs could be.',
      channels: {
        title: 'Communication Channels',
        email: 'Email',
        phone: 'Phone',
        location: 'Address',
      },
      approach: {
        title: 'Personalized Approach',
        description: 'Each project is unique, valued according to its complexity and potential',
      },
      form: {
        title: 'Start the Exchange',
        name: 'Name',
        email: 'Email',
        phone: 'Phone (optional)',
        subject: 'Subject',
        message: 'Message',
        submit: 'Send Message',
        sending: 'Sending...',
      },
      responseTime: 'Each message receives special attention, response guaranteed within 48h.',
    },
    
    // Contact Form
    contactForm: {
      validation: {
        nameRequired: 'Name is required',
        emailRequired: 'Email is required',
        emailInvalid: 'Invalid email format',
        messageRequired: 'Message is required',
      },
      success: {
        title: 'Message Sent!',
        message: 'Your message has been received with attention. A personalized response will be sent as soon as possible.',
        sendAnother: 'Send Another Message',
      },
      subjects: [
        { value: 'site-vitrine', label: 'Showcase Site' },
        { value: 'application-web', label: 'Web Application' },
        { value: 'e-commerce', label: 'E-commerce' },
        { value: 'optimisation', label: 'Optimization' },
        { value: 'autre', label: 'Other' },
      ],
      placeholders: {
        name: 'Your name',
        email: 'your@email.com',
        phone: '+33 6 00 00 00 00',
        subject: 'Choose a subject',
        message: 'Describe your project or need...',
      },
    },
  },
};

export const getTranslation = (language: Language, key: string): string => {
  const keys = key.split('.');
  let value: any = translations[language];
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return key; // Return the key if translation not found
    }
  }
  
  return typeof value === 'string' ? value : key;
}; 