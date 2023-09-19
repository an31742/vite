import { createRouter, createWebHashHistory } from "vue-router";
import { markRaw } from "vue";
import { Box } from "@element-plus/icons-vue";

const routes = 
  {
    path: '/error',
    redirect: 'noRedirect',
    name: 'ErrorPages',
    meta: {
      title: 'Error Pages',
      icon: '404'
    },
    hidde:true,
    asideVisible: true,
    children: [
      {
        path: '/401',
        component: () => import('@/views/error/401.vue'),
        name: 'Page401',
        asideVisible: false,
        hidde:true,
        meta: { title: '401', noCache: true , icon: markRaw(Box),}
      },
      {
        path: '/404',
        component: () => import('@/views/error/404.vue'),
        name: 'Page404',
        asideVisible: false,
        hidde:false,
        meta: { title: '404', noCache: true , icon: markRaw(Box),}
      }
    ]
  }





export default  routes