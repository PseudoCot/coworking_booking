/// <reference types='vite/client' />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    strictPort: true,
    port: 8000, // port which we will use in docker
    watch: { // hot reload
      usePolling: true
    }
  },
  // test: {
  //   globals: true,
  //   environment: 'jsdom',
  //   setupFiles: ['./src/setupTests.ts'],
  // },
});
