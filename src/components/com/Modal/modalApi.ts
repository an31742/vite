/// <reference lib="dom" />
// 显式声明 window（兜底方案）
declare const window:any
// src/components/Modal/modalApi.ts
import { getCurrentInstance, ComponentInternalInstance } from 'vue';
import { queryToModalStack } from './modalUtils';

// 定义弹窗选项接口
interface ModalOptions {
  name: string;
  title?: string;
  width?: string;
  top?: string;
  closeOnClickModal?: boolean;
  closeOnPressEscape?: boolean;
  modalProps?: Record<string, any>;
  onConfirm?: Function | null;
  onCancel?: Function | null;
  onClose?: Function | null;
}

// 定义弹窗栈项结构
interface ModalStackItem extends ModalOptions {
  id: string;
}

// 定义弹窗实例接口
interface ModalStackInstance {
  modalStack: ModalStackItem[];
  componentCache: Record<string, any>;
  push(options: Omit<ModalStackItem, 'id'>): string;
  close(modalId: string): void;
  closeTop(): void;
  closeAll(): void;
  update(modalId: string, newProps: Partial<ModalOptions>): void;
}

// 弹窗栈实例（单例，防止重复挂载）
let modalStackInstance: ModalStackInstance | null = null;

/**
 * 初始化弹窗实例（在App.vue中挂载后调用）
 * @param instance - 弹窗容器组件实例
 */
export const initModalInstance = (instance: ModalStackInstance): void => {
  // 防止重复初始化导致内存泄漏
  if (modalStackInstance) {
    modalStackInstance.closeAll();
  }
  modalStackInstance = instance;

  // 全局错误监听：弹窗加载失败时兜底
  window.removeEventListener('error', handleModalGlobalError);
  window.addEventListener('error', handleModalGlobalError);
};

/**
 * 全局弹窗错误处理
 * @param e - 错误事件
 */
const handleModalGlobalError = (e: ErrorEvent): void => {
  if (e.message.includes('modal') || e.message.includes('Modal')) {
    console.error('【弹窗全局错误】：', e);
    modalStackInstance?.closeAll();
  }
};

/**
 * 全局弹窗API（支持栈操作、内存回收、动态更新）
 */
const modalApi = {
  /**
   * 推入新弹窗（栈顶）
   * @param options - 弹窗配置
   * @returns 弹窗ID（用于后续关闭/更新）
   */
  open(options: ModalOptions): string {
    if (!modalStackInstance) {
      console.error('【弹窗API】弹窗实例未初始化，请先在App.vue中挂载Modal组件');
      return '';
    }
    // 必传项校验
    if (!options?.name) {
      console.error('【弹窗API】弹窗名称（name）为必填项');
      return '';
    }

    // 推入栈并返回唯一ID
    return modalStackInstance.push({
      name: options.name,
      title: options.title || '',
      width: options.width || '500px',
      top: options.top || '20vh',
      closeOnClickModal: options.closeOnClickModal ?? true,
      closeOnPressEscape: options.closeOnPressEscape ?? true,
      modalProps: options.modalProps || {},
      onConfirm: options.onConfirm || null,
      onCancel: options.onCancel || null,
      onClose: options.onClose || null,
    });
  },

  /**
   * 关闭指定ID的弹窗
   * @param modalId - 弹窗唯一ID
   */
  close(modalId: string): void {
    if (!modalId || !modalStackInstance) return;
    modalStackInstance.close(modalId);
  },

  /**
   * 关闭栈顶弹窗
   */
  closeTop(): void {
    modalStackInstance?.closeTop();
  },

  /**
   * 关闭所有弹窗（清空栈）
   */
  closeAll(): void {
    modalStackInstance?.closeAll();
  },

  /**
   * 更新指定弹窗的属性
   * @param modalId - 弹窗ID
   * @param newProps - 新属性（title/width/modalProps等）
   */
  update(modalId: string, newProps: Partial<ModalOptions>): void {
    if (!modalId || !newProps || !modalStackInstance) return;
    modalStackInstance.update(modalId, newProps);
  },

  /**
   * 获取当前弹窗栈
   * @returns 弹窗栈列表
   */
  getStack(): ModalStackItem[] {
    return modalStackInstance ? modalStackInstance.modalStack || [] : [];
  },

  /**
   * 清理组件缓存（主动回收内存）
   * @param name - 可选，指定弹窗名称；不传则清空所有缓存
   */
  clearComponentCache(name?: string): void {
    if (!modalStackInstance) return;
    if (name) {
      delete modalStackInstance.componentCache[name];
    } else {
      modalStackInstance.componentCache = {};
    }
  },

  /**
   * 销毁弹窗实例（页面卸载时调用）
   */
  destroy(): void {
    if (modalStackInstance) {
      modalStackInstance.closeAll();
      modalStackInstance = null;
      window.removeEventListener('error', handleModalGlobalError);
    }
  }
};

/**
 * 组合式API封装（setup中使用）
 * @returns 弹窗API
 */
export const useModal = (): typeof modalApi => {
  const instance: ComponentInternalInstance | null = getCurrentInstance();
  return instance?.appContext.config.globalProperties.$modal || modalApi;
};

// 挂载到Vue全局（Options API使用）
export default modalApi;