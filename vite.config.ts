import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import fs from 'node:fs'

/**
 * Copies the built index.html to 404.html so that deep links (e.g. /causes)
 * are served by the app when the host has no rewrite rules — GitHub Pages
 * serves 404.html for unmatched paths.
 */
function spaFallback() {
  return {
    name: 'spa-fallback',
    closeBundle() {
      const outDir = path.resolve(__dirname, 'dist')
      const index = path.join(outDir, 'index.html')
      const fallback = path.join(outDir, '404.html')
      if (fs.existsSync(index)) {
        fs.copyFileSync(index, fallback)
      }
    },
  }
}

export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [react(), spaFallback()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5178,
    host: true,
  },
  build: {
    target: 'es2020',
    cssTarget: 'chrome90',
    assetsInlineLimit: 2048,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
        },
      },
    },
  },
})
