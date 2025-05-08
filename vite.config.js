import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Inspect from 'vite-plugin-inspect'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), Inspect()],
  base: '/sam-info-app',  // to build under this folder name
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate React
          react: ['react', 'react-dom'],

          // Separate Three.js core and Fiber
          three: ['three'],
          r3f: ['@react-three/fiber']
        }
      }
    }
  }
})
