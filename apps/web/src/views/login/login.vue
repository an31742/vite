<template>
  <main class="login-page">
    <section class="login-intro">
      <p class="eyebrow">Vue3 + Vite + TypeScript</p>
      <h1>数智化前端实践平台</h1>
      <p class="summary">
        覆盖权限路由、低代码拖拽、全局弹窗、AI 流式交互、移动端刷新与前端面经知识库，适合面试时展示工程化和业务落地能力。
      </p>
      <div class="feature-grid">
        <span>权限控制</span>
        <span>组件复用</span>
        <span>AI 接入</span>
        <span>性能分包</span>
      </div>
    </section>

    <el-form :model="ruleForm" class="login-card" label-position="top">
      <h2>演示登录</h2>
      <p class="hint">默认账号已填充，进入后可按左侧菜单展示核心模块。</p>
      <el-form-item label="账号">
        <ElInput v-model="ruleForm.name" size="large" />
      </el-form-item>
      <ElFormItem label="密码">
        <el-input v-model="ruleForm.password" show-password size="large" />
      </ElFormItem>
      <ElButton
        type="primary"
        size="large"
        class="login-button"
        @click="submitForm"
      >
        进入项目
      </ElButton>
    </el-form>
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

    const submitForm = () => {
      store.getUserInfo(ruleForm);
      store.getAuthButtonList();
      window.localStorage.setItem("token", "an31742");
      router.push({
        path: "/",
      });
    };

    return {
      ruleForm,
      submitForm,
    };
  },
};
</script>

<style scoped lang="less">
.login-page {
  min-height: 100vh;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 420px;
  gap: 56px;
  align-items: center;
  padding: 48px 9vw;
  background:
    linear-gradient(110deg, rgba(12, 24, 44, 0.88), rgba(19, 50, 76, 0.72)),
    url("@/assets/bgLogin.webp") center / cover no-repeat;
  color: #fff;
}

.login-intro {
  max-width: 720px;
}

.eyebrow {
  margin: 0 0 14px;
  color: #8fd3ff;
  font-size: 14px;
  font-weight: 700;
}

h1 {
  margin: 0;
  font-size: 44px;
  line-height: 1.15;
  letter-spacing: 0;
}

.summary {
  margin: 22px 0 28px;
  max-width: 640px;
  color: #d8e5f4;
  font-size: 17px;
  line-height: 1.8;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(88px, 1fr));
  gap: 12px;
  max-width: 560px;
}

.feature-grid span {
  padding: 12px 14px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.08);
  text-align: center;
  font-size: 14px;
}

.login-card {
  padding: 32px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.24);
  color: #172033;
}

.login-card h2 {
  margin: 0 0 8px;
  font-size: 24px;
}

.hint {
  margin: 0 0 24px;
  color: #64748b;
  line-height: 1.6;
}

.login-button {
  width: 100%;
  margin-top: 6px;
}

@media (max-width: 900px) {
  .login-page {
    grid-template-columns: 1fr;
    gap: 28px;
    padding: 32px 20px;
  }

  h1 {
    font-size: 32px;
  }

  .feature-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
