/*
 * @Author: maxiangan
 * @Date: 2023-09-19 16:08:24
 * @LastEditors: an31742 2234170284@qq.com
 * @LastEditTime: 2025-06-30 20:02:49
 * @Description: 请填写简介
 */
import { markRaw } from "vue";
import { Box } from "@element-plus/icons-vue";

const routes = {
  path: "/demo",
  name: "demo",
  component: () => import("@/views/demo/index.vue"),
  asideVisible: true,
  hidde: false,
  redirect: "/demo/toLocalStorage",
  meta: {
    title: "项目演示",
    icon: markRaw(Box),
    activeMenu: "demo",
    anchors: "admin",
  },
  children: [
    {
      path: "/demo/toLocalStorage",
      name: "toLocalStorage",
      component: () => import("@/views/demo/toLocalStorage.vue"),
      asideVisible: false,
      hidde: false,
      meta: {
        title: "本地缓存",
        icon: markRaw(Box),
        activeMenu: "toLocalStorage",
        anchors: "admin",
      },
    },
    {
      path: "/demo/demoLayOut",
      name: "demoLayOut",
      component: () => import("@/views/demo/layOut.vue"),
      asideVisible: false,
      hidde: false,
      meta: {
        title: "布局示例",
        icon: markRaw(Box),
        activeMenu: "demoLayOut",
        anchors: "admin",
      },
    },
    {
      path: "/demo/vue3",
      name: "vue3",
      hidde: false,
      asideVisible: false,
      meta: {
        title: "vue3",
        icon: markRaw(Box),
        activeMenu: "vue3",
        anchors: "admin", //设计前端权限
      },

      children: [
        {
          path: "/demo/vue3/authTable",
          name: "authTable",
          hidde: false,
          component: () => import("@/views/demo/vue3/authTable.vue"),
          asideVisible: false,
          meta: {
            title: "权限表格",
            icon: markRaw(Box),
            activeMenu: "authTable",
            anchors: "admin", //设计前端权限
          },
        },
      ],
    },
    {
      path: "/demo/cascader",
      name: "cascader",
      hidde: false,
      component: () => import("@/views/demo/cascader.vue"),
      asideVisible: false,
      meta: {
        title: "级联选择",
        icon: markRaw(Box),
        activeMenu: "cascader",
        anchors: "admin",
      },
    },
    {
      path: "/demo/globalPopup",
      name: "globalPopup",
      hidde: false,
      component: () => import("@/views/demo/globalPopup/index.vue"),
      asideVisible: false,
      meta: {
        title: "全局弹窗",
        icon: markRaw(Box),
        activeMenu: "globalPopup",
        anchors: "admin",
      },
    },
    {
      path: "/demo/Ai",
      name: "Ai",
      hidde: false,
      component: () => import("@/views/demo/AI/index.vue"),
      asideVisible: false,
      meta: {
        title: "AI 流式问答",
        icon: markRaw(Box),
        activeMenu: "AI",
        anchors: "admin",
      },
    },
    {
      path: "/demo/pcDrag",
      name: "pcDrag",
      hidde: false,
      component: () => import("@/views/demo/pcDrag/index.vue"),
      asideVisible: false,
      meta: {
        title: "低代码拖拽",
        icon: markRaw(Box),
        activeMenu: "pcDrag",
        anchors: "admin", //设计前端权限
      },
    },
    {
      path: "/demo/jsLearn",
      name: "jsLearn",
      hidde: false,
      redirect: "downPullRefresh",
      asideVisible: false,
      meta: {
        title: "jsLearn",
        icon: markRaw(Box),
        activeMenu: "jsLearn",
        anchors: "admin", //设计前端权限
      },
      children: [
        {
          path: "/demo/jsLearn/down-pull-refresh",
          name: "downPullRefresh",
          hidde: false,
          component: () => import("@/views/demo/jsLearn/top-pull-refresh.vue"),
          asideVisible: false,
          meta: {
            title: "下拉刷新",
            icon: markRaw(Box),
            activeMenu: "downPullRefresh",
            anchors: "admin", //设计前端权限
          },
        },
        {
          path: "/demo/jsLearn/top-pull-refresh",
          name: "topPullRefresh",
          hidde: false,
          component: () => import("@/views/demo/jsLearn/down-pull-refresh.vue"),
          asideVisible: false,
          meta: {
            title: "上拉加载",
            icon: markRaw(Box),
            activeMenu: "topPullRefresh",
            anchors: "admin", //设计前端权限
          },
        },
      ],
    },
  ],
};

export default routes;
