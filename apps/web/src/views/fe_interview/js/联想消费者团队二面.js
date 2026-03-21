// ● 如何识别需不需要做成一个组件
/**
 * 组件化识别原则：
 * 1. 复用性：如果在多个地方使用相同的 UI 或逻辑 → 组件
 * 2. 独立性：功能相对独立，有明确的职责边界 → 组件
 * 3. 可维护性：复杂 UI 拆分为小组件，降低耦合度 → 组件
 * 4. 可测试性：独立功能便于单元测试 → 组件
 * 5. 业务语义：代表明确的业务概念（如用户卡片、商品列表）→ 组件
 *
 * 判断标准：
 * - 是否会在多处使用？
 * - 是否有独立的 props/emit 接口？
 * - 是否有独立的状态管理？
 * - 是否需要单独优化性能？
 */

// ● ai对话框有哪些可以抽象的
/**
 * AI 对话框可抽象的模块：
 * 1. UI 层抽象：
 *    - 消息气泡组件（支持文本、代码、图片、表格等多种格式）
 *    - 输入区域组件（支持多行输入、快捷指令、文件上传）
 *    - 加载状态组件（打字机效果、思考中动画）
 *    - 工具栏组件（复制、重新生成、点赞/点踩）
 *
 * 2. 功能层抽象：
 *    - 消息管理器（消息队列、历史记录、滚动定位）
 *    - 会话管理器（多会话切换、上下文管理）
 *    - 指令解析器（快捷命令、参数提取）
 *    - 响应处理器（流式响应、错误处理、重试机制）
 *
 * 3. 业务层抽象：
 *    - API 适配器（不同 AI 服务接口统一）
 *    - 权限控制器（敏感词过滤、调用频率限制）
 *    - 数据分析器（用户行为追踪、对话质量评估）
 *
 * 4. 状态管理：
 *    - 对话状态（loading、error、success）
 *    - 滚动状态（自动滚动、手动锁定）
 *    - 输入状态（草稿保存、输入历史）
 */

// ● 有十个页面都集成这个组件，如果要修改这个组件如何保证不影响已经集成的组件
/**
 * 组件兼容性保障策略：
 *
 * 1. 版本控制：
 *    - 使用语义化版本（Semantic Versioning）
 *    - 破坏性变更升级大版本号（v1.x → v2.x）
 *    - 通过 package.json 锁定版本范围
 *
 * 2. 向后兼容：
 *    - 新增功能用新 props，保留旧 props 支持
 *    - 废弃功能标记 @deprecated，提供迁移指南
 *    - 使用默认值保证旧代码正常工作
 *
 * 3. 渐进式迁移：
 *    - 提供迁移脚本/CLI 工具
 *    - 发布过渡版本（同时支持新旧 API）
 *    - 分批次通知各页面负责人升级
 *
 * 4. 测试保障：
 *    - 完善单元测试覆盖核心功能
 *    - 添加集成测试验证现有场景
 *    - 使用快照测试检测 UI 变化
 *
 * 5. 文档沟通：
 *    - 更新 CHANGELOG 记录变更
 *    - 提供 Migration Guide 迁移文档
 *    - 提前通知利益相关者
 *
 * 6. 特性开关：
 *    - 新功能通过 flag 控制逐步灰度
 *    - 支持回滚到旧版本逻辑
 */

// ● 那部分独立完成交付了
/**
 * 回答示例（根据个人实际情况）：
 *
 * 1. 技术难点攻克：
 *    - "独立完成了低代码平台的核心拖拽引擎，支持组件嵌套、吸附对齐"
 *    - "负责 AI 对话框的流式响应优化，首字延迟从 500ms 降到 100ms"
 *
 * 2. 业务模块交付：
 *    - "从需求评审到上线全流程负责用户中心模块（登录、注册、个人中心）"
 *    - "独立完成支付流程重构，支持多种支付方式，月交易量 10w+"
 *
 * 3. 性能优化专项：
 *    - "主导 H5 性能优化项目，FCP 从 2.5s 优化到 1.2s，Lighthouse 评分 95+"
 *    - "通过代码分割 + 懒加载， bundle 体积减少 60%"
 *
 * 4. 工具链建设：
 *    - "搭建团队内部 CLI 脚手架，统一项目规范，效率提升 40%"
 *    - "开发自动化测试平台，用例覆盖率从 30% 提升到 80%"
 */

