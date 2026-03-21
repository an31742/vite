<!--
 * @Author: maxiangan
 * @Date: 2023-09-11 10:38:59
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-10-26 14:29:27
 * @Description: 请填写简介
-->
<template>
  <div v-for="firstRoute in routesData" :key="firstRoute.path">
    <template
            v-for="item in firstRoute.children?.filter(Boolean)"
            :key="item.path"
        >
      <div v-if="item">
        <el-menu
          active-text-color="#ffd04b"
          background-color="#545c64"
          class="el-menu-vertical-demo"
          :default-active="item.path"
          text-color="#fff"
          @open="handleOpen"
          router
                    @close="handleClose"
          v-if="!item.hidde"
        >
          <!-- 二级节有子集 -->
          <el-sub-menu
            v-if="
                            item.asideVisible === true &&
                                !item.hidde &&
                                checkRole(item.meta.anchors)
                        "
                        :index="item.path"
          >
            <template #title>
              <el-icon>
                <location />
              </el-icon>
              <span>{{ item.meta.title }} </span>
            </template>
            <template
              v-for="routeChild in item.children"
              :key="routeChild.path"
            >
              <ElMenuItemGroup
                                v-if="
                                    routeChild.children === 0 ||
                                        (routeChild.children === undefined &&
                                            !routeChild.hidde &&
                                            checkRole(routeChild.meta.anchors))
                                "
                            >
                                <ElMenuItem :index="routeChild.path">
                  {{ routeChild.meta.title }}</ElMenuItem
                                >
                            </ElMenuItemGroup>

              <el-sub-menu
                v-else
                v-show="!routeChild.hidde && checkRole(routeChild.meta.anchors)"
                                :index="routeChild.path"
              >
                <template #title>{{ routeChild.meta.title }}</template>

                <template
                  v-for="routeRject in routeChild.children"
                  :key="routeRject.path"
                >
                  <ElMenuItemGroup>
                                        <el-menu-item
                                            :index="routeRject.path"
                                            v-if="
                                                !routeRject.hidde && checkRole(routeRject.meta.anchors)
                                            "
                                        >
                                            {{ routeRject.meta.title }}
                                        </el-menu-item>
                                    </ElMenuItemGroup>
                </template>
              </el-sub-menu>
            </template>
          </el-sub-menu>

          <!-- 二级节点没有子集 -->
          <!-- 在这个菜单加一个公用方法这个公用方法是判断菜单是否展示，不展示代表没有权限 -->
          <ElMenuItem
                        :index="item.path"
                        v-if="
                            item.asideVisible === false &&
                                !item.hidde &&
                                checkRole(item.meta.anchors)
                        "
                    >
                        <el-icon>
                            <Setting />
                        </el-icon>
                        <span>{{ item.meta.title }}</span>
                    </ElMenuItem>
        </el-menu>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useCounter } from "@/store/index.ts";
import { checkRole } from "@/utils/permission.ts";

const counterStore: any = useCounter();
const router = useRouter();

// options.routes
const {
  options: { routes },
} = router;

const routesData: any = ref([]);
routesData.value = JSON.parse(JSON.stringify(routes));
// const routesData = JSON.parse(JSON.stringify(routes));

const paths = ref("");

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

const getUserResourceApi = () => {
  counterStore.getRoutes(routes);
};

getUserResourceApi();
</script>

<style scope lang="less">
.el-menu-vertical-demo {
  width: 201px;
}
</style>
