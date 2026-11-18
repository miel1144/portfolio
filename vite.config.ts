import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Sitio de proyecto en GitHub Pages: https://miel1144.github.io/portfolio/
export default defineConfig({
  base: '/portfolio/',
  plugins: [react()],
  build: { chunkSizeWarningLimit: 1000 },
})
