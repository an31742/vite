<!--
 * @Author: maxiangan
 * @Date: 2023-09-11 10:38:59
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-10-26 13:45:58
 * @Description: 请填写简介
-->
<template>
  <div v-for="item in routesData" :key="item.path">
    <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo"
      :default-active="item.path" text-color="#fff" @open="handleOpen" @close="handleClose" router v-if="!item.hidde"
      >
      <!-- 二级节有子集 -->
      <el-sub-menu :index="item.path" v-if="item.asideVisible === true && !item.hidde && checkRole(item.meta.anchors)">
        <template #title>
          <el-icon>
            <location />
          </el-icon>
          <span>{{ item.meta.title }} </span>
        </template>
        <template v-for="routeChild in item.children" :key="routeChild.path" >
          <el-menu-item-group v-if="routeChild.children === 0 || routeChild.children === undefined  && !routeChild.hidde && checkRole(routeChild.meta.anchors)
            ">
            <el-menu-item :index="routeChild.path">  
            {{
              routeChild.meta.title
            }}</el-menu-item>
          </el-menu-item-group>

          <el-sub-menu v-else :index="routeChild.path" v-show="!routeChild.hidde && checkRole(routeChild.meta.anchors)">
            <template #title >{{ routeChild.meta.title }}</template>

            <template v-for="routeRject in routeChild.children" :key="routeRject.path" >
              <el-menu-item-group >
                <el-menu-item :index="routeRject.path" v-if="!routeRject.hidde && checkRole(routeRject.meta.anchors)">
                  {{ routeRject.meta.title }}
                </el-menu-item>
              </el-menu-item-group>
            </template>
          </el-sub-menu>
        </template>
      </el-sub-menu>

      <!-- 二级节点没有子集 -->
      <!-- 在这个菜单加一个公用方法这个公用方法是判断菜单是否展示，不展示代表没有权限 -->
      <el-menu-item :index="item.path" v-if="item.asideVisible === false && !item.hidde && checkRole(item.meta.anchors)">
        <el-icon>
          <setting />
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script  setup  lang="ts">

import { ref } from "vue";
import { useRouter } from "vue-router";
import { useCounter } from '../../store/index.ts'
import { checkRole } from '@/untils/permission.ts'


const counterStore: any = useCounter()
const router = useRouter()

// options.routes
const {
  options: { routes }
} = router;

// console.log("routes", routes)
const routesData = JSON.parse(JSON.stringify(routes));

const paths = ref("");

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const getUserResourceApi = () => {
  counterStore.getRoutes(routes)
}

getUserResourceApi()
</script>

<style scope lang="less">
.el-menu-vertical-demo {
  width: 201px;
}
</style>
