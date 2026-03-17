// ========================
// 开源中国一面
// ========================

// 一. 项目角色与技术栈
console.log("🎯 项目角色");
/**
 * 角色：前端开发工程师（独立负责前端模块）
 * 技术栈：
 *   - Vue3 + TypeScript + Vite 构建项目
 *   - Element Plus 组件库
 *   - Pinia 状态管理 + 持久化
 *   - Vue Router 路由管理 + 权限控制
 *   - Axios 封装请求拦截器/响应拦截器
 *   - SCSS 样式管理
 *   - vuedraggable 拖拽功能
 */

// 二. 数据类型
console.log("🎯 数据类型");
/**
 * 基础数据类型（存储在栈中）：
 *   number、string、boolean、undefined、null、symbol、bigint
 *
 * 引用数据类型（存储在堆中，栈中存引用地址）：
 *   object（包含 Array、Function、Date、RegExp 等）
 *
 * 区别：
 *   基础类型赋值是值拷贝，引用类型赋值是地址拷贝
 */
let a = 1;
let b = a;
b = 2;
console.log(a); // 1，互不影响

let obj1 = { x: 1 };
let obj2 = obj1;
obj2.x = 2;
console.log(obj1.x); // 2，共享同一引用

// 三. 事件循环
console.log("🎯 事件循环");
/**
 * JavaScript 是单线程语言，通过事件循环处理异步任务
 *
 * 组成：
 *   1. 调用栈（Call Stack）：执行同步代码
 *   2. 微任务队列（Microtask Queue）：Promise.then、queueMicrotask、MutationObserver
 *   3. 宏任务队列（Macrotask Queue）：setTimeout、setInterval、I/O
 *
 * 执行顺序：
 *   同步代码 → 清空微任务队列 → 执行一个宏任务 → 清空微任务队列 → 执行下一个宏任务 → ...
 */

// 四. 宏任务微任务运行顺序
console.log("🎯 宏任务微任务运行顺序");
console.log("1"); // 同步

setTimeout(() => console.log("2"), 0); // 宏任务

Promise.resolve().then(() => {
  console.log("3"); // 微任务
  setTimeout(() => console.log("4"), 0); // 宏任务
  Promise.resolve().then(() => console.log("5")); // 微任务
});

console.log("6"); // 同步
// 输出：1 → 6 → 3 → 5 → 2 → 4

// 五. Map 和 WeakMap 的区别
console.log("🎯 Map vs WeakMap");
/**
 * Map：
 *   - key 可以是任意类型
 *   - 强引用，key 不会被垃圾回收
 *   - 可迭代（for...of、forEach）
 *   - 有 size 属性
 *
 * WeakMap：
 *   - key 只能是对象（引用类型）
 *   - 弱引用，key 对象无其他引用时会被 GC 回收，防止内存泄漏
 *   - 不可迭代，没有 size 属性
 *   - 适合存储 DOM 节点、私有数据等
 */
const map = new Map();
map.set("key", "value"); // key 可以是字符串
map.set(1, "number key"); // key 可以是数字

const weakMap = new WeakMap();
let domNode = document.createElement("div");
weakMap.set(domNode, { data: "私有数据" });
domNode = null; // domNode 被 GC 回收，weakMap 中对应条目自动清除

// 六. Object 和 Map 的区别
console.log("🎯 Object vs Map");
/**
 * Object：
 *   - key 只能是 string 或 symbol
 *   - 有原型链，存在默认属性（如 toString）
 *   - 无序（ES2015+ 整数 key 会排序）
 *   - 无 size 属性，需 Object.keys().length
 *
 * Map：
 *   - key 可以是任意类型（对象、函数等）
 *   - 无原型链干扰，纯粹的键值对
 *   - 按插入顺序有序
 *   - 有 size 属性
 *   - 频繁增删场景性能更好
 *
 * 使用场景：
 *   - 需要非字符串 key → Map
 *   - 频繁增删 → Map
 *   - JSON 序列化 → Object
 *   - 简单数据结构 → Object
 */

// 七. 如何解决跨域
console.log("🎯 跨域解决方案");
/**
 * 跨域原因：浏览器同源策略（协议 + 域名 + 端口 必须相同）
 *
 * 解决方案：
 *
 * 1. CORS（最常用）：后端设置响应头
 *    Access-Control-Allow-Origin: *
 *    Access-Control-Allow-Methods: GET, POST, PUT, DELETE
 *
 * 2. 开发环境代理（Vite/Webpack）：
 *    vite.config.ts:
 *    server: {
 *      proxy: {
 *        '/api': {
 *          target: 'http://backend.com',
 *          changeOrigin: true,
 *          rewrite: (path) => path.replace(/^\/api/, '')
 *        }
 *      }
 *    }
 *
 * 3. Nginx 反向代理：生产环境常用
 *
 * 4. JSONP：只支持 GET，利用 script 标签不受同源限制（已过时）
 *
 * 5. postMessage：iframe 跨域通信
 */

