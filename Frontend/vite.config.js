import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
      __REACT_DEVTOOLS_GLOBAL_HOOK__: '({ isDisabled: true })',
    },
    // For Vercel deployment
    build: {
      target: 'esnext',
      minify: 'terser',
      sourcemap: false,
    },
    server: {
      port: 3000,
    },
    preview: {
      port: 3000,
    },
  };
});
