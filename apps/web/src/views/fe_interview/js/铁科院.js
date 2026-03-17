// ● vue2和vue3的区别
console.log("🚀 ~ vue2和vue3的区别:")

// 1. 响应式原理
// Vue2: Object.defineProperty —— 无法检测对象属性新增/删除、数组索引变更，需要 $set
// Vue3: Proxy —— 原生支持对象/数组的所有变更，无需特殊处理

// Vue2 响应式局限
// const obj = { a: 1 }
// Vue.set(obj, 'b', 2)  // 必须用 $set 才能触发响应

// Vue3 响应式
// const obj = reactive({ a: 1 })
// obj.b = 2  // 直接赋值，自动响应

// 2. API 风格
// Vue2: Options API —— data、methods、computed、watch 分散在各选项中
// Vue3: Composition API —— setup 函数中集中管理逻辑，逻辑复用更方便

// Vue2 Options API
// export default {
//   data() { return { count: 0 } },
//   methods: { increment() { this.count++ } },
//   computed: { double() { return this.count * 2 } }
// }

// Vue3 Composition API
// import { ref, computed } from 'vue'
// export default {
//   setup() {
//     const count = ref(0)
//     const double = computed(() => count.value * 2)
//     const increment = () => count.value++
//     return { count, double, increment }
//   }
// }

// 3. 生命周期变化
// Vue2              Vue3
// beforeCreate   →  setup() 替代
// created        →  setup() 替代
// beforeMount    →  onBeforeMount
// mounted        →  onMounted
// beforeUpdate   →  onBeforeUpdate
// updated        →  onUpdated
// beforeDestroy  →  onBeforeUnmount
// destroyed      →  onUnmounted

// 4. 性能优化
// Vue3 虚拟 DOM 重写，引入 PatchFlags 静态标记
// 静态节点提升（hoistStatic）：静态节点只创建一次，复用引用
// 事件缓存（cacheHandlers）：事件处理函数缓存，避免重复创建
// diff 算法优化：最长递增子序列算法，减少 DOM 移动次数

// 5. TypeScript 支持
// Vue2: 需要 vue-class-component 等额外库，支持不完善
// Vue3: 源码用 TS 重写，原生完整支持 TypeScript

// 6. 多根节点（Fragment）
// Vue2: template 只能有一个根节点
// Vue3: template 支持多个根节点
// <template>
//   <div>节点1</div>
//   <div>节点2</div>
// </template>

// 7. Teleport 传送门
// Vue3 新增，将组件渲染到 DOM 的任意位置
// <Teleport to="body">
//   <Modal />
// </Teleport>

// 8. 新增 Suspense
// Vue3 新增，处理异步组件加载状态
// <Suspense>
//   <template #default><AsyncComponent /></template>
//   <template #fallback><Loading /></template>
// </Suspense>

// 9. 全局 API 变化
// Vue2: Vue.component()  Vue.directive()  Vue.use()
// Vue3: app.component()  app.directive()  app.use()

// 10. v-model 变化
// Vue2: v-model 默认绑定 value + input 事件，一个组件只能用一个
// Vue3: v-model 支持多个，自定义参数名
// <MyComp v-model:title="title" v-model:content="content" />


// ● ref 与 reactive 的区别
console.log("🚀 ~ ref 与 reactive 的区别:")

// 1. 数据类型
// ref: 可用于基本类型（string、number、boolean）和对象
// reactive: 只能用于对象（Object、Array、Map、Set）

// import { ref, reactive } from 'vue'
// const count = ref(0)          // 基本类型 ✅
// const name = ref('Tom')       // 基本类型 ✅
// const user = ref({ age: 18 }) // 对象 ✅（内部转为 reactive）
// const state = reactive({ age: 18 }) // 对象 ✅
// const num = reactive(0)       // ❌ 基本类型不能用 reactive

// 2. 访问方式
// ref: 在 JS 中需要 .value，在模板中自动解包无需 .value
// reactive: 直接访问属性，无需 .value

// const count = ref(0)
// count.value++           // JS 中需要 .value
// <div>{{ count }}</div>  // 模板中自动解包

// const state = reactive({ count: 0 })
// state.count++           // 直接访问
// <div>{{ state.count }}</div>

// 3. 实现原理
// ref 基本类型: 通过 Object.defineProperty 的 getter/setter 实现
// ref 对象类型: 内部调用 reactive() 处理
// reactive: 通过 Proxy 实现

// 4. 替换整个值
// ref: 可以直接替换整个值，响应性不丢失
// reactive: 直接替换整个对象会丢失响应性

// const count = ref(0)
// count.value = 100  // ✅ 响应性保持

