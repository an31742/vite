<template>
  <div class="saas-layout">
    <el-container>
      <!-- SaaS Sidebar -->
      <ElAside :width="asideWidth" class="saas-sidebar">
        <div class="sidebar-brand">
          <div class="brand-logo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="28" height="28">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <div class="brand-text" v-show="!isCollapsed">
            <strong>SaaS Platform</strong>
            <span>数智化前端平台</span>
          </div>
          <button class="collapse-btn" @click="toggleSidebar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
              <polyline v-if="!isCollapsed" points="15 18 9 12 15 6"/>
              <polyline v-else points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>
        <div class="sidebar-menu">
          <Mymue :is-collapsed="isCollapsed" />
        </div>
        <div class="sidebar-footer">
          <div class="user-card" v-show="!isCollapsed">
            <el-image :src="obj.url" fit="cover" class="user-avatar" />
            <div class="user-info">
              <strong>Admin</strong>
              <span>管理员</span>
            </div>
            <ElDropdown @command="handleCommand" trigger="click">
              <button class="user-more">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                  <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
                </svg>
              </button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="user">个人中心</el-dropdown-item>
                  <el-dropdown-item command="loginOut">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </ElDropdown>
          </div>
        </div>
      </ElAside>

      <!-- Main Area -->
      <el-container class="saas-main-container">
        <!-- SaaS Header -->
        <el-header class="saas-header">
          <div class="header-left">
            <button class="header-icon-btn" @click="toggleSidebar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
            <div class="header-breadcrumb">
              <span>首页</span>
            </div>
          </div>
          <div class="header-right">
            <button class="header-icon-btn" @click="changeDark">
              <svg v-if="!dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
              </svg>
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
                <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            </button>
            <ElDropdown @command="handleCommand" trigger="click">
              <button class="header-avatar-btn">
                <el-image :src="obj.url" fit="cover" class="header-avatar" />
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="6 9 12 15 18 9"/></svg>
              </button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="user">个人中心</el-dropdown-item>
                  <el-dropdown-item command="loginOut">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </ElDropdown>
          </div>
        </el-header>

        <!-- Page Content -->
        <el-main class="saas-main">
          <Home />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import Home from "../home.vue";
import Mymue from "./myMue.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const dark = ref<boolean>(false);
const isCollapsed = ref<boolean>(false);
const asideWidth = ref<string>("260px");

const obj = ref({
  url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
});

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
  asideWidth.value = isCollapsed.value ? "72px" : "260px";
};

const handleCommand = (command: string | number | object) => {
  if (command === "loginOut") {
    ElMessageBox.confirm("确定要退出登录吗?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }).then(() => {
      router.push("/login");
      localStorage.clear();
      ElMessage({ type: "success", message: "已退出登录" });
    }).catch(() => {});
  }
};

const changeDark = () => {
  dark.value = !dark.value;
  const html = document.documentElement;
  html.className = dark.value ? "dark" : "";
};
</script>

<style scoped lang="less">
.saas-layout {
  min-height: 100vh;
  background: var(--saas-bg);
}

/* ===== Sidebar ===== */
.saas-sidebar {
  background: var(--saas-sidebar-bg);
  border-right: 1px solid var(--saas-border);
  display: flex;
  flex-direction: column;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  z-index: 100;
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px 20px 16px;
  position: relative;
  border-bottom: 1px solid var(--saas-border);
}

.brand-logo {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--saas-primary), var(--saas-primary-light));
  border-radius: 10px;
  color: #fff;
}

.brand-text {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
}
.brand-text strong {
  font-size: 16px;
  font-weight: 700;
  color: var(--saas-text);
  white-space: nowrap;
}
.brand-text span {
  font-size: 11px;
  color: var(--saas-text-muted);
  white-space: nowrap;
}

.collapse-btn {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--saas-border);
  border-radius: 6px;
  background: transparent;
  color: var(--saas-text-secondary);
  cursor: pointer;
  transition: all 0.2s;
}
.collapse-btn:hover {
  background: var(--saas-sidebar-active-bg);
  color: var(--saas-primary);
}

.sidebar-menu {
  flex: 1;
  overflow-y: auto;
  padding: 12px 12px;
}

.sidebar-footer {
  border-top: 1px solid var(--saas-border);
  padding: 12px 16px;
}

.user-card {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  flex-shrink: 0;
}

.user-info {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.user-info strong {
  font-size: 13px;
  font-weight: 600;
  color: var(--saas-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.user-info span {
  font-size: 11px;
  color: var(--saas-text-muted);
}

.user-more {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: var(--saas-text-secondary);
  cursor: pointer;
  transition: all 0.2s;
}
.user-more:hover {
  background: var(--saas-sidebar-active-bg);
  color: var(--saas-primary);
}

/* ===== Main Container ===== */
.saas-main-container {
  margin-left: v-bind(asideWidth);
  transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* ===== Header ===== */
.saas-header {
  height: 64px !important;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  background: var(--saas-header-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--saas-border);
  position: sticky;
  top: 0;
  z-index: 50;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-icon-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: var(--saas-text-secondary);
  cursor: pointer;
  transition: all 0.2s;
}
.header-icon-btn:hover {
  background: var(--saas-sidebar-active-bg);
  color: var(--saas-primary);
}

.header-breadcrumb {
  font-size: 14px;
  color: var(--saas-text-secondary);
}

.header-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.header-avatar-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px 4px 4px;
  border: 1px solid var(--saas-border);
  border-radius: 10px;
  background: transparent;
  cursor: pointer;
  transition: all 0.2s;
  color: var(--saas-text-secondary);
}
.header-avatar-btn:hover {
  border-color: var(--saas-primary);
  background: var(--saas-sidebar-active-bg);
}

.header-avatar {
  width: 32px;
  height: 32px;
  border-radius: 8px;
}

/* ===== Main Content ===== */
.saas-main {
  padding: 0;
  background: var(--saas-bg);
  min-height: calc(100vh - 64px);
}
</style>
