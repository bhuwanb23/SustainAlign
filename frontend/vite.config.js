import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/pages/dashboard/components'),
      '@constants': path.resolve(__dirname, 'src/pages/dashboard/constants'),
      '@pages': path.resolve(__dirname, 'src/pages'),
    },
  },
})
