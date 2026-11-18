import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { useCallback, useEffect, useRef, useState } from 'react'
import Branch from './components/Branch'
import Lightbox from './components/Lightbox'
import { education, experience, profile, projects, sections, skills } from './data/profile'
import { bloomTargets, motion } from './lily/bloomState'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [active, setActive] = useState(0)
  const [gallery, setGallery] = useState<{ title: string; images: string[]; start: number } | null>(null)
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // ?bloom=all abre todas las flores (útil para capturas)
    const forceOpen = new URLSearchParams(location.search).get('bloom') === 'all'
    if (forceOpen) bloomTargets.fill(1)
    const setBloom = (i: number) => (self: ScrollTrigger) => {
      if (!forceOpen) bloomTargets[i] = self.progress
    }

    let lenis: Lenis | null = null
    const tick = (t: number) => lenis?.raf(t * 1000)
    if (!motion.reduced) {
      lenis = new Lenis({ lerp: 0.1 })
      lenisRef.current = lenis
      lenis.on('scroll', ScrollTrigger.update)
      gsap.ticker.add(tick)
      gsap.ticker.lagSmoothing(0)
    }

    const triggers = sections.flatMap((s, i) => {
      const el = document.getElementById(s.id)
      if (!el) return []
      const list = [
        ScrollTrigger.create({
          trigger: el,
          start: 'top center',
          end: 'bottom center',
          onToggle: (self) => self.isActive && setActive(i),
        }),
      ]
      // la flor de cada sección se abre mientras la sección entra a la pantalla
      if (i > 0)
        list.push(
          ScrollTrigger.create({
            trigger: el,
            start: 'top 90%',
            end: 'top 40%',
            onUpdate: setBloom(i),
            onRefresh: setBloom(i),
          }),
        )
      return list
    })

    // reveal suave del contenido
    const reveals = gsap.utils.toArray<HTMLElement>('.reveal').map((el) =>
      gsap.from(el, {
        opacity: 0,
        y: motion.reduced ? 0 : 24,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      }),
    )

    // enlaces directos: /portfolio/#proyectos abre en esa sección
    const hashTarget = location.hash ? document.getElementById(location.hash.slice(1)) : null
    const hashTimer = hashTarget
      ? window.setTimeout(() => {
          if (lenis) lenis.scrollTo(hashTarget, { immediate: true })
          else hashTarget.scrollIntoView()
          ScrollTrigger.refresh()
        }, 100)
      : 0

    // las imágenes lazy cambian la altura de la página al cargar: recalcular posiciones
    let refreshTimer = 0
    const onAssetLoad = (e: Event) => {
      if (!(e.target instanceof HTMLImageElement)) return
      window.clearTimeout(refreshTimer)
      refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 150)
    }
    document.addEventListener('load', onAssetLoad, true)

    return () => {
      document.removeEventListener('load', onAssetLoad, true)
      window.clearTimeout(refreshTimer)
      window.clearTimeout(hashTimer)
      triggers.forEach((t) => t.kill())
      reveals.forEach((r) => r.scrollTrigger?.kill())
      gsap.ticker.remove(tick)
      lenis?.destroy()
      lenisRef.current = null
    }
  }, [])

  const navigate = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    if (lenisRef.current) lenisRef.current.scrollTo(el, { duration: 1.4 })
    else el.scrollIntoView({ behavior: motion.reduced ? 'auto' : 'smooth' })
  }, [])

  return (
    <>
      <a className="skip-link" href="#sobre-mi">
        Saltar al contenido
      </a>
      <Branch active={active} onNavigate={navigate} />

      <main className="content">
        {/* ---------------- Inicio ---------------- */}
        <section id="inicio" className="section hero">
          <p className="eyebrow">Hola, soy {profile.nickname} 🌸</p>
          <h1>{profile.name}</h1>
          <p className="hero__role">{profile.role}</p>
          <p className="hero__tagline">“{profile.tagline}”</p>
          <ul className="chips" aria-label="Datos rápidos">
            <li>📍 {profile.location}</li>
            {profile.languages.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
          <div className="actions">
            <a className="btn btn--primary" href={profile.cv} download>
              Descargar CV
            </a>
            <a className="btn" href={`mailto:${profile.email}`}>
              Contactar
            </a>
            <a className="btn btn--ghost" href={profile.links.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a className="btn btn--ghost" href={profile.links.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </section>

        {/* ---------------- Sobre mí ---------------- */}
        <section id="sobre-mi" className="section">
          <h2 className="reveal">Sobre mí</h2>
          {profile.about.map((p) => (
            <p key={p} className="lead reveal">
              {p}
            </p>
          ))}
          <dl className="stats reveal">
            {profile.highlights.map((h) => (
              <div key={h.label}>
                <dt>{h.value}</dt>
                <dd>{h.label}</dd>
              </div>
            ))}
          </dl>
          <div className="card edu reveal">
            <p className="card__kicker">Formación</p>
            <h3>{education.school}</h3>
            <p>{education.degree}</p>
            <p className="muted">{education.status}</p>
          </div>
        </section>

        {/* ---------------- Experiencia ---------------- */}
        <section id="experiencia" className="section">
          <h2 className="reveal">Experiencia</h2>
          <ol className="timeline">
            {experience.map((e) => (
              <li key={e.role} className="timeline__item reveal">
                <div className="timeline__head">
                  <h3>
                    {e.role} <span className="muted">· {e.company}</span>
                  </h3>
                  <span className="period">{e.period}</span>
                </div>
                <ul>
                  {e.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        {/* ---------------- Proyectos ---------------- */}
        <section id="proyectos" className="section">
          <h2 className="reveal">Proyectos</h2>
          <div className="projects">
            {projects.map((p) => (
              <article key={p.name} className="card project reveal">
                {p.image && p.gallery?.length ? (
                  <button
                    type="button"
                    className="project__media"
                    onClick={() => setGallery({ title: p.name, images: p.gallery!, start: 0 })}
                    aria-label={`Ver ${p.gallery.length} capturas de ${p.name} en grande`}
                  >
                    <img src={p.image} alt="" loading="lazy" />
                    <span className="project__zoom" aria-hidden="true">
                      Ver {p.gallery.length} {p.gallery.length === 1 ? 'captura' : 'capturas'} ⤢
                    </span>
                  </button>
                ) : p.image ? (
                  <img
                    src={p.image}
                    alt={p.imageFit === 'contain' ? `Logo de ${p.name}` : `Captura de ${p.name}`}
                    className={p.imageFit === 'contain' ? 'is-logo' : undefined}
                    loading="lazy"
                  />
                ) : (
                  <div className="project__placeholder" aria-hidden="true">
                    {p.name}
                  </div>
                )}
                <div className="project__body">
                  <p className="card__kicker">{p.kind}</p>
                  <h3>{p.name}</h3>
                  <p>{p.summary}</p>
                  <p className="impact">{p.impact}</p>
                  <ul className="tags">
                    {p.stack.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                  <p className="project__links">
                    {p.links.length
                      ? p.links.map((l) => (
                          <a key={l.url} href={l.url} target="_blank" rel="noreferrer">
                            {l.label} ↗
                          </a>
                        ))
                      : <span className="muted">Repositorio privado · demo bajo solicitud</span>}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ---------------- Habilidades ---------------- */}
        <section id="habilidades" className="section">
          <h2 className="reveal">Habilidades</h2>
          <div className="skills">
            {skills.map((s) => (
              <div key={s.group} className="reveal">
                <h3>{s.group}</h3>
                <ul className="tags">
                  {s.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------- Contacto ---------------- */}
        <section id="contacto" className="section contact">
          <h2 className="reveal">Hablemos</h2>
          <p className="lead reveal">
            Busco mi primer puesto como desarrolladora full stack. Si tu equipo necesita a alguien que piense en la
            logística de las cosas, escríbeme.
          </p>
          <a className="contact__mail reveal" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <div className="actions reveal">
            <a className="btn btn--primary" href={profile.cv} download>
              Descargar CV
            </a>
            <a className="btn btn--ghost" href={profile.links.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a className="btn btn--ghost" href={profile.links.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
          <footer className="muted small">
            © {new Date().getFullYear()} {profile.name} · Lirio de ~170k puntos hecho con Three.js
          </footer>
        </section>
      </main>

      {gallery && <Lightbox {...gallery} onClose={() => setGallery(null)} />}
    </>
  )
}
