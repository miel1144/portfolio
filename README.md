# Portafolio · Imelda Almanza (miel)

**🌸 Sitio:** https://miel1144.github.io/portfolio/
**📄 CV (PDF):** https://miel1144.github.io/portfolio/cv/Imelda-Almanza-CV.pdf

Portafolio de una sola página, con fondo oscuro y scroll. A la izquierda crece una rama de lirios blancos con toques rosas, hechos con unos 170 mil puntos en 3D. Cada flor es el botón de una sección y se abre conforme bajas hasta ella.

## Con qué está construido

| Herramienta | Para qué se usó |
|---|---|
| **Vite** | Servidor de desarrollo y build estático |
| **React 19 + TypeScript** | Interfaz y secciones del sitio |
| **Three.js + React Three Fiber** | La escena 3D de la rama y los lirios |
| **GLSL (shaders propios)** | Forma, color y movimiento de cada pétalo, calculados en la GPU |
| **GSAP + ScrollTrigger** | Abrir cada flor según el scroll y animar la entrada del contenido |
| **Lenis** | Scroll suave |
| **CSS puro** | Tema oscuro, diseño responsive, tipografías Fraunces e Inter (Google Fonts) |
| **Python + ReportLab** | Generar el CV en PDF estilo Harvard |
| **GitHub Actions + GitHub Pages** | Compilar y publicar el sitio en cada push a `main` |

### Cómo funcionan los lirios

- Cada lirio es una **nube de puntos**: 6 tépalos (3 externos y 3 internos), 6 estambres y un pistilo.
- La forma del pétalo es una **superficie paramétrica**. Su eje es un arco cuyo ángulo crece a lo largo del pétalo, así que la posición tiene fórmula cerrada y se puede calcular directamente en el vertex shader.
- Un solo valor, `uBloom` (de 0 a 1), lleva la flor de **capullo cerrado a flor abierta**: los pétalos se separan, se curvan hacia atrás y se pintan con su color final.
- El color se calcula por punto: blanco en general, rubor rosa en el centro del pétalo, motas, base verde y bordes con brillo.
- Un pequeño desplazamiento con senos sobre el tiempo hace que los bordes "respiren".
- Las flores se abren al llegar a su sección. Si el sistema tiene activado **reducir movimiento**, la animación se desactiva.

## Estructura

```
src/
├── data/profile.ts        # ⭐ toda la información (perfil, experiencia, proyectos, habilidades)
├── App.tsx                # secciones y lógica de scroll
├── components/Branch.tsx  # panel de la rama y botones sobre cada flor
└── lily/
    ├── LilyScene.tsx      # escena 3D: tallo, hojas, flores
    ├── lilyGeometry.ts    # parámetros de cada punto
    ├── shaders.ts         # forma, color y movimiento del lirio
    ├── layout.ts          # posiciones compartidas entre la escena y los botones
    └── bloomState.ts      # apertura de cada flor (la escribe el scroll)
scripts/cv/build_cv.py     # genera public/cv/Imelda-Almanza-CV.pdf
```

## Correr en local

```bash
npm install
npm run dev                      # http://localhost:5173/portfolio/
                                 # agrega ?bloom=all para ver todas las flores abiertas
npm run build                    # build de producción en dist/
python scripts/cv/build_cv.py    # regenera el CV (requiere: pip install reportlab)
```

## Flujo de Git

- `main` siempre debe compilar: cada push a `main` publica el sitio.
- Los cambios se hacen en ramas (`feat/...`, `fix/...`, `content/...`) y se integran con pull request.
- Usa commits pequeños con mensaje en imperativo, por ejemplo: `feat: abrir flores con el scroll`.
