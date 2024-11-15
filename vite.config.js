import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  ssr: {
    format: 'esm',
    target: 'node',
    noExternal: ['react-helmet-async']
  },
  optimizeDeps: {
    include: ['react-dom/client']
  }
})
