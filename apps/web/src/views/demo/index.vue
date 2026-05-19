<template>
  <div class="saas-demo-layout">
    <el-main class="saas-demo-main">
      <router-view></router-view>
    </el-main>
  </div>
</template>

<style scope>
.saas-demo-layout {
  min-height: 100%;
}

.saas-demo-main {
  background: var(--saas-bg);
  color: var(--saas-text);
  min-height: calc(100vh - 64px);
}
</style>
