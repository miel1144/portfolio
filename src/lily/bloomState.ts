import { sections } from '../data/profile'

// Estado compartido entre el scroll (GSAP) y la escena 3D, sin pasar por React
// para no re-renderizar en cada frame. 0 = capullo cerrado, 1 = flor abierta.
export const bloomTargets = new Float32Array(sections.length)
bloomTargets[0] = 1

export const motion = {
  reduced: typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
}
