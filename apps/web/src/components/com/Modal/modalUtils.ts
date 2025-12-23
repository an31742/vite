/****
 *路由query转弹窗栈（兼容JSON解析失败
 *@param {Object} query - 路由query对象
 *@returns {Array} 标准化的弹窗栈
 */

export const queryToModalStack = (query: any) => {
  try {
    const modals = query.modals
      ? JSON.parse(decodeURIComponent(query.modals))
      : [];
    return modals.filter(
      (item: any) =>
        item?.name &&
        typeof item.name === "string" &&
        (item.modalProps === undefined || typeof item.modalProps === "object")
    );
  } catch (error) {
    console.log("路由弹窗解析失败", error);
    return [];
  }
};

/**
 * 弹窗栈转路由query（避免特殊字符编码问题）
 * @param {Array} stack - 弹窗栈
 * @param {Object} originQuery - 原始路由query
 * @returns {Object} 新的路由query
 */

export const modalStackToQuery = (stack: any, originQuery: any) => {
  const { modals, ...restQuery } = originQuery;
  if (stack.length === 0) return restQuery;

  // 仅保留必要字段，减少路由参数体积
  const simplifiedStack = stack.map((item: any) => ({
    name: item.name,
    title: item.title,
    width: item.width,
    top: item.top,
    closeOnClickModal: item.closeOnClickModal,
    closeOnPressEscape: item.closeOnPressEscape,
    modalProps: item.modalProps,
  }));

  return {
    ...restQuery,
    modals: encodeURIComponent(JSON.stringify(simplifiedStack)),
  };
};

/**
 * 生成唯一弹窗ID（避免key冲突）
 * @returns {String} 唯一ID
 **/

export const generateModalId=()=>{
  return `modal-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}