// const state = reactive({ count: 0 })
// state = { count: 100 }  // ❌ 丢失响应性！
// Object.assign(state, { count: 100 })  // ✅ 正确方式

// 5. 解构
// ref: 解构后保持响应性（因为解构的是 ref 对象本身）
// reactive: 解构后失去响应性，需要用 toRefs()

// const { count } = { count: ref(0) }  // ✅ 保持响应性

// const state = reactive({ count: 0, name: 'Tom' })
// const { count } = state          // ❌ 解构后失去响应性
// const { count } = toRefs(state)  // ✅ 用 toRefs 保持响应性

// 6. 使用建议
// 基本类型 → 必须用 ref
// 需要替换整个对象 → 用 ref
// 复杂对象且不需要替换 → ref 或 reactive 均可
// 团队统一规范 → 推荐统一使用 ref（Vue 官方也推荐）


// ● 大文件上传应该如何处理
console.log("🚀 ~ 大文件上传应该如何处理:")

// 核心方案：分片上传 + 断点续传 + 并发控制

// 1. 文件分片
// function createChunks(file, chunkSize = 5 * 1024 * 1024) { // 默认 5MB 一片
//   const chunks = []
//   let start = 0
//   while (start < file.size) {
//     chunks.push(file.slice(start, start + chunkSize))
//     start += chunkSize
//   }
//   return chunks
// }

// 2. 计算文件 Hash（用于断点续传校验）
// 使用 Web Worker 避免阻塞主线程
// async function calcFileHash(file) {
//   return new Promise((resolve) => {
//     const worker = new Worker('./hashWorker.js')
//     worker.postMessage({ file })
//     worker.onmessage = (e) => resolve(e.data.hash)
//   })
// }
// hashWorker.js 中使用 spark-md5 计算 hash

// 3. 断点续传：上传前询问服务器已上传的分片
// async function getUploadedChunks(fileHash) {
//   const res = await fetch(`/api/upload/check?hash=${fileHash}`)
//   const { uploadedChunks } = await res.json()
//   return uploadedChunks  // 已上传的分片索引数组 [0, 1, 2]
// }

// 4. 并发控制上传分片
// async function uploadChunks(chunks, fileHash, uploadedChunks) {
//   const pool = []         // 并发池
//   const maxConcurrent = 3 // 最大并发数

//   for (let i = 0; i < chunks.length; i++) {
//     if (uploadedChunks.includes(i)) continue  // 跳过已上传的分片

//     const task = uploadChunk(chunks[i], i, fileHash).then(() => {
//       pool.splice(pool.indexOf(task), 1)
//     })
//     pool.push(task)

//     if (pool.length >= maxConcurrent) {
//       await Promise.race(pool)  // 等待最快完成的一个
//     }
//   }
//   await Promise.all(pool)  // 等待剩余全部完成
// }

// function uploadChunk(chunk, index, fileHash) {
//   const formData = new FormData()
//   formData.append('chunk', chunk)
//   formData.append('index', index)
//   formData.append('hash', fileHash)
//   return fetch('/api/upload/chunk', { method: 'POST', body: formData })
// }

// 5. 通知服务器合并分片
// async function mergeChunks(fileHash, fileName, total) {
//   await fetch('/api/upload/merge', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ hash: fileHash, fileName, total })
//   })
// }

// 6. 上传进度展示
// let uploadedCount = 0
// function onChunkUploaded() {
//   uploadedCount++
//   const progress = Math.round((uploadedCount / totalChunks) * 100)
//   console.log(`上传进度: ${progress}%`)
// }

// 完整流程：
// 选择文件 → 计算 Hash → 询问已上传分片 → 并发上传剩余分片 → 通知合并


// ● 十万级数据应该如何处理
console.log("🚀 ~ 十万级数据应该如何处理:")

// 核心思路：不要一次性渲染所有数据

// 方案1：虚拟滚动（Virtual Scroll）—— 最推荐
// 原理：只渲染可视区域内的 DOM 节点，其余用占位撑高
// 实现要素：
//   - 容器高度 = 总数据量 × 每项高度
//   - 根据 scrollTop 计算起始索引 startIndex
//   - 渲染 startIndex 到 startIndex + 可视数量 的数据
//   - 用 transform: translateY 偏移渲染区域

// function VirtualList({ data, itemHeight = 50, containerHeight = 500 }) {
//   const [scrollTop, setScrollTop] = useState(0)
//   const visibleCount = Math.ceil(containerHeight / itemHeight)
//   const startIndex = Math.floor(scrollTop / itemHeight)
//   const endIndex = startIndex + visibleCount + 1
//   const visibleData = data.slice(startIndex, endIndex)
//   const offsetY = startIndex * itemHeight

