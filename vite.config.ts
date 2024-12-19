import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    port: 3000,
    proxy: {
      '/api/fei': {
        target: 'https://data.fei.org/api/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/fei/, ''),
        headers: {
          'Accept': 'application/json',
          'Origin': 'https://data.fei.org',
          'Referer': 'https://data.fei.org/',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      },
      '/api/pzj': {
        target: 'https://portal.pzj.pl/api/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/pzj/, ''),
        headers: {
          'Accept': 'application/json',
          'Origin': 'https://portal.pzj.pl',
          'Referer': 'https://portal.pzj.pl/',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      }
    },
  },
  base: '/',
})
