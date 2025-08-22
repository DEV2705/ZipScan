import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    host: '0.0.0.0', // Allow all connections
    port: 5173,
    strictPort: true,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
  }
})
