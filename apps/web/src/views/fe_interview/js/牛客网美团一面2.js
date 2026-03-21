// antd是基础类组件库还是业务类
console.log("🚀 ~ antd是基础类组件库还是业务类:");

// Ant Design (antd) 是基础类组件库

// 的适用范围，支持服务端渲染吗，它的css方案选型
console.log("🚀 ~ 的适用范围，支持服务端渲染吗，它的css方案选型:");

// 中后台系统: 管理后台、数据看板、企业内部系统

// 桌面端优先: 主要针对 PC 端，移动端体验一般

// React 生态: 专为 React 项目设计

// 企业级应用: B 端产品、SaaS 平台、内部工具

// 完全支持服务端渲染

// Next.js 中使用
// import { ConfigProvider } from 'antd';
// import { cache } from '@emotion/css';
// import { CacheProvider } from '@emotion/react';

// 支持 Next.js、Nuxt.js 等 SSR 框架

// Less: 预处理器

// CSS-in-JS: 部分组件使用

// less相比普通css增加了什么功能
console.log("🚀 ~ less相比普通css增加了什么功能:");

//嵌套 变量  函数  混入 导入  混入  条件语句  运算

// webpack是如何运行打包的
console.log("🚀 ~ webpack是如何运行打包的:");

// 1、初始化阶段
// 读取配置文件
// const config = require('./webpack.config.js');
// const compiler = webpack(config);
// 2.编译阶段
// 从入口文件开始
// entry: './src/index.js'

// 构建依赖图
// index.js → import('./utils.js') → import('./api.js')

// 3.模块解析
// Webpack 将所有文件视为模块
// import utils from './utils.js';  // ES6 模块
// const api = require('./api.js'); // CommonJS 模块
// import './style.css';            // CSS 模块

// 4.loader转换
// webpack.config.js
// module: {
//   rules: [
//     { test: /\.js$/, use: 'babel-loader' },    // JS 转换
//     { test: /\.css$/, use: ['style-loader', 'css-loader'] }, // CSS 处理
//     { test: /\.(png|jpg)$/, use: 'file-loader' } // 资源处理
//   ]
// }

// 5. 生成 Bundle
// 最终生成的代码结构
// (function(modules) {
// Webpack 运行时代码
// function __webpack_require__(moduleId) {
// 模块加载逻辑
// }

// 执行入口模块
// return __webpack_require__(0);
// })([
// 模块 0: index.js
// function(module, exports, __webpack_require__) {
// 转换后的代码
// },
// 模块 1: utils.js
// function(module, exports) {
// 转换后的代码
// }
// ]);

// 6.输出阶段
// 输出到 dist 目录
// output: {
//   path: path.resolve(__dirname, 'dist'),
//   filename: 'bundle.js'
// }

// Webpack 将所有资源视为模块，通过依赖分析构建模块图，最终打包成浏览器可执行的 JavaScript 文件

// 重要: 读取配置文件，从入口entry开始初始化编译将所有文件都视为模块进行模块解析  es6模块 css模块 js模块，然后进行loader转换 jsloader css loader fileloader 生成builde 这个bundle是可以直接运行的在浏览器  将bundle导出到dist生成打包文件

// 核心: 浏览器执行 bundle.js 中的 IIFE，通过 Webpack 运行时的模块加载器按需执行各个模块，最终渲染页面

//webpack热更新的原理
console.log("🚀 ~ webpack热更新的原理:");

// 1、核心组件 就是HotModuleReplacementPlugin 热更新插件
// webpack-dev-server + HotModuleReplacementPlugin
// const webpack = require('webpack');

// module.exports = {
//   plugins: [
//     new webpack.HotModuleReplacementPlugin()
//   ],
//   devServer: {
//     hot: true  // 启用热更新
//   }
// };

// 1. 文件监听
// webpack-dev-server 监听文件变化
// 2. 重新编译
// 文件变化 → 重新编译变化的模块 → 生成 update chunk
// 3. WebSocket 通知
// 服务器通过 WebSocket 通知浏览器有更新
// 4. 浏览器拉取更新
// 浏览器请求 update.json 和 update.js
// 5. 模块替换
// HMR Runtime 替换旧模块

// WebSocket 连接
// const ws = new WebSocket('ws://localhost:8080/sockjs-node');

// 服务器推送更新消息
// ws.send({
//   type: 'hash',
//   data: 'abc123'  // 新的编译 hash
// });

// 浏览器接收并处理
// ws.onmessage = (event) => {
//   if (event.data.type === 'hash') {
// 拉取更新文件
//     fetch(`/${hash}.hot-update.json`)
//       .then(res => res.json())
//       .then(updateManifest => {
// 加载更新的模块
//       });
//   }
// };

// HMR Runtime 在浏览器中的工作
// if (module.hot) {
//   module.hot.accept('./component.js', () => {
// 模块更新时的回调
//     const newComponent = require('./component.js');
// 替换旧组件
//     replaceComponent(newComponent);
//   });
// }

// hash.hot-update.json - 更新清单
// {
//   "h": "abc123",  // 新 hash
//   "c": {
//     "main": true  // 需要更新的 chunk
//   }
// }
// main.hash.hot-update.js - 更新代码
// webpackHotUpdate("main", {
//   "./src/component.js": function(module, exports) {
// 新的模块代码
//   }
// });

