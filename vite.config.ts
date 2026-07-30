import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Показывает ошибки ESLint оверлеем прямо в браузере в dev-режиме.
    // enableBuild: false — на сборку не влияет, за неё отвечают yarn lint и pre-commit.
    checker({
      overlay: { initialIsOpen: 'error', position: 'br' },
      enableBuild: false,
      eslint: {
        lintCommand: 'eslint .',
        watchPath: './src',
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@components': path.resolve(__dirname, './src/components'),
      '@ui': path.resolve(__dirname, './src/ui'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },
});
