# miel1144.github.io

Portafolio de **Imelda Almanza (miel)**, Junior Full Stack Developer en Tijuana, B.C.

Es una sola página con scroll. A la izquierda hay una rama de lirio hecha con unos 170 mil puntos. Cada flor es el botón de una sección y se abre conforme llegas a ella.

## Stack

- **Vite + React + TypeScript**
- **Three.js + React Three Fiber**: lirios como nube de puntos. La forma de cada pétalo es una superficie paramétrica que se calcula en el vertex shader, y la apertura (`uBloom`) se anima por completo en la GPU.
- **GSAP ScrollTrigger + Lenis**: la apertura de las flores, el scroll suave y la aparición del contenido.
- **GitHub Pages**: se despliega con GitHub Actions al hacer push a `main`.

## Estructura

```
src/
├── data/profile.ts        # ⭐ toda la información (perfil, experiencia, proyectos, skills)
├── App.tsx                # secciones + lógica de scroll
├── components/Branch.tsx  # panel de la rama + botones sobre cada flor
└── lily/
    ├── LilyScene.tsx      # escena 3D (tallo, hojas, flores)
    ├── lilyGeometry.ts    # parámetros de los puntos
    ├── shaders.ts         # forma, color y movimiento del lirio
    ├── layout.ts          # posiciones compartidas entre la escena y los botones
    └── bloomState.ts      # apertura de cada flor (lo escribe el scroll)
scripts/cv/build_cv.py     # genera public/cv/Imelda-Almanza-CV.pdf (estilo Harvard)
```

## Scripts

```bash
npm install
npm run dev        # http://localhost:5173  (?bloom=all abre todas las flores)
npm run build
python scripts/cv/build_cv.py   # regenera el CV (requiere reportlab)
```

## Flujo de Git

- `main` siempre debe compilar: cada push a `main` publica el sitio.
- Los cambios se hacen en ramas (`feat/...`, `fix/...`, `content/...`) y se integran con pull request.
- Usa commits pequeños con mensaje en imperativo, por ejemplo: `feat: abrir flores con el scroll`.
