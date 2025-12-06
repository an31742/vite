<!-- src/views/Home.vue -->
<template>
  <div class="home-page" style="padding: 40px">
    <h1>全局弹窗解决方案测试</h1>
    <div class="btn-group" style="margin: 20px 0;display: flex;">
      <el-button type="primary" @click="openUserForm"
        >1. 打开用户表单弹窗</el-button
      >
      <el-button type="primary" @click="openEditUserForm"
        >2. 打开编辑用户弹窗</el-button
      >
      <el-button type="warning" @click="openDeleteConfirm"
        >3. 打开删除确认弹窗（叠加）</el-button
      >
      <el-button type="info" @click="openOrderDetail"
        >4. 打开订单详情弹窗（分块打包）</el-button
      >
      <el-button type="info" @click="openNote">5.打开笔记</el-button>
    </div>
    <div class="btn-group" style="margin: 20px 0;display: flex;">
      <el-button @click="closeTopModal">5. 关闭栈顶弹窗</el-button>
      <el-button @click="closeAllModal">6. 关闭所有弹窗</el-button>
      <el-button @click="updateTopModal">7. 更新栈顶弹窗标题</el-button>
      <el-button @click="clearCache">8. 清理组件缓存</el-button>
    </div>
    <div
      class="stack-info"
      style="
        margin-top: 20px;
        padding: 20px;
        border: 1px solid #e6e6e6;
        border-radius: 4px;
      "
    >
      <h3>当前弹窗栈状态：</h3>
      <pre>{{ JSON.stringify(stack, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useModal } from "@/components/com/Modal/modalApi";

// 获取全局弹窗API
const $modal = useModal();

// 存储弹窗ID（用于更新/关闭）
let currentModalId = "";

// 监听弹窗栈状态
const stack = computed(() => {
  return $modal.getStack().map((item) => ({
    id: item.id,
    name: item.name,
    title: item.title,
    visible: item.visible,
  }));
});

/**
 * 1. 打开新增用户表单弹窗
 */
const openUserForm = () => {
  currentModalId = $modal.open({
    name: "UserFormModal",
    title: "新增用户",
    width: "500px",
    onConfirm: (data) => {
      ElMessage.success(`新增用户成功：${JSON.stringify(data)}`);
    },
    onCancel: () => {
      ElMessage.info("取消新增用户");
    },
  });
};

/**
 * 2. 打开编辑用户表单弹窗
 */
const openEditUserForm = () => {
  currentModalId = $modal.open({
    name: "UserFormModal",
    title: "编辑用户",
    width: "500px",
    modalProps: { id: "123" },
    onConfirm: (data) => {
      ElMessage.success(`编辑用户成功：${JSON.stringify(data)}`);
    },
  });
};

/**
 * 3. 打开删除确认弹窗（叠加）
 */
const openDeleteConfirm = () => {
  currentModalId = $modal.open({
    name: "DeleteConfirmModal",
    title: "删除确认",
    width: "400px",
    modalProps: {
      content: "确定要删除该用户吗？删除后数据不可恢复！",
    },
    onConfirm: () => {
      ElMessage.success("删除成功");
    },
    onCancel: () => {
      ElMessage.info("取消删除");
    },
  });
};

/**
 * 4. 打开订单详情弹窗（分块打包示例）
 */
const openOrderDetail = () => {
  currentModalId = $modal.open({
    name: "OrderDetailModal",
    title: "订单详情",
    width: "800px",
    modalProps: { orderId: "8888" },
  });
};
/**
 * 打开笔记
 */
const openNote = () => {
  currentModalId = $modal.open({
    name: "toLocalStorage",
    title: "笔记",
    width: "800px",
    modalProps: {},
  });
};

/**
 * 5. 关闭栈顶弹窗
 */
const closeTopModal = () => {
  $modal.closeTop();
  ElMessage.info("已关闭栈顶弹窗");
};

/**
 * 6. 关闭所有弹窗
 */
const closeAllModal = () => {
  $modal.closeAll();
  ElMessage.info("已关闭所有弹窗");
};

/**
 * 7. 更新栈顶弹窗标题
 */
const updateTopModal = () => {
  if (!currentModalId) {
    ElMessage.warning("请先打开一个弹窗");
    return;
  }
  $modal.update(currentModalId, {
    title: `更新后的标题-${Date.now().toString().slice(-4)}`,
  });
  ElMessage.success("已更新栈顶弹窗标题");
};

/**
 * 8. 清理组件缓存
 */
const clearCache = () => {
  $modal.clearComponentCache();
  ElMessage.success("已清空所有弹窗组件缓存");
};
</script>
