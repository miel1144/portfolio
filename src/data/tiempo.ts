// Duraciones que se recalculan solas cada vez que se abre la página.
// El CV usa la misma lógica en scripts/cv/build_cv.py: si cambias algo, actualiza ambos.

const plural = (n: number, uno: string, varios: string) => `${n} ${n === 1 ? uno : varios}`

/** Años y meses completos desde `año`/`mes` (1–12) hasta hoy. */
function añosYMeses(año: number, mes: number, hoy = new Date()) {
  const total = (hoy.getFullYear() - año) * 12 + (hoy.getMonth() + 1 - mes)
  return { años: Math.floor(total / 12), meses: total % 12 }
}

/** "2 años 3 meses"; con `corto` el mes se abrevia: "2 años 3 m". */
export function tiempoDesde(año: number, mes: number, corto = false) {
  const { años, meses } = añosYMeses(año, mes)
  const partes = []
  if (años > 0) partes.push(plural(años, 'año', 'años'))
  if (meses > 0 || años === 0) partes.push(corto ? `${meses} m` : plural(meses, 'mes', 'meses'))
  return partes.join(' ')
}

/** Solo años, contados por año calendario: sube cada 1 de enero. */
export const añosDesde = (año: number) => plural(new Date().getFullYear() - año, 'año', 'años')

// Fechas de inicio
export const INICIO_PROGRAMACION = { año: 2024, mes: 8 } // agosto 2024
export const INICIO_DISEÑO = 2023
export const INICIO_WEB = 2025
