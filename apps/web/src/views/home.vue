<template>
  <router-view v-if="route.name !== 'home'" />
  <main v-else class="saas-dashboard">
    <!-- Welcome Hero -->
    <section class="welcome-hero">
      <div class="hero-bg-pattern"></div>
      <div class="hero-content">
        <div class="hero-text">
          <span class="hero-badge">SaaS Platform v2.0</span>
          <h1>数智化前端实践平台</h1>
          <p>面向中后台、数据驾驶舱和移动 H5 场景，沉淀权限路由、组件拖拽、弹窗栈、AI 流式问答和性能分包等可复用能力。</p>
        </div>
        <div class="hero-actions">
          <button class="btn-primary" @click="router.push('/demo/pcDrag')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
            探索模块
          </button>
          <button class="btn-secondary" @click="router.push('/demo/Ai')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M12 2a4 4 0 014 4c0 2-2 3-4 3s-4-1-4-3a4 4 0 014-4z"/><path d="M16 22H8v-4a4 4 0 018 0v4z"/></svg>
            AI 体验
          </button>
        </div>
      </div>
      <div class="hero-stats">
        <div v-for="item in metrics" :key="item.label" class="stat-card">
          <div class="stat-value" :style="{ color: item.color }">{{ item.value }}</div>
          <div class="stat-label">{{ item.label }}</div>
        </div>
      </div>
    </section>

    <!-- KPI Cards -->
    <section class="kpi-grid">
      <article v-for="kpi in kpiData" :key="kpi.label" class="kpi-card">
        <div class="kpi-icon" :style="{ background: kpi.iconBg, color: kpi.iconColor }" v-html="kpi.icon"></div>
        <div class="kpi-info">
          <span class="kpi-label">{{ kpi.label }}</span>
          <strong class="kpi-value">{{ kpi.value }}</strong>
        </div>
        <div class="kpi-trend" :class="kpi.trend > 0 ? 'up' : 'down'">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
            <polyline :points="kpi.trend > 0 ? '18 15 12 9 6 15' : '6 9 12 15 18 9'"/>
          </svg>
          <span>{{ Math.abs(kpi.trend) }}%</span>
        </div>
      </article>
    </section>

    <!-- Content Grid -->
    <section class="content-grid">
      <!-- Tech Stack -->
      <article class="panel">
        <div class="panel-header">
          <h2>技术栈</h2>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
        </div>
        <ul class="tech-list">
          <li v-for="tech in techStack" :key="tech">{{ tech }}</li>
        </ul>
      </article>

      <!-- Quick Modules -->
      <article class="panel">
        <div class="panel-header">
          <h2>重要模块</h2>
          <button class="panel-link" @click="router.push('/demo')">查看全部</button>
        </div>
        <div class="module-grid">
          <button
            v-for="mod in modules"
            :key="mod.path"
            type="button"
            class="module-card"
            @click="router.push(mod.path)"
          >
            <div class="module-icon" v-html="mod.icon"></div>
            <div class="module-info">
              <strong>{{ mod.name }}</strong>
              <small>{{ mod.desc }}</small>
            </div>
          </button>
        </div>
      </article>

      <!-- Technical Solutions -->
      <article class="panel wide">
        <div class="panel-header">
          <h2>技术方案</h2>
        </div>
        <div class="solution-grid">
          <div v-for="item in solutions" :key="item.title" class="solution-card">
            <div class="solution-number">{{ item.num }}</div>
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
  { value: "Vue3", label: "核心框架", color: "#6366F1" },
  { value: "Vite", label: "构建工具", color: "#10B981" },
  { value: "Pinia", label: "状态管理", color: "#F59E0B" },
  { value: "5+", label: "可复用模块", color: "#EC4899" },
];

const kpiData = [
  {
    label: "页面模块",
    value: "24",
    trend: 12,
    iconBg: "#EEF2FF",
    iconColor: "#6366F1",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',
  },
  {
    label: "自定义指令",
    value: "8",
    trend: 25,
    iconBg: "#ECFDF5",
    iconColor: "#10B981",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
  },
  {
    label: "API 接口",
    value: "16",
    trend: -3,
    iconBg: "#FEF3C7",
    iconColor: "#F59E0B",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
  },
  {
    label: "Git Commits",
    value: "189",
    trend: 8,
    iconBg: "#FCE7F3",
    iconColor: "#EC4899",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22"><circle cx="12" cy="12" r="4"/><line x1="1.05" y1="12" x2="7" y2="12"/><line x1="17.01" y1="12" x2="22.96" y2="12"/></svg>',
  },
];

