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
    // ElementPlus()
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
      // 忽略 .md 文件
      external: [/\.md$/],
      // 配置插件
      plugins: [
        // 处理 .md 文件
        {
          name: "ignore-md",
          resolveId(source) {
            if (source.endsWith(".md")) {
              return { id: source, external: true }
            }
          },
        },
      ],
    },
  },
  // css:{
  //preprocessorOptions:{
  //scss:{
  //  additionalData:'@import "@/assets/style/main.scss";'
  // }
  //}
  // },
  //配置跨域代理
  server: {
    // 配置前端服务地址和端口
    //服务器主机名
    host: "0.0.0.0",
    //端口号
    port: 3088,
    //设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口
    strictPort: false,
    //服务器启动时自动在浏览器中打开应用程序,当此值为字符串时，会被用作 URL 的路径名
    open: true,
    //自定义代理规则
    proxy: {
      "/api": {
        target: "http://localhost:9527", //要代理的本地api地址，也可以换成线上测试地址
        changeOrigin: true, //跨域
        rewrite: (path) => path.replace("", ""),
      },
    },
  },
})
