<template>
  <main class="saas-login">
    <!-- Left: Brand Panel -->
    <section class="login-brand">
      <div class="brand-bg-pattern"></div>
      <div class="brand-content">
        <div class="brand-logo">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="32" height="32">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
          <span>SaaS Platform</span>
        </div>
        <div class="brand-text">
          <h1>数智化前端实践平台</h1>
          <p>覆盖权限路由、低代码拖拽、全局弹窗、AI 流式交互、移动端刷新与前端面经知识库，适合面试时展示工程化和业务落地能力。</p>
        </div>
        <div class="brand-features">
          <div v-for="feature in features" :key="feature" class="feature-chip">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="20 6 9 17 4 12"/></svg>
            <span>{{ feature }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Right: Login Card -->
    <section class="login-form-section">
      <div class="form-container">
        <div class="form-header">
          <h2>欢迎回来</h2>
          <p>登录您的账号以继续访问 SaaS Platform</p>
        </div>

        <el-form :model="ruleForm" class="login-form" label-position="top" @keyup.enter="submitForm">
          <el-form-item label="账号">
            <ElInput
              v-model="ruleForm.name"
              size="large"
              placeholder="请输入账号"
              class="saas-input"
            />
          </el-form-item>
          <ElFormItem label="密码">
            <el-input
              v-model="ruleForm.password"
              show-password
              size="large"
              placeholder="请输入密码"
              class="saas-input"
            />
          </ElFormItem>
          <div class="form-options">
            <label class="remember-me">
              <input type="checkbox" checked />
              <span>记住我</span>
            </label>
            <a href="#" class="forgot-link">忘记密码?</a>
          </div>
          <ElButton
            type="primary"
            size="large"
            class="login-btn"
            @click="submitForm"
          >
            登 录
          </ElButton>
        </el-form>

        <div class="form-footer">
          <span>还没有账号?</span>
          <a href="#">立即注册</a>
        </div>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import { useRouter } from "vue-router";
import { reactive } from "vue";
import { useCounter } from "@/store/index.ts";

export default {
  setup() {
    const store = useCounter();
    const router = useRouter();
    const ruleForm = reactive({
      name: "admin",
      password: "12345",
    });

    const features = [
      "权限控制",
      "组件复用",
      "AI 接入",
      "性能分包",
    ];

    const submitForm = () => {
      store.getUserInfo(ruleForm);
      store.getAuthButtonList();
      window.localStorage.setItem("token", "an31742");
      router.push({ path: "/" });
    };

    return { ruleForm, submitForm, features };
  },
};
</script>

<style scoped lang="less">
.saas-login {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

/* ===== Left Brand Panel ===== */
.login-brand {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px;
  background: linear-gradient(135deg, #1E1B4B 0%, #312E81 50%, #3730A3 100%);
  color: #fff;
  overflow: hidden;
}

.brand-bg-pattern {
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(circle at 30% 40%, rgba(99, 102, 241, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 70% 60%, rgba(16, 185, 129, 0.15) 0%, transparent 40%),
    radial-gradient(circle at 50% 80%, rgba(129, 140, 248, 0.1) 0%, transparent 40%);
  pointer-events: none;
}

.brand-content {
  position: relative;
  max-width: 460px;
}

.brand-logo {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 40px;
  padding: 8px 16px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.brand-logo svg {
  color: #818CF8;
}
.brand-logo span {
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.brand-text h1 {
  margin: 0;
  font-size: 38px;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.15;
}

.brand-text p {
  margin: 20px 0 0;
  color: #C7D2FE;
  font-size: 16px;
  line-height: 1.8;
}

.brand-features {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 36px;
}

.feature-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 13px;
  font-weight: 500;
  color: #A5B4FC;
}

.feature-chip svg {
  color: #10B981;
}

/* ===== Right Form Section ===== */
.login-form-section {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--saas-bg);
  padding: 48px;
}

.form-container {
  width: 100%;
  max-width: 400px;
}

.form-header {
  margin-bottom: 32px;
}

.form-header h2 {
  margin: 0;
  font-size: 28px;
  font-weight: 800;
  color: var(--saas-text);
  letter-spacing: -0.02em;
}

.form-header p {
  margin: 8px 0 0;
  color: var(--saas-text-secondary);
  font-size: 15px;
}

.login-form {
  :deep(.el-form-item) {
    margin-bottom: 22px;
  }
  :deep(.el-form-item__label) {
    font-size: 14px;
    font-weight: 600;
    color: var(--saas-text);
    padding-bottom: 6px;
  }
}

.saas-input {
  :deep(.el-input__wrapper) {
    border-radius: 10px;
    border: 1px solid var(--saas-border);
    box-shadow: none !important;
    padding: 4px 16px;
    transition: all 0.2s;
    background: var(--saas-bg-card);
  }
  :deep(.el-input__wrapper:hover) {
    border-color: var(--saas-primary-light);
  }
  :deep(.el-input__wrapper.is-focus) {
    border-color: var(--saas-primary);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1) !important;
  }
  :deep(.el-input__inner) {
    font-size: 15px;
    color: var(--saas-text);
    &::placeholder {
      color: var(--saas-text-muted);
    }
  }
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--saas-text-secondary);
  cursor: pointer;
}
.remember-me input[type="checkbox"] {
  width: 16px;
  height: 16px;
  accent-color: var(--saas-primary);
  border-radius: 4px;
}

.forgot-link {
  font-size: 13px;
  color: var(--saas-primary);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}
.forgot-link:hover {
  color: var(--saas-primary-dark);
  text-decoration: underline;
}

.login-btn {
  width: 100%;
  height: 48px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  background: linear-gradient(135deg, var(--saas-primary), var(--saas-primary-dark));
  border: none;
  transition: all 0.2s;
  letter-spacing: 0.05em;
}
.login-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.35);
}

.form-footer {
  text-align: center;
  margin-top: 28px;
  font-size: 14px;
  color: var(--saas-text-secondary);
}
.form-footer a {
  color: var(--saas-primary);
  text-decoration: none;
  font-weight: 600;
  margin-left: 4px;
}
.form-footer a:hover {
  text-decoration: underline;
}

/* ===== Responsive ===== */
@media (max-width: 900px) {
  .saas-login {
    grid-template-columns: 1fr;
  }
  .login-brand {
    display: none;
  }
  .login-form-section {
    padding: 32px 24px;
  }
}
</style>
