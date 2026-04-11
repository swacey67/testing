import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

// Konfigurasi untuk mendapatkan __dirname di environment ESM (type: module)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Ini akan membuat simbol '@' langsung mengarah ke folder 'src'
      '@': path.resolve(__dirname, './src'),
    },
  },
})