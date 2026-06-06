# 高级前端 + AI应用工程师 · 12周强化版（每日细节执行手册）
> 本计划以你提供的 12 周框架为骨架，从原 7 个月融合版中提取所有“学、做、写”细节动作，并补充 Vue 源码、微前端、架构设计等缺失的动手环节。  
拿到手就能直接开始，每天都有明确的输入、输出和产出物。
>

## 第 1 周：React 渲染机制 + Vue 响应式
**主线**：理解两套框架更新机制，能画出核心链路图。

| 天数 | React线 | Vue线 | 每日细节动作 | 产出物 |
| --- | --- | --- | --- | --- |
| **Day1** | React 渲染流程 | Vue3 响应式整体架构 | **React**：在 Todo 项目每个组件函数首行加 `console.log('render', 组件名)`，操作页面记录打印顺序；用 200 字总结“一个 setState 调用后发生了什么”。   **Vue**：学习 `reactive()` 用 Proxy 拦截 get/set，手写 30 行简化版 `reactive`，理解 track/trigger 调用时机。 | 渲染顺序日志、简化 reactive 代码 |
| **Day2** | Hooks 链表机制 | effect、track、trigger | **React**：学习 React 用链表存储 hooks，故意在 if 中调用 useState 观察报错，画出 hooks 链表与组件对应图。   **Vue**：阅读 Vue3 `effect` 函数核心逻辑，手写一个 `effect` 函数，实现数据变了自动执行副作用。 | hooks 链表图、简易 effect 实现 |
| **Day3** | useEffect 原理 | watch、watchEffect | **React**：写一个缺少依赖的 useEffect 让它死循环，再用正确方式修复；写一个带定时器的组件观察 cleanup 时机；总结“什么场景下 useEffect 会死循环”。   **Vue**：实现 watch 和 watchEffect，对比其依赖收集方式；用 Vue 重写 React 的定时器例子观察清理。 | useEffect 避坑笔记、watch vs watchEffect 对比 |
| **Day4** | useMemo、useCallback | computed 源码 | **React**：在项目中找一处计算开销大的地方，用 useMemo 包裹，再用 Profiler 对比前后渲染次数；给子组件加 React.memo，回调用 useCallback 包裹，记录优化前后渲染次数变化。   **Vue**：阅读 computed 的源码实现（缓存与依赖追踪），手写一个简化版 computed，理解其惰性求值。 | 优化前后对比表、简化 computed 代码 |
| **Day5** | React.memo | ref、reactive 源码 | **React**：验证 React.memo 的浅比较行为，故意传入每次都重建的对象作为 props 观察是否跳过渲染；总结 React.memo 生效条件。   **Vue**：深入 ref 和 reactive 源码区别，手写 ref 简易实现（对象包装 + getter/setter），理解 .value 的必要性。 | memo 用法指南、手写 ref 代码 |
| **Day6** | React DevTools Profiler | scheduler 调度入口 | **React**：用 Profiler 录制一段 Todo 操作，找出渲染次数最多的组件，用 memo/useMemo 优化，重新录制，输出“我的项目性能优化报告”。   **Vue**：了解 Vue3 scheduler 的任务队列机制，写一个例子观察多次修改数据后 DOM 更新次数，理解异步批处理。 | 性能优化报告、批处理验证 Demo |
| **Day7** | React Diff 算法 | Vue Patch 算法 | **React**：学习 Diff 三原则，用 index 做 key 的列表组件故意增删项观察状态错乱，改用稳定 id 修复；总结 key 的作用。   **Vue**：学习 Vue 的 patch 算法（双端对比），对比 React Diff 的异同，画出简单对比流程图。 | Diff 对比笔记、key 的 bug 复现截图 |
| **周产出** | 《React vs Vue 更新机制对比》——必须包含自己动手的示例和渲染分析 |  |  |  |


## 第 2 周：React Fiber + Vue 高级源码
**主线**：深入运行时调度，能画出 Fiber 树和 Vue 依赖图。

