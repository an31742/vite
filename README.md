# Vite + Vue3 + TypeScript 项目

基于 Vite 构建的 Vue3 + TypeScript 前端项目，集成了 Element Plus、Pinia、Vue Router 等现代化开发工具。

## 🚀 技术栈

- **框架**: Vue 3.3.4 + TypeScript 5.2.2
- **构建工具**: Vite 4.4.5
- **UI 组件库**: Element Plus 2.3.12
- **状态管理**: Pinia 2.1.6
- **路由管理**: Vue Router 4
- **样式预处理**: Sass/SCSS
- **代码规范**: ESLint + Prettier
- **拖拽功能**: vuedraggable 4.1.0

## 📦 项目结构

```
src/
├── assets/          # 静态资源
├── components/      # 公共组件
│   ├── base/       # 基础组件
│   ├── com/        # 通用组件
│   └── infra/      # 基础设施组件
├── directives/      # 自定义指令
├── router/          # 路由配置
├── service/         # API 服务
├── store/           # 状态管理
├── styles/          # 全局样式
├── utils/           # 工具函数
├── views/           # 页面组件
│   ├── demo/       # 演示页面
│   ├── error/      # 错误页面
│   ├── fe_interview/ # 前端面试题
│   ├── layout/     # 布局组件
│   └── login/      # 登录页面
└── main.ts          # 应用入口
```

## 🛠️ 开发环境

### 环境要求

- Node.js >= 16
- npm 或 yarn

### 安装依赖

```bash
npm install
# 或
yarn install
```

### 启动开发服务器

```bash
npm run dev
```

访问 <http://localhost:3088>

### 构建项目

```bash
# 开发环境构建
npm run build:dev

# 生产环境构建
npm run build:pro
```

### 代码检查和格式化

```bash
# ESLint 检查并修复
npm run lint

# Prettier 格式化
npm run prettier
```

## 🔧 主要功能

### 1. 路由系统

- 基于 Vue Router 4 的路由管理
- 路由守卫和权限控制
- 动态路由加载

### 2. 状态管理

- 使用 Pinia 进行状态管理
- 支持状态持久化

### 3. 组件系统

- Element Plus UI 组件库
- 自定义拖拽组件
- 全局弹窗组件

### 4. 自定义指令

- `v-auth`: 权限控制
- `v-copy`: 复制功能
- `v-debounce`: 防抖
- `v-throttle`: 节流
- `v-draggable`: 拖拽
- `v-longpress`: 长按
- `v-waterMarker`: 水印

### 5. 演示功能

- 本地存储演示
- 布局组件演示
- Vue3 特性演示
- 级联选择器
- 全局弹窗
- PC 拖拽功能
- JS 学习示例

## 📝 开发规范

### 代码风格

- 使用 TypeScript 进行类型检查
- 遵循 ESLint 规则
- 使用 Prettier 进行代码格式化

### 组件命名

- 组件文件使用 PascalCase
- 组件注册使用 kebab-case

### 路由配置

- 路由模块化管理
- 支持权限控制和元信息配置

## 🔐 权限系统

项目内置了基于角色的权限控制系统：

- 路由级权限控制
- 组件级权限控制
- 按钮级权限控制

## 📱 响应式设计

- 支持多种屏幕尺寸
- 移动端适配
- 暗黑模式支持

## 🚀 部署

### 构建生产版本

```bash
npm run build:pro
```

### 预览构建结果

```bash
npm run preview
```

## 📄 许可证

本项目仅供学习和开发使用。

## 👥 贡献

欢迎提交 Issue 和 Pull Request 来改进项目。

---

**作者**: an31742  
**邮箱**: <2234170284@qq.com>  
**最后更新**: 2025-06-30
