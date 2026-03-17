// ========================
// 开源中国二面
// ========================

// 一. 自我介绍
console.log("🎯 自我介绍");
/**
 * 您好，我叫 an31742，是一名前端开发工程师
 *
 * 技术栈：
 *   - 主要使用 Vue3 + TypeScript + Vite 进行项目开发
 *   - 熟悉 Element Plus、Pinia、Vue Router
 *   - 有 React + Next.js 全栈开发经验
 *   - 了解 Node.js 后端开发
 *   - 日常使用 AI 工具辅助开发，提升效率
 *
 * 项目经验：
 *   - 独立负责前端模块架构设计与开发
 *   - 实现过权限系统、拖拽排序、虚拟滚动等复杂功能
 *   - 有性能优化、工程化配置的实践经验
 */

// 二. 项目中遇到的问题及解决方案
console.log("🎯 项目问题与解决");
/**
 * 问题1：大列表渲染性能问题
 *   现象：渲染 10000 条数据时页面卡顿、白屏
 *   原因：一次性创建大量 DOM 节点，超出浏览器渲染能力
 *   解决：引入虚拟滚动，只渲染可视区域内的 DOM
 *   结果：渲染时间从 3s 降低到 200ms
 *
 * 问题2：组件间状态共享混乱
 *   现象：多层嵌套组件 props 传递繁琐，数据流向不清晰
 *   原因：缺乏统一的状态管理方案
 *   解决：引入 Pinia 统一管理，配合 pinia-plugin-persistedstate 做持久化
 *   结果：代码结构清晰，状态可追踪可调试
 *
 * 问题3：接口重复请求
 *   现象：用户快速点击按钮，同一接口被多次调用
 *   原因：没有对请求做防重处理
 *   解决：在 Axios 拦截器中用 AbortController 取消重复请求，配合防抖
 *   结果：避免了重复请求和数据竞争问题
 */

// AbortController 取消重复请求示例
const pendingMap = new Map();

function addPending(config) {
  const key = `${config.method}-${config.url}`;
  if (pendingMap.has(key)) {
    pendingMap.get(key).abort(); // 取消上一次相同请求
  }
  const controller = new AbortController();
  config.signal = controller.signal;
  pendingMap.set(key, controller);
}

function removePending(config) {
  const key = `${config.method}-${config.url}`;
  pendingMap.delete(key);
}

// 三. 复杂需求的解决思路
console.log("🎯 复杂需求解决思路");
/**
 * 1. 拆解需求：将复杂需求拆分为独立的小模块，逐一分析可行性
 * 2. 技术调研：查阅文档、社区方案，评估不同实现方式的成本与风险
 * 3. 原型验证：先用最简单的方式跑通核心流程，验证方向正确
 * 4. 迭代开发：分阶段实现，每阶段完成后测试，及时发现问题
 * 5. 复盘总结：完成后记录遇到的坑和解决方案，沉淀为团队经验
 *
 * 实际案例：实现可拖拽排序的树形表格
 *   - 拆解：拖拽逻辑 + 树形数据结构 + 排序更新接口
 *   - 调研：对比 vuedraggable、@dnd-kit/sortable 等方案
 *   - 原型：先实现平铺列表拖拽，再扩展到树形结构
 *   - 难点：跨层级拖拽时父子关系的更新，通过递归遍历树节点解决
 */

// 四. 任务队列：宏任务与微任务执行机制
console.log("🎯 任务队列执行机制");
/**
 * 执行规则：
 *   同步代码 → 清空所有微任务 → 执行一个宏任务 → 清空所有微任务 → 执行下一个宏任务 → ...
 *
 * 宏任务（Macrotask）：setTimeout、setInterval、I/O、UI渲染
 * 微任务（Microtask）：Promise.then、queueMicrotask、MutationObserver
 */

// 场景1：宏任务里面有微任务，接下来执行什么？
// 答：执行完该宏任务后，立即清空微任务队列，再执行下一个宏任务
console.log("--- 场景1：宏任务中包含微任务 ---");
console.log("1"); // 同步

setTimeout(() => {
  console.log("2"); // 宏任务1 执行
  Promise.resolve().then(() => console.log("3")); // 宏任务1 内的微任务 → 宏任务1结束后立即执行
}, 0);