//   return (
//     <div style={{ height: containerHeight, overflow: 'auto' }}
//          onScroll={(e) => setScrollTop(e.target.scrollTop)}>
//       <div style={{ height: data.length * itemHeight }}>
//         <div style={{ transform: `translateY(${offsetY}px)` }}>
//           {visibleData.map(item => <div style={{ height: itemHeight }}>{item}</div>)}
//         </div>
//       </div>
//     </div>
//   )
// }

// Vue 推荐库：vue-virtual-scroller、vue3-virtual-scroll-list

// 方案2：分页加载
// 服务端分页，每次只请求当前页数据，最简单有效

// 方案3：时间分片（requestIdleCallback / requestAnimationFrame）
// 将大量 DOM 插入操作分批执行，避免长时间阻塞主线程
// function timeSliceRender(data, container) {
//   let index = 0
//   const batchSize = 100  // 每批渲染 100 条

//   function renderBatch() {
//     const fragment = document.createDocumentFragment()
//     const end = Math.min(index + batchSize, data.length)

//     for (; index < end; index++) {
//       const div = document.createElement('div')
//       div.textContent = data[index]
//       fragment.appendChild(div)
//     }
//     container.appendChild(fragment)

//     if (index < data.length) {
//       requestAnimationFrame(renderBatch)  // 下一帧继续渲染
//     }
//   }
//   requestAnimationFrame(renderBatch)
// }

// 方案4：Web Worker 处理数据
// 将数据过滤、排序、计算等耗时操作放到 Worker 线程
// const worker = new Worker('./dataWorker.js')
// worker.postMessage({ data: largeData, filter: 'xxx' })
// worker.onmessage = (e) => { renderList(e.data.result) }

// 方案5：Object.freeze 冻结数据（Vue 专用）
// 对于只展示不需要响应式的数据，冻结后 Vue 不会为其建立响应式
// this.list = Object.freeze(largeData)  // 节省大量内存和性能

// 各方案对比
// 方案          适用场景              优点              缺点
// 虚拟滚动      长列表滚动展示        性能最优          实现复杂，定高要求
// 分页加载      表格、列表            简单易实现        用户体验一般
// 时间分片      一次性插入大量 DOM    渐进式，不卡顿    数据全在内存
// Web Worker    复杂数据计算          不阻塞主线程      通信有开销
// Object.freeze 纯展示数据（Vue）     节省响应式开销    数据不可变


// ● webpack 配置
console.log("🚀 ~ webpack 配置:")

// const path = require('path')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

// module.exports = {
//   // 1. 入口
//   entry: './src/main.js',

//   // 2. 出口
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: '[name].[contenthash].js',  // contenthash 用于缓存
//     clean: true,  // 每次构建清空 dist
//   },

//   // 3. 模块解析
//   resolve: {
//     alias: { '@': path.resolve(__dirname, 'src') },
//     extensions: ['.js', '.ts', '.vue', '.json'],
//   },

//   // 4. Loader 配置
//   module: {
//     rules: [
//       { test: /\.vue$/, use: 'vue-loader' },
//       { test: /\.(js|ts)$/, use: 'babel-loader', exclude: /node_modules/ },
//       { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
//       { test: /\.scss$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'] },
//       { test: /\.(png|jpg|gif|svg)$/, type: 'asset/resource' },
//     ],
//   },

//   // 5. 插件
//   plugins: [
//     new HtmlWebpackPlugin({ template: './public/index.html' }),
//     new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
//     // new BundleAnalyzerPlugin(),  // 分析包体积
//   ],

//   // 6. 代码分割
//   optimization: {
//     splitChunks: {
//       chunks: 'all',
//       cacheGroups: {
//         vendor: {
//           test: /[\\/]node_modules[\\/]/,
//           name: 'vendors',
//           chunks: 'all',
//         },
//       },
//     },
//   },

//   // 7. 开发服务器
//   devServer: {
//     port: 3000,
//     hot: true,
//     proxy: {
//       '/api': { target: 'http://localhost:8080', changeOrigin: true },
//     },
//   },

//   // 8. 环境模式
//   mode: process.env.NODE_ENV || 'development',
// }


// ● vite 配置
console.log("🚀 ~ vite 配置:")

// import { defineConfig, loadEnv } from 'vite'
// import vue from '@vitejs/plugin-vue'
// import path from 'path'
// import AutoImport from 'unplugin-auto-import/vite'
// import Components from 'unplugin-vue-components/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// export default defineConfig(({ mode }) => {
//   const env = loadEnv(mode, process.cwd())  // 加载环境变量

