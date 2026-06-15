import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Deploying to a USER page (siddiqitaha.github.io) → base '/'.
// If you deploy to a PROJECT repo instead, set base to '/<repo-name>/'.
export default defineConfig({
  plugins: [react()],
  base: '/',
})
