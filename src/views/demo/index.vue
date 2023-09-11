<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <router-link to="/demo/toLocalStorage">评论发表</router-link>
        <br />
        <router-link to="/demo/layOut">布局</router-link>
        <br />
        <router-link to="/demo/vue3">vue3使用</router-link>
      </el-aside>
      <el-main>
        <router-link to="/layout" style="float: right">返回首页</router-link>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>
<style scope>
.el-aside {
  background-color: #d3dce6;
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
