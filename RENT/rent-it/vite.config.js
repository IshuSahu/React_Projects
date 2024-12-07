import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': '${import.meta.env.VITE_API_URL}', // Assuming Express runs on port 3000
    },
  },
  plugins: [react()],
})