setTimeout(() => {
  console.log("4"); // 宏任务2 → 等微任务3执行完才轮到它
}, 0);

console.log("5"); // 同步
// 输出顺序：1 → 5 → 2 → 3 → 4

// 场景2：微任务里面还有微任务，接下来执行什么？
// 答：新产生的微任务会追加到当前微任务队列末尾，继续在本轮清空，不会等到下一个宏任务
console.log("--- 场景2：微任务中嵌套微任务 ---");
Promise.resolve().then(() => {
  console.log("微任务1");
  Promise.resolve().then(() => {
    console.log("微任务1-1"); // 追加到微任务队列末尾，本轮继续执行
    Promise.resolve().then(() => console.log("微任务1-1-1"));
  });
  Promise.resolve().then(() => console.log("微任务1-2"));
});

Promise.resolve().then(() => console.log("微任务2"));

// 输出顺序：微任务1 → 微任务2 → 微任务1-1 → 微任务1-2 → 微任务1-1-1
// 关键：微任务队列会一直清空到空为止，期间新加入的微任务也会在本轮执行

// 五. 反问：前端配置 / 后端配置 / 语言
console.log("🎯 反问环节");
/**
 * 前端配置：
 *   - 构建工具用的是 Vite 还是 Webpack？
 *   - UI 组件库是统一规定还是自由选择？
 *   - 代码规范（ESLint/Prettier）是否有统一配置？
 *
 * 后端配置：
 *   - 后端是 Java、Go 还是 Node.js？
 *   - 接口文档用 Swagger 还是其他工具？
 *   - 前后端联调流程是怎样的？
 *
 * 语言：
 *   - 项目是否强制使用 TypeScript？
 *   - 是否有国际化（i18n）需求？
 */

// 六. React 经验 / Node.js / Next.js
console.log("🎯 React / Node.js / Next.js");
/**
 * React：
 *   - 使用过 React + Hooks 开发项目
 *   - 熟悉 useState、useEffect、useCallback、useMemo
 *   - 了解 Redux Toolkit / Zustand 状态管理
 *   - 与 Vue3 对比：React 更灵活，Vue3 更有约束，上手更快
 *
 * Node.js：
 *   - 了解 Node.js 基础，写过简单的 Express 接口
 *   - 用过 Node.js 做 BFF 层（Backend For Frontend）
 *   - 熟悉 npm/yarn/pnpm 包管理工具
 *
 * Next.js：
 *   - 了解 SSR（服务端渲染）和 SSG（静态生成）的区别和使用场景
 *   - SSR：每次请求时服务端渲染，适合数据实时性要求高的页面
 *   - SSG：构建时生成静态 HTML，适合内容不频繁变化的页面（如博客）
 *   - 有用 Next.js 搭建过全栈项目的经验
 */

// React Hooks 核心用法示例
// useState + useEffect 基础用法
function ExampleComponent() {
  // const [count, setCount] = useState(0);
  // useEffect(() => {
  //   document.title = `count: ${count}`;
  //   return () => { /* cleanup */ };
  // }, [count]);
}

// Next.js SSR vs SSG 对比
// SSR: export async function getServerSideProps(context) { ... }
// SSG: export async function getStaticProps() { ... }

// 七. AI 工具使用经验
console.log("🎯 AI 工具使用");
/**
 * 使用过的 AI 工具：
 *   1. GitHub Copilot：IDE 内代码补全，写重复性代码效率提升明显
 *   2. ChatGPT / Claude：解答技术问题、代码 review、方案设计
 *   3. Amazon Q：AWS 相关开发和 IDE 集成 AI 助手
 *   4. Cursor：AI 驱动的编辑器，支持多文件上下文理解和修改
 *
 * 主要使用场景：
 *   - 快速生成模板代码（如表单、表格、接口封装）
 *   - 排查 Bug：把报错信息和代码贴给 AI 分析原因
 *   - 学习新技术：让 AI 解释概念并给出示例
 *   - 代码重构：让 AI 提供优化建议
 *
 * 使用原则：
 *   - AI 生成的代码必须理解后再使用，不能盲目复制
 *   - 核心业务逻辑自己把控，AI 辅助提效而非替代思考
 */
