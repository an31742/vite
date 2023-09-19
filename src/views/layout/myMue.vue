<template>
  <div v-for="item in routesData" :key="item.name">
    <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo"
      :default-active="item.path" text-color="#fff" @open="handleOpen" @close="handleClose" router v-if="!item.hidde"
      >
      <!-- 二级节有子集 -->
      <el-sub-menu :index="item.path" v-if="item.asideVisible === true && !item.hidde">
        <template #title>
          <el-icon>
            <location />
          </el-icon>
          <span>{{ item.meta.title }} </span>
        </template>
        <template v-for="routeChild in item.children" :key="routeChild.name" >
          <el-menu-item-group v-if="routeChild.children === 0 || routeChild.children === undefined  && !routeChild.hidde
            ">
            <el-menu-item :index="routeChild.path">{{
              routeChild.meta.title
            }}</el-menu-item>
          </el-menu-item-group>

          <el-sub-menu v-else :index="routeChild.path" v-show="!routeChild.hidde">
            <template #title >{{ routeChild.meta.title }}</template>

            <template v-for="routeRject in routeChild.children" :key="routeRject.name" >
              <el-menu-item-group >
                <el-menu-item :index="routeRject.path" v-if="!routeRject.hidde">
                  {{ routeRject.meta.title }}
                </el-menu-item>
              </el-menu-item-group>
            </template>
          </el-sub-menu>
        </template>
      </el-sub-menu>

      <!-- 二级节点没有子集 -->
      <el-menu-item :index="item.path" v-if="item.asideVisible === false && !item.hidde">
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
import {storeToRefs} from 'pinia'

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
