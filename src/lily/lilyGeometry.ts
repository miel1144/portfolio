import * as THREE from 'three'

// Tipos de punto (aParams.w)
export const KIND = { outerTepal: 0, innerTepal: 1, filament: 2, anther: 3, pistil: 4 } as const

/**
 * Nube de puntos de un lirio. Solo guarda parámetros (u, v, ángulo, tipo):
 * la forma 3D se calcula en el vertex shader para poder abrir la flor
 * (uBloom) sin recalcular nada en CPU.
 */
export function createLilyGeometry(tepalPoints = 26000): THREE.BufferGeometry {
  const params: number[] = []
  const rand: number[] = []
  const push = (u: number, v: number, phi: number, kind: number) => {
    params.push(u, v, phi, kind)
    rand.push(Math.random(), Math.random(), Math.random())
  }

  // 6 tépalos: 3 externos y 3 internos alternados (cada 60°)
  const perTepal = Math.floor(tepalPoints / 6)
  for (let t = 0; t < 6; t++) {
    const phi = (t * Math.PI) / 3
    const kind = t % 2 === 0 ? KIND.outerTepal : KIND.innerTepal
    let n = 0
    while (n < perTepal) {
      const u = Math.random()
      // muestreo proporcional al ancho del pétalo para densidad uniforme
      if (Math.random() > Math.pow(Math.sin(Math.PI * Math.pow(u, 0.85)), 0.9)) continue
      let v = Math.random() * 2 - 1
      // ~10% de puntos van al borde y un poco más allá: el borde "peludo"
      if (Math.random() < 0.1) v = Math.sign(v || 1) * (1 + Math.pow(Math.random(), 2) * 0.18)
      push(u, v, phi, kind)
      n++
    }
  }

  // 6 estambres (filamento + antera) y el pistilo
  for (let s = 0; s < 6; s++) {
    const phi = (s * Math.PI) / 3 + Math.PI / 6
    for (let i = 0; i < 260; i++) push(Math.random(), 0, phi, KIND.filament)
    for (let i = 0; i < 160; i++) push(1, 0, phi, KIND.anther)
  }
  for (let i = 0; i < 420; i++) push(Math.random(), 0, 0.4, KIND.pistil)

  const count = params.length / 4
  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(count * 3), 3))
  g.setAttribute('aParams', new THREE.BufferAttribute(new Float32Array(params), 4))
  g.setAttribute('aRand', new THREE.BufferAttribute(new Float32Array(rand), 3))
  return g
}

/** Puntos con color fijo (tallo, pedicelos, hojas, capullos de fondo). */
export function createStaticPoints(positions: number[], colors: number[]): THREE.BufferGeometry {
  const g = new THREE.BufferGeometry()
  g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3))
  g.setAttribute('aColor', new THREE.BufferAttribute(new Float32Array(colors), 3))
  const r = new Float32Array(positions.length)
  for (let i = 0; i < r.length; i++) r[i] = Math.random()
  g.setAttribute('aRand', new THREE.BufferAttribute(r, 3))
  return g
}
