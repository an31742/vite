<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <div class="project-name">
          <h4>数智化前端实践平台</h4>
        </div>
        <div>
          <span class="theme-label">切换主题</span>
          <ElSwitch
            @change="changeDark"
            v-model="dark"
            class="mt-2"
            style="margin-left: 24px"
            inline-prompt
            active-icon="MoonNight"
            inactive-icon="Sunny"
          />
        </div>
        <div>
          <ElDropdown @command="handleCommand">
            <el-image :src="obj.url" fit="cover" />
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="user">个人中心</el-dropdown-item>
                <el-dropdown-item command="loginOut">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </ElDropdown>
        </div>
      </el-header>
      <el-container>
        <ElAside width="200px">
          <Mymue></Mymue>
        </ElAside>
        <el-main>
          <Home> </Home>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import Home from "../home.vue";
import Mymue from "./myMue.vue";

import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
// import useCurrentInstance from "@/utils/useCurrentInstance";
// const { proxy } = useCurrentInstance();
const router = useRouter();
let dark = ref<boolean>(false);

const obj = reactive({
  url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
});

const handleCommand = (command: string | number | object) => {
  if (command === "loginOut") {
    ElMessageBox.confirm("您确定要退出登录吗?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    })
      .then(() => {
        router.push("/login");
        localStorage.clear();
        ElMessage({
          type: "success",
          message: "操作成功!",
        });
      })
      .catch(() => {
        ElMessage({
          type: "info",
          message: "已取消操作",
        });
      });
  }
};
const changeDark = () => {
  const html = document.documentElement;
  dark.value ? (html.className = "dark") : (html.className = "");
};
</script>

<style scoped>
.common-layout {
  min-height: 100vh;
  background: #f4f7fb;
}
.el-header {
  display: flex;
  justify-content: space-between;
  background: #172033;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.el-aside {
  background-color: #202b3d;
  height: calc(100vh - 60px);
}
.el-main {
  padding: 0;
  height: calc(100vh - 60px);
  overflow: auto;
}
.project-name {
  display: flex;
  justify-content: start;
  align-items: center;
  color: #fff;
  letter-spacing: 0;
}
.project-name h4 {
  margin: 0;
  font-size: 16px;
  font-weight: 650;
}
.theme-label {
  color: #dbe6f5;
  font-size: 14px;
}

.el-image {
  width: 50px;
  height: 50px;
  border-radius: 80px;
  margin-right: 20px;
}
</style>
