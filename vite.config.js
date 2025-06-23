import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Inspect from 'vite-plugin-inspect'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), Inspect()],
  base: '/',  // to build under this folder name
  //base: '/sam-info-app',  // to build under this folder name, for embedded use
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
