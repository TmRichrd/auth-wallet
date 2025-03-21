import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path';
import qiankun from "vite-plugin-qiankun";
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode === 'development'
  return {
    base:'https://auth.dorylus.chat',
    plugins: [
    // second 要和主应用注册子应用时的名称一样（registerMicroApps的name属性）
      qiankun("second", {
        useDevMode: true,
      }),
      !isDev && react(),
    ],
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
        "Access-Control-Allow-Origin": "*",
      },
      host: "0.0.0.0", // ip
      port: 7002,
      // origin: "http://localhost:7002",
      proxy: {
        '/apis': {
          target: "https://app.dorylus.chat/",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/apis/, 'apis'),
        },
      },
    },
  };
});

