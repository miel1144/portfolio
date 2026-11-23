// Toda la información del portafolio vive aquí. El CV en PDF se genera aparte
// con scripts/cv/build_cv.py: si cambias algo, actualiza ambos.

import { INICIO_DISEÑO, INICIO_PROGRAMACION, INICIO_WEB, añosDesde, tiempoDesde } from './tiempo'

const programacion = tiempoDesde(INICIO_PROGRAMACION.año, INICIO_PROGRAMACION.mes)

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
    `Soy desarrolladora full stack con ${programacion} de formación en programación y ${añosDesde(INICIO_DISEÑO)} como diseñadora gráfica freelance. Esa mezcla me hace cuidar tanto la lógica de un sistema como la forma en que alguien lo usa.`,
    'Me gusta entender cómo fluye todo: los datos, los procesos, las personas. He construido un agente de IA para viñedos, monitoreo de energía en tiempo real y apps móviles que funcionan sin internet.',
  ],
  highlights: [
    { value: tiempoDesde(INICIO_PROGRAMACION.año, INICIO_PROGRAMACION.mes, true), label: 'formación en programación' },
    { value: añosDesde(INICIO_DISEÑO), label: 'diseño gráfico freelance' },
    { value: añosDesde(INICIO_WEB), label: 'desarrollo web freelance' },
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
    period: `${INICIO_WEB} – Presente`,
    points: [
      'Pinturas López (ferretería): sitio con catálogo de productos en Django y PostgreSQL, imágenes en Cloudinary y exportación a Excel.',
    ],
  },
  {
    company: 'Freelance',
    role: 'Diseñadora gráfica',
    period: `${INICIO_DISEÑO} – Presente`,
    points: ['Identidad visual, logotipos e ilustración para clientes y para mis propios productos con Photoshop e Illustrator.'],
  },
]

/** Una ruta suelta es una imagen; el objeto permite video y una etiqueta como "Versión móvil". */
export type MediaItem = string | { src: string; kind?: 'image' | 'video'; caption?: string; poster?: string }

export type Project = {
  name: string
  kind: string
  summary: string
  impact: string
  stack: string[]
  image?: string
  /** 'contain' para logos: se muestran completos sobre fondo oscuro en vez de recortarse */
  imageFit?: 'cover' | 'contain'
  /** capturas o videos que se ven en grande al hacer clic en la imagen (la primera suele ser `image`) */
  gallery?: MediaItem[]
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
    gallery: ['projects/cosechia-cap1.png', 'projects/cosechia-cap2.png'],
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
    gallery: [1, 2, 3, 4].map((n) => `projects/monse-cap${n}.png`),
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
    gallery: ['projects/tonalli-cap1.png', ...[2, 3, 4, 5].map((n) => `projects/tonalli-cap${n}.jpeg`)],
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
  {
    name: 'ANGL · GestoLab · AdminLab',
    kind: 'Full stack · Web + móvil · UTT',
    summary:
      'Gestión de los laboratorios de la UTT: registro de asistencia, reportes de incidencias y reportes en PDF, con backend Django, panel web y app móvil en Flutter con geolocalización.',
    impact: 'Versión web y móvil · 3 roles de usuario · reportes en PDF',
    stack: ['Django', 'Flutter', 'PostgreSQL', 'xhtml2pdf'],
    image: 'projects/gestolab-cap1.png',
    gallery: [
      { src: 'projects/gestolab-movil.mp4', kind: 'video', poster: 'projects/gestolab-movil-poster.jpg', caption: 'Versión móvil · Flutter' },
      ...[1, 2, 3, 4, 5].map((n) => ({ src: `projects/gestolab-cap${n}.png`, caption: 'Versión web · Django' })),
    ],
    links: [],
  },
  {
    name: 'Tijuana Accesible (TJRoute)',
    kind: 'App móvil · Hackathon Fox Coding 2026',
    summary:
      'Reporta problemas de accesibilidad urbana con una foto: Gemini AI clasifica el reporte y lo coloca en un mapa interactivo de la ciudad.',
    impact: 'Construida en un hackathon · IA para clasificar reportes',
    stack: ['Flutter', 'Firebase', 'Gemini AI', 'flutter_map'],
    image: 'projects/tj-route-logo.png',
    imageFit: 'contain',
    links: [
      { label: 'Devpost', url: 'https://devpost.com/software/tjroute' },
      { label: 'Video demo', url: 'https://www.youtube.com/shorts/Z_hChKxZGI8' },
      { label: 'Código', url: 'https://github.com/miel1144/hackapromt' },
    ],
  },
  {
    name: 'note-think',
    kind: 'App móvil · En desarrollo',
    summary:
      'App de notas local-first con estilo neumórfico: editor enriquecido, búsqueda full-text local, papelera recuperable, bloqueo con biometría, recordatorios y exportación a PDF.',
    impact: 'Local-first · sin depender de internet',
    stack: ['Flutter', 'Riverpod', 'go_router', 'Isar'],
    links: [{ label: 'Código', url: 'https://github.com/miel1144/note-think' }],
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
  status: `En curso · ${programacion} de formación`,
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