const techStack = [
  "Vue3 + TypeScript + Vite 工程化，路由模块化与按需加载",
  "Element Plus 组件体系，自定义指令覆盖防抖、节流、复制、水印、权限",
  "Pinia 持久化与路由守卫，支持菜单级、按钮级权限控制",
  "AI 流式交互页面，具备大模型接口接入和异常兜底思路",
];

const modules = [
  {
    name: "低代码拖拽",
    desc: "组件物料、画布编排、属性面板",
    path: "/demo/pcDrag",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="1"/><circle cx="15" cy="9" r="1"/><circle cx="9" cy="15" r="1"/><circle cx="15" cy="15" r="1"/></svg>',
  },
  {
    name: "全局弹窗",
    desc: "弹窗栈、动态组件、URL 状态同步",
    path: "/demo/globalPopup",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
  },
  {
    name: "AI 流式问答",
    desc: "SSE 读取、增量渲染、异常处理",
    path: "/demo/Ai",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><path d="M12 2a4 4 0 014 4c0 2-2 3-4 3s-4-1-4-3a4 4 0 014-4z"/><path d="M16 22H8v-4a4 4 0 018 0v4z"/></svg>',
  },
  {
    name: "权限表格",
    desc: "按钮级权限和角色控制",
    path: "/demo/vue3/authTable",
    icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>',
  },
];

const solutions = [
  {
    num: "01",
    title: "工程化",
    text: "路由按业务域拆分，Vite manualChunks 拆出框架、Element Plus 和工具依赖，控制首屏资源体积。",
  },
  {
    num: "02",
    title: "组件化",
    text: "低代码物料与属性编辑器分离，运行态组件和编辑态组件统一注册，便于持续扩展。",
  },
  {
    num: "03",
    title: "交互稳定性",
    text: "弹窗采用单例实例、栈管理和最大深度保护，避免多弹窗场景下状态混乱。",
  },
  {
    num: "04",
    title: "业务适配",
    text: "权限、菜单、数据展示、AI 辅助入口都能迁移到酒店会员、运营中台和数据驾驶舱场景。",
  },
];
</script>

<style scoped lang="less">
.saas-dashboard {
  min-height: 100%;
  padding: 24px 32px;
  background: var(--saas-bg);
  color: var(--saas-text);
}

/* ===== Welcome Hero ===== */
.welcome-hero {
  position: relative;
  padding: 36px 40px;
  border-radius: var(--saas-radius-lg);
  background: linear-gradient(135deg, #1E1B4B 0%, #312E81 50%, #3730A3 100%);
  color: #fff;
  overflow: hidden;
  margin-bottom: 24px;
}

.hero-bg-pattern {
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.2) 0%, transparent 40%),
    radial-gradient(circle at 60% 80%, rgba(129, 140, 248, 0.15) 0%, transparent 40%);
  pointer-events: none;
}

.hero-content {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 24px;
}

.hero-text {
  flex: 1;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: #A5B4FC;
  margin-bottom: 14px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

h1 {
  margin: 0;
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.hero-text p {
  margin: 14px 0 0;
  max-width: 600px;
  color: #C7D2FE;
  font-size: 15px;
  line-height: 1.7;
}

.hero-actions {
  display: flex;
  gap: 10px;
  flex-shrink: 0;
}

.btn-primary,
.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.btn-primary {
  background: #fff;
  color: #312E81;
}
.btn-primary:hover {
  background: #E0E7FF;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.15);
}
.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.18);
  transform: translateY(-1px);
}

