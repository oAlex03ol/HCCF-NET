import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
      react(),
      tailwindcss()
    ],
    server: {
      host: true // 讓 Vite 綁定 IP : 0.0.0.0 允許區網裝置存取
    }
})
