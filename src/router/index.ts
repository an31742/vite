/*
 * @Author: an31742 2234170284@qq.com
 * @Date: 2023-11-14 11:30:56
 * @LastEditors: an31742 2234170284@qq.com
 * @LastEditTime: 2025-06-30 18:44:59
 * @FilePath: /vite/src/router/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

declare const window:any
import { createRouter, createWebHashHistory } from "vue-router"

import { checkRole } from "@/utils/permission.ts"
import { ElMessage } from "element-plus"
import NProgress from "nprogress"
import { useCounter } from "@/store/index.ts"
import { queryToModalStack } from '@/components/com/Modal/modalUtils';
import routes from "@/router/modules/constRoute.ts"
import "nprogress/nprogress.css"

NProgress.configure({ showSpinner: false })

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

for (let i = 0; i < 100; i++) {
  // 添加二级路由对象
  router.addRoute("fe_interview", {
    path: `/fe_interview3+1/${i + 1 < 100 ? "0" + i : i}`,
    name: JSON.stringify(i + 1 < 100 ? "0" + i : i),
    component: () => import(`@/views/fe_interview/${i + 1 < 100 ? "0" + i : 1}.vue`),
  })
}
// 导航守卫beforeEach
let counter = 0
// to: Route对象, 即将跳转到的Route对象
// from: Route对象,
/**
 * 返回值问题:
 *    1.false: 不进行导航
 *    2.undefined或者不写返回值: 进行默认导航
 *    3.字符串: 路径, 跳转到对应的路径中
 *    4.对象: 类似于 router.push({path: "/login", query: ....})
 */

let whiteList = ["/login", "/401", "/404", "/layout"]

router.beforeEach((to, from, next) => {
  // 在路由里面使用pinia一定要在 beforeEach 不能在外面
  const routerName = useCounter()
  const document: any = window.document
  NProgress.start()
  document.title = to.meta.title ?? "vite+ts"
  if (to.path !== "/login") {
    const token = window.localStorage.getItem("token")
    if (!token) {
      return next("/login")
    }
  }

  console.log("to.path: ", to)
  // 7.存储 routerName 做按钮权限筛选
  routerName.setRouterName(to.name as string)
  if (whiteList.includes(to.path)) {
    return next()
  }
  console.log("to.matched.length: ", to.matched.length)
  if (to.matched.length === 0) {
    from.name
      ? next({
          name: from.name,
        })
      : next("/404")
  } else {
    //写一个方法这个方法是从后端拿到所有当前用户的所有权限，通过与前端对应判断是否有权限没有就进入默认首页
    // 这个方法一般在utils并使用
    console.log("to.meta.anchors: ", to.meta.anchors)
    if (!checkRole(to.meta.anchors)) {
      ElMessage.error("暂无权限")
      return next("/401")
    } else {
      next() //如果匹配到正确跳转
    }
  }
})

router.afterEach((to) => {
   const modalStack = queryToModalStack(to.query);
  // 超出最大长度则截断（仅保留前5个）
  if (modalStack.length > 5) {
    const newStack = modalStack.slice(0, 5);
    const newQuery = {
      ...to.query,
      modals: encodeURIComponent(JSON.stringify(newStack))
    };
    router.replace({ query: newQuery }).catch(() => {});
  }
  NProgress.done()
})
// 捕获路由重复跳转错误（避免控制台报错）
router.onError((err) => {
  if (err.message.includes('Navigation cancelled') || err.message.includes('Duplicate Navigation')) {
    return;
  }
  console.error('【路由错误】：', err);
});
export default router