// 八. 强缓存和协商缓存
console.log("🎯 强缓存 vs 协商缓存");
/**
 * 强缓存（不发请求，直接用缓存）：
 *   - Expires：绝对时间（HTTP/1.0，受客户端时间影响）
 *   - Cache-Control: max-age=3600（相对时间，优先级更高）
 *   - 状态码：200（from cache）
 *
 * 协商缓存（发请求，服务端判断是否使用缓存）：
 *   - Last-Modified / If-Modified-Since：文件修改时间（精度秒级）
 *   - ETag / If-None-Match：文件内容哈希（精度更高，优先级更高）
 *   - 状态码：304（Not Modified）使用缓存 / 200 返回新资源
 *
 * 决定因素：
 *   响应头中的 Cache-Control、Expires、ETag、Last-Modified
 *
 * 执行顺序：
 *   强缓存（Cache-Control > Expires）→ 协商缓存（ETag > Last-Modified）
 */

// 九. HTTP 状态码
console.log("🎯 HTTP 状态码");
/**
 * 1xx 信息性：
 *   100 Continue - 继续发送请求
 *
 * 2xx 成功：
 *   200 OK - 请求成功
 *   201 Created - 资源创建成功
 *   204 No Content - 成功但无返回内容
 *
 * 3xx 重定向：
 *   301 Moved Permanently - 永久重定向（浏览器缓存新地址）
 *   302 Found - 临时重定向
 *   304 Not Modified - 协商缓存命中
 *
 * 4xx 客户端错误：
 *   400 Bad Request - 请求参数错误
 *   401 Unauthorized - 未认证（需要登录）
 *   403 Forbidden - 无权限
 *   404 Not Found - 资源不存在
 *   405 Method Not Allowed - 请求方法不允许
 *
 * 5xx 服务端错误：
 *   500 Internal Server Error - 服务器内部错误
 *   502 Bad Gateway - 网关错误
 *   503 Service Unavailable - 服务不可用
 */

// 十. Vue2 和 Vue3 的原理
console.log("🎯 Vue2 vs Vue3 响应式原理");
/**
 * Vue2：Object.defineProperty
 *   - 递归遍历对象，对每个属性设置 getter/setter
 *   - 缺陷：
 *     1. 无法检测新增/删除属性（需要 Vue.set / Vue.delete）
 *     2. 无法检测数组下标变化（需要重写数组方法）
 *     3. 初始化时递归遍历，性能开销大
 *
 * Vue3：Proxy
 *   - 代理整个对象，拦截所有操作（get、set、deleteProperty 等）
 *   - 优势：
 *     1. 可以检测新增/删除属性
 *     2. 可以检测数组下标变化
 *     3. 懒代理（访问时才递归），性能更好
 *     4. 支持 Map、Set、WeakMap 等数据结构
 */

// Vue2 模拟
function defineReactive(obj, key, val) {
  Object.defineProperty(obj, key, {
    get() {
      console.log("get", key);
      return val;
    },
    set(newVal) {
      console.log("set", key, newVal);
      val = newVal;
    },
  });
}

// Vue3 模拟
function reactive(obj) {
  return new Proxy(obj, {
    get(target, key) {
      console.log("get", key);
      return Reflect.get(target, key);
    },
    set(target, key, value) {
      console.log("set", key, value);
      return Reflect.set(target, key, value);
    },
    deleteProperty(target, key) {
      console.log("delete", key);
      return Reflect.deleteProperty(target, key);
    },
  });
}

// 十一. Webpack 热更新原理（HMR）
console.log("🎯 Webpack HMR 原理");
/**
 * Hot Module Replacement（模块热替换）
 *
 * 流程：
 *   1. 启动时，Webpack 与浏览器建立 WebSocket 连接
 *   2. 文件变化时，Webpack 重新编译变化的模块
 *   3. 编译完成后，通过 WebSocket 推送 hash 给浏览器
 *   4. 浏览器收到通知，发送 AJAX 请求获取更新的模块列表（manifest）
 *   5. 再通过 JSONP 请求获取新的模块代码（chunk）
 *   6. HMR Runtime 用新模块替换旧模块，不刷新整个页面
 *
 * 关键模块：
 *   - webpack-dev-server：提供 HTTP 服务 + WebSocket
 *   - HotModuleReplacementPlugin：生成 HMR Runtime
 *   - module.hot.accept()：模块声明接受热更新
 *
 * 与 Vite HMR 的区别：
 *   - Vite 基于原生 ESM，无需打包，直接替换变化的模块，速度更快
 *   - Webpack 需要重新编译模块，速度相对较慢
 */

// 十二. 遇到的困难及解决方案
console.log("🎯 遇到的困难");
/**
 * 困难1：大列表渲染性能问题
 *   问题：渲染 10000 条数据时页面卡顿
 *   解决：使用虚拟滚动（vue-virtual-scroller），只渲染可视区域的 DOM
 *   结果：渲染时间从 3s 降低到 200ms
 *
 * 困难2：组件间状态共享混乱
 *   问题：多层组件嵌套，props 传递繁琐，状态难以维护
 *   解决：引入 Pinia 统一管理状态，配合 pinia-plugin-persistedstate 持久化
 *   结果：代码结构清晰，状态可追踪
 *
 * 困难3：接口请求重复发送
 *   问题：用户快速点击导致同一接口多次请求
 *   解决：封装防抖 + 请求取消（AbortController），在 Axios 拦截器中处理
 *   结果：避免了重复请求和数据竞争问题
 */
