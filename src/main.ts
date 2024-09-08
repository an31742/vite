import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.ts";
import piniaStore from "./store/index.ts";
// import SvgIcon from './components/SvgIcon/index.vue'
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "element-plus/dist/index.css";
//样式
import "./styles/index.scss";
import vuedraggable from "vuedraggable";
import rawDisplayer from "./components/infra/raw-displayer.vue";
import ElInput from "@/components/base/components/el-input.vue";
const app = createApp(App);
// 注册element Icons组件
Object.keys(ElementPlusIconsVue).forEach((key) => {
  console.log("key: ", key);
  app.component(
    key,
    ElementPlusIconsVue[key as keyof typeof ElementPlusIconsVue]
  );
});
app.use(vuedraggable);
app.use(rawDisplayer);
app.use(router);
app.use(piniaStore);
app.use("ElInput", ElInput);
// app.component('svg-icon', SvgIcon)
app.mount("#app");