| 天数 | React线 | Vue线 | 每日细节动作 | 产出物 |
| --- | --- | --- | --- | --- |
| **Day8** | Fiber 架构 | ReactiveEffect 源码 | **React**：学习 Fiber 链表结构、双缓冲树，手绘一张包含 effectTag 的简易 Fiber 树；解释“为什么 React 可以中断渲染”。   **Vue**：阅读 ReactiveEffect 源码（run、stop、active 等），手写一个可停止的 effect 函数。 | 手绘 Fiber 树、可停止 effect |
| **Day9** | Fiber 节点结构 | Dep 依赖管理 | **React**：阅读源码中 FiberNode 的类型定义，用 TypeScript 写一个简化的 Fiber 节点接口，理解 child/sibling/return 链表关系。   **Vue**：画出一个组件实例的 Dep → Watcher（effect）的依赖关系图，理解 cleanupDeps 如何防止内存泄漏。 | Fiber 节点定义、依赖图 |
| **Day10** | Render 阶段 | Scheduler 源码 | **React**：了解 Render 阶段“可中断的遍历”流程，阅读 scheduleUpdateOnFiber 核心代码，写一段伪代码描述 Render 阶段工作循环。   **Vue**：阅读 Vue3 scheduler 实现（用微任务 queueJob），手写一个简版调度器，理解为什么 Vue 不需要 Fiber 那种复杂调度。 | 伪代码、简版调度器 |
| **Day11** | Commit 阶段 | Job 队列 | **React**：学习 Commit 三子阶段（BeforeMutation/Mutation/Layout），画一张 Commit 流程图；写出 useLayoutEffect 与 useEffect 的执行时机差异。   **Vue**：理解 pre、sync、normal 队列执行顺序，写一个同时使用 watchEffect（flush: 'post'）和 nextTick 的例子，验证执行顺序。 | Commit 流程图、队列验证 Demo |
| **Day12** | 批量更新机制 | nextTick 源码 | **React**：在事件处理中连续调用多次 setState，观察渲染次数；对比 setTimeout 中的行为；解释 React 18 自动批处理。   **Vue**：阅读 nextTick 源码（Promise.then 优先），在 Vue 项目中修改 ref 值后立刻读取 DOM（发现旧值），再用 nextTick 获取新值；对比 React 的 flushSync。 | 批处理验证、nextTick 源码笔记 |
| **Day13** | Concurrent 并发模式 | Vue 异步更新机制 | **React**：使用 startTransition 标记非紧急更新，观察 Suspense fallback 的出现时机，理解并发模式的优劣。   **Vue**：学习 Vue3 的异步更新队列与 effect 调度，对比 React 并发模式的设计哲学，写总结。 | 并发模式 Demo、对比总结 |
| **Day14** | Fiber 总结 | Vue 源码总结 | 综合复习，手写一篇《React Fiber 与 Vue Scheduler 的调度机制深度对比》，包含动手实验的代码片段。 | 深度对比文章 |
| **周产出** | 《React Fiber 与 Vue 调度机制对比》 + 手绘多张流程图 |  |  |  |


## 第 3 周：浏览器底层 + Vue 状态管理补充
**主线**：吃透浏览器 Event Loop、缓存，并补完 Pinia 和 KeepAlive 源码。

| 天数 | 浏览器线 | Vue补充线 | 每日细节动作 | 产出物 |
| --- | --- | --- | --- | --- |
| **Day15** | Event Loop | nextTick 与 Event Loop 的关系 | **浏览器**：写一组 setTimeout + Promise + queueMicrotask 组合，预测输出顺序，用 Performance 面板录制验证。   **Vue**：分析 nextTick 如何利用微任务队列，与浏览器 Event Loop 挂钩。 | Event Loop 时序图 |
| **Day16** | 宏任务微任务 | Vue 更新时机 | **浏览器**：深入区分宏任务（setTimeout、事件回调）、微任务（Promise、MutationObserver），写代码验证一个宏任务结束后立即清空微任务。   **Vue**：理解 Vue3 在一个微任务里批量执行组件更新，写一个例子观察多次数据变化如何合并为一次 DOM 更新。 | 任务执行顺序验证截图 |
| **Day17** | 浏览器缓存 | KeepAlive 源码 | **浏览器**：学习强缓存和协商缓存机制；在 Next.js 项目中配置不同页面的 Cache-Control，用 Network 面板观察命中。   **Vue**：阅读 Vue KeepAlive 组件源码，理解其缓存策略（LRU、cache map），手写一个简化版缓存管理器。 | 缓存策略指南、简化 KeepAlive |
| **Day18** | Cookie | Pinia 设计思想 | **浏览器**：学习 Cookie 的 SameSite、HttpOnly 等属性，写一个登录后设置 Cookie 并读取的 Node.js + 前端示例。   **Vue**：理解 Pinia 的设计哲学（去 mutations、组合式 API、扁平模块），对比 Vuex 画出 Pinia 架构图。 | Cookie 安全笔记、Pinia 架构图 |
| **Day19** | LocalStorage | Pinia 核心 API | **浏览器**：对比 Cookie、LocalStorage、SessionStorage 的异同，并写一个封装：自动序列化/反序列化的 localStorage 工具。   **Vue**：阅读 defineStore 的核心代码，理解其如何利用 effectScope 管理响应式，手写一个极简版 defineStore。 | localStorage 工具、极简 defineStore |
| **Day20** | Service Worker | Pinia 源码阅读 | **浏览器**：注册一个 Service Worker，缓存静态资源实现离线访问；理解 Cache API。   **Vue**：深入 Pinia 的 $ patch、 $subscribe 实现，在项目中实验，写一篇 Pinia 源码阅读笔记。 | 离线 Demo、Pinia 源码笔记 |
| **Day21** | 浏览器总结 | Vue 状态管理总结 | 综合整理，写《浏览器核心原理与 Vue 状态管理实战》文章，涵盖缓存、Event Loop、Pinia 源码要点。 | 综合文章 |
| **周产出** | 《浏览器核心原理与 Vue 状态管理实战》 |  |  |  |


