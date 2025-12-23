<!-- src/views/modals/pc/UserFormModal.vue -->
<template>
  <el-form :model="form" label-width="80px" ref="formRef" :rules="rules">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username" placeholder="请输入用户名" />
    </el-form-item>
    <el-form-item label="手机号" prop="phone">
      <el-input v-model="form.phone" placeholder="请输入手机号" />
    </el-form-item>
    <el-form-item label="备注">
      <el-input v-model="form.remark" type="textarea" rows="3" />
    </el-form-item>
    <el-form-item align="right">
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleConfirm">确认</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';

// 接收通用容器传递的参数
const props = defineProps({
  // 编辑用户ID（新增时为空）
  id: {
    type: String,
    default: ''
  }
});

// 触发回调事件
const emit = defineEmits(['confirm', 'cancel']);

// 表单实例
const formRef = ref(null);

// 表单数据
const form = ref({
  username: '',
  phone: '',
  remark: ''
});

// 表单校验规则
const rules = ref({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  phone: [{ required: true, pattern: /^1[3-9]\d{9}$/, message: '请输入正确手机号', trigger: 'blur' }]
});

/**
 * 监听ID变化，加载编辑数据
 * 实际项目中替换为接口请求
 */
watch(
  () => props.id,
  async (id) => {
    if (id) {
      // 模拟接口请求
      form.value = {
        username: '测试用户',
        phone: '13800138000',
        remark: `编辑模式（ID：${id}）`
      };
    } else {
      // 新增模式：重置表单
      formRef.value?.resetFields();
      form.value = { username: '', phone: '', remark: '' };
    }
  },
  { immediate: true }
);

/**
 * 取消按钮
 */
const handleCancel = () => {
  emit('cancel');
};

/**
 * 确认按钮
 */
const handleConfirm = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      emit('confirm', form.value);
    }
  });
};
</script>