import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    'process.env.NODE_ENV': `"${process.env.NODE_ENV || 'production'}"`,
    'process.env': {}
  },
  // For Vercel deployment
  build: {
    target: 'esnext',
    minify: 'terser',
    sourcemap: false,
    outDir: 'dist',
  },
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
});
