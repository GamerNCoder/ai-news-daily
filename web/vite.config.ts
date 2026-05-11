import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const pwaManifest = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, 'manifest.webmanifest'), 'utf-8'),
) as Record<string, unknown>

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: pwaManifest,
      includeAssets: ['vite.svg'],
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webmanifest}'],
        navigateFallback: 'index.html',
        navigateFallbackDenylist: [/^\/digest/, /^\/email-preview/, /^\/health/],
      },
      devOptions: { enabled: true },
    }),
  ],
  server: {
    port: 5174,
    proxy: {
      '/digest': { target: 'http://127.0.0.1:8010', changeOrigin: true },
      '/email-preview': { target: 'http://127.0.0.1:8010', changeOrigin: true },
      '/health': { target: 'http://127.0.0.1:8010', changeOrigin: true },
    },
  },
})
