// Toda la información del portafolio vive aquí. El CV en PDF se genera aparte
// con scripts/cv/build_cv.py: si cambias algo, actualiza ambos.

export const profile = {
  name: 'Imelda Almanza',
  nickname: 'miel',
  role: 'Junior Full Stack Developer',
  tagline: 'Es divertido pensar en la logística de las cosas.',
  location: 'Tijuana, B.C.',
  languages: ['Español · nativo', 'Inglés · B2'],
  email: 'almanzaaimeelda@gmail.com',
  cv: 'cv/Imelda-Almanza-CV.pdf',
  links: {
    github: 'https://github.com/miel1144',
    linkedin: 'https://www.linkedin.com/in/imelda-almanza',
  },
  about: [
    'Soy desarrolladora full stack con 2 años 3 meses de formación en programación y 3 años como diseñadora gráfica freelance. Esa mezcla me hace cuidar tanto la lógica de un sistema como la forma en que alguien lo usa.',
    'Me gusta entender cómo fluye todo: los datos, los procesos, las personas. He construido un agente de IA para viñedos, monitoreo de energía en tiempo real y apps móviles que funcionan sin internet.',
  ],
  highlights: [
    { value: '2 años 3 m', label: 'formación en programación' },
    { value: '3 años', label: 'diseño gráfico freelance' },
    { value: '1 año', label: 'desarrollo web freelance' },
  ],
}

export const experience = [
  {
    company: 'Enteracloud',
    role: 'Desarrolladora Full Stack · Prácticas profesionales',
    period: 'Sep 2026 – Dic 2026',
    points: [
      'Desarrollé en equipo CosechIA, plataforma vitivinícola con Laravel 13, Vue 3, Inertia.js y PostgreSQL.',
      'Construí el agente de IA sin frameworks: loop de razonamiento con 20 herramientas (tool calling) validadas con JSON Schema y ejecutadas dentro de transacciones.',
      'Implementé RAG híbrido: embeddings en pgvector + BM25 combinados con Reciprocal Rank Fusion, con respuestas citadas.',
      'Diseñé memoria de corto y largo plazo, una guardia de dominio que filtra consultas antes del LLM y un monitor proactivo que genera alertas sin duplicados.',
      'Más de 100 archivos de pruebas automatizadas con Pest.',
    ],
  },
  {
    company: 'Freelance',
    role: 'Desarrolladora web',
    period: '2025 – Presente',
    points: [
      'Pinturas López (ferretería): sitio con catálogo de productos en Django y PostgreSQL, imágenes en Cloudinary y exportación a Excel.',
    ],
  },
  {
    company: 'Freelance',
    role: 'Diseñadora gráfica',
    period: '2023 – Presente',
    points: ['Identidad visual, logotipos e ilustración para clientes y para mis propios productos con Photoshop e Illustrator.'],
  },
]

export type Project = {
  name: string
  kind: string
  summary: string
  impact: string
  stack: string[]
  image?: string
  links: { label: string; url: string }[]
}

export const projects: Project[] = [
  {
    name: 'CosechIA',
    kind: 'Plataforma con IA · Enteracloud',
    summary:
      'Gestión vitivinícola: viñedos, ciclos, bitácoras y clima, con un agente conversacional que consulta y registra datos de campo y recomienda acciones.',
    impact: '1 agente de IA · 20 herramientas · RAG híbrido',
    stack: ['Laravel 13', 'Vue 3', 'Inertia.js', 'PostgreSQL', 'pgvector'],
    image: 'projects/cosechia-cap1.png',
    links: [],
  },
  {
    name: 'MONSE + MaquinaMonse',
    kind: 'Full stack · Tiempo real',
    summary:
      'Ecosistema de consumo energético: una API asíncrona simula medidores y MONSE recibe, diagnostica y visualiza las lecturas.',
    impact: '4 roles de usuario',
    stack: ['FastAPI', 'Django', 'DRF', 'PostgreSQL'],
    image: 'projects/monse-cap1.png',
    links: [{ label: 'API en GitHub', url: 'https://github.com/miel1144/maquinaMonse' }],
  },
  {
    name: 'Tonalli',
    kind: 'App móvil · Concurso UTT 2026',
    summary:
      'Auditoría eléctrica con el luxómetro del celular: predice la Tarifa DAC de CFE y dimensiona paneles solares. Funciona sin internet.',
    impact: 'Offline-first · sensores del dispositivo',
    stack: ['Flutter', 'Dart', 'SQLite'],
    image: 'projects/tonalli-cap1.png',
    links: [{ label: 'Sitio informativo', url: 'https://github.com/miel1144/tonalli_web' }],
  },
  {
    name: 'kchin',
    kind: 'PWA · Finanzas en grupo',
    summary:
      'Trazabilidad de préstamos, pagos y saldos entre personas. Nació como herramienta personal y está pensada para que grupos lleven sus finanzas compartidas.',
    impact: 'Instalable · responsive',
    stack: ['Django', 'HTMX', 'PWA'],
    links: [],
  },
]

export const skills = [
  { group: 'Lenguajes', items: ['Python', 'PHP', 'JavaScript', 'TypeScript', 'Java', 'Dart', 'SQL', 'HTML', 'CSS'] },
  { group: 'Frameworks', items: ['Django / DRF', 'FastAPI', 'Laravel', 'Vue 3', 'Inertia.js', 'Flutter', 'HTMX', 'Tailwind CSS'] },
  { group: 'Bases de datos', items: ['PostgreSQL', 'pgvector', 'MySQL', 'SQLite', 'Firebase', 'Supabase'] },
  { group: 'IA', items: ['Agentes con tool calling', 'RAG', 'Embeddings', 'Búsqueda híbrida'] },
  { group: 'Control de versiones', items: ['Git', 'GitHub', 'Ramas y pull requests', 'Resolución de conflictos', 'GitHub Actions'] },
  { group: 'Diseño y herramientas', items: ['Photoshop', 'Illustrator', 'Figma', 'Postman'] },
]

export const education = {
  school: 'Universidad Tecnológica de Tijuana',
  degree: 'Desarrollo de Software Multiplataforma',
  status: 'En curso · 2 años 3 meses de formación',
}

// Una flor por sección, de arriba hacia abajo en la rama.
export const sections = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'sobre-mi', label: 'Sobre mí' },
  { id: 'experiencia', label: 'Experiencia' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'habilidades', label: 'Habilidades' },
  { id: 'contacto', label: 'Contacto' },
] as const
