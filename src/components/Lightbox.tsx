import { useCallback, useEffect, useRef, useState } from 'react'

type Props = {
  title: string
  images: string[]
  start: number
  onClose: () => void
}

/**
 * Galería a pantalla completa con <dialog> nativo: Esc cierra, ← → navegan,
 * clic fuera de la imagen cierra. `data-lenis-prevent` evita que el scroll
 * suave mueva la página de fondo mientras está abierta.
 */
export default function Lightbox({ title, images, start, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null)
  const [index, setIndex] = useState(start)
  const count = images.length

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

  return (
    <dialog
      ref={ref}
      className="lightbox"
      aria-label={`Capturas de ${title}`}
      data-lenis-prevent
      onClose={onClose}
      onCancel={onClose}
      onKeyDown={onKeyDown}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="lightbox__top">
        <p>
          <strong>{title}</strong> <span className="muted">· {index + 1} / {count}</span>
        </p>
        <button type="button" className="lightbox__close" onClick={onClose} aria-label="Cerrar galería">
          ✕
        </button>
      </div>

      <div className="lightbox__stage" onClick={(e) => e.target === e.currentTarget && onClose()}>
        {count > 1 && (
          <button type="button" className="lightbox__arrow" onClick={() => go(-1)} aria-label="Imagen anterior">
            ‹
          </button>
        )}
        <img key={images[index]} src={images[index]} alt={`${title}, captura ${index + 1} de ${count}`} />
        {count > 1 && (
          <button type="button" className="lightbox__arrow" onClick={() => go(1)} aria-label="Imagen siguiente">
            ›
          </button>
        )}
      </div>

      {count > 1 && (
        <ul className="lightbox__thumbs">
          {images.map((src, i) => (
            <li key={src}>
              <button
                type="button"
                className={i === index ? 'is-current' : undefined}
                onClick={() => setIndex(i)}
                aria-label={`Ver captura ${i + 1}`}
                aria-current={i === index ? 'true' : undefined}
              >
                <img src={src} alt="" loading="lazy" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </dialog>
  )
}