// ● 完整的项目流程是什么样的
/**
 * 标准前端项目开发流程：
 *
 * 1. 需求阶段（1-2 天）
 *    - 产品需求文档（PRD）评审
 *    - 技术方案设计（架构选型、接口定义）
 *    - 工作量评估 + 排期
 *
 * 2. 设计阶段（1-2 天）
 *    - UI/UX 设计稿评审
 *    - 交互原型确认
 *    - 技术方案详细设计（数据库设计、API 设计）
 *
 * 3. 开发阶段（3-5 天）
 *    - 环境搭建（本地开发环境、测试环境）
 *    - 编码实现（Git 分支管理：feature/xxx）
 *    - 自测 + 单元测试编写
 *    - Code Review 修改
 *
 * 4. 测试阶段（2-3 天）
 *    - 提测（合并到 develop 分支）
 *    - QA 功能测试 + 回归测试
 *    - Bug 修复 + 性能测试
 *    - 兼容性测试（多浏览器、多设备）
 *
 * 5. 部署阶段（1 天）
 *    - 预发布环境验证（staging）
 *    - 生产环境部署（production）
 *    - 灰度发布（10% → 50% → 100%）
 *
 * 6. 运维阶段（持续）
 *    - 线上监控（Sentry、性能监控）
 *    - 日志分析（ELK、数据埋点）
 *    - 用户反馈收集
 *    - 迭代优化
 *
 * 7. 敏捷开发实践：
 *    - 每日站会（同步进度、阻塞问题）
 *    - Sprint 规划（2 周一个迭代）
 *    - 回顾总结（Retrospective）
 */

// ● 一码多端响应式布局
/**
 * 响应式布局实现方案：
 *
 * 1. 媒体查询（Media Queries）
 *    ```css
 *    .container {
 *      width: 100%;
 *    }
 *    @media (min-width: 768px) {
 *      .container { max-width: 720px; }
 *    }
 *    @media (min-width: 1024px) {
 *      .container { max-width: 960px; }
 *    }
 *    ```
 *
 * 2. 弹性布局（Flexbox）
 *    ```css
 *    .flex-container {
 *      display: flex;
 *      flex-wrap: wrap;
 *    }
 *    .item { flex: 1 1 auto; }
 *    ```
 *
 * 3. 网格布局（Grid）
 *    ```css
 *    .grid {
 *      display: grid;
 *      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
 *    }
 *    ```
 *
 * 4. 相对单位
 *    - 百分比：%（宽度自适应）
 *    - rem/em：字体大小相对单位
 *    - vw/vh：视口单位
 *
 * 5. 移动优先策略
 *    ```scss
 *    // 先写移动端样式
 *    .box { padding: 10px; }
 *
 *    // 再逐步增强
 *    @media (min-width: 768px) {
 *      .box { padding: 20px; }
 *    }
 *    ```
 *
 * 6. 框架方案
 *    - Tailwind CSS：utility-first
 *    - Bootstrap：栅格系统
 *    - Ant Design Mobile：移动端组件库
 *
 * 7. 图片响应式
 *    ```html
 *    <picture>
 *      <source media="(min-width: 800px)" srcset="large.jpg">
 *      <img src="small.jpg" alt="">
 *    </picture>
 *    ```
 */

