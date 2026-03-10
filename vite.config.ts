import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5172,
    strictPort: true, // fail if 5172 is already in use
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Silence @import deprecation warnings — this project uses @use only.
        // Change to 'legacy' if your Sass version is < 1.70.
        api: 'modern-compiler',
      },
    },
  },
});
