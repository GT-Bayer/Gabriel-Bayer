import type { Project } from '../types/portfolio';

// Project stacks, CareConnect's role and architecture, and Bayer Scan's
// workflow and scan modes were supplied by Gabriel. Real captures and their
// provenance are stored separately from system diagrams.
export const projects: Project[] = [
  {
    id: 'careconnect',
    number: '01',
    name: 'CareConnect',
    featured: true,
    category: { en: 'Care platform · Full stack', es: 'Plataforma de cuidados · Full stack' },
    status: { en: 'Live', es: 'Live' },
    title: { en: 'A clearer path to care.', es: 'Un camino más claro a la atención.' },
    description: {
      en: 'A care marketplace connecting families with trusted professionals. React on the frontend; a layered Java backend and MySQL underneath.',
      es: 'Un marketplace de cuidados que conecta familias con profesionales de confianza. React en el frontend; un backend Java por capas y MySQL detrás.',
    },
    scope: {
      en: 'Connect families with care professionals through a web marketplace.',
      es: 'Conectar familias con profesionales de cuidado mediante un marketplace web.',
    },
    approach: {
      en: 'A layered backend: REST Controllers → Service Layer → JPA Repositories → MySQL. Spring Security is part of the backend stack; Flyway manages database migrations. The React/Vite frontend communicates with the API through HTTP/JSON.',
      es: 'Un backend por capas: REST Controllers → Service Layer → JPA Repositories → MySQL. Spring Security forma parte del stack backend; Flyway gestiona las migraciones de base de datos. El frontend React/Vite se comunica con la API mediante HTTP/JSON.',
    },
    context: { en: 'Team project', es: 'Proyecto en equipo' },
    role: { en: 'Backend / Architecture / Database', es: 'Backend / Arquitectura / Base de datos' },
    stack: [
      { label: { en: 'Frontend', es: 'Frontend' }, technologies: ['React', 'Vite', 'React Router', 'Axios', 'Tailwind'] },
      { label: { en: 'Backend', es: 'Backend' }, technologies: ['Java 21', 'Spring Boot', 'Spring Security', 'JPA', 'MySQL', 'Flyway'] },
    ],
    repositories: [
      { label: { en: 'Frontend', es: 'Frontend' }, url: 'https://github.com/GT-Bayer/careconnect-frontend' },
      { label: { en: 'Backend', es: 'Backend' }, url: 'https://github.com/GT-Bayer/careconnect-backend' },
    ],
    demo: 'https://cc-frontend-gold.vercel.app/',
    preview: {
      src: 'projects/careconnect-app.jpg',
      alt: { en: 'Real CareConnect homepage showing its care marketplace connecting families with professionals.', es: 'Página de inicio real de CareConnect: marketplace de cuidados que conecta familias con profesionales.' },
      frame: 'browser',
      source: 'https://cc-frontend-gold.vercel.app/',
      caption: { en: 'Live application / Public homepage', es: 'Aplicación en vivo / Página de inicio pública' },
      width: 1265,
      height: 712,
    },
    diagram: {
      kind: 'system',
      label: { en: 'From interface to data.', es: 'De la interfaz a los datos.' },
      caption: { en: 'Request path / Layered architecture', es: 'Flujo de una petición / Arquitectura por capas' },
      steps: [
        { number: '01', label: { en: 'React / Vite', es: 'React / Vite' }, detail: { en: 'React Router · Axios · Tailwind', es: 'React Router · Axios · Tailwind' } },
        { number: '02', label: { en: 'HTTP / JSON', es: 'HTTP / JSON' }, detail: { en: 'Client–API communication', es: 'Comunicación cliente–API' } },
        { number: '03', label: { en: 'REST Controllers', es: 'REST Controllers' }, detail: { en: 'Java 21 · Spring Boot', es: 'Java 21 · Spring Boot' } },
        { number: '04', label: { en: 'Service Layer', es: 'Service Layer' }, detail: { en: 'Business logic', es: 'Lógica de negocio' } },
        { number: '05', label: { en: 'JPA Repositories', es: 'JPA Repositories' }, detail: { en: 'Persistence layer', es: 'Capa de persistencia' } },
        { number: '06', label: { en: 'MySQL / Flyway', es: 'MySQL / Flyway' }, detail: { en: 'Database / migrations', es: 'Base de datos / migraciones' } },
      ],
    },
  },
  {
    id: 'bayer-scan',
    number: '02',
    name: 'Bayer Scan',
    featured: false,
    category: { en: 'Reconnaissance · CLI tool', es: 'Reconocimiento · Herramienta CLI' },
    status: { en: 'Experimental / In Development', es: 'Experimental / En desarrollo' },
    title: { en: 'Learning beneath the surface.', es: 'Aprender debajo de la superficie.' },
    description: {
      en: 'Nmap scan presets, Rich terminal output and timestamped logs. A Python and Bash CLI for Linux, currently in development.',
      es: 'Modos de escaneo Nmap, salida de terminal con Rich y registros con fecha y hora. Una CLI de Python y Bash para Linux, en desarrollo.',
    },
    scope: {
      en: 'Four current scan modes: Fast Scan, Version Detection, Aggressive Scan and Host Discovery. Experimental / In Development.',
      es: 'Cuatro modos actuales: Fast Scan, Version Detection, Aggressive Scan y Host Discovery. Experimental / En desarrollo.',
    },
    approach: {
      en: 'Target → Scan Mode → Nmap → Python subprocess → Rich terminal output → Timestamped log. An experimental workflow for learning about scanning and Linux tooling.',
      es: 'Objetivo → Modo de escaneo → Nmap → Python subprocess → Salida de terminal con Rich → Registro con fecha y hora. Un flujo experimental para aprender sobre escaneo y herramientas de Linux.',
    },
    context: { en: 'Learning & experimentation', es: 'Aprendizaje y experimentación' },
    scanModes: ['Fast Scan', 'Version Detection', 'Aggressive Scan', 'Host Discovery'],
    stack: [{ technologies: ['Python', 'Bash', 'Nmap', 'Rich', 'Linux'] }],
    repositories: [{ label: { en: 'Repository', es: 'Repositorio' }, url: 'https://github.com/GT-Bayer/bayer-scan' }],
    preview: {
      src: 'projects/bayer-scan-terminal.png',
      alt: { en: 'Real Bayer Scan terminal capture showing four modes, a completed Nmap scan, Rich output and a timestamped log.', es: 'Captura real de Bayer Scan en terminal: cuatro modos, un escaneo Nmap finalizado, salida Rich y registro guardado con fecha y hora.' },
      frame: 'terminal',
      source: 'https://github.com/GT-Bayer/bayer-scan/blob/main/screenshots/screenshot1.png',
      caption: { en: 'Repository capture / Linux terminal', es: 'Captura del repositorio / Terminal Linux' },
      width: 899,
      height: 912,
    },
    diagram: {
      kind: 'workflow',
      label: { en: 'From target to log.', es: 'Del objetivo al registro.' },
      caption: { en: 'Scan workflow / Experimental · In Development', es: 'Flujo de escaneo / Experimental · En desarrollo' },
      steps: [
        { number: '01', label: { en: 'Target', es: 'Objetivo' }, detail: { en: 'Select the target', es: 'Seleccionar el objetivo' } },
        { number: '02', label: { en: 'Scan Mode', es: 'Modo de escaneo' }, detail: { en: 'Choose one of four modes', es: 'Elegir uno de los cuatro modos' } },
        { number: '03', label: { en: 'Nmap', es: 'Nmap' }, detail: { en: 'Scanning tool', es: 'Herramienta de escaneo' } },
        { number: '04', label: { en: 'Python subprocess', es: 'Python subprocess' }, detail: { en: 'Process execution', es: 'Ejecución de procesos' } },
        { number: '05', label: { en: 'Rich terminal output', es: 'Salida de terminal con Rich' }, detail: { en: 'Formatted terminal results', es: 'Resultados formateados en terminal' } },
        { number: '06', label: { en: 'Timestamped log', es: 'Registro con fecha y hora' }, detail: { en: 'Save the scan log', es: 'Guardar el registro del escaneo' } },
      ],
    },
  },
];