## 第 4 周：Node.js + 服务端
**主线**：掌握 Event Loop、中间件、JWT、Redis 与 BFF 架构设计。

| 天数 | Node线 | 架构线 | 每日细节动作 | 产出物 |
| --- | --- | --- | --- | --- |
| **Day22** | Event Loop | BFF 架构 | **Node**：写 setTimeout、Promise、nextTick 混合代码，画出 Node 六阶段图，解释 poll、check 阶段。   **架构**：画一张客户端 → BFF → 微服务/AI 服务架构图，说明 BFF 职责。 | Node Event Loop 图、BFF 架构图 |
| **Day23** | Express 中间件 | 洋葱模型 | **Node**：写几个 Express 中间件，用 await 测试执行顺序；实现请求计时和日志中间件；画出洋葱模型图，标注 next()。 | 中间件执行日志、洋葱模型图 |
| **Day24** | JWT | 登录体系 | **Node**：实现注册登录接口，生成 accessToken 和 refreshToken，画出登录流程图；讨论 Token 存放位置与 CSRF 防御。 | 登录流程图、代码 |
| **Day25** | Refresh Token | 鉴权设计 | **Node**：实现无感刷新 token，前端 axios 拦截器配合，后端验证 refreshToken 并返回新 Token。 | 刷新 Token 逻辑代码 |
| **Day26** | Redis 基础 | 缓存设计 | **Node**：用 ioredis 实现 Token 黑名单，设计 key 结构，测试过期策略；总结 Redis 五种基本类型及应用。 | Redis 基础笔记 |
| **Day27** | Redis 缓存实战 | AI 会话缓存 | **Node**：设计 AI 对话缓存模型（如 `session:{id}:messages`），实现会话恢复接口，为后续项目打底。 | 会话缓存方案 |
| **Day28** | Node 总结 | 服务端架构总结 | 重构现有 Node 项目，加上 JWT 守卫、Redis 缓存、BFF 聚合，形成服务端骨架；写《前端如何理解服务端架构——从 BFF 到 AI 接口》。 | 重构骨架、架构文章 |
| **周产出** | 《前端如何理解服务端架构——从 BFF 到 AI 接口》 + 完整代码仓库 |  |  |  |


## 第 5 周：工程化
**主线**：真正动手写 Loader/Plugin，分析打包产物。

