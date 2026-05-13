<template>
  <router-view v-if="route.name !== 'home'" />
  <main v-else class="dashboard">
    <section class="hero">
      <div>
        <p class="eyebrow">Interview Showcase</p>
        <h1>Vue 数智化前端项目展示</h1>
        <p class="summary">
          面向中后台、数据驾驶舱和移动 H5 场景，沉淀权限路由、组件拖拽、弹窗栈、AI
          流式问答和性能分包等可复用能力。
        </p>
      </div>
      <div class="hero-panel">
        <span>建议演示路径</span>
        <strong>首页 → 低代码拖拽 → 全局弹窗 → AI 流式 → 权限控制</strong>
      </div>
    </section>

    <section class="metrics">
      <article v-for="item in metrics" :key="item.label">
        <strong>{{ item.value }}</strong>
        <span>{{ item.label }}</span>
      </article>
    </section>

    <section class="content-grid">
      <article class="panel">
        <h2>岗位匹配点</h2>
        <ul>
          <li>Vue3 + TypeScript + Vite 工程化，路由模块化与按需加载。</li>
          <li>Element Plus 组件体系，自定义指令覆盖防抖、节流、复制、水印、权限。</li>
          <li>Pinia 持久化与路由守卫，支持菜单级、按钮级权限控制。</li>
          <li>AI 流式交互页面，具备大模型接口接入和异常兜底思路。</li>
        </ul>
      </article>

      <article class="panel">
        <h2>重点展示模块</h2>
        <div class="module-list">
          <button
            v-for="module in modules"
            :key="module.path"
            type="button"
            @click="router.push(module.path)"
          >
            <span>{{ module.name }}</span>
            <small>{{ module.desc }}</small>
          </button>
        </div>
      </article>

      <article class="panel wide">
        <h2>可讲述的技术方案</h2>
        <div class="solution-grid">
          <div v-for="item in solutions" :key="item.title">
            <h3>{{ item.title }}</h3>
            <p>{{ item.text }}</p>
          </div>
        </div>
      </article>
    </section>
  </main>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const metrics = [
  { value: "Vue3", label: "核心框架" },
  { value: "Vite", label: "构建工具" },
  { value: "Pinia", label: "状态管理" },
  { value: "5+", label: "可复用模块" },
];

const modules = [
  {
    name: "低代码拖拽",
    desc: "组件物料、画布编排、属性面板",
    path: "/demo/pcDrag",
  },
  {
    name: "全局弹窗",
    desc: "弹窗栈、动态组件、URL 状态同步",
    path: "/demo/globalPopup",
  },
  {
    name: "AI 流式问答",
    desc: "SSE 读取、增量渲染、异常处理",
    path: "/demo/Ai",
  },
  {
    name: "权限表格",
    desc: "按钮级权限和角色控制",
    path: "/demo/vue3/authTable",
  },
];

const solutions = [
  {
    title: "工程化",
    text: "路由按业务域拆分，Vite manualChunks 拆出框架、Element Plus 和工具依赖，控制首屏资源体积。",
  },
  {
    title: "组件化",
    text: "低代码物料与属性编辑器分离，运行态组件和编辑态组件统一注册，便于持续扩展。",
  },
  {
    title: "交互稳定性",
    text: "弹窗采用单例实例、栈管理和最大深度保护，避免多弹窗场景下状态混乱。",
  },
  {
    title: "业务适配",
    text: "权限、菜单、数据展示、AI 辅助入口都能迁移到酒店会员、运营中台和数据驾驶舱场景。",
  },
];
</script>

<style scoped lang="less">
.dashboard {
  min-height: 100%;
  padding: 24px;
  background: #f4f7fb;
  color: #172033;
}

.hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 340px;
  gap: 24px;
  align-items: stretch;
  padding: 28px;
  border-radius: 8px;
  background: linear-gradient(135deg, #172033, #24516d);
  color: #fff;
}

.eyebrow {
  margin: 0 0 10px;
  color: #91d9ff;
  font-size: 13px;
  font-weight: 700;
}

h1,
h2,
h3,
p {
  margin: 0;
}

h1 {
  font-size: 34px;
  line-height: 1.2;
  letter-spacing: 0;
}

.summary {
  margin-top: 16px;
  max-width: 760px;
  color: #dceaf7;
  line-height: 1.8;
}

.hero-panel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.08);
}

.hero-panel span {
  color: #b8d8ee;
  font-size: 13px;
}

.hero-panel strong {
  line-height: 1.7;
}

.metrics {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
  margin: 18px 0;
}

.metrics article,
.panel {
  border: 1px solid #dce5ef;
  border-radius: 8px;
  background: #fff;
}

.metrics article {
  padding: 18px;
}

.metrics strong {
  display: block;
  margin-bottom: 6px;
  font-size: 28px;
}

.metrics span {
  color: #64748b;
}

.content-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 18px;
}

.panel {
  padding: 22px;
}

.panel.wide {
  grid-column: 1 / -1;
}

h2 {
  margin-bottom: 16px;
  font-size: 20px;
}

ul {
  margin: 0;
  padding-left: 20px;
  color: #43546a;
  line-height: 1.9;
}

.module-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.module-list button {
  min-height: 86px;
  padding: 14px;
  border: 1px solid #d7e2ee;
  border-radius: 8px;
  background: #f8fbff;
  text-align: left;
  cursor: pointer;
  transition:
    border-color 0.2s ease,
    transform 0.2s ease;
}

.module-list button:hover {
  border-color: #409eff;
  transform: translateY(-1px);
}

.module-list span {
  display: block;
  margin-bottom: 8px;
  color: #172033;
  font-weight: 700;
}

.module-list small {
  color: #64748b;
  line-height: 1.5;
}

.solution-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

.solution-grid div {
  padding: 16px;
  border-radius: 8px;
  background: #f6f9fc;
}

h3 {
  margin-bottom: 8px;
  font-size: 16px;
}

.solution-grid p {
  color: #52657a;
  line-height: 1.7;
}

@media (max-width: 980px) {
  .hero,
  .content-grid,
  .solution-grid {
    grid-template-columns: 1fr;
  }

  .metrics,
  .module-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 560px) {
  .dashboard {
    padding: 14px;
  }

  .hero {
    padding: 20px;
  }

  h1 {
    font-size: 26px;
  }

  .metrics,
  .module-list {
    grid-template-columns: 1fr;
  }
}
</style>
