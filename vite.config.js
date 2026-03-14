import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/chat': { target: 'https://vr-instructor-api.jollyfield-da87f58f.westus3.azurecontainerapps.io', changeOrigin: true },
      '/tts': { target: 'https://vr-instructor-api.jollyfield-da87f58f.westus3.azurecontainerapps.io', changeOrigin: true },
      '/health': { target: 'https://vr-instructor-api.jollyfield-da87f58f.westus3.azurecontainerapps.io', changeOrigin: true },
    },
  },
});