<template>
  <div
    ref="cockpitRef"
    class="cockpit-container"
    :class="{ 'is-fullscreen': isFullscreen }"
  >
    <!-- 头部 -->
    <header class="cockpit-header">
      <div class="header-left">
        <span class="header-date">{{ currentDate }}</span>
        <span class="header-time">{{ currentTime }}</span>
      </div>
      <h1 class="header-title">数据可视化驾驶舱</h1>
      <div class="header-right">
        <el-button
          type="primary"
          :icon="isFullscreen ? Crop : FullScreen"
          @click="toggleFullscreen"
          class="fullscreen-btn"
        >
          {{ isFullscreen ? "退出全屏" : "全屏展示" }}
        </el-button>
      </div>
    </header>

    <!-- 主体内容 -->
    <main class="cockpit-main">
      <!-- 左侧列 -->
      <div class="main-left">
        <div class="chart-card">
          <div class="card-header">
            <span class="card-title">销售业绩趋势</span>
            <span class="card-subtitle">Sales Performance</span>
          </div>
          <div class="card-body">
            <v-chart class="chart" :option="lineChartOption" autoresize />
          </div>
        </div>

        <div class="chart-card">
          <div class="card-header">
            <span class="card-title">产品类别占比</span>
            <span class="card-subtitle">Product Category</span>
          </div>
          <div class="card-body">
            <v-chart class="chart" :option="pieChartOption" autoresize />
          </div>
        </div>
      </div>

      <!-- 中间列 -->
      <div class="main-center">
        <div class="data-overview">
          <div
            class="overview-item"
            v-for="(item, index) in overviewData"
            :key="index"
          >
            <div class="overview-icon" :style="{ background: item.gradient }">
              <el-icon :size="28"><component :is="item.icon" /></el-icon>
            </div>
            <div class="overview-info">
              <div class="overview-value">{{ item.value }}</div>
              <div class="overview-label">{{ item.label }}</div>
            </div>
          </div>
        </div>

        <div class="chart-card map-card">
          <div class="card-header">
            <span class="card-title">区域分布热力</span>
            <span class="card-subtitle">Regional Distribution</span>
          </div>
          <div class="card-body">
            <div v-if="!mapLoaded" class="map-loading">
              <el-icon class="is-loading"><Loading /></el-icon>
              <span>地图数据加载中...</span>
            </div>
            <v-chart
              v-else
              class="chart map-chart"
              :option="mapChartOption"
              autoresize
            />
          </div>
        </div>
      </div>

      <!-- 右侧列 -->
      <div class="main-right">
        <div class="chart-card">
          <div class="card-header">
            <span class="card-title">部门业绩排名</span>
            <span class="card-subtitle">Department Ranking</span>
          </div>
          <div class="card-body">
            <v-chart class="chart" :option="barChartOption" autoresize />
          </div>
        </div>

        <div class="chart-card">
          <div class="card-header">
            <span class="card-title">实时交易动态</span>
            <span class="card-subtitle">Realtime Transactions</span>
          </div>
          <div class="card-body">
            <div class="scroll-list">
              <SeamlessScroll
                :list="transactionList"
                class="seamless-wrap"
                :step="0.5"
              >
                <div
                  class="scroll-item"
                  v-for="(item, index) in transactionList"
                  :key="index"
                >
                  <span class="item-type" :class="item.type">{{
                    item.typeText
                  }}</span>
                  <span class="item-name">{{ item.name }}</span>
                  <span class="item-amount" :class="item.type">{{
                    item.amount
                  }}</span>
                  <span class="item-time">{{ item.time }}</span>
                </div>
              </SeamlessScroll>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import {
  LineChart,
  BarChart,
  PieChart,
  MapChart,
  EffectScatterChart,
} from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  GeoComponent,
  VisualMapComponent,
  DatasetComponent,
} from "echarts/components";
import VChart from "vue-echarts";
import screenfull from "screenfull";
import {
  FullScreen,
  Crop,
  Loading,
  TrendCharts,
  Money,
  ShoppingCart,
  User,
} from "@element-plus/icons-vue";
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";

const SeamlessScroll = Vue3SeamlessScroll as any;

// 注册 ECharts 组件
use([
  CanvasRenderer,
  LineChart,
  BarChart,
  PieChart,
  MapChart,
  EffectScatterChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  GeoComponent,
  VisualMapComponent,
  DatasetComponent,
]);

