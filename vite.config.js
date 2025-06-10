import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Chunk size optimization
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['framer-motion', 'styled-components'],
          animations: ['gsap'],
          three: ['three', '@react-three/fiber', '@react-three/drei'],
        },
      },
    },
    // Optimize chunks
    chunkSizeWarningLimit: 800,
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  // Optimize asset handling
  assetsInclude: ['**/*.gltf', '**/*.glb'],
  // Enable image optimization
  optimizeDeps: {
    include: ['react', 'react-dom', 'three', 'gsap'],
  },
})