| 天数 | 工程化线 | 实践 | 每日细节动作 | 产出物 |
| --- | --- | --- | --- | --- |
| **Day29** | Vite 原理 | Vite 项目分析 | 学 ESModule 开发服务器，冷启动对比 Webpack；画 HMR 原理图；写一篇“Vite 为什么快”。 | HMR 原理图 |
| **Day30** | ESModule | 模块拆分 | 在自己的项目中拆分模块，理解静态导入导出，对比 CommonJS 动态行为，验证 Tree Shaking 基础。 | 模块拆分验证 |
| **Day31** | Webpack Loader | Loader 实战 | 手写一个简单的 loader（如给所有 js 文件加注释），理解 this.cacheable 等上下文。 | 自定义 loader |
| **Day32** | Plugin 机制 | Plugin 开发 | 了解 tapable 钩子，写一个输出文件大小和 gzip 后大小的 plugin。 | 自定义 plugin |
| **Day33** | Tree Shaking | 包体积优化 | 在组件库中标记 sideEffects，验证未使用代码是否被删除；总结 Tree Shaking 生效条件。 | Tree Shaking 笔记 |
| **Day34** | Chunk 拆分 | 路由拆包 | 配置 splitChunks，使用 webpack-bundle-analyzer 分析项目，输出优化建议，前后对比体积和加载时间。 | 打包分析报告 |
| **Day35** | 工程化总结 | React 项目优化 | 对 Todo 项目做一次完整的构建优化，并迁移到 Vite（如果原来是 CRA）；写《现代前端构建工具深度对比》。 | 构建优化报告 |
| **周产出** | 《现代前端构建工具深度对比》 + 自定义 loader/plugin 代码 |  |  |  |


## 第 6 周：Next.js
**主线**：SSR → Hydration → RSC → Streaming，实现流式 AI 聊天前端雏形。

| 天数 | Next线 | 实践 | 每日细节动作 | 产出物 |
| --- | --- | --- | --- | --- |
| **Day36** | SSR 原理 | Next 项目分析 | 在页面加 `console.log('server')` 和 `console.log('client')`，分别在终端和浏览器观察；画出 SSR 时序图。 | SSR 时序图 |
| **Day37** | Hydration | Hydration 错误实战 | 故意写一个用 `Math.random()` 的组件制造水合错误，再用 useEffect 修复；总结常见水合错误原因。 | 错误复现和修复笔记 |
| **Day38** | Server Component | 服务端组件改造 | 将现有 Client 组件改为 Server Component，把状态和事件抽离到 Client 子组件；列出 RSC 的约束清单。 | RSC 约束清单 |
| **Day39** | Route Handler | API 开发 | 在 App Router 中写 Route Handler，连接数据库查询，实现一个完整的 CRUD 接口。 | API 实现代码 |
| **Day40** | Server Action | 表单提交 | 用 Server Action 实现带校验的表单，对比 Route Handler 方式，总结适用场景。 | Server Action 案例 |
| **Day41** | Streaming | 流式输出 Demo | 用 Route Handler 返回 ReadableStream，模拟 AI token 推送；前端用 fetch + reader 实现打字机效果。 | 流式 Demo |
| **Day42** | Next 总结 | Next 项目总结 | 写《Next.js 服务端渲染到底做了什么》，涵盖 Hydration、RSC、Streaming，并集成到本周的流式 Demo 中。 | 文章 + Demo |
| **周产出** | 《Next.js 服务端渲染到底做了什么》 + 流式 AI 聊天前端原型 |  |  |  |


## 第 7 周：组件设计 + 架构设计
**主线**：封装高质量组件，攻克架构设计题。

| 天数 | 组件设计 | 架构设计 | 每日细节动作 | 产出物 |
| --- | --- | --- | --- | --- |
| **Day43** | 组件封装原则 | 分层设计 | 学习单一职责、开闭原则，重构 Todo 项目的按钮组件，使其支持 loading、disabled 等。画中后台分层架构图。 | 重构组件、分层图 |
| **Day44** | Form 组件设计 | 中后台架构 | 封装一个支持校验、嵌套字段的 Form 组件（受控模式），设计一个中后台项目的路由与权限模型。 | Form 组件、权限模型图 |
| **Day45** | Table 组件设计 | 权限体系 | 封装一个可排序、筛选、分页的 Table 组件；实现一个简易的 RBAC 权限模型（页面级 + 按钮级）。 | Table 组件、权限 Demo |
| **Day46** | Hooks 设计 | 状态管理设计 | 设计 useRequest（自动 loading/error）、usePolling 等自定义 Hook；画一个前端全局状态管理设计方案（Context + reducer 或 Zustand）。 | 自定义 Hook 库、状态方案图 |
| **Day47** | 弹窗体系设计 | 通信设计 | 实现一个可堆叠、可传参的弹窗管理器（如 useModal），支持 confirm、form 弹窗；设计组件间通信方案（EventBus vs Context vs 状态提升）。 | 弹窗管理器、通信对比 |
| **Day48** | 组件库设计 | Monorepo | 用 pnpm + Turborepo 初始化一个简易组件库骨架，包含文档站点（Storybook），学会用 changeset 管理版本。 | 组件库骨架 |
| **Day49** | 总结 | 架构设计题总结 | 完成 5 道高频架构设计题简案（大文件上传、前端监控、低代码引擎、微前端方案、实时协同编辑），每题画出架构图 + 关键选型 + 300 字描述。 | 5 份架构简案 |
| **周产出** | 组件库骨架 + 5 份架构设计题简案 |  |  |  |