//总结：webpack-dev-serve 监听文件变化，找到变化的文件，生成变化的模块 update chunk.js 通过webSocket通知浏览器进行文件更新，浏览器请求更新的js 和json，HMR Runtime 替换旧模块

// vite 是如何打包运行 vite和webpack 有什么区别
console.log("🚀 ~ vite 是如何打包运行 vite和webpack 有什么区别:");

// 开发模式
// vite利用浏览器原生ES模块 (import导入 和 export导出 )
// Vite 利用浏览器原生 ES 模块
// index.html
{
  /* <script type="module" src="/src/main.js"></script> */
}

// 浏览器直接请求模块
// import { createApp } from 'vue'  // → /node_modules/vue/...
// import App from './App.vue'      // → 实时编译

// Vite 让浏览器直接请求模块的核心机制：
// 1.开发服务器拦截
// Vite 启动本地服务器
// vite dev -> http://localhost:3000

//拦截所有请求模块
// GET /src/main.js   -> Vite 服务器处理
// GET /src/App.vue   -> 实时编译返回
// GET /@modules/vue  ->预购建依赖

// 2.路径重写
//源代码
// import {creatApp} from 'vue'
// import App from './App.vue'

//vite 重写
// import {creatApp} from '/@modules/vue' //重写npm 包路径
// import App from './src/App.vue'  //保持相对路径

// 3.实时编译
//浏览器请求 GET /src/App.vue
//vite 服务器
// 1.读取App.vue 文件
//2.编译Vue SFC -> javaScript
// 3.编译之后返回js代码

//返回结果
// export default{
//   setup(){

//   }
// }

// 4依赖与构建
//node_modules 中的包
// import {createApp } from 'vue'

//vite 预构建
// Vue -> /@modules/vue  ESM 格式
//储存在 node/@modules/vite

// 5热更新机制
//文件变化时
//vite 通过webSocket 通知浏览器
//浏览器重新请求变化的模块
//实现精准热更新

// 浏览器请求 → Vite 拦截 → 实时编译 → 返回 ES 模块 → 浏览器执行
//

// 总结 vite运行服务的时候 浏览器请求的时候vite实时拦截浏览器的的请求，将所有的依赖重写编译  返回ES模块就是import 这中模块是浏览器可以接受的，所以浏览器可以直接执行就会进行浏览器渲染

// vite 和webpack有啥区别吗
console.log("🚀 ~ vite 和webpack有啥区别吗:");

//vite 启动速度毫秒级别 webpack 是几秒几十秒
//vite 精准更新单个模块 webpack 重新编译相关模块

//vite 打包器是Rollup webpack 打包器是webpack build

//模块系统 vite 是 import/export  webpack 是__webpack_require__()

// vite 没有多少配置  可以直接启动   webpack需要额外排至loader 插件

//vite 是按需编译  webpack是预打包模式

// 启动流程
// npm run dev
// ↓
// 1. 读取所有源文件
// 2. 分析依赖关系
// 3. 编译所有模块
// 4. 生成 bundle.js
// 5. 启动开发服务器
// 6. 浏览器加载 bundle.js

// 启动流程
// npm run dev
// ↓
// 1. 直接启动开发服务器
// 2. 浏览器请求模块时才编译
// 3. 实时返回编译结果

// 启动时就要处理所有文件
// entry: './src/main.js'
// ↓
// 分析 main.js → utils.js → api.js → components/...
// ↓
// 全部编译打包成 bundle.js (可能几MB)
// ↓
// 启动服务器 (耗时几秒到几十秒)

// 启动时不处理任何文件
// vite dev (毫秒级启动)
// ↓
// 浏览器请求: GET /src/main.js
// ↓
// 实时编译 main.js 并返回
// ↓
// 浏览器请求: GET /src/utils.js
// ↓
// 实时编译 utils.js 并返回

//代码发布的流程是什么

// 1.建立新的分支 开发
// 2.开发完了提到对应的测试分支  测试分支是 Jenkins自动部署服务页面直接更新
// 3.测试完了创建 Release分支
// 4.本地跟新版本号
// 5.将Release进行压缩合并 在Jenkins进行手动发版

//数组扁平化并去重

// function flattenAndUnique (arr) {
//   return [...new Set(arr.flat(Infinity))]
// }

// const arr = [1, [2, 3], [4, [5, 6]], 2, 3];
// console.log(flattenAndUnique(arr));

// function flattenAndUnique (arr) {
//   const result = []
//   const seen = new Set()
//   function flatten (arr) {
//     for (let key of arr) {
//       if (Array.isArray(item)) {
//         flatten(item)
//       } else if (!seen.has(item)) {
//         seen.add(item)
//         result.push(item)
//       }
//     }
//   }

//   flatten(arr)
//   return result
// }

function flatcopy(arr) {
  let res = [];
  arr.forEach((element) => {
    if (Object.prototype.toString.cell === "[object Array]") {
      res = res.concat(flatcopy(element));
    } else {
      res.push(element);
    }
  });
}

function uni(arr) {
  let res = [];
  arr.forEach((element) => {
    if (!res.includes(element)) {
      res.push(element);
    }
  });
  return res;
}
