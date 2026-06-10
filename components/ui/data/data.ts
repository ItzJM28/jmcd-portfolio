export const audienceMenus = [
  {
    value: 'frontend',
    label: 'Front-End Development',
    hint: 'Modern and responsive user interfaces.',
    title: 'Build engaging web experiences with modern frameworks',
    description:
      'Develop responsive and user-friendly web applications using React, Next.js, Vue.js, Angular, and TypeScript. Focused on creating reusable components and seamless user experiences.',
    links: [
      {
        href: '#',
        title: 'React & Next.js',
        description: 'Build modern, fast, and scalable applications using the React ecosystem.',
      },
      {
        href: '#',
        title: 'Component Development',
        description: 'Create reusable and maintainable UI components for long-term scalability.',
      },
    ],
  },
  {
    value: 'webapps',
    label: 'Web Applications',
    hint: 'From idea to deployment.',
    title: 'Develop and maintain modern web applications',
    description:
      'Build scalable web applications while ensuring performance, maintainability, and smooth integration with backend services.',
    links: [
      {
        href: '#',
        title: 'Application Development',
        description: 'Develop feature-rich web applications tailored to business requirements.',
      },
      {
        href: '#',
        title: 'Scalable Solutions',
        description: 'Create applications designed for growth, reliability, and long-term support.',
      },
      {
        href: '#',
        title: 'System Integration',
        description: 'Connect frontend interfaces with backend services and external platforms.',
      },
    ],
  },
  {
    value: 'uiux',
    label: 'Responsive UI/UX',
    hint: 'Designs that work on every device.',
    title: 'Create intuitive and accessible user experiences',
    description:
      'Transform concepts and designs into responsive, accessible, and visually appealing interfaces that prioritize usability and consistency.',
    links: [
      {
        href: '#',
        title: 'Responsive Design',
        description: 'Ensure websites provide a seamless experience across all screen sizes.',
      },
      {
        href: '#',
        title: 'User Experience',
        description: 'Improve usability and accessibility through thoughtful interface design.',
      },
      {
        href: '#',
        title: 'Modern Interfaces',
        description: 'Build clean, professional layouts using modern frontend technologies.',
      },
    ],
  },
  {
    value: 'api',
    label: 'API Integration',
    hint: 'Connect applications and services.',
    title: 'Integrate frontend applications with backend systems',
    description:
      'Work with REST APIs to handle data communication, authentication, and seamless integration between applications and external services.',
    links: [
      {
        href: '#',
        title: 'REST API Integration',
        description: 'Connect applications with backend services and third-party platforms.',
      },
      {
        href: '#',
        title: 'Data Management',
        description: 'Handle data fetching, updates, and synchronization efficiently.',
      },
      {
        href: '#',
        title: 'Authentication Flows',
        description: 'Implement secure login and user access workflows.',
      },
    ],
  },
  {
    value: 'maintenance',
    label: 'Maintenance & Support',
    hint: 'Keep applications reliable.',
    title: 'Improve stability through continuous maintenance',
    description:
      'Debug, troubleshoot, and maintain applications to ensure reliability, performance, and long-term stability across projects.',
    links: [
      {
        href: '#',
        title: 'Bug Fixes',
        description: 'Identify and resolve issues to improve application reliability.',
      },
      {
        href: '#',
        title: 'Performance Improvements',
        description: 'Optimize applications to provide smoother user experiences.',
      },
      {
        href: '#',
        title: 'Ongoing Support',
        description: 'Maintain and update applications to meet evolving requirements.',
      },
    ],
  },
  {
    value: 'agile',
    label: 'Agile Development',
    hint: 'Collaborative and efficient workflows.',
    title: 'Deliver quality solutions through Agile practices',
    description:
      'Work within Agile teams using Scrum methodologies, contributing to sprint planning, feature delivery, and continuous improvement processes.',
    links: [
      {
        href: '#',
        title: 'Sprint Planning',
        description: 'Collaborate on planning, estimation, and task prioritization.',
      },
      {
        href: '#',
        title: 'Team Collaboration',
        description: 'Work effectively with developers, designers, and stakeholders.',
      },
      {
        href: '#',
        title: 'Continuous Delivery',
        description: 'Support iterative development and frequent feature releases.',
      },
    ],
  },
] as const;

export const guidesPanel = {
  title: 'Where teams usually start',
  description:
    'These are the docs people reach for first when they are turning a prototype into shared UI.',
} as const;

export const guideLinks = [
  {
    href: '/react/overview/accessibility',
    title: 'Accessibility handbook',
    description: 'Take a practical pass over focus order, semantics, and keyboard support.',
  },
  {
    href: '/react/handbook/composition',
    title: 'Composition handbook',
    description: 'Learn when to wrap parts, share behavior, and expose flexible APIs.',
  },
  {
    href: '/react/handbook/styling',
    title: 'Styling handbook',
    description: 'Apply tokens and state styles without fighting the underlying markup.',
  },
] as const;
