// Shaders del lirio de puntos. La forma de cada tépalo es una superficie
// paramétrica: su eje es un arco cuyo ángulo crece linealmente con u
// (a = a0 + a1·u), así la posición tiene forma cerrada y se puede animar
// la apertura (uBloom) por completo en la GPU.

const common = /* glsl */ `
  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

  vec3 wobble(vec3 p, vec3 r, float t, float amp) {
    return amp * vec3(
      sin(p.y * 9.0 + t * 1.3 + r.x * 6.28),
      sin(p.x * 8.0 + t * 1.1 + r.y * 6.28),
      sin(p.z * 7.0 + t * 1.7 + r.z * 6.28)
    );
  }
`

export const lilyVertex = /* glsl */ `
  uniform float uBloom;
  uniform float uTime;
  uniform float uWobble;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform float uTilt;
  uniform float uLean;
  uniform float uSpin;

  attribute vec4 aParams;   // u, v, phi, kind
  attribute vec3 aRand;

  varying vec3 vColor;
  varying float vAlpha;

  ${common}

  const vec3 WHITE = vec3(1.0, 0.95, 0.97);
  const vec3 PINK  = vec3(0.98, 0.38, 0.62);
  const vec3 DEEP  = vec3(0.78, 0.14, 0.42);
  const vec3 GREEN = vec3(0.66, 0.82, 0.52);
  const vec3 BUD   = vec3(0.80, 0.90, 0.74);
  const vec3 UP    = vec3(0.0, 1.0, 0.0);

  mat3 rotX(float a) { float c = cos(a), s = sin(a); return mat3(1,0,0, 0,c,s, 0,-s,c); }
  mat3 rotY(float a) { float c = cos(a), s = sin(a); return mat3(c,0,-s, 0,1,0, s,0,c); }
  mat3 rotZ(float a) { float c = cos(a), s = sin(a); return mat3(c,s,0, -s,c,0, 0,0,1); }

  void main() {
    float u = aParams.x;
    float v = aParams.y;
    float phi = aParams.z + uSpin;
    float kind = aParams.w;
    float b = smoothstep(0.0, 1.0, uBloom);

    vec3 radial = vec3(cos(phi), 0.0, sin(phi));
    vec3 side = vec3(-sin(phi), 0.0, cos(phi));
    vec3 p;
    vec3 col;
    float alpha = 1.0;
    float hair = step(1.0, abs(v));
    float size = 1.0;

    if (kind < 1.5) {
      // ---------- tépalo ----------
      bool inner = kind > 0.5;
      float L = inner ? 1.0 : 1.06;
      float W = (inner ? 0.30 : 0.24) * mix(0.5, 1.0, b);
      float w = W * pow(sin(3.14159 * pow(u, 0.85)), 0.9);
      float a0 = mix(0.10, 0.80, b) + (inner ? 0.0 : 0.06 * b);
      float a1 = mix(-0.22, 2.0, b) + 0.001;
      float a = a0 + a1 * u;
      float h = L * (cos(a0) - cos(a)) / a1;
      float up = L * (sin(a) - sin(a0)) / a1;
      vec3 n = radial * cos(a) - UP * sin(a);          // normal hacia atrás
      float vc = clamp(v, -1.0, 1.0);
      p = radial * (h + 0.03) + UP * up + side * (v * w);
      p -= n * (0.45 * w * vc * vc);                    // pétalo acanalado
      p -= n * (0.035 * b * sin(u * 28.0 + phi * 3.0) * pow(abs(vc), 3.0)); // borde ondulado
      p += n * 0.02 * (1.0 - abs(vc)) * b;              // nervio central

      // color: blanco con rubor rosa al centro, base verde, motas
      float mid = (1.0 - smoothstep(0.0, 0.38, abs(v))) * smoothstep(0.04, 0.22, u) * (1.0 - smoothstep(0.5, 0.88, u));
      col = mix(WHITE, PINK, mid * 0.9);
      col = mix(col, PINK, 0.3 * (1.0 - smoothstep(0.0, 0.45, u)) * (1.0 - abs(vc)));
      vec2 g = vec2(u * 15.0, (vc + 1.0) * 5.0);
      vec2 f = fract(g) - 0.5;
      float spot = step(hash(floor(g) + phi), 0.32) * (1.0 - smoothstep(0.1, 0.24, length(f)))
                 * smoothstep(0.1, 0.2, u) * (1.0 - smoothstep(0.5, 0.7, u));
      col = mix(col, DEEP, spot * 0.85);
      col = mix(col, GREEN, 1.0 - smoothstep(0.0, 0.12, u));
      col = mix(BUD + vec3(0.1, 0.0, 0.05) * u, col, smoothstep(0.05, 0.65, b));
      col += 0.18 * smoothstep(0.85, 1.0, abs(v));      // brillo en el borde
      alpha = hair > 0.5 ? 0.55 : 1.0;
      size = hair > 0.5 ? 0.7 : 1.0;
    } else {
      // ---------- estambres y pistilo ----------
      float show = smoothstep(0.35, 0.85, b);
      if (kind < 3.5) {
        float len = 0.78 * mix(0.6, 1.0, b);
        float ang = mix(0.05, 0.55, b);
        float t = kind < 2.5 ? u : 1.0;
        p = (radial * sin(ang) * t + UP * cos(ang) * t) * len;
        p += radial * 0.12 * t * t * b;
        if (kind < 2.5) {
          p += (aRand - 0.5) * 0.008;
          col = vec3(0.88, 0.95, 0.82);
          size = 0.7;
        } else {
          p += (aRand - 0.5) * vec3(0.035, 0.06, 0.035);
          col = vec3(0.95, 0.42, 0.24);                 // antera
        }
      } else {
        float len = 0.85 * mix(0.6, 1.0, b);
        p = (radial * 0.18 * u + UP * u) * len + (aRand - 0.5) * 0.01;
        col = mix(vec3(0.82, 0.93, 0.74), PINK, smoothstep(0.85, 1.0, u));
        if (u > 0.95) p += (aRand - 0.5) * 0.05;
      }
      alpha = show;
    }

    p += wobble(p, aRand, uTime, uWobble * (0.006 + 0.02 * hair));

    // orientación: el capullo apunta hacia arriba, la flor abierta mira al frente
    p = rotZ(uLean) * rotX(mix(0.12, uTilt, b)) * p;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * uPixelRatio * size * (0.6 + aRand.z * 0.8);
    vColor = col;
    vAlpha = alpha;
  }
`

export const pointFragment = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  uniform float uOpacity;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    gl_FragColor = vec4(vColor, smoothstep(0.5, 0.05, d) * vAlpha * uOpacity);
  }
`

export const staticVertex = /* glsl */ `
  uniform float uTime;
  uniform float uWobble;
  uniform float uSize;
  uniform float uPixelRatio;
  attribute vec3 aColor;
  attribute vec3 aRand;
  varying vec3 vColor;
  varying float vAlpha;
  ${common}
  void main() {
    vec3 p = position + wobble(position * 0.01, aRand, uTime, uWobble * 1.2);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = uSize * uPixelRatio * (0.6 + aRand.z * 0.8);
    vColor = aColor;
    vAlpha = 1.0;
  }
`
