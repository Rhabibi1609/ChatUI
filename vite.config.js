import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/ChatUI/',
  server: {
    port: 3000,
    proxy: {
      '/chat_compare': { target: 'https://cutrdnt.ddns.net/', changeOrigin: true },
      '/tts': { target: 'https://cutrdnt.ddns.net/', changeOrigin: true },
      '/health': { target: 'https://cutrdnt.ddns.net/', changeOrigin: true },
    },
  },
});