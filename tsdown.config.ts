import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/jsx-runtime.ts',
    'src/jsx-dev-runtime.ts',
    'src/h.ts',
    'src/reactivity.ts',
  ],
  // entry: 'src/*.ts',
  outDir: 'dist',
  format: 'esm',
  sourcemap: true,
  clean: true,
  dts: true,
  // minify: true,
  // tsconfig: 'tsconfig.json',
})