// ● 在 h5 上调用操作系统大概怎么做，如何实现一套程序在不同设备的兼容性
/**
 * H5 调用原生能力方案：
 *
 * 1. JSBridge 方案（推荐）⭐
 *    ```javascript
 *    // 定义统一桥接接口
 *    class JSBridge {
 *      callNative(method, params) {
 *        return new Promise((resolve, reject) => {
 *          const callbackId = Date.now() + Math.random();
 *          window[callbackId] = resolve;
 *
 *          // 向原生发送消息
 *          if (window.webkit?.messageHandlers?.jsBridge) {
 *            window.webkit.messageHandlers.jsBridge.postMessage({
 *              method,
 *              params,
 *              callbackId
 *            });
 *          } else if (window.AndroidJSBridge) {
 *            window.AndroidJSBridge.call(method, params, callbackId);
 *          }
 *        });
 *      }
 *    }
 *
 *    // 使用示例
 *    bridge.callNative('scanQRCode', {});
 *    ```
 *
 * 2. URL Scheme（传统方案）
 *    ```javascript
 *    // 自定义协议唤醒 APP
 *    window.location.href = 'myapp://camera/scan?param=value';
 *
 *    // 检测是否安装
 *    const iframe = document.createElement('iframe');
 *    iframe.src = 'myapp://home';
 *    setTimeout(() => {
 *      // 未跳转则说明未安装，引导下载
 *      window.location.href = '/download';
 *    }, 2000);
 *    ```
 *
 * 3. Universal Links / App Links（现代方案）
 *    ```javascript
 *    // iOS Universal Links
 *    // 配置 apple-app-site-association 文件
 *    window.location.href = 'https://example.com/app/camera';
 *
 *    // Android App Links
 *    // 配置 assetlinks.json 文件
 *    ```
 *
 * 4. 设备兼容性方案（传参判断）⭐
 *    ```javascript
 *    class DeviceAdapter {
 *      constructor() {
 *        this.platform = this.detectPlatform();
 *      }
 *
 *      detectPlatform() {
 *        const ua = navigator.userAgent;
 *        if (/iPhone|iPad|iPod/i.test(ua)) return 'ios';
 *        if (/Android/i.test(ua)) return 'android';
 *        return 'web';
 *      }
 *
 *      async call(method, params) {
 *        // 根据平台调用不同桥接方式
 *        if (this.platform === 'ios') {
 *          return this.callIOS(method, params);
 *        } else if (this.platform === 'android') {
 *          return this.callAndroid(method, params);
 *        } else {
 *          console.warn('当前环境不支持原生调用');
 *        }
 *      }
 *
 *      callIOS(method, params) {
 *        // iOS WebKit 桥接
 *        return new Promise((resolve) => {
 *          window.webkit?.messageHandlers?.jsBridge?.postMessage({
 *            method, params, callbackId: Date.now()
 *          });
 *        });
 *      }
 *
 *      callAndroid(method, params) {
 *        // Android 桥接
 *        return new Promise((resolve) => {
 *          window.AndroidJSBridge?.call(method, params);
 *        });
 *      }
 *    }
 *
 *    // 使用
 *    const adapter = new DeviceAdapter();
 *    adapter.call('scanQRCode', {});
 *    ```
 *
 * 5. 第三方库
 *    - WebViewJavascriptBridge（跨平台桥接库）
 *    - js-bridge（阿里开源方案）
 */