// DOM 引用
const cockpitRef = ref<HTMLElement>();

// 全屏状态
const isFullscreen = ref(false);

// 当前时间
const currentDate = ref("");
const currentTime = ref("");
let timeTimer: number | null = null;

// 地图加载状态
const mapLoaded = ref(false);

// 概览数据
const overviewData = [
  {
    icon: TrendCharts,
    label: "总销售额",
    value: "¥ 2,345,678",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    icon: Money,
    label: "今日收入",
    value: "¥ 128,456",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
  {
    icon: ShoppingCart,
    label: "订单数量",
    value: "8,456",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  },
  {
    icon: User,
    label: "活跃用户",
    value: "12,345",
    gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  },
];

// 交易动态数据
interface TransactionItem {
  type: string;
  typeText: string;
  name: string;
  amount: string;
  time: string;
}

const transactionList = ref<TransactionItem[]>([
  {
    type: "income",
    typeText: "收入",
    name: "产品销售-A类",
    amount: "+¥12,500",
    time: "10:23:45",
  },
  {
    type: "expense",
    typeText: "支出",
    name: "采购成本-B类",
    amount: "-¥8,200",
    time: "10:22:18",
  },
  {
    type: "income",
    typeText: "收入",
    name: "服务费用-C类",
    amount: "+¥3,800",
    time: "10:21:05",
  },
  {
    type: "income",
    typeText: "收入",
    name: "产品销售-D类",
    amount: "+¥21,000",
    time: "10:19:42",
  },
  {
    type: "expense",
    typeText: "支出",
    name: "运营费用-E类",
    amount: "-¥5,600",
    time: "10:18:30",
  },
  {
    type: "income",
    typeText: "收入",
    name: "产品销售-F类",
    amount: "+¥15,300",
    time: "10:17:15",
  },
  {
    type: "expense",
    typeText: "支出",
    name: "采购成本-G类",
    amount: "-¥9,100",
    time: "10:15:58",
  },
  {
    type: "income",
    typeText: "收入",
    name: "服务费用-H类",
    amount: "+¥6,700",
    time: "10:14:22",
  },
  {
    type: "income",
    typeText: "收入",
    name: "产品销售-I类",
    amount: "+¥18,900",
    time: "10:13:10",
  },
  {
    type: "expense",
    typeText: "支出",
    name: "运营费用-J类",
    amount: "-¥4,300",
    time: "10:11:45",
  },
]);

// 折线图配置
const lineChartOption = computed(() => ({
  backgroundColor: "transparent",
  tooltip: {
    trigger: "axis",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderColor: "#00d4ff",
    textStyle: { color: "#fff" },
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    top: "10%",
    containLabel: true,
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: [
      "1月",
      "2月",
      "3月",
      "4月",
      "5月",
      "6月",
      "7月",
      "8月",
      "9月",
      "10月",
      "11月",
      "12月",
    ],
    axisLine: { lineStyle: { color: "rgba(255, 255, 255, 0.3)" } },
    axisLabel: { color: "rgba(255, 255, 255, 0.7)" },
  },
  yAxis: {
    type: "value",
    axisLine: { lineStyle: { color: "rgba(255, 255, 255, 0.3)" } },
    axisLabel: { color: "rgba(255, 255, 255, 0.7)" },
    splitLine: { lineStyle: { color: "rgba(255, 255, 255, 0.1)" } },
  },
  series: [
    {
      name: "销售额",
      type: "line",
      smooth: true,
      symbol: "circle",
      symbolSize: 8,
      sampling: "average",
      itemStyle: { color: "#00d4ff" },
      areaStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: "rgba(0, 212, 255, 0.5)" },
            { offset: 1, color: "rgba(0, 212, 255, 0.05)" },
          ],
        },
      },
      data: [120, 132, 101, 134, 90, 230, 210, 180, 250, 280, 320, 350],
    },
    {
      name: "目标值",
      type: "line",
      smooth: true,
      symbol: "none",
      lineStyle: { type: "dashed", color: "#ff6b6b", width: 2 },
      data: [100, 120, 120, 140, 100, 200, 200, 190, 240, 260, 300, 330],
    },
  ],
}));

