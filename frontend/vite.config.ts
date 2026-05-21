import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'remove-console-production',
      apply: 'build',
      transform(code, id) {
        if (id.includes('node_modules')) return null;
        if (!/\.(js|ts|jsx|tsx)$/.test(id)) return null;
        return {
          code: code.replace(/console\.(log|warn|error|info|debug|dir)\([\s\S]*?\);?/g, '/* console stripped */'),
          map: null
        };
      }
    }
  ],

  resolve: {
    alias: {
      '@':            path.resolve(__dirname, './src'),
      '@components':  path.resolve(__dirname, './src/components'),
      '@pages':       path.resolve(__dirname, './src/pages'),
      '@hooks':       path.resolve(__dirname, './src/hooks'),
      '@store':       path.resolve(__dirname, './src/store'),
      '@services':    path.resolve(__dirname, './src/services'),
      '@animations':  path.resolve(__dirname, './src/animations'),
      '@context':     path.resolve(__dirname, './src/context'),
      '@types':       path.resolve(__dirname, './src/types'),
      '@utils':       path.resolve(__dirname, './src/utils'),
    },
  },

  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      '/uploads': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },

  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 3000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'react-vendor';
            }
            if (id.includes('framer-motion') || id.includes('@react-spring')) {
              return 'animation';
            }
            if (id.includes('recharts')) {
              return 'charts';
            }
          }
        },
      },
    },
  },

  optimizeDeps: {
    include: [
      'react', 'react-dom', 'react-router-dom',
      'framer-motion', '@react-spring/web',
      'axios', 'socket.io-client',
      'date-fns',
    ],
  },
});
