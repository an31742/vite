<template>
  <div class="common-layout">
    <el-container>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>
<style scope>
.el-aside {
  background-color: #333;
  color: #333;
  text-align: center;
  line-height: 40px;
  height: 100vh;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: left;
  height: 100vh;
}
</style>
