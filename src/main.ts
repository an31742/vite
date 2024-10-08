import { createApp } from "vue"
import App from "./App.vue"
import router from "./router/index.ts"
import piniaStore from "./store/index.ts"
// import SvgIcon from './components/SvgIcon/index.vue'
import * as ElementPlusIconsVue from "@element-plus/icons-vue"
import "element-plus/dist/index.css"
//样式
import "./styles/index.scss"
import vuedraggable from "vuedraggable"
import rawDisplayer from "./components/infra/raw-displayer.vue"

import * as baseComponents from "./components/base/components/index.ts" // 导入所有组件

const app = createApp(App)
// 注册element Icons组件
Object.keys(ElementPlusIconsVue).forEach((key) => {
  console.log("key: ", key)
  app.component(key, ElementPlusIconsVue[key as keyof typeof ElementPlusIconsVue])
})

Object.keys(baseComponents).forEach((key) => {
  app.component(key, baseComponents[key])
})
app.use(vuedraggable)
app.use(rawDisplayer, "rawDisplayer")
app.use(router)
app.use(piniaStore)
app.mount("#app")