## 第 8 周：AI 基础 + AI 项目 V1 启动
**主线**：补完 AI 基础概念，同时启动“AI 智能面试训练平台” MVP。

| 天数 | AI学习 | AI项目 (V1) | 每日细节动作 | 产出物 |
| --- | --- | --- | --- | --- |
| **Day50** | Prompt 工程 | 项目需求分析 | **AI**：在 OpenAI Playground 调试 System/User/Assistant 消息，总结 Prompt 原则（角色、格式、约束）。   **项目**：确定项目技术栈（Next.js + Node.js + PostgreSQL），用 Excalidraw 画出核心页面流程图。 | Prompt 文档、页面流程图 |
| **Day51** | Token 机制 | 数据库设计 | **AI**：用 tokenizer 计算不同文本 token 数，理解上下文窗口限制。   **项目**：设计用户表、简历表、面试记录表等，编写 Prisma Schema 并 migrate。 | Token 笔记、数据库 Schema |
| **Day52** | Embedding | 项目初始化 | **AI**：调用 OpenAI Embedding API 生成几段文本向量，计算余弦相似度，理解语义搜索。   **项目**：用 create-next-app 初始化项目，配置 Tailwind、ESLint，完成基础布局。 | 向量相似度 Demo、项目骨架 |
| **Day53** | RAG 原理 | 登录注册 | **AI**：手动实现一个小 RAG：加载长文本 → 分割 → 存本地向量 → 检索回答。   **项目**：实现 JWT 登录注册接口，前端表单，完成页面路由保护。 | 最小 RAG Demo、登录功能 |
| **Day54** | Function Calling | 简历上传 | **AI**：定义一个获取天气的函数，让 GPT 决定调用时机，画出执行流程。   **项目**：实现文件上传（Multer 或直接存云），前端拖拽上传简历 PDF，解析文本。 | Function Calling Demo、上传功能 |
| **Day55** | Agent 概念 | AI 接口封装 | **AI**：理解 Agent 的“思考→行动→观察”循环，用 LangChain 简单 Agent 跑通。   **项目**：封装调用 OpenAI API 的 service 层，实现一个简易的文本分析接口。 | Agent 笔记、API 封装 |
| **Day56** | AI 基础总结 | MVP V1 完成 | 连接所有功能：用户注册 → 登录 → 上传简历 → 调用 AI 分析 → 保存结果到数据库。写《AI 应用工程师必须理解的 5 个概念》。 | V1 可运行版本 + 概念文章 |
| **V1 功能** | 登录、注册、上传简历、AI 简历分析 |  |  |  |


## 第 9 周：LangChain + 项目核心 V2
**主线**：用 LangChain 构建核心面试逻辑。

| 天数 | LangChain | AI项目 (V2) | 每日细节动作 | 产出物 |
| --- | --- | --- | --- | --- |
| **Day57** | ChatModel | 简历分析 Agent | **AI**：学习 ChatOpenAI 的使用，对比 prompt 与 chat model 区别。   **项目**：将简历分析升级为 Agent，可调用工具获取补充信息。 | 简历分析 Agent |
| **Day58** | PromptTemplate | JD 分析 | **AI**：学习 PromptTemplate 变量注入，创建几个可复用的模板。   **项目**：实现输入 JD 文本，AI 解析出技能要求、职责关键点并结构化展示。 | JD 分析功能 |
| **Day59** | Chain | 面试题生成 | **AI**：学习 SequentialChain、RouterChain 等。   **项目**：基于简历+JD，用 Chain 生成个性化面试题（技术题+行为题），存入题库。 | 面试题生成 Chain |
| **Day60** | Tool | 题库管理 | **AI**：自定义一个 Tool，查询已生成的题库。   **项目**：实现题库的增删改查页面，支持分类、标签。 | 题库管理页面 |
| **Day61** | Memory | 历史记录 | **AI**：学习 ConversationBufferMemory 等，理解窗口限制。   **项目**：实现面试历史记录页面，查看过往分析报告和对话。 | 历史记录功能 |
| **Day62** | RAG | 知识库 | **AI**：用 LangChain 的 Document loaders + vectorstores 构建知识库。   **项目**：上传技术文档或面试经验文档，实现基于知识库的问答，丰富面试题来源。 | 知识库问答功能 |
| **Day63** | 总结 | V2 完成 | 集成测试，确保简历分析→JD 分析→生成题目→知识库查询链路跑通。写《LangChain 核心概念与实战笔记》。 | V2 可运行版本 + 文章 |
| **V2 功能** | 简历分析、JD 分析、面试题生成、RAG 知识库 |  |  |  |


