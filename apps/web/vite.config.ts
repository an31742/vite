import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { join } from "path"
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
import vueJsx from "@vitejs/plugin-vue-jsx"
export default defineConfig({
  base: "/",
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: ["vue", "vue-router", "pinia"],
      dts: "auto-imports.d.ts",
    }),
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: false, // 禁用自动导入样式，因为我们手动导入
        }),
      ],
      dts: "components.d.ts",
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
    // 调整 chunk 大小警告限制
    chunkSizeWarningLimit: 1000,
    // 配置 rollup 选项
    rollupOptions: {
      // 明确指定构建入口
      input: {
        main: join(__dirname, "index.html"),
      },
      // 配置手动分块
      output: {
        manualChunks: (id) => {
          // 第三方依赖
          if (id.includes("node_modules")) {
            if (id.includes("vue") || id.includes("vue-router") || id.includes("pinia")) {
              return "vendor"
            }
            if (id.includes("element-plus") || id.includes("@element-plus")) {
              return "element"
            }
            if (id.includes("axios") || id.includes("lodash") || id.includes("dayjs")) {
              return "utils"
            }
            return "vendor"
          }
        },
      },
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
