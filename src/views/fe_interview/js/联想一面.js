/**
 * Vue 编译过程详解
 */

/**
 * 构建时编译
 * 1、将模版字符串编译成ast抽象语法树
 * 2、遍历 AST，标记静态节
 * 3、根据优化后的 AST 生成 JavaScript 代码，即 render 函数
 *
 * 运行时编译
 * 1、使用proxy创建响应式数据
 * 2、渲染render函数的数据执行成虚拟dom
 * 3、根据diff算法结果生成patch更新真实dom
 */

/**
 * vue中key的作用
 */

// key虚拟dom节点的唯一标识，可以让diff算法更准确的比较新旧虚拟dom树

/**
 * webpack和vite都有哪些配置
 */

// webpack 入口input 出口output  插件pliugin  模块loader  devServer 服务
//vite root 根目录 base基础路径   plugins插件 server 服务  resolve 路径别名  build 构建

// Webpack 热更新 (HMR) 和 Vite 热更新对比：
// 1. Webpack HMR 工作流程
// 文件变化 → webpack 重新编译 → 生成 hot-update.js → WebSocket 推送 → 浏览器接收更新

// 2. HMR 配置
module.exports = {
  devServer: {
    hot: true, // 启用热更新
    hotOnly: true, // 构建失败时不刷新页面
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
};

// 3. HMR API 使用
if (module.hot) {
  module.hot.accept("./component.js", () => {
    // 模块更新时的回调
    console.log("组件已更新");
  });
}

// Webpack HMR 流程：

// 文件监听 → 检测文件变化

// 重新编译 → 生成新的模块代码

// 生成补丁 → 创建 hot-update.json 和 hot-update.js

// WebSocket 通信 → 推送更新信息到浏览器

// 模块替换 → 浏览器接收并替换模块

// 1. Vite HMR 基于 ESM
// 文件变化 → esbuild 快速转换 → WebSocket 推送 → 浏览器原生 import 更新

// 2. Vite HMR API
if (import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    // 模块更新回调
    console.log("模块已更新");
  });

  // 接受依赖更新
  import.meta.hot.accept("./dep.js", (newDep) => {
    // 依赖更新处理
  });
}

// 3. Vue 组件热更新
// Vite 自动处理 Vue 组件的热更新，无需手动配置

// Vite HMR 流程：

// 文件监听 → 检测文件变化

// 快速转换 → esbuild 极速编译单个文件

// 依赖分析 → 分析模块依赖关系

// 精确更新 → 只更新变化的模块

// 原生 ESM → 浏览器直接 import 新模块

// 特性	Webpack HMR	Vite HMR
// 编译方式	打包整个应用	按需编译单个文件
// 更新速度	较慢（需要重新打包）	极快（esbuild + ESM）
// 模块系统	CommonJS/AMD	原生 ESM
// 状态保持	需要手动处理	自动保持组件状态
// 配置复杂度	需要配置插件	开箱即用

// git的方法

//git add git commmit  git push git pull  git fetch  git cline  git stash  git stash pop  git satsh drop  git brach   git merge  git status  git log  git rest --hard   git rebae  git tag  git remote

//设计模式有哪些

// 单例模式  vuex  vuerouter   工厂模式   代理模式 vue原理proxy   发布及订阅模式 vue原理 eventBus   观察者模式  watch

//宏任务有哪些微任务有哪些

// 宏任务
// setTimeout  setInterval ajax

// 微任务
// .then()	微任务	回调进入微任务队列
// .catch()	微任务	回调进入微任务队列
// await 后面代码

// new Promise()	同步任务	构造函数立即执行
// .finally()	微任务	回调进入微任务队列
// Promise.resolve()	同步	立即创建 resolved Promise
// Promise.reject()	同步	立即创建 rejected Promise
// Promise.all()	同步	立即创建 Promise，但结果是微任务

//讲一下vue中的nexttick

// nextTick 是 Vue 提供的一个 API，用于在下次 DOM 更新循环结束之后执行延迟回调  nextTick 是基于事件循环机制确保在 DOM 更新完成后执行回调函数

// Vue 内部 nextTick 简化实现
// const callbacks = []
// let pending = false

// function flushCallbacks() {
//   pending = false
//   const copies = callbacks.slice(0)
//   callbacks.length = 0
//   for (let i = 0; i < copies.length; i++) {
//     copies[i]()
//   }
// }