.hero-stats {
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-top: 28px;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.stat-card {
  text-align: center;
}

.stat-value {
  font-size: 28px;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1;
}

.stat-label {
  margin-top: 6px;
  font-size: 13px;
  color: #A5B4FC;
}

/* ===== KPI Cards ===== */
.kpi-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.kpi-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 20px;
  border-radius: var(--saas-radius-md);
  background: var(--saas-bg-card);
  border: 1px solid var(--saas-border);
  transition: all 0.2s ease;
  position: relative;
}
.kpi-card:hover {
  box-shadow: var(--saas-shadow-md);
  transform: translateY(-2px);
  border-color: var(--saas-primary-light);
}

.kpi-icon {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  flex-shrink: 0;
}

.kpi-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.kpi-label {
  font-size: 12px;
  color: var(--saas-text-secondary);
  font-weight: 500;
}

.kpi-value {
  font-size: 22px;
  font-weight: 700;
  color: var(--saas-text);
  line-height: 1;
}

.kpi-trend {
  display: flex;
  align-items: center;
  gap: 3px;
  padding: 2px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  flex-shrink: 0;
  position: absolute;
  top: 14px;
  right: 14px;
}
.kpi-trend.up {
  background: #ECFDF5;
  color: #059669;
}
.kpi-trend.down {
  background: #FEF2F2;
  color: #DC2626;
}

/* ===== Content Grid ===== */
.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.panel {
  padding: 24px;
  border-radius: var(--saas-radius-md);
  background: var(--saas-bg-card);
  border: 1px solid var(--saas-border);
  transition: box-shadow 0.2s ease;
}
.panel:hover {
  box-shadow: var(--saas-shadow-sm);
}
.panel.wide {
  grid-column: 1 / -1;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}

.panel-header h2 {
  margin: 0;
  font-size: 17px;
  font-weight: 700;
  color: var(--saas-text);
}

.panel-link {
  border: none;
  background: none;
  color: var(--saas-primary);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.2s;
}
.panel-link:hover {
  color: var(--saas-primary-dark);
}

/* Tech List */
.tech-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.tech-list li {
  position: relative;
  padding-left: 20px;
  color: var(--saas-text-secondary);
  font-size: 14px;
  line-height: 1.6;
}
.tech-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 8px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--saas-primary);
  opacity: 0.6;
}

/* Module Grid */
.module-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.module-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  border: 1px solid var(--saas-border);
  border-radius: 10px;
  background: transparent;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
}
.module-card:hover {
  border-color: var(--saas-primary-light);
  background: var(--saas-sidebar-active-bg);
  transform: translateY(-1px);
}

.module-icon {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: var(--saas-sidebar-active-bg);
  color: var(--saas-primary);
  flex-shrink: 0;
}

.module-info {
  flex: 1;
  min-width: 0;
}
.module-info strong {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: var(--saas-text);
  margin-bottom: 3px;
}
.module-info small {
  display: block;
  color: var(--saas-text-muted);
  font-size: 12px;
  line-height: 1.4;
}

/* Solution Grid */
.solution-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}

.solution-card {
  padding: 20px;
  border-radius: 10px;
  background: var(--saas-bg);
  transition: all 0.2s ease;
}
.solution-card:hover {
  background: var(--saas-sidebar-active-bg);
}

.solution-number {
  font-size: 28px;
  font-weight: 800;
  color: var(--saas-primary);
  opacity: 0.3;
  line-height: 1;
  margin-bottom: 12px;
}

.solution-card h3 {
  margin: 0 0 8px;
  font-size: 15px;
  font-weight: 700;
  color: var(--saas-text);
}

.solution-card p {
  margin: 0;
  color: var(--saas-text-secondary);
  font-size: 13px;
  line-height: 1.6;
}

/* ===== Responsive ===== */
@media (max-width: 1024px) {
  .kpi-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .solution-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .saas-dashboard {
    padding: 16px;
  }
  .welcome-hero {
    padding: 24px;
  }
  .hero-content {
    flex-direction: column;
    align-items: stretch;
  }
  .hero-actions {
    margin-top: 16px;
  }
  .hero-stats {
    grid-template-columns: repeat(2, 1fr);
  }
  h1 {
    font-size: 24px;
  }
  .content-grid {
    grid-template-columns: 1fr;
  }
  .module-grid {
    grid-template-columns: 1fr;
  }
  .solution-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .kpi-grid {
    grid-template-columns: 1fr;
  }
  .hero-stats {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
