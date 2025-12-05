<!-- src/components/Modal/index.vue -->
<template>
  <div class="modal-stack-container">
    <!-- 弹窗栈：栈顶在后，z-index递增 -->
    <el-dialog
      v-for="(modalItem, index) in modalStack"
      :key="modalItem.id"
      v-model="modalItem.visible"
      :title="modalItem.title"
      :width="modalItem.width"
      :top="modalItem.top"
      :close-on-click-modal="modalItem.closeOnClickModal"
      :close-on-press-escape="modalItem.closeOnPressEscape"
      :z-index="1000 + index"
      @close="handleStackItemClose(modalItem)"
      @open="handleStackItemOpen(modalItem)"
      destroy-on-close
    >
    <!-- Element Plus内置：关闭时销毁DOM -->
      <!-- 加载中状态 -->
      <div v-if="modalItem.loading" class="modal-loading">
        <el-icon><loading /></el-icon>
        <p>弹窗加载中...</p>
      </div>
      <!-- 加载失败/兜底 -->
      <div v-else-if="!modalItem.component" class="modal-error">
        <el-icon color="#f56c6c"><warning /></el-icon>
        <p>弹窗组件加载失败，请重试</p>
      </div>
      <!-- 业务弹窗组件 -->
      <component
        v-else
        :is="modalItem.component"
        v-bind="modalItem.modalProps"
        @confirm="(data) => handleStackItemConfirm(modalItem, data)"
        @cancel="() => handleStackItemCancel(modalItem)"
      />
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, watch, onUnmounted, shallowRef, markRaw } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { debounce } from 'lodash-es';
import { Loading, Warning } from '@element-plus/icons-vue';
import modalMap from './modalMap';
import { queryToModalStack, modalStackToQuery, generateModalId } from './modalUtils';

// 路由实例
const route = useRoute();
const router = useRouter();

// 核心：弹窗栈（shallowRef减少响应式开销，markRaw避免组件包装）
const modalStack = shallowRef([]);
// 组件缓存（避免重复异步加载）
const componentCache = ref({});
// 最大栈长度（防止过多弹窗导致内存溢出）
const MAX_STACK_LENGTH = 5;

/**
 * 防抖更新路由（避免频繁修改query触发多次路由跳转）
 * 防抖时间：100ms（平衡响应速度和性能）
 */
const debounceUpdateRoute = debounce((newStack) => {
  const newQuery = modalStackToQuery(newStack, route.query);
  // 避免路由重复跳转报错
  router.replace({ query: newQuery }).catch(err => {
    if (!err.message.includes('Navigation cancelled')) {
      console.error('【弹窗路由】更新失败：', err);
    }
  });
}, 100);

/**
 * 异步加载弹窗组件（带缓存 + 错误处理）
 * @param {Object} modalItem - 弹窗栈项
 */
const loadModalComponent = async (modalItem) => {
  try {
    modalItem.loading = true;
    // 优先读取缓存
    if (componentCache.value[modalItem.name]) {
      modalItem.component = markRaw(componentCache.value[modalItem.name]);
      modalItem.loading = false;
      return;
    }
    // 未注册的弹窗指向兜底组件
    const loader = modalMap[modalItem.name] || modalMap['*'];
    const compModule = await loader();
    const comp = compModule.default;
    // 缓存组件（markRaw避免响应式包装，提升性能）
    componentCache.value[modalItem.name] = markRaw(comp);
    modalItem.component = comp;
  } catch (e) {
    console.error(`【弹窗加载】${modalItem.name}加载失败：`, e);
    // 加载失败时指向兜底组件
    const fallbackComp = await modalMap['*']();
    modalItem.component = markRaw(fallbackComp.default);
  } finally {
    modalItem.loading = false;
  }
};

/**
 * 初始化弹窗栈（从路由参数读取）
 */
const initModalStack = () => {
  const stackFromRoute = queryToModalStack(route.query);
  // 栈长度限制：超出则截断
  const limitedStack = stackFromRoute.slice(0, MAX_STACK_LENGTH);
  // 标准化栈项（补充默认值 + 唯一ID + 状态）
  const normalizedStack = limitedStack.map(item => ({
    id: generateModalId(),
    name: item.name,
    title: item.title || '',
    width: item.width || '500px',
    top: item.top || '20vh',
    closeOnClickModal: item.closeOnClickModal ?? true,
    closeOnPressEscape: item.closeOnPressEscape ?? true,
    modalProps: item.modalProps || {},
    visible: true,
    loading: true,
    component: null,
    // 存储回调（用于关闭时解绑）
    callbacks: {
      confirm: null,
      cancel: null,
      close: null,
      open: null
    }
  }));
  modalStack.value = normalizedStack;
  // 预加载所有栈项组件
  normalizedStack.forEach(loadModalComponent);
};

/**
 * 处理弹窗关闭（核心：内存回收 + 路由同步）
 * @param {Object} modalItem - 弹窗栈项
 */
const handleStackItemClose = (modalItem) => {
  // 1. 解绑所有回调（防止闭包内存泄漏）
  modalItem.callbacks = { confirm: null, cancel: null, close: null, open: null };
  // 2. 从栈中移除
  const index = modalStack.value.findIndex(item => item.id === modalItem.id);
  if (index > -1) {
    modalStack.value.splice(index, 1);
  }
  // 3. 同步路由（防抖）
  debounceUpdateRoute(modalStack.value);
  // 4. 按需清理缓存（弹窗不再使用时清理）
  const isModalUsed = modalStack.value.some(item => item.name === modalItem.name);
  if (!isModalUsed) {
    delete componentCache.value[modalItem.name];
  }
};