// // 优先级：Promise > MutationObserver > setImmediate > setTimeout
// function timerFunc() {
//   if (typeof Promise !== 'undefined') {
//     // 微任务 - 最高优先级
//     Promise.resolve().then(flushCallbacks)
//   } else if (typeof MutationObserver !== 'undefined') {
//     // 微任务 - 备选方案
//     const observer = new MutationObserver(flushCallbacks)
//     const textNode = document.createTextNode(String(1))
//     observer.observe(textNode, { characterData: true })
//     textNode.data = String(2)
//   } else if (typeof setImmediate !== 'undefined') {
//     // 宏任务 - Node.js 环境
//     setImmediate(flushCallbacks)
//   } else {
//     // 宏任务 - 兜底方案
//     setTimeout(flushCallbacks, 0)
//   }
// }

// export function nextTick(cb) {
//   callbacks.push(() => {
//     if (cb) {
//       cb()
//     }
//   })

//   if (!pending) {
//     pending = true
//     timerFunc()
//   }
// }

//讲一下vue组件传值

// props emits  provide  inject  eventBus  vuex  $ref  Pinia

//  怎么操作token 如何处理token过期
// 操作token
//1储存在localStorage
// 处理token过期
// 方法1
//1.解析JWT 获取过期时间
//2.当前时间  > 过期时间  token过期

// 方法2
// 在请求拦截器里面 在请求之前调用token过期接口来判断token是否过期

// v-model 的原理

// v-model 是props 和emit 的语法糖  主要是value 和input事件的结合

//讲一下性能优化
// 1 资源压缩和合并
// 2图片懒加载
// 组件懒加载
// 路由懒加载
// 缓存组件
// 压缩与缓存：Vite 生产构建自动 gzip/brotli，结合 CDN 和浏览器缓存。 gzip 压缩
// v-for key避免使用index  频繁切换使用v-show

//如何配置如何配置Nginx 都干啥了
// 功能	作用	配置示例
// 静态文件服务	托管 HTML/CSS/JS 文件	root /var/www/html
// 反向代理	转发请求到后端服务	proxy_pass http://backend
// 负载均衡	分发请求到多个服务器	upstream 配置
// SSL 终止	处理 HTTPS 加密解密	ssl_certificate 配置
// 缓存	缓存静态资源和 API 响应	proxy_cache 配置
// 压缩	Gzip 压缩减少传输大小	gzip on
// 限流	防止恶意请求和 DDoS	limit_req_zone
// 重写	URL 重写和重定向	rewrite 规则


//虚拟dom的原理

//虚拟dom就是JavaScript 对象   Vue 通过虚拟 DOM 实现高效的声明式渲染和差异化更新。

// 生成 VNode：通过 render 函数（h 函数）返回 VNode 树。模板会被编译成 render 函数。
// 首次渲染（Mount）：遍历 VNode 树创建真实 DOM。
// 更新（Update）：数据变化 → 重新执行 render 生成新 VNode 树 → Diff 比较旧树 → Patch 只更新变化部分

//做过哪些架构方向的事情
//技术选型  组件封装  路由配置  构建工具的配置  项目文档

// 微前端路由是如何配置的

// 层级	职责	配置方式
// 主应用路由	应用级路由分发	registerMicroApps
// 子应用路由	页面级路由管理	Vue Router/React Router
// 路由守卫	权限控制和拦截	beforeEach/canActivate
// 状态同步	跨应用状态共享	Global State

// URL变化 → 主应用路由匹配 → 激活对应微应用 → 子应用内部路由 → 渲染页面
// 微前端路由通过主应用统一管理应用级路由，各子应用独立管理内部路由，实现应用间的解耦和独立部署

// micro-app 路由特点
// 特性	说明	配置方式
// Web Components	基于自定义元素	<micro-app> 标签
// 路由同步	自动同步浏览器路由	baseroute 属性
// 数据通信	双向数据绑定	data 属性 + dispatch
// 沙箱隔离	自动 JS/CSS 隔离	内置沙箱机制
// 预加载	支持应用预加载	preFetchApps 配置

// 1. 零侵入 - 子应用无需修改
// 2. 自动路由同步 - 无需手动管理
// 3. 完善的沙箱 - 自动隔离
// 4. 简单易用 - 类似使用普通组件

// micro-app 通过 Web Components 技术，将微应用封装成自定义元素，实现了零侵入的微前端方案，路由配置简单直观。
