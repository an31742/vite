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

<script>
import Home from "../home";
import Mymue from "./myMue";
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
  background-color: #f0f0f0;
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