//   return {
//     // 1. 根目录和基础路径
//     root: process.cwd(),
//     base: env.VITE_BASE_URL || '/',

//     // 2. 插件
//     plugins: [
//       vue(),
//       AutoImport({ resolvers: [ElementPlusResolver()] }),
//       Components({ resolvers: [ElementPlusResolver()] }),
//     ],

//     // 3. 路径别名
//     resolve: {
//       alias: { '@': path.resolve(__dirname, 'src') },
//       extensions: ['.js', '.ts', '.vue', '.json'],
//     },

//     // 4. 开发服务器
//     server: {
//       port: 3088,
//       open: true,
//       proxy: {
//         '/api': {
//           target: env.VITE_API_BASE_URL,
//           changeOrigin: true,
//           rewrite: (path) => path.replace(/^\/api/, ''),
//         },
//       },
//     },

//     // 5. 构建配置
//     build: {
//       outDir: 'dist',
//       sourcemap: false,
//       minify: 'terser',
//       rollupOptions: {
//         output: {
//           // 分包策略
//           manualChunks: {
//             vue: ['vue', 'vue-router', 'pinia'],
//             elementPlus: ['element-plus'],
//           },
//           chunkFileNames: 'js/[name]-[hash].js',
//           assetFileNames: 'assets/[name]-[hash].[ext]',
//         },
//       },
//       // 超过 500kb 警告
//       chunkSizeWarningLimit: 500,
//     },

//     // 6. CSS 预处理
//     css: {
//       preprocessorOptions: {
//         scss: {
//           additionalData: `@import "@/styles/variables.scss";`,
//         },
//       },
//     },

//     // 7. 依赖预构建
//     optimizeDeps: {
//       include: ['vue', 'vue-router', 'pinia', 'element-plus'],
//     },
//   }
// })


// ● 如何封装高复用组件
console.log("🚀 ~ 如何封装高复用组件:")

// 核心原则：单一职责、开放封闭、高内聚低耦合

// 1. 明确组件边界
// 基础组件（UI 无关业务）：Button、Input、Modal
// 业务组件（与业务强绑定）：UserCard、OrderList
// 布局组件：Header、Sidebar、PageLayout

// 2. Props 设计原则
// - 类型明确，提供默认值
// - 避免透传过多 props，使用 v-bind="$attrs" 透传
// - 复杂配置用对象传入

// // 好的 Props 设计
// defineProps({
//   size: { type: String, default: 'medium', validator: (v) => ['small', 'medium', 'large'].includes(v) },
//   disabled: { type: Boolean, default: false },
//   loading: { type: Boolean, default: false },
//   config: { type: Object, default: () => ({}) },
// })

// 3. 插槽（Slot）提升灵活性
// 默认插槽：主内容区域
// 具名插槽：header、footer、action 等固定区域
// 作用域插槽：将组件内部数据暴露给父组件

// <template>
//   <div class="card">
//     <slot name="header" />
//     <slot />                              <!-- 默认插槽 -->
//     <slot name="footer" :data="innerData" />  <!-- 作用域插槽 -->
//   </div>
// </template>

// 4. Emits 规范
// defineEmits(['change', 'update:modelValue', 'submit'])
// 使用 update:propName 支持 v-model

// 5. expose 控制对外暴露的方法
// defineExpose({ focus, reset, validate })

// 6. 使用 provide/inject 跨层级通信（表单场景）
// 父组件 provide 上下文，子组件 inject 使用
// const FormContext = Symbol('FormContext')
// provide(FormContext, { disabled, size, model })

// 7. Hooks 抽离逻辑
// 将组件内复杂逻辑抽成 useXxx hook，组件只负责渲染
// function useTableData(fetchFn) {
//   const data = ref([])
//   const loading = ref(false)
//   const pagination = reactive({ page: 1, pageSize: 20, total: 0 })

//   async function fetchData() {
//     loading.value = true
//     const res = await fetchFn(pagination)
//     data.value = res.list
//     pagination.total = res.total
//     loading.value = false
//   }

//   onMounted(fetchData)
//   return { data, loading, pagination, fetchData }
// }

// 8. 封装示例：高复用 Table 组件
// defineProps({
//   columns: Array,      // 列配置
//   data: Array,         // 数据
//   loading: Boolean,
//   pagination: Object,  // 分页配置
//   rowKey: { type: String, default: 'id' },
// })
// defineEmits(['page-change', 'sort-change', 'row-click'])
// defineExpose({ clearSelection, toggleRowSelection })
