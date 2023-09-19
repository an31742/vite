import { createRouter, createWebHashHistory } from "vue-router";
import { markRaw } from "vue";
import { Box } from "@element-plus/icons-vue";

const routes = 
{
  path: "/fe_interview3+1",
  name: "fe_interview",
  component: () => import("@/views/fe_interview/index.vue"),
  asideVisible: false,
  hidde: false,
  anchors: "fe_interview",
  meta: {
    title: "fe_interview",
    icon: markRaw(Box),
    anchors: ["admin"],
  },
}





export default  routes