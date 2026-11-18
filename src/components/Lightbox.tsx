import { useCallback, useEffect, useRef, useState } from 'react'
import type { MediaItem } from '../data/profile'

type Props = {
  title: string
  items: MediaItem[]
  start: number
  onClose: () => void
}

type Media = { src: string; kind: 'image' | 'video'; caption?: string; poster?: string }

const normalize = (m: MediaItem): Media =>
  typeof m === 'string' ? { src: m, kind: 'image' } : { kind: 'image', ...m }

/**
 * Galería a pantalla completa con <dialog> nativo: Esc cierra, ← → navegan,
 * clic fuera de la imagen cierra. Acepta imágenes y videos. `data-lenis-prevent`
 * evita que el scroll suave mueva la página de fondo mientras está abierta.
 */
export default function Lightbox({ title, items, start, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null)
  const [index, setIndex] = useState(start)
  const media = items.map(normalize)
  const count = media.length
  const current = media[index]

  const go = useCallback((delta: number) => setIndex((i) => (i + delta + count) % count), [count])

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    const opener = document.activeElement as HTMLElement | null
    dialog.showModal()
    document.documentElement.classList.add('is-locked')
    return () => {
      document.documentElement.classList.remove('is-locked')
      if (dialog.open) dialog.close()
      opener?.focus()
    }
  }, [])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') go(1)
    if (e.key === 'ArrowLeft') go(-1)
  }

  const label = `${title}, ${current.caption ? current.caption + ', ' : ''}${index + 1} de ${count}`

  return (
    <dialog
      ref={ref}
      className="lightbox"
      aria-label={`Galería de ${title}`}
      data-lenis-prevent
      onClose={onClose}
      onCancel={onClose}
      onKeyDown={onKeyDown}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="lightbox__top">
        <p>
          <strong>{title}</strong>
          {current.caption && <span className="lightbox__caption">{current.caption}</span>}
          <span className="muted"> · {index + 1} / {count}</span>
        </p>
        <button type="button" className="lightbox__close" onClick={onClose} aria-label="Cerrar galería">
          ✕
        </button>
      </div>

      <div className="lightbox__stage" onClick={(e) => e.target === e.currentTarget && onClose()}>
        {count > 1 && (
          <button type="button" className="lightbox__arrow" onClick={() => go(-1)} aria-label="Anterior">
            ‹
          </button>
        )}
        {current.kind === 'video' ? (
          <video
            key={current.src}
            className="lightbox__media"
            src={current.src}
            poster={current.poster}
            aria-label={label}
            controls
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <img key={current.src} className="lightbox__media" src={current.src} alt={label} />
        )}
        {count > 1 && (
          <button type="button" className="lightbox__arrow" onClick={() => go(1)} aria-label="Siguiente">
            ›
          </button>
        )}
      </div>

      {count > 1 && (
        <ul className="lightbox__thumbs">
          {media.map((m, i) => (
            <li key={m.src}>
              <button
                type="button"
                className={`${i === index ? 'is-current' : ''}${m.kind === 'video' ? ' is-video' : ''}`}
                onClick={() => setIndex(i)}
                aria-label={`Ver ${m.kind === 'video' ? 'video' : 'captura'} ${i + 1}${m.caption ? ` (${m.caption})` : ''}`}
                aria-current={i === index ? 'true' : undefined}
              >
                <img src={m.kind === 'video' ? (m.poster ?? '') : m.src} alt="" loading="lazy" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </dialog>
  )
}
