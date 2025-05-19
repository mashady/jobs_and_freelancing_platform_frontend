import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        secure: false,
      },
    },
    host: '127.0.0.1', // Force IPv4 instead of IPv6 (::1)
    port: 5173, // Use a different port to avoid conflicts
    hmr: {
      host: 'localhost', // Ensure HMR works correctly
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});