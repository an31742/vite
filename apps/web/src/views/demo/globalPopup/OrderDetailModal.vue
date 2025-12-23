<!-- src/views/modals/OrderDetailModal.vue -->
<template>
  <el-table :data="orderItems" border style="width: 100%; margin-bottom: 16px;">
    <el-table-column prop="name" label="商品名称" />
    <el-table-column prop="price" label="单价" />
    <el-table-column prop="count" label="数量" />
    <el-table-column prop="total" label="小计" />
  </el-table>
  <el-form :model="orderInfo" label-width="80px">
    <el-form-item label="订单编号">
      <span>{{ orderInfo.orderNo }}</span>
    </el-form-item>
    <el-form-item label="下单时间">
      <span>{{ orderInfo.createTime }}</span>
    </el-form-item>
    <el-form-item label="订单金额">
      <span style="color: #f56c6c; font-weight: bold;">{{ orderInfo.totalAmount }}</span>
    </el-form-item>
  </el-form>
  <el-form-item align="right">
    <el-button @click="handleCancel">关闭</el-button>
  </el-form-item>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';

// 接收订单ID参数
const props = defineProps({
  orderId: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['cancel']);

// 订单信息
const orderInfo = ref({
  orderNo: '',
  createTime: '',
  totalAmount: '0.00'
});

// 订单商品列表
const orderItems = ref([]);

/**
 * 模拟加载订单详情（实际项目中替换为接口请求）
 */
watch(
  () => props.orderId,
  async (id) => {
    if (id) {
      // 模拟异步加载（超大组件可在此处拆分逻辑）
      await new Promise(resolve => setTimeout(resolve, 500));
      orderInfo.value = {
        orderNo: `ORD${id}${Date.now().toString().slice(-6)}`,
        createTime: '2025-12-04 10:00:00',
        totalAmount: '1999.00'
      };
      orderItems.value = [
        { name: '测试商品1', price: '999.00', count: 1, total: '999.00' },
        { name: '测试商品2', price: '1000.00', count: 1, total: '1000.00' }
      ];
    }
  },
  { immediate: true }
);

// 关闭弹窗
const handleCancel = () => emit('cancel');
</script>