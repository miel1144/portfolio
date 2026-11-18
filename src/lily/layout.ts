import { sections } from '../data/profile'

// Posiciones normalizadas (0–1 dentro del panel de la rama). Las comparten la
// escena 3D y los botones HTML para que cada botón quede sobre su flor.
export const stemX = (y: number) => 0.54 + 0.04 * Math.sin(y * 6.0)

export type FlowerNode = { x: number; y: number; side: 1 | -1; joinY: number }

const TOP = 0.14
const BOTTOM = 0.86

export const flowerNodes: FlowerNode[] = sections.map((_, i) => {
  const y = TOP + ((BOTTOM - TOP) * i) / (sections.length - 1)
  const side = (i % 2 === 0 ? 1 : -1) as 1 | -1
  const joinY = y + 0.055
  return { x: stemX(joinY) + side * 0.18, y, side, joinY }
})

export const STEM_TOP = 0.07
export const STEM_BOTTOM = 1.02