// ● 设计模式讲一下 有没有了解适配性模式
/**
 * 常见设计模式：
 *
 * 1. 单例模式（Singleton）
 *    ```javascript
 *    class Singleton {
 *      static instance = null;
 *      constructor() {
 *        if (Singleton.instance) return Singleton.instance;
 *        Singleton.instance = this;
 *      }
 *    }
 *    ```
 *
 * 2. 观察者模式（Observer）
 *    ```javascript
 *    class EventBus {
 *      constructor() { this.events = {}; }
 *      on(event, fn) { (this.events[event] || (this.events[event] = [])).push(fn); }
 *      emit(event, ...args) { (this.events[event] || []).forEach(fn => fn(...args)); }
 *    }
 *    ```
 *
 * 3. 工厂模式（Factory）
 *    ```javascript
 *    function createComponent(type) {
 *      switch(type) {
 *        case 'button': return new Button();
 *        case 'input': return new Input();
 *      }
 *    }
 *    ```
 *
 * 4. 适配器模式（Adapter）⭐
 *    ```javascript
 *    // 将旧接口适配为新接口
 *    class OldPayment {
 *      payWithAlipay(amount) { /* 支付宝支付 *\/ }
 *    }
 *
 *    class PaymentAdapter {
 *      constructor(oldPayment) {
 *        this.oldPayment = oldPayment;
 *      }
 *      pay(type, amount) {
 *        if (type === 'alipay') return this.oldPayment.payWithAlipay(amount);
 *        if (type === 'wechat') return this.oldPayment.payWithWechat(amount);
 *      }
 *    }
 *    ```
 *
 * 5. 策略模式（Strategy）
 *    ```javascript
 *    const strategies = {
 *      A: (bonus) => bonus * 4,
 *      B: (bonus) => bonus * 2,
 *      C: (bonus) => bonus * 1
 *    };
 *    function calculateBonus(level, bonus) {
 *      return strategies[level](bonus);
 *    }
 *    ```
 *
 * 6. 代理模式（Proxy）
 *    ```javascript
 *    // Vue3 响应式原理
 *    const proxy = new Proxy(target, {
 *      get(target, key) { /* 依赖收集 *\/ },
 *      set(target, key, value) { /* 触发更新 *\/ }
 *    });
 *    ```
 *
 * 7. 装饰器模式（Decorator）
 *    ```javascript
 *    @log
 *    class MyClass {
 *      @readonly
 *      method() {}
 *    }
 *    ```
 */

// ● 有没有比较有挑战的项目是如何解决的 vue 低代码开发
/**
 * 低代码平台技术挑战与解决方案：
 *
 * 挑战 1：动态组件渲染引擎
 * 问题：如何根据 JSON Schema 动态渲染任意组件？
 * 解决：
 *   - 建立组件注册中心（全局组件映射表）
 *   - 递归解析组件树（深度优先遍历）
 *   - 动态组件加载（defineAsyncComponent）
 *   ```vue
 *   <component
 *     :is="componentMap[schema.type]"
 *     v-bind="schema.props"
 *     v-model="schema.value"
 *   />
 *   ```
 *
 * 挑战 2：可视化拖拽编排
 * 问题：如何实现组件自由拖拽、嵌套、吸附？
 * 解决：
 *   - 使用 Vue Draggable + Sortable.js
 *   - 计算拖拽位置（碰撞检测算法）
 *   - 维护组件树结构（递归更新 parent/children）
 *   - 实现辅助线吸附（阈值判断 + 自动对齐）
 *
 * 挑战 3：状态管理与数据绑定
 * 问题：组件间数据流如何管理？
 * 解决：
 *   - 全局状态（Pinia/Vuex）存储组件配置
 *   - 表达式解析器（new Function 安全沙箱）
 *   - 数据联动（监听器 + 计算属性）
 *   ```javascript
 *   // 动态表达式求值
 *   function evaluate(expression, context) {
 *     return new Function('ctx', `with(ctx) { return ${expression} }`)(context);
 *   }
 *   ```
 *
 * 挑战 4：代码生成与导出
 * 问题：如何将可视化配置转为可运行代码？
 * 解决：
 *   - AST 抽象语法树生成（@babel/generator）
 *   - 模板字符串拼接（EJS 模板引擎）
 *   - 格式化输出（Prettier）
 *   ```javascript
 *   function generateCode(schema) {
 *     return ejs.render(template, { components: schema });
 *   }
 *   ```
 *
 * 挑战 5：性能优化
 * 问题：大量组件渲染卡顿怎么办？
 * 解决：
 *   - 虚拟滚动（只渲染可视区域）
 *   - 懒加载组件（Intersection Observer）
 *   - 防抖节流（配置变更批量更新）
 *   - 缓存机制（Memoization 避免重复计算）
 */

