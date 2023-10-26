import { createRouter, createWebHashHistory } from "vue-router";
import { markRaw } from "vue";
import { Box, Flag } from "@element-plus/icons-vue";
import Error from "./modules/error.ts";
import Demo from './modules/demo.ts'
import FeInterview from './modules/feInterview.ts'
import { checkRole } from '@/untils/permission.ts'
import { ElMessage } from 'element-plus'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false });
const routes: any = [
  {
    path: "/login",
    name: "login",
    hidde: true,
    component: () => import("@/views/login/login.vue"),
  },

  {
    path: "/",
    redirect: "layout",
    component: () => import("@/views/layout/index.vue"),
  },
  {
    path: "/layout",
    name: "layout",
    hidde: false,
    component: () => import("@/views/layout/index.vue"),
    asideVisible: false,
    meta: {
      title: "首页",
      icon: markRaw(Box),
      activeMenu: "layout",
    },
  },
  Demo,
  FeInterview,
  Error,
];


const router = createRouter({
  history: createWebHashHistory(),
  routes
});

for (let i = 0; i < 100; i++) {
  // 添加二级路由对象
  router.addRoute("fe_interview", {
    path: `/fe_interview3+1/${i + 1 < 100 ? "0" + i : i}`,
    name: JSON.stringify(i + 1 < 100 ? "0" + i : i),
    component: () =>
      import(`@/views/fe_interview/${i + 1 < 100 ? "0" + i : 1}.vue`),
  });
}
// 导航守卫beforeEach
let counter = 0;
// to: Route对象, 即将跳转到的Route对象
// from: Route对象,
/**
 * 返回值问题:
 *    1.false: 不进行导航
 *    2.undefined或者不写返回值: 进行默认导航
 *    3.字符串: 路径, 跳转到对应的路径中
 *    4.对象: 类似于 router.push({path: "/login", query: ....})
 */

let whiteList = ["/login", "/401", "/404", '/layout', '/'];



router.beforeEach((to, from, next) => {
  const document: any = window.document
  NProgress.start()
  document.title = to.meta.title ?? "vite+ts"
  if (to.path !== "/login") {
    const token = window.localStorage.getItem("token");
    if (!token) {
      return "/login";
    }

  }

  if (whiteList.includes(to.path)) {
    return next()
  }

  if (to.matched.length === 0) {
    from.name ? next({
      name: from.name
    }) : next('/404');
  } else {
    //写一个方法这个方法是从后端拿到所有当前用户的所有权限，通过与前端对应判断是否有权限没有就进入默认首页
    // 这个方法一般在utils并使用
    if (!checkRole(to.meta.anchors)) {
      ElMessage.error('暂无权限')
      return next('/401');
    } else {
      next(); //如果匹配到正确跳转
    }
  }




  return next()
});


router.afterEach(() => {
  NProgress.done()
})
export default router;
