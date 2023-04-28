const path = require('path');
const { defineConfig } = require('vite');
const vuePlugin = require('@vitejs/plugin-vue');
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

module.exports = defineConfig({
  plugins: [vuePlugin(), cssInjectedByJsPlugin()],
  css: {
    postcss: {
      plugins: [
        autoprefixer,
        tailwindcss(path.join(__dirname, './tailwind.config.js')),
      ],
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: 'mycpm',
      formats: ['es', 'cjs'],
      fileName: (format) => `taic.${format}.js`,
    },
    outDir: 'dist/src/',
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
        exports: 'named',
      },
    },
    cssMinify: false,
  },
});
