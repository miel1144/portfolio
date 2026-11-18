import { lazy, Suspense } from 'react'
import { sections } from '../data/profile'
import { flowerNodes } from '../lily/layout'

const LilyScene = lazy(() => import('../lily/LilyScene'))

type Props = { active: number; onNavigate: (id: string) => void }

/** Panel izquierdo: la rama 3D y, encima, un botón invisible por flor. */
export default function Branch({ active, onNavigate }: Props) {
  return (
    <aside className="branch">
      <div className="branch__canvas">
        <Suspense fallback={null}>
          <LilyScene />
        </Suspense>
      </div>
      <nav className="branch__nav" aria-label="Secciones">
        {sections.map((s, i) => {
          const n = flowerNodes[i]
          return (
            <button
              key={s.id}
              type="button"
              className={`bloom-btn bloom-btn--${n.side > 0 ? 'right' : 'left'}${i === active ? ' is-active' : ''}${i <= active ? ' is-open' : ''}`}
              style={{ left: `${n.x * 100}%`, top: `${n.y * 100}%` }}
              aria-current={i === active ? 'true' : undefined}
              onClick={() => onNavigate(s.id)}
            >
              <span className="bloom-btn__label">{s.label}</span>
            </button>
          )
        })}
      </nav>
    </aside>
  )
}
