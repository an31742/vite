// src/components/Modal/modalMap.js
/**
 * 弹窗组件映射表
 * 规则：key=弹窗名称，value=异步加载函数（支持多端适配、分块打包）
 */
// 通用失败兜底组件
const FallbackModal = () => import('./FallbackModal.vue');

// 业务弹窗映射（核心：懒加载 + 分块打包 + 多端适配）
const modalMap:any = {
   // 用户表单弹窗（多端适配）
  UserFormModal: ()=> import('@/views/demo/globalPopup/UserFormModal.vue'),
  DeleteConfirmModal: () => import('@/views/demo/globalPopup/DeleteConfirmModal.vue'),
  // 订单详情弹窗（超大组件：分块打包，减少首屏体积）
  OrderDetailModal: () => import(/* webpackChunkName: "modal-order" */ '@/views/demo/globalPopup/OrderDetailModal.vue'),
  // 兜底：未注册的弹窗指向失败组件
  '*': FallbackModal
};

/**
 * 动态注册弹窗（支持业务插件扩展）
 * @param {String} name - 弹窗名称
 * @param {Function} loader - 异步加载函数
 */
export const registerModal = (name:any, loader:any) => {
  if (modalMap[name]) {
    console.warn(`【弹窗管理】弹窗${name}已存在，将覆盖原有配置`);
  }
  modalMap[name] = loader;
};

export default modalMap;