// 饼图配置
const pieChartOption = computed(() => ({
  backgroundColor: "transparent",
  tooltip: {
    trigger: "item",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderColor: "#00d4ff",
    textStyle: { color: "#fff" },
  },
  legend: {
    orient: "vertical",
    right: "5%",
    top: "center",
    textStyle: { color: "rgba(255, 255, 255, 0.8)" },
  },
  series: [
    {
      name: "产品类别",
      type: "pie",
      radius: ["40%", "70%"],
      center: ["35%", "50%"],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: "#0a0e27",
        borderWidth: 2,
      },
      label: { show: false },
      emphasis: {
        label: {
          show: true,
          fontSize: 16,
          fontWeight: "bold",
          color: "#fff",
        },
      },
      labelLine: { show: false },
      data: [
        { value: 1048, name: "电子产品", itemStyle: { color: "#5470c6" } },
        { value: 735, name: "服装配饰", itemStyle: { color: "#91cc75" } },
        { value: 580, name: "食品饮料", itemStyle: { color: "#fac858" } },
        { value: 484, name: "家居用品", itemStyle: { color: "#ee6666" } },
        { value: 300, name: "其他", itemStyle: { color: "#73c0de" } },
      ],
    },
  ],
}));

// 柱状图配置
const barChartOption = computed(() => ({
  backgroundColor: "transparent",
  tooltip: {
    trigger: "axis",
    axisPointer: { type: "shadow" },
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderColor: "#00d4ff",
    textStyle: { color: "#fff" },
  },
  grid: {
    left: "3%",
    right: "8%",
    bottom: "3%",
    top: "5%",
    containLabel: true,
  },
  xAxis: {
    type: "value",
    axisLine: { lineStyle: { color: "rgba(255, 255, 255, 0.3)" } },
    axisLabel: { color: "rgba(255, 255, 255, 0.7)" },
    splitLine: { lineStyle: { color: "rgba(255, 255, 255, 0.1)" } },
  },
  yAxis: {
    type: "category",
    data: ["研发部", "销售部", "市场部", "人事部", "财务部", "运营部"],
    axisLine: { lineStyle: { color: "rgba(255, 255, 255, 0.3)" } },
    axisLabel: { color: "rgba(255, 255, 255, 0.7)" },
  },
  series: [
    {
      name: "业绩",
      type: "bar",
      barWidth: "60%",
      data: [320, 450, 380, 280, 220, 410],
      itemStyle: {
        borderRadius: [0, 5, 5, 0],
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [
            { offset: 0, color: "#00d4ff" },
            { offset: 1, color: "#0099ff" },
          ],
        },
      },
    },
  ],
}));

// 地图配置
const mapChartOption = computed(() => ({
  backgroundColor: "transparent",
  tooltip: {
    trigger: "item",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderColor: "#00d4ff",
    textStyle: { color: "#fff" },
    formatter: (params: any) => {
      if (params.seriesType === "effectScatter") {
        return `${params.name}<br/>销售额: ¥${params.value[2]}万`;
      }
      return `${params.name}<br/>销售额: ¥${params.value || 0}万`;
    },
  },
  visualMap: {
    min: 0,
    max: 600,
    left: "5%",
    bottom: "5%",
    text: ["高", "低"],
    calculable: true,
    inRange: {
      color: [
        "rgba(0, 212, 255, 0.2)",
        "rgba(0, 212, 255, 0.5)",
        "rgba(255, 107, 107, 0.8)",
      ],
    },
    textStyle: {
      color: "#fff",
    },
  },
  geo: {
    map: "china",
    roam: true,
    zoom: 1.2,
    label: { show: false },
    itemStyle: {
      areaColor: "rgba(20, 60, 120, 0.6)",
      borderColor: "#00d4ff",
      borderWidth: 1,
    },
    emphasis: {
      itemStyle: { areaColor: "rgba(0, 212, 255, 0.3)" },
      label: { show: true, color: "#fff" },
    },
  },
  series: [
    {
      name: "销售热力-区域",
      type: "map",
      map: "china",
      geoIndex: 0,
      data: [
        { name: "北京", value: 450 },
        { name: "上海", value: 520 },
        { name: "广东", value: 480 },
        { name: "浙江", value: 350 },
        { name: "四川", value: 280 },
        { name: "湖北", value: 260 },
        { name: "陕西", value: 220 },
        { name: "江苏", value: 290 },
        { name: "重庆", value: 310 },
        { name: "山东", value: 240 },
        { name: "福建", value: 210 },
      ],
    },
    {
      name: "销售热力-城市",
      type: "effectScatter",
      coordinateSystem: "geo",
      data: [
        { name: "北京", value: [116.4074, 39.9042, 450] },
        { name: "上海", value: [121.4737, 31.2304, 520] },
        { name: "广州", value: [113.2644, 23.1291, 380] },
        { name: "深圳", value: [114.0579, 22.5431, 420] },
        { name: "杭州", value: [120.1551, 30.2741, 350] },
        { name: "成都", value: [104.0668, 30.5728, 280] },
        { name: "武汉", value: [114.3054, 30.5931, 260] },
        { name: "西安", value: [108.9398, 34.3416, 220] },
        { name: "南京", value: [118.7969, 32.0603, 290] },
        { name: "重庆", value: [106.5516, 29.563, 310] },
      ],
      symbolSize: (val: number[]) => Math.sqrt(val[2]) / 2,
      encode: { value: 2 },
      showEffectOn: "render",
      rippleEffect: { brushType: "stroke", scale: 3 },
      label: {
        formatter: "{b}",
        position: "right",
        show: false,
        color: "#fff",
      },
      itemStyle: { color: "#fff", shadowBlur: 10, shadowColor: "#fff" },
      emphasis: { scale: true },
    },
  ],
}));

