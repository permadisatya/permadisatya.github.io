
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // CRITICAL: Ensures assets load correctly on custom domain/user site
  server: {
    port: 5173
  }
})
