<!-- src/views/modals/DeleteConfirmModal.vue -->
<template>
  <div class="delete-confirm-modal">
    <el-icon color="#f56c6c" size="24"><warning /></el-icon>
    <div class="content">{{ content }}</div>
    <div class="btn-group">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="danger" @click="handleConfirm">确认删除</el-button>
    </div>
  </div>
</template>

<script setup>
import { Warning } from '@element-plus/icons-vue';
import { defineProps, defineEmits } from 'vue';

// 接收弹窗参数
const props = defineProps({
  // 删除提示内容
  content: {
    type: String,
    default: '确定要删除这条数据吗？删除后不可恢复！'
  }
});

// 触发回调
const emit = defineEmits(['confirm', 'cancel']);

// 取消
const handleCancel = () => emit('cancel');
// 确认删除
const handleConfirm = () => emit('confirm');
</script>

<style scoped>
.delete-confirm-modal {
  padding: 20px 0;
}

.delete-confirm-modal el-icon {
  margin-bottom: 16px;
  display: block;
}

.content {
  margin-bottom: 24px;
  color: #666;
  line-height: 1.5;
}

.btn-group {
  text-align: right;
}

.btn-group .el-button {
  margin-left: 8px;
}
</style>