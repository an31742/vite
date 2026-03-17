// 联想消费者团队一面 - JavaScript 前端面试题
// ========================================

/**
 * 1. 介绍一下你负责的 App项目，怎么负责端与端的配合？
 * 
 * 考察点：项目经验、架构设计能力、跨端协作
 * 参考答案:
 * - 描述项目规模和技术栈 (如 uniapp、Vue 等)
 * - 说明前后端交互方式 (RESTful API、WebSocket 等)
 * - 多端适配方案 (H5、小程序、App)
 * - 状态管理和数据流转方案
 */

/**
 * 2. uniapp有哪些兼容性问题？
 * 
 * 考察点：跨端开发经验、问题解决能力
 * 参考答案:
 * - CSS 兼容性：rpx 单位、flex 布局在各端表现差异
 * - API 差异：不同平台的原生 API 支持程度不同
 * - 生命周期：各端生命周期执行顺序可能不同
 * - 样式渲染：iOS/Android/H5 的样式表现差异
 * - 第三方插件：部分插件在某些平台不支持
 */

/**
 * 3. 过往项目印象比较深的项目？
 * 
 * 考察点：技术深度、总结能力、亮点展示
 * 回答思路:
 * - STAR 法则：Situation(情境)、Task(任务)、Action(行动)、Result(结果)
 * - 突出技术难点和解决方案
 * - 量化成果 (性能提升、用户增长等)
 */

/**
 * 4. Vue2 和 Vue3 有哪些区别？
 * 
 * 考察点：框架理解深度
 * 核心区别:
 * - 响应式原理：
 *   Vue2: Object.defineProperty (数组和对象新增属性需特殊处理)
 *   Vue3: Proxy (原生支持对象和数组的响应式)
 * 
 * - API 风格:
 *   Vue2: Options API (data, methods, computed)
 *   Vue3: Composition API (setup, ref, reactive)
 * 
 * - 性能优化:
 *   Vue3: 虚拟 DOM 重写、静态标记 (PatchFlags)、diff 算法优化
 * 
 * - TypeScript 支持:
 *   Vue3: 原生 TS 支持更好
 * 
 * - 生命周期:
 *   beforeDestroy -> beforeUnmount
 *   destroyed -> unmounted
 * 
 * - 多根节点支持:
 *   Vue3: template 支持多个根节点
 */

/**
 * 5. ref 和 reactive 有哪些区别？
 * 
 * 考察点：Vue3 响应式原理理解
 * 核心区别:
 * 
 * - 数据类型:
 *   ref: 可用于基本类型和对象，内部通过.value 访问
 *   reactive: 仅用于对象，直接访问属性
 * 
 * - 实现原理:
 *   ref: 基本类型用 Object.defineProperty，对象用 reactive
 *   reactive: Proxy 实现
 * 
 * - 替换问题:
 *   ref: 可以直接替换整个值
 *   reactive: 不能直接替换，会丢失响应性
 * 
 * - 解构问题:
 *   ref: 解构后保持响应性
 *   reactive: 解构后失去响应性 (需用 toRefs)
 * 
 * 使用建议:
 * - 基本类型必用 ref
 * - 对象类型两者都可，推荐统一使用 ref
 */

/**
 * 6. 介绍一下流式开发是怎么处理的？
 * 
 * 考察点：实时数据处理、SSE/WebSocket
 * 技术方案:
 * 
 * - Server-Sent Events (SSE):
 *   服务端单向推送，适合日志查询、消息通知
 *   const eventSource = new EventSource('/api/stream');
 *   eventSource.onmessage = (e) => { console.log(e.data); };
 * 
 * - WebSocket:
 *   双向通信，适合聊天、协同编辑
 *   const ws = new WebSocket('ws://server');
 *   ws.onmessage = (e) => { console.log(e.data); };
 * 
 * - HTTP 长轮询:
 *   兼容性最好，但性能较差
 * 
 * - ReadableStream:
 *   fetch API 配合流式读取
 *   const reader = response.body.getReader();
 */

/**
 * 7. WebSocket 多会话还有 iframe 闭环是什么？
 * 
 * 考察点：复杂场景处理能力
 * 
 * WebSocket 多会话:
 * - 创建多个 WebSocket 连接管理不同业务
 * - 使用连接池或单例 + 订阅发布模式
 * - 心跳保活、断线重连机制
 * 
 * iframe 闭环:
 * - postMessage 实现跨域通信
 * - window.addEventListener('message', callback)
 * - 父子页面建立信任关系 (验证 origin)
 * - 典型场景：微前端、第三方嵌入
 */

/**
 * 8. 如何将日志查询从 12 秒降到 1.2 秒？(ag-Grid + Vue2)
 * 
 * 考察点：性能优化实战经验
 * 优化方案:
 * 
 * - 虚拟滚动:
 *   ag-Grid 自带虚拟滚动，只渲染可见区域
 *   rowBuffer: 0 // 减少预渲染行数
 * 
 * - 分页加载:
 *   服务端分页，避免一次性加载大量数据
 *   infiniteRowModel: 无限滚动模式
 * 
 * - 列优化:
 *   隐藏不必要的列
 *   使用列虚拟
 * 
 * - 数据优化:
 *   精简返回字段
 *   后端数据聚合
 * 
 * - 渲染优化:
 *   Vue2: Object.freeze() 冻结大数据，避免响应式开销
 *   使用函数组件
 * 
 * - 缓存策略:
 *   已查询数据缓存
 *   增量更新而非全量刷新
 * 
 * - Web Worker:
 *   大数据处理放到 Worker 线程
 */

/**
 * 9. 你有什么问题吗？
 * 
 * 考察点：主动性、对岗位兴趣
 * 推荐提问:
 * - 团队规模和技术栈？(如：Vue2 团队，10 人消费者团队)
 * - 业务发展方向？
 * - 技术成长空间？
 * - 工作流程和协作方式？
 */

// ========================================
// 面试总结
// ========================================
/**
 * 公司信息：联想消费者团队
 * 技术栈：Vue2
 * 团队规模：10 人
 * 业务方向：消费者业务
 * 
 * 准备重点:
 * 1. Vue2/Vue3 核心原理
 * 2. 性能优化实战经验
 * 3. 跨端开发 (uniapp) 经验
 * 4. 实时通信 (WebSocket/SSE)
 * 5. 复杂表格处理 (ag-Grid)
 */