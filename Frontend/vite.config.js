import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'suppress-clerk-warning',
      config: () => ({
        define: {
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
          '__REACT_DEVTOOLS_GLOBAL_HOOK__': '({ isDisabled: true })'
        }
      })
    }
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    'process.env': process.env,
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
    '__REACT_DEVTOOLS_GLOBAL_HOOK__': '({ isDisabled: true })'
  },
});