## 第 10 周：LangGraph + MCP，项目 V3
**主线**：让面试流程变成可控的状态图，并集成 MCP 外部工具。

| 天数 | AI工作流 | AI项目 (V3) | 每日细节动作 | 产出物 |
| --- | --- | --- | --- | --- |
| **Day64** | LangGraph 基础 | 面试流程设计 | **AI**：学习 StateGraph、Node、Edge 概念，用 LangGraph 画一个简单的流程图。   **项目**：设计面试状态图：开始→自我介绍→技术问答→追问循环→行为面试→结束。 | 面试状态图 |
| **Day65** | StateGraph | 节点设计 | **AI**：定义状态类型，实现节点的输入输出。   **项目**：实现“提问节点”和“评估答案节点”，使用 LLM 判断回答质量。 | 基础面试图实现 |
| **Day66** | 条件路由 | 动态追问 | **AI**：学习 conditional_edges，根据状态决定下一步。   **项目**：如果回答不完整或需要深挖，自动路由到追问节点，生成更深层问题。 | 动态追问逻辑 |
| **Day67** | MCP 概念 | MCP 工具接入 | **AI**：理解 MCP 协议 (Host/Client/Server)，类比 USB-C 统一接口。   **项目**：用 TypeScript 搭建一个简单的 MCP Server（提供岗位信息查询）。 | MCP Server 原型 |
| **Day68** | MCP Client | 岗位搜索 | **AI**：在面试系统中引入 MCP Client，通过标准协议连接 Server 获取实时岗位数据。   **项目**：面试过程中可根据岗位要求实时提问。 | MCP 集成 |
| **Day69** | MCP Server | 知识库查询 | **AI**：把已有的知识库包装成 MCP Server 工具，提供标准接口。   **项目**：MCP Server 能够返回相关知识点。 | 知识库 MCP Server |
| **Day70** | 总结 | V3 完成 | 完成一个完整的 AI 模拟面试：状态图驱动，含追问，并能调用 MCP 外部工具。写《用 LangGraph 和 MCP 设计复杂 AI 工作流》。 | V3 可运行版本 + 文章 |
| **V3 功能** | AI 面试官、动态追问、MCP 工具调用、多轮对话 |  |  |  |


## 第 11 周：微前端 + AI 项目架构升级 V4
**主线**：给项目加上企业级架构特性，融入微前端思想（可拆分模块）。

| 天数 | 微前端 | AI项目 (V4) | 每日细节动作 | 产出物 |
| --- | --- | --- | --- | --- |
| **Day71** | 微前端原理 | 项目架构升级 | **微前端**：学习微前端核心价值，理解 JS 沙箱和样式隔离的必要性。   **项目**：将面试系统拆分为“用户模块”“面试模块”“报告模块”等独立子包或微应用结构。 | 架构拆分图 |
| **Day72** | qiankun | BFF 接入 | **微前端**：用 qiankun 搭建主应用 + 两个子应用 Demo，理解 HTML Entry 加载方式。   **项目**：让后端提供 BFF 层，聚合各模块所需数据，实现一个聚合接口。 | qiankun Demo、BFF 接口 |
| **Day73** | 沙箱隔离 | Redis 缓存 | **微前端**：理解 JS 沙箱（Proxy 隔离 window）和快照沙箱。   **项目**：对面试会话数据全面引入 Redis 缓存，提高响应速度。 | 沙箱笔记、Redis 集成 |
| **Day74** | 样式隔离 | AI 会话管理 | **微前端**：学习 Shadow DOM 和 CSS Modules 等隔离方案。   **项目**：实现多会话切换与会话过期自动清理，UI 骨架屏优化。 | 样式隔离方案、会话管理优化 |
| **Day75** | 通信机制 | PostgreSQL | **微前端**：实现主应用到子应用的状态下发（props/EventBus）。   **项目**：将数据库全面迁移到 PostgreSQL，并设计更合理的关系模型（用户-简历-面试-评分）。 | 通信 Demo、数据模型升级 |
| **Day76** | 手写沙箱 | 权限系统 | **微前端**：手写一个简易 Proxy 沙箱，隔离全局变量。   **项目**：实现 RBAC 权限，区分管理员和普通用户，保护面试数据。 | 手写沙箱、权限功能 |
| **Day77** | 总结 | V4 完成 | 架构升级后的完整联调；写《微前端落地实践与 AI 项目架构演进》。 | V4 企业级版本 + 文章 |
| **V4 功能** | Redis 缓存、PostgreSQL、BFF 层、权限管理 |  |  |  |


