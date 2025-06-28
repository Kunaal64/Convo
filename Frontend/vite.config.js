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
  },
  // For Vercel deployment
  build: {
    target: 'esnext',
    minify: 'esbuild', // Changed from 'terser' to 'esbuild' which is built-in
    sourcemap: false,
    outDir: 'dist',
    chunkSizeWarningLimit: 1600,
  },
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020',
    },
  },
  esbuild: {
    // Add ESBuild options here if needed
  },
});