// ● 当线上有紧急 bug 如何处理的
/**
 * 线上紧急 Bug 处理流程：
 *
 * 1. 快速响应（5 分钟内）
 *    - 收到告警（Sentry/监控平台）
 *    - 确认影响范围（用户数、业务模块）
 *    - 拉起应急群（产品 + 测试 + 开发）
 *
 * 2. 问题定位（10-30 分钟）
 *    - 查看错误日志（Sentry、ELK）
 *    - 复现路径还原（用户操作录屏）
 *    - 检查最近发布（Git 提交记录）
 *    - 数据监控（接口成功率、性能指标）
 *
 * 3. 临时方案（30 分钟 -1 小时）
 *    - 功能降级（关闭问题功能入口）
 *    - 配置开关（Feature Flag 回滚）
 *    - 热修复（Hotfix 补丁）
 *    - CDN 回滚（静态资源版本回退）
 *
 * 4. 根本修复（1-2 小时）
 *    - 创建 hotfix 分支
 *    - 本地复现 + 修复
 *    - 补充测试用例（防止回归）
 *    - Code Review（双人审核）
 *
 * 5. 验证发布（30 分钟）
 *    - 预发布环境验证
 *    - 灰度发布（1% → 10% → 100%）
 *    - 监控观察（30 分钟无异常）
 *
 * 6. 复盘总结（24 小时内）
 *    - 撰写事故报告（时间线、影响、根因）
 *    - 改进措施（流程优化、技术债务）
 *    - 责任到人（跟进落实）
 *
 * 7. 预防措施
 *    - 完善监控告警（覆盖率 100%）
 *    - 自动化测试（CI/CD 卡点）
 *    - 灰度机制（全量前小流量验证）
 *    - 回滚预案（一键回滚能力）
 */

// ● h5 方面如何做性能优化的
/**
 * H5 性能优化全方位方案：
 *
 * 1. 网络优化（减少请求次数 + 体积）
 *    - 资源压缩（Webpack Terser、CSSNano）
 *    - Tree Shaking（移除无用代码）
 *    - 代码分割（Route-based Code Splitting）
 *    - 懒加载（路由懒加载 + 组件懒加载）
 *    - HTTP/2（多路复用）
 *    - CDN 加速（静态资源分发）
 *    - Gzip/Brotli 压缩（体积减少 70%）
 *
 * 2. 渲染优化（减少重绘重排）
 *    - CSS 包含头尾（避免 FOUC）
 *    - 避免内联样式（减少 recalculated style）
 *    - 使用 transform 替代 top/left（GPU 加速）
 *    - 虚拟列表（长列表只渲染可见区域）
 *    - requestAnimationFrame（优化动画）
 *
 * 3. 关键渲染路径优化
 *    - 内联关键 CSS（Critical CSS）
 *    - 异步加载非关键 JS（defer/async）
 *    - Preload 预加载关键资源
 *    ```html
 *    <link rel="preload" href="/font.woff2" as="font">
 *    ```
 *
 * 4. 图片优化
 *    - WebP 格式（体积减少 30%）
 *    - 懒加载（Intersection Observer）
 *    - 响应式图片（srcset）
 *    - 图片 CDN（自动压缩 + 裁剪）
 *
 * 5. 缓存策略
 *    - Service Worker（离线缓存）
 *    - LocalStorage（数据持久化）
 *    - HTTP 缓存（Cache-Control: max-age=31536000）
 *    - 强缓存 + 协商缓存组合
 *
 * 6. JavaScript 优化
 *    - 防抖节流（减少高频事件）
 *    - Web Worker（耗时计算放子线程）
 *    - 事件委托（减少事件绑定）
 *    - 避免内存泄漏（及时移除监听器）
 *
 * 7. 骨架屏（Skeleton Screen）
 *    - 首屏内容占位（减少视觉等待）
 *    - SSR 服务端渲染（直出 HTML）
 *
 * 8. 性能监控
 *    - Core Web Vitals 指标
 *      - LCP（最大内容绘制）< 2.5s
 *      - FID（首次输入延迟）< 100ms
 *      - CLS（累积布局偏移）< 0.1
 *    - 自定义性能埋点
 *
 * 9. 构建优化
 *    - Vite（ESM 热更新快 10 倍）
 *    - SWC/esbuild（Rust 构建工具）
 *    - 持久化缓存（cacheGroups）
 *
 * 实际案例：
 *   - FCP 从 2.5s → 1.2s
 *   - Bundle 体积 800KB → 200KB
 *   - Lighthouse 评分 65 → 95
 */

