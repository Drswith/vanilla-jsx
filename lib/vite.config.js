import { defineConfig } from 'vite';
import path from 'node:path'

const resolve = (...args) => path.resolve(__dirname, ...args)

// build jsx-runtime and jsx-dev-runtime as a library (compressed)
export default defineConfig({
  publicDir: false,
  build: {
    outDir: resolve('dist'),
    lib: {
      entry: [
        resolve('jsx-runtime.js'),
        resolve('jsx-dev-runtime.js'),
        resolve('h.js'),
      ],
      formats: ['es'],
    },
  },
});
