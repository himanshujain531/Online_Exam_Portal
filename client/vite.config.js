import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Proxy API requests to backend
        changeOrigin: true, // Change the origin header to the target URL
        secure: false, // Skip SSL verification for local development
      },
    },
    hmr: {
      protocol: 'ws', // Use WebSocket for HMR
      host: 'localhost', // Ensure it matches your development host
      port: 5173, // Specify your Vite dev server port (default: 5173)
      overlay: true, // Display errors as an overlay in the browser
    },
  },
  plugins: [react()],
});
