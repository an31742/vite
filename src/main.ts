/*
 * @Author: an31742 2234170284@qq.com
 * @Date: 2024-11-21 18:32:56
 * @LastEditors: an31742 2234170284@qq.com
 * @LastEditTime: 2025-06-30 02:48:39
 * @FilePath: /vite/src/main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from "vue"
import App from "./App.vue"
import router from "./router/index.ts"
import piniaStore from "./store/index.ts"
import directives from "@/directives/index"
// import SvgIcon from './components/SvgIcon/index.vue'
import * as ElementPlusIconsVue from "@element-plus/icons-vue"
import "element-plus/dist/index.css"
//样式
import "element-plus/theme-chalk/dark/css-vars.css"
import "./styles/index.scss"
import vuedraggable from "vuedraggable"
import rawDisplayer from "./components/infra/raw-displayer.vue"

import * as baseComponents from "./components/base/draggableComponents/index.ts" // 导入所有组件
import * as baseComponentsEdit from "./components/base/draggableComponentsEdit/index.ts" // 导入所有组件

const app = createApp(App)
// 注册element Icons组件
Object.keys(ElementPlusIconsVue).forEach((key) => {
  console.log("key: ", key)
  app.component(key, ElementPlusIconsVue[key as keyof typeof ElementPlusIconsVue])
})

Object.keys(baseComponents).forEach((key) => {
  app.component(key, baseComponents[key])
})
Object.keys(baseComponentsEdit).forEach((key) => {
  app.component(key, baseComponentsEdit[key])
})

app.use(vuedraggable)
app.use(rawDisplayer, "rawDisplayer")
app.use(router)
app.use(directives)
app.use(piniaStore)
app.mount("#app")
