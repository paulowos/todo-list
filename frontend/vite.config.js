///<reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.js',
    css: true,
    reporters: ['default'],
    coverage: {
      reporter: ['text', 'html'],
      include: [' src/**/*.{js,jsx}'],
      exclude: []
    }
  }
});
