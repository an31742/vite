/*
 * @Author: an31742 2234170284@qq.com
 * @Date: 2025-06-30 18:43:24
 * @LastEditors: an31742 2234170284@qq.com
 * @LastEditTime: 2025-06-30 19:58:13
 * @FilePath: /vite/src/router/modules/constRoute.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { markRaw } from "vue"
import { Box, Flag } from "@element-plus/icons-vue"
import Error from "./error.ts"
import Demo from "./demo.ts"
import FeInterview from "./feInterview.ts"
const routes: any = [
  {
    path: "/login",
    name: "login",
    hidde: true,
    component: () => import("@/views/login/login.vue"),
  },
  {
    path: "/",
    name: "layout",
    hidde: false,
    component: () => import("@/views/layout/index.vue"),
    asideVisible: true,
    redirect: "/home",
    meta: {
      title: "首页",
      icon: markRaw(Box),
      activeMenu: "layout",
    },
    children: [
      {
        path: "/home",
        name: "home",
        hidde: false,
        asideVisible: false, //不显示子菜单
        component: () => import("@/views/home.vue"),
        meta: {
          title: "首页",
          icon: markRaw(Box),
          activeMenu: "home",
          anchors: "admin",
        },
        children: [],
      },
      Demo,
      FeInterview,
    ],
  },
  Error,
]

export default routes
