const path = require('path');
const { defineConfig } = require('vite');
const vuePlugin = require('@vitejs/plugin-vue');
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

const autoprefixer = require('autoprefixer');
const tailwindcss = require('tailwindcss');

module.exports = defineConfig({
  css: {
    postcss: {
      plugins: [
        autoprefixer(),
        tailwindcss(path.join(__dirname, 'tailwind.config.cjs')),
      ],
    },
  },
  plugins: [vuePlugin(), cssInjectedByJsPlugin()],
  build: {
    lib: {
      entry: path.join(__dirname, 'src/index.js'),
      formats: ['es', 'cjs', 'umd'],
      name: 'taic',
      fileName: (format) => `taic.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
        exports: 'named',
      },
    },
    cssMinify: true,
  },
});
