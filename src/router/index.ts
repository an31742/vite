import { createRouter, createWebHashHistory } from "vue-router";
import { markRaw } from "vue";
import { Box } from "@element-plus/icons-vue";

const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("@/views/login/login.vue"),
  },
  {
    path: "/layout",
    name: "layout",
    component: () => import("@/views/layout/index.vue"),
    asideVisible: false,
    meta: {
      title: "首页",
      icon: markRaw(Box),
      activeMenu: "layout",
      anchors: "",
    },
  },
  {
    path: "/demo",
    name: "demo",
    component: () => import("@/views/demo/index.vue"),
    asideVisible: true,
    meta: {
      title: "demo",
      icon: markRaw(Box),
      activeMenu: "demo",
      anchors: "",
    },
    children: [
      {
        path: "/demo/toLocalStorage",
        component: () => import("@/views/demo/toLocalStorage.vue"),
        asideVisible: false,
        meta: {
          title: "toLocalStorage",
          icon: markRaw(Box),
          activeMenu: "toLocalStorage",
          anchors: "",
        },
      },

      {
        path: "/demo/layOut",
        component: () => import("@/views/demo/layOut.vue"),
        asideVisible: false,
        meta: {
          title: "demoLayOut",
          icon: markRaw(Box),
          activeMenu: "demoLayOut",
          anchors: "",
        },
      },
      {
        path: "/demo/vue3",
        name: "vue3",
        component: () => import("@/views/demo/vue3.vue"),
        asideVisible: false,
        meta: {
          title: "vue3",
          icon: markRaw(Box),
          activeMenu: "vue3",
          anchors: "",
        },
      },
    ],
  },
  {
    path: "/fe_interview3+1",
    name: "fe_interview",
    component: () => import("@/views/fe_interview/index.vue"),
    asideVisible: false,
    meta: {
      title: "fe_interview",
      icon: markRaw(Box),
      activeMenu: "fe_interview",
      anchors: "",
    },
   
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

for (let i = 0; i < 100; i++) {
  // 添加二级路由对象
  router.addRoute("fe_interview", {
    path: `/fe_interview3+1/${i + 1 < 100 ? "0" + i : i}`,
    name:   JSON.stringify(i+ 1 < 100 ? "0" + i : i)  ,
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
router.beforeEach((to, from) => {
  console.log(`进行了${++counter}路由跳转${from}`);
  // if (to.path.indexOf("/home") !== -1) {
  //   return "/login"
  // }

  if (to.path !== "/login") {
    const token = window.localStorage.getItem("token");
    if (!token) {
      return "/login";
    }
  }
});

export default router;