// 更新时间
const updateTime = () => {
  const now = new Date();
  currentDate.value = now.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  currentTime.value = now.toLocaleTimeString("zh-CN", { hour12: false });
};

// 切换全屏
const toggleFullscreen = () => {
  if (screenfull.isEnabled && cockpitRef.value) {
    screenfull.toggle(cockpitRef.value);
  }
};

// 监听全屏变化
const onFullscreenChange = () => {
  isFullscreen.value = screenfull.isEnabled && screenfull.isFullscreen;
};

onMounted(async () => {
  // 更新时间
  updateTime();
  timeTimer = window.setInterval(updateTime, 1000);

  // 监听全屏变化
  if (screenfull.isEnabled) {
    screenfull.on("change", onFullscreenChange);
  }

  // 加载中国地图数据
  try {
    const response = await fetch(
      "https://geo.datav.aliyun.com/areas_v3/bound/100000.json",
    );
    if (!response.ok) throw new Error("Network response was not ok");
    const chinaJson = await response.json();
    const echarts = await import("echarts/core");
    echarts.registerMap("china", chinaJson);
    mapLoaded.value = true;
  } catch (error) {
    console.error("地图数据加载失败，尝试备用地址:", error);
    try {
      const response = await fetch(
        "https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples/data/asset/geo/china.json",
      );
      if (!response.ok) throw new Error("Fallback failed");
      const chinaJson = await response.json();
      const echarts = await import("echarts/core");
      echarts.registerMap("china", chinaJson);
      mapLoaded.value = true;
    } catch (fallbackError) {
      console.error("所有地图数据加载失败:", fallbackError);
      mapLoaded.value = false;
    }
  }
});

onUnmounted(() => {
  if (timeTimer) {
    clearInterval(timeTimer);
  }
  if (screenfull.isEnabled) {
    screenfull.off("change", onFullscreenChange);
  }
});
</script>

<style scoped lang="scss">
.cockpit-container {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0e27 0%, #1a1f4b 100%);
  color: #fff;
  overflow-x: hidden;

  &.is-fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
  }
}

/* 头部样式 */
.cockpit-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  padding: 0 30px;
  background: linear-gradient(
    90deg,
    rgba(0, 212, 255, 0.1) 0%,
    rgba(0, 102, 255, 0.1) 50%,
    rgba(0, 212, 255, 0.1) 100%
  );
  border-bottom: 1px solid rgba(0, 212, 255, 0.3);
  position: relative;

  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00d4ff, transparent);
  }
}

.header-left {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
}

.header-date {
  font-weight: bold;
}

.header-time {
  color: #00d4ff;
  font-family: "Courier New", monospace;
}