/**
 * 处理弹窗确认事件
 * @param {Object} modalItem - 弹窗栈项
 * @param {Any} data - 确认回调数据
 */
const handleStackItemConfirm = (modalItem, data) => {
  modalItem.callbacks.confirm?.(data);
  handleStackItemClose(modalItem);
};

/**
 * 处理弹窗取消事件
 * @param {Object} modalItem - 弹窗栈项
 */
const handleStackItemCancel = (modalItem) => {
  modalItem.callbacks.cancel?.();
  handleStackItemClose(modalItem);
};

/**
 * 处理弹窗打开事件
 * @param {Object} modalItem - 弹窗栈项
 */
const handleStackItemOpen = (modalItem) => {
  modalItem.callbacks.open?.();
};

/**
 * 推入新弹窗（暴露给API）
 * @param {Object} options - 弹窗配置
 * @returns {String} 弹窗ID
 */
const push = (options) => {
  // 栈长度限制：超出则移除栈底
  if (modalStack.value.length >= MAX_STACK_LENGTH) {
    modalStack.value.shift();
  }
  const newModalItem = {
    id: generateModalId(),
    name: options.name,
    title: options.title,
    width: options.width,
    top: options.top,
    closeOnClickModal: options.closeOnClickModal,
    closeOnPressEscape: options.closeOnPressEscape,
    modalProps: options.modalProps,
    visible: true,
    loading: true,
    component: null,
    callbacks: {
      confirm: options.onConfirm,
      cancel: options.onCancel,
      close: options.onClose,
      open: options.onOpen
    }
  };
  // 推入栈顶
  modalStack.value.push(newModalItem);
  // 加载组件
  loadModalComponent(newModalItem);
  // 同步路由
  debounceUpdateRoute(modalStack.value);
  return newModalItem.id;
};

/**
 * 关闭指定弹窗（暴露给API）
 * @param {String} modalId - 弹窗ID
 */
const close = (modalId) => {
  const modalItem = modalStack.value.find(item => item.id === modalId);
  if (modalItem) {
    modalItem.visible = false; // 触发el-dialog的close事件
  }
};

/**
 * 关闭栈顶弹窗（暴露给API）
 */
const closeTop = () => {
  if (modalStack.value.length === 0) return;
  const topItem = modalStack.value[modalStack.value.length - 1];
  topItem.visible = false;
};

/**
 * 关闭所有弹窗（暴露给API）
 */
const closeAll = () => {
  modalStack.value.forEach(item => {
    item.visible = false;
    item.callbacks = { confirm: null, cancel: null, close: null, open: null };
  });
  modalStack.value = [];
  debounceUpdateRoute([]);
};

/**
 * 更新指定弹窗属性（暴露给API）
 * @param {String} modalId - 弹窗ID
 * @param {Object} newProps - 新属性
 */
const update = (modalId, newProps) => {
  const modalItem = modalStack.value.find(item => item.id === modalId);
  if (modalItem) {
    // 仅更新允许的属性，防止恶意修改
    const allowProps = ['title', 'width', 'top', 'closeOnClickModal', 'closeOnPressEscape', 'modalProps'];
    allowProps.forEach(prop => {
      if (newProps[prop] !== undefined) {
        modalItem[prop] = newProps[prop];
      }
    });
    // 更新modalProps后同步路由
    if (newProps.modalProps) {
      debounceUpdateRoute(modalStack.value);
    }
  }
};

// 监听路由变化，同步弹窗栈（支持浏览器回退/前进）
const routeWatcher = watch(
  () => route.query.modals,
  () => {
    // 避免循环更新：仅当路由栈与本地栈不一致时同步
    const routeStack = queryToModalStack(route.query);
    const localStack = modalStack.value.map(item => ({
      name: item.name,
      modalProps: item.modalProps,
      title: item.title,
      width: item.width
    }));
    if (JSON.stringify(routeStack) !== JSON.stringify(localStack)) {
      initModalStack();
    }
  },
  { immediate: true, deep: true }
);

// 组件卸载：内存回收核心逻辑
onUnmounted(() => {
  // 1. 取消路由监听
  routeWatcher();
  // 2. 清空弹窗栈
  modalStack.value = [];
  // 3. 清空组件缓存
  componentCache.value = {};
  // 4. 取消防抖函数
  debounceUpdateRoute.cancel();
  // 5. 清理路由参数
  const { modals, ...restQuery } = route.query;
  router.replace({ query: restQuery }).catch(() => {});
});

// 暴露方法给全局API
defineExpose({
  modalStack,
  componentCache,
  push,
  close,
  closeTop,
  closeAll,
  update
});
</script>

<style scoped>
.modal-stack-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; /* 避免遮挡底层交互 */
  z-index: 1000;
}

.modal-stack-container :deep(.el-dialog) {
  pointer-events: auto; /* 恢复弹窗交互 */
}

.modal-loading, .modal-error {
  text-align: center;
  padding: 40px 20px;
  color: #666;
}

.modal-loading el-icon, .modal-error el-icon {
  font-size: 24px;
  margin-bottom: 8px;
  display: block;
}

.modal-loading {
  color: #409eff;
}

.modal-error {
  color: #f56c6c;
}
</style>