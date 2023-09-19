import { markRaw } from "vue";
import { Box } from "@element-plus/icons-vue";

const routes = 
{
  path: "/demo",
  name: "demo",
  component: () => import("@/views/demo/index.vue"),
  asideVisible: true,
  hidde: false,
  meta: {
    title: "demo",
    icon: markRaw(Box),
    activeMenu: "demo",
    anchors: ["admin", "super-management"],
  },
  children: [
    {
      path: "/demo/toLocalStorage",
      component: () => import("@/views/demo/toLocalStorage.vue"),
      asideVisible: false,
      hidde: false,
      meta: {
        title: "toLocalStorage",
        icon: markRaw(Box),
        activeMenu: "toLocalStorage",
        anchors: ["admin", "super-management"],
      },
    },
    {
      path: "/demo/layOut",
      component: () => import("@/views/demo/layOut.vue"),
      asideVisible: false,
      hidde: false,
      meta: {
        title: "demoLayOut",
        icon: markRaw(Box),
        activeMenu: "demoLayOut",
        anchors: ["admin", "super-management"],
      },
    },
    {
      path: "/demo/vue3",
      name: "vue3",
      hidde: false,
      component: () => import("@/views/demo/vue3.vue"),
      asideVisible: false,
      meta: {
        title: "vue3",
        icon: markRaw(Box),
        activeMenu: "vue3",
        anchors: ["admin"],
      },
    },
  ],
}





export default  routes