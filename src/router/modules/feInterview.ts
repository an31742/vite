/*
 * @Author: maxiangan
 * @Date: 2023-09-19 16:10:42
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-10-25 16:16:37
 * @Description: 请填写简
 */
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
  meta: {
    title: "fe_interview",
    icon: markRaw(Box),
    anchors: "super-management",
  },
}





export default  routes