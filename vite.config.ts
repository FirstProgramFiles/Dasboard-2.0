import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: ['dashboard-am7d.onrender.com']
  },
  define: {
    // Polyfill process.env to prevent "Uncaught ReferenceError: process is not defined"
    'process.env': {}
  }
});