// vite.config.js
// https://vite.dev/config/
import { defineConfig, mergeConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'

// base config ( 不需要自行設定端口 )
const base = defineConfig({
    plugins: [
        react(),
        tailwindcss()
    ],
    server: {
        host: true, // 讓 Vite 綁定 IP : 0.0.0.0 允許區網裝置存取
    }
})

/* local config local config（ 如有需要可自行設定 port ）

建立一個 vite.config.local.js 檔案，內容如下：

export default {
    server: {
        port: 你的端口 ( 不用加引號，例如：3001 ）
    }
}
*/

let local = {}
if (fs.existsSync('./vite.config.local.js')) {
    local = (await import('./vite.config.local.js')).default
}

// 合併 base + local
export default mergeConfig(base, local)