import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    rollupOptions: {
      input: {
        // Sitio principal (raíz) = v2
        main: resolve(__dirname, 'index.html'),
        // Versión anterior en stand-by → kaimindconsulting.com/v1/
        v1: resolve(__dirname, 'v1/index.html'),
        // Alias de la v2 → /v2/ (mantiene los enlaces ya compartidos)
        v2: resolve(__dirname, 'v2/index.html'),
        // Landing de KaiHealth → kaimindconsulting.com/kaihealth.html
        kaihealth: resolve(__dirname, 'kaihealth.html'),
      },
    },
  },
})
