import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Sitio de usuario en GitHub Pages (miel1144.github.io): se sirve desde la raíz.
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: { chunkSizeWarningLimit: 1000 },
})