## 第 12 周：项目包装 + 面试准备
**主线**：把项目打磨成面试作品，准备好所有表达素材。

| 天数 | 项目包装 | 面试准备 | 每日细节动作 | 产出物 |
| --- | --- | --- | --- | --- |
| **Day78** | README 编写 | 项目介绍 | 写出包含项目背景、技术栈、核心功能、架构图、本地运行指南的 README。 | 完整 README |
| **Day79** | 架构图 | 技术选型 | 用 Draw.io 画出项目完整技术架构图（前端→BFF→AI→数据库），并标注技术选型理由。 | 架构设计图 |
| **Day80** | 博客 1 | React/Vue 源码 | 从之前的笔记中整理一篇《React Fiber 与 Vue 响应式系统核心原理解析》发布到掘金/个人博客。 | 技术博客 1 |
| **Day81** | 博客 2 | AI 面试系统 | 写《从零构建一个 AI 面试官——技术复盘》，突出难点（LangGraph 状态图、MCP 集成）。 | 技术博客 2 |
| **Day82** | 博客 3 | LangGraph 实践 | 写《用 LangGraph 设计复杂对话流程》，附上你的状态图与代码片段。 | 技术博客 3 |
| **Day83** | 简历包装 | 项目亮点 | 将 AI 面试项目作为简历核心，提炼 3-4 个技术亮点，按照 STAR 法则编写。 | 项目亮点描述 |
| **Day84** | 模拟面试 | 项目答辩 | 准备一个 10 分钟的讲稿，涵盖项目背景、技术难点、个人贡献，录制视频或请朋友模拟面试。 | 答辩讲稿 & 视频 |
| **周产出** | 3 篇技术博客 + 项目完整展示 + 面试讲稿 |  |  |  |


## 12 周最终技术矩阵与项目产出
**技术矩阵**  

+ **React**：Fiber、Diff、Hooks 原理、性能优化  
+ **Vue**：Reactive、Track/Trigger、Scheduler、nextTick、Pinia、KeepAlive  
+ **浏览器**：EventLoop、缓存、Service Worker、Cookie/Storage  
+ **Node**：EventLoop、中间件、JWT、Redis、BFF  
+ **工程化**：Vite/Webpack 原理、自定义 Loader/Plugin、Monorepo  
+ **Next.js**：SSR、Hydration、RSC、Streaming、Server Actions  
+ **AI**：Prompt、RAG、Function Calling、LangChain、LangGraph、MCP  
+ **架构**：组件设计、微前端、权限模型、架构设计题

**简历核心项目：AI 智能面试训练平台**  

+ 技术栈：React + Next.js + Node.js + Redis + PostgreSQL + LangChain + LangGraph + MCP  
+ 核心功能：AI 简历分析 / JD 分析 / 面试题生成 / AI 模拟面试 / 动态追问 / 面试评分 / 报告生成  
+ 架构亮点：BFF 层聚合、MCP 标准工具接入、LangGraph 状态图驱动对话、Redis 会话缓存、Monorepo 工程化

---

> 这份 12 周计划已将原来零散的“每日细节”精准嵌入每一天，并针对新增的 Vue 源码、Pinia、微前端、MCP 等内容补充了具体的动手任务。  
**执行建议**：每天先花 10 分钟明确产出物，然后直接敲代码或绘图，完成后立即写简短的总结笔记。保持“学到哪里，代码写到哪里，项目落地到哪里”。现在就从 Day1 开始吧。
>
