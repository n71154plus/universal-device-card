import { defineConfig } from 'rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default defineConfig({
  input: 'src/index.js',
  output: {
    file: 'dist/universal-device-card.js',
    format: 'es',
    sourcemap: false
  },
  plugins: [
    nodeResolve(),
    terser({ format: { comments: false } })
  ]
});
