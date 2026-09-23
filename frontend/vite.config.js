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
  server: {
    port: 3000,
    host: true,
  },
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor_three: ['three'],
          vendor_charts: ['chart.js', 'react-chartjs-2'],
          vendor_react: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
});
