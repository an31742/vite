<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <div class="project-name">
          <h4>an的个人小天地</h4>
        </div>
        <div>
          <el-dropdown @command="handleCommand">
            <el-image :src="obj.url" :fit="fit" />
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="user">个人中心</el-dropdown-item>
                <el-dropdown-item command="loginOut">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <Mymue></Mymue>
        </el-aside>
        <el-main>
          <Home></Home>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import Home from "../home.vue";
import Mymue from "./myMue.vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { reactive } from "vue";
import { useRouter } from "vue-router";
// import useCurrentInstance from "@/utils/useCurrentInstance";
// const { proxy } = useCurrentInstance();
const router = useRouter();

const obj = reactive({
  url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
});

const handleCommand = (command: string | number | object) => {
  // ElMessage(`click on item ${command}`);
  if (command === "loginOut") {
    // ElMessage.warning(`是否退出登录吗`);
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
</script>

<style scoped>
.el-header {
  display: flex;
  justify-content: space-between;
  background-color: #333;
  align-items: center;
}
.el-aside {
  background-color: #545c64;
  height: calc(100vh - 60px);
}
.el-main {
  padding: 10px;
  height: calc(100vh - 60px);
}
.project-name {
  display: flex;
  justify-content: start;
  align-items: center;
  color: #fff;
  font-family: "Courier New", Courier, monospace;
}

.el-image {
  width: 50px;
  height: 50px;
  border-radius: 80px;
  margin-right: 20px;
}
</style>
