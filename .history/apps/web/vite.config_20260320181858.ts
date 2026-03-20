import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { join } from "path"
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
import vueJsx from "@vitejs/plugin-vue-jsx"
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  //配置别名
  resolve: {
    alias: {
      "@": join(__dirname, "src"),
    },
    extensions: [".vue", ".js", ".ts"],
  },
  // 配置构建选项
  build: {
    // 配置 rollup 选项
    rollupOptions: {
      // 配置插件
      plugins: [
        // 处理非 JavaScript 文件
        {
          name: "ignore-non-js",
          resolveId(source) {
            if (source.endsWith(".md") || source.endsWith(".html")) {
              return { id: source, external: true }
            }
          },
        },
      ],
    },
  },
  //配置跨域代理
  server: {
    host: "0.0.0.0",
    port: 3088,
    strictPort: false,
    open: true,
    proxy: {
      "/api": {
        target: "http://localhost:9527",
        changeOrigin: true,
        rewrite: (path) => path.replace("", ""),
      },
    },
  },
})
