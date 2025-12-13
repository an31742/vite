/*
 * @Author: maxiangan
 * @Date: 2023-09-19 16:10:42
 * @LastEditors: an31742 2234170284@qq.com
 * @LastEditTime: 2025-01-13 15:30:00
 * @Description: 前端面经路由配置 - 适配JS文件结构
 */
import { markRaw } from "vue";
import { Box } from "@element-plus/icons-vue";

const routes = {
  path: "/fe_interview",
  name: "fe_interview",
  component: () => import("@/views/fe_interview/index.vue"),
  asideVisible: true,
  hidde: false,
  meta: {
    title: "前端面经",
    icon: markRaw(Box),
    anchors: "admin",
    description: "JavaScript版本的前端面经学习系统"
  },
  children: [
    {
      path: "/fe_interview/js",
      name: "fe_interview_js",
      component: () => import("@/views/fe_interview/index.vue"),
      asideVisible: false,
      hidde: false,
      meta: {
        title: "JS面经文件",
        icon: markRaw(Box),
        anchors: "admin",
        description: "可执行的JavaScript面经文件集合"
      }
    }
  ]
};

export default routes;