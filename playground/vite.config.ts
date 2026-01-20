import path from 'node:path'
import { defineConfig } from 'vite'
import { analyzer } from 'vite-bundle-analyzer'

export default defineConfig({
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: path.resolve(__dirname, '..', 'dist'),
  },
  server: {
    port: 5173,
  },
  plugins: [
    analyzer(),
  ],
})
