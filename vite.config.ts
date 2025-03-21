import { defineConfig, Plugin, ConfigEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import qiankun from 'vite-plugin-qiankun'
import fs from 'fs'
import path from 'path'
const particleWasmPlugin: Plugin | undefined = {
  name: 'particle-wasm',
  apply: (_, env: ConfigEnv) => {
    return env.mode === 'development'
  },
  buildStart: () => {
    const copiedPath = path.join(
      __dirname,
      'node_modules/@particle-network/thresh-sig/wasm/thresh_sig_wasm_bg.wasm'
    )
    const dir = path.join(__dirname, 'node_modules/.vite/wasm')
    const resultPath = path.join(dir, 'thresh_sig_wasm_bg.wasm')
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.copyFileSync(copiedPath, resultPath)
  },
}
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode === 'development'
  return {
    base: 'https://auth.dorylus.chat',
    plugins: [
      // second 要和主应用注册子应用时的名称一样（registerMicroApps的name属性）
      qiankun('second', {
        useDevMode: true,
      }),
      !isDev && react(),
      particleWasmPlugin,
    ],
    define: {
      'process.env': process.env,
    },
    build: {
      target: 'esnext', // you can also use 'es2020' here
    },
    optimizeDeps: {
      esbuildOptions: {
        target: 'esnext', // you can also use 'es2020' here
      },
    },
    resolve: {
      alias: [
        {
          find: '@',
          replacement: resolve(__dirname, './src'),
        },
      ],
    },
    server: {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      host: '0.0.0.0', // ip
      port: 7002,
      // origin: "http://localhost:7002",
      proxy: {
        '/apis': {
          target: 'https://app.dorylus.chat/',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/apis/, 'apis'),
        },
      },
    },
  }
})