// ● 反问  1 适应这个岗位应该具备哪些能力 2 技术栈是否会有变化
/**
 * 高质量反问示例：
 *
 * 1. 岗位能力要求：
 *    "请问要胜任这个岗位，您认为最重要的 3 个核心能力是什么？"
 *    "团队目前最希望新人能带来哪些技术贡献？"
 *    "这个岗位的晋升标准和技术成长路径是怎样的？"
 *
 * 2. 技术栈与发展：
 *    "目前团队的技术栈构成是怎样的？未来半年会有技术升级计划吗？"
 *    "是否有引入 AI 辅助开发、低代码等新技术的规划？"
 *    "团队在技术选型上的决策流程是怎样的？"
 *
 * 3. 团队与文化：
 *    "团队的开发流程是敏捷开发还是 waterfall？"
 *    "Code Review 和技术分享的频率如何？"
 *    "团队如何平衡业务需求和技术债务？"
 *
 * 4. 项目与挑战：
 *    "目前团队面临的最大技术挑战是什么？"
 *    "我入职后会主要负责哪条业务线或哪个项目？"
 *    "项目的迭代周期和发布节奏是怎样的？"
 *
 * 5. 培训与成长：
 *    "公司是否有导师制度或技术培训预算？"
 *    "是否支持参加技术大会或开源贡献？"
 *    "团队内部的学习氛围如何？"
 */

// ● 能否接受薪资降幅  18 降到 16，17 的
/**
 * 薪资谈判话术：
 *
 * 1. 价值导向型：
 *    "我理解公司的薪酬体系，但我更看重发展机会。
 *     基于我的技术能力和能带来的价值，希望能争取到 18k。
 *     我可以在 X 个月内完成 Y 项目，带来 Z 收益。"
 *
 * 2. 灵活妥协型：
 *    "如果 base 确实有限制，是否可以通过其他方式补偿？
 *     比如签字费、股票期权、绩效奖金？
 *     或者约定转正/试用期后调整到 18k？"
 *
 * 3. 市场调研型：
 *    "我了解过市场上同类岗位的薪资范围，
 *     基于我的 X 年经验和技术栈，18k 是合理市场价。
 *     希望您能帮忙争取。"
 *
 * 4. 底线坚持型：
 *    "16k 确实低于我的预期，我目前的薪资是 18k。
 *     如果无法匹配，我可能需要重新考虑这个机会。
 *     当然，我更看重的是长期发展。"
 *
 * 5. 折中方案：
 *    "是否可以设定绩效考核目标，达成后调整到 18k？
 *     或者 first year 17k，second year 保证调到 18k？"
 *
 * 建议策略：
 *   - 不要第一时间妥协
 *   - 强调自身价值和贡献
 *   - 了解对方底线（HR 通常有 budget range）
 *   - 综合考虑福利、加班情况、成长性
 *   - 拿到多个 offer 更有议价权
 */
