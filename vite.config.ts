import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// PREVIEW=1 builds with relative asset paths and hash routing,
// so the site can be opened from any folder or static host.
const preview = process.env.PREVIEW === '1'

export default defineConfig({
  base: preview ? './' : '/',
  plugins: [react(), tailwindcss()],
  define: {
    'import.meta.env.VITE_HASH_ROUTER': JSON.stringify(preview ? '1' : '0'),
  },
})
