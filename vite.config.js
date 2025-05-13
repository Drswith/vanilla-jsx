import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';
import path from 'node:path'

export default defineConfig({
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: `${path.resolve(__dirname, 'lib')}/dist`
  },
  server: {
    port: 5173,
  },
  plugins: [
    visualizer({
      open: true,
      filename: 'stats.html',
      gzipSize: true,
      brotliSize: true,
    }),
  ],
});
