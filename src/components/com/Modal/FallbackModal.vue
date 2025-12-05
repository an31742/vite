<!-- src/components/Modal/FallbackModal.vue -->
<template>
  <div class="fallback-modal">
    <el-icon color="#f56c6c" size="32"><warning /></el-icon>
    <h3>弹窗加载失败</h3>
    <p>请检查弹窗组件是否注册或网络是否正常</p>
    <el-button type="primary" @click="handleRetry">重试</el-button>
    <el-button @click="handleCancel">关闭</el-button>
  </div>
</template>

<script setup>
import { Warning } from '@element-plus/icons-vue';
import { emit } from 'vue';

const emit = defineEmits(['confirm', 'cancel']);

const handleRetry = () => {
  // 刷新当前页面（简单重试策略，可根据业务调整）
  window.location.reload();
};

const handleCancel = () => {
  emit('cancel');
};
</script>

<style scoped>
.fallback-modal {
  text-align: center;
  padding: 40px 20px;
}

.fallback-modal h3 {
  margin: 16px 0;
  font-size: 18px;
  color: #333;
}

.fallback-modal p {
  margin-bottom: 24px;
  color: #666;
}

.fallback-modal .el-button {
  margin: 0 8px;
}
</style>