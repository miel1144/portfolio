import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { bloomTargets, motion } from './bloomState'
import { STEM_BOTTOM, STEM_TOP, flowerNodes, stemX } from './layout'
import { createLilyGeometry, createStaticPoints } from './lilyGeometry'
import { lilyVertex, pointFragment, staticVertex } from './shaders'

const lilyGeometry = createLilyGeometry()

function makeLilyMaterial(dpr: number, tilt: number, lean: number, spin: number) {
  return new THREE.ShaderMaterial({
    vertexShader: lilyVertex,
    fragmentShader: pointFragment,
    transparent: true,
    depthWrite: false,
    blending: THREE.NormalBlending,
    uniforms: {
      uBloom: { value: 0 },
      uTime: { value: 0 },
      uWobble: { value: motion.reduced ? 0 : 1 },
      uSize: { value: 1.7 },
      uPixelRatio: { value: dpr },
      uTilt: { value: tilt },
      uLean: { value: lean },
      uSpin: { value: spin },
      uOpacity: { value: 0.85 },
    },
  })
}

/** Tallo, pedicelos y hojas como puntos verdes, en coordenadas de píxel. */
function buildBranch(W: number, H: number) {
  const pos: number[] = []
  const col: number[] = []
  const toWorld = (nx: number, ny: number): [number, number] => [(nx - 0.5) * W, (0.5 - ny) * H]
  const green = (k = Math.random()) => [0.26 + 0.14 * k, 0.46 + 0.2 * k, 0.28 + 0.12 * k]
  const add = (x: number, y: number, c: number[]) => {
    pos.push(x, y, (Math.random() - 0.5) * 6)
    col.push(c[0], c[1], c[2])
  }

  // tallo: más grueso abajo
  for (let i = 0; i < 7000; i++) {
    const ny = STEM_TOP + Math.random() * (STEM_BOTTOM - STEM_TOP)
    const [x, y] = toWorld(stemX(ny), ny)
    const thick = 1.5 + 3.5 * ny
    add(x + (Math.random() - 0.5) * thick, y, green())
  }

  // pedicelos: curva cuadrática del tallo a la base de cada flor
  for (const n of flowerNodes) {
    const [x0, y0] = toWorld(stemX(n.joinY), n.joinY)
    const [x2, y2] = toWorld(n.x, n.y)
    const [x1, y1] = [x0 + (x2 - x0) * 0.25, y2 + (y0 - y2) * 0.1]
    for (let i = 0; i < 900; i++) {
      const t = Math.random()
      const x = (1 - t) ** 2 * x0 + 2 * (1 - t) * t * x1 + t * t * x2
      const y = (1 - t) ** 2 * y0 + 2 * (1 - t) * t * y1 + t * t * y2
      add(x + (Math.random() - 0.5) * 2, y + (Math.random() - 0.5) * 2, green())
    }
  }

  // hojas lanceoladas
  const leaves = [0.97, 0.9, 0.78, 0.63, 0.48, 0.33, 0.2]
  leaves.forEach((ny, i) => {
    const side = i % 2 === 0 ? -1 : 1
    const [bx, by] = toWorld(stemX(ny), ny)
    const len = H * (0.13 - i * 0.008)
    const wid = len * 0.13
    const ang = Math.PI / 2 - side * (0.75 + 0.1 * i)
    const dir = [Math.cos(ang), Math.sin(ang)]
    const perp = [-dir[1], dir[0]]
    for (let k = 0; k < 1600; k++) {
      const u = Math.random()
      const v = (Math.random() * 2 - 1) * Math.sin(Math.PI * Math.pow(u, 0.7))
      const droop = -Math.pow(u, 2) * len * 0.18
      const x = bx + dir[0] * u * len + perp[0] * v * wid
      const y = by + dir[1] * u * len + perp[1] * v * wid + droop
      const rib = 1 - Math.min(1, Math.abs(v) * 6)
      const c = green()
      add(x, y, [c[0] + 0.15 * rib, c[1] + 0.15 * rib, c[2] + 0.1 * rib])
    }
  })
  return createStaticPoints(pos, col)
}

function Branch() {
  const { size, gl } = useThree()
  const geometry = useMemo(() => buildBranch(size.width, size.height), [size.width, size.height])
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: staticVertex,
        fragmentShader: pointFragment,
        transparent: true,
        depthWrite: false,
        uniforms: {
          uTime: { value: 0 },
          uWobble: { value: motion.reduced ? 0 : 1 },
          uSize: { value: 2.0 },
          uPixelRatio: { value: gl.getPixelRatio() },
          uOpacity: { value: 0.8 },
        },
      }),
    [gl],
  )
  useFrame(({ clock }) => {
    material.uniforms.uTime.value = clock.elapsedTime
  })
  return <points geometry={geometry} material={material} frustumCulled={false} />
}

function Flowers() {
  const { size, gl } = useThree()
  const current = useRef(new Float32Array(flowerNodes.length + 1))
  const materials = useMemo(() => {
    const dpr = gl.getPixelRatio()
    const list = flowerNodes.map((n, i) => makeLilyMaterial(dpr, 1.15, -n.side * 0.5, i * 1.7))
    list.push(makeLilyMaterial(dpr, 0.2, 0.08, 0)) // capullo terminal, siempre cerrado
    return list
  }, [gl])

  const scale = Math.min(size.height * 0.095, size.width * 0.17)
  const toWorld = (nx: number, ny: number): [number, number, number] => [
    (nx - 0.5) * size.width,
    (0.5 - ny) * size.height,
    0,
  ]

  useFrame(({ clock }, dt) => {
    const k = Math.min(1, dt * 3.5)
    materials.forEach((m, i) => {
      const target = i < flowerNodes.length ? bloomTargets[i] : 0
      current.current[i] += (target - current.current[i]) * k
      m.uniforms.uBloom.value = current.current[i]
      m.uniforms.uTime.value = clock.elapsedTime + i * 3.1
    })
  })

  return (
    <>
      {flowerNodes.map((n, i) => (
        <points
          key={i}
          geometry={lilyGeometry}
          material={materials[i]}
          position={toWorld(n.x, n.y)}
          scale={scale}
          frustumCulled={false}
        />
      ))}
      <points
        geometry={lilyGeometry}
        material={materials[flowerNodes.length]}
        position={toWorld(stemX(STEM_TOP), STEM_TOP + 0.01)}
        scale={scale * 0.7}
        frustumCulled={false}
      />
    </>
  )
}

export default function LilyScene() {
  return (
    <Canvas
      orthographic
      camera={{ position: [0, 0, 500], zoom: 1, near: 0.1, far: 2000 }}
      dpr={[1, 2]}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      aria-hidden="true"
    >
      <Branch />
      <Flowers />
    </Canvas>
  )
}
