<template>
  <div class="common-layout">
    <el-container>
      <el-header>Header</el-header>
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

<script lang="ts">
import Home from "../home.vue";
import Mymue from "./myMue.vue";
export default {
  name: "",
  components: {
    Home,
    Mymue,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.el-header {
  background-color: #333;
}
.el-aside {
  background-color: #545c64;
  height: calc(100vh - 60px);
}
.el-main {
  padding: 10px;
  height: calc(100vh - 60px);
}
</style>