.header-title {
  font-size: 28px;
  font-weight: bold;
  background: linear-gradient(90deg, #00d4ff, #0099ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 4px;
  text-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
}

.header-right {
  .fullscreen-btn {
    background: linear-gradient(135deg, #00d4ff, #0099ff);
    border: none;
    padding: 10px 20px;
    font-size: 14px;
    transition: all 0.3s;

    &:hover {
      transform: scale(1.05);
      box-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
    }
  }
}

/* 主体内容 */
.cockpit-main {
  display: grid;
  grid-template-columns: 25% 50% 25%;
  gap: 20px;
  padding: 20px;
  min-height: calc(100vh - 70px);
}

/* 卡片样式 */
.chart-card {
  background: linear-gradient(
    135deg,
    rgba(0, 212, 255, 0.05) 0%,
    rgba(0, 102, 255, 0.05) 100%
  );
  border: 1px solid rgba(0, 212, 255, 0.2);
  border-radius: 12px;
  padding: 20px;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00d4ff, transparent);
  }
}

.card-header {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0, 212, 255, 0.2);
}

.card-title {
  font-size: 18px;
  font-weight: bold;
  color: #00d4ff;
}

.card-subtitle {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.card-body {
  height: 280px;
}

.chart {
  width: 100%;
  height: 100%;
}

/* 左列布局 */
.main-left {
  display: flex;
  flex-direction: column;
  gap: 20px;

  .chart-card {
    flex: 1;
  }
}

/* 中间列布局 */
.main-center {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.data-overview {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
}

.overview-item {
  display: flex;
  align-items: center;
  gap: 12px;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.05) 0%,
    rgba(255, 255, 255, 0.02) 100%
  );
  border: 1px solid rgba(0, 212, 255, 0.2);
  border-radius: 10px;
  padding: 15px;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 20px rgba(0, 212, 255, 0.2);
  }
}

.overview-icon {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.overview-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.overview-value {
  font-size: 16px;
  font-weight: bold;
  color: #fff;
}

.overview-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
}

.map-card {
  flex: 1;

  .card-body {
    height: 500px;
  }
  .map-chart {
    width: 100%;
    height: 100%;
  }

  .map-loading {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    color: #00d4ff;
    font-size: 14px;

    .el-icon {
      font-size: 32px;
    }
  }
} /* 右列布局 */
.main-right {
  display: flex;
  flex-direction: column;
  gap: 20px;

  .chart-card {
    flex: 1;
  }
}

/* 滚动列表 */
.scroll-list {
  height: 100%;
  overflow: hidden;
}

.seamless-wrap {
  height: 100%;
  overflow: hidden;
}

.scroll-item {
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid rgba(0, 212, 255, 0.1);
  font-size: 13px;

  &:last-child {
    border-bottom: none;
  }
}

.item-type {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  margin-right: 10px;
  min-width: 36px;
  text-align: center;

  &.income {
    background: rgba(67, 233, 123, 0.2);
    color: #43e97b;
  }

  &.expense {
    background: rgba(245, 87, 108, 0.2);
    color: #f5576c;
  }
}

.item-name {
  flex: 1;
  color: rgba(255, 255, 255, 0.8);
}

.item-amount {
  font-weight: bold;
  margin-right: 15px;
  min-width: 80px;
  text-align: right;

  &.income {
    color: #43e97b;
  }

  &.expense {
    color: #f5576c;
  }
}

.item-time {
  color: rgba(255, 255, 255, 0.5);
  font-family: "Courier New", monospace;
  font-size: 12px;
}

/* 响应式适配 */
@media screen and (max-width: 1400px) {
  .cockpit-main {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
  }

  .main-left {
    grid-column: 1;
    grid-row: 1 / 3;
  }

  .main-center {
    grid-column: 2;
    grid-row: 1 / 3;
  }

  .main-right {
    grid-column: 1 / 3;
    grid-row: 3;
    flex-direction: row;
  }

  .data-overview {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 1024px) {
  .cockpit-main {
    grid-template-columns: 1fr;
  }

  .main-left,
  .main-center,
  .main-right {
    grid-column: 1;
    grid-row: auto;
  }

  .main-right {
    flex-direction: column;
  }

  .header-title {
    font-size: 20px;
  }

  .cockpit-header {
    flex-wrap: wrap;
    height: auto;
    padding: 15px;
    gap: 10px;
  }

  .data-overview {
    grid-template-columns: repeat(2, 1fr);
  }

  .map-card .card-body {
    height: 350px;
  }
}

@media screen and (max-width: 768px) {
  .data-overview {
    grid-template-columns: 1fr;
  }

  .card-body {
    height: 220px;
  }

  .map-card .card-body {
    height: 280px;
  }
}
</style>
