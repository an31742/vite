/*
 * @Author: maxiangan
 * @Date: 2023-09-19 16:08:24
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-11-23 09:54:55
 * @Description: 请填写简介
 */
import { markRaw } from "vue"
import { Box } from "@element-plus/icons-vue"

const routes = {
  path: "/demo",
  name: "demo",
  component: () => import("@/views/demo/index.vue"),
  asideVisible: true,
  hidde: false,
  meta: {
    title: "demo",
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
        title: "toLocalStorage",
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
        title: "demoLayOut",
        icon: markRaw(Box),
        activeMenu: "demoLayOut",
        anchors: "admin",
      },
    },
    // {
    //   path: "/demo/vue3",
    //   name: "vue3",
    //   hidde: false,
    //   component: () => import("@/views/demo/vue3.vue"),
    //   asideVisible: false,
    //   meta: {
    //     title: "vue3",
    //     icon: markRaw(Box),
    //     activeMenu: "vue3",
    //     anchors: 'management',  //设计前端权限
    //   },
    // },
    {
      path: "/demo/cascader",
      name: "cascader",
      hidde: false,
      component: () => import("@/views/demo/cascader.vue"),
      asideVisible: false,
      meta: {
        title: "cascader",
        icon: markRaw(Box),
        activeMenu: "cascader",
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
        title: "pcDrag",
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
            title: "downPullRefresh",
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
            title: "topPullRefresh",
            icon: markRaw(Box),
            activeMenu: "topPullRefresh",
            anchors: "admin", //设计前端权限
          },
        },
      ],
    },
  ],
}

export default routes
