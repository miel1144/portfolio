# Portfolio Personal

Portafolio personal construido con **Next.js 15 + TypeScript + Tailwind CSS + Framer Motion**, enfocado en una experiencia visual cuidada y animaciones fluidas.

## Stack

- **Next.js 16** (App Router + Turbopack)
- **TypeScript**
- **Tailwind CSS 3**
- **Framer Motion** — animaciones
- **Lenis** — scroll suave
- **Lucide React** — iconos
- **Next Fonts** — Inter, Space Grotesk, JetBrains Mono

## Características visuales

- Cursor custom que reacciona a hover
- Scroll suave con Lenis
- Fondo animado con mesh gradients y grid pattern
- Hero con animaciones de letras en cascada y stats
- Sección About con timeline de experiencia
- Proyectos con cards interactivas y gradientes únicos
- Skills con barras animadas y marquee
- Contact con formulario animado y enlaces a redes
- Tema oscuro con acentos en violeta/rosa/cian
- Navegación flotante con glassmorphism

## Configuración

Toda la información personal está en `src/data/portfolio.json`. Edítalo para personalizar:

```json
{
  "personal": { "name": "Tu Nombre", ... },
  "social": [...],
  "projects": [...],
  "skills": {...},
  "experience": [...]
}
```

## Scripts

```bash
npm run dev      # Dev server con Turbopack
npm run build    # Build
npm start        # Servidor de producción
```

Abre `http://localhost:3000` para ver el portafolio.

## Estructura

```
src/
├── app/
│   ├── layout.tsx          # Layout raíz con fonts y providers
│   ├── page.tsx            # Home
│   ├── loading.tsx          # Pantalla de carga
│   ├── not-found.tsx       # 404
│   └── globals.css         # Estilos globales + Tailwind
├── components/
│   ├── Hero.tsx            # Sección principal
│   ├── About.tsx           # Sobre mí + experiencia
│   ├── Projects.tsx        # Grid de proyectos
│   ├── Skills.tsx          # Stack técnico
│   ├── Contact.tsx         # Formulario + redes
│   ├── Navigation.tsx      # Navegación fija
│   ├── Footer.tsx          # Pie de página
│   ├── BackgroundFX.tsx    # Fondo animado
│   ├── SmoothScroll.tsx    # Lenis wrapper
│   └── CustomCursor.tsx     # Cursor custom
└── data/
    └── portfolio.json      # ⭐ Toda la info personal